import { parse } from './parser'
import { JavaSyntaxError } from './lexer'
import { JavaInterpreter, type TraceStep } from './interpreter'
import {
  bool,
  char,
  double,
  int,
  javaEquals,
  javaToString,
  JavaRuntimeError,
  NULL,
  str,
  type JavaValue,
} from './values'

/** Cómo se interpreta un literal de los tests al pasarlo a Java. */
export type ValueHint =
  | 'int'
  | 'double'
  | 'boolean'
  | 'char'
  | 'String'
  | 'int[]'
  | 'double[]'
  | 'String[]'
  | 'List<Integer>'
  | 'List<String>'

export type Literal = number | string | boolean | null | Literal[]

export interface TestCase {
  args: Literal[]
  expected: Literal
  /** Si el desafío se evalúa por lo impreso, en vez de por lo retornado. */
  expectedOutput?: string[]
  /** Los ocultos no se muestran hasta que se envía la solución. */
  hidden?: boolean
}

export interface TestResult {
  index: number
  hidden: boolean
  call: string
  expected: string
  actual: string
  passed: boolean
  /** Excepción de Java, cuando el caso falló por un error de ejecución. */
  error?: { exception: string; message: string; line: number }
}

export interface RunReport {
  /** Error de sintaxis o de resolución previo a correr los tests. */
  compileError?: { message: string; line: number }
  results: TestResult[]
  passed: number
  total: number
  allPassed: boolean
  /** Trazado del caso visible que se muestra paso a paso. */
  trace: TraceStep[]
  traceCall: string
  output: string[]
  /** Cómo terminó el caso que se está mostrando paso a paso. */
  traceOutcome?: TraceOutcome
}

/** Desenlace de una ejecución, para cerrar el paso a paso con el resultado. */
export interface TraceOutcome {
  call: string
  expected: string
  actual: string
  passed: boolean
  /** Si cortó con una excepción, dónde y cuál. */
  exception?: string
  errorLine?: number
}

export interface ChallengeSpec {
  methodName: string
  argHints: ValueHint[]
  returnHint: ValueHint | 'void'
  tests: TestCase[]
}

/** Convierte un literal de los tests al valor de Java correspondiente. */
export function toJava(value: Literal, hint: ValueHint): JavaValue {
  if (value === null) return NULL

  switch (hint) {
    case 'int':
      return int(value as number)
    case 'double':
      return double(value as number)
    case 'boolean':
      return bool(value as boolean)
    case 'char':
      return char(value as string)
    case 'String':
      return str(value as string)
    case 'int[]':
      return { kind: 'array', elementType: 'int', items: (value as number[]).map(int) }
    case 'double[]':
      return { kind: 'array', elementType: 'double', items: (value as number[]).map(double) }
    case 'String[]':
      return { kind: 'array', elementType: 'String', items: (value as string[]).map(str) }
    case 'List<Integer>':
      return { kind: 'list', impl: 'ArrayList', items: (value as number[]).map(int) }
    case 'List<String>':
      return { kind: 'list', impl: 'ArrayList', items: (value as string[]).map(str) }
  }
}

/** Cómo se escribiría el argumento en código Java, para mostrarlo en el test. */
function literalToSource(value: Literal, hint: ValueHint): string {
  if (value === null) return 'null'
  if (hint === 'String') return JSON.stringify(value)
  if (hint === 'char') return `'${value}'`
  if (Array.isArray(value)) {
    const inner: ValueHint = hint === 'String[]' || hint === 'List<String>' ? 'String' : 'int'
    const items = value.map((item) => literalToSource(item, inner)).join(', ')
    return hint.startsWith('List') ? `[${items}]` : `{${items}}`
  }
  return String(value)
}

function describeCall(methodName: string, test: TestCase, hints: ValueHint[]): string {
  const args = test.args.map((arg, i) => literalToSource(arg, hints[i] ?? 'int')).join(', ')
  return `${methodName}(${args})`
}

/**
 * Compila el código del estudiante y lo corre contra todos los casos.
 *
 * Cada caso se ejecuta con un intérprete nuevo, para que la salida y el estado
 * de uno no se filtren al siguiente.
 */
export function runChallenge(source: string, spec: ChallengeSpec): RunReport {
  const empty: RunReport = {
    results: [],
    passed: 0,
    total: spec.tests.length,
    allPassed: false,
    trace: [],
    traceCall: '',
    output: [],
  }

  let program
  try {
    program = parse(source)
  } catch (error) {
    if (error instanceof JavaSyntaxError) {
      return { ...empty, compileError: { message: error.message, line: error.line } }
    }
    throw error
  }

  const probe = new JavaInterpreter(program)
  if (!probe.hasMethod(spec.methodName)) {
    const available = probe.methodNames()
    const hint = available.length
      ? ` Encontré: ${available.map((m) => `${m}()`).join(', ')}.`
      : ''
    return {
      ...empty,
      compileError: {
        message: `No se encontró el método ${spec.methodName}().${hint}`,
        line: 1,
      },
    }
  }

  const results: TestResult[] = []

  /**
   * Trazados de los casos visibles. Al final se elige cuál mostrar: si algo
   * falló conviene el caso que falló, y si pasó todo, el más largo, porque el
   * caso borde suele ejecutar dos líneas y no enseña nada.
   */
  const candidates: Array<{
    call: string
    trace: TraceStep[]
    output: string[]
    passed: boolean
    outcome: TraceOutcome
  }> = []

  spec.tests.forEach((test, index) => {
    const interpreter = new JavaInterpreter(program)
    const call = describeCall(spec.methodName, test, spec.argHints)
    const args = test.args.map((arg, i) => toJava(arg, spec.argHints[i] ?? 'int'))

    const expectsOutput = test.expectedOutput !== undefined
    const expected = expectsOutput
      ? test.expectedOutput!.join('\n')
      : javaToString(toJava(test.expected, spec.returnHint === 'void' ? 'String' : spec.returnHint))

    try {
      const returned = interpreter.invoke(spec.methodName, args)
      const produced = interpreter.getOutput()
      const actual = expectsOutput ? produced.join('\n') : javaToString(returned)

      const passed = expectsOutput
        ? actual === expected
        : javaEquals(
            returned,
            toJava(test.expected, spec.returnHint === 'void' ? 'String' : spec.returnHint),
          )

      results.push({ index, hidden: test.hidden ?? false, call, expected, actual, passed })

      if (!test.hidden) {
        candidates.push({
          call,
          trace: interpreter.getTrace(),
          output: produced,
          passed,
          outcome: { call, expected, actual, passed },
        })
      }
    } catch (error) {
      if (error instanceof JavaRuntimeError) {
        results.push({
          index,
          hidden: test.hidden ?? false,
          call,
          expected,
          actual: `${error.exception}: ${error.message}`,
          passed: false,
          error: { exception: error.exception, message: error.message, line: error.line },
        })
        if (!test.hidden) {
          candidates.push({
            call,
            trace: interpreter.getTrace(),
            output: interpreter.getOutput(),
            passed: false,
            outcome: {
              call,
              expected,
              actual: `${error.exception}: ${error.message}`,
              passed: false,
              exception: error.exception,
              errorLine: error.line,
            },
          })
        }
      } else {
        throw error
      }
    }
  })

  const passed = results.filter((r) => r.passed).length

  const chosen =
    candidates.find((candidate) => !candidate.passed) ??
    candidates.reduce<(typeof candidates)[number] | undefined>(
      (best, candidate) =>
        !best || candidate.trace.length > best.trace.length ? candidate : best,
      undefined,
    )

  return {
    results,
    passed,
    total: results.length,
    allPassed: passed === results.length && results.length > 0,
    trace: chosen?.trace ?? [],
    traceCall: chosen?.call ?? '',
    output: chosen?.output ?? [],
    traceOutcome: chosen?.outcome,
  }
}
