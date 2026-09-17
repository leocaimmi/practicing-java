import type { SessionResult } from '../types'

const KEY = 'practicing-java:v1'

/** Estadística acumulada de una pregunta a lo largo de todas las sesiones. */
export interface QuestionStat {
  seen: number
  correct: number
}

export interface Progress {
  /** Estadísticas por id de pregunta. */
  stats: Record<string, QuestionStat>
  /** Últimas sesiones terminadas, de la más reciente a la más antigua. */
  history: SessionResult[]
}

const EMPTY: Progress = { stats: {}, history: [] }

const MAX_HISTORY = 30

/**
 * El acceso a localStorage puede fallar (ventana privada, almacenamiento
 * bloqueado), así que toda lectura y escritura va envuelta y la aplicación
 * funciona igual si vuelve vacío.
 */
export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      stats: parsed.stats ?? {},
      history: parsed.history ?? [],
    }
  } catch {
    return EMPTY
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    // Sin persistencia la práctica sigue siendo utilizable; no hay nada que hacer acá.
  }
}

export function recordSession(result: SessionResult): Progress {
  const progress = loadProgress()

  for (const answer of result.answers) {
    const previous = progress.stats[answer.questionId] ?? { seen: 0, correct: 0 }
    progress.stats[answer.questionId] = {
      seen: previous.seen + 1,
      correct: previous.correct + (answer.correct ? 1 : 0),
    }
  }

  progress.history = [result, ...progress.history].slice(0, MAX_HISTORY)
  saveProgress(progress)
  return progress
}

export function resetProgress(): Progress {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // Ídem: si no se puede borrar, no hay nada que informar.
  }
  return { stats: {}, history: [] }
}

/** Porcentaje de aciertos acumulado sobre las preguntas de una unidad. */
export function unitAccuracy(
  progress: Progress,
  questionIds: string[],
): { answered: number; accuracy: number | null } {
  let seen = 0
  let correct = 0
  let answered = 0

  for (const id of questionIds) {
    const stat = progress.stats[id]
    if (!stat) continue
    answered += 1
    seen += stat.seen
    correct += stat.correct
  }

  return {
    answered,
    accuracy: seen === 0 ? null : Math.round((correct / seen) * 100),
  }
}

const THEME_KEY = 'practicing-java:theme'

export type Theme = 'light' | 'dark'

export function loadTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Se cae al valor del sistema.
  }
  const prefersDark =
    typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // El tema vuelve a resolverse por preferencia del sistema en la próxima visita.
  }
}
