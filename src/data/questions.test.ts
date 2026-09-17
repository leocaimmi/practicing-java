import { describe, expect, it } from 'vitest'
import { allQuestions, questionsByUnit } from './questions'
import { units } from './units'

describe('banco de preguntas', () => {
  it('no repite identificadores', () => {
    const ids = allQuestions.map((q) => q.id)
    const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(repetidos).toEqual([])
  })

  it('usa el formato de id uXX-qYY, coherente con la unidad', () => {
    for (const question of allQuestions) {
      expect(question.id).toMatch(/^u\d{2}-q\d{2}$/)
      expect(question.id.slice(1, 3)).toBe(String(question.unitId).padStart(2, '0'))
    }
  })

  it('apunta siempre a una unidad que existe', () => {
    const conocidas = new Set(units.map((u) => u.id))
    for (const question of allQuestions) {
      expect(conocidas.has(question.unitId)).toBe(true)
    }
  })

  it('cada unidad tiene preguntas de los tres tipos', () => {
    for (const unit of units) {
      const tipos = new Set(questionsByUnit(unit.id).map((q) => q.type))
      expect({ unidad: unit.id, tipos: [...tipos].sort() }).toEqual({
        unidad: unit.id,
        tipos: ['code', 'mc', 'vf'],
      })
    }
  })

  it('las de opción múltiple tienen cuatro opciones distintas y un índice válido', () => {
    for (const question of allQuestions) {
      if (question.type === 'vf') continue

      expect({ id: question.id, opciones: question.options.length }).toEqual({
        id: question.id,
        opciones: 4,
      })
      expect(new Set(question.options).size).toBe(4)
      expect(question.correctIndex).toBeGreaterThanOrEqual(0)
      expect(question.correctIndex).toBeLessThan(question.options.length)
    }
  })

  it('no deja textos vacíos', () => {
    for (const question of allQuestions) {
      expect(question.prompt.trim().length).toBeGreaterThan(10)
      expect(question.explanation.trim().length).toBeGreaterThan(20)
      expect(question.source.trim().length).toBeGreaterThan(0)
      expect(question.tags.length).toBeGreaterThan(0)
      if (question.type === 'code') {
        expect(question.code.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('cada unidad tiene al menos quince preguntas', () => {
    for (const unit of units) {
      const cantidad = questionsByUnit(unit.id).length
      expect({ unidad: unit.id, cantidad: cantidad >= 15 }).toEqual({
        unidad: unit.id,
        cantidad: true,
      })
    }
  })
})
