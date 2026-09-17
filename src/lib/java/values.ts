/** Representación en memoria de los valores de Java durante la interpretación. */

export type JavaValue =
  | { kind: 'int'; value: number }
  | { kind: 'double'; value: number }
  | { kind: 'boolean'; value: boolean }
  | { kind: 'char'; value: string }
  | { kind: 'string'; value: string; id?: number }
  | { kind: 'null' }
  | { kind: 'array'; elementType: string; items: JavaValue[] }
  | { kind: 'list'; impl: string; items: JavaValue[] }
  | { kind: 'set'; impl: string; items: JavaValue[] }
  | { kind: 'map'; impl: string; keys: JavaValue[]; values: JavaValue[] }
  | { kind: 'builder'; value: string }

export class JavaRuntimeError extends Error {
  /** Nombre de la excepción tal como la mostraría Java. */
  readonly exception: string
  readonly line: number

  constructor(exception: string, message: string, line: number) {
    super(message)
    this.name = 'JavaRuntimeError'
    this.exception = exception
    this.line = line
  }
}

export const NULL: JavaValue = { kind: 'null' }

export function int(value: number): JavaValue {
  return { kind: 'int', value: Math.trunc(value) }
}

export function double(value: number): JavaValue {
  return { kind: 'double', value }
}

export function bool(value: boolean): JavaValue {
  return { kind: 'boolean', value }
}

export function str(value: string): JavaValue {
  return { kind: 'string', value }
}

let nextStringId = 1

/**
 * Cadena creada con `new String(...)`.
 *
 * Java interna los literales, así que dos literales iguales comparten objeto y
 * `==` da true. En cambio `new String(...)` crea siempre un objeto nuevo. El id
 * es lo que permite distinguir los dos casos, que es justo lo que la materia
 * marca al contrastar `==` con `equals()`.
 */
export function newString(value: string): JavaValue {
  return { kind: 'string', value, id: nextStringId++ }
}

export function char(value: string): JavaValue {
  return { kind: 'char', value }
}

export function isNumeric(value: JavaValue): boolean {
  return value.kind === 'int' || value.kind === 'double' || value.kind === 'char'
}

/** Valor numérico de un operando, promoviendo char a su código. */
export function numberOf(value: JavaValue): number {
  if (value.kind === 'int' || value.kind === 'double') return value.value
  if (value.kind === 'char') return value.value.charCodeAt(0)
  return NaN
}

/** Formatea un double como lo hace Java: 8 se imprime 8.0. */
function formatDouble(n: number): string {
  if (Number.isNaN(n)) return 'NaN'
  if (n === Infinity) return 'Infinity'
  if (n === -Infinity) return '-Infinity'
  if (Number.isInteger(n) && Math.abs(n) < 1e7) return `${n}.0`
  return String(n)
}

export function javaToString(value: JavaValue): string {
  switch (value.kind) {
    case 'int':
      return String(value.value)
    case 'double':
      return formatDouble(value.value)
    case 'boolean':
      return value.value ? 'true' : 'false'
    case 'char':
      return value.value
    case 'string':
      return value.value
    case 'null':
      return 'null'
    case 'builder':
      return value.value
    case 'array':
      // Java imprime la referencia; se muestra el contenido porque es más útil
      // para estudiar, y Arrays.toString() da lo mismo.
      return `[${value.items.map(javaToString).join(', ')}]`
    case 'list':
      return `[${value.items.map(javaToString).join(', ')}]`
    case 'set':
      return `[${value.items.map(javaToString).join(', ')}]`
    case 'map':
      return `{${value.keys
        .map((k, i) => `${javaToString(k)}=${javaToString(value.values[i])}`)
        .join(', ')}}`
  }
}

/**
 * Formato para el paso a paso: igual que javaToString, pero con las cadenas y
 * los caracteres entre comillas. Sin eso, una cadena vacía se ve como nada y no
 * se distingue el número 5 del texto "5".
 */
export function describeForTrace(value: JavaValue): string {
  if (value.kind === 'string') return `"${value.value}"`
  if (value.kind === 'char') return `'${value.value}'`
  if (value.kind === 'array' || value.kind === 'list' || value.kind === 'set') {
    return `[${value.items.map(describeForTrace).join(', ')}]`
  }
  if (value.kind === 'map') {
    return `{${value.keys
      .map((k, i) => `${describeForTrace(k)}=${describeForTrace(value.values[i])}`)
      .join(', ')}}`
  }
  return javaToString(value)
}

/** Igualdad por valor, la que aplica equals() en las clases del material. */
export function javaEquals(a: JavaValue, b: JavaValue): boolean {
  if (a.kind === 'null' || b.kind === 'null') return a.kind === b.kind

  if (isNumeric(a) && isNumeric(b)) {
    // Dos char se comparan por su carácter; en cualquier otro caso se comparan
    // los valores numéricos, promoviendo char a su código.
    if (a.kind === 'char' && b.kind === 'char') return a.value === b.value
    return numberOf(a) === numberOf(b)
  }

  if (a.kind === 'string' && b.kind === 'string') return a.value === b.value
  if (a.kind === 'boolean' && b.kind === 'boolean') return a.value === b.value

  if ((a.kind === 'array' || a.kind === 'list') && (b.kind === 'array' || b.kind === 'list')) {
    if (a.items.length !== b.items.length) return false
    return a.items.every((item, i) => javaEquals(item, b.items[i]))
  }

  if (a.kind === 'set' && b.kind === 'set') {
    if (a.items.length !== b.items.length) return false
    return a.items.every((item) => b.items.some((other) => javaEquals(item, other)))
  }

  if (a.kind === 'map' && b.kind === 'map') {
    if (a.keys.length !== b.keys.length) return false
    return a.keys.every((key, i) => {
      const j = b.keys.findIndex((other) => javaEquals(key, other))
      return j >= 0 && javaEquals(a.values[i], b.values[j])
    })
  }

  return false
}

/** Orden natural, el que usan Collections.sort, Arrays.sort y TreeSet. */
export function compareValues(a: JavaValue, b: JavaValue, line: number): number {
  if (a.kind === 'string' && b.kind === 'string') {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
  }
  if (a.kind === 'char' && b.kind === 'char') {
    return a.value < b.value ? -1 : a.value > b.value ? 1 : 0
  }
  if (isNumeric(a) && isNumeric(b)) {
    const x = numberOf(a)
    const y = numberOf(b)
    return x < y ? -1 : x > y ? 1 : 0
  }
  if (a.kind === 'boolean' && b.kind === 'boolean') {
    return Number(a.value) - Number(b.value)
  }
  throw new JavaRuntimeError(
    'ClassCastException',
    'Los elementos que se quieren ordenar no implementan Comparable',
    line,
  )
}

/** Valor por defecto de un tipo, el que toman los arreglos recién creados. */
export function defaultValue(typeName: string): JavaValue {
  switch (typeName) {
    case 'int':
    case 'long':
    case 'short':
    case 'byte':
      return int(0)
    case 'double':
    case 'float':
      return double(0)
    case 'boolean':
      return bool(false)
    case 'char':
      return char('\0')
    default:
      return NULL
  }
}

/** Convierte un valor al tipo declarado de una variable o parámetro. */
export function coerce(value: JavaValue, typeName: string, line: number): JavaValue {
  if (value.kind === 'null') return value

  switch (typeName) {
    case 'int':
    case 'long':
    case 'short':
    case 'byte':
    case 'Integer':
    case 'Long':
      if (isNumeric(value)) return int(numberOf(value))
      break
    case 'double':
    case 'float':
    case 'Double':
    case 'Float':
      if (isNumeric(value)) return double(numberOf(value))
      break
    case 'char':
    case 'Character':
      if (value.kind === 'char') return value
      if (isNumeric(value)) return char(String.fromCharCode(numberOf(value)))
      break
    case 'boolean':
    case 'Boolean':
      if (value.kind === 'boolean') return value
      break
    case 'String':
      if (value.kind === 'string') return value
      break
    default:
      return value
  }

  throw new JavaRuntimeError(
    'IncompatibleTypes',
    `No se puede asignar un valor de tipo ${describeType(value)} a una variable ${typeName}`,
    line,
  )
}

/**
 * Convierte al tipo declarado teniendo en cuenta los corchetes: un `int[]` no
 * se convierte a `int`, se deja tal cual.
 */
export function coerceDeclared(
  value: JavaValue,
  typeName: string,
  dims: number,
  line: number,
): JavaValue {
  if (dims > 0) return value
  return coerce(value, typeName, line)
}

export function describeType(value: JavaValue): string {
  switch (value.kind) {
    case 'int':
      return 'int'
    case 'double':
      return 'double'
    case 'boolean':
      return 'boolean'
    case 'char':
      return 'char'
    case 'string':
      return 'String'
    case 'null':
      return 'null'
    case 'array':
      return `${value.elementType}[]`
    case 'list':
      return value.impl
    case 'set':
      return value.impl
    case 'map':
      return value.impl
    case 'builder':
      return 'StringBuilder'
  }
}

/** Copia superficial, para que el trazado guarde el estado de cada paso. */
export function snapshot(value: JavaValue): JavaValue {
  switch (value.kind) {
    case 'array':
      return { ...value, items: value.items.map(snapshot) }
    case 'list':
    case 'set':
      return { ...value, items: value.items.map(snapshot) }
    case 'map':
      return { ...value, keys: value.keys.map(snapshot), values: value.values.map(snapshot) }
    default:
      return value
  }
}
