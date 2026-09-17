import { challenges } from '../data/challenges'
import { unitById } from '../data/units'
import type { Progress } from '../lib/storage'
import type { Difficulty } from '../types'
import { IconArrowRight } from './Icons'

interface Props {
  progress: Progress
  onOpen: (id: string) => void
  onExit: () => void
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  basico: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  intermedio: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  avanzado: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
}

export function ChallengeListView({ progress, onOpen, onExit }: Props) {
  const solvedCount = challenges.filter((c) => progress.challenges[c.id]?.solved).length

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 pb-safe sm:px-6 sm:py-12">
      <button
        type="button"
        onClick={onExit}
        className="-ml-2 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        ← Volver al inicio
      </button>

      <header className="mt-3">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Desafíos de código</h1>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
          Escribí el método, corré los tests y mirá la ejecución paso a paso con el valor de cada
          variable. El código se ejecuta en tu navegador, sobre el subconjunto de Java que cubre la
          materia.
        </p>
        <p className="mt-3 text-sm font-semibold text-slate-500 tabular-nums dark:text-slate-400">
          {solvedCount} de {challenges.length} resueltos
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {challenges.map((challenge) => {
          const unit = unitById.get(challenge.unitId)
          const solved = progress.challenges[challenge.id]?.solved ?? false

          return (
            <li key={challenge.id}>
              <button
                type="button"
                onClick={() => onOpen(challenge.id)}
                className="surface group flex h-full w-full flex-col rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg dark:hover:border-sky-500/70"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold">{challenge.title}</h2>
                  {solved && (
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                      ✓
                    </span>
                  )}
                </div>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {challenge.statement[0]}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLE[challenge.difficulty]}`}
                  >
                    {DIFFICULTY_LABEL[challenge.difficulty]}
                  </span>
                  {unit && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {unit.name}
                    </span>
                  )}
                  <IconArrowRight className="ml-auto h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
