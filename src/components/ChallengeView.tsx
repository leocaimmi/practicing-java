import { useMemo, useState } from 'react'
import type { Challenge } from '../data/challenges'
import { unitById } from '../data/units'
import { runChallenge, type RunReport, type TestCase } from '../lib/java/runner'
import type { Difficulty } from '../types'
import { CodeBlock } from './CodeBlock'
import { CodeEditor } from './CodeEditor'
import { StepThrough } from './StepThrough'

interface Props {
  challenge: Challenge
  initialCode: string
  solved: boolean
  onSaveCode: (code: string, solved: boolean) => void
  onExit: () => void
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

/** Intentos que hay que gastar antes de poder ver la solución. */
const ATTEMPTS_TO_UNLOCK = 3

type Tab = 'pasos' | 'tests'

export function ChallengeView({ challenge, initialCode, solved, onSaveCode, onExit }: Props) {
  const [code, setCode] = useState(initialCode)
  const [report, setReport] = useState<RunReport | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [tab, setTab] = useState<Tab>('pasos')
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [attempts, setAttempts] = useState(0)
  // Cambia en cada corrida para remontar el paso a paso y dejarlo en el inicio.
  const [runId, setRunId] = useState(0)

  const unit = unitById.get(challenge.unitId)
  const visibleTests = useMemo(() => challenge.spec.tests.filter((t) => !t.hidden), [challenge])

  // La solución aparece recién después de intentarlo, o si ya lo resolvió.
  const solutionUnlocked = solved || attempts >= ATTEMPTS_TO_UNLOCK
  const attemptsLeft = Math.max(0, ATTEMPTS_TO_UNLOCK - attempts)

  /** Corre los tests. Con `all` incluye también los ocultos. */
  function run(all: boolean) {
    const tests: TestCase[] = all
      ? challenge.spec.tests
      : challenge.spec.tests.filter((t) => !t.hidden)

    const result = runChallenge(code, { ...challenge.spec, tests })
    setReport(result)
    setSubmitted(all)
    setAttempts((n) => n + 1)
    setRunId((n) => n + 1)
    // Se muestra el proceso: si no compila no hay nada que recorrer.
    setTab(result.compileError ? 'tests' : 'pasos')

    onSaveCode(code, all && result.allPassed)
  }

  function reset() {
    setCode(challenge.starterCode)
    setReport(null)
    setSubmitted(false)
    setShowSolution(false)
  }

  const errorLine = report?.compileError?.line ?? report?.results.find((r) => r.error)?.error?.line

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-safe sm:px-6">
      <header>
        <button
          type="button"
          onClick={onExit}
          className="-ml-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          ← Volver a los desafíos
        </button>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">{challenge.title}</h1>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {DIFFICULTY_LABEL[challenge.difficulty]}
          </span>
          {unit && (
            <span className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
              {unit.title}
            </span>
          )}
          {solved && (
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              ✓ Resuelto
            </span>
          )}
        </div>
      </header>

      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {/* Consigna, casos y pistas */}
        <section className="flex flex-col gap-5">
          <div className="surface rounded-2xl p-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Consigna
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {challenge.statement.map((paragraph, index) => (
                <p key={index} className="text-[15px] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl p-5">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Casos de ejemplo
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {visibleTests.map((test, index) => (
                <li
                  key={index}
                  className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-[13px] dark:bg-slate-800/60"
                >
                  <span className="text-slate-700 dark:text-slate-200">
                    {challenge.spec.methodName}(
                    {test.args
                      .map((arg) => (typeof arg === 'string' ? `"${arg}"` : JSON.stringify(arg)))
                      .join(', ')}
                    )
                  </span>
                  <span className="text-slate-400 dark:text-slate-500"> → </span>
                  <span className="text-emerald-700 dark:text-emerald-300">
                    {test.expectedOutput
                      ? `imprime ${test.expectedOutput.length} líneas`
                      : typeof test.expected === 'string'
                        ? `"${test.expected}"`
                        : JSON.stringify(test.expected)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Al enviar se corren también {challenge.spec.tests.length - visibleTests.length} casos
              ocultos.
            </p>
          </div>

          {challenge.hints.length > 0 && (
            <div className="surface rounded-2xl p-5">
              <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Pistas
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {challenge.hints.slice(0, hintsShown).map((hint, index) => (
                  <li
                    key={index}
                    className="animate-rise rounded-lg bg-amber-50 px-3 py-2 text-sm leading-relaxed text-amber-900 dark:bg-amber-500/10 dark:text-amber-200"
                  >
                    {hint}
                  </li>
                ))}
              </ul>
              {hintsShown < challenge.hints.length && (
                <button
                  type="button"
                  onClick={() => setHintsShown((n) => n + 1)}
                  className="mt-3 text-sm font-medium text-sky-700 underline underline-offset-2 hover:text-sky-600 dark:text-sky-400"
                >
                  Mostrar {hintsShown === 0 ? 'una pista' : 'otra pista'} (
                  {challenge.hints.length - hintsShown} restantes)
                </button>
              )}
            </div>
          )}
        </section>

        {/* Editor, acciones y proceso */}
        <section className="flex flex-col gap-4">
          <CodeEditor value={code} onChange={setCode} errorLine={errorLine} />

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => run(false)}
              className="surface rounded-xl px-5 py-2.5 font-bold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Probar
            </button>
            <button
              type="button"
              onClick={() => run(true)}
              className="rounded-xl bg-sky-600 px-5 py-2.5 font-bold text-white transition-colors hover:bg-sky-500"
            >
              Enviar
            </button>

            <button
              type="button"
              onClick={reset}
              className="ml-auto rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              Reiniciar
            </button>

            {solutionUnlocked ? (
              <button
                type="button"
                onClick={() => setShowSolution((v) => !v)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                {showSolution ? 'Ocultar solución' : 'Ver solución'}
              </button>
            ) : (
              <span
                className="cursor-not-allowed px-3 py-2 text-sm text-slate-400 dark:text-slate-600"
                title="Se habilita después de intentarlo"
              >
                Solución en {attemptsLeft} {attemptsLeft === 1 ? 'intento' : 'intentos'}
              </span>
            )}
          </div>

          {report && (
            <>
              <Verdict report={report} submitted={submitted} />

              {!report.compileError && (
                <div className="surface overflow-hidden rounded-2xl">
                  <div className="flex border-b border-slate-200 dark:border-slate-800">
                    {(
                      [
                        ['pasos', 'Paso a paso'],
                        ['tests', 'Tests'],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        className={`px-4 py-2.5 text-sm font-bold transition-colors ${
                          tab === key
                            ? 'border-b-2 border-sky-500 text-sky-700 dark:text-sky-300'
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="p-5">
                    {tab === 'pasos' ? (
                      <StepThrough
                        key={runId}
                        code={code}
                        trace={report.trace}
                        call={report.traceCall}
                        outcome={report.traceOutcome}
                        autoPlay
                      />
                    ) : (
                      <TestList report={report} />
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {showSolution && solutionUnlocked && (
            <div className="surface rounded-2xl p-5">
              <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Solución de referencia
              </h3>
              <p className="mt-2 mb-3 text-sm text-slate-600 dark:text-slate-400">
                Es una forma de resolverlo, no la única. Si la tuya pasa los tests, está bien.
              </p>
              <CodeBlock code={challenge.solution} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

/** Resumen de la corrida, visible en las dos solapas. */
function Verdict({ report, submitted }: { report: RunReport; submitted: boolean }) {
  if (report.compileError) {
    return (
      <div className="rounded-2xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-500/40 dark:bg-rose-500/10">
        <p className="text-sm font-bold text-rose-700 dark:text-rose-300">El código no compila</p>
        <p className="mt-1.5 text-[15px] text-slate-700 dark:text-slate-200">
          {report.compileError.message}
        </p>
        <p className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          línea {report.compileError.line}
        </p>
      </div>
    )
  }

  const allPassed = report.allPassed

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-4 ${
        allPassed
          ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
          : 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg text-white ${
          allPassed ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      >
        {allPassed ? '✓' : '✕'}
      </span>
      <div>
        <p
          className={`font-bold ${
            allPassed
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-rose-700 dark:text-rose-300'
          }`}
        >
          {report.passed} de {report.total} casos pasaron
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {allPassed
            ? submitted
              ? 'Desafío resuelto. Pasaron también los casos ocultos.'
              : 'Pasaron los casos de ejemplo. Enviá para correr también los ocultos.'
            : 'Abajo podés seguir la ejecución paso a paso para ver dónde se desvía.'}
        </p>
      </div>
    </div>
  )
}

function TestList({ report }: { report: RunReport }) {
  return (
    <ul className="flex flex-col gap-2">
      {report.results.map((result) => (
        <li
          key={result.index}
          className={`rounded-xl border p-3 ${
            result.passed
              ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/5'
              : 'border-rose-200 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/5'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white ${
                result.passed ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            >
              {result.passed ? '✓' : '✕'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[13px] break-all text-slate-800 dark:text-slate-100">
                {result.call}
                {result.hidden && (
                  <span className="ml-2 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-sans font-bold tracking-wide text-slate-600 uppercase dark:bg-slate-700 dark:text-slate-300">
                    oculto
                  </span>
                )}
              </p>

              {!result.passed && (
                <dl className="mt-2 grid gap-1 font-mono text-[13px]">
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">esperaba</dt>
                    <dd className="break-all whitespace-pre-wrap text-emerald-700 dark:text-emerald-300">
                      {result.expected}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-16 shrink-0 text-slate-500 dark:text-slate-400">obtuvo</dt>
                    <dd className="break-all whitespace-pre-wrap text-rose-700 dark:text-rose-300">
                      {result.actual}
                    </dd>
                  </div>
                </dl>
              )}

              {result.error && (
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {result.error.exception} en la línea {result.error.line}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
