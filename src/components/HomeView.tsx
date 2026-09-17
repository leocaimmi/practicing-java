import { units } from '../data/units'
import { allQuestions, countByType, questionsByUnit } from '../data/questions'
import { unitAccuracy, type Progress, type Theme } from '../lib/storage'

interface Props {
  progress: Progress
  theme: Theme
  onToggleTheme: () => void
  onStartUnit: (unitId: number) => void
  onStartMixed: () => void
  onStartParcial: () => void
  onReset: () => void
}

const counts = countByType(allQuestions)

function AccuracyBadge({ accuracy }: { accuracy: number | null }) {
  if (accuracy === null) {
    return (
      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        Sin practicar
      </span>
    )
  }

  const tone =
    accuracy >= 80
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
      : accuracy >= 60
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'
        : 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300'

  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums ${tone}`}>
      {accuracy}% de aciertos
    </span>
  )
}

export function HomeView({
  progress,
  theme,
  onToggleTheme,
  onStartUnit,
  onStartMixed,
  onStartParcial,
  onReset,
}: Props) {
  const lastSession = progress.history[0]

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 pb-safe">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sky-700 dark:text-sky-400">
            Programación II · Desarrollo en Java
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-balance sm:text-3xl">
            Práctica sobre el material de la cátedra
          </h1>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {allQuestions.length} preguntas de verdadero o falso, opción múltiple y análisis de
            código, escritas a partir de las clases teóricas y del resumen para el parcial.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          className="shrink-0 rounded-lg border border-slate-300 p-2 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      <dl className="mt-6 grid grid-cols-3 gap-3">
        {(
          [
            ['Verdadero o falso', counts.vf],
            ['Opción múltiple', counts.mc],
            ['Análisis de código', counts.code],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
          >
            <dt className="text-xs text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="mt-0.5 text-xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onStartParcial}
          className="rounded-2xl bg-sky-600 p-5 text-left text-white transition-colors hover:bg-sky-500"
        >
          <p className="text-lg font-semibold">Simulacro de parcial</p>
          <p className="mt-1 text-sm text-sky-100">
            20 preguntas de las clases 3 a 12, el alcance que declara el resumen de la cátedra.
          </p>
        </button>

        <button
          type="button"
          onClick={onStartMixed}
          className="rounded-2xl border border-slate-300 p-5 text-left transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <p className="text-lg font-semibold">Práctica mixta</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            15 preguntas al azar tomadas de las 16 clases de la materia.
          </p>
        </button>
      </section>

      {lastSession && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Última práctica: {lastSession.correct} de {lastSession.total} correctas.
        </p>
      )}

      <section className="mt-9">
        <h2 className="text-lg font-semibold">Practicar por clase</h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {units.map((unit) => {
            const questions = questionsByUnit(unit.id)
            const { accuracy } = unitAccuracy(
              progress,
              questions.map((q) => q.id),
            )

            return (
              <li key={unit.id}>
                <button
                  type="button"
                  onClick={() => onStartUnit(unit.id)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500 dark:hover:bg-slate-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                          {String(unit.id).padStart(2, '0')}
                        </span>
                        <h3 className="font-medium">{unit.name}</h3>
                        {unit.inParcial && (
                          <span className="rounded-md bg-sky-100 px-1.5 py-0.5 text-[11px] font-semibold text-sky-800 dark:bg-sky-500/15 dark:text-sky-300">
                            Parcial
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {unit.summary}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-slate-400 tabular-nums dark:text-slate-500">
                      {questions.length}
                    </span>
                  </div>
                  <div className="mt-3">
                    <AccuracyBadge accuracy={accuracy} />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <footer className="mt-10 border-t border-slate-200 pt-5 dark:border-slate-800">
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          El contenido sale exclusivamente del material teórico de la materia: las 16 clases de
          Programación II y el resumen integral para el parcial. El progreso se guarda en este
          navegador.
        </p>
        {progress.history.length > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="mt-3 text-xs text-slate-500 underline underline-offset-2 transition-colors hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
          >
            Borrar mi progreso
          </button>
        )}
      </footer>
    </div>
  )
}
