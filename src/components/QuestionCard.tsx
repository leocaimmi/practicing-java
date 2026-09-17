import type { Difficulty, QuestionType } from '../types'
import type { PreparedQuestion } from '../lib/quiz'
import { CodeBlock } from './CodeBlock'

const TYPE_LABEL: Record<QuestionType, string> = {
  vf: 'Verdadero o falso',
  mc: 'Opción múltiple',
  code: 'Análisis de código',
}

const TYPE_STYLE: Record<QuestionType, string> = {
  vf: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  mc: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  code: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
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
    'flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] leading-relaxed transition-all duration-150'

  if (!answered) {
    return `${base} surface cursor-pointer hover:-translate-y-px hover:border-sky-400 hover:shadow-md dark:hover:border-sky-500/70`
  }
  if (isCorrect) {
    return `${base} border-emerald-500 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-500/10`
  }
  if (isChosen) {
    return `${base} border-rose-500 bg-rose-50 dark:border-rose-500/60 dark:bg-rose-500/10`
  }
  return `${base} surface opacity-55`
}

function Marker({
  children,
  answered,
  isCorrect,
  isChosen,
}: {
  children: string
  answered: boolean
  isCorrect: boolean
  isChosen: boolean
}) {
  let tone =
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
  if (answered && isCorrect) tone = 'bg-emerald-500 text-white'
  else if (answered && isChosen) tone = 'bg-rose-500 text-white'

  return (
    <span
      className={`mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${tone}`}
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
    <article className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-bold ${TYPE_STYLE[question.type]}`}
        >
          {TYPE_LABEL[question.type]}
        </span>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          {DIFFICULTY_LABEL[question.difficulty]}
        </span>
      </div>

      <h2 className="text-xl leading-snug font-bold sm:text-2xl">{question.prompt}</h2>

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
          className={`animate-rise rounded-2xl border p-4 sm:p-5 ${
            wasRight
              ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-500/40 dark:bg-emerald-500/10'
              : 'border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10'
          }`}
        >
          <p
            className={`flex items-center gap-2 text-sm font-bold ${
              wasRight
                ? 'text-emerald-700 dark:text-emerald-300'
                : 'text-rose-700 dark:text-rose-300'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] text-white ${
                wasRight ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            >
              {wasRight ? '✓' : '✕'}
            </span>
            {wasRight ? 'Correcto' : 'Incorrecto'}
          </p>
          <p className="mt-2.5 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
            {question.explanation}
          </p>
          <p className="mt-3.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            {question.source}
          </p>
        </div>
      )}
    </article>
  )
}
