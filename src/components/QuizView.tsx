import { useCallback, useEffect, useRef, useState } from 'react'
import type { Answer } from '../types'
import { isCorrect, type PreparedQuestion } from '../lib/quiz'
import { QuestionCard } from './QuestionCard'

interface Props {
  session: PreparedQuestion[]
  title: string
  subtitle: string
  onFinish: (answers: Answer[]) => void
  onExit: () => void
}

export function QuizView({ session, title, subtitle, onFinish, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [given, setGiven] = useState<boolean | number | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const startedAt = useRef(0)
  const topRef = useRef<HTMLDivElement>(null)

  // El cronómetro por pregunta arranca después del render, no durante.
  useEffect(() => {
    startedAt.current = Date.now()
  }, [index])

  const prepared = session[index]
  const isLast = index === session.length - 1
  const answered = given !== null

  const answer = useCallback(
    (value: boolean | number) => {
      if (given !== null) return
      setGiven(value)
      setAnswers((previous) => [
        ...previous,
        {
          questionId: prepared.question.id,
          given: value,
          correct: isCorrect(prepared, value),
          elapsedMs: Date.now() - startedAt.current,
        },
      ])
    },
    [given, prepared],
  )

  const advance = useCallback(() => {
    if (given === null) return
    if (isLast) {
      onFinish(answers)
      return
    }
    setIndex((i) => i + 1)
    setGiven(null)
    topRef.current?.scrollIntoView({ block: 'start' })
  }, [answers, given, isLast, onFinish])

  // Atajos de teclado: números o V/F para responder, Enter para avanzar.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === 'Enter' || event.key === ' ') {
        if (given !== null) {
          event.preventDefault()
          advance()
        }
        return
      }

      if (given !== null) return

      if (prepared.question.type === 'vf') {
        const key = event.key.toLowerCase()
        if (key === 'v' || key === '1') answer(true)
        if (key === 'f' || key === '2') answer(false)
        return
      }

      const numeric = Number(event.key)
      if (Number.isInteger(numeric) && numeric >= 1 && numeric <= prepared.options.length) {
        answer(numeric - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [advance, answer, given, prepared])

  const correctSoFar = answers.filter((a) => a.correct).length
  const progress = ((index + (answered ? 1 : 0)) / session.length) * 100

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pb-safe">
      <div ref={topRef} className="scroll-mt-4" />

      <header className="sticky top-0 z-10 -mx-4 bg-slate-50/90 px-4 pt-4 pb-3 backdrop-blur dark:bg-slate-950/90">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onExit}
            className="rounded-lg px-2 py-1 text-sm text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            ← Salir
          </button>
          <div className="text-right">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="shrink-0 font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
            {index + 1}/{session.length} · {correctSoFar} ✓
          </p>
        </div>
      </header>

      <main className="flex-1 py-5">
        <QuestionCard key={prepared.question.id} prepared={prepared} given={given} onAnswer={answer} />
      </main>

      <footer className="sticky bottom-0 -mx-4 border-t border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex items-center justify-between gap-4">
          <p className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
            {answered
              ? 'Enter para continuar'
              : prepared.question.type === 'vf'
                ? 'V o F para responder'
                : 'Números 1 a 4 para responder'}
          </p>
          <button
            type="button"
            disabled={!answered}
            onClick={advance}
            className="ml-auto w-full rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 sm:w-auto dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
          >
            {isLast ? 'Ver resultado' : 'Siguiente'}
          </button>
        </div>
      </footer>
    </div>
  )
}
