import { useEffect, useRef, useState } from 'react'
import type { TraceStep } from '../lib/java/interpreter'
import type { TraceOutcome } from '../lib/java/runner'
import { CodeBlock } from './CodeBlock'

interface Props {
  code: string
  trace: TraceStep[]
  /** Llamada que produjo este trazado, por ejemplo `fibonacci(7)`. */
  call: string
  /** Cómo terminó la ejecución, para cerrar con el resultado. */
  outcome?: TraceOutcome
  /** Arranca reproduciendo apenas se monta. */
  autoPlay?: boolean
}

const SPEEDS = [
  { label: '0,5×', ms: 800 },
  { label: '1×', ms: 400 },
  { label: '2×', ms: 180 },
  { label: '4×', ms: 70 },
]

/**
 * Recorrido paso a paso de la ejecución, al estilo de un depurador.
 *
 * Es lo que aporta el intérprete propio frente a mandar el código a un servidor:
 * en cada paso se ve la línea que se ejecutó, el valor de cada variable y lo que
 * se lleva impreso. Al llegar al final se muestra el resultado contra el
 * esperado, y si cortó con una excepción, en qué línea fue.
 */
export function StepThrough({ code, trace, call, outcome, autoPlay = false }: Props) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(autoPlay && trace.length > 1)
  const [speed, setSpeed] = useState(1)
  const timer = useRef<number | undefined>(undefined)

  const last = trace.length - 1
  const step = trace[index]
  const atEnd = index === last

  useEffect(() => {
    if (!playing) return
    timer.current = window.setInterval(() => {
      setIndex((current) => {
        if (current >= last) {
          setPlaying(false)
          return current
        }
        return current + 1
      })
    }, SPEEDS[speed].ms)
    return () => window.clearInterval(timer.current)
  }, [playing, last, speed])

  if (trace.length === 0) {
    return (
      <p className="px-1 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Corré los tests para ver la ejecución paso a paso.
      </p>
    )
  }

  // La línea con el error sólo se marca al llegar al final del recorrido.
  const errorLine = atEnd ? outcome?.errorLine : undefined

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Ejecutando{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-slate-800">
            {call}
          </code>
        </p>
        <p className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
          paso {index + 1} de {trace.length}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setPlaying(false)
            setIndex((i) => Math.max(0, i - 1))
          }}
          disabled={index === 0}
          className="surface rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
          aria-label="Paso anterior"
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => {
            if (atEnd) setIndex(0)
            setPlaying((p) => !p)
          }}
          className="rounded-lg bg-sky-600 px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-sky-500"
        >
          {playing ? 'Pausar' : atEnd ? 'Repetir' : 'Reproducir'}
        </button>

        <button
          type="button"
          onClick={() => {
            setPlaying(false)
            setIndex((i) => Math.min(last, i + 1))
          }}
          disabled={atEnd}
          className="surface rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
          aria-label="Paso siguiente"
        >
          →
        </button>

        <div className="surface flex overflow-hidden rounded-lg">
          {SPEEDS.map((option, i) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setSpeed(i)}
              className={`px-2 py-1.5 text-xs font-semibold transition-colors ${
                speed === i
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <input
          type="range"
          min={0}
          max={last}
          value={index}
          onChange={(event) => {
            setPlaying(false)
            setIndex(Number(event.target.value))
          }}
          aria-label="Ir a un paso"
          className="ml-1 min-w-[8rem] flex-1 accent-sky-600"
        />
      </div>

      <CodeBlock code={code} activeLine={step.line} errorLine={errorLine} />

      {step.note && (
        <p className="rounded-lg bg-sky-50 px-3 py-2 text-sm text-sky-800 dark:bg-sky-500/10 dark:text-sky-300">
          {step.note}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Variables
          </h4>
          {step.vars.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Todavía no hay variables en este alcance.
            </p>
          ) : (
            <ul className="mt-2 flex flex-col gap-1.5">
              {step.vars.map((variable) => (
                <li
                  key={variable.name}
                  className="surface flex items-baseline gap-2 rounded-lg px-3 py-1.5"
                >
                  <span className="font-mono text-[13px] font-medium text-sky-700 dark:text-sky-300">
                    {variable.name}
                  </span>
                  <span className="text-slate-400 dark:text-slate-600">=</span>
                  <span className="truncate font-mono text-[13px] text-slate-700 dark:text-slate-200">
                    {variable.value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Consola
          </h4>
          {step.output.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Todavía no se imprimió nada.
            </p>
          ) : (
            <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-[13px] leading-relaxed text-slate-100 dark:bg-slate-950 dark:ring-1 dark:ring-slate-800">
              {step.output.join('\n')}
            </pre>
          )}
        </div>
      </div>

      {outcome && <Outcome outcome={outcome} revealed={atEnd} />}
    </div>
  )
}

/**
 * Cierre del recorrido. Hasta llegar al último paso se muestra atenuado, para
 * no adelantar el resultado mientras se sigue la ejecución.
 */
function Outcome({ outcome, revealed }: { outcome: TraceOutcome; revealed: boolean }) {
  if (!revealed) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Llegá al último paso para ver cómo termina la ejecución.
      </p>
    )
  }

  return (
    <div
      className={`animate-rise rounded-xl border p-4 ${
        outcome.passed
          ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
          : 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10'
      }`}
    >
      <p
        className={`flex items-center gap-2 text-sm font-bold ${
          outcome.passed
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-rose-700 dark:text-rose-300'
        }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] text-white ${
            outcome.passed ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        >
          {outcome.passed ? '✓' : '✕'}
        </span>
        {outcome.passed ? 'La ejecución terminó bien' : 'La ejecución no dio lo esperado'}
      </p>

      {outcome.exception && (
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          Cortó con {outcome.exception} en la línea {outcome.errorLine}.
        </p>
      )}

      <dl className="mt-3 grid gap-1.5 font-mono text-[13px]">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-slate-500 dark:text-slate-400">esperaba</dt>
          <dd className="break-all whitespace-pre-wrap text-emerald-700 dark:text-emerald-300">
            {outcome.expected}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 text-slate-500 dark:text-slate-400">obtuvo</dt>
          <dd
            className={`break-all whitespace-pre-wrap ${
              outcome.passed
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-rose-700 dark:text-rose-300'
            }`}
          >
            {outcome.actual}
          </dd>
        </div>
      </dl>
    </div>
  )
}
