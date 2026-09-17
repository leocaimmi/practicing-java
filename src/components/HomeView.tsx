import type { QuestionType } from '../types'
import { units } from '../data/units'
import { allQuestions, countByType, questionsByUnit } from '../data/questions'
import { CHALLENGE_COUNT } from '../data/challengeMeta'
import { unitAccuracy, type Progress, type Theme } from '../lib/storage'
import {
  IconArrowRight,
  IconChallenge,
  IconCode,
  IconExam,
  IconMoon,
  IconMultipleChoice,
  IconShuffle,
  IconSun,
  IconTrueFalse,
} from './Icons'

interface Props {
  progress: Progress
  theme: Theme
  onToggleTheme: () => void
  onStartType: (type: QuestionType) => void
  onOpenChallenges: () => void
  onStartUnit: (unitId: number) => void
  onStartMixed: () => void
  onStartParcial: () => void
  onReset: () => void
}

const counts = countByType(allQuestions)

/**
 * Las clases de Tailwind se escriben literales por modalidad: el compilador sólo
 * detecta los nombres que aparecen enteros en el código, así que no pueden armarse
 * concatenando el color.
 */
const MODES: Array<{
  type: QuestionType
  title: string
  description: string
  count: number
  Icon: typeof IconTrueFalse
  card: string
  chip: string
  bar: string
}> = [
  {
    type: 'vf',
    title: 'Verdadero o falso',
    description:
      'Afirmaciones sobre la teoría de la materia. Ideal para detectar rápido qué conceptos tenés flojos.',
    count: counts.vf,
    Icon: IconTrueFalse,
    card: 'hover:border-emerald-400 hover:shadow-emerald-500/10 dark:hover:border-emerald-500/70',
    chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    bar: 'bg-emerald-500',
  },
  {
    type: 'mc',
    title: 'Opción múltiple',
    description:
      'Cuatro opciones con distractores tomados de los errores más comunes de cada tema.',
    count: counts.mc,
    Icon: IconMultipleChoice,
    card: 'hover:border-violet-400 hover:shadow-violet-500/10 dark:hover:border-violet-500/70',
    chip: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
    bar: 'bg-violet-500',
  },
  {
    type: 'code',
    title: 'Analizar código',
    description:
      'Fragmentos de Java para leer y anticipar qué imprimen, qué lanzan o por qué no compilan.',
    count: counts.code,
    Icon: IconCode,
    card: 'hover:border-amber-400 hover:shadow-amber-500/10 dark:hover:border-amber-500/70',
    chip: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    bar: 'bg-amber-500',
  },
]

function AccuracyBadge({ accuracy }: { accuracy: number | null }) {
  if (accuracy === null) {
    return (
      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        Sin practicar
      </span>
    )
  }

  const tone =
    accuracy >= 80
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
      : accuracy >= 60
        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'
        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300'

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
  onStartType,
  onOpenChallenges,
  onStartUnit,
  onStartMixed,
  onStartParcial,
  onReset,
}: Props) {
  const lastSession = progress.history[0]

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 pb-safe sm:px-6 sm:py-14">
      <header className="flex items-start justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-[13px] font-semibold tracking-wide text-sky-600 uppercase dark:text-sky-400">
            Programación II · Desarrollo en Java
          </p>
          <h1 className="mt-2.5 text-3xl leading-[1.08] font-extrabold sm:text-5xl">
            Practicá la materia con el material de la cátedra
          </h1>
          <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            {allQuestions.length} preguntas escritas a partir de las 16 clases teóricas y del
            resumen para el parcial. Cada respuesta viene con su justificación y la clase de la que
            sale.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          className="surface shrink-0 rounded-xl p-2.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? (
            <IconSun className="h-5 w-5" />
          ) : (
            <IconMoon className="h-5 w-5" />
          )}
        </button>
      </header>

      <section className="mt-10 sm:mt-14">
        <h2 className="text-xl font-bold sm:text-2xl">Elegí una modalidad</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map(({ type, title, description, count, Icon, card, chip, bar }) => (
            <button
              key={type}
              type="button"
              onClick={() => onStartType(type)}
              className={`surface group relative flex flex-col overflow-hidden rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${card}`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${bar}`}
              />
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${chip}`}>
                <Icon className="h-6 w-6" />
              </span>

              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>

              <span className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500 tabular-nums dark:text-slate-400">
                  {count} preguntas
                </span>
                <IconArrowRight className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={onOpenChallenges}
            className="surface group relative flex flex-col overflow-hidden rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 sm:col-span-2 lg:col-span-1 dark:hover:border-sky-500/70"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-sky-500 transition-transform duration-300 group-hover:scale-x-100" />
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
              <IconChallenge className="h-6 w-6" />
            </span>

            <h3 className="mt-4 text-lg font-bold">
              Desafíos de código
              <span className="ml-2 align-middle text-[11px] font-bold tracking-wide text-sky-600 uppercase dark:text-sky-400">
                Nuevo
              </span>
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Escribí el método, corré los tests y mirá la ejecución paso a paso con el valor de
              cada variable.
            </p>

            <span className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 tabular-nums dark:text-slate-400">
                {CHALLENGE_COUNT} desafíos
              </span>
              <IconArrowRight className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
            </span>
          </button>
        </div>
      </section>

      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-bold sm:text-2xl">Repaso completo</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onStartParcial}
            className="group relative overflow-hidden rounded-2xl bg-sky-600 p-5 text-left text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-500/20"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <IconExam className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">Simulacro de parcial</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-sky-50/90">
              20 preguntas mezcladas de las clases 3 a 12, el alcance que declara el resumen de la
              cátedra.
            </p>
          </button>

          <button
            type="button"
            onClick={onStartMixed}
            className="surface group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl dark:hover:border-slate-700"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <IconShuffle className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">Práctica mixta</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              15 preguntas al azar de los tres formatos y de las 16 clases de la materia.
            </p>
          </button>
        </div>

        {lastSession && (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Última práctica: {lastSession.correct} de {lastSession.total} correctas.
          </p>
        )}
      </section>

      <section className="mt-10 sm:mt-12">
        <h2 className="text-xl font-bold sm:text-2xl">Practicar por clase</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
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
                  className="surface flex h-full w-full flex-col rounded-xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg dark:hover:border-sky-500/70"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-medium text-slate-400 dark:text-slate-600">
                        {String(unit.id).padStart(2, '0')}
                      </span>
                      <h3 className="font-semibold">{unit.name}</h3>
                      {unit.inParcial && (
                        <span className="rounded-md bg-sky-100 px-1.5 py-0.5 text-[11px] font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                          Parcial
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs text-slate-400 tabular-nums dark:text-slate-600">
                      {questions.length}
                    </span>
                  </div>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {unit.summary}
                  </p>

                  <div className="mt-3">
                    <AccuracyBadge accuracy={accuracy} />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <footer className="mt-14 border-t border-slate-200 pt-6 dark:border-slate-800">
        <p className="max-w-prose text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          El contenido sale exclusivamente del material teórico de la materia: las 16 clases de
          Programación II y el resumen integral para el parcial. El progreso se guarda en este
          navegador.
        </p>
        {progress.history.length > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="mt-3 text-xs font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
          >
            Borrar mi progreso
          </button>
        )}
      </footer>
    </div>
  )
}
