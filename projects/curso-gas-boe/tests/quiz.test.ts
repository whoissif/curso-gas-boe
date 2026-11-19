import { describe, expect, it } from 'vitest'
import { buscarEntradas, calcularNota, normaliza, preguntasFallidas } from '../src/lib/quiz'
import type { Pregunta } from '../src/types'

const preguntas: Pregunta[] = [
  {
    id: 'a',
    moduloId: 'm',
    enunciado: '¿Sí o no?',
    opciones: [
      { texto: 'Sí', correcta: true, explicacion: 'Correcto.' },
      { texto: 'No', correcta: false, explicacion: 'Incorrecto.' },
    ],
    cita: 'Art. 1',
    dificultad: 'facil',
  },
  {
    id: 'b',
    moduloId: 'm',
    enunciado: '¿Verdadero o falso?',
    opciones: [
      { texto: 'Verdadero', correcta: true, explicacion: 'Correcto.' },
      { texto: 'Falso', correcta: false, explicacion: 'Incorrecto.' },
    ],
    cita: 'Art. 2',
    dificultad: 'facil',
  },
]

describe('lógica de práctica', () => {
  it('normaliza acentos y mayúsculas', () => {
    expect(normaliza('INSPECCIÓN periódica')).toBe('inspeccion periodica')
  })

  it('calcula la nota y detecta fallos', () => {
    expect(calcularNota({ a: 0, b: 1 }, preguntas)).toBe(50)
    expect(preguntasFallidas({ a: 0, b: 1 }, preguntas).map((p) => p.id)).toEqual(['b'])
  })

  it('busca por sinónimos y palabras clave', () => {
    const resultados = buscarEntradas(
      [
        {
          id: 'e1',
          pregunta: '¿Quién hace la inspección?',
          palabrasClave: ['revision', 'periodicidad', 'organismo de control'],
          respuesta: 'Lo determina la ITC correspondiente.',
          cita: 'Art. 7',
          moduloId: 'm',
        },
      ],
      'organismo de control',
    )
    expect(resultados).toHaveLength(1)
  })
})
