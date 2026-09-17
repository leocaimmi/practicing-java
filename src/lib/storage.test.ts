import { beforeEach, describe, expect, it } from 'vitest'
import { loadProgress, recordSession, resetProgress, saveChallenge } from './storage'
import type { SessionResult } from '../types'

/**
 * Los tests corren en Node, que no tiene localStorage. Un stub en memoria
 * alcanza para ejercitar la lógica y evita sumar jsdom como dependencia.
 */
const almacen = new Map<string, string>()

globalThis.localStorage = {
  getItem: (clave: string) => almacen.get(clave) ?? null,
  setItem: (clave: string, valor: string) => {
    almacen.set(clave, valor)
  },
  removeItem: (clave: string) => {
    almacen.delete(clave)
  },
  clear: () => {
    almacen.clear()
  },
  key: (indice: number) => [...almacen.keys()][indice] ?? null,
  get length() {
    return almacen.size
  },
} as Storage

function sesion(correctas: number): SessionResult {
  return {
    id: 'test',
    finishedAt: Date.now(),
    mode: 'mixta',
    unitIds: [1],
    total: 2,
    correct: correctas,
    answers: [
      { questionId: 'u01-q01', given: true, correct: correctas > 0, elapsedMs: 100 },
    ],
  }
}

describe('progreso', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('devuelve un objeto nuevo en cada lectura cuando no hay nada guardado', () => {
    const a = loadProgress()
    const b = loadProgress()

    // Si compartieran referencia, mutar uno afectaría al otro y React no
    // detectaría el cambio de estado.
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })

  it('no contamina las lecturas siguientes al guardar sobre un progreso vacío', () => {
    saveChallenge('fibonacci', 'codigo', true)
    localStorage.clear()

    expect(loadProgress().challenges).toEqual({})
  })

  it('marca el desafío como resuelto y devuelve un progreso distinto del anterior', () => {
    const antes = loadProgress()
    const despues = saveChallenge('fibonacci', 'codigo', true)

    expect(antes).not.toBe(despues)
    expect(despues.challenges.fibonacci).toEqual({ code: 'codigo', solved: true })
  })

  it('una vez resuelto sigue resuelto aunque después se edite el código', () => {
    saveChallenge('fibonacci', 'primera version', true)
    const despues = saveChallenge('fibonacci', 'segunda version', false)

    expect(despues.challenges.fibonacci.solved).toBe(true)
    expect(despues.challenges.fibonacci.code).toBe('segunda version')
  })

  it('acumula las estadísticas de cada sesión', () => {
    recordSession(sesion(1))
    const progreso = recordSession(sesion(0))

    expect(progreso.stats['u01-q01']).toEqual({ seen: 2, correct: 1 })
    expect(progreso.history.length).toBe(2)
  })

  it('borra todo al reiniciar el progreso', () => {
    saveChallenge('fibonacci', 'codigo', true)
    recordSession(sesion(1))

    const vacio = resetProgress()

    expect(vacio).toEqual({ stats: {}, history: [], challenges: {} })
    expect(loadProgress()).toEqual({ stats: {}, history: [], challenges: {} })
  })
})
