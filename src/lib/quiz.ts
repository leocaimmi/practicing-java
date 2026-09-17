import type { Question } from '../types'

/**
 * Pregunta lista para mostrarse.
 *
 * Las opciones vienen mezcladas: en el banco todas las respuestas correctas
 * están escritas en la primera posición, así que mezclarlas acá no es un
 * detalle estético sino la única forma de que la práctica sirva.
 */
export interface PreparedQuestion {
  question: Question
  /** Opciones en el orden en que se muestran. Vacío en verdadero o falso. */
  options: string[]
  /** Índice de la opción correcta dentro de `options`. */
  correctIndex: number
}

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function prepare(question: Question): PreparedQuestion {
  if (question.type === 'vf') {
    return { question, options: [], correctIndex: -1 }
  }

  const indexed = question.options.map((text, index) => ({ text, index }))
  const mixed = shuffle(indexed)

  return {
    question,
    options: mixed.map((o) => o.text),
    correctIndex: mixed.findIndex((o) => o.index === question.correctIndex),
  }
}

/** Arma una sesión mezclando las preguntas y recortándola a `size`. */
export function buildSession(questions: Question[], size: number): PreparedQuestion[] {
  return shuffle(questions).slice(0, size).map(prepare)
}

/** Verifica una respuesta contra la versión preparada de la pregunta. */
export function isCorrect(prepared: PreparedQuestion, given: boolean | number): boolean {
  if (prepared.question.type === 'vf') {
    return given === prepared.question.answer
  }
  return given === prepared.correctIndex
}

export function percentage(correct: number, total: number): number {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

/** Devolutiva breve según el porcentaje obtenido. */
export function verdict(pct: number): { label: string; tone: 'alto' | 'medio' | 'bajo' } {
  if (pct >= 80) return { label: 'Muy buen dominio del tema', tone: 'alto' }
  if (pct >= 60) return { label: 'Aprobado, con puntos para reforzar', tone: 'medio' }
  return { label: 'Conviene repasar la teoría antes de seguir', tone: 'bajo' }
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes === 0) return `${seconds} s`
  return `${minutes} min ${seconds.toString().padStart(2, '0')} s`
}
