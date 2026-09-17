import type { Expr, MethodDecl, Program, Stmt } from './ast'
import {
  bool,
  char,
  coerce,
  coerceDeclared,
  compareValues,
  defaultValue,
  describeForTrace,
  describeType,
  double,
  int,
  isNumeric,
  javaEquals,
  javaToString,
  JavaRuntimeError,
  newString,
  NULL,
  numberOf,
  snapshot,
  str,
  type JavaValue,
} from './values'

/** Un paso del trazado, que la interfaz muestra como el paso a paso. */
export interface TraceStep {
  line: number
  /** Variables visibles en el método que se está ejecutando. */
  vars: Array<{ name: string; value: string }>
  /** Salida acumulada hasta este paso. */
  output: string[]
  /** Aclaración opcional, por ejemplo el valor que se retorna. */
  note?: string
  /** Profundidad de llamadas, para dibujar la recursión. */
  depth: number
}

export interface RunOptions {
  /** Corta la ejecución si se superan, para no colgar el navegador. */
  maxSteps?: number
  maxTraceSteps?: number
  maxDepth?: number
}

/**
 * El presupuesto de pasos tiene que dar margen para la recursión ingenua, que
 * es lenta pero correcta: un fibonacci(20) recursivo hace más de trece mil
 * llamadas. Si queda corto, el estudiante ve un error de tiempo agotado y cree
 * que su código está mal. Con este techo, un bucle sin fin igual se corta en
 * menos de un segundo.
 */
const DEFAULTS = { maxSteps: 3_000_000, maxTraceSteps: 400, maxDepth: 120 }

class BreakSignal {}
class ContinueSignal {}
class ReturnSignal {
  readonly value: JavaValue

  constructor(value: JavaValue) {
    this.value = value
  }
}

class Environment {
  private values = new Map<string, JavaValue>()
  private types = new Map<string, string>()
  private readonly parent: Environment | null

  constructor(parent: Environment | null = null) {
    this.parent = parent
  }

  declare(name: string, value: JavaValue, typeName: string): void {
    this.values.set(name, value)
    this.types.set(name, typeName)
  }

  has(name: string): boolean {
    return this.values.has(name) || (this.parent?.has(name) ?? false)
  }

  get(name: string, line: number): JavaValue {
    if (this.values.has(name)) return this.values.get(name)!
    if (this.parent) return this.parent.get(name, line)
    throw new JavaRuntimeError('CompileError', `No se encontró la variable "${name}"`, line)
  }

  typeOf(name: string): string | null {
    if (this.types.has(name)) return this.types.get(name)!
    return this.parent?.typeOf(name) ?? null
  }

  set(name: string, value: JavaValue, line: number): void {
    if (this.values.has(name)) {
      const typeName = this.types.get(name)!
      this.values.set(name, coerce(value, typeName, line))
      return
    }
    if (this.parent) {
      this.parent.set(name, value, line)
      return
    }
    throw new JavaRuntimeError('CompileError', `No se encontró la variable "${name}"`, line)
  }

  /** Aplana la cadena de alcances, con el más externo primero. */
  flatten(into: Map<string, JavaValue> = new Map()): Map<string, JavaValue> {
    this.parent?.flatten(into)
    for (const [name, value] of this.values) into.set(name, value)
    return into
  }
}

const STATIC_CLASSES = new Set([
  'System', 'Math', 'Arrays', 'Collections', 'Integer', 'Double', 'String',
  'Boolean', 'Character', 'Long', 'Objects',
])

export class JavaInterpreter {
  private methods = new Map<string, MethodDecl>()
  private output: string[] = []
  private trace: TraceStep[] = []
  private steps = 0
  private depth = 0
  private limits: Required<RunOptions>
  /** Alcance del método en ejecución, para que el trazado muestre sus variables. */
  private currentEnv: Environment | null = null

  constructor(program: Program, options: RunOptions = {}) {
    this.limits = { ...DEFAULTS, ...options }
    for (const method of program.methods) {
      this.methods.set(method.name, method)
    }
  }

  hasMethod(name: string): boolean {
    return this.methods.has(name)
  }

  methodNames(): string[] {
    return [...this.methods.keys()]
  }

  getOutput(): string[] {
    return this.output
  }

  getTrace(): TraceStep[] {
    return this.trace
  }

  /** Ejecuta un método por nombre con los argumentos dados. */
  invoke(name: string, args: JavaValue[]): JavaValue {
    const method = this.methods.get(name)
    if (!method) {
      throw new JavaRuntimeError('CompileError', `No existe el método "${name}"`, 1)
    }
    return this.callMethod(method, args, method.line)
  }

  private callMethod(method: MethodDecl, args: JavaValue[], line: number): JavaValue {
    if (this.depth >= this.limits.maxDepth) {
      throw new JavaRuntimeError(
        'StackOverflowError',
        'Demasiadas llamadas anidadas. Suele indicar una recursión que no llega al caso base.',
        line,
      )
    }
    if (args.length !== method.params.length) {
      throw new JavaRuntimeError(
        'CompileError',
        `El método ${method.name} espera ${method.params.length} argumento(s) y recibió ${args.length}`,
        line,
      )
    }

    const env = new Environment(null)
    method.params.forEach((param, i) => {
      env.declare(
        param.name,
        coerceDeclared(args[i], param.type.name, param.type.dims, line),
        param.type.dims > 0 ? '#array' : param.type.name,
      )
    })

    const previousEnv = this.currentEnv
    this.currentEnv = env
    this.depth += 1

    try {
      for (const statement of method.body) {
        this.execute(statement, env)
      }
      return NULL
    } catch (error) {
      if (error instanceof ReturnSignal) {
        return coerceDeclared(error.value, method.returnType.name, method.returnType.dims, line)
      }
      throw error
    } finally {
      this.depth -= 1
      this.currentEnv = previousEnv
    }
  }

  // ------------------------------------------------------------- trazado

  private tick(line: number): void {
    this.steps += 1
    if (this.steps > this.limits.maxSteps) {
      throw new JavaRuntimeError(
        'TimeoutError',
        'El programa ejecutó demasiadas instrucciones. Puede haber un bucle que no termina.',
        line,
      )
    }
  }

  private record(line: number, note?: string): void {
    if (this.trace.length >= this.limits.maxTraceSteps) return

    const vars: Array<{ name: string; value: string }> = []
    if (this.currentEnv) {
      for (const [name, value] of this.currentEnv.flatten()) {
        vars.push({ name, value: describeForTrace(snapshot(value)) })
      }
    }

    this.trace.push({ line, vars, output: [...this.output], note, depth: this.depth })
  }

  // ---------------------------------------------------------- sentencias

  /**
   * Ejecuta una sentencia dejando `currentEnv` apuntando a su alcance, para que
   * el trazado muestre también las variables de los bloques anidados, como la
   * `i` de un for. Al terminar se restaura el alcance anterior.
   */
  private execute(stmt: Stmt, env: Environment): void {
    const previousEnv = this.currentEnv
    this.currentEnv = env
    try {
      this.executeInner(stmt, env)
    } finally {
      this.currentEnv = previousEnv
    }
  }

  private executeInner(stmt: Stmt, env: Environment): void {
    this.tick(stmt.line)

    switch (stmt.kind) {
      case 'varDecl': {
        for (const declarator of stmt.declarators) {
          const typeName = stmt.type.name
          const isArray = stmt.type.dims + declarator.extraDims > 0
          let value: JavaValue = NULL

          if (declarator.init) {
            value = this.evaluateWithArrayContext(declarator.init, env, stmt.type)
            if (!isArray) value = coerce(value, typeName, stmt.line)
          } else if (!isArray) {
            value = defaultValue(typeName)
          }

          env.declare(declarator.name, value, isArray ? '#array' : typeName)
        }
        this.record(stmt.line)
        return
      }

      case 'exprStmt':
        this.evaluate(stmt.expr, env)
        this.record(stmt.line)
        return

      case 'if': {
        const condition = this.asBoolean(this.evaluate(stmt.cond, env), stmt.line)
        this.record(stmt.line, condition ? 'la condición se cumple' : 'la condición no se cumple')
        if (condition) this.execute(stmt.then, env)
        else if (stmt.otherwise) this.execute(stmt.otherwise, env)
        return
      }

      case 'while': {
        for (;;) {
          this.tick(stmt.line)
          const condition = this.asBoolean(this.evaluate(stmt.cond, env), stmt.line)
          this.record(stmt.line, condition ? 'entra al ciclo' : 'sale del ciclo')
          if (!condition) break
          try {
            this.execute(stmt.body, new Environment(env))
          } catch (error) {
            if (error instanceof BreakSignal) break
            if (!(error instanceof ContinueSignal)) throw error
          }
        }
        return
      }

      case 'doWhile': {
        for (;;) {
          this.tick(stmt.line)
          try {
            this.execute(stmt.body, new Environment(env))
          } catch (error) {
            if (error instanceof BreakSignal) break
            if (!(error instanceof ContinueSignal)) throw error
          }
          const condition = this.asBoolean(this.evaluate(stmt.cond, env), stmt.line)
          this.record(stmt.line, condition ? 'repite el ciclo' : 'sale del ciclo')
          if (!condition) break
        }
        return
      }

      case 'for': {
        const loopEnv = new Environment(env)
        if (stmt.init) this.execute(stmt.init, loopEnv)

        for (;;) {
          this.tick(stmt.line)
          const condition = stmt.cond
            ? this.asBoolean(this.evaluate(stmt.cond, loopEnv), stmt.line)
            : true
          this.record(stmt.line, condition ? 'entra al ciclo' : 'sale del ciclo')
          if (!condition) break

          try {
            this.execute(stmt.body, new Environment(loopEnv))
          } catch (error) {
            if (error instanceof BreakSignal) break
            if (!(error instanceof ContinueSignal)) throw error
          }

          for (const update of stmt.update) this.evaluate(update, loopEnv)
        }
        return
      }

      case 'forEach': {
        const iterable = this.evaluate(stmt.iterable, env)
        const items = this.itemsOf(iterable, stmt.line)

        for (const item of items) {
          this.tick(stmt.line)
          const loopEnv = new Environment(env)
          loopEnv.declare(
            stmt.varName,
            coerceDeclared(item, stmt.varType.name, stmt.varType.dims, stmt.line),
            stmt.varType.dims > 0 ? '#array' : stmt.varType.name,
          )
          this.record(stmt.line, `${stmt.varName} = ${describeForTrace(item)}`)
          try {
            this.execute(stmt.body, loopEnv)
          } catch (error) {
            if (error instanceof BreakSignal) break
            if (!(error instanceof ContinueSignal)) throw error
          }
        }
        return
      }

      case 'block': {
        const blockEnv = new Environment(env)
        for (const inner of stmt.statements) this.execute(inner, blockEnv)
        return
      }

      case 'return': {
        const value = stmt.value ? this.evaluate(stmt.value, env) : NULL
        this.record(stmt.line, stmt.value ? `retorna ${describeForTrace(value)}` : 'retorna')
        throw new ReturnSignal(value)
      }

      case 'break':
        this.record(stmt.line)
        throw new BreakSignal()

      case 'continue':
        this.record(stmt.line)
        throw new ContinueSignal()
    }
  }

  private itemsOf(value: JavaValue, line: number): JavaValue[] {
    if (value.kind === 'array' || value.kind === 'list' || value.kind === 'set') {
      return [...value.items]
    }
    if (value.kind === 'null') {
      throw new JavaRuntimeError(
        'NullPointerException',
        'Se intentó recorrer una referencia nula',
        line,
      )
    }
    throw new JavaRuntimeError(
      'CompileError',
      `No se puede recorrer con for each un valor de tipo ${describeType(value)}`,
      line,
    )
  }

  private asBoolean(value: JavaValue, line: number): boolean {
    if (value.kind !== 'boolean') {
      throw new JavaRuntimeError(
        'CompileError',
        `Se esperaba una condición boolean y se encontró ${describeType(value)}`,
        line,
      )
    }
    return value.value
  }

  // --------------------------------------------------------- expresiones

  /** Permite que `int[] a = {1,2}` conozca el tipo de los elementos. */
  private evaluateWithArrayContext(
    expr: Expr,
    env: Environment,
    type: { name: string; dims: number },
  ): JavaValue {
    if (expr.kind === 'arrayInit' && !expr.elementType && type.dims > 0) {
      return {
        kind: 'array',
        elementType: type.name,
        items: expr.items.map((item) =>
          coerce(this.evaluate(item, env), type.name, expr.line),
        ),
      }
    }
    return this.evaluate(expr, env)
  }

  private evaluate(expr: Expr, env: Environment): JavaValue {
    this.tick(expr.line)

    switch (expr.kind) {
      case 'literal':
        switch (expr.literalType) {
          case 'int':
            return int(expr.raw as number)
          case 'double':
            return double(expr.raw as number)
          case 'string':
            return str(expr.raw as string)
          case 'char':
            return char(expr.raw as string)
          case 'boolean':
            return bool(expr.raw as boolean)
          case 'null':
            return NULL
        }
        break

      case 'identifier':
        return env.get(expr.name, expr.line)

      case 'unary': {
        const operand = this.evaluate(expr.operand, env)
        if (expr.op === '!') return bool(!this.asBoolean(operand, expr.line))
        if (expr.op === '-') {
          const n = -numberOf(operand)
          return operand.kind === 'double' ? double(n) : int(n)
        }
        if (expr.op === '+') return operand
        if (expr.op === '~') return int(~numberOf(operand))
        break
      }

      case 'binary':
        return this.binary(expr.op, expr, env)

      case 'ternary':
        return this.asBoolean(this.evaluate(expr.cond, env), expr.line)
          ? this.evaluate(expr.then, env)
          : this.evaluate(expr.otherwise, env)

      case 'assign': {
        let value = this.evaluate(expr.value, env)
        if (expr.op !== '=') {
          const current = this.evaluate(expr.target, env)
          value = this.arithmetic(expr.op.slice(0, 1), current, value, expr.line)
        }
        this.assignTo(expr.target, value, env)
        return value
      }

      case 'update': {
        const current = this.evaluate(expr.operand, env)
        const delta = expr.op === '++' ? 1 : -1
        const updated =
          current.kind === 'double'
            ? double(current.value + delta)
            : current.kind === 'char'
              ? char(String.fromCharCode(current.value.charCodeAt(0) + delta))
              : int(numberOf(current) + delta)
        this.assignTo(expr.operand, updated, env)
        return expr.prefix ? updated : current
      }

      case 'index': {
        const target = this.evaluate(expr.array, env)
        const index = numberOf(this.evaluate(expr.index, env))
        if (target.kind === 'null') {
          throw new JavaRuntimeError(
            'NullPointerException',
            'Se intentó indexar una referencia nula',
            expr.line,
          )
        }
        if (target.kind !== 'array') {
          throw new JavaRuntimeError(
            'CompileError',
            `No se puede usar [] sobre un valor de tipo ${describeType(target)}`,
            expr.line,
          )
        }
        if (index < 0 || index >= target.items.length) {
          throw new JavaRuntimeError(
            'ArrayIndexOutOfBoundsException',
            `Índice ${index} fuera de rango para un arreglo de longitud ${target.items.length}`,
            expr.line,
          )
        }
        return target.items[index]
      }

      case 'field':
        return this.field(expr, env)

      case 'call':
        return this.call(expr, env)

      case 'newArray': {
        const size = numberOf(this.evaluate(expr.size, env))
        if (size < 0) {
          throw new JavaRuntimeError(
            'NegativeArraySizeException',
            `No se puede crear un arreglo de tamaño ${size}`,
            expr.line,
          )
        }
        return {
          kind: 'array',
          elementType: expr.elementType.name,
          items: Array.from({ length: size }, () => defaultValue(expr.elementType.name)),
        }
      }

      case 'arrayInit': {
        const elementType = expr.elementType?.name ?? 'Object'
        return {
          kind: 'array',
          elementType,
          items: expr.items.map((item) =>
            coerce(this.evaluate(item, env), elementType, expr.line),
          ),
        }
      }

      case 'newObject':
        return this.construct(expr.className, expr.args.map((a) => this.evaluate(a, env)), expr.line)

      case 'cast': {
        const value = this.evaluate(expr.expr, env)
        return coerce(value, expr.type.name, expr.line)
      }

      case 'instanceof': {
        const value = this.evaluate(expr.expr, env)
        return bool(describeType(value) === expr.type.name || value.kind !== 'null')
      }
    }

    throw new JavaRuntimeError('CompileError', 'Expresión no soportada', expr.line)
  }

  private assignTo(target: Expr, value: JavaValue, env: Environment): void {
    if (target.kind === 'identifier') {
      env.set(target.name, value, target.line)
      return
    }

    if (target.kind === 'index') {
      const array = this.evaluate(target.array, env)
      const index = numberOf(this.evaluate(target.index, env))
      if (array.kind !== 'array') {
        throw new JavaRuntimeError(
          'CompileError',
          'Sólo se puede asignar por índice sobre un arreglo',
          target.line,
        )
      }
      if (index < 0 || index >= array.items.length) {
        throw new JavaRuntimeError(
          'ArrayIndexOutOfBoundsException',
          `Índice ${index} fuera de rango para un arreglo de longitud ${array.items.length}`,
          target.line,
        )
      }
      array.items[index] = coerce(value, array.elementType, target.line)
      return
    }

    throw new JavaRuntimeError('CompileError', 'Asignación no soportada', target.line)
  }

  private binary(op: string, expr: Expr & { kind: 'binary' }, env: Environment): JavaValue {
    // && y || cortocircuitan, igual que en Java.
    if (op === '&&') {
      return this.asBoolean(this.evaluate(expr.left, env), expr.line)
        ? bool(this.asBoolean(this.evaluate(expr.right, env), expr.line))
        : bool(false)
    }
    if (op === '||') {
      return this.asBoolean(this.evaluate(expr.left, env), expr.line)
        ? bool(true)
        : bool(this.asBoolean(this.evaluate(expr.right, env), expr.line))
    }

    const left = this.evaluate(expr.left, env)
    const right = this.evaluate(expr.right, env)

    if (op === '==') return bool(this.referenceEquals(left, right))
    if (op === '!=') return bool(!this.referenceEquals(left, right))

    return this.arithmetic(op, left, right, expr.line)
  }

  /**
   * El operador == compara referencias para los objetos, que es justamente la
   * distinción que la materia insiste en marcar frente a equals().
   */
  private referenceEquals(a: JavaValue, b: JavaValue): boolean {
    if (a.kind === 'null' || b.kind === 'null') return a.kind === b.kind
    if (isNumeric(a) && isNumeric(b)) return numberOf(a) === numberOf(b)
    if (a.kind === 'boolean' && b.kind === 'boolean') return a.value === b.value
    // Java interna los literales, así que dos literales iguales dan true. Si
    // alguna de las dos vino de `new String(...)` tiene id propio y se comparan
    // como referencias, que es la distinción que enseña la materia.
    if (a.kind === 'string' && b.kind === 'string') {
      if (a.id === undefined && b.id === undefined) return a.value === b.value
      return a === b
    }
    return a === b
  }

  private arithmetic(op: string, left: JavaValue, right: JavaValue, line: number): JavaValue {
    if (op === '+' && (left.kind === 'string' || right.kind === 'string')) {
      return str(javaToString(left) + javaToString(right))
    }

    if (!isNumeric(left) || !isNumeric(right)) {
      if (['<', '>', '<=', '>='].includes(op)) {
        throw new JavaRuntimeError(
          'CompileError',
          `No se pueden comparar con ${op} valores de tipo ${describeType(left)} y ${describeType(right)}`,
          line,
        )
      }
      throw new JavaRuntimeError(
        'CompileError',
        `El operador ${op} no se puede aplicar a ${describeType(left)} y ${describeType(right)}`,
        line,
      )
    }

    const a = numberOf(left)
    const b = numberOf(right)

    switch (op) {
      case '<':
        return bool(a < b)
      case '>':
        return bool(a > b)
      case '<=':
        return bool(a <= b)
      case '>=':
        return bool(a >= b)
    }

    // Si alguno es double, el resultado es double; si no, aritmética entera.
    const isDouble = left.kind === 'double' || right.kind === 'double'

    switch (op) {
      case '+':
        return isDouble ? double(a + b) : int(a + b)
      case '-':
        return isDouble ? double(a - b) : int(a - b)
      case '*':
        return isDouble ? double(a * b) : int(a * b)
      case '/':
        if (!isDouble && b === 0) {
          throw new JavaRuntimeError('ArithmeticException', '/ by zero', line)
        }
        return isDouble ? double(a / b) : int(a / b)
      case '%':
        if (!isDouble && b === 0) {
          throw new JavaRuntimeError('ArithmeticException', '/ by zero', line)
        }
        return isDouble ? double(a % b) : int(a % b)
      case '&':
        return int(a & b)
      case '|':
        return int(a | b)
      case '^':
        return int(a ^ b)
      case '<<':
        return int(a << b)
      case '>>':
        return int(a >> b)
      case '>>>':
        return int(a >>> b)
    }

    throw new JavaRuntimeError('CompileError', `Operador no soportado: ${op}`, line)
  }

  private field(expr: Expr & { kind: 'field' }, env: Environment): JavaValue {
    // Constantes de las clases envoltorio.
    if (expr.object.kind === 'identifier' && !env.has(expr.object.name)) {
      const className = expr.object.name
      if (className === 'Integer' && expr.name === 'MAX_VALUE') return int(2147483647)
      if (className === 'Integer' && expr.name === 'MIN_VALUE') return int(-2147483648)
      if (className === 'Math' && expr.name === 'PI') return double(Math.PI)
      if (className === 'Math' && expr.name === 'E') return double(Math.E)
    }

    const target = this.evaluate(expr.object, env)

    if (expr.name === 'length') {
      if (target.kind === 'array') return int(target.items.length)
      throw new JavaRuntimeError(
        'CompileError',
        'length sin paréntesis sólo existe en los arreglos; en String es length()',
        expr.line,
      )
    }

    throw new JavaRuntimeError('CompileError', `No existe el campo "${expr.name}"`, expr.line)
  }

  private call(expr: Expr & { kind: 'call' }, env: Environment): JavaValue {
    // System.out.println / System.out.print
    if (
      expr.object?.kind === 'field' &&
      expr.object.object.kind === 'identifier' &&
      expr.object.object.name === 'System' &&
      expr.object.name === 'out'
    ) {
      const args = expr.args.map((a) => this.evaluate(a, env))
      const text = args.length === 0 ? '' : javaToString(args[0])
      if (expr.name === 'println') {
        this.output.push(text)
      } else if (expr.name === 'print') {
        if (this.output.length === 0) this.output.push(text)
        else this.output[this.output.length - 1] += text
      } else {
        throw new JavaRuntimeError(
          'CompileError',
          `System.out.${expr.name}() no está soportado`,
          expr.line,
        )
      }
      return NULL
    }

    // Método del propio programa.
    if (expr.object === null) {
      const method = this.methods.get(expr.name)
      if (!method) {
        throw new JavaRuntimeError(
          'CompileError',
          `No existe el método "${expr.name}" en tu código`,
          expr.line,
        )
      }
      const args = expr.args.map((a) => this.evaluate(a, env))
      return this.callMethod(method, args, expr.line)
    }

    // Métodos estáticos de las clases de la API.
    if (
      expr.object.kind === 'identifier' &&
      STATIC_CLASSES.has(expr.object.name) &&
      !env.has(expr.object.name)
    ) {
      const args = expr.args.map((a) => this.evaluate(a, env))
      return this.staticCall(expr.object.name, expr.name, args, expr.line)
    }

    const target = this.evaluate(expr.object, env)
    const args = expr.args.map((a) => this.evaluate(a, env))
    return this.instanceCall(target, expr.name, args, expr.line)
  }

  private construct(className: string, args: JavaValue[], line: number): JavaValue {
    switch (className) {
      case 'ArrayList':
      case 'LinkedList': {
        const items = args[0] && (args[0].kind === 'list' || args[0].kind === 'set')
          ? [...args[0].items]
          : []
        return { kind: 'list', impl: className, items }
      }
      case 'HashSet':
      case 'LinkedHashSet':
      case 'TreeSet': {
        const result: JavaValue = { kind: 'set', impl: className, items: [] }
        if (args[0] && (args[0].kind === 'list' || args[0].kind === 'set')) {
          for (const item of args[0].items) this.setAdd(result, item, line)
        }
        return result
      }
      case 'HashMap':
      case 'LinkedHashMap':
      case 'TreeMap':
        return { kind: 'map', impl: className, keys: [], values: [] }
      case 'StringBuilder':
        return { kind: 'builder', value: args[0] ? javaToString(args[0]) : '' }
      case 'String':
        return newString(args[0] ? javaToString(args[0]) : '')
      case 'Integer':
        return int(numberOf(args[0]))
      case 'Double':
        return double(numberOf(args[0]))
      default:
        throw new JavaRuntimeError(
          'CompileError',
          `No se puede instanciar "${className}" en este entorno. Están disponibles ArrayList, LinkedList, HashSet, LinkedHashSet, TreeSet, HashMap, LinkedHashMap, TreeMap y StringBuilder.`,
          line,
        )
    }
  }

  private staticCall(
    className: string,
    method: string,
    args: JavaValue[],
    line: number,
  ): JavaValue {
    const n = (i: number) => numberOf(args[i])

    if (className === 'Math') {
      switch (method) {
        case 'max':
          return args[0].kind === 'double' || args[1].kind === 'double'
            ? double(Math.max(n(0), n(1)))
            : int(Math.max(n(0), n(1)))
        case 'min':
          return args[0].kind === 'double' || args[1].kind === 'double'
            ? double(Math.min(n(0), n(1)))
            : int(Math.min(n(0), n(1)))
        case 'abs':
          return args[0].kind === 'double' ? double(Math.abs(n(0))) : int(Math.abs(n(0)))
        case 'pow':
          return double(Math.pow(n(0), n(1)))
        case 'sqrt':
          return double(Math.sqrt(n(0)))
        case 'floor':
          return double(Math.floor(n(0)))
        case 'ceil':
          return double(Math.ceil(n(0)))
        case 'round':
          return int(Math.round(n(0)))
        case 'random':
          return double(Math.random())
      }
    }

    if (className === 'Integer') {
      switch (method) {
        case 'parseInt': {
          const text = javaToString(args[0]).trim()
          if (!/^[+-]?\d+$/.test(text)) {
            throw new JavaRuntimeError(
              'NumberFormatException',
              `For input string: "${text}"`,
              line,
            )
          }
          return int(Number(text))
        }
        case 'valueOf':
          return args[0].kind === 'string' ? int(Number(args[0].value)) : int(n(0))
        case 'toString':
          return str(javaToString(args[0]))
        case 'compare':
          return int(n(0) < n(1) ? -1 : n(0) > n(1) ? 1 : 0)
        case 'max':
          return int(Math.max(n(0), n(1)))
        case 'min':
          return int(Math.min(n(0), n(1)))
      }
    }

    if (className === 'Double' && method === 'parseDouble') {
      const text = javaToString(args[0]).trim()
      const parsed = Number(text)
      if (Number.isNaN(parsed)) {
        throw new JavaRuntimeError('NumberFormatException', `For input string: "${text}"`, line)
      }
      return double(parsed)
    }

    if (className === 'Boolean' && method === 'parseBoolean') {
      return bool(javaToString(args[0]).toLowerCase() === 'true')
    }

    if (className === 'String' && (method === 'valueOf' || method === 'join')) {
      if (method === 'valueOf') return str(javaToString(args[0]))
      const separator = javaToString(args[0])
      const rest = args[1] && (args[1].kind === 'list' || args[1].kind === 'array')
        ? args[1].items
        : args.slice(1)
      return str(rest.map(javaToString).join(separator))
    }

    if (className === 'Character') {
      const c = args[0].kind === 'char' ? args[0].value : javaToString(args[0])
      switch (method) {
        case 'isDigit':
          return bool(/^\d$/.test(c))
        case 'isLetter':
          return bool(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]$/.test(c))
        case 'isUpperCase':
          return bool(c === c.toUpperCase() && c !== c.toLowerCase())
        case 'isLowerCase':
          return bool(c === c.toLowerCase() && c !== c.toUpperCase())
        case 'isWhitespace':
          return bool(/^\s$/.test(c))
        case 'toUpperCase':
          return char(c.toUpperCase())
        case 'toLowerCase':
          return char(c.toLowerCase())
      }
    }

    if (className === 'Arrays') {
      const target = args[0]
      switch (method) {
        case 'sort':
          if (target.kind !== 'array') break
          target.items.sort((a, b) => compareValues(a, b, line))
          return NULL
        case 'toString':
          if (target.kind !== 'array') break
          return str(`[${target.items.map(javaToString).join(', ')}]`)
        case 'asList':
          if (target?.kind === 'array') {
            return { kind: 'list', impl: 'ArrayList', items: [...target.items] }
          }
          return { kind: 'list', impl: 'ArrayList', items: args }
        case 'fill':
          if (target.kind !== 'array') break
          target.items = target.items.map(() => args[1])
          return NULL
        case 'equals':
          return bool(javaEquals(args[0], args[1]))
      }
    }

    if (className === 'Collections') {
      const target = args[0]
      switch (method) {
        case 'sort':
          if (target.kind !== 'list') break
          target.items.sort((a, b) => compareValues(a, b, line))
          return NULL
        case 'reverse':
          if (target.kind !== 'list') break
          target.items.reverse()
          return NULL
        case 'max':
          if (target.kind !== 'list' && target.kind !== 'set') break
          if (target.items.length === 0) {
            throw new JavaRuntimeError('NoSuchElementException', 'La colección está vacía', line)
          }
          return target.items.reduce((a, b) => (compareValues(a, b, line) >= 0 ? a : b))
        case 'min':
          if (target.kind !== 'list' && target.kind !== 'set') break
          if (target.items.length === 0) {
            throw new JavaRuntimeError('NoSuchElementException', 'La colección está vacía', line)
          }
          return target.items.reduce((a, b) => (compareValues(a, b, line) <= 0 ? a : b))
        case 'frequency':
          if (target.kind !== 'list' && target.kind !== 'set') break
          return int(target.items.filter((item) => javaEquals(item, args[1])).length)
      }
    }

    if (className === 'Objects' && method === 'equals') {
      return bool(javaEquals(args[0], args[1]))
    }

    throw new JavaRuntimeError(
      'CompileError',
      `${className}.${method}() no está soportado en este entorno`,
      line,
    )
  }

  private setAdd(set: JavaValue & { kind: 'set' }, item: JavaValue, line: number): boolean {
    if (set.items.some((existing) => javaEquals(existing, item))) return false
    set.items.push(item)
    if (set.impl === 'TreeSet') set.items.sort((a, b) => compareValues(a, b, line))
    return true
  }

  private instanceCall(
    target: JavaValue,
    method: string,
    args: JavaValue[],
    line: number,
  ): JavaValue {
    if (target.kind === 'null') {
      throw new JavaRuntimeError(
        'NullPointerException',
        `Se intentó invocar ${method}() sobre una referencia nula`,
        line,
      )
    }

    if (method === 'equals') return bool(javaEquals(target, args[0]))
    if (method === 'toString') return str(javaToString(target))
    if (method === 'hashCode') return int(hashOf(javaToString(target)))

    switch (target.kind) {
      case 'string':
        return this.stringCall(target.value, method, args, line)
      case 'list':
        return this.listCall(target, method, args, line)
      case 'set':
        return this.setCall(target, method, args, line)
      case 'map':
        return this.mapCall(target, method, args, line)
      case 'builder':
        return this.builderCall(target, method, args, line)
      case 'int':
      case 'double':
      case 'char':
        switch (method) {
          case 'intValue':
            return int(numberOf(target))
          case 'doubleValue':
            return double(numberOf(target))
          case 'compareTo':
            return int(compareValues(target, args[0], line))
        }
        break
      case 'array':
        break
    }

    throw new JavaRuntimeError(
      'CompileError',
      `El tipo ${describeType(target)} no tiene el método ${method}() en este entorno`,
      line,
    )
  }

  private stringCall(value: string, method: string, args: JavaValue[], line: number): JavaValue {
    const arg = (i: number) => javaToString(args[i])
    const idx = (i: number) => numberOf(args[i])

    switch (method) {
      case 'length':
        return int(value.length)
      case 'charAt': {
        const i = idx(0)
        if (i < 0 || i >= value.length) {
          throw new JavaRuntimeError(
            'StringIndexOutOfBoundsException',
            `Índice ${i} fuera de rango para una cadena de longitud ${value.length}`,
            line,
          )
        }
        return char(value[i])
      }
      case 'substring': {
        const from = idx(0)
        const to = args.length > 1 ? idx(1) : value.length
        if (from < 0 || to > value.length || from > to) {
          throw new JavaRuntimeError(
            'StringIndexOutOfBoundsException',
            `begin ${from}, end ${to}, length ${value.length}`,
            line,
          )
        }
        return str(value.slice(from, to))
      }
      case 'indexOf':
        return int(value.indexOf(arg(0)))
      case 'lastIndexOf':
        return int(value.lastIndexOf(arg(0)))
      case 'equalsIgnoreCase':
        return bool(value.toLowerCase() === arg(0).toLowerCase())
      case 'toUpperCase':
        return str(value.toUpperCase())
      case 'toLowerCase':
        return str(value.toLowerCase())
      case 'trim':
      case 'strip':
        return str(value.trim())
      case 'isEmpty':
        return bool(value.length === 0)
      case 'isBlank':
        return bool(value.trim().length === 0)
      case 'contains':
        return bool(value.includes(arg(0)))
      case 'startsWith':
        return bool(value.startsWith(arg(0)))
      case 'endsWith':
        return bool(value.endsWith(arg(0)))
      case 'concat':
        return str(value + arg(0))
      case 'replace':
        return str(value.split(arg(0)).join(arg(1)))
      case 'compareTo':
        return int(value < arg(0) ? -1 : value > arg(0) ? 1 : 0)
      case 'compareToIgnoreCase': {
        const a = value.toLowerCase()
        const b = arg(0).toLowerCase()
        return int(a < b ? -1 : a > b ? 1 : 0)
      }
      case 'split':
        return {
          kind: 'array',
          elementType: 'String',
          items: value.split(arg(0)).map(str),
        }
      case 'toCharArray':
        return {
          kind: 'array',
          elementType: 'char',
          items: [...value].map(char),
        }
      case 'repeat':
        return str(value.repeat(idx(0)))
    }

    throw new JavaRuntimeError(
      'CompileError',
      `String no tiene el método ${method}() en este entorno`,
      line,
    )
  }

  private listCall(
    target: JavaValue & { kind: 'list' },
    method: string,
    args: JavaValue[],
    line: number,
  ): JavaValue {
    const checkIndex = (i: number) => {
      if (i < 0 || i >= target.items.length) {
        throw new JavaRuntimeError(
          'IndexOutOfBoundsException',
          `Index ${i} out of bounds for length ${target.items.length}`,
          line,
        )
      }
    }

    switch (method) {
      case 'add':
        if (args.length === 2) {
          target.items.splice(numberOf(args[0]), 0, args[1])
          return NULL
        }
        target.items.push(args[0])
        return bool(true)
      case 'addFirst':
        target.items.unshift(args[0])
        return NULL
      case 'addLast':
        target.items.push(args[0])
        return NULL
      case 'get': {
        const i = numberOf(args[0])
        checkIndex(i)
        return target.items[i]
      }
      case 'getFirst':
      case 'peek':
        return target.items.length ? target.items[0] : NULL
      case 'getLast':
        return target.items.length ? target.items[target.items.length - 1] : NULL
      case 'set': {
        const i = numberOf(args[0])
        checkIndex(i)
        const previous = target.items[i]
        target.items[i] = args[1]
        return previous
      }
      case 'remove': {
        // remove(int) borra por índice; remove(Object) por igualdad.
        if (args[0].kind === 'int') {
          const i = numberOf(args[0])
          checkIndex(i)
          return target.items.splice(i, 1)[0]
        }
        const found = target.items.findIndex((item) => javaEquals(item, args[0]))
        if (found < 0) return bool(false)
        target.items.splice(found, 1)
        return bool(true)
      }
      case 'removeFirst':
      case 'poll':
        return target.items.length ? target.items.shift()! : NULL
      case 'removeLast':
      case 'pop':
        return target.items.length ? target.items.pop()! : NULL
      case 'push':
        target.items.unshift(args[0])
        return NULL
      case 'offer':
        target.items.push(args[0])
        return bool(true)
      case 'size':
        return int(target.items.length)
      case 'isEmpty':
        return bool(target.items.length === 0)
      case 'contains':
        return bool(target.items.some((item) => javaEquals(item, args[0])))
      case 'indexOf':
        return int(target.items.findIndex((item) => javaEquals(item, args[0])))
      case 'lastIndexOf': {
        for (let i = target.items.length - 1; i >= 0; i--) {
          if (javaEquals(target.items[i], args[0])) return int(i)
        }
        return int(-1)
      }
      case 'clear':
        target.items.length = 0
        return NULL
      case 'addAll':
        if (args[0].kind === 'list' || args[0].kind === 'set') {
          target.items.push(...args[0].items)
        }
        return bool(true)
      case 'sort':
        target.items.sort((a, b) => compareValues(a, b, line))
        return NULL
    }

    throw new JavaRuntimeError(
      'CompileError',
      `${target.impl} no tiene el método ${method}() en este entorno`,
      line,
    )
  }

  private setCall(
    target: JavaValue & { kind: 'set' },
    method: string,
    args: JavaValue[],
    line: number,
  ): JavaValue {
    switch (method) {
      case 'add':
        return bool(this.setAdd(target, args[0], line))
      case 'remove': {
        const found = target.items.findIndex((item) => javaEquals(item, args[0]))
        if (found < 0) return bool(false)
        target.items.splice(found, 1)
        return bool(true)
      }
      case 'contains':
        return bool(target.items.some((item) => javaEquals(item, args[0])))
      case 'size':
        return int(target.items.length)
      case 'isEmpty':
        return bool(target.items.length === 0)
      case 'clear':
        target.items.length = 0
        return NULL
      case 'addAll':
        if (args[0].kind === 'list' || args[0].kind === 'set') {
          for (const item of args[0].items) this.setAdd(target, item, line)
        }
        return bool(true)
      case 'first':
        return target.items.length ? target.items[0] : NULL
      case 'last':
        return target.items.length ? target.items[target.items.length - 1] : NULL
    }

    throw new JavaRuntimeError(
      'CompileError',
      `${target.impl} no tiene el método ${method}() en este entorno`,
      line,
    )
  }

  private mapCall(
    target: JavaValue & { kind: 'map' },
    method: string,
    args: JavaValue[],
    line: number,
  ): JavaValue {
    const indexOfKey = (key: JavaValue) => target.keys.findIndex((k) => javaEquals(k, key))

    switch (method) {
      case 'put': {
        const at = indexOfKey(args[0])
        if (at >= 0) {
          const previous = target.values[at]
          target.values[at] = args[1]
          return previous
        }
        target.keys.push(args[0])
        target.values.push(args[1])
        if (target.impl === 'TreeMap') {
          const order = target.keys
            .map((key, i) => ({ key, value: target.values[i] }))
            .sort((a, b) => compareValues(a.key, b.key, line))
          target.keys = order.map((e) => e.key)
          target.values = order.map((e) => e.value)
        }
        return NULL
      }
      case 'get': {
        const at = indexOfKey(args[0])
        return at >= 0 ? target.values[at] : NULL
      }
      case 'getOrDefault': {
        const at = indexOfKey(args[0])
        return at >= 0 ? target.values[at] : args[1]
      }
      case 'remove': {
        const at = indexOfKey(args[0])
        if (at < 0) return NULL
        const previous = target.values[at]
        target.keys.splice(at, 1)
        target.values.splice(at, 1)
        return previous
      }
      case 'containsKey':
        return bool(indexOfKey(args[0]) >= 0)
      case 'containsValue':
        return bool(target.values.some((value) => javaEquals(value, args[0])))
      case 'size':
        return int(target.keys.length)
      case 'isEmpty':
        return bool(target.keys.length === 0)
      case 'clear':
        target.keys.length = 0
        target.values.length = 0
        return NULL
      case 'keySet':
        return { kind: 'set', impl: 'LinkedHashSet', items: [...target.keys] }
      case 'values':
        return { kind: 'list', impl: 'ArrayList', items: [...target.values] }
      case 'firstKey':
        return target.keys.length ? target.keys[0] : NULL
      case 'lastKey':
        return target.keys.length ? target.keys[target.keys.length - 1] : NULL
    }

    throw new JavaRuntimeError(
      'CompileError',
      `${target.impl} no tiene el método ${method}() en este entorno`,
      line,
    )
  }

  private builderCall(
    target: JavaValue & { kind: 'builder' },
    method: string,
    args: JavaValue[],
    line: number,
  ): JavaValue {
    switch (method) {
      case 'append':
        target.value += javaToString(args[0])
        return target
      case 'insert':
        target.value =
          target.value.slice(0, numberOf(args[0])) +
          javaToString(args[1]) +
          target.value.slice(numberOf(args[0]))
        return target
      case 'reverse':
        target.value = [...target.value].reverse().join('')
        return target
      case 'length':
        return int(target.value.length)
      case 'charAt':
        return char(target.value[numberOf(args[0])])
      case 'setCharAt': {
        const i = numberOf(args[0])
        target.value = target.value.slice(0, i) + javaToString(args[1]) + target.value.slice(i + 1)
        return NULL
      }
      case 'delete':
        target.value =
          target.value.slice(0, numberOf(args[0])) + target.value.slice(numberOf(args[1]))
        return NULL
      case 'deleteCharAt': {
        const i = numberOf(args[0])
        target.value = target.value.slice(0, i) + target.value.slice(i + 1)
        return NULL
      }
    }

    throw new JavaRuntimeError(
      'CompileError',
      `StringBuilder no tiene el método ${method}() en este entorno`,
      line,
    )
  }
}

function hashOf(text: string): number {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (Math.imul(31, hash) + text.charCodeAt(i)) | 0
  }
  return hash
}

export { JavaRuntimeError }
