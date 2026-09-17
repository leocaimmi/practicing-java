import { useEffect, useLayoutEffect, useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import { highlightJava } from './javaHighlight'

interface Props {
  value: string
  onChange: (value: string) => void
  /** Línea a marcar en rojo, cuando el intérprete reportó un error ahí. */
  errorLine?: number
  disabled?: boolean
}

const INDENT = '    '

/**
 * Editor liviano: un textarea transparente encima de un <pre> resaltado.
 *
 * Evita sumar CodeMirror o Monaco, que pesan más que toda la aplicación. Para
 * que el texto calce exacto, el textarea y el <pre> comparten tipografía,
 * interlineado y padding, y sólo hay que sincronizar el desplazamiento
 * horizontal.
 */
export function CodeEditor({ value, onChange, errorLine, disabled }: Props) {
  const textarea = useRef<HTMLTextAreaElement>(null)
  const highlight = useRef<HTMLPreElement>(null)

  const lines = value.split('\n')

  // El textarea crece con el contenido para que no tenga scroll propio.
  useLayoutEffect(() => {
    const element = textarea.current
    if (!element) return
    element.style.height = 'auto'
    element.style.height = `${element.scrollHeight}px`
  }, [value])

  useEffect(() => {
    const element = textarea.current
    if (!element) return
    const sync = () => {
      if (highlight.current) highlight.current.scrollLeft = element.scrollLeft
    }
    element.addEventListener('scroll', sync)
    return () => element.removeEventListener('scroll', sync)
  }, [])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const element = event.currentTarget

    // Tab inserta espacios en lugar de saltar al siguiente control.
    if (event.key === 'Tab') {
      event.preventDefault()
      const { selectionStart, selectionEnd } = element
      const next = value.slice(0, selectionStart) + INDENT + value.slice(selectionEnd)
      onChange(next)
      requestAnimationFrame(() => {
        element.selectionStart = element.selectionEnd = selectionStart + INDENT.length
      })
      return
    }

    // Enter mantiene la sangría de la línea actual y agrega una más tras "{".
    if (event.key === 'Enter') {
      const { selectionStart } = element
      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
      const current = value.slice(lineStart, selectionStart)
      const indent = current.match(/^[ \t]*/)?.[0] ?? ''
      const deeper = current.trimEnd().endsWith('{') ? INDENT : ''
      if (!indent && !deeper) return

      event.preventDefault()
      const insert = `\n${indent}${deeper}`
      const next = value.slice(0, selectionStart) + insert + value.slice(element.selectionEnd)
      onChange(next)
      requestAnimationFrame(() => {
        element.selectionStart = element.selectionEnd = selectionStart + insert.length
      })
    }
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-sky-500 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-1.5 dark:border-slate-800">
        <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-500">
          Tu solución
        </span>
        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-600">
          {lines.length} líneas
        </span>
      </div>

      <div className="flex font-mono text-[13px] leading-6">
        <div
          aria-hidden="true"
          className="shrink-0 py-3 pr-2 pl-3 text-right text-slate-400 select-none dark:text-slate-600"
        >
          {lines.map((_, index) => (
            <div
              key={index}
              className={errorLine === index + 1 ? 'font-bold text-rose-500' : undefined}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="relative min-w-0 flex-1">
          <pre
            ref={highlight}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden py-3 pr-3 whitespace-pre"
          >
            <code>
              {lines.map((line, index) => (
                <div
                  key={index}
                  className={errorLine === index + 1 ? 'bg-rose-500/15' : undefined}
                >
                  {line === '' ? ' ' : highlightJava(line)}
                </div>
              ))}
            </code>
          </pre>

          <textarea
            ref={textarea}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            aria-label="Editor de código Java"
            className="relative block w-full resize-none overflow-x-auto bg-transparent py-3 pr-3 font-mono text-[13px] leading-6 text-transparent caret-sky-600 whitespace-pre outline-none dark:caret-sky-400"
          />
        </div>
      </div>
    </div>
  )
}
