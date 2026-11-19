import { describe, expect, it } from 'vitest'
import { contenido } from '../src/data/contenido'
import type { Pregunta } from '../src/types'

function validarPregunta(pregunta: Pregunta): boolean {
  const correctas = pregunta.opciones.filter((opcion) => opcion.correcta)
  return (
    pregunta.enunciado.length > 0 &&
    pregunta.opciones.length >= 2 &&
    correctas.length === 1 &&
    pregunta.cita.length > 0 &&
    pregunta.opciones.every((opcion) => opcion.explicacion.length > 0)
  )
}

function idsUnicos(lista: { id: string }[]): boolean {
  return new Set(lista.map((elemento) => elemento.id)).size === lista.length
}

describe('contenido normativo', () => {
  it('expone todas las colecciones', () => {
    expect(Array.isArray(contenido.modulos)).toBe(true)
    expect(Array.isArray(contenido.preguntas)).toBe(true)
    expect(Array.isArray(contenido.casos)).toBe(true)
    expect(Array.isArray(contenido.buscador)).toBe(true)
    expect(Array.isArray(contenido.glosario)).toBe(true)
  })

  it('tiene volumen suficiente para un curso completo', () => {
    expect(contenido.modulos.length).toBeGreaterThanOrEqual(8)
    expect(contenido.preguntas.length).toBeGreaterThanOrEqual(70)
    expect(contenido.casos.length).toBeGreaterThanOrEqual(10)
    expect(contenido.buscador.length).toBeGreaterThanOrEqual(30)
    expect(contenido.glosario.length).toBeGreaterThanOrEqual(25)
  })

  it('no repite identificadores', () => {
    expect(idsUnicos(contenido.modulos)).toBe(true)
    expect(idsUnicos(contenido.preguntas)).toBe(true)
    expect(idsUnicos(contenido.casos)).toBe(true)
    expect(idsUnicos(contenido.buscador)).toBe(true)
  })

  it('toda pregunta tiene una sola respuesta correcta y su explicación', () => {
    expect(contenido.preguntas.every(validarPregunta)).toBe(true)
  })

  it('toda pregunta pertenece a un módulo existente', () => {
    const idsModulo = new Set(contenido.modulos.map((modulo) => modulo.id))
    expect(contenido.preguntas.every((pregunta) => idsModulo.has(pregunta.moduloId))).toBe(true)
  })
})
