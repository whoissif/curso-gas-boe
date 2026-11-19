export type TipoBloque = 'texto' | 'aviso' | 'paso' | 'dato' | 'lista'

export interface Bloque {
  titulo: string
  tipo: TipoBloque
  texto: string
  items?: string[]
  cita?: string
  url?: string
}

export interface Modulo {
  id: string
  titulo: string
  icono: string
  resumen: string
  duracion: string
  bloques: Bloque[]
  palabrasClave: string[]
}

export interface Opcion {
  texto: string
  correcta: boolean
  explicacion: string
}

export interface Pregunta {
  id: string
  moduloId: string
  enunciado: string
  opciones: Opcion[]
  pista?: string
  cita: string
  url?: string
  dificultad: 'facil' | 'media' | 'dificil'
}

export interface PasoCaso {
  texto: string
  porque: string
  cita?: string
}

export interface Caso {
  id: string
  titulo: string
  situacion: string
  pasos: PasoCaso[]
  errorComun: string
  cita: string
  url?: string
}

export interface EntradaBuscador {
  id: string
  pregunta: string
  palabrasClave: string[]
  respuesta: string
  cita: string
  url?: string
  moduloId: string
}

export interface GlosarioItem {
  termino: string
  definicion: string
  cita?: string
}

export interface Contenido {
  modulos: Modulo[]
  preguntas: Pregunta[]
  casos: Caso[]
  buscador: EntradaBuscador[]
  glosario: GlosarioItem[]
}
