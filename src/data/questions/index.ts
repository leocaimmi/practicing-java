import type { Question, QuestionType } from '../../types'
import { unit01 } from './unit01'
import { unit02 } from './unit02'
import { unit03 } from './unit03'
import { unit04 } from './unit04'
import { unit05 } from './unit05'
import { unit06 } from './unit06'
import { unit07 } from './unit07'
import { unit08 } from './unit08'
import { unit09 } from './unit09'
import { unit10 } from './unit10'
import { unit11 } from './unit11'
import { unit12 } from './unit12'
import { unit13 } from './unit13'
import { unit14 } from './unit14'
import { unit15 } from './unit15'
import { unit16 } from './unit16'

/**
 * Banco completo de preguntas.
 *
 * Cuando se incorpore Supabase, esta constante pasa a ser el resultado de una
 * consulta y el resto de la aplicación no necesita cambiar: todo consume
 * `allQuestions` a través de los selectores de abajo.
 */
export const allQuestions: Question[] = [
  ...unit01,
  ...unit02,
  ...unit03,
  ...unit04,
  ...unit05,
  ...unit06,
  ...unit07,
  ...unit08,
  ...unit09,
  ...unit10,
  ...unit11,
  ...unit12,
  ...unit13,
  ...unit14,
  ...unit15,
  ...unit16,
]

export function questionsByUnit(unitId: number): Question[] {
  return allQuestions.filter((q) => q.unitId === unitId)
}

export function questionsByUnits(unitIds: number[]): Question[] {
  const wanted = new Set(unitIds)
  return allQuestions.filter((q) => wanted.has(q.unitId))
}

export function countByType(questions: Question[]): Record<QuestionType, number> {
  return questions.reduce(
    (acc, q) => {
      acc[q.type] += 1
      return acc
    },
    { vf: 0, mc: 0, code: 0 } as Record<QuestionType, number>,
  )
}
