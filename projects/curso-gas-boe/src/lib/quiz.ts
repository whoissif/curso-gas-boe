import type { EntradaBuscador, Pregunta } from '../types'

/** Quita acentos y mayúsculas para que la búsqueda perdone errores de tecleo. */
export function normaliza(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function esCorrecta(pregunta: Pregunta, indiceOpcion: number): boolean {
  return pregunta.opciones[indiceOpcion]?.correcta === true
}

export function calcularNota(
  respuestas: Record<string, number | undefined>,
  preguntas: Pregunta[],
): number {
  if (preguntas.length === 0) return 0
  const aciertos = preguntas.filter((p) => esCorrecta(p, respuestas[p.id] ?? -1)).length
  return Math.round((aciertos / preguntas.length) * 100)
}

export function preguntasFallidas(
  respuestas: Record<string, number | undefined>,
  preguntas: Pregunta[],
): Pregunta[] {
  return preguntas.filter((p) => !esCorrecta(p, respuestas[p.id] ?? -1))
}

export function buscarEntradas(
  entradas: EntradaBuscador[],
  termino: string,
): EntradaBuscador[] {
  const consulta = normaliza(termino.trim())
  if (consulta.length < 2) return []
  return entradas.filter((entrada) => {
    const texto = normaliza(
      [entrada.pregunta, entrada.respuesta, ...entrada.palabrasClave].join(' '),
    )
    return texto.includes(consulta)
  })
}
