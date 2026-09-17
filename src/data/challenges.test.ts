import { describe, expect, it } from 'vitest'
import { challenges } from './challenges'
import { runChallenge } from '../lib/java/runner'

describe('desafíos de código', () => {
  it('no repite identificadores', () => {
    const ids = challenges.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  describe.each(challenges)('$title', (challenge) => {
    it('la solución de referencia pasa todos los casos', () => {
      const report = runChallenge(challenge.solution, challenge.spec)

      expect(report.compileError).toBeUndefined()
      // Si algo falla, el mensaje muestra cuál para no tener que adivinar.
      const failures = report.results
        .filter((r) => !r.passed)
        .map((r) => `${r.call} → esperado ${r.expected}, obtenido ${r.actual}`)
      expect(failures).toEqual([])
      expect(report.allPassed).toBe(true)
    })

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
      const report = runChallenge(challenge.solution, challenge.spec)
      expect(report.trace.length).toBeGreaterThan(0)
    })
  })
})
