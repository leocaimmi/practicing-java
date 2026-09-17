import { Fragment, type ReactNode } from 'react'

const KEYWORDS = [
  'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
  'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
  'finally', 'float', 'for', 'if', 'implements', 'import', 'instanceof', 'int',
  'interface', 'long', 'new', 'null', 'package', 'private', 'protected',
  'public', 'return', 'short', 'static', 'super', 'switch', 'this', 'throw',
  'throws', 'try', 'void', 'while', 'true', 'false',
]

/**
 * Tokenizador mínimo para resaltar Java. Alcanza para los fragmentos de las
 * preguntas y para el editor de los desafíos, y evita sumar una dependencia de
 * resaltado al bundle.
 * El orden de las alternativas importa: primero lo que puede contener palabras.
 */
const TOKEN = new RegExp(
  [
    '(\\/\\/[^\\n]*)', // 1: comentarios de línea
    '("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')', // 2: cadenas y caracteres
    '(@\\w+)', // 3: anotaciones
    `\\b(${KEYWORDS.join('|')})\\b`, // 4: palabras reservadas
    '\\b([A-Z][A-Za-z0-9_]*)\\b', // 5: nombres de clase
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 6: números
  ].join('|'),
  'g',
)

const CLASS_BY_GROUP: Record<number, string> = {
  1: 'text-slate-500 italic dark:text-slate-500',
  2: 'text-emerald-700 dark:text-emerald-300',
  3: 'text-amber-700 dark:text-amber-300',
  4: 'text-violet-700 dark:text-violet-400',
  5: 'text-sky-700 dark:text-sky-300',
  6: 'text-rose-700 dark:text-rose-300',
}

/** Resalta una línea de Java. Se aplica línea por línea, no al bloque entero. */
export function highlightJava(code: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  TOKEN.lastIndex = 0
  while ((match = TOKEN.exec(code)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{code.slice(lastIndex, match.index)}</Fragment>)
    }

    const group = match.slice(1).findIndex((value) => value !== undefined) + 1
    nodes.push(
      <span key={key++} className={CLASS_BY_GROUP[group]}>
        {match[0]}
      </span>,
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < code.length) {
    nodes.push(<Fragment key={key++}>{code.slice(lastIndex)}</Fragment>)
  }

  return nodes
}
