/**
 * Modelo de datos del banco de preguntas.
 *
 * Los campos están pensados para mapear uno a uno contra tablas de Supabase
 * cuando se reemplace la fuente local por una remota: `questions` (con `unit_id`
 * como clave foránea) y `units`. Por eso los identificadores son strings
 * estables y no índices de array.
 */

export type QuestionType = 'vf' | 'mc' | 'code'

export type Difficulty = 'basico' | 'intermedio' | 'avanzado'

interface QuestionBase {
  /** Identificador estable, con el formato `u05-q03`. */
  id: string
  unitId: number
  type: QuestionType
  difficulty: Difficulty
  /** Consigna de la pregunta. */
  prompt: string
  /** Justificación que se muestra una vez respondida. */
  explanation: string
  /** Clase del material teórico de la que sale el contenido. */
  source: string
  tags: string[]
}

export interface VfQuestion extends QuestionBase {
  type: 'vf'
  answer: boolean
}

export interface McQuestion extends QuestionBase {
  type: 'mc'
  options: string[]
  correctIndex: number
}

export interface CodeQuestion extends QuestionBase {
  type: 'code'
  /** Fragmento de Java que hay que analizar. */
  code: string
  options: string[]
  correctIndex: number
}

export type Question = VfQuestion | McQuestion | CodeQuestion

export interface Unit {
  id: number
  /** Nombre corto para chips y listados. */
  name: string
  /** Título completo, tal como figura en el material. */
  title: string
  summary: string
  topics: string[]
  /**
   * Si el tema entra en el parcial, según el alcance que declara el
   * «Resumen Integral para Parcial» de la cátedra.
   */
  inParcial: boolean
}

/** Respuesta del usuario a una pregunta dentro de una sesión de práctica. */
export interface Answer {
  questionId: string
  /** `true`/`false` en verdadero o falso, índice de opción en el resto. */
  given: boolean | number
  correct: boolean
  /** Milisegundos que tardó en responder. */
  elapsedMs: number
}

/** Resultado persistido de una sesión terminada. */
export interface SessionResult {
  id: string
  finishedAt: number
  mode: 'unidad' | 'mixta' | 'examen'
  /** Unidades incluidas en la sesión. */
  unitIds: number[]
  total: number
  correct: number
  answers: Answer[]
}
