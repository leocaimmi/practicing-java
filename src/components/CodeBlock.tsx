import { highlightJava } from './javaHighlight'

interface Props {
  code: string
  /** Línea que se resalta, por ejemplo la que está ejecutándose. */
  activeLine?: number
  /** Línea con un error, que se marca en rojo. */
  errorLine?: number
}

export function CodeBlock({ code, activeLine, errorLine }: Props) {
  const lines = code.split('\n')

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-1.5 dark:border-slate-800">
        <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-500">
          Java
        </span>
      </div>
      <div className="overflow-x-auto">
        <pre className="min-w-full py-2 font-mono text-[13px] leading-6 sm:text-sm">
          <code>
            {lines.map((line, index) => {
              const number = index + 1
              const isActive = activeLine === number
              const isError = errorLine === number
              return (
                <span
                  key={index}
                  className={`grid grid-cols-[2.5ch_1fr] gap-3 px-3 ${
                    isError
                      ? 'bg-rose-500/15'
                      : isActive
                        ? 'bg-sky-500/15'
                        : ''
                  }`}
                >
                  <span
                    className={`text-right select-none ${
                      isActive || isError
                        ? 'font-bold text-slate-600 dark:text-slate-300'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {number}
                  </span>
                  <span className="whitespace-pre">
                    {line === '' ? ' ' : highlightJava(line)}
                  </span>
                </span>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
