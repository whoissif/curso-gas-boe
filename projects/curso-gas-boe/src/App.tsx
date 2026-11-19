import { useEffect, useMemo, useState } from 'react'
import { contenido } from './data/contenido'
import { buscarEntradas, calcularNota, esCorrecta, preguntasFallidas } from './lib/quiz'
import type { Caso, Modulo, Pregunta } from './types'

const BOE = 'https://www.boe.es/buscar/act.php?id=BOE-A-2006-15345'
type Vista = 'inicio' | 'aprender' | 'practica' | 'casos' | 'buscar' | 'examen'

const NAV: { id: Vista; label: string; icono: string }[] = [
  { id: 'inicio', label: 'Inicio', icono: '🏠' },
  { id: 'aprender', label: 'Aprender', icono: '📚' },
  { id: 'practica', label: 'Tests', icono: '🧠' },
  { id: 'casos', label: 'Casos', icono: '🛠️' },
  { id: 'buscar', label: 'Buscar', icono: '🔎' },
  { id: 'examen', label: 'Examen', icono: '⏱️' },
]

function useGuardado<T>(clave: string, inicial: T, validar: (valor: unknown) => boolean = () => true) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(clave)
      if (!raw) return inicial
      const parseado: unknown = JSON.parse(raw)
      return validar(parseado) ? (parseado as T) : inicial
    } catch {
      return inicial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      /* almacenamiento no disponible: seguimos sin persistir */
    }
  }, [clave, valor])
  return [valor, setValor] as const
}

function Cita({ texto, url }: { texto?: string; url?: string }) {
  if (!texto) return null
  return (
    <a className="cita" href={url ?? BOE} target="_blank" rel="noreferrer">
      📖 {texto} <span>↗</span>
    </a>
  )
}

function Barra({ valor }: { valor: number }) {
  return (
    <div className="barra" role="progressbar" aria-valuenow={valor} aria-valuemin={0} aria-valuemax={100}>
      <div className="barra-relleno" style={{ width: `${Math.max(0, Math.min(100, valor))}%` }} />
    </div>
  )
}

function Mezclar<T>(lista: T[]): T[] {
  return [...lista].sort(() => Math.random() - 0.5)
}

export default function App() {
  const [vista, setVista] = useState<Vista>('inicio')
  const [moduloId, setModuloId] = useState(contenido.modulos[0]?.id ?? '')
  const [respuestas, setRespuestas] = useGuardado<Record<string, number>>(
    'gas-respuestas',
    {},
    (valor) =>
      typeof valor === 'object' &&
      valor !== null &&
      !Array.isArray(valor) &&
      Object.values(valor).every((x) => typeof x === 'number'),
  )
  const [indicePorModulo, setIndicePorModulo] = useState<Record<string, number>>({})
  const [casoAbierto, setCasoAbierto] = useState<string | null>(null)
  const [termino, setTermino] = useState('')
  const [examen, setExamen] = useState<Pregunta[]>([])
  const [examenRespuestas, setExamenRespuestas] = useState<Record<string, number>>({})
  const [examenIndice, setExamenIndice] = useState(0)
  const [examenFinalizado, setExamenFinalizado] = useState(false)
  const [inicioExamen, setInicioExamen] = useState<number | null>(null)
  const [segundos, setSegundos] = useState(0)
  const [modoFallos, setModoFallos] = useState(false)

  const modulo: Modulo | undefined =
    contenido.modulos.find((m) => m.id === moduloId) ?? contenido.modulos[0]
  const preguntasModulo = useMemo(
    () => contenido.preguntas.filter((p) => p.moduloId === modulo?.id),
    [modulo?.id],
  )
  const indice = indicePorModulo[modulo?.id ?? ''] ?? 0
  const pregunta: Pregunta | undefined = preguntasModulo[indice] ?? preguntasModulo[0]

  const resultados = useMemo(() => {
    const respondidas = Object.keys(respuestas).length
    return {
      respondidas,
      total: contenido.preguntas.length,
      aciertos: contenido.preguntas.filter((p) => esCorrecta(p, respuestas[p.id] ?? -1)).length,
    }
  }, [respuestas])

  const fallosGuardados = useMemo(
    () => preguntasFallidas(respuestas, contenido.preguntas),
    [respuestas],
  )
  const fallosExamen = preguntasFallidas(examenRespuestas, examen)
  const tamanoExamen = Math.min(20, contenido.preguntas.length)

  useEffect(() => {
    if (inicioExamen === null || examenFinalizado || examen.length === 0) return
    const actualizar = () => {
      const transcurrido = Math.floor((Date.now() - inicioExamen) / 1000)
      setSegundos(Math.min(transcurrido, 1200))
      if (transcurrido >= 1200) setExamenFinalizado(true)
    }
    actualizar()
    const id = window.setInterval(actualizar, 1000)
    return () => window.clearInterval(id)
  }, [inicioExamen, examenFinalizado, examen.length])

  function responderTest(indiceOpcion: number) {
    if (!pregunta) return
    setRespuestas({ ...respuestas, [pregunta.id]: indiceOpcion })
  }

  function siguienteTest() {
    if (!modulo || preguntasModulo.length === 0) return
    setIndicePorModulo({
      ...indicePorModulo,
      [modulo.id]: (indice + 1) % preguntasModulo.length,
    })
  }

  function iniciarExamen(fallos = false) {
    const base = fallos ? fallosGuardados : contenido.preguntas
    const seleccion = Mezclar(base).slice(0, tamanoExamen)
    if (seleccion.length === 0) return
    setExamen(seleccion)
    setExamenRespuestas({})
    setExamenIndice(0)
    setExamenFinalizado(false)
    setInicioExamen(Date.now())
    setSegundos(0)
    setModoFallos(fallos)
    setVista('examen')
  }

  function responderExamen(indiceOpcion: number) {
    const actual = examen[examenIndice]
    if (!actual) return
    setExamenRespuestas({ ...examenRespuestas, [actual.id]: indiceOpcion })
  }

  function repetirFallos() {
    if (fallosExamen.length === 0) return
    setExamen(Mezclar(fallosExamen))
    setExamenRespuestas({})
    setExamenIndice(0)
    setInicioExamen(Date.now())
    setSegundos(0)
    setExamenFinalizado(false)
    setModoFallos(true)
  }

  const minutos = String(Math.floor(segundos / 60)).padStart(2, '0')
  const segs = String(segundos % 60).padStart(2, '0')
  const notaExamen = calcularNota(examenRespuestas, examen)
  const aciertosExamen = examen.filter((p) => esCorrecta(p, examenRespuestas[p.id] ?? -1)).length
  const resultadosBusqueda = usarBusqueda(termino)

  function usarBusqueda(texto: string) {
    return texto.trim().length >= 2 ? buscarEntradas(contenido.buscador, texto) : []
  }

  return (
    <div className="app">
      <header className="cabecera">
        <button className="marca" onClick={() => setVista('inicio')}>
          <span className="marca-icono">🔥</span>
          <span>
            <strong>Gas Sin Misterio</strong>
            <small>RD 919/2006 · sin rollo, con sentido</small>
          </span>
        </button>
        <nav aria-label="Navegación principal">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={vista === item.id ? 'nav-activo' : ''}
              aria-current={vista === item.id ? 'page' : undefined}
              onClick={() => setVista(item.id)}
            >
              <span aria-hidden="true">{item.icono}</span> {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {vista === 'inicio' && (
          <section className="hero">
            <div className="hero-texto">
              <span className="etiqueta">CURSO INTERACTIVO · NIVEL INICIAL</span>
              <h1>El gas no muerde. <em>Pero hay que saber buscar.</em></h1>
              <p>
                Aprende lo importante del Reglamento de gas (RD 919/2006) para trabajar con
                instalaciones receptoras en viviendas: qué es cada cosa, quién hace qué y cómo
                encontrar la respuesta cuando te salte una duda en el trabajo.
              </p>
              <div className="hero-acciones">
                <button className="boton-principal" onClick={() => setVista('aprender')}>
                  Empezar a aprender →
                </button>
                <button className="boton-secundario" onClick={() => setVista('practica')}>
                  Probar un test
                </button>
              </div>
              <div className="stats">
                <div><strong>{contenido.modulos.length}</strong><span>módulos</span></div>
                <div><strong>{contenido.preguntas.length}</strong><span>tests explicados</span></div>
                <div><strong>{contenido.casos.length}</strong><span>casos reales</span></div>
                <div><strong>{contenido.buscador.length}</strong><span>respuestas listas</span></div>
              </div>
            </div>
            <div className="hero-tarjeta">
              <div className="icono-grande">🚨</div>
              <h3>Regla de oro</h3>
              <p>Si hueles a gas: <strong>no acciones interruptores</strong>, ventila, sal y avisa desde fuera.</p>
              <Cita texto="Reglamento, arts. 6 y 7" url={BOE} />
              <div className="mini-flujo">
                <span>1️⃣ Ventila</span><span>2️⃣ Sal</span><span>3️⃣ Avisa</span>
              </div>
            </div>
          </section>
        )}

        {vista === 'aprender' && modulo && (
          <section>
            <div className="cabecera-seccion">
              <div>
                <span className="etiqueta">APRENDER</span>
                <h2>El reglamento, a tu manera</h2>
                <p>Toca un módulo y lee solo lo que necesitas. Las citas te llevan al BOE.</p>
              </div>
              <div className="progreso-box">
                <span>Tu avance en tests</span>
                <Barra valor={resultados.total ? (resultados.respondidas / resultados.total) * 100 : 0} />
                <small>{resultados.respondidas} de {resultados.total} preguntas respondidas</small>
              </div>
            </div>
            <div className="chips">
              {contenido.modulos.map((m) => (
                <button
                  key={m.id}
                  className={m.id === modulo.id ? 'chip-activo' : ''}
                  onClick={() => { setModuloId(m.id); setIndicePorModulo({}) }}
                >
                  <span>{m.icono}</span> {m.titulo}
                </button>
              ))}
            </div>
            <article className="tarjeta-modulo">
              <header>
                <div className="icono-modulo">{modulo.icono}</div>
                <div>
                  <h3>{modulo.titulo}</h3>
                  <p>{modulo.resumen}</p>
                </div>
                <span className="duracion">⏱ {modulo.duracion}</span>
              </header>
              <div className="bloques">
                {modulo.bloques.map((bloque, i) => (
                  <div key={`${bloque.titulo}-${i}`} className={`bloque bloque-${bloque.tipo}`}>
                    <h4>{bloque.tipo === 'aviso' ? '⚠️ ' : bloque.tipo === 'paso' ? '👉 ' : ''}{bloque.titulo}</h4>
                    <p>{bloque.texto}</p>
                    {bloque.items && (
                      <ul>{bloque.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    )}
                    <Cita texto={bloque.cita} url={bloque.url} />
                  </div>
                ))}
              </div>
              <footer className="modulo-footer">
                <button className="boton-principal" onClick={() => setVista('practica')}>
                  Practicar este módulo →
                </button>
                {preguntasModulo.length > 0 && (
                  <small>{preguntasModulo.length} preguntas disponibles</small>
                )}
              </footer>
            </article>
          </section>
        )}

        {vista === 'practica' && (
          <section className="practica">
            <div className="cabecera-seccion">
              <div>
                <span className="etiqueta">TESTS</span>
                <h2>Acierta, falla, aprende</h2>
                <p>Cada respuesta tiene su explicación. Equivocarte aquí no tiene consecuencias.</p>
              </div>
              <button className="boton-secundario" onClick={() => iniciarExamen(false)}>
                Pasar al examen →
              </button>
            </div>
            <div className="chips">
              {contenido.modulos.map((m) => (
                <button
                  key={m.id}
                  className={m.id === modulo?.id ? 'chip-activo' : ''}
                  onClick={() => { setModuloId(m.id); setIndicePorModulo({}) }}
                >
                  {m.icono} {m.titulo}
                </button>
              ))}
            </div>
            {pregunta ? (
              <article className="tarjeta-pregunta">
                <div className="pregunta-top">
                  <span className="contador">Pregunta {indice + 1} de {preguntasModulo.length}</span>
                  <span className={`dificultad dif-${pregunta.dificultad}`}>{pregunta.dificultad}</span>
                </div>
                <h3>{pregunta.enunciado}</h3>
                {pregunta.pista && <p className="pista">💡 Pista: {pregunta.pista}</p>}
                <div className="opciones" role="radiogroup" aria-label="Opciones de respuesta">
                  {pregunta.opciones.map((opcion, i) => {
                    const elegida = respuestas[pregunta.id] === i
                    const yaRespondida = respuestas[pregunta.id] !== undefined
                    const clase = !yaRespondida
                      ? ''
                      : opcion.correcta
                        ? 'opcion-correcta'
                        : elegida
                          ? 'opcion-incorrecta'
                          : 'opcion-neutra'
                    return (
                      <button
                        key={`${opcion.texto}-${i}`}
                        className={`opcion ${clase}`}
                        role="radio"
                        aria-checked={elegida}
                        onClick={() => responderTest(i)}
                        disabled={yaRespondida}
                      >
                        <span className="letra">{String.fromCharCode(65 + i)}</span>
                        <span>{opcion.texto}</span>
                        {yaRespondida && opcion.correcta && <span className="marca">✓</span>}
                        {elegida && !opcion.correcta && <span className="marca">✗</span>}
                      </button>
                    )
                  })}
                </div>
                {respuestas[pregunta.id] !== undefined && (
                  <div className="explicacion">
                    <strong>
                      {esCorrecta(pregunta, respuestas[pregunta.id] ?? -1)
                        ? '¡Correcto! '
                        : 'Casi. '}
                    </strong>
                    {pregunta.opciones.find((o) => o.correcta)?.explicacion}
                    <Cita texto={pregunta.cita} url={pregunta.url} />
                  </div>
                )}
                <button className="boton-principal" onClick={siguienteTest}>
                  Siguiente pregunta →
                </button>
              </article>
            ) : (
              <p className="vacio">Todavía no hay preguntas para este módulo.</p>
            )}
          </section>
        )}

        {vista === 'casos' && (
          <section>
            <div className="cabecera-seccion">
              <div>
                <span className="etiqueta">CASOS REALES</span>
                <h2>¿Qué harías tú?</h2>
                <p>Situaciones que pueden aparecer en un servicio. Abre cada caso y sigue los pasos.</p>
              </div>
            </div>
            <div className="casos-grid">
              {contenido.casos.map((caso: Caso) => (
                <article key={caso.id} className="tarjeta-caso">
                  <button
                    className="caso-cabecera"
                    aria-expanded={casoAbierto === caso.id}
                    aria-controls={`caso-${caso.id}`}
                    onClick={() => setCasoAbierto(casoAbierto === caso.id ? null : caso.id)}
                  >
                    <span className="caso-icono">🧰</span>
                    <span>
                      <strong>{caso.titulo}</strong>
                      <small>{caso.situacion.slice(0, 90)}…</small>
                    </span>
                    <span>{casoAbierto === caso.id ? '▲' : '▼'}</span>
                  </button>
                  {casoAbierto === caso.id && (
                    <div className="caso-cuerpo" id={`caso-${caso.id}`}>
                      <p className="situacion">{caso.situacion}</p>
                      <ol className="pasos">
                        {caso.pasos.map((paso, i) => (
                          <li key={`${paso.texto}-${i}`}>
                            <strong>{paso.texto}</strong>
                            <span>{paso.porque}</span>
                            <Cita texto={paso.cita} url={caso.url} />
                          </li>
                        ))}
                      </ol>
                      <div className="error-comun">🚫 Error frecuente: {caso.errorComun}</div>
                      <Cita texto={caso.cita} url={caso.url} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {vista === 'buscar' && (
          <section className="buscador">
            <div className="cabecera-seccion">
              <div>
                <span className="etiqueta">BUSCADOR</span>
                <h2>Tu duda, respuesta y cita</h2>
                <p>Escribe lo que te preguntan en el trabajo: “inspección”, “botella”, “quién paga”, “plazo”…</p>
              </div>
            </div>
            <div className="caja-busqueda">
              <span>🔎</span>
              <input
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                placeholder="Escribe aquí tu duda…"
                aria-label="Buscar en la normativa"
              />
              {termino && (
                <button aria-label="Borrar búsqueda" onClick={() => setTermino('')}>
                  ✕
                </button>
              )}
            </div>
            <div className="sugerencias">
              {['inspección', 'botella', 'plazo', 'instalador', 'fuga'].map((s) => (
                <button key={s} onClick={() => setTermino(s)}>{s}</button>
              ))}
            </div>
            {termino.trim().length >= 2 && (
              <p className="num-resultados">
                {resultadosBusqueda.length} resultado{resultadosBusqueda.length === 1 ? '' : 's'} para “{termino}”
              </p>
            )}
            <div className="resultados">
              {resultadosBusqueda.map((entrada) => (
                <article key={entrada.id} className="tarjeta-resultado">
                  <h3>{entrada.pregunta}</h3>
                  <p>{entrada.respuesta}</p>
                  <Cita texto={entrada.cita} url={entrada.url} />
                </article>
              ))}
            </div>
            {termino.trim().length >= 2 && resultadosBusqueda.length === 0 && (
              <p className="vacio">No lo encontré. Prueba con otra palabra o abre el BOE completo.</p>
            )}
          </section>
        )}

        {vista === 'examen' && (
          <section className="examen">
            <div className="examen-barra">
              <div>
                <span className="etiqueta">{modoFallos ? 'RECUPERACIÓN' : 'MODO EXAMEN'}</span>
                <h2>
                  {examenFinalizado ? 'Resultado' : `${tamanoExamen} preguntas · 20 minutos`}
                </h2>
              </div>
              {!examenFinalizado && examen.length > 0 && (
                <div className="reloj">⏱ {minutos}:{segs}</div>
              )}
            </div>

            {examen.length === 0 && (
              <div className="panel-inicio-examen">
                <p>Mezcla {tamanoExamen} preguntas de todo el curso y comprueba lo que sabes.</p>
                <button className="boton-principal" onClick={() => iniciarExamen(false)}>
                  Empezar examen
                </button>
                {fallosGuardados.length > 0 && (
                  <button className="boton-secundario" onClick={() => iniciarExamen(true)}>
                    Repetir solo falladas
                  </button>
                )}
              </div>
            )}

            {!examenFinalizado && examen.length > 0 && (
              <article className="tarjeta-pregunta examen-pregunta">
                <div className="pregunta-top">
                  <span className="contador">Pregunta {examenIndice + 1} de {examen.length}</span>
                  <Barra valor={((examenIndice + 1) / examen.length) * 100} />
                </div>
                <h3>{examen[examenIndice]?.enunciado}</h3>
                <div className="opciones" role="radiogroup" aria-label="Opciones de respuesta del examen">
                  {examen[examenIndice]?.opciones.map((opcion, i) => (
                    <button
                      key={`${opcion.texto}-${i}`}
                      className={`opcion ${examenRespuestas[examen[examenIndice]?.id ?? ''] === i ? 'opcion-elegida' : ''}`}
                      role="radio"
                      aria-checked={examenRespuestas[examen[examenIndice]?.id ?? ''] === i}
                      onClick={() => responderExamen(i)}
                    >
                      <span className="letra">{String.fromCharCode(65 + i)}</span>
                      <span>{opcion.texto}</span>
                    </button>
                  ))}
                </div>
                <div className="examen-acciones">
                  <button
                    className="boton-secundario"
                    disabled={examenIndice === 0}
                    onClick={() => setExamenIndice(examenIndice - 1)}
                  >
                    ← Anterior
                  </button>
                  {examenIndice < examen.length - 1 ? (
                    <button className="boton-principal" onClick={() => setExamenIndice(examenIndice + 1)}>
                      Siguiente →
                    </button>
                  ) : (
                    <button className="boton-principal" onClick={() => setExamenFinalizado(true)}>
                      Terminar examen
                    </button>
                  )}
                </div>
              </article>
            )}

            {examenFinalizado && (
              <article className="resultado-examen">
                <div className={`nota ${notaExamen >= 70 ? 'nota-bien' : 'nota-repasar'}`}>
                  <strong>{notaExamen}%</strong>
                  <span>{notaExamen >= 70 ? '¡ perfecto!' : 'a repasar'}</span>
                </div>
                <p>
                  Has acertado {aciertosExamen} de {examen.length}. Buenos resultados: con 70% o más ya puedes seguir.
                </p>
                <div className="examen-acciones">
                  <button className="boton-principal" onClick={() => iniciarExamen(false)}>
                    Otro examen
                  </button>
                  <button
                    className="boton-secundario"
                    disabled={fallosExamen.length === 0}
                    onClick={repetirFallos}
                  >
                    Repetir falladas
                  </button>
                  <button className="boton-secundario" onClick={() => setVista('aprender')}>
                    Volver a aprender
                  </button>
                </div>
              </article>
            )}
          </section>
        )}
      </main>

      <footer className="pie">
        <span>Fuente: Real Decreto 919/2006, texto consolidado.</span>
        <a href={BOE} target="_blank" rel="noreferrer">Abrir BOE oficial ↗</a>
        <span>Contenido divulgativo, no sustituye la norma oficial.</span>
      </footer>
    </div>
  )
}
