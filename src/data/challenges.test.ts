import { describe, expect, it } from 'vitest'
import { challenges } from './challenges'
import { CHALLENGE_COUNT } from './challengeMeta'
import { runChallenge } from '../lib/java/runner'

describe('desafíos de código', () => {
  it('la cantidad declarada para la pantalla de inicio coincide con la real', () => {
    expect(CHALLENGE_COUNT).toBe(challenges.length)
  })

  it('no repite identificadores', () => {
    const ids = challenges.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  describe.each(challenges)('$title', (challenge) => {
    it('ofrece al menos dos soluciones posibles', () => {
      expect(challenge.solutions.length).toBeGreaterThanOrEqual(2)
      // Cada enfoque tiene que distinguirse de los otros por su etiqueta.
      const etiquetas = challenge.solutions.map((s) => s.label)
      expect(new Set(etiquetas).size).toBe(etiquetas.length)
    })

    it('cada solución explica qué aporta su enfoque', () => {
      for (const solucion of challenge.solutions) {
        expect(solucion.note.trim().length).toBeGreaterThan(30)
        expect(solucion.label.trim().length).toBeGreaterThan(3)
      }
    })

    // Todas las soluciones tienen que aprobar, no sólo la primera: si una no
    // pasa, se le estaría mostrando código incorrecto a quien estudia.
    it.each(challenge.solutions.map((s) => [s.label, s] as const))(
      'la solución "%s" pasa todos los casos',
      (_label, solucion) => {
        const report = runChallenge(solucion.code, challenge.spec)

        expect(report.compileError).toBeUndefined()
        const fallos = report.results
          .filter((r) => !r.passed)
          .map((r) => `${r.call} → esperado ${r.expected}, obtenido ${r.actual}`)
        expect(fallos).toEqual([])
        expect(report.allPassed).toBe(true)
      },
    )

    it('el código inicial no pasa todos los casos', () => {
      // Si el esqueleto ya aprobara, el desafío no pediría nada.
      const report = runChallenge(challenge.starterCode, challenge.spec)
      expect(report.allPassed).toBe(false)
    })

    it('el código inicial define el método que piden los tests', () => {
      const report = runChallenge(challenge.starterCode, challenge.spec)
      expect(report.compileError).toBeUndefined()
    })

    it('tiene casos visibles y ocultos', () => {
      expect(challenge.spec.tests.some((t) => !t.hidden)).toBe(true)
      expect(challenge.spec.tests.length).toBeGreaterThanOrEqual(3)
    })

    it('genera trazado para el paso a paso', () => {
      const report = runChallenge(challenge.solutions[0].code, challenge.spec)
      expect(report.trace.length).toBeGreaterThan(0)
    })
  })
})
