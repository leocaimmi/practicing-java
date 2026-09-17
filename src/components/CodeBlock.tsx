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
 * Tokenizador mínimo para resaltar Java. Alcanza para los fragmentos cortos de
 * las preguntas y evita sumar una dependencia de resaltado al bundle.
 * El orden de las alternativas importa: primero lo que puede contener palabras.
 */
const TOKEN = new RegExp(
  [
    '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)', // 1: comentarios
    '("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')', // 2: cadenas y caracteres
    '(@\\w+)', // 3: anotaciones
    `\\b(${KEYWORDS.join('|')})\\b`, // 4: palabras reservadas
    '\\b([A-Z][A-Za-z0-9_]*)\\b', // 5: nombres de clase
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 6: números
  ].join('|'),
  'g',
)

const CLASS_BY_GROUP: Record<number, string> = {
  1: 'text-slate-500 dark:text-slate-500 italic',
  2: 'text-emerald-700 dark:text-emerald-300',
  3: 'text-amber-700 dark:text-amber-300',
  4: 'text-violet-700 dark:text-violet-400 font-medium',
  5: 'text-sky-700 dark:text-sky-300',
  6: 'text-rose-700 dark:text-rose-300',
}

function highlight(code: string): ReactNode[] {
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

export function CodeBlock({ code }: { code: string }) {
  const lines = code.split('\n')

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-1.5 dark:border-slate-800">
        <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
          Java
        </span>
      </div>
      <div className="overflow-x-auto">
        <pre className="min-w-full p-3 font-mono text-[13px] leading-relaxed sm:text-sm">
          <code>
            {lines.map((line, index) => (
              <span key={index} className="grid grid-cols-[2ch_1fr] gap-3">
                <span className="text-right text-slate-400 select-none dark:text-slate-600">
                  {index + 1}
                </span>
                <span className="whitespace-pre">{line === '' ? ' ' : highlight(line)}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
