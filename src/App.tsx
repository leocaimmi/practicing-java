import { useCallback, useState } from 'react'
import type { Answer, SessionResult } from './types'
import { unitById, units } from './data/units'
import { questionsByUnit, questionsByUnits } from './data/questions'
import { buildSession, type PreparedQuestion } from './lib/quiz'
import {
  loadProgress,
  loadTheme,
  recordSession,
  resetProgress,
  saveTheme,
  type Progress,
  type Theme,
} from './lib/storage'
import { HomeView } from './components/HomeView'
import { QuizView } from './components/QuizView'
import { ResultsView } from './components/ResultsView'

const MIXED_SIZE = 15
const PARCIAL_SIZE = 20

type Mode = SessionResult['mode']

interface ActiveSession {
  session: PreparedQuestion[]
  title: string
  subtitle: string
  mode: Mode
  unitIds: number[]
}

type View =
  | { name: 'home' }
  | { name: 'quiz'; active: ActiveSession }
  | { name: 'results'; active: ActiveSession; answers: Answer[] }

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
    const all = units.map((u) => u.id)
    start({
      session: buildSession(questionsByUnits(all), MIXED_SIZE),
      title: 'Práctica mixta',
      subtitle: 'Preguntas de las 16 clases',
      mode: 'mixta',
      unitIds: all,
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

  const finish = useCallback(
    (active: ActiveSession, answers: Answer[]) => {
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
    },
    [],
  )

  const goHome = useCallback(() => {
    setView({ name: 'home' })
    window.scrollTo({ top: 0 })
  }, [])

  /** Rehace la misma modalidad con preguntas mezcladas de nuevo. */
  const retry = useCallback(
    (active: ActiveSession) => {
      const pool = questionsByUnits(active.unitIds)
      const size =
        active.mode === 'unidad' ? pool.length : active.mode === 'examen' ? PARCIAL_SIZE : MIXED_SIZE
      start({ ...active, session: buildSession(pool, size) })
    },
    [start],
  )

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
      onStartUnit={startUnit}
      onStartMixed={startMixed}
      onStartParcial={startParcial}
      onReset={() => setProgress(resetProgress())}
    />
  )
}
