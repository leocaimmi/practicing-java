import type { Declarator, Expr, MethodDecl, Param, Program, Stmt, TypeNode } from './ast'
import { JavaSyntaxError, tokenize, type Token } from './lexer'

const PRIMITIVES = new Set(['int', 'long', 'short', 'byte', 'double', 'float', 'boolean', 'char', 'void'])
const MODIFIERS = new Set(['public', 'private', 'protected', 'static', 'final', 'abstract'])

/**
 * Parser descendente recursivo.
 *
 * Acepta tanto un archivo con `public class X { ... }` como una lista suelta de
 * métodos, porque en los desafíos se le pide al estudiante escribir un método y
 * no una clase entera.
 */
class Parser {
  private pos = 0
  private readonly tokens: Token[]

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  private peek(offset = 0): Token {
    return this.tokens[Math.min(this.pos + offset, this.tokens.length - 1)]
  }

  private get line(): number {
    return this.peek().line
  }

  private at(value: string): boolean {
    const token = this.peek()
    return token.value === value && token.type !== 'string' && token.type !== 'char'
  }

  private eat(value: string): boolean {
    if (this.at(value)) {
      this.pos += 1
      return true
    }
    return false
  }

  private expect(value: string): Token {
    if (!this.at(value)) {
      const found = this.peek().type === 'eof' ? 'el final del código' : `"${this.peek().value}"`
      throw new JavaSyntaxError(`Se esperaba "${value}" y se encontró ${found}`, this.line)
    }
    return this.tokens[this.pos++]
  }

  private expectIdentifier(what: string): string {
    const token = this.peek()
    if (token.type !== 'identifier') {
      throw new JavaSyntaxError(`Se esperaba ${what} y se encontró "${token.value}"`, token.line)
    }
    this.pos += 1
    return token.value
  }

  // ---------------------------------------------------------------- programa

  parseProgram(): Program {
    let className: string | null = null
    const methods: MethodDecl[] = []

    // Se ignoran los import y package: no cambian nada en este entorno.
    while (this.at('import') || this.at('package')) {
      while (!this.at(';') && this.peek().type !== 'eof') this.pos += 1
      this.expect(';')
    }

    this.skipModifiers()

    if (this.at('class')) {
      this.pos += 1
      className = this.expectIdentifier('el nombre de la clase')
      this.expect('{')
      while (!this.at('}') && this.peek().type !== 'eof') {
        methods.push(this.parseMethod())
      }
      this.expect('}')
    } else {
      while (this.peek().type !== 'eof') {
        methods.push(this.parseMethod())
      }
    }

    return { className, methods }
  }

  private skipModifiers(): void {
    while (MODIFIERS.has(this.peek().value) && this.peek().type === 'keyword') {
      this.pos += 1
    }
  }

  private parseMethod(): MethodDecl {
    this.skipModifiers()
    const line = this.line
    const returnType = this.parseType()
    const name = this.expectIdentifier('el nombre del método')
    this.expect('(')

    const params: Param[] = []
    if (!this.at(')')) {
      do {
        this.skipModifiers()
        const type = this.parseType()
        const paramName = this.expectIdentifier('el nombre del parámetro')
        params.push({ type, name: paramName })
      } while (this.eat(','))
    }
    this.expect(')')

    // `throws X, Y` se acepta y se ignora.
    if (this.eat('throws')) {
      do {
        this.parseType()
      } while (this.eat(','))
    }

    this.expect('{')
    const body: Stmt[] = []
    while (!this.at('}') && this.peek().type !== 'eof') {
      body.push(this.parseStatement())
    }
    this.expect('}')

    return { name, returnType, params, body, line }
  }

  // ------------------------------------------------------------------- tipos

  private parseType(): TypeNode {
    const token = this.peek()
    const isType =
      (token.type === 'keyword' && PRIMITIVES.has(token.value)) || token.type === 'identifier'
    if (!isType) {
      throw new JavaSyntaxError(`Se esperaba un tipo y se encontró "${token.value}"`, token.line)
    }
    this.pos += 1

    let name = token.value
    // Nombres calificados como java.util.List: se queda con el último segmento.
    while (this.at('.') && this.peek(1).type === 'identifier') {
      this.pos += 1
      name = this.expectIdentifier('un nombre de tipo')
    }

    const typeArgs: TypeNode[] = []
    if (this.at('<')) {
      this.pos += 1
      if (!this.at('>')) {
        do {
          typeArgs.push(this.parseType())
        } while (this.eat(','))
      }
      this.closeGenerics()
    }

    let dims = 0
    while (this.at('[') && this.peek(1).value === ']') {
      this.pos += 2
      dims += 1
    }

    return { name, typeArgs, dims }
  }

  /**
   * Cierra un `<...>`. El lexer puede haber unido los `>` en `>>` cuando hay
   * genéricos anidados, así que en ese caso se parte el token en dos.
   */
  private closeGenerics(): void {
    const token = this.peek()
    if (token.value === '>') {
      this.pos += 1
      return
    }
    if (token.value === '>>' || token.value === '>>>') {
      token.value = token.value.slice(1)
      return
    }
    throw new JavaSyntaxError(`Se esperaba ">" y se encontró "${token.value}"`, token.line)
  }

  /** Intenta leer `Tipo nombre`; si no lo es, deja la posición como estaba. */
  private tryParseVarDecl(): Stmt | null {
    const start = this.pos
    try {
      this.skipModifiers()
      const type = this.parseType()
      if (this.peek().type !== 'identifier') {
        this.pos = start
        return null
      }
      const line = this.line
      const declarators: Declarator[] = []
      do {
        const name = this.expectIdentifier('el nombre de la variable')
        let extraDims = 0
        while (this.at('[') && this.peek(1).value === ']') {
          this.pos += 2
          extraDims += 1
        }
        let init: Expr | null = null
        if (this.eat('=')) {
          init = this.at('{')
            ? this.parseArrayInitializer(null)
            : this.parseExpression()
        }
        declarators.push({ name, extraDims, init })
      } while (this.eat(','))

      if (!this.at(';')) {
        this.pos = start
        return null
      }
      return { kind: 'varDecl', type, declarators, line }
    } catch {
      this.pos = start
      return null
    }
  }

  // -------------------------------------------------------------- sentencias

  private parseStatement(): Stmt {
    const line = this.line

    if (this.at('{')) return this.parseBlock()
    if (this.at('if')) return this.parseIf()
    if (this.at('while')) return this.parseWhile()
    if (this.at('do')) return this.parseDoWhile()
    if (this.at('for')) return this.parseFor()

    if (this.eat('return')) {
      const value = this.at(';') ? null : this.parseExpression()
      this.expect(';')
      return { kind: 'return', value, line }
    }
    if (this.eat('break')) {
      this.expect(';')
      return { kind: 'break', line }
    }
    if (this.eat('continue')) {
      this.expect(';')
      return { kind: 'continue', line }
    }
    if (this.eat(';')) {
      return { kind: 'block', statements: [], line }
    }

    const declaration = this.tryParseVarDecl()
    if (declaration) {
      this.expect(';')
      return declaration
    }

    const expr = this.parseExpression()
    this.expect(';')
    return { kind: 'exprStmt', expr, line }
  }

  private parseBlock(): Stmt {
    const line = this.line
    this.expect('{')
    const statements: Stmt[] = []
    while (!this.at('}') && this.peek().type !== 'eof') {
      statements.push(this.parseStatement())
    }
    this.expect('}')
    return { kind: 'block', statements, line }
  }

  private parseIf(): Stmt {
    const line = this.line
    this.expect('if')
    this.expect('(')
    const cond = this.parseExpression()
    this.expect(')')
    const then = this.parseStatement()
    const otherwise = this.eat('else') ? this.parseStatement() : null
    return { kind: 'if', cond, then, otherwise, line }
  }

  private parseWhile(): Stmt {
    const line = this.line
    this.expect('while')
    this.expect('(')
    const cond = this.parseExpression()
    this.expect(')')
    return { kind: 'while', cond, body: this.parseStatement(), line }
  }

  private parseDoWhile(): Stmt {
    const line = this.line
    this.expect('do')
    const body = this.parseStatement()
    this.expect('while')
    this.expect('(')
    const cond = this.parseExpression()
    this.expect(')')
    this.expect(';')
    return { kind: 'doWhile', body, cond, line }
  }

  private parseFor(): Stmt {
    const line = this.line
    this.expect('for')
    this.expect('(')

    // for each: `for (Tipo nombre : coleccion)`
    const start = this.pos
    const forEach = this.tryParseForEachHeader()
    if (forEach) {
      this.expect(')')
      return { ...forEach, body: this.parseStatement(), line } as Stmt
    }
    this.pos = start

    let init: Stmt | null = null
    if (!this.at(';')) {
      const declaration = this.tryParseVarDecl()
      if (declaration) {
        init = declaration
      } else {
        init = { kind: 'exprStmt', expr: this.parseExpression(), line: this.line }
      }
    }
    this.expect(';')

    const cond = this.at(';') ? null : this.parseExpression()
    this.expect(';')

    const update: Expr[] = []
    if (!this.at(')')) {
      do {
        update.push(this.parseExpression())
      } while (this.eat(','))
    }
    this.expect(')')

    return { kind: 'for', init, cond, update, body: this.parseStatement(), line }
  }

  private tryParseForEachHeader():
    | { kind: 'forEach'; varType: TypeNode; varName: string; iterable: Expr }
    | null {
    const start = this.pos
    try {
      this.skipModifiers()
      const varType = this.parseType()
      if (this.peek().type !== 'identifier') {
        this.pos = start
        return null
      }
      const varName = this.expectIdentifier('el nombre de la variable')
      if (!this.eat(':')) {
        this.pos = start
        return null
      }
      return { kind: 'forEach', varType, varName, iterable: this.parseExpression() }
    } catch {
      this.pos = start
      return null
    }
  }

  // ------------------------------------------------------------- expresiones

  parseExpression(): Expr {
    return this.parseAssignment()
  }

  private parseAssignment(): Expr {
    const left = this.parseTernary()
    const token = this.peek()
    const assignOps = ['=', '+=', '-=', '*=', '/=', '%=']

    if (token.type === 'operator' && assignOps.includes(token.value)) {
      if (left.kind !== 'identifier' && left.kind !== 'index' && left.kind !== 'field') {
        throw new JavaSyntaxError('El lado izquierdo de una asignación no es válido', token.line)
      }
      this.pos += 1
      const value = this.at('{') ? this.parseArrayInitializer(null) : this.parseAssignment()
      return { kind: 'assign', op: token.value, target: left, value, line: token.line }
    }

    return left
  }

  private parseTernary(): Expr {
    const cond = this.parseBinary(0)
    if (this.at('?')) {
      const line = this.line
      this.pos += 1
      const then = this.parseAssignment()
      this.expect(':')
      const otherwise = this.parseAssignment()
      return { kind: 'ternary', cond, then, otherwise, line }
    }
    return cond
  }

  /** Niveles de precedencia, del que menos ata al que más. */
  private static readonly LEVELS = [
    ['||'],
    ['&&'],
    ['|'],
    ['^'],
    ['&'],
    ['==', '!='],
    ['<', '>', '<=', '>='],
    ['<<', '>>', '>>>'],
    ['+', '-'],
    ['*', '/', '%'],
  ]

  private parseBinary(level: number): Expr {
    if (level >= Parser.LEVELS.length) return this.parseUnary()

    let left = this.parseBinary(level + 1)

    for (;;) {
      // `instanceof` tiene la misma precedencia que las comparaciones.
      if (level === 6 && this.at('instanceof')) {
        const line = this.line
        this.pos += 1
        left = { kind: 'instanceof', expr: left, type: this.parseType(), line }
        continue
      }

      const token = this.peek()
      if (token.type !== 'operator' || !Parser.LEVELS[level].includes(token.value)) break

      this.pos += 1
      const right = this.parseBinary(level + 1)
      left = { kind: 'binary', op: token.value, left, right, line: token.line }
    }

    return left
  }

  private parseUnary(): Expr {
    const token = this.peek()
    const line = token.line

    if (token.type === 'operator' && (token.value === '++' || token.value === '--')) {
      this.pos += 1
      const operand = this.parseUnary()
      return { kind: 'update', op: token.value as '++' | '--', operand, prefix: true, line }
    }

    if (token.type === 'operator' && ['-', '+', '!', '~'].includes(token.value)) {
      this.pos += 1
      return { kind: 'unary', op: token.value, operand: this.parseUnary(), line }
    }

    // Casteo: `(Tipo) expresión`. Se distingue de un paréntesis común mirando
    // qué viene después del cierre.
    if (this.at('(')) {
      const start = this.pos
      this.pos += 1
      try {
        const type = this.parseType()
        if (this.at(')')) {
          this.pos += 1
          const next = this.peek()
          const castable =
            next.type === 'identifier' ||
            next.type === 'number' ||
            next.type === 'string' ||
            next.type === 'char' ||
            next.value === '(' ||
            next.value === 'new'
          if (castable && (PRIMITIVES.has(type.name) || /^[A-Z]/.test(type.name))) {
            return { kind: 'cast', type, expr: this.parseUnary(), line }
          }
        }
      } catch {
        // No era un casteo; se reintenta como expresión entre paréntesis.
      }
      this.pos = start
    }

    return this.parsePostfix()
  }

  private parsePostfix(): Expr {
    let expr = this.parsePrimary()

    for (;;) {
      const token = this.peek()

      if (this.at('.')) {
        this.pos += 1
        const name = this.expectIdentifier('el nombre de un campo o método')
        if (this.at('(')) {
          expr = { kind: 'call', object: expr, name, args: this.parseArguments(), line: token.line }
        } else {
          expr = { kind: 'field', object: expr, name, line: token.line }
        }
        continue
      }

      if (this.at('[')) {
        this.pos += 1
        const index = this.parseExpression()
        this.expect(']')
        expr = { kind: 'index', array: expr, index, line: token.line }
        continue
      }

      if (token.type === 'operator' && (token.value === '++' || token.value === '--')) {
        this.pos += 1
        expr = {
          kind: 'update',
          op: token.value as '++' | '--',
          operand: expr,
          prefix: false,
          line: token.line,
        }
        continue
      }

      break
    }

    return expr
  }

  private parseArguments(): Expr[] {
    this.expect('(')
    const args: Expr[] = []
    if (!this.at(')')) {
      do {
        args.push(this.parseExpression())
      } while (this.eat(','))
    }
    this.expect(')')
    return args
  }

  private parseArrayInitializer(elementType: TypeNode | null): Expr {
    const line = this.line
    this.expect('{')
    const items: Expr[] = []
    if (!this.at('}')) {
      do {
        if (this.at('}')) break // tolera una coma final
        items.push(this.at('{') ? this.parseArrayInitializer(null) : this.parseExpression())
      } while (this.eat(','))
    }
    this.expect('}')
    return { kind: 'arrayInit', elementType, items, line }
  }

  private parsePrimary(): Expr {
    const token = this.peek()
    const line = token.line

    if (token.type === 'number') {
      this.pos += 1
      const text = token.value.replace(/[LlFfDd]$/, '')
      const isDouble = text.includes('.') || /[FfDd]$/.test(token.value)
      return {
        kind: 'literal',
        literalType: isDouble ? 'double' : 'int',
        raw: Number(text),
        line,
      }
    }

    if (token.type === 'string') {
      this.pos += 1
      return { kind: 'literal', literalType: 'string', raw: token.value, line }
    }

    if (token.type === 'char') {
      this.pos += 1
      return { kind: 'literal', literalType: 'char', raw: token.value, line }
    }

    if (token.type === 'identifier' && (token.value === 'true' || token.value === 'false')) {
      this.pos += 1
      return { kind: 'literal', literalType: 'boolean', raw: token.value === 'true', line }
    }

    if (token.type === 'identifier' && token.value === 'null') {
      this.pos += 1
      return { kind: 'literal', literalType: 'null', raw: null, line }
    }

    if (this.eat('new')) {
      const type = this.parseTypeForNew()

      if (this.at('[')) {
        this.pos += 1
        if (this.at(']')) {
          // new int[] {1, 2, 3}
          this.pos += 1
          const init = this.parseArrayInitializer(type)
          return init
        }
        const size = this.parseExpression()
        this.expect(']')
        return { kind: 'newArray', elementType: type, size, line }
      }

      if (this.at('{')) {
        return this.parseArrayInitializer(type)
      }

      const args = this.parseArguments()
      return { kind: 'newObject', className: type.name, typeArgs: type.typeArgs, args, line }
    }

    if (this.eat('(')) {
      const expr = this.parseExpression()
      this.expect(')')
      return expr
    }

    if (token.type === 'identifier') {
      this.pos += 1
      if (this.at('(')) {
        return { kind: 'call', object: null, name: token.value, args: this.parseArguments(), line }
      }
      return { kind: 'identifier', name: token.value, line }
    }

    if (token.type === 'keyword' && PRIMITIVES.has(token.value)) {
      // Ocurre en `int.class` y similares: no se soporta.
      throw new JavaSyntaxError(`No se esperaba el tipo "${token.value}" acá`, line)
    }

    const found = token.type === 'eof' ? 'el final del código' : `"${token.value}"`
    throw new JavaSyntaxError(`No se esperaba ${found}`, line)
  }

  /** Igual que parseType pero sin consumir los `[]`, que maneja el `new`. */
  private parseTypeForNew(): TypeNode {
    const token = this.peek()
    if (token.type !== 'identifier' && !(token.type === 'keyword' && PRIMITIVES.has(token.value))) {
      throw new JavaSyntaxError(`Se esperaba un tipo después de "new"`, token.line)
    }
    this.pos += 1

    let name = token.value
    while (this.at('.') && this.peek(1).type === 'identifier') {
      this.pos += 1
      name = this.expectIdentifier('un nombre de tipo')
    }

    const typeArgs: TypeNode[] = []
    if (this.at('<')) {
      this.pos += 1
      if (!this.at('>')) {
        do {
          typeArgs.push(this.parseType())
        } while (this.eat(','))
      }
      this.closeGenerics()
    }

    return { name, typeArgs, dims: 0 }
  }
}

export function parse(source: string): Program {
  return new Parser(tokenize(source)).parseProgram()
}

export { JavaSyntaxError }
