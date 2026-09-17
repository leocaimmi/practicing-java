/**
 * Analizador léxico para el subconjunto de Java que cubre la materia.
 *
 * No pretende aceptar todo Java: alcanza con lo que aparece en el material
 * (tipos primitivos, String, arreglos, colecciones, control de flujo y métodos
 * estáticos). Cualquier construcción fuera de eso se rechaza con un error que
 * apunta a la línea, que es lo que le sirve a quien está estudiando.
 */

export type TokenType =
  | 'number'
  | 'string'
  | 'char'
  | 'identifier'
  | 'keyword'
  | 'operator'
  | 'punctuation'
  | 'eof'

export interface Token {
  type: TokenType
  value: string
  line: number
  column: number
}

export class JavaSyntaxError extends Error {
  readonly line: number

  constructor(message: string, line: number) {
    super(message)
    this.name = 'JavaSyntaxError'
    this.line = line
  }
}

const KEYWORDS = new Set([
  'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
  'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
  'finally', 'float', 'for', 'if', 'implements', 'import', 'instanceof', 'int',
  'interface', 'long', 'new', 'package', 'private', 'protected', 'public',
  'return', 'short', 'static', 'super', 'switch', 'this', 'throw', 'throws',
  'try', 'void', 'while',
])

// Los de más caracteres van primero para que no gane un prefijo más corto.
const OPERATORS = [
  '>>>=', '<<=', '>>=', '>>>',
  '===', '!==',
  '++', '--', '&&', '||', '==', '!=', '<=', '>=',
  '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>',
  '+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':',
]

const PUNCTUATION = new Set(['(', ')', '{', '}', '[', ']', ';', ',', '.'])

function isDigit(ch: string): boolean {
  return ch >= '0' && ch <= '9'
}

function isIdentifierStart(ch: string): boolean {
  return /[A-Za-z_$]/.test(ch)
}

function isIdentifierPart(ch: string): boolean {
  return /[A-Za-z0-9_$]/.test(ch)
}

export function tokenize(source: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  let line = 1
  let lineStart = 0

  const push = (type: TokenType, value: string, startIndex: number) => {
    tokens.push({ type, value, line, column: startIndex - lineStart + 1 })
  }

  while (i < source.length) {
    const ch = source[i]

    if (ch === '\n') {
      line += 1
      i += 1
      lineStart = i
      continue
    }

    if (ch === ' ' || ch === '\t' || ch === '\r') {
      i += 1
      continue
    }

    // Comentarios
    if (ch === '/' && source[i + 1] === '/') {
      while (i < source.length && source[i] !== '\n') i += 1
      continue
    }
    if (ch === '/' && source[i + 1] === '*') {
      const startLine = line
      i += 2
      let closed = false
      while (i < source.length) {
        if (source[i] === '\n') {
          line += 1
          lineStart = i + 1
        }
        if (source[i] === '*' && source[i + 1] === '/') {
          i += 2
          closed = true
          break
        }
        i += 1
      }
      if (!closed) throw new JavaSyntaxError('Comentario /* sin cerrar', startLine)
      continue
    }

    // Anotaciones: se aceptan y se descartan (@Override y similares).
    if (ch === '@') {
      i += 1
      while (i < source.length && isIdentifierPart(source[i])) i += 1
      continue
    }

    // Números
    if (isDigit(ch)) {
      const start = i
      while (i < source.length && isDigit(source[i])) i += 1
      if (source[i] === '.' && isDigit(source[i + 1])) {
        i += 1
        while (i < source.length && isDigit(source[i])) i += 1
      }
      // Sufijos de tipo: 10L, 2.5f, 3d
      if (i < source.length && /[LlFfDd]/.test(source[i])) i += 1
      push('number', source.slice(start, i), start)
      continue
    }

    // Cadenas
    if (ch === '"') {
      const start = i
      i += 1
      let value = ''
      while (i < source.length && source[i] !== '"') {
        if (source[i] === '\n') throw new JavaSyntaxError('Cadena sin cerrar', line)
        if (source[i] === '\\') {
          value += unescape(source[i + 1], line)
          i += 2
        } else {
          value += source[i]
          i += 1
        }
      }
      if (i >= source.length) throw new JavaSyntaxError('Cadena sin cerrar', line)
      i += 1
      push('string', value, start)
      continue
    }

    // Caracteres
    if (ch === "'") {
      const start = i
      i += 1
      let value: string
      if (source[i] === '\\') {
        value = unescape(source[i + 1], line)
        i += 2
      } else {
        value = source[i]
        i += 1
      }
      if (source[i] !== "'") throw new JavaSyntaxError('Literal de carácter mal formado', line)
      i += 1
      push('char', value, start)
      continue
    }

    // Identificadores y palabras reservadas
    if (isIdentifierStart(ch)) {
      const start = i
      while (i < source.length && isIdentifierPart(source[i])) i += 1
      const word = source.slice(start, i)
      // true, false y null se tratan como literales, no como identificadores.
      push(KEYWORDS.has(word) ? 'keyword' : 'identifier', word, start)
      continue
    }

    if (PUNCTUATION.has(ch)) {
      push('punctuation', ch, i)
      i += 1
      continue
    }

    const operator = OPERATORS.find((op) => source.startsWith(op, i))
    if (operator) {
      push('operator', operator, i)
      i += operator.length
      continue
    }

    throw new JavaSyntaxError(`Carácter inesperado: "${ch}"`, line)
  }

  tokens.push({ type: 'eof', value: '', line, column: 1 })
  return tokens
}

function unescape(ch: string, line: number): string {
  switch (ch) {
    case 'n':
      return '\n'
    case 't':
      return '\t'
    case 'r':
      return '\r'
    case '\\':
      return '\\'
    case '"':
      return '"'
    case "'":
      return "'"
    case '0':
      return '\0'
    default:
      throw new JavaSyntaxError(`Secuencia de escape desconocida: \\${ch}`, line)
  }
}
