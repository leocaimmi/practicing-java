import { useMemo, useState } from 'react'
import type { Answer } from '../types'
import type { PreparedQuestion } from '../lib/quiz'
import { formatDuration, percentage, verdict } from '../lib/quiz'
import { CodeBlock } from './CodeBlock'

interface Props {
  session: PreparedQuestion[]
  answers: Answer[]
  title: string
  onRetry: () => void
  onHome: () => void
}

const TONE_RING: Record<'alto' | 'medio' | 'bajo', string> = {
  alto: 'text-emerald-600 dark:text-emerald-400',
  medio: 'text-amber-600 dark:text-amber-400',
  bajo: 'text-rose-600 dark:text-rose-400',
}

export function ResultsView({ session, answers, title, onRetry, onHome }: Props) {
  const [showAll, setShowAll] = useState(false)

  const correct = answers.filter((a) => a.correct).length
  const pct = percentage(correct, answers.length)
  const { label, tone } = verdict(pct)
  const totalMs = answers.reduce((sum, a) => sum + a.elapsedMs, 0)

  const byQuestion = useMemo(
    () => new Map(answers.map((a) => [a.questionId, a])),
    [answers],
  )

  const review = session.filter((prepared) => {
    const answer = byQuestion.get(prepared.question.id)
    if (!answer) return false
    return showAll || !answer.correct
  })

  const wrongCount = answers.length - correct

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 pb-safe">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h1 className="mt-1 text-2xl font-semibold">Resultado de la práctica</h1>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className={`text-5xl font-semibold tabular-nums ${TONE_RING[tone]}`}>{pct}%</p>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {correct} de {answers.length}
          </p>
        </div>
        <p className="mt-2 text-[15px] text-slate-700 dark:text-slate-200">{label}</p>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Correctas</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">{correct}</dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Incorrectas</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">{wrongCount}</dd>
          </div>
          <div>
            <dt className="text-slate-500 dark:text-slate-400">Tiempo</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">{formatDuration(totalMs)}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-sky-500"
        >
          Practicar de nuevo
        </button>
        <button
          type="button"
          onClick={onHome}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Volver al inicio
        </button>
      </div>

      <section className="mt-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {showAll ? 'Todas las preguntas' : 'Para repasar'}
          </h2>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {showAll ? 'Ver sólo los errores' : 'Ver todas'}
          </button>
        </div>

        {review.length === 0 ? (
          <p className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-[15px] text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            No hubo errores en esta práctica. Muy bien.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {review.map((prepared) => {
              const { question } = prepared
              const answer = byQuestion.get(question.id)!
              const correctText =
                question.type === 'vf'
                  ? question.answer
                    ? 'Verdadero'
                    : 'Falso'
                  : prepared.options[prepared.correctIndex]
              const givenText =
                question.type === 'vf'
                  ? answer.given
                    ? 'Verdadero'
                    : 'Falso'
                  : prepared.options[answer.given as number]

              return (
                <li
                  key={question.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        answer.correct ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <p className="font-medium">{question.prompt}</p>
                  </div>

                  {question.type === 'code' && (
                    <div className="mt-3">
                      <CodeBlock code={question.code} />
                    </div>
                  )}

                  <div className="mt-3 space-y-1 text-sm">
                    {!answer.correct && (
                      <p className="text-rose-700 dark:text-rose-300">
                        <span className="font-medium">Tu respuesta:</span> {givenText}
                      </p>
                    )}
                    <p className="text-emerald-700 dark:text-emerald-300">
                      <span className="font-medium">Respuesta correcta:</span> {correctText}
                    </p>
                  </div>

                  <p className="mt-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                    {question.explanation}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Fuente: {question.source}
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
