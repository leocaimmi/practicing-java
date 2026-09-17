import type { Difficulty, QuestionType } from '../types'
import type { PreparedQuestion } from '../lib/quiz'
import { CodeBlock } from './CodeBlock'

const TYPE_LABEL: Record<QuestionType, string> = {
  vf: 'Verdadero o falso',
  mc: 'Opción múltiple',
  code: 'Análisis de código',
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
}

const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  basico: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  intermedio: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  avanzado: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
}

interface Props {
  prepared: PreparedQuestion
  /** Respuesta elegida, o null si todavía no respondió. */
  given: boolean | number | null
  onAnswer: (given: boolean | number) => void
}

/** Estilo de cada opción según si ya se respondió y si esa opción es la correcta. */
function optionStyle(answered: boolean, isCorrect: boolean, isChosen: boolean): string {
  const base =
    'w-full rounded-xl border px-4 py-3 text-left text-[15px] transition-colors flex gap-3 items-start'

  if (!answered) {
    return `${base} border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500 dark:hover:bg-slate-800 cursor-pointer`
  }
  if (isCorrect) {
    return `${base} border-emerald-500 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-500/10`
  }
  if (isChosen) {
    return `${base} border-rose-500 bg-rose-50 dark:border-rose-500/60 dark:bg-rose-500/10`
  }
  return `${base} border-slate-200 bg-white opacity-60 dark:border-slate-800 dark:bg-slate-900`
}

function Marker({ children, answered, isCorrect, isChosen }: {
  children: string
  answered: boolean
  isCorrect: boolean
  isChosen: boolean
}) {
  let tone = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
  if (answered && isCorrect) tone = 'bg-emerald-500 text-white'
  else if (answered && isChosen) tone = 'bg-rose-500 text-white'

  return (
    <span
      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${tone}`}
    >
      {children}
    </span>
  )
}

export function QuestionCard({ prepared, given, onAnswer }: Props) {
  const { question } = prepared
  const answered = given !== null

  const choices =
    question.type === 'vf'
      ? [
          { label: 'Verdadero', value: true, isCorrect: question.answer === true },
          { label: 'Falso', value: false, isCorrect: question.answer === false },
        ]
      : prepared.options.map((label, index) => ({
          label,
          value: index,
          isCorrect: index === prepared.correctIndex,
        }))

  const wasRight = answered && choices.some((c) => c.value === given && c.isCorrect)

  return (
    <article className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800 dark:bg-sky-500/15 dark:text-sky-300">
          {TYPE_LABEL[question.type]}
        </span>
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-semibold ${DIFFICULTY_STYLE[question.difficulty]}`}
        >
          {DIFFICULTY_LABEL[question.difficulty]}
        </span>
      </div>

      <h2 className="text-lg leading-snug font-medium text-balance sm:text-xl">{question.prompt}</h2>

      {question.type === 'code' && <CodeBlock code={question.code} />}

      <div
        className={question.type === 'vf' ? 'grid gap-3 sm:grid-cols-2' : 'flex flex-col gap-2.5'}
        role="group"
        aria-label="Opciones de respuesta"
      >
        {choices.map((choice, index) => {
          const isChosen = given === choice.value
          return (
            <button
              key={String(choice.value)}
              type="button"
              disabled={answered}
              onClick={() => onAnswer(choice.value)}
              className={optionStyle(answered, choice.isCorrect, isChosen)}
            >
              <Marker answered={answered} isCorrect={choice.isCorrect} isChosen={isChosen}>
                {question.type === 'vf'
                  ? choice.value === true
                    ? 'V'
                    : 'F'
                  : String.fromCharCode(65 + index)}
              </Marker>
              <span className="pt-0.5">{choice.label}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={`rounded-xl border p-4 ${
            wasRight
              ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
              : 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10'
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              wasRight
                ? 'text-emerald-800 dark:text-emerald-300'
                : 'text-rose-800 dark:text-rose-300'
            }`}
          >
            {wasRight ? 'Correcto' : 'Incorrecto'}
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
            {question.explanation}
          </p>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Fuente: {question.source}
          </p>
        </div>
      )}
    </article>
  )
}
