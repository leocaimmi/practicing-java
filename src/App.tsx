import { lazy, Suspense, useCallback, useState } from 'react'
import type { Answer, QuestionType, SessionResult } from './types'
import { unitById, units } from './data/units'
import { questionsByType, questionsByUnit, questionsByUnits } from './data/questions'
import { buildSession, type PreparedQuestion } from './lib/quiz'
import {
  loadProgress,
  loadTheme,
  recordSession,
  resetProgress,
  saveChallenge,
  saveTheme,
  type Progress,
  type Theme,
} from './lib/storage'
import { HomeView } from './components/HomeView'
import { QuizView } from './components/QuizView'
import { ResultsView } from './components/ResultsView'

/*
 * Los desafíos arrastran el intérprete de Java y su banco de ejercicios, que no
 * hacen falta para practicar preguntas. Se cargan en un chunk aparte, sólo
 * cuando alguien entra a esa sección.
 */
const ChallengeListView = lazy(() =>
  import('./components/ChallengeListView').then((m) => ({ default: m.ChallengeListView })),
)
const ChallengeView = lazy(() =>
  import('./components/ChallengeView').then((m) => ({ default: m.ChallengeView })),
)

const MIXED_SIZE = 15
const PARCIAL_SIZE = 20
const TYPE_SIZE = 15

type Mode = SessionResult['mode']

const TYPE_TITLE: Record<QuestionType, string> = {
  vf: 'Verdadero o falso',
  mc: 'Opción múltiple',
  code: 'Analizar código',
}

interface ActiveSession {
  session: PreparedQuestion[]
  title: string
  subtitle: string
  mode: Mode
  unitIds: number[]
  /** Sólo en la modalidad por tipo, para poder rehacer la misma práctica. */
  type?: QuestionType
}

type View =
  | { name: 'home' }
  | { name: 'quiz'; active: ActiveSession }
  | { name: 'results'; active: ActiveSession; answers: Answer[] }
  | { name: 'challenges' }
  | { name: 'challenge'; id: string }

const allUnitIds = units.map((u) => u.id)
const parcialUnitIds = units.filter((u) => u.inParcial).map((u) => u.id)

export default function App() {
  const [view, setView] = useState<View>({ name: 'home' })
  const [progress, setProgress] = useState<Progress>(() => loadProgress())
  const [theme, setTheme] = useState<Theme>(() => loadTheme())

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      saveTheme(next)
      return next
    })
  }, [])

  const start = useCallback((active: ActiveSession) => {
    setView({ name: 'quiz', active })
    window.scrollTo({ top: 0 })
  }, [])

  const startType = useCallback(
    (type: QuestionType) => {
      const pool = questionsByType(type)
      start({
        session: buildSession(pool, TYPE_SIZE),
        title: TYPE_TITLE[type],
        subtitle: `${TYPE_SIZE} preguntas de las 16 clases`,
        mode: 'tipo',
        unitIds: allUnitIds,
        type,
      })
    },
    [start],
  )

  const startUnit = useCallback(
    (unitId: number) => {
      const unit = unitById.get(unitId)
      if (!unit) return
      const questions = questionsByUnit(unitId)
      start({
        session: buildSession(questions, questions.length),
        title: unit.name,
        subtitle: unit.title,
        mode: 'unidad',
        unitIds: [unitId],
      })
    },
    [start],
  )

  const startMixed = useCallback(() => {
    start({
      session: buildSession(questionsByUnits(allUnitIds), MIXED_SIZE),
      title: 'Práctica mixta',
      subtitle: 'Preguntas de las 16 clases',
      mode: 'mixta',
      unitIds: allUnitIds,
    })
  }, [start])

  const startParcial = useCallback(() => {
    start({
      session: buildSession(questionsByUnits(parcialUnitIds), PARCIAL_SIZE),
      title: 'Simulacro de parcial',
      subtitle: 'Clases 3 a 12',
      mode: 'examen',
      unitIds: parcialUnitIds,
    })
  }, [start])

  const finish = useCallback((active: ActiveSession, answers: Answer[]) => {
    const result: SessionResult = {
      id: `${Date.now()}`,
      finishedAt: Date.now(),
      mode: active.mode,
      unitIds: active.unitIds,
      total: answers.length,
      correct: answers.filter((a) => a.correct).length,
      answers,
    }
    setProgress(recordSession(result))
    setView({ name: 'results', active, answers })
    window.scrollTo({ top: 0 })
  }, [])

  const goHome = useCallback(() => {
    setView({ name: 'home' })
    window.scrollTo({ top: 0 })
  }, [])

  const openChallenges = useCallback(() => {
    setView({ name: 'challenges' })
    window.scrollTo({ top: 0 })
  }, [])

  const openChallenge = useCallback((id: string) => {
    setView({ name: 'challenge', id })
    window.scrollTo({ top: 0 })
  }, [])

  /** Rehace la misma modalidad con preguntas mezcladas de nuevo. */
  const retry = useCallback(
    (active: ActiveSession) => {
      if (active.mode === 'tipo' && active.type) {
        startType(active.type)
        return
      }
      const pool = questionsByUnits(active.unitIds)
      const size =
        active.mode === 'unidad' ? pool.length : active.mode === 'examen' ? PARCIAL_SIZE : MIXED_SIZE
      start({ ...active, session: buildSession(pool, size) })
    },
    [start, startType],
  )

  if (view.name === 'challenges') {
    return (
      <Suspense fallback={<Cargando />}>
        <ChallengeListView progress={progress} onOpen={openChallenge} onExit={goHome} />
      </Suspense>
    )
  }

  if (view.name === 'challenge') {
    return (
      <Suspense fallback={<Cargando />}>
        <ChallengeView
          key={view.id}
          challengeId={view.id}
          savedCode={progress.challenges[view.id]?.code}
          solved={progress.challenges[view.id]?.solved ?? false}
          onSaveCode={(code, solved) => setProgress(saveChallenge(view.id, code, solved))}
          onExit={openChallenges}
        />
      </Suspense>
    )
  }

  if (view.name === 'quiz') {
    return (
      <QuizView
        session={view.active.session}
        title={view.active.title}
        subtitle={view.active.subtitle}
        onFinish={(answers) => finish(view.active, answers)}
        onExit={goHome}
      />
    )
  }

  if (view.name === 'results') {
    return (
      <ResultsView
        session={view.active.session}
        answers={view.answers}
        title={view.active.title}
        onRetry={() => retry(view.active)}
        onHome={goHome}
      />
    )
  }

  return (
    <HomeView
      progress={progress}
      theme={theme}
      onToggleTheme={toggleTheme}
      onStartType={startType}
      onOpenChallenges={openChallenges}
      onStartUnit={startUnit}
      onStartMixed={startMixed}
      onStartParcial={startParcial}
      onReset={() => setProgress(resetProgress())}
    />
  )
}

function Cargando() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">Cargando…</p>
    </div>
  )
}
