import type { Contenido } from '../types'

/** Enlace al texto consolidado oficial del Real Decreto 919/2006. */
const BOE = 'https://www.boe.es/buscar/act.php?id=BOE-A-2006-15345'

/**
 * Contenido divulgativo verificado contra el texto consolidado del BOE.
 * Cuando no procede un apartado concreto se cita la norma de forma general.
 */
export const contenido: Contenido = {
  modulos: [
    {
      id: 'que-es',
      titulo: '¿Qué es el Reglamento de gas?',
      icono: '📘',
      resumen:
        'Para qué sirve el Real Decreto 919/2006 y qué partes del mundo del gas toca en una vivienda.',
      duracion: '6 min',
      palabrasClave: ['RD 919/2006', 'reglamento', 'seguridad', 'gas', 'ITCs'],
      bloques: [
        {
          titulo: 'El objetivo es proteger a las personas',
          tipo: 'texto',
          texto:
            'El reglamento fija condiciones técnicas y garantías para las instalaciones de gas y los aparatos. Su meta es preservar la seguridad de las personas y de los bienes.',
          cita: 'Reglamento, art. 1',
          url: BOE,
        },
        {
          titulo: 'Dos niveles de reglas',
          tipo: 'texto',
          texto:
            'El reglamento da las reglas generales. Cada instrucción técnica complementaria (ITC) da las reglas concretas según el tipo de instalación.',
          cita: 'Reglamento, art. 1',
          url: BOE,
        },
        {
          titulo: 'Qué instalaciones nos afectan',
          tipo: 'lista',
          texto: 'Estas son las piezas que vemos en el día a día de una vivienda:',
          items: [
            'Instalaciones receptoras de gas en viviendas y edificios.',
            'Aparatos de gas, como cocinas o calderas.',
            'Botellas de GLP para uso propio en la vivienda.',
            'Redes, GNL y estaciones de servicio también aparecen en la norma, pero quedan fuera de este curso.',
          ],
          cita: 'Reglamento, art. 2.1',
          url: BOE,
        },
        {
          titulo: 'Cumplir no exime de todo',
          tipo: 'aviso',
          texto:
            'Seguir este reglamento no dispensa de cumplir otras normas que regulen cuestiones distintas de la seguridad del gas.',
          cita: 'Reglamento, art. 1',
          url: BOE,
        },
        {
          titulo: 'Un mínimo obligatorio',
          tipo: 'dato',
          texto:
            'Las prescripciones son mínimos obligatorios. Se admiten soluciones distintas si demuestran un nivel de seguridad equivalente y lo aprueba la autoridad antes de empezar.',
          cita: 'Reglamento, arts. 9 y 10',
          url: BOE,
        },
      ],
    },
    {
      id: 'recorrido',
      titulo: 'El recorrido del gas en casa',
      icono: '🧭',
      resumen:
        'Dónde empieza y dónde acaba la instalación receptora y cómo se dividen sus partes.',
      duracion: '8 min',
      palabrasClave: ['instalación receptora', 'llaves', 'común', 'individual', 'GLP'],
      bloques: [
        {
          titulo: 'La instalación receptora',
          tipo: 'texto',
          texto:
            'Es el conjunto de tuberías y accesorios entre la llave de acometida, que queda fuera, y las llaves de conexión de los aparatos, que sí entran. Los tramos de conexión y los aparatos no forman parte de ella.',
          cita: 'Reglamento, art. 2.1.h)',
          url: BOE,
        },
        {
          titulo: 'Las tres piezas habituales',
          tipo: 'lista',
          texto: 'En el caso más general se compone de:',
          items: [
            'Acometida interior: desde la llave de acometida hasta la llave del edificio.',
            'Instalación común: desde la llave del edificio hasta las llaves de usuario.',
            'Instalación individual: desde la llave de usuario hasta los aparatos.',
          ],
          cita: 'Reglamento, art. 3.a), o) y p)',
          url: BOE,
        },
        {
          titulo: 'Cuando la llave del edificio no existe',
          tipo: 'texto',
          texto:
            'La instalación común empieza en la llave de acometida si no hay llave de edificio. Esa llave de inicio queda excluida del tramo; las llaves de usuario, al final, sí se incluyen.',
          cita: 'Reglamento, art. 3.o)',
          url: BOE,
        },
        {
          titulo: 'Botellas pequeñas',
          tipo: 'dato',
          texto:
            'Si el gas llega de envases de carga unitaria inferior a 15 kg, la instalación receptora empieza en el regulador acoplado a la botella, incluido, y llega hasta las llaves de conexión de los aparatos.',
          cita: 'Reglamento, art. 2.1.h)',
          url: BOE,
        },
        {
          titulo: 'Una excepción que conviene recordar',
          tipo: 'aviso',
          texto:
            'Un solo envase de menos de 15 kg unido a un único aparato móvil no se considera instalación receptora.',
          cita: 'Reglamento, art. 2.1.h)',
          url: BOE,
        },
      ],
    },
    {
      id: 'puesta-servicio',
      titulo: 'De la obra al primer gas',
      icono: '🔧',
      resumen:
        'Documentación, pruebas, certificados y personas que intervienen antes de dar gas.',
      duracion: '10 min',
      palabrasClave: ['puesta en servicio', 'certificado', 'estanquidad', 'contrato', '30 días'],
      bloques: [
        {
          titulo: 'Primero, la documentación técnica',
          tipo: 'texto',
          texto:
            'Antes de ejecutar la instalación se elabora una documentación técnica: proyecto firmado por técnico competente o memoria técnica firmada por el instalador, según indique la ITC. Quien la firma responde de que cumple la norma.',
          cita: 'Reglamento, art. 5.1',
          url: BOE,
        },
        {
          titulo: 'Las receptoras no necesitan permiso previo',
          tipo: 'dato',
          texto:
            'Las instalaciones receptoras no precisan autorización administrativa para su ejecución. La documentación y los certificados siguen siendo obligatorios.',
          cita: 'ITC-ICG 07, apartado 3.1',
          url: BOE,
        },
        {
          titulo: 'Prueba de estanquidad',
          tipo: 'paso',
          texto:
            'Al terminar, la empresa instaladora comprueba la estanquidad según la norma aplicable. El resultado favorable se hace constar en el certificado de instalación.',
          cita: 'ITC-ICG 07, apartado 3.3',
          url: BOE,
        },
        {
          titulo: 'Los certificados',
          tipo: 'lista',
          texto: 'Según el tipo de instalación se emiten varios certificados:',
          items: [
            'Certificado de instalación, por la empresa que ejecutó la obra.',
            'Certificado de dirección de obra, cuando hace falta proyecto.',
            'Certificado del organismo de control, cuando la ITC lo exige.',
            'Certificado de pruebas previas y puesta en servicio, que se entrega al titular o usuario.',
          ],
          cita: 'Reglamento, art. 5.5; ITC-ICG 07, apartados 3.4 y 3.5.1',
          url: BOE,
        },
        {
          titulo: 'Contrato y puesta en marcha del suministro',
          tipo: 'paso',
          texto:
            'En las instalaciones individuales con contrato domiciliario, el usuario formaliza primero el contrato. Después se pide al distribuidor la puesta en servicio, que revisa documentación, locales y válvulas, precinta los equipos de medida, verifica la estanquidad y extiende el certificado.',
          cita: 'ITC-ICG 07, apartado 3.5.1',
          url: BOE,
        },
        {
          titulo: 'Ojo con el plazo de comunicación',
          tipo: 'aviso',
          texto:
            'La regla general del art. 5.7 habla de presentar la documentación ante la Comunidad Autónoma antes de 30 días desde la puesta en servicio. La ITC-ICG 07 precisa que, salvo instalaciones con proyecto, no es precisa comunicación: el suministrador debe tener la documentación a disposición de la Administración.',
          cita: 'Reglamento, art. 5.7; ITC-ICG 07, apartado 3.6',
          url: BOE,
        },
      ],
    },
    {
      id: 'aparatos',
      titulo: 'Los aparatos de gas',
      icono: '🔥',
      resumen:
        'Qué documentación acompaña a un aparato, quién lo conecta y cómo se pone en marcha.',
      duracion: '9 min',
      palabrasClave: ['aparato', 'puesta en marcha', 'manual', 'placa', 'certificado'],
      bloques: [
        {
          titulo: 'Puesta en marcha no es solo encender',
          tipo: 'texto',
          texto:
            'Poner en marcha un aparato es verificar, en su ubicación definitiva, que funciona según los parámetros de seguridad del fabricante: gas y presión correctos y combustión dentro de lo previsto.',
          cita: 'Reglamento, art. 3.t); ITC-ICG 08, apartado 1',
          url: BOE,
        },
        {
          titulo: 'Documentos que deben acompañar al aparato',
          tipo: 'lista',
          texto: 'El aparato se entrega con información para el instalador y para el usuario:',
          items: [
            'Manual técnico para el instalador, con tipo de gas, presión y consumo.',
            'Manual de uso y mantenimiento para el usuario, redactado en español.',
            'Advertencias en el aparato y en el embalaje.',
            'Placa de características en lugar visible.',
          ],
          cita: 'ITC-ICG 08, apartados 2.2 y 4',
          url: BOE,
        },
        {
          titulo: 'Ventilación y ubicación',
          tipo: 'aviso',
          texto:
            'El embalaje debe advertir, entre otras cosas, si el aparato no debe instalarse en locales sin ventilación suficiente. Las instrucciones advierten de las limitaciones de uso.',
          cita: 'ITC-ICG 08, apartados 2.2.2 y 2.2.4',
          url: BOE,
        },
        {
          titulo: 'Quién conecta el aparato',
          tipo: 'texto',
          texto:
            'La conexión a la instalación receptora se hace según la norma aplicable y, en general, por un instalador. Solo puede hacerla el usuario cuando se usa un tubo flexible elastomérico con abrazadera.',
          cita: 'ITC-ICG 08, apartado 5.2',
          url: BOE,
        },
        {
          titulo: 'Certificado de puesta en marcha',
          tipo: 'dato',
          texto:
            'Quien realice la puesta en marcha debe emitir y entregar al cliente un certificado según el modelo de la ITC. Archiva la documentación al menos cinco años a disposición de la autoridad.',
          cita: 'ITC-ICG 08, apartado 5.4',
          url: BOE,
        },
      ],
    },
    {
      id: 'inspeccion',
      titulo: 'Inspección y revisión periódicas',
      icono: '🔍',
      resumen:
        'Cada cuánto se revisan las instalaciones, quién lo hace y qué pasa si hay anomalías.',
      duracion: '10 min',
      palabrasClave: ['inspección', 'revisión', 'cinco años', 'anomalía', 'coste'],
      bloques: [
        {
          titulo: 'Dos nombres según el caso',
          tipo: 'texto',
          texto:
            'El control periódico de instalaciones receptoras alimentadas desde redes se llama inspección periódica. También se usa ese nombre cuando debe hacerlo un organismo de control. En los demás casos se llama revisión periódica.',
          cita: 'Reglamento, art. 7.2',
          url: BOE,
        },
        {
          titulo: 'Cada cinco años',
          tipo: 'dato',
          texto:
            'Las instalaciones receptoras alimentadas desde redes se inspeccionan cada cinco años, dentro del año natural de vencimiento contado desde la puesta en servicio o desde la última inspección. La parte común también se inspecciona cada cinco años.',
          cita: 'ITC-ICG 07, apartado 4.1',
          url: BOE,
        },
        {
          titulo: 'Quién puede hacerla',
          tipo: 'lista',
          texto: 'La inspección de receptoras desde red corresponde a:',
          items: [
            'Empresas instaladoras de gas habilitadas.',
            'Distribuidores, con personal propio o contratado con la habilitación debida.',
            'El titular o usuario elige libremente la empresa, también para las adecuaciones derivadas.',
          ],
          cita: 'Reglamento, art. 7.2; ITC-ICG 07, apartado 4.1.1',
          url: BOE,
        },
        {
          titulo: 'Avisos y visitas',
          tipo: 'paso',
          texto:
            'El distribuidor avisa con tres meses de antelación de la obligación de inspeccionar. Si es él quien visita, avisa la fecha con al menos cinco días. Si no llega el certificado en plazo, se entiende que el usuario quiere que lo haga el distribuidor.',
          cita: 'ITC-ICG 07, apartado 4.1.1.a), d.1) y d.2)',
          url: BOE,
        },
        {
          titulo: 'Si aparece una anomalía',
          tipo: 'aviso',
          texto:
            'Todas las fugas son anomalía principal: si no se corrigen en el momento, se interrumpe el suministro y se precinta la parte afectada. La empresa que inspecciona no puede reparar ella misma la anomalía. Las faltas de estanquidad consideradas secundarias tienen quince días hábiles para corregirse.',
          cita: 'ITC-ICG 07, apartado 4.1.1.c.2), f) y h)',
          url: BOE,
        },
        {
          titulo: '¿Y si no hay red?',
          tipo: 'texto',
          texto:
            'En instalaciones no alimentadas desde redes de distribución, el titular encarga una revisión cada cinco años a una empresa instaladora. El resultado favorable se entrega como certificado de revisión periódica.',
          cita: 'ITC-ICG 07, apartado 4.2',
          url: BOE,
        },
      ],
    },
    {
      id: 'seguridad',
      titulo: 'Seguridad en el uso diario',
      icono: '🛡️',
      resumen:
        'Responsabilidades del titular, ventilación, anomalías y qué ocurre tras un accidente.',
      duracion: '8 min',
      palabrasClave: ['mantenimiento', 'ventilación', 'fuga', 'accidente', 'titular'],
      bloques: [
        {
          titulo: 'La responsabilidad es del titular',
          tipo: 'texto',
          texto:
            'El titular, o en su defecto el usuario, debe mantener y usar bien la instalación y los aparatos para que estén siempre en disposición de servicio con el nivel de seguridad adecuado.',
          cita: 'Reglamento, art. 7.1; ITC-ICG 07, apartado 4',
          url: BOE,
        },
        {
          titulo: 'Atender las recomendaciones',
          tipo: 'lista',
          texto: 'Hay que hacer caso de las indicaciones de seguridad que lleguen de:',
          items: [
            'Suministrador y distribuidor.',
            'Empresa instaladora.',
            'Fabricante del aparato, a través de su libro de instrucciones.',
          ],
          cita: 'Reglamento, art. 7.1',
          url: BOE,
        },
        {
          titulo: 'Aire y evacuación de humos',
          tipo: 'texto',
          texto:
            'En la inspección se comprueban la ventilación, el volumen mínimo del local y la correcta evacuación de los productos de la combustión. Con carácter general, esa evacuación se hace por cubierta, con excepciones previstas para determinados aparatos.',
          cita: 'ITC-ICG 07, apartados 2 y 4.1',
          url: BOE,
        },
        {
          titulo: 'Anomalía principal: actuar sin esperar',
          tipo: 'aviso',
          texto:
            'Una fuga es anomalía principal. Si no puede corregirse en el acto, se corta el gas y se precinta la instalación o el aparato. La corrección la hace un instalador habilitado o el servicio técnico que corresponda y se entrega un justificante.',
          cita: 'ITC-ICG 07, apartado 4.1.1.f) y h)',
          url: BOE,
        },
        {
          titulo: 'Tras un accidente',
          tipo: 'dato',
          texto:
            'Si hay daños importantes o víctimas, el suministrador debe notificarlo al órgano de la Comunidad Autónoma lo antes posible y en un plazo máximo de 24 horas, y enviar después un informe en un plazo máximo de siete días.',
          cita: 'Reglamento, art. 14',
          url: BOE,
        },
        {
          titulo: 'La Administración también puede revisar',
          tipo: 'texto',
          texto:
            'El órgano competente de la Comunidad Autónoma puede comprobar en cualquier momento el cumplimiento de las reglas de seguridad, de oficio o a petición de parte, o ante un riesgo significativo.',
          cita: 'Reglamento, art. 7.3',
          url: BOE,
        },
      ],
    },
    {
      id: 'instaladores',
      titulo: 'Instaladores y empresas',
      icono: '🪪',
      resumen:
        'Categorías A, B y C, declaración responsable y obligaciones de la empresa instaladora.',
      duracion: '9 min',
      palabrasClave: ['instalador', 'categoría', 'declaración responsable', 'empresa', 'seguro'],
      bloques: [
        {
          titulo: 'Tres categorías',
          tipo: 'lista',
          texto:
            'La ITC-ICG 09 establece tres categorías de instalador de gas, con operaciones distintas:',
          items: [
            'Categoría A: todas las operaciones previstas.',
            'Categoría B: instalaciones receptoras de hasta 5 bar, sin acometidas interiores enterradas, y aparatos según potencia.',
            'Categoría C: solo instalaciones individuales sin proyecto, hasta 0,4 bar y dentro de viviendas.',
          ],
          cita: 'ITC-ICG 09, apartado 2.2',
          url: BOE,
        },
        {
          titulo: 'Dentro de una empresa habilitada',
          tipo: 'texto',
          texto:
            'El instalador desarrolla su actividad en el seno de una empresa instaladora de gas habilitada y debe poder acreditar su cualificación ante la Administración.',
          cita: 'ITC-ICG 09, apartado 2',
          url: BOE,
        },
        {
          titulo: 'Cómo se acredita la cualificación',
          tipo: 'lista',
          texto: 'Sirven, entre otras, estas vías:',
          items: [
            'Título universitario adecuado.',
            'Título de formación profesional o certificado de profesionalidad.',
            'Examen teórico-práctico ante la Comunidad Autónoma.',
            'Competencia reconocida por experiencia laboral o cualificación de otro Estado miembro.',
            'Certificación de entidad acreditada para certificar personas.',
          ],
          cita: 'ITC-ICG 09, apartado 2',
          url: BOE,
        },
        {
          titulo: 'La declaración responsable',
          tipo: 'paso',
          texto:
            'Antes de empezar, la empresa presenta una declaración responsable ante el órgano de la Comunidad Autónoma donde se establezca: declara la categoría, los requisitos que cumple y su compromiso de mantenerlos. No hay que adjuntar la documentación, pero sí tenerla disponible.',
          cita: 'ITC-ICG 09, apartados 3.1 y 3.3',
          url: BOE,
        },
        {
          titulo: 'Seguro y garantía',
          tipo: 'dato',
          texto:
            'La empresa debe tener un seguro de responsabilidad civil profesional u otra garantía equivalente. La ITC fija importes mínimos por siniestro según la categoría y exige también personal y medios técnicos suficientes.',
          cita: 'ITC-ICG 09, apartado 3.8',
          url: BOE,
        },
        {
          titulo: 'Certificados y garantía de los trabajos',
          tipo: 'aviso',
          texto:
            'La empresa no puede ceder certificados de instalaciones que no haya hecho ella misma. Debe garantizar durante cuatro años las deficiencias por mala ejecución y mantener un registro de certificados e informes de anomalías.',
          cita: 'ITC-ICG 09, apartados 3.9 y 3.12',
          url: BOE,
        },
      ],
    },
    {
      id: 'glp-vivienda',
      titulo: 'Botellas de GLP en vivienda',
      icono: '🛢️',
      resumen:
        'Colocación, ventilación, regulador y cambios de botella con gases licuados del petróleo.',
      duracion: '9 min',
      palabrasClave: ['GLP', 'botella', 'regulador', 'armario', 'ventilación'],
      bloques: [
        {
          titulo: 'Cuándo se aplica esta ITC',
          tipo: 'texto',
          texto:
            'La ITC-ICG 06 regula instalaciones de almacenamiento para uso propio con envases de carga unitaria superior a 3 kg que alimentan instalaciones receptoras.',
          cita: 'ITC-ICG 06, apartado 1',
          url: BOE,
        },
        {
          titulo: 'Botellas de hasta 15 kg',
          tipo: 'lista',
          texto: 'Cuando cada envase no supera 15 kg, la norma exige, entre otras cosas:',
          items: [
            'Que la suma de capacidad de todos los envases, llenos y vacíos, no supere 300 kg.',
            'Que la ejecución la haga una empresa instaladora de gas.',
            'Que no se coloquen en sótanos, semisótanos, cajas de escalera ni pasillos sin autorización de la Comunidad Autónoma.',
            'Que, si están fuera y los aparatos dentro, haya una llave general de corte fácilmente accesible en la vivienda.',
            'Que no haya más de dos envases conectados dentro de la vivienda.',
          ],
          cita: 'ITC-ICG 06, apartado 2.1',
          url: BOE,
        },
        {
          titulo: 'Siempre en pie y bien ventilados',
          tipo: 'texto',
          texto:
            'Los envases con válvula de seguridad se colocan en posición vertical, llenos y vacíos. El armario debe tener aberturas permanentes de ventilación en la base: la superficie libre debe superar 1/100 de la pared o fondo del armario, y ningún envase debe taparlas.',
          cita: 'ITC-ICG 06, apartado 2.1',
          url: BOE,
        },
        {
          titulo: 'El regulador es obligatorio',
          tipo: 'aviso',
          texto:
            'No se pueden conectar envases y aparatos sin intercalar un regulador, salvo que los aparatos estén aprobados para funcionar a presión directa; en ese caso la canalización debe ser rígida.',
          cita: 'ITC-ICG 06, apartado 2.1',
          url: BOE,
        },
        {
          titulo: 'La botella de reserva',
          tipo: 'texto',
          texto:
            'Dentro de la vivienda, si la botella de reserva no está unida a la de servicio con tubería flexible, debe ir en un cuarto independiente, alejado de fuentes de calor y con ventilación adecuada.',
          cita: 'ITC-ICG 06, apartado 2.1',
          url: BOE,
        },
        {
          titulo: 'Al cambiar la botella',
          tipo: 'paso',
          texto:
            'Durante el cambio no se enciende ni se mantiene encendido ningún fuego, no se accionan interruptores eléctricos y no funcionan motores. La revisión de la instalación de envases se encarga junto con la revisión periódica de la instalación receptora que alimenta.',
          cita: 'ITC-ICG 06, apartados 2.2.4 y 4',
          url: BOE,
        },
      ],
    },
  ],
  preguntas: [
    {
      id: 'q-001',
      moduloId: 'que-es',
      enunciado: '¿Cuál es la finalidad principal del Reglamento de gas?',
      opciones: [
        {
          texto: 'Preservar la seguridad de las personas y de los bienes',
          correcta: true,
          explicacion: 'El art. 1 lo dice expresamente al describir el objeto del reglamento.',
        },
        {
          texto: 'Fijar el precio del gas natural en los hogares',
          correcta: false,
          explicacion: 'Los precios no son materia de este reglamento técnico de seguridad.',
        },
        {
          texto: 'Decidir qué comercializador vende más gas',
          correcta: false,
          explicacion: 'El reglamento no reparte cuotas de mercado; fija condiciones técnicas.',
        },
        {
          texto: 'Sustituir a las normas de la Unión Europea',
          correcta: false,
          explicacion: 'El reglamento se enmarca en las leyes estatales y no sustituye al derecho de la UE.',
        },
      ],
      pista: 'Piensa en las palabras seguridad y bienes.',
      cita: 'Reglamento, art. 1',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-002',
      moduloId: 'que-es',
      enunciado: '¿Cómo se organiza el Reglamento de gas?',
      opciones: [
        {
          texto: 'Con unas reglas generales y unas ITC para cada tipo de instalación',
          correcta: true,
          explicacion: 'El art. 1 distingue las prescripciones generales de las específicas de cada ITC.',
        },
        {
          texto: 'Con una única norma sin desarrollos posteriores',
          correcta: false,
          explicacion: 'Existen las instrucciones técnicas complementarias ICG 01 a 11.',
        },
        {
          texto: 'Solo con normas de la Comunidad Autónoma',
          correcta: false,
          explicacion: 'El reglamento es estatal y se desarrolla mediante ITC.',
        },
        {
          texto: 'Solo con instrucciones para estaciones de servicio',
          correcta: false,
          explicacion: 'Las ITC cubren muchos tipos de instalaciones, no solo estaciones de servicio.',
        },
      ],
      cita: 'Reglamento, art. 1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-003',
      moduloId: 'que-es',
      enunciado: '¿Cumplir este reglamento exime de todas las demás normas?',
      opciones: [
        {
          texto: 'Sí, siempre que la instalación sea nueva',
          correcta: false,
          explicacion: 'El art. 1 dice que no exime de otras disposiciones sobre materias distintas.',
        },
        {
          texto: 'No, porque pueden aplicarse otras disposiciones sobre materias distintas',
          correcta: true,
          explicacion: 'Es la propia advertencia del art. 1: la observancia no exime del cumplimiento de otras normas.',
        },
        {
          texto: 'Sí, pero solo en viviendas',
          correcta: false,
          explicacion: 'El texto no establece esa excepción para viviendas.',
        },
        {
          texto: 'No, salvo que intervenga un organismo de control',
          correcta: false,
          explicacion: 'La intervención de un organismo de control no cambia esta regla general.',
        },
      ],
      pista: 'Busca la frase no exime del cumplimiento de otras disposiciones.',
      cita: 'Reglamento, art. 1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-004',
      moduloId: 'que-es',
      enunciado: '¿Se aplica el reglamento a una instalación antigua que se va a ampliar?',
      opciones: [
        {
          texto: 'No, solo a las instalaciones nuevas',
          correcta: false,
          explicacion: 'El art. 2.2 incluye expresamente las modificaciones y ampliaciones.',
        },
        {
          texto: 'Sí, porque las ampliaciones están incluidas en el campo de aplicación',
          correcta: true,
          explicacion: 'El art. 2.2 se refiere a instalaciones existentes objeto de modificación o ampliación.',
        },
        {
          texto: 'Solo si la ampliación supera 70 kW',
          correcta: false,
          explicacion: 'El campo de aplicación no condiciona la ampliación a esa potencia.',
        },
        {
          texto: 'Solo si lo pide el vecino',
          correcta: false,
          explicacion: 'La solicitud de un vecino no es el criterio del reglamento.',
        },
      ],
      cita: 'Reglamento, art. 2.2',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-005',
      moduloId: 'que-es',
      enunciado: '¿Qué ocurre con las instalaciones existentes que no se modifican?',
      opciones: [
        {
          texto: 'Quedan fuera de cualquier control',
          correcta: false,
          explicacion: 'El art. 2.2 las somete al régimen de controles periódicos del reglamento.',
        },
        {
          texto: 'Deben reconstruirse por completo',
          correcta: false,
          explicacion: 'El reglamento no exige reconstruirlas sin una modificación.',
        },
        {
          texto: 'Se rigen por los criterios técnicos de la ITC o, en su defecto, por la normativa con que se construyeron',
          correcta: true,
          explicacion: 'El art. 2.2 remite a la ITC correspondiente o a la reglamentación de origen para los criterios técnicos.',
        },
        {
          texto: 'Deben cambiar de suministrador',
          correcta: false,
          explicacion: 'El cambio de suministrador no es una exigencia del reglamento.',
        },
      ],
      pista: 'El art. 2.2 distingue periodicidad y agentes de criterios técnicos.',
      cita: 'Reglamento, art. 2.2',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-006',
      moduloId: 'que-es',
      enunciado: 'Si no hay una directiva aplicable, ¿qué deben llevar los materiales y aparatos?',
      opciones: [
        {
          texto: 'Indicaciones visibles e indelebles: fabricante, marca y modelo, entre otras',
          correcta: true,
          explicacion: 'El art. 4.2.b) enumera esas indicaciones mínimas.',
        },
        {
          texto: 'Solo el precio de venta',
          correcta: false,
          explicacion: 'El precio no es una indicación técnica exigida por el art. 4.',
        },
        {
          texto: 'Solo el nombre del instalador que los compra',
          correcta: false,
          explicacion: 'Se exige identificación del fabricante, representante o responsable de comercialización.',
        },
        {
          texto: 'Ninguna marca, para evitar confusiones',
          correcta: false,
          explicacion: 'El art. 4.2.b) exige marca y modelo visibles e indelebles.',
        },
      ],
      cita: 'Reglamento, art. 4.2',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-007',
      moduloId: 'que-es',
      enunciado: '¿En qué idioma deben estar al menos las instrucciones?',
      opciones: [
        {
          texto: 'Solo en el idioma del fabricante',
          correcta: false,
          explicacion: 'El art. 4.2.c) exige que estén redactadas al menos en castellano.',
        },
        {
          texto: 'En castellano',
          correcta: true,
          explicacion: 'Es lo que dispone el art. 4.2.c) para materiales, equipos y aparatos.',
        },
        {
          texto: 'Solo en inglés',
          correcta: false,
          explicacion: 'El inglés no sustituye al castellano en esta exigencia.',
        },
        {
          texto: 'En cualquier idioma, sin requisitos',
          correcta: false,
          explicacion: 'Sí hay un requisito: al menos castellano.',
        },
      ],
      pista: 'Es el idioma oficial del Estado en el que se aplica el reglamento.',
      cita: 'Reglamento, art. 4.2.c)',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-008',
      moduloId: 'que-es',
      enunciado: '¿Cómo se pide una excepción a una prescripción del reglamento?',
      opciones: [
        {
          texto: 'Basta con avisar al suministrador al final de la obra',
          correcta: false,
          explicacion: 'El art. 10 exige una solicitud previa al procedimiento del art. 5.',
        },
        {
          texto: 'Con una solicitud al órgano de la Comunidad Autónoma, firmada por técnico competente, con motivos y medidas compensatorias',
          correcta: true,
          explicacion: 'Es el procedimiento descrito en el art. 10, siempre antes de empezar.',
        },
        {
          texto: 'Con un correo al fabricante del aparato',
          correcta: false,
          explicacion: 'El fabricante no es la autoridad que concede excepciones.',
        },
        {
          texto: 'No se pueden pedir excepciones en ningún caso',
          correcta: false,
          explicacion: 'El art. 10 las prevé cuando sea materialmente imposible cumplir la prescripción.',
        },
      ],
      pista: 'Piensa en el órgano competente de la Comunidad Autónoma.',
      cita: 'Reglamento, art. 10',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-009',
      moduloId: 'que-es',
      enunciado: 'Tras un accidente con víctimas, ¿quién debe notificarlo y en cuánto tiempo?',
      opciones: [
        {
          texto: 'El vecino, en 48 horas',
          correcta: false,
          explicacion: 'El art. 14 atribuye la notificación al suministrador.',
        },
        {
          texto: 'La empresa instaladora, en 7 días',
          correcta: false,
          explicacion: 'Los siete días son para el informe posterior, no para la notificación.',
        },
        {
          texto: 'El suministrador, lo antes posible y en un máximo de 24 horas',
          correcta: true,
          explicacion: 'El art. 14 fija ese plazo para daños importantes o víctimas.',
        },
        {
          texto: 'La Comunidad Autónoma, en 24 horas',
          correcta: false,
          explicacion: 'La Comunidad Autónoma es el destinatario de la notificación.',
        },
      ],
      cita: 'Reglamento, art. 14',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-010',
      moduloId: 'recorrido',
      enunciado: '¿Dónde empieza y acaba una instalación receptora alimentada desde red?',
      opciones: [
        {
          texto: 'Desde la llave de acometida, excluida, hasta las llaves de conexión de aparato, incluidas',
          correcta: true,
          explicacion: 'Es la definición del art. 2.1.h).',
        },
        {
          texto: 'Desde el contador hasta el consumo',
          correcta: false,
          explicacion: 'El reglamento usa las llaves como límites, no el contador.',
        },
        {
          texto: 'Desde la llave de acometida, incluida, hasta el aparato, excluido',
          correcta: false,
          explicacion: 'Es justo al revés: la llave de acometida queda fuera y las de aparato entran.',
        },
        {
          texto: 'Desde la calle hasta el tejado',
          correcta: false,
          explicacion: 'La red está fuera de la instalación receptora.',
        },
      ],
      pista: 'Fíjate en qué llave se excluye y cuáles se incluyen.',
      cita: 'Reglamento, art. 2.1.h)',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-011',
      moduloId: 'recorrido',
      enunciado: 'En una instalación con botellas de menos de 15 kg, ¿dónde empieza la instalación receptora?',
      opciones: [
        {
          texto: 'En la llave de acometida',
          correcta: false,
          explicacion: 'No hay acometida de red en ese caso.',
        },
        {
          texto: 'En el regulador o reguladores acoplados a los envases, incluidos',
          correcta: true,
          explicacion: 'El art. 2.1.h) fija ese origen para envases de carga unitaria inferior a 15 kg.',
        },
        {
          texto: 'En la llave del edificio',
          correcta: false,
          explicacion: 'La llave de edificio se usa en instalaciones con acometida interior.',
        },
        {
          texto: 'En el quemador del aparato',
          correcta: false,
          explicacion: 'El aparato y su tramo de conexión quedan fuera de la instalación receptora.',
        },
      ],
      pista: 'Busca la palabra regulador en la definición del art. 2.',
      cita: 'Reglamento, art. 2.1.h)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-012',
      moduloId: 'recorrido',
      enunciado: '¿Cuál de estos casos NO es instalación receptora?',
      opciones: [
        {
          texto: 'Una botella única de menos de 15 kg unida a un solo aparato móvil',
          correcta: true,
          explicacion: 'El art. 2.1.h) lo excluye expresamente.',
        },
        {
          texto: 'Una instalación individual de una vivienda',
          correcta: false,
          explicacion: 'La instalación individual es una de las partes de la receptora.',
        },
        {
          texto: 'Una instalación común de un edificio',
          correcta: false,
          explicacion: 'La instalación común forma parte de la instalación receptora.',
        },
        {
          texto: 'Una instalación alimentada por botellas con regulador',
          correcta: false,
          explicacion: 'Sí se considera receptora según el art. 2.1.h).',
        },
      ],
      pista: 'Recuerda la excepción de envase pequeño y aparato móvil.',
      cita: 'Reglamento, art. 2.1.h)',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-013',
      moduloId: 'recorrido',
      enunciado: '¿Qué es la acometida interior?',
      opciones: [
        {
          texto: 'La parte común del edificio',
          correcta: false,
          explicacion: 'La parte común empieza en la llave del edificio, no en la de acometida.',
        },
        {
          texto: 'El tramo entre la llave de acometida, excluida, y la llave o llaves del edificio, incluidas',
          correcta: true,
          explicacion: 'Es la definición del art. 3.a).',
        },
        {
          texto: 'El tubo flexible que une la botella al aparato',
          correcta: false,
          explicacion: 'Ese tramo no es la acometida interior.',
        },
        {
          texto: 'La instalación dentro de cada vivienda',
          correcta: false,
          explicacion: 'Dentro de cada vivienda hablamos de instalación individual.',
        },
      ],
      cita: 'Reglamento, art. 3.a)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-014',
      moduloId: 'recorrido',
      enunciado: '¿Dónde termina la instalación común?',
      opciones: [
        {
          texto: 'En las llaves de usuario, incluidas',
          correcta: true,
          explicacion: 'El art. 3.o) incluye las llaves de usuario como límite final.',
        },
        {
          texto: 'En los aparatos de cada vivienda',
          correcta: false,
          explicacion: 'Los aparatos pertenecen a la instalación individual, no a la común.',
        },
        {
          texto: 'En la llave de acometida, incluida',
          correcta: false,
          explicacion: 'La llave de inicio se excluye; no es el final.',
        },
        {
          texto: 'En el tejado del edificio',
          correcta: false,
          explicacion: 'El tejado no es un límite de la instalación común.',
        },
      ],
      pista: 'El nombre de la llave del final coincide con quien usa el gas.',
      cita: 'Reglamento, art. 3.o)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-015',
      moduloId: 'recorrido',
      enunciado: 'Si hay instalación común, ¿por dónde empieza la instalación individual?',
      opciones: [
        {
          texto: 'Por la llave de acometida',
          correcta: false,
          explicacion: 'Esa llave pertenece al inicio del conjunto, no al de la individual con común.',
        },
        {
          texto: 'Por la llave de usuario, excluida',
          correcta: true,
          explicacion: 'El art. 3.p) excluye la llave de usuario e incluye las llaves de conexión de aparatos.',
        },
        {
          texto: 'Por el primer aparato de la cocina',
          correcta: false,
          explicacion: 'El aparato es el final, no el inicio.',
        },
        {
          texto: 'Por la llave del edificio, incluida',
          correcta: false,
          explicacion: 'La llave de edificio es el inicio de la instalación común.',
        },
      ],
      pista: 'La llave de inicio se excluye siempre del tramo que delimita.',
      cita: 'Reglamento, art. 3.p)',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-016',
      moduloId: 'recorrido',
      enunciado: 'Según el reglamento, ¿quién es el usuario?',
      opciones: [
        {
          texto: 'La persona o entidad que utiliza el gas para su consumo',
          correcta: true,
          explicacion: 'El art. 3.x) da esa definición.',
        },
        {
          texto: 'La empresa que transporta el gas',
          correcta: false,
          explicacion: 'Esa es la figura del transportista.',
        },
        {
          texto: 'La persona propietaria de la instalación',
          correcta: false,
          explicacion: 'Propietario o beneficiario es el titular, no necesariamente el usuario.',
        },
        {
          texto: 'El órgano que inspecciona',
          correcta: false,
          explicacion: 'El órgano competente es la Administración, no el usuario.',
        },
      ],
      pista: 'Usuario es quien consume, no quien inspecciona.',
      cita: 'Reglamento, art. 3.x)',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-017',
      moduloId: 'recorrido',
      enunciado: '¿Quién es el titular de una instalación?',
      opciones: [
        {
          texto: 'La persona física o jurídica propietaria o beneficiaria de la instalación',
          correcta: true,
          explicacion: 'Es la definición del art. 3.v).',
        },
        {
          texto: 'El instalador que la ha montado',
          correcta: false,
          explicacion: 'El instalador ejecuta; no por eso es titular.',
        },
        {
          texto: 'El fabricante del aparato',
          correcta: false,
          explicacion: 'El fabricante responde del producto, no de la titularidad de la instalación.',
        },
        {
          texto: 'El distribuidor de la zona',
          correcta: false,
          explicacion: 'El distribuidor puede inspeccionar, pero no es el titular por definición.',
        },
      ],
      pista: 'Piensa en propietario o beneficiario.',
      cita: 'Reglamento, art. 3.v)',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-018',
      moduloId: 'recorrido',
      enunciado: 'Los aparatos de gas, ¿forman parte de la instalación receptora?',
      opciones: [
        {
          texto: 'Sí, siempre',
          correcta: false,
          explicacion: 'El art. 2.1.h) los excluye junto con sus tramos de conexión.',
        },
        {
          texto: 'No, quedan excluidos, aunque sus llaves de conexión se incluyen',
          correcta: true,
          explicacion: 'La definición incluye las llaves de conexión y excluye los aparatos.',
        },
        {
          texto: 'Solo si son calderas',
          correcta: false,
          explicacion: 'La definición no hace distinción por tipo de aparato.',
        },
        {
          texto: 'Solo si funcionan con GLP',
          correcta: false,
          explicacion: 'Tampoco hay una excepción para GLP en esta definición.',
        },
      ],
      cita: 'Reglamento, art. 2.1.h)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-019',
      moduloId: 'puesta-servicio',
      enunciado: '¿Qué documentación técnica se exige antes de ejecutar una instalación?',
      opciones: [
        {
          texto: 'Un correo al suministrador',
          correcta: false,
          explicacion: 'El art. 5.1 exige proyecto o memoria técnica.',
        },
        {
          texto: 'Un proyecto o una memoria técnica, según indique la ITC',
          correcta: true,
          explicacion: 'El art. 5.1 distingue según las características de la instalación.',
        },
        {
          texto: 'Solo un croquis dibujado por el usuario',
          correcta: false,
          explicacion: 'El croquis se entrega después como instrucción de uso, no sustituye a la documentación técnica.',
        },
        {
          texto: 'No se exige documentación si no hay proyecto',
          correcta: false,
          explicacion: 'Puede exigirse memoria técnica aunque no haga falta proyecto.',
        },
      ],
      pista: 'Una la firma un técnico y otra puede firmarla el instalador.',
      cita: 'Reglamento, art. 5.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-020',
      moduloId: 'puesta-servicio',
      enunciado: '¿Necesita autorización administrativa previa la ejecución de una instalación receptora?',
      opciones: [
        {
          texto: 'Sí, siempre del Ministerio',
          correcta: false,
          explicacion: 'La ITC-ICG 07 dice que no precisan autorización administrativa para su ejecución.',
        },
        {
          texto: 'Sí, de la Comunidad Autónoma',
          correcta: false,
          explicacion: 'La regla general del art. 5.2 solo exige autorización cuando la ITC lo disponga.',
        },
        {
          texto: 'No',
          correcta: true,
          explicacion: 'El apartado 3.1 de la ITC-ICG 07 lo afirma claramente.',
        },
        {
          texto: 'Solo si hay aparatos de más de 24,4 kW',
          correcta: false,
          explicacion: 'La potencia no crea una autorización previa para la receptora.',
        },
      ],
      cita: 'ITC-ICG 07, apartado 3.1',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-021',
      moduloId: 'puesta-servicio',
      enunciado: '¿Quién realiza la prueba de estanquidad de la instalación receptora antes de entregarla?',
      opciones: [
        {
          texto: 'El vecino',
          correcta: false,
          explicacion: 'No tiene esa función en el reglamento.',
        },
        {
          texto: 'La empresa instaladora',
          correcta: true,
          explicacion: 'El apartado 3.3 de la ITC-ICG 07 se lo atribuye y exige reflejar el resultado en el certificado.',
        },
        {
          texto: 'El fabricante del aparato',
          correcta: false,
          explicacion: 'El fabricante responde del producto, no de la prueba de la instalación.',
        },
        {
          texto: 'La Comunidad Autónoma',
          correcta: false,
          explicacion: 'La Administración puede controlar, pero no hace la prueba de entrega.',
        },
      ],
      cita: 'ITC-ICG 07, apartado 3.3',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-022',
      moduloId: 'puesta-servicio',
      enunciado: '¿Quién emite el certificado de instalación?',
      opciones: [
        {
          texto: 'La empresa responsable de la ejecución',
          correcta: true,
          explicacion: 'El art. 5.5.a) se lo atribuye, con identificación de las variaciones respecto a la documentación técnica.',
        },
        {
          texto: 'El suministrador, siempre',
          correcta: false,
          explicacion: 'El suministrador interviene en el suministro, no emite el certificado de ejecución.',
        },
        {
          texto: 'El usuario',
          correcta: false,
          explicacion: 'El usuario recibe copia; no lo emite.',
        },
        {
          texto: 'El organismo de control, en lugar de la empresa',
          correcta: false,
          explicacion: 'El organismo emite su propio certificado de inspección cuando procede.',
        },
      ],
      pista: 'Piensa en quién ha hecho la obra.',
      cita: 'Reglamento, art. 5.5.a)',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-023',
      moduloId: 'puesta-servicio',
      enunciado: 'En una instalación individual con contrato domiciliario, ¿qué debe hacerse antes de pedir la puesta en servicio?',
      opciones: [
        {
          texto: 'Formalizar la póliza de abono o el contrato de suministro',
          correcta: true,
          explicacion: 'El apartado 3.5.1 de la ITC-ICG 07 lo exige de forma previa.',
        },
        {
          texto: 'Instalar los aparatos sin certificado',
          correcta: false,
          explicacion: 'Los certificados y las pruebas son obligatorios.',
        },
        {
          texto: 'Pagar un año de suministro por adelantado',
          correcta: false,
          explicacion: 'El reglamento no impone ese pago anticipado.',
        },
        {
          texto: 'Cambiar la titularidad de la vivienda',
          correcta: false,
          explicacion: 'No es una condición de la puesta en servicio.',
        },
      ],
      pista: 'El contrato es la puerta de entrada al suministro.',
      cita: 'ITC-ICG 07, apartado 3.5.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-024',
      moduloId: 'puesta-servicio',
      enunciado: '¿Cuál de estas comprobaciones NO se menciona entre las pruebas previas del distribuidor?',
      opciones: [
        {
          texto: 'Comprobar que la documentación está completa',
          correcta: false,
          explicacion: 'Es la comprobación primera de la lista del apartado 3.5.1.',
        },
        {
          texto: 'Comprobar la maniobrabilidad de las válvulas',
          correcta: false,
          explicacion: 'También aparece en la lista de pruebas previas.',
        },
        {
          texto: 'Precintar los equipos de medida',
          correcta: false,
          explicacion: 'Se menciona entre las actuaciones de puesta en servicio.',
        },
        {
          texto: 'Elegir al vecino como responsable de la instalación',
          correcta: true,
          explicacion: 'Es la opción que no aparece en la lista: el reglamento no prevé esa elección.',
        },
      ],
      pista: 'La respuesta correcta es la que no aparece en la lista.',
      cita: 'ITC-ICG 07, apartado 3.5.1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-025',
      moduloId: 'puesta-servicio',
      enunciado: 'Para pedir un suministro provisional de prueba, ¿qué se requiere?',
      opciones: [
        {
          texto: 'Que lo pida cualquier vecino sin permiso',
          correcta: false,
          explicacion: 'El art. 5.6.a) habla de la empresa instaladora con conocimiento y autorización del titular.',
        },
        {
          texto: 'El conocimiento y la autorización del titular',
          correcta: true,
          explicacion: 'Con esos requisitos, la empresa instaladora puede pedirlo al distribuidor o al suministrador.',
        },
        {
          texto: 'Una autorización del ayuntamiento',
          correcta: false,
          explicacion: 'No es el requisito indicado en el art. 5.6.a).',
        },
        {
          texto: 'Que el aparato sea nuevo',
          correcta: false,
          explicacion: 'El suministro provisional se prevé para probar instalación o aparatos.',
        },
      ],
      cita: 'Reglamento, art. 5.6.a)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-026',
      moduloId: 'puesta-servicio',
      enunciado: '¿Qué se exige para restablecer el suministro tras un contrato resuelto?',
      opciones: [
        {
          texto: 'Copia del certificado de control periódico sin anomalías y en vigor',
          correcta: true,
          explicacion: 'El art. 5.6.b) lo exige; en su defecto, o si ha estado fuera de servicio más de un año, se sigue el régimen de nuevas instalaciones.',
        },
        {
          texto: 'Solo una llamada telefónica',
          correcta: false,
          explicacion: 'Hace falta documentación, no solo una comunicación verbal.',
        },
        {
          texto: 'Un certificado de cualquier fecha',
          correcta: false,
          explicacion: 'Debe estar en vigor y sin anomalías.',
        },
        {
          texto: 'La baja del anterior titular en el registro',
          correcta: false,
          explicacion: 'No es la condición establecida en el art. 5.6.b).',
        },
      ],
      pista: 'El certificado debe estar en vigor.',
      cita: 'Reglamento, art. 5.6.b); ITC-ICG 07, apartado 3.5.1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-027',
      moduloId: 'puesta-servicio',
      enunciado: 'Según la regla general del art. 5.7, ¿antes de cuántos días debe presentarse la documentación a la Comunidad Autónoma?',
      opciones: [
        {
          texto: 'Antes de 15 días',
          correcta: false,
          explicacion: 'El art. 5.7 habla de treinta días.',
        },
        {
          texto: 'Antes de 30 días desde la puesta en servicio',
          correcta: true,
          explicacion: 'Es el plazo del art. 5.7, con el matiz posterior de la ITC-ICG 07 para receptoras sin proyecto.',
        },
        {
          texto: 'Antes de 5 años',
          correcta: false,
          explicacion: 'Cinco años es la periodicidad de las inspecciones, no este plazo.',
        },
        {
          texto: 'No hay plazo',
          correcta: false,
          explicacion: 'El art. 5.7 fija un plazo de treinta días.',
        },
      ],
      cita: 'Reglamento, art. 5.7; ITC-ICG 07, apartado 3.6',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-028',
      moduloId: 'aparatos',
      enunciado: '¿Qué significa poner en marcha un aparato de gas?',
      opciones: [
        {
          texto: 'Verificar que funciona con el gas y la presión previstos y con una combustión dentro de los parámetros del fabricante',
          correcta: true,
          explicacion: 'Es la definición del art. 3.t) y se desarrolla en la ITC-ICG 08.',
        },
        {
          texto: 'Abrir la llave del gas y comprobar que huele',
          correcta: false,
          explicacion: 'El olor no es una verificación de la combustión ni de los parámetros.',
        },
        {
          texto: 'Cambiar el aparato por otro',
          correcta: false,
          explicacion: 'Eso es una sustitución, no la puesta en marcha.',
        },
        {
          texto: 'Firmar el contrato de suministro',
          correcta: false,
          explicacion: 'El contrato es documentación del suministro, no una operación sobre el aparato.',
        },
      ],
      pista: 'Piensa en gas, presión y combustión.',
      cita: 'Reglamento, art. 3.t); ITC-ICG 08, apartado 1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-029',
      moduloId: 'aparatos',
      enunciado: '¿En qué idioma deben estar las instrucciones de uso y mantenimiento del aparato?',
      opciones: [
        {
          texto: 'En español',
          correcta: true,
          explicacion: 'El apartado 2.2 de la ITC-ICG 08 lo exige para instrucciones y advertencias.',
        },
        {
          texto: 'Solo en el idioma del país de fabricación',
          correcta: false,
          explicacion: 'La ITC exige que estén redactadas en español.',
        },
        {
          texto: 'En cualquier idioma si lo aprueba el usuario',
          correcta: false,
          explicacion: 'No hay esa posibilidad en el apartado 2.2.',
        },
        {
          texto: 'No hace falta que lleven instrucciones',
          correcta: false,
          explicacion: 'El apartado 2.2 exige manual técnico, manual de usuario y advertencias.',
        },
      ],
      cita: 'ITC-ICG 08, apartado 2.2',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-030',
      moduloId: 'aparatos',
      enunciado: '¿Qué información debe contener, entre otras cosas, el manual técnico para el instalador?',
      opciones: [
        {
          texto: 'El tipo de gas, la presión de suministro y el consumo nominal',
          correcta: true,
          explicacion: 'Son algunos de los datos que enumera el apartado 2.2.1 de la ITC-ICG 08.',
        },
        {
          texto: 'El color preferido del usuario',
          correcta: false,
          explicacion: 'No es un dato técnico exigido.',
        },
        {
          texto: 'La dirección del vecino',
          correcta: false,
          explicacion: 'Además de ajena, sería un dato personal innecesario.',
        },
        {
          texto: 'Solo la fecha de fabricación',
          correcta: false,
          explicacion: 'Se exigen muchos más datos técnicos.',
        },
      ],
      cita: 'ITC-ICG 08, apartado 2.2.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-031',
      moduloId: 'aparatos',
      enunciado: '¿Qué advertencia debe figurar en el embalaje de un aparato?',
      opciones: [
        {
          texto: 'Que no se instale en locales sin ventilación suficiente, cuando proceda',
          correcta: true,
          explicacion: 'El apartado 2.2.4 exige indicar tipo de gas, presión y restricciones de uso como esa.',
        },
        {
          texto: 'Que debe instalarse sin ventilación',
          correcta: false,
          explicacion: 'Es lo contrario de la advertencia prevista.',
        },
        {
          texto: 'Que solo lo puede comprar un instalador',
          correcta: false,
          explicacion: 'La ITC regula la comercialización, no limita la compra a instaladores.',
        },
        {
          texto: 'Que no necesita mantenimiento',
          correcta: false,
          explicacion: 'Las instrucciones deben hablar de limpieza y mantenimiento básico.',
        },
      ],
      pista: 'El embalaje advierte de las restricciones de uso.',
      cita: 'ITC-ICG 08, apartado 2.2.4',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-032',
      moduloId: 'aparatos',
      enunciado: '¿Qué debe llevar todo aparato en un lugar visible?',
      opciones: [
        {
          texto: 'Una placa de características conforme al anexo de la ITC',
          correcta: true,
          explicacion: 'El apartado 4 de la ITC-ICG 08 lo exige, junto con las instrucciones.',
        },
        {
          texto: 'Un diploma del instalador',
          correcta: false,
          explicacion: 'No es una exigencia para el aparato.',
        },
        {
          texto: 'El recibo de compra pegado',
          correcta: false,
          explicacion: 'El recibo no sustituye a la placa reglamentaria.',
        },
        {
          texto: 'Nada, si ya tiene manual',
          correcta: false,
          explicacion: 'La placa y las instrucciones son exigencias distintas.',
        },
      ],
      cita: 'ITC-ICG 08, apartado 4',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-033',
      moduloId: 'aparatos',
      enunciado: '¿Quién puede conectar un aparato a la instalación receptora?',
      opciones: [
        {
          texto: 'Cualquier persona, siempre',
          correcta: false,
          explicacion: 'La regla general exige un instalador.',
        },
        {
          texto: 'Un instalador, salvo con tubo flexible elastomérico con abrazadera, que puede hacerlo el usuario',
          correcta: true,
          explicacion: 'Es la excepción del apartado 5.2 de la ITC-ICG 08.',
        },
        {
          texto: 'Solo el fabricante, siempre',
          correcta: false,
          explicacion: 'El fabricante puede intervenir en la puesta en marcha según los casos, pero no es la regla de conexión.',
        },
        {
          texto: 'Solo el distribuidor',
          correcta: false,
          explicacion: 'El distribuidor no es quien conecta los aparatos por defecto.',
        },
      ],
      pista: 'Hay una excepción con tubo flexible y abrazadera.',
      cita: 'ITC-ICG 08, apartado 5.2',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-034',
      moduloId: 'aparatos',
      enunciado: 'En un aparato pequeño de cocina, ¿quién puede hacer su puesta en marcha y mantenimiento?',
      opciones: [
        {
          texto: 'El servicio de asistencia técnica del fabricante o una empresa instaladora',
          correcta: true,
          explicacion: 'El apartado 5.3.1.b) lo prevé para el resto de aparatos.',
        },
        {
          texto: 'Cualquier persona que haya visto un vídeo',
          correcta: false,
          explicacion: 'Se exige un agente cualificado según la ITC.',
        },
        {
          texto: 'El vecino que tenga herramientas',
          correcta: false,
          explicacion: 'No basta con tener herramientas.',
        },
        {
          texto: 'Solo un organismo de control',
          correcta: false,
          explicacion: 'El organismo de control no hace esa función ordinaria.',
        },
      ],
      cita: 'ITC-ICG 08, apartado 5.3.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-035',
      moduloId: 'aparatos',
      enunciado: '¿Qué documento se entrega tras la puesta en marcha de un aparato y cuánto tiempo se archiva?',
      opciones: [
        {
          texto: 'Un justificante verbal; no hay que archivarlo',
          correcta: false,
          explicacion: 'El apartado 5.4 exige un certificado y su archivo.',
        },
        {
          texto: 'Un certificado de puesta en marcha, archivado al menos cinco años',
          correcta: true,
          explicacion: 'Se entrega al cliente según el modelo del anexo 4 y se archiva como mínimo cinco años.',
        },
        {
          texto: 'El contrato de compra, archivado dos años',
          correcta: false,
          explicacion: 'No sustituye al certificado de puesta en marcha.',
        },
        {
          texto: 'La factura del gas, archivada cinco años',
          correcta: false,
          explicacion: 'El certificado exigido es el de puesta en marcha del aparato.',
        },
      ],
      pista: 'El plazo de archivo coincide con el de la periodicidad de las inspecciones.',
      cita: 'ITC-ICG 08, apartado 5.4',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-036',
      moduloId: 'aparatos',
      enunciado: 'Al adaptar un aparato a otra familia de gas, ¿qué componentes deben utilizarse?',
      opciones: [
        {
          texto: 'Los que tenga el almacén del instalador',
          correcta: false,
          explicacion: 'La ITC exige componentes iguales a los aprobados en la certificación de tipo.',
        },
        {
          texto: 'Componentes de características técnicas iguales a los aprobados en la certificación de tipo',
          correcta: true,
          explicacion: 'Es la exigencia del apartado 5.3.2 de la ITC-ICG 08.',
        },
        {
          texto: 'Cualquier componente, si el aparato enciende',
          correcta: false,
          explicacion: 'Encender no acredita la conformidad de la adaptación.',
        },
        {
          texto: 'Solo componentes del distribuidor',
          correcta: false,
          explicacion: 'El criterio es la aprobación en la certificación de tipo.',
        },
      ],
      cita: 'ITC-ICG 08, apartado 5.3.2',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-037',
      moduloId: 'inspeccion',
      enunciado: '¿Cómo se llama el control periódico de una instalación receptora alimentada desde una red de distribución?',
      opciones: [
        {
          texto: 'Revisión periódica',
          correcta: false,
          explicacion: 'Ese nombre se usa para los demás casos, no para receptoras desde red.',
        },
        {
          texto: 'Inspección periódica',
          correcta: true,
          explicacion: 'El art. 7.2 reserva ese nombre a las receptoras alimentadas desde redes.',
        },
        {
          texto: 'Control administrativo',
          correcta: false,
          explicacion: 'El control administrativo es la actuación de la Administración del art. 7.3.',
        },
        {
          texto: 'Puesta en servicio',
          correcta: false,
          explicacion: 'La puesta en servicio es el momento inicial, no un control periódico.',
        },
      ],
      pista: 'Empieza por la misma letra que inspeccionar.',
      cita: 'Reglamento, art. 7.2',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-038',
      moduloId: 'inspeccion',
      enunciado: '¿Cuándo se denomina revisión periódica un control?',
      opciones: [
        {
          texto: 'Cuando el control periódico no es de los casos que el reglamento llama inspección',
          correcta: true,
          explicacion: 'El art. 7.2 dice que en cualquier otro caso se denomina revisión periódica.',
        },
        {
          texto: 'Cuando lo hace un organismo de control',
          correcta: false,
          explicacion: 'En ese caso se denomina inspección periódica.',
        },
        {
          texto: 'Cuando se hace en una red de distribución',
          correcta: false,
          explicacion: 'Entonces es inspección periódica.',
        },
        {
          texto: 'Cuando no hay titular',
          correcta: false,
          explicacion: 'La denominación no depende de la existencia del titular.',
        },
      ],
      cita: 'Reglamento, art. 7.2',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-039',
      moduloId: 'inspeccion',
      enunciado: '¿Cada cuánto tiempo se inspeccionan las instalaciones receptoras alimentadas desde redes?',
      opciones: [
        {
          texto: 'Cada año',
          correcta: false,
          explicacion: 'El apartado 4.1 de la ITC-ICG 07 fija cinco años.',
        },
        {
          texto: 'Cada cinco años',
          correcta: true,
          explicacion: 'Dentro del año natural de vencimiento desde la puesta en servicio o la última inspección.',
        },
        {
          texto: 'Cada diez años',
          correcta: false,
          explicacion: 'Diez años es el plazo de conservación de datos del distribuidor.',
        },
        {
          texto: 'Solo cuando hay fuga',
          correcta: false,
          explicacion: 'Las fugas exigen actuación inmediata, pero no sustituyen la periodicidad.',
        },
      ],
      pista: 'La misma cifra aparece para la parte común.',
      cita: 'ITC-ICG 07, apartado 4.1',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-040',
      moduloId: 'inspeccion',
      enunciado: '¿Quiénes pueden efectuar la inspección periódica de receptoras alimentadas desde red?',
      opciones: [
        {
          texto: 'Empresas instaladoras habilitadas o distribuidores',
          correcta: true,
          explicacion: 'Lo establecen el art. 7.2 y el apartado 4.1 de la ITC-ICG 07.',
        },
        {
          texto: 'Cualquier vecino',
          correcta: false,
          explicacion: 'Se exige habilitación o condición de distribuidor.',
        },
        {
          texto: 'Solo el fabricante del aparato',
          correcta: false,
          explicacion: 'El fabricante no figura entre los agentes de la inspección de receptoras.',
        },
        {
          texto: 'Solo la Comunidad Autónoma',
          correcta: false,
          explicacion: 'La Administración puede controlar, pero no es el agente ordinario de estas inspecciones.',
        },
      ],
      cita: 'Reglamento, art. 7.2; ITC-ICG 07, apartado 4.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-041',
      moduloId: 'inspeccion',
      enunciado: '¿Con cuánta antelación comunica el distribuidor la obligación de inspeccionar?',
      opciones: [
        {
          texto: 'Con cinco días',
          correcta: false,
          explicacion: 'Cinco días es el aviso de la fecha de visita cuando acude el distribuidor.',
        },
        {
          texto: 'Con tres meses',
          correcta: true,
          explicacion: 'El apartado 4.1.1.a) de la ITC-ICG 07 fija tres meses.',
        },
        {
          texto: 'Con quince días',
          correcta: false,
          explicacion: 'Quince días hábiles es el plazo para corregir estanquidad secundaria.',
        },
        {
          texto: 'No hay obligación de avisar',
          correcta: false,
          explicacion: 'Sí hay obligación de comunicación previa.',
        },
      ],
      pista: 'No confundas el aviso de la obligación con el aviso de la visita.',
      cita: 'ITC-ICG 07, apartado 4.1.1.a)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-042',
      moduloId: 'inspeccion',
      enunciado: 'Si el distribuidor va a realizar la visita de inspección, ¿con cuántos días de antelación avisa la fecha?',
      opciones: [
        {
          texto: 'Con tres meses',
          correcta: false,
          explicacion: 'Tres meses es el aviso general de la obligación.',
        },
        {
          texto: 'Con al menos cinco días',
          correcta: true,
          explicacion: 'El apartado 4.1.1.d.1) exige una antelación mínima de cinco días.',
        },
        {
          texto: 'Con un día',
          correcta: false,
          explicacion: 'No llega al mínimo exigido.',
        },
        {
          texto: 'Con un año',
          correcta: false,
          explicacion: 'No es el plazo previsto.',
        },
      ],
      cita: 'ITC-ICG 07, apartado 4.1.1.d.1)',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-043',
      moduloId: 'inspeccion',
      enunciado: 'En una instalación de hasta 70 kW alimentada desde red, ¿qué tramo comprende la inspección?',
      opciones: [
        {
          texto: 'Desde la llave de usuario hasta los aparatos, incluidos estos',
          correcta: true,
          explicacion: 'El apartado 4.1 de la ITC-ICG 07 lo indica para instalaciones de hasta 70 kW.',
        },
        {
          texto: 'Desde la llave de acometida hasta los aparatos, excluidos',
          correcta: false,
          explicacion: 'Ese tramo se usa, por regla general, con presión superior a 5 bar.',
        },
        {
          texto: 'Solo el aparato de la cocina',
          correcta: false,
          explicacion: 'La inspección comprende un tramo de la instalación, no un solo aparato.',
        },
        {
          texto: 'Solo la acometida interior enterrada',
          correcta: false,
          explicacion: 'No es el alcance general en instalaciones de hasta 70 kW.',
        },
      ],
      pista: 'En potencias pequeñas se llega hasta los aparatos, incluidos.',
      cita: 'ITC-ICG 07, apartado 4.1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-044',
      moduloId: 'inspeccion',
      enunciado: '¿Cómo se considera una fuga detectada en una instalación de gas?',
      opciones: [
        {
          texto: 'Como una anomalía secundaria sin prisa',
          correcta: false,
          explicacion: 'El apartado 4.1.1.f) dice que todas las fugas son anomalía principal.',
        },
        {
          texto: 'Como una anomalía principal',
          correcta: true,
          explicacion: 'Si no se corrige en el momento, se interrumpe el suministro y se precinta la parte afectada.',
        },
        {
          texto: 'Como un dato estadístico sin consecuencias',
          correcta: false,
          explicacion: 'Las fugas exigen corrección y pueden dar lugar a corte y precinto.',
        },
        {
          texto: 'Como una obligación del fabricante',
          correcta: false,
          explicacion: 'La responsabilidad de corregirla es del titular o usuario, con instalador habilitado.',
        },
      ],
      cita: 'ITC-ICG 07, apartado 4.1.1.f) y h)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-045',
      moduloId: 'inspeccion',
      enunciado: '¿Qué plazo se da para corregir faltas de estanquidad consideradas anomalías secundarias?',
      opciones: [
        {
          texto: 'Quince días hábiles',
          correcta: true,
          explicacion: 'El apartado 4.1.1.f) de la ITC-ICG 07 fija ese plazo.',
        },
        {
          texto: 'Cinco días naturales',
          correcta: false,
          explicacion: 'Cinco días es el aviso de visita del distribuidor.',
        },
        {
          texto: 'Cuatro años',
          correcta: false,
          explicacion: 'Cuatro años es la garantía de las empresas instaladoras.',
        },
        {
          texto: 'No hay plazo',
          correcta: false,
          explicacion: 'Sí hay un plazo concreto para las anomalías secundarias de estanquidad.',
        },
      ],
      pista: 'Es un plazo de días hábiles, no de meses.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f)',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-046',
      moduloId: 'seguridad',
      enunciado: '¿Quién es responsable del mantenimiento y buen uso de la instalación y los aparatos?',
      opciones: [
        {
          texto: 'El titular o, en su defecto, los usuarios',
          correcta: true,
          explicacion: 'El art. 7.1 establece esa obligación con el nivel de seguridad adecuado.',
        },
        {
          texto: 'El vecino más cercano',
          correcta: false,
          explicacion: 'No es una figura del reglamento.',
        },
        {
          texto: 'Solo la empresa instaladora',
          correcta: false,
          explicacion: 'La empresa ejecuta y certifica, pero el deber de mantenimiento es del titular o usuario.',
        },
        {
          texto: 'Solo el fabricante',
          correcta: false,
          explicacion: 'El fabricante da instrucciones, no asume el uso cotidiano.',
        },
      ],
      pista: 'Piensa en la persona propietaria o beneficiaria.',
      cita: 'Reglamento, art. 7.1',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-047',
      moduloId: 'seguridad',
      enunciado: '¿De quiénes deben atenderse las recomendaciones de seguridad?',
      opciones: [
        {
          texto: 'Del suministrador, distribuidor, empresa instaladora y fabricante',
          correcta: true,
          explicacion: 'El art. 7.1 los enumera, incluido el libro de instrucciones del aparato.',
        },
        {
          texto: 'Solo del fabricante',
          correcta: false,
          explicacion: 'También intervienen suministrador, distribuidor e instalador.',
        },
        {
          texto: 'Solo de la Comunidad Autónoma',
          correcta: false,
          explicacion: 'La Administración controla, pero no es la única fuente de recomendaciones.',
        },
        {
          texto: 'De cualquiera que visite la vivienda',
          correcta: false,
          explicacion: 'La norma cita agentes concretos.',
        },
      ],
      cita: 'Reglamento, art. 7.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-048',
      moduloId: 'seguridad',
      enunciado: '¿Puede la Comunidad Autónoma comprobar el cumplimiento del reglamento sin aviso previo?',
      opciones: [
        {
          texto: 'No, solo con autorización judicial',
          correcta: false,
          explicacion: 'El art. 7.3 habla de comprobación en cualquier momento.',
        },
        {
          texto: 'Sí, en cualquier momento, incluso de oficio o ante un riesgo significativo',
          correcta: true,
          explicacion: 'Es el contenido del control administrativo del art. 7.3.',
        },
        {
          texto: 'Solo si lo pide el suministrador',
          correcta: false,
          explicacion: 'Puede actuar de oficio o a instancia de parte interesada.',
        },
        {
          texto: 'Solo durante la inspección quinquenal',
          correcta: false,
          explicacion: 'El control administrativo no está ligado a esa periodicidad.',
        },
      ],
      pista: 'La expresión clave es en cualquier momento.',
      cita: 'Reglamento, art. 7.3',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-049',
      moduloId: 'seguridad',
      enunciado: '¿Qué se comprueba en la inspección de una instalación alimentada a presión no superior a 5 bar?',
      opciones: [
        {
          texto: 'Estanquidad, conservación, combustión higiénica, ventilación, volumen del local y evacuación de humos',
          correcta: true,
          explicacion: 'Son los aspectos enumerados en el apartado 4.1 de la ITC-ICG 07.',
        },
        {
          texto: 'Solo el color de la cocina',
          correcta: false,
          explicacion: 'No es un aspecto de seguridad regulado.',
        },
        {
          texto: 'Solo la factura del gas',
          correcta: false,
          explicacion: 'La documentación se comprueba, pero no es el objeto de la inspección técnica.',
        },
        {
          texto: 'Solo el número de aparatos',
          correcta: false,
          explicacion: 'La inspección aborda mucho más que el recuento de aparatos.',
        },
      ],
      cita: 'ITC-ICG 07, apartado 4.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-050',
      moduloId: 'seguridad',
      enunciado: '¿Por dónde se evacuan los productos de la combustión con carácter general?',
      opciones: [
        {
          texto: 'Por la fachada de la vivienda',
          correcta: false,
          explicacion: 'La regla general es la evacuación por cubierta, con excepciones.',
        },
        {
          texto: 'Por cubierta',
          correcta: true,
          explicacion: 'La ITC-ICG 07 lo dice con carácter general y prevé excepciones para ciertos aparatos.',
        },
        {
          texto: 'Por el desagüe',
          correcta: false,
          explicacion: 'No es un sistema de evacuación de productos de combustión previsto en esa regla.',
        },
        {
          texto: 'Por la ventana del dormitorio',
          correcta: false,
          explicacion: 'No es la regla general.',
        },
      ],
      pista: 'La palabra clave es cubierta.',
      cita: 'ITC-ICG 07, apartado 2',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-051',
      moduloId: 'seguridad',
      enunciado: 'Si hay aparatos de tipo A o B en un dormitorio o en un baño, ¿qué criterios técnicos se aplican?',
      opciones: [
        {
          texto: 'Los de la versión vigente de la norma, con un periodo de adaptación hasta la siguiente inspección o revisión',
          correcta: true,
          explicacion: 'La ITC-ICG 07 establece esa excepción a los criterios de la versión original.',
        },
        {
          texto: 'Los de cualquier norma antigua, sin posibilidad de adaptación',
          correcta: false,
          explicacion: 'La ITC prevé expresamente la versión vigente y un plazo de adaptación.',
        },
        {
          texto: 'Ninguno, porque no se inspecciona',
          correcta: false,
          explicacion: 'Sí se inspecciona y la norma regula este supuesto.',
        },
        {
          texto: 'Los que decida el vecino',
          correcta: false,
          explicacion: 'Los criterios son técnicos y normativos.',
        },
      ],
      cita: 'ITC-ICG 07, apartados 4.1 y 4.2',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-052',
      moduloId: 'seguridad',
      enunciado: 'En un accidente con daños importantes, ¿quién notifica al órgano de la Comunidad Autónoma?',
      opciones: [
        {
          texto: 'El suministrador',
          correcta: true,
          explicacion: 'El art. 14 le atribuye la notificación en un máximo de 24 horas.',
        },
        {
          texto: 'El organismo de control',
          correcta: false,
          explicacion: 'No es el sujeto obligado por el art. 14.',
        },
        {
          texto: 'La persona lesionada',
          correcta: false,
          explicacion: 'La norma no impone esa carga a la víctima.',
        },
        {
          texto: 'El titular de la vivienda de al lado',
          correcta: false,
          explicacion: 'No es el obligado.',
        },
      ],
      cita: 'Reglamento, art. 14',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-053',
      moduloId: 'seguridad',
      enunciado: '¿En qué plazo se remite el informe posterior al accidente?',
      opciones: [
        {
          texto: 'En un máximo de 7 días',
          correcta: true,
          explicacion: 'El art. 14 lo fija tras la notificación de las 24 horas.',
        },
        {
          texto: 'En un máximo de 24 horas',
          correcta: false,
          explicacion: 'Ese es el plazo de la notificación inicial.',
        },
        {
          texto: 'En 15 días naturales de cada trimestre',
          correcta: false,
          explicacion: 'Ese plazo se refiere a la información estadística.',
        },
        {
          texto: 'En cinco años',
          correcta: false,
          explicacion: 'No guarda relación con los accidentes.',
        },
      ],
      pista: 'Primero se notifica; después se envía el informe.',
      cita: 'Reglamento, art. 14',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-054',
      moduloId: 'seguridad',
      enunciado: '¿Cuándo se remite la información estadística de accidentes?',
      opciones: [
        {
          texto: 'En los quince primeros días de cada trimestre',
          correcta: true,
          explicacion: 'El art. 14 lo establece con datos como localidad, fecha o clase de accidente.',
        },
        {
          texto: 'Cada cinco años',
          correcta: false,
          explicacion: 'La estadística es trimestral.',
        },
        {
          texto: 'Solo cuando hay víctimas',
          correcta: false,
          explicacion: 'Está prevista con carácter periódico.',
        },
        {
          texto: 'El último día del año',
          correcta: false,
          explicacion: 'No es el momento indicado.',
        },
      ],
      cita: 'Reglamento, art. 14',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-055',
      moduloId: 'instaladores',
      enunciado: '¿Cuántas categorías de instalador de gas establece la ITC-ICG 09?',
      opciones: [
        {
          texto: 'Dos',
          correcta: false,
          explicacion: 'La ITC establece tres categorías.',
        },
        {
          texto: 'Tres: A, B y C',
          correcta: true,
          explicacion: 'El apartado 2.2 las enumera con operaciones distintas.',
        },
        {
          texto: 'Cuatro',
          correcta: false,
          explicacion: 'No hay una cuarta categoría en la ITC.',
        },
        {
          texto: 'Una sola, sin distinciones',
          correcta: false,
          explicacion: 'Sí hay distinciones por categoría.',
        },
      ],
      pista: 'Son las primeras letras del alfabeto.',
      cita: 'ITC-ICG 09, apartado 2.2',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-056',
      moduloId: 'instaladores',
      enunciado: '¿Qué puede hacer un instalador de categoría A?',
      opciones: [
        {
          texto: 'Todas las operaciones señaladas para instaladores, con las limitaciones de su categoría',
          correcta: true,
          explicacion: 'El apartado 2.2.a) dice que puede realizar todas las operaciones del apartado 2.1.',
        },
        {
          texto: 'Solo cambiar bombillas',
          correcta: false,
          explicacion: 'No es una operación gasista regulada aquí.',
        },
        {
          texto: 'Solo instalaciones dentro de viviendas',
          correcta: false,
          explicacion: 'Esa limitación corresponde a la categoría C.',
        },
        {
          texto: 'Solo revisar, sin montar',
          correcta: false,
          explicacion: 'La categoría A abarca también montaje y modificación.',
        },
      ],
      cita: 'ITC-ICG 09, apartado 2.2.a)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-057',
      moduloId: 'instaladores',
      enunciado: '¿Cuál es el ámbito de la categoría C?',
      opciones: [
        {
          texto: 'Instalaciones individuales sin proyecto, hasta 0,4 bar, situadas solo en el interior de viviendas',
          correcta: true,
          explicacion: 'El apartado 2.2.c) describe esa limitación, sin cambio de familia de gas.',
        },
        {
          texto: 'Cualquier instalación de 5 bar',
          correcta: false,
          explicacion: 'Esa es una de las limitaciones de la categoría B.',
        },
        {
          texto: 'Redes de distribución',
          correcta: false,
          explicacion: 'Quedan fuera de la categoría C.',
        },
        {
          texto: 'Todas las operaciones sin límite',
          correcta: false,
          explicacion: 'Eso corresponde a la categoría A.',
        },
      ],
      pista: 'Fíjate en el límite de presión y en que solo es interior de viviendas.',
      cita: 'ITC-ICG 09, apartado 2.2.c)',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-058',
      moduloId: 'instaladores',
      enunciado: '¿En qué marco debe desarrollar su actividad el instalador de gas?',
      opciones: [
        {
          texto: 'Por su cuenta y sin empresa',
          correcta: false,
          explicacion: 'El apartado 2 exige actuar en una empresa instaladora habilitada.',
        },
        {
          texto: 'En el seno de una empresa instaladora de gas habilitada',
          correcta: true,
          explicacion: 'Es la exigencia del apartado 2 de la ITC-ICG 09.',
        },
        {
          texto: 'Dentro del distribuidor, siempre',
          correcta: false,
          explicacion: 'El distribuidor es otro agente.',
        },
        {
          texto: 'Bajo la dirección del vecino',
          correcta: false,
          explicacion: 'La habilitación de la empresa es la que importa.',
        },
      ],
      cita: 'ITC-ICG 09, apartado 2',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-059',
      moduloId: 'instaladores',
      enunciado: '¿Cuál de estas opciones NO es una vía para acreditar la cualificación del instalador?',
      opciones: [
        {
          texto: 'Tener un título universitario adecuado',
          correcta: false,
          explicacion: 'Sí es una de las vías del apartado 2.',
        },
        {
          texto: 'Haber superado un examen teórico-práctico ante la Comunidad Autónoma',
          correcta: false,
          explicacion: 'También aparece en la lista.',
        },
        {
          texto: 'Tener certificación de entidad acreditada para certificar personas',
          correcta: false,
          explicacion: 'Es otra de las vías admitidas.',
        },
        {
          texto: 'Haber trabajado un verano sin formación ni reconocimiento',
          correcta: true,
          explicacion: 'La experiencia debe estar reconocida conforme al procedimiento legal, no basta con haber trabajado.',
        },
      ],
      pista: 'La experiencia solo cuenta si está reconocida.',
      cita: 'ITC-ICG 09, apartado 2',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-060',
      moduloId: 'instaladores',
      enunciado: '¿Qué debe presentar una empresa antes de comenzar su actividad instaladora?',
      opciones: [
        {
          texto: 'Una declaración responsable ante el órgano de la Comunidad Autónoma',
          correcta: true,
          explicacion: 'El apartado 3.1 de la ITC-ICG 09 exige esa declaración previa.',
        },
        {
          texto: 'Un certificado de la policía',
          correcta: false,
          explicacion: 'No es el instrumento previsto.',
        },
        {
          texto: 'Un informe del vecino',
          correcta: false,
          explicacion: 'No forma parte del procedimiento.',
        },
        {
          texto: 'Ningún documento',
          correcta: false,
          explicacion: 'Sí se exige la declaración responsable.',
        },
      ],
      cita: 'ITC-ICG 09, apartado 3.1',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-061',
      moduloId: 'instaladores',
      enunciado: '¿Debe adjuntarse a la declaración responsable toda la documentación acreditativa?',
      opciones: [
        {
          texto: 'Sí, siempre, en el momento de presentarla',
          correcta: false,
          explicacion: 'El apartado 3.3 dice que no se puede exigir que se presente junto con la declaración.',
        },
        {
          texto: 'No, pero debe estar disponible para presentarla de inmediato si la Administración la pide',
          correcta: true,
          explicacion: 'Es el régimen del apartado 3.3 de la ITC-ICG 09.',
        },
        {
          texto: 'Solo si la empresa es nueva',
          correcta: false,
          explicacion: 'La regla no distingue por antigüedad.',
        },
        {
          texto: 'No, y tampoco hace falta tenerla',
          correcta: false,
          explicacion: 'La documentación debe existir y estar disponible.',
        },
      ],
      pista: 'No se entrega, pero hay que tenerla lista.',
      cita: 'ITC-ICG 09, apartado 3.3',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-062',
      moduloId: 'instaladores',
      enunciado: '¿Qué garantía económica debe tener una empresa instaladora?',
      opciones: [
        {
          texto: 'Un seguro de responsabilidad civil profesional u otra garantía equivalente',
          correcta: true,
          explicacion: 'El apartado 3.8.d) lo exige con importes mínimos según la categoría.',
        },
        {
          texto: 'Un depósito en el ayuntamiento',
          correcta: false,
          explicacion: 'No es la garantía prevista en la ITC.',
        },
        {
          texto: 'Un aval del vecino',
          correcta: false,
          explicacion: 'No está previsto.',
        },
        {
          texto: 'Ninguna, si solo trabaja en viviendas',
          correcta: false,
          explicacion: 'La obligación de seguro o garantía equivalente no tiene esa excepción.',
        },
      ],
      cita: 'ITC-ICG 09, apartado 3.8.d)',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-063',
      moduloId: 'instaladores',
      enunciado: '¿Puede una empresa instaladora vender certificados de instalaciones que no ha realizado?',
      opciones: [
        {
          texto: 'Sí, si otra empresa se lo pide',
          correcta: false,
          explicacion: 'El apartado 3.9 lo prohíbe expresamente.',
        },
        {
          texto: 'Solo si las firmaba un técnico',
          correcta: false,
          explicacion: 'La prohibición no se salva con la firma de un técnico.',
        },
        {
          texto: 'No',
          correcta: true,
          explicacion: 'La ITC-ICG 09 impide facilitar, ceder o enajenar certificados de instalaciones no realizadas por ella.',
        },
        {
          texto: 'Solo si la obra fue pequeña',
          correcta: false,
          explicacion: 'No hay excepción por tamaño de la obra.',
        },
      ],
      pista: 'Cada certificado debe corresponder a una obra hecha por esa empresa.',
      cita: 'ITC-ICG 09, apartado 3.9',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-064',
      moduloId: 'glp-vivienda',
      enunciado: '¿A partir de qué carga unitaria se aplica la ITC-ICG 06 a envases de GLP para uso propio?',
      opciones: [
        {
          texto: 'A partir de más de 3 kg por envase',
          correcta: true,
          explicacion: 'El apartado 1 de la ITC-ICG 06 fija ese umbral.',
        },
        {
          texto: 'A partir de más de 15 kg por envase',
          correcta: false,
          explicacion: '15 kg es el límite de otra de sus reglas, no el umbral general de aplicación.',
        },
        {
          texto: 'A partir de 300 kg por envase',
          correcta: false,
          explicacion: '300 kg es el límite total de almacenamiento para envases de hasta 15 kg.',
        },
        {
          texto: 'No hay ningún umbral',
          correcta: false,
          explicacion: 'Sí hay un umbral en el apartado 1.',
        },
      ],
      pista: 'El número está en el objeto y campo de aplicación.',
      cita: 'ITC-ICG 06, apartado 1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-065',
      moduloId: 'glp-vivienda',
      enunciado: 'Con envases de hasta 15 kg, ¿cuál es la capacidad total máxima de almacenamiento?',
      opciones: [
        {
          texto: '300 kg, contando envases llenos y vacíos',
          correcta: true,
          explicacion: 'El apartado 2.1 de la ITC-ICG 06 exige que la suma no supere 300 kg.',
        },
        {
          texto: '70 kg',
          correcta: false,
          explicacion: 'Esa cifra aparece en otra parte de la ITC para envases grandes.',
        },
        {
          texto: '1.000 kg',
          correcta: false,
          explicacion: 'Es el límite para instalaciones con envases de más de 15 kg.',
        },
        {
          texto: 'No hay límite',
          correcta: false,
          explicacion: 'Sí hay un límite total.',
        },
      ],
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-066',
      moduloId: 'glp-vivienda',
      enunciado: '¿Dónde no se permite instalar envases de GLP en una vivienda, salvo autorización?',
      opciones: [
        {
          texto: 'En sótanos, semisótanos, cajas de escalera y pasillos',
          correcta: true,
          explicacion: 'El apartado 2.1 lo prohíbe salvo autorización de la Comunidad Autónoma.',
        },
        {
          texto: 'En cualquier lugar',
          correcta: false,
          explicacion: 'La ITC impone condiciones de ubicación.',
        },
        {
          texto: 'Solo en la cocina',
          correcta: false,
          explicacion: 'La cocina no es el lugar prohibido por esa regla.',
        },
        {
          texto: 'Solo en el exterior',
          correcta: false,
          explicacion: 'El exterior está permitido, con sus condiciones.',
        },
      ],
      pista: 'Piensa en los sitios por donde se camina o que están por debajo del suelo.',
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-067',
      moduloId: 'glp-vivienda',
      enunciado: 'Si las botellas están fuera y los aparatos dentro, ¿qué se exige en la vivienda?',
      opciones: [
        {
          texto: 'Una llave general de corte de gas fácilmente accesible',
          correcta: true,
          explicacion: 'El apartado 2.1 de la ITC-ICG 06 lo exige en ese supuesto.',
        },
        {
          texto: 'Otra botella de reserva en el pasillo',
          correcta: false,
          explicacion: 'Los pasillos están prohibidos sin autorización.',
        },
        {
          texto: 'Un detector obligatorio en todos los casos',
          correcta: false,
          explicacion: 'La exigencia concreta aquí es la llave general accesible.',
        },
        {
          texto: 'No se exige nada especial',
          correcta: false,
          explicacion: 'Sí se exige esa llave de corte.',
        },
      ],
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-068',
      moduloId: 'glp-vivienda',
      enunciado: '¿Cuántos envases pueden estar conectados dentro de la vivienda como máximo?',
      opciones: [
        {
          texto: 'Uno',
          correcta: false,
          explicacion: 'El límite permitido es superior.',
        },
        {
          texto: 'Dos, en batería para descarga o en reserva',
          correcta: true,
          explicacion: 'El apartado 2.1 de la ITC-ICG 06 fija ese máximo en el interior.',
        },
        {
          texto: 'Cuatro',
          correcta: false,
          explicacion: 'Supera el máximo indicado para el interior de la vivienda.',
        },
        {
          texto: 'No hay límite',
          correcta: false,
          explicacion: 'Sí hay un límite.',
        },
      ],
      pista: 'El límite coincide con el número de manos de un reloj.',
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-069',
      moduloId: 'glp-vivienda',
      enunciado: '¿En qué posición se colocan los envases con válvula de seguridad?',
      opciones: [
        {
          texto: 'Tumbados',
          correcta: false,
          explicacion: 'La ITC exige posición vertical.',
        },
        {
          texto: 'Inclinados',
          correcta: false,
          explicacion: 'No es la posición exigida.',
        },
        {
          texto: 'En posición vertical, llenos y vacíos',
          correcta: true,
          explicacion: 'El apartado 2.1 de la ITC-ICG 06 lo dispone para envases con válvula de seguridad.',
        },
        {
          texto: 'Depende del aparato',
          correcta: false,
          explicacion: 'La regla no depende del aparato.',
        },
      ],
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'facil',
    },
    {
      id: 'q-070',
      moduloId: 'glp-vivienda',
      enunciado: '¿Qué ventilación debe tener el armario de los envases?',
      opciones: [
        {
          texto: 'Aberturas permanentes en la base, con superficie libre superior a 1/100 de la pared o fondo del armario',
          correcta: true,
          explicacion: 'El apartado 2.1 de la ITC-ICG 06 fija esa relación y prohíbe obstruirla.',
        },
        {
          texto: 'No necesita ventilación si está cerrado',
          correcta: false,
          explicacion: 'Se exigen aberturas permanentes.',
        },
        {
          texto: 'Una ranura pequeña en la puerta, sin medida',
          correcta: false,
          explicacion: 'La ITC da una relación de superficies.',
        },
        {
          texto: 'Solo una ventana del local',
          correcta: false,
          explicacion: 'La exigencia concreta afecta al armario.',
        },
      ],
      pista: 'La cifra se refiere a una superficie libre, no a una distancia.',
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'dificil',
    },
    {
      id: 'q-071',
      moduloId: 'glp-vivienda',
      enunciado: '¿Pueden conectarse directamente envases y aparatos sin regulador?',
      opciones: [
        {
          texto: 'Sí, siempre',
          correcta: false,
          explicacion: 'La conexión sin regulador está prohibida con carácter general.',
        },
        {
          texto: 'No, salvo aparatos aprobados para presión directa; entonces se usa canalización rígida',
          correcta: true,
          explicacion: 'Es la excepción del apartado 2.1 de la ITC-ICG 06.',
        },
        {
          texto: 'Solo si la botella es pequeña',
          correcta: false,
          explicacion: 'El tamaño de la botella no crea esa excepción.',
        },
        {
          texto: 'Solo si el usuario hace la conexión',
          correcta: false,
          explicacion: 'Quien conecte no elimina la exigencia técnica.',
        },
      ],
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      dificultad: 'media',
    },
    {
      id: 'q-072',
      moduloId: 'glp-vivienda',
      enunciado: '¿Qué NO debe hacerse mientras se cambia una botella de GLP?',
      opciones: [
        {
          texto: 'Mantener encendido un fuego, accionar interruptores o hacer funcionar motores',
          correcta: true,
          explicacion: 'El apartado 2.2.4 de la ITC-ICG 06 exige esas precauciones durante el cambio.',
        },
        {
          texto: 'Cerrar la llave correspondiente',
          correcta: false,
          explicacion: 'No es una de las acciones prohibidas por esa regla.',
        },
        {
          texto: 'Colocar la botella en vertical',
          correcta: false,
          explicacion: 'Es una exigencia, no una prohibición.',
        },
        {
          texto: 'Comprobar que hay regulador',
          correcta: false,
          explicacion: 'Es una comprobación necesaria.',
        },
      ],
      pista: 'Hay que evitar todo lo que pueda producir una chispa.',
      cita: 'ITC-ICG 06, apartado 2.2.4',
      url: BOE,
      dificultad: 'media',
    },
  ],
  casos: [
    {
      id: 'c-01',
      titulo: 'Huele a gas en la cocina',
      situacion:
        'Al entrar en la vivienda se nota un olor fuerte a gas cerca de la cocina. Nadie ha hecho obra y el aparato lleva tiempo instalado.',
      pasos: [
        {
          texto: 'Dejar de usar el aparato y no seguir manejando sus mandos.',
          porque: 'El titular o usuario debe mantener la instalación y los aparatos con el nivel de seguridad adecuado.',
          cita: 'Reglamento, art. 7.1',
        },
        {
          texto: 'No intentar arreglar la conexión por su cuenta: avisar a un instalador habilitado o al servicio técnico correspondiente.',
          porque: 'Las anomalías se corrigen con un instalador habilitado o el servicio técnico que corresponda.',
          cita: 'ITC-ICG 07, apartado 4.1.1.h)',
        },
        {
          texto: 'Si se confirma una fuga, actuar como anomalía principal: corte de suministro y precinto si no se corrige en el acto.',
          porque: 'Todas las fugas detectadas se consideran anomalía principal.',
          cita: 'ITC-ICG 07, apartado 4.1.1.f)',
        },
        {
          texto: 'Guardar el informe de anomalías y el justificante de corrección que entregue el profesional.',
          porque: 'El justificante acredita que la anomalía se ha subsanado.',
          cita: 'ITC-ICG 07, apartado 4.1.1.f) y h)',
        },
        {
          texto: 'Solo cuando esté resuelta, solicitar la reposición del servicio a través del agente correspondiente.',
          porque: 'Tras subsanar las anomalías principales puede procederse al desprecintado con el certificado de subsanación.',
          cita: 'ITC-ICG 07, apartado 4.1.1.i)',
        },
      ],
      errorComun:
        'Buscar el origen con una llama o seguir usando el aparato para ver si el olor desaparece.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f)',
      url: BOE,
    },
    {
      id: 'c-02',
      titulo: 'Fuga en una llave de la instalación',
      situacion:
        'El inspector detecta pérdida de gas en una llave de conexión. La fuga no se puede corregir en el momento de la visita.',
      pasos: [
        {
          texto: 'Clasificar la fuga como anomalía principal.',
          porque: 'El reglamento considera anomalía principal todas las fugas detectadas.',
          cita: 'ITC-ICG 07, apartado 4.1.1.f)',
        },
        {
          texto: 'Interrumpir el suministro y precintar la parte de la instalación afectada.',
          porque: 'Es la actuación prevista cuando la anomalía principal no puede corregirse de inmediato.',
          cita: 'ITC-ICG 07, apartado 4.1.1.f)',
        },
        {
          texto: 'Encargar la reparación a un instalador habilitado, no a la empresa que ha hecho la inspección.',
          porque: 'Quien inspecciona no puede reparar las anomalías que encuentre.',
          cita: 'ITC-ICG 07, apartado 4.1.1.c.2) y h)',
        },
        {
          texto: 'Obtener el justificante de corrección y enviar copia al distribuidor.',
          porque: 'El profesional que corrige debe entregarlo y remitir copia.',
          cita: 'ITC-ICG 07, apartado 4.1.1.h)',
        },
        {
          texto: 'Aportar el certificado de subsanación para desprecintar y volver a poner en servicio.',
          porque: 'La empresa habilitada puede desprecintar tras resolver las anomalías principales.',
          cita: 'ITC-ICG 07, apartado 4.1.1.i)',
        },
      ],
      errorComun:
        'Dejar el precinto puesto indefinidamente pensando que ya se arreglará en la próxima revisión.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f) e i)',
      url: BOE,
    },
    {
      id: 'c-03',
      titulo: 'Botella instalada en la cocina',
      situacion:
        'En una vivienda se ha colocado una botella de GLP de 15 kg dentro de la cocina, en un armario sin rejillas y con el regulador colgado.',
      pasos: [
        {
          texto: 'Comprobar que la botella está en posición vertical y que el armario tiene ventilación permanente.',
          porque: 'Los envases con válvula van en vertical y el armario necesita aberturas en la base.',
          cita: 'ITC-ICG 06, apartado 2.1',
        },
        {
          texto: 'Corregir la ventilación del armario: superficie libre superior a 1/100 de la pared o fondo.',
          porque: 'Ningún envase debe obstruir la superficie de ventilación.',
          cita: 'ITC-ICG 06, apartado 2.1',
        },
        {
          texto: 'Intercalar un regulador entre el envase y el aparato.',
          porque: 'La conexión sin regulador está prohibida salvo aparatos aprobados para presión directa.',
          cita: 'ITC-ICG 06, apartado 2.1',
        },
        {
          texto: 'Revisar que no haya más de dos envases conectados dentro de la vivienda.',
          porque: 'La ITC fija ese máximo para el interior.',
          cita: 'ITC-ICG 06, apartado 2.1',
        },
        {
          texto: 'Si la botella estuviera en el exterior y el aparato dentro, comprobar la llave general de corte accesible.',
          porque: 'Es una exigencia específica para esa disposición.',
          cita: 'ITC-ICG 06, apartado 2.1',
        },
        {
          texto: 'Al cambiar la botella, evitar fuego, interruptores y motores.',
          porque: 'Son las precauciones exigidas durante el cambio de envases.',
          cita: 'ITC-ICG 06, apartado 2.2.4',
        },
      ],
      errorComun:
        'Tapar las rejillas del armario con la botella o con objetos para que no entre polvo.',
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
    },
    {
      id: 'c-04',
      titulo: 'Revisión caducada',
      situacion:
        'Un vecino pregunta por la inspección de su vivienda: la última fue hace más de cinco años y no recuerda ningún aviso.',
      pasos: [
        {
          texto: 'Explicar que el control de una receptora alimentada desde red se llama inspección periódica.',
          porque: 'El art. 7.2 reserva ese nombre a esas instalaciones.',
          cita: 'Reglamento, art. 7.2',
        },
        {
          texto: 'Recordar la periodicidad de cinco años dentro del año natural de vencimiento.',
          porque: 'Lo fija la ITC-ICG 07 para receptoras desde red y para la parte común.',
          cita: 'ITC-ICG 07, apartado 4.1',
        },
        {
          texto: 'Elegir libremente entre empresa instaladora habilitada o el distribuidor.',
          porque: 'El titular o usuario tiene esa facultad de elección.',
          cita: 'Reglamento, art. 7.2; ITC-ICG 07, apartado 4.1.1',
        },
        {
          texto: 'Si no se recibe el certificado en plazo, esperar la comunicación del distribuidor con la fecha y hora de la visita.',
          porque: 'Se entiende que el titular desea que inspeccione el propio distribuidor.',
          cita: 'ITC-ICG 07, apartado 4.1.1.d.2)',
        },
        {
          texto: 'Si hay anomalías, encargar la corrección y conservar el justificante.',
          porque: 'La responsabilidad de corregirlas es del titular o usuario.',
          cita: 'ITC-ICG 07, apartado 4.1.1.h)',
        },
      ],
      errorComun:
        'Pensar que, si no ha llegado el aviso, ya no hay obligación de inspeccionar.',
      cita: 'ITC-ICG 07, apartado 4.1',
      url: BOE,
    },
    {
      id: 'c-05',
      titulo: 'Contrato resuelto y vuelta a dar gas',
      situacion:
        'Una vivienda llevó tiempo sin contrato de suministro. El nuevo ocupante quiere que se restablezca el gas.',
      pasos: [
        {
          texto: 'Pedir el certificado de control periódico sin anomalías y en vigor.',
          porque: 'Es lo que exige el art. 5.6.b) para restablecer el suministro.',
          cita: 'Reglamento, art. 5.6.b)',
        },
        {
          texto: 'Si no existe ese certificado, o la instalación ha estado fuera de servicio más de un año, actuar como si fuera nueva.',
          porque: 'La ITC-ICG 07 asimila esa situación a las nuevas instalaciones.',
          cita: 'Reglamento, art. 5.6.b); ITC-ICG 07, apartado 3.5.1',
        },
        {
          texto: 'Formalizar el contrato de suministro antes de solicitar la puesta en servicio.',
          porque: 'Es un paso previo en las instalaciones individuales con contrato domiciliario.',
          cita: 'ITC-ICG 07, apartado 3.5.1',
        },
        {
          texto: 'El distribuidor verifica el certificado archivado, hace las pruebas previas y emite el certificado de puesta en servicio.',
          porque: 'Es el procedimiento previsto para la reapertura tras resolución de contrato.',
          cita: 'ITC-ICG 07, apartado 3.5.1',
        },
        {
          texto: 'Conservar la copia del certificado de pruebas previas y puesta en servicio.',
          porque: 'Debe entregarse una copia al titular o usuario.',
          cita: 'ITC-ICG 07, apartado 3.5.1',
        },
      ],
      errorComun:
        'Creer que basta con firmar un contrato nuevo aunque la instalación lleve más de un año sin gas.',
      cita: 'Reglamento, art. 5.6.b)',
      url: BOE,
    },
    {
      id: 'c-06',
      titulo: 'Estrenar un aparato nuevo',
      situacion:
        'Se compra una cocina de gas nueva. Viene en una caja con folletos y el instalador va a hacer la conexión.',
      pasos: [
        {
          texto: 'Comprobar que se entregan el manual técnico, las instrucciones de usuario en español y las advertencias.',
          porque: 'La ITC-ICG 08 exige esa documentación en el momento de la comercialización.',
          cita: 'ITC-ICG 08, apartado 2.2',
        },
        {
          texto: 'Verificar que el aparato lleva su placa de características visible.',
          porque: 'Es una exigencia del apartado 4 de la ITC-ICG 08.',
          cita: 'ITC-ICG 08, apartado 4',
        },
        {
          texto: 'Conectar el aparato con un instalador, salvo el caso previsto de tubo flexible elastomérico con abrazadera.',
          porque: 'El apartado 5.2 regula quién puede hacer la conexión.',
          cita: 'ITC-ICG 08, apartado 5.2',
        },
        {
          texto: 'Encargar la puesta en marcha a un agente cualificado según la potencia y el tipo de aparato.',
          porque: 'El apartado 5.3.1 distingue entre aparatos según su potencia y características.',
          cita: 'ITC-ICG 08, apartado 5.3.1',
        },
        {
          texto: 'Recibir y guardar el certificado de puesta en marcha.',
          porque: 'Quien la realiza debe emitirlo y entregarlo al cliente.',
          cita: 'ITC-ICG 08, apartado 5.4',
        },
      ],
      errorComun:
        'Encender el aparato para probarlo antes de que intervenga el agente que debe hacer la puesta en marcha.',
      cita: 'ITC-ICG 08, apartado 5.4',
      url: BOE,
    },
    {
      id: 'c-07',
      titulo: 'Modificación de la instalación',
      situacion:
        'Se quiere cambiar el trazado de un tubo y sustituir la cocina por un modelo con otras características técnicas.',
      pasos: [
        {
          texto: 'Identificar si hay modificación: cambio de material o trazado en más de 1 m, ampliación de consumo o sustitución por aparatos de distintas características.',
          porque: 'El apartado 5 de la ITC-ICG 07 define qué se entiende por modificación.',
          cita: 'ITC-ICG 07, apartado 5',
        },
        {
          texto: 'Encargar los trabajos a una empresa instaladora.',
          porque: 'Las modificaciones las realizan instaladores, que después emiten el certificado correspondiente.',
          cita: 'ITC-ICG 07, apartado 4',
        },
        {
          texto: 'Comunicar la modificación al suministrador.',
          porque: 'Es obligación de la empresa instaladora que realice los trabajos.',
          cita: 'ITC-ICG 07, apartado 5',
        },
        {
          texto: 'El suministrador solicita el enganche al distribuidor y se hacen las pruebas previas.',
          porque: 'El distribuidor realiza las pruebas reglamentarias tras la comunicación.',
          cita: 'ITC-ICG 07, apartado 5',
        },
        {
          texto: 'Conservar el certificado de la modificación y el de pruebas previas.',
          porque: 'La documentación debe quedar en poder del usuario y del agente correspondiente.',
          cita: 'ITC-ICG 07, apartados 4 y 5',
        },
      ],
      errorComun:
        'Pensar que cambiar un aparato por otro con características distintas no es modificación.',
      cita: 'ITC-ICG 07, apartado 5',
      url: BOE,
    },
    {
      id: 'c-08',
      titulo: 'Falta el certificado',
      situacion:
        'El titular de una vivienda dice que la empresa no le dio ningún papel cuando terminó la instalación.',
      pasos: [
        {
          texto: 'Pedir a la empresa instaladora el certificado de instalación, con el croquis y las indicaciones de uso.',
          porque: 'La empresa debe confeccionar instrucciones de uso y mantenimiento como anexo al certificado.',
          cita: 'Reglamento, art. 6; ITC-ICG 07, apartado 3.4',
        },
        {
          texto: 'Si hizo falta proyecto, reclamar también el certificado de dirección de obra.',
          porque: 'El técnico competente lo emite en las instalaciones que precisan proyecto.',
          cita: 'Reglamento, art. 5.5.b); ITC-ICG 07, apartado 3.2',
        },
        {
          texto: 'Si hubo inspección, pedir la copia del certificado correspondiente.',
          porque: 'El organismo de control o el agente que inspecciona emite su certificado cuando procede.',
          cita: 'Reglamento, art. 5.5.c)',
        },
        {
          texto: 'Comprobar que consta el resultado favorable de la prueba de estanquidad.',
          porque: 'El resultado debe indicarse en el certificado de instalación.',
          cita: 'ITC-ICG 07, apartado 3.3',
        },
        {
          texto: 'Si es un aparato recién puesto en marcha, pedir el certificado de puesta en marcha.',
          porque: 'Debe entregarse al cliente y archivarse al menos cinco años.',
          cita: 'ITC-ICG 08, apartado 5.4',
        },
      ],
      errorComun:
        'Dar por buena la instalación porque el gas funciona, sin exigir la documentación.',
      cita: 'Reglamento, arts. 5.5 y 6',
      url: BOE,
    },
    {
      id: 'c-09',
      titulo: 'Un vecino llama por la instalación común',
      situacion:
        'Un vecino avisa de que hay una anomalía en un tramo compartido del edificio y quiere saber de quién es la responsabilidad.',
      pasos: [
        {
          texto: 'Delimitar si el tramo pertenece a la instalación común: desde la llave del edificio, excluida, hasta las llaves de usuario, incluidas.',
          porque: 'Es la definición del art. 3.o).',
          cita: 'Reglamento, art. 3.o)',
        },
        {
          texto: 'Recordar que la parte común se inspecciona cada cinco años.',
          porque: 'El apartado 4.1 de la ITC-ICG 07 lo establece además de la inspección de las receptoras individuales.',
          cita: 'ITC-ICG 07, apartado 4.1',
        },
        {
          texto: 'Si hay anomalía, comunicarla para que se corrija con un instalador habilitado.',
          porque: 'La corrección de anomalías se hace con instalador habilitado o servicio técnico según corresponda.',
          cita: 'ITC-ICG 07, apartado 4.1.1.h)',
        },
        {
          texto: 'Dejar que el titular o usuario elija libremente la empresa para el control y las adecuaciones.',
          porque: 'El art. 7.2 reconoce esa facultad de elección.',
          cita: 'Reglamento, art. 7.2',
        },
        {
          texto: 'No asumir que el vecino puede arreglar el tramo compartido por su cuenta.',
          porque: 'Las modificaciones las realizan instaladores y debe emitirse certificado.',
          cita: 'ITC-ICG 07, apartado 4',
        },
      ],
      errorComun:
        'Discutir solo por la llave de usuario sin antes delimitar si el tramo es común o individual.',
      cita: 'Reglamento, art. 3.o) y p)',
      url: BOE,
    },
    {
      id: 'c-10',
      titulo: '¿Quién paga?',
      situacion:
        'En una comunidad preguntan quién debe pagar la inspección, la reparación de una anomalía y el enganche tras una modificación.',
      pasos: [
        {
          texto: 'Inspección: el coste se repercute a los usuarios.',
          porque: 'La ITC-ICG 07 dice que las empresas repercuten el coste de la inspección.',
          cita: 'ITC-ICG 07, apartado 4.1',
        },
        {
          texto: 'Si la hace el distribuidor, el coste no puede superar los costes regulados.',
          porque: 'Es el límite que fija el apartado 4.1 para ese supuesto.',
          cita: 'ITC-ICG 07, apartado 4.1',
        },
        {
          texto: 'Anomalías: las corrige el titular o usuario, con instalador habilitado o servicio técnico.',
          porque: 'El apartado 4.1.1.h) atribuye esa responsabilidad y exige justificante.',
          cita: 'ITC-ICG 07, apartado 4.1.1.h)',
        },
        {
          texto: 'Enganche tras una modificación: los derechos se repercuten al usuario final.',
          porque: 'El apartado 5 de la ITC-ICG 07 lo prevé al solicitar el enganche al distribuidor.',
          cita: 'ITC-ICG 07, apartado 5',
        },
        {
          texto: 'La empresa instaladora garantiza durante cuatro años las deficiencias por mala ejecución.',
          porque: 'Es una obligación de la empresa instaladora según la ITC-ICG 09.',
          cita: 'ITC-ICG 09, apartado 3.12.i)',
        },
      ],
      errorComun:
        'Creer que la inspección siempre la paga el distribuidor, cuando el reglamento permite repercutir el coste.',
      cita: 'ITC-ICG 07, apartado 4.1',
      url: BOE,
    },
  ],
  buscador: [
    {
      id: 'b-001',
      pregunta: '¿Qué es la inspección periódica?',
      palabrasClave: ['inspeccion', 'inspección', 'control periodico', 'revision'],
      respuesta:
        'Es el control periódico de las instalaciones receptoras alimentadas desde redes de distribución. También se llama así cuando debe hacerlo un organismo de control.',
      cita: 'Reglamento, art. 7.2',
      url: BOE,
      moduloId: 'inspeccion',
    },
    {
      id: 'b-002',
      pregunta: '¿Qué es una revisión periódica?',
      palabrasClave: ['revision', 'revisión', 'revisar', 'control periodico', 'inspeccion'],
      respuesta:
        'Es el nombre que el reglamento da al control periódico en los casos que no son inspección. En las receptoras sin red, el titular encarga la revisión a una empresa instaladora.',
      cita: 'Reglamento, art. 7.2; ITC-ICG 07, apartado 4.2',
      url: BOE,
      moduloId: 'inspeccion',
    },
    {
      id: 'b-003',
      pregunta: '¿Cada cuánto hay que hacer la revisión o inspección?',
      palabrasClave: ['periodicidad', 'periodos', 'cada cuanto', 'cinco años', '5 años'],
      respuesta:
        'La ITC-ICG 07 fija cinco años para las instalaciones receptoras alimentadas desde redes y para la parte común. En las que no están alimentadas desde redes también se prevé una revisión cada cinco años.',
      cita: 'ITC-ICG 07, apartados 4.1 y 4.2',
      url: BOE,
      moduloId: 'inspeccion',
    },
    {
      id: 'b-004',
      pregunta: '¿Qué es la llave de acometida?',
      palabrasClave: ['llave de acometida', 'llave acometida', 'acometida', 'llave general'],
      respuesta:
        'Es la llave que marca el inicio de la instalación receptora en las instalaciones alimentadas desde red. Queda excluida de la instalación receptora y sirve de referencia para definir la acometida interior.',
      cita: 'Reglamento, art. 2.1.h) y art. 3.a)',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-005',
      pregunta: '¿Dónde está la llave del edificio?',
      palabrasClave: ['llave de edificio', 'llave edificio', 'edificio', 'instalacion comun'],
      respuesta:
        'Es la llave que separa la acometida interior de la instalación común. Si no existe, la instalación común empieza en la llave de acometida.',
      cita: 'Reglamento, art. 3.a) y o)',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-006',
      pregunta: '¿Para qué sirve la llave de usuario?',
      palabrasClave: ['llave de usuario', 'llave usuario', 'usuario', 'llave de corte'],
      respuesta:
        'Marca el final de la instalación común y el inicio de la individual cuando existe instalación común. El reglamento la incluye como límite de la instalación común y la excluye como inicio de la individual.',
      cita: 'Reglamento, art. 3.o) y p)',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-007',
      pregunta: '¿Qué es la instalación común?',
      palabrasClave: ['instalacion comun', 'instalación común', 'comun', 'zona compartida'],
      respuesta:
        'Es el conjunto de tuberías y accesorios entre la llave del edificio, o la de acometida si no hay llave de edificio, y las llaves de usuario. Las llaves de inicio se excluyen y las de usuario se incluyen.',
      cita: 'Reglamento, art. 3.o)',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-008',
      pregunta: '¿Qué es la instalación individual?',
      palabrasClave: ['instalacion individual', 'instalación individual', 'individual', 'vivienda'],
      respuesta:
        'Es el conjunto de conducciones desde la llave de usuario, o desde la llave de acometida o edificio si no hay común, hasta las llaves de conexión de los aparatos. Estas últimas se incluyen.',
      cita: 'Reglamento, art. 3.p)',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-009',
      pregunta: '¿Qué certificados hay que guardar tras una instalación?',
      palabrasClave: ['certificado', 'certificado instalacion', 'documentos', 'papeles'],
      respuesta:
        'Hay certificado de instalación, de dirección de obra cuando hace falta proyecto, de organismo de control cuando procede y de pruebas previas y puesta en servicio. En aparatos se entrega además el certificado de puesta en marcha.',
      cita: 'Reglamento, art. 5.5; ITC-ICG 08, apartado 5.4',
      url: BOE,
      moduloId: 'puesta-servicio',
    },
    {
      id: 'b-010',
      pregunta: '¿Qué es una declaración responsable?',
      palabrasClave: ['declaracion responsable', 'declaración responsable', 'declaracion', 'empresa instaladora'],
      respuesta:
        'Es el documento que la empresa instaladora presenta antes de empezar ante el órgano de la Comunidad Autónoma. En él declara la categoría, que cumple los requisitos y que mantendrá la documentación disponible.',
      cita: 'ITC-ICG 09, apartados 3.1 y 3.3',
      url: BOE,
      moduloId: 'instaladores',
    },
    {
      id: 'b-011',
      pregunta: '¿Necesito carné de instalador?',
      palabrasClave: ['carne', 'carné', 'cualificacion', 'habilitacion', 'titulo instalador'],
      respuesta:
        'La ITC-ICG 09 habla de cualificación e habilitación del instalador, no de un carné con ese nombre. El instalador debe acreditar su cualificación por alguna de las vías previstas y trabajar en una empresa habilitada.',
      cita: 'ITC-ICG 09, apartados 2 y 2.2',
      url: BOE,
      moduloId: 'instaladores',
    },
    {
      id: 'b-012',
      pregunta: '¿Qué categorías de instalador existen?',
      palabrasClave: ['categoria', 'categoría', 'categoria a', 'categoria b', 'categoria c', 'clase'],
      respuesta:
        'Hay tres: A, B y C. La A cubre todas las operaciones; la B llega hasta 5 bar sin acometidas enterradas; la C se limita a instalaciones individuales sin proyecto, hasta 0,4 bar en interior de viviendas.',
      cita: 'ITC-ICG 09, apartado 2.2',
      url: BOE,
      moduloId: 'instaladores',
    },
    {
      id: 'b-013',
      pregunta: '¿Qué es el GLP?',
      palabrasClave: ['glp', 'gas licuado del petroleo', 'gas licuado', 'butano', 'propano'],
      respuesta:
        'Son gases licuados del petróleo. En vivienda se usan en envases o botellas que alimentan la instalación receptora, con las reglas de la ITC-ICG 06 para uso propio.',
      cita: 'Reglamento, art. 2.1.f); ITC-ICG 06, apartado 1',
      url: BOE,
      moduloId: 'glp-vivienda',
    },
    {
      id: 'b-014',
      pregunta: '¿Puedo poner una botella en la cocina?',
      palabrasClave: ['botella', 'botellas', 'envase', 'cocina', 'glp'],
      respuesta:
        'Sí, con condiciones: posición vertical, armario ventilado, regulador y un máximo de dos envases conectados dentro de la vivienda. No se permite en sótanos, pasillos ni cajas de escalera sin autorización.',
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      moduloId: 'glp-vivienda',
    },
    {
      id: 'b-015',
      pregunta: '¿Para qué sirve el regulador de la botella?',
      palabrasClave: ['regulador', 'regulador de presion', 'presion', 'botella', 'glp'],
      respuesta:
        'Reduce y controla la presión desde el envase hacia los aparatos. No se pueden conectar envases y aparatos sin regulador, salvo que estén aprobados para presión directa.',
      cita: 'ITC-ICG 06, apartado 2.1',
      url: BOE,
      moduloId: 'glp-vivienda',
    },
    {
      id: 'b-016',
      pregunta: 'Detecto una fuga, ¿qué hago?',
      palabrasClave: ['fuga', 'escapamiento', 'perdida de gas', 'anomalia principal'],
      respuesta:
        'Toda fuga es anomalía principal. Si no se puede corregir en el momento, se interrumpe el suministro y se precinta la parte afectada; la corrección la hace un instalador habilitado o el servicio técnico correspondiente.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f) y h)',
      url: BOE,
      moduloId: 'seguridad',
    },
    {
      id: 'b-017',
      pregunta: '¿Huele a gas, es una emergencia?',
      palabrasClave: ['olor', 'olor a gas', 'huele a gas', 'olores', 'gas'],
      respuesta:
        'Si se nota olor a gas, hay que tratarlo como una posible fuga. Toda fuga es anomalía principal: si no se resuelve de inmediato, se corta el gas y se precinta la parte afectada, y la corrección la hace un profesional habilitado.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f); Reglamento, art. 7.1',
      url: BOE,
      moduloId: 'seguridad',
    },
    {
      id: 'b-018',
      pregunta: '¿Qué ventilación necesita el local del aparato?',
      palabrasClave: ['ventilacion', 'ventilación', 'ventilacion rapida', 'aire', 'local'],
      respuesta:
        'En la inspección se comprueban los requisitos de ventilación y el volumen mínimo del local. En el armario de botellas se exigen aberturas permanentes con superficie libre superior a 1/100 de la pared o fondo.',
      cita: 'ITC-ICG 07, apartado 4.1; ITC-ICG 06, apartado 2.1',
      url: BOE,
      moduloId: 'seguridad',
    },
    {
      id: 'b-019',
      pregunta: '¿Quién hace la puesta en marcha de un aparato?',
      palabrasClave: ['puesta en marcha', 'puesta en marcha aparato', 'encendido', 'arranque'],
      respuesta:
        'Depende del aparato: puede hacerlo el servicio técnico del fabricante o una empresa instaladora. Para aparatos conducidos de más de 24,4 kW y vitrocerámicas de fuegos cubiertos se exigen requisitos adicionales.',
      cita: 'ITC-ICG 08, apartado 5.3.1',
      url: BOE,
      moduloId: 'aparatos',
    },
    {
      id: 'b-020',
      pregunta: '¿Qué es un aparato de gas?',
      palabrasClave: ['aparato', 'aparatos', 'apparato', 'electrodomestico de gas'],
      respuesta:
        'Es un aparato que utiliza combustibles gaseosos. Queda fuera de la instalación receptora, pero sus llaves de conexión sí se incluyen en ella.',
      cita: 'Reglamento, art. 2.1.h) e i)',
      url: BOE,
      moduloId: 'aparatos',
    },
    {
      id: 'b-021',
      pregunta: '¿Quién debe mantener la instalación?',
      palabrasClave: ['mantenimiento', 'mantener', 'conservacion', 'titular', 'usuario'],
      respuesta:
        'El titular o, en su defecto, los usuarios. Deben mantener y usar bien la instalación y los aparatos, y atender las recomendaciones de seguridad de los agentes citados en el reglamento.',
      cita: 'Reglamento, art. 7.1',
      url: BOE,
      moduloId: 'seguridad',
    },
    {
      id: 'b-022',
      pregunta: '¿Quién es el titular de la instalación?',
      palabrasClave: ['titular', 'propietario', 'beneficiario', 'dueño'],
      respuesta:
        'La persona física o jurídica propietaria o beneficiaria de la instalación. El titular responde del mantenimiento y de pedir los controles periódicos.',
      cita: 'Reglamento, art. 3.v); ITC-ICG 07, apartado 4',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-023',
      pregunta: '¿Para qué sirve el suministrador?',
      palabrasClave: ['suministrador', 'suministrador de gas', 'proveedor', 'comercializador'],
      respuesta:
        'Es la empresa que realiza el suministro de gas al cliente o usuario. Puede ser operador al por mayor de GLP, distribuidor al por menor, distribuidor o comercializador.',
      cita: 'Reglamento, art. 3.u)',
      url: BOE,
      moduloId: 'recorrido',
    },
    {
      id: 'b-024',
      pregunta: '¿Qué hace el distribuidor?',
      palabrasClave: ['distribuidor', 'distribuidora', 'compañia de gas', 'red'],
      respuesta:
        'Es la entidad definida en la Ley del sector de hidrocarburos. En las receptoras conectadas a red interviene en las pruebas previas, la puesta en servicio y la inspección periódica.',
      cita: 'Reglamento, art. 3.h); ITC-ICG 07, apartado 3.5.1',
      url: BOE,
      moduloId: 'inspeccion',
    },
    {
      id: 'b-025',
      pregunta: '¿Qué es un organismo de control?',
      palabrasClave: ['organismo de control', 'organismo control', 'entidad de control', 'certificadora'],
      respuesta:
        'Es una entidad definida en la Ley de Industria y en el reglamento de infraestructura para la calidad y seguridad industrial. Se entiende autorizada para el cometido concreto que realiza.',
      cita: 'Reglamento, art. 3.r)',
      url: BOE,
      moduloId: 'que-es',
    },
    {
      id: 'b-026',
      pregunta: '¿Qué es una anomalía?',
      palabrasClave: ['anomalia', 'anomalía', 'fallo', 'defecto', 'problema'],
      respuesta:
        'Es un problema detectado en la inspección o revisión que se comunica al usuario en un informe. Todas las fugas son anomalía principal: si no se corrigen en el acto, se corta el gas y se precinta.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f)',
      url: BOE,
      moduloId: 'inspeccion',
    },
    {
      id: 'b-027',
      pregunta: '¿Por qué se dice 30 días en la puesta en servicio?',
      palabrasClave: ['30 dias', 'treinta dias', 'plazo', 'administracion', 'comunicacion'],
      respuesta:
        'El art. 5.7 fija ese plazo general para presentar documentación ante la Comunidad Autónoma tras la puesta en servicio. La ITC-ICG 07 matiza que las receptoras sin proyecto no requieren comunicación, aunque el suministrador debe tener la documentación disponible.',
      cita: 'Reglamento, art. 5.7; ITC-ICG 07, apartado 3.6',
      url: BOE,
      moduloId: 'puesta-servicio',
    },
    {
      id: 'b-028',
      pregunta: '¿Es cierto que la revisión es cada 5 años?',
      palabrasClave: ['5 años', 'cinco años', 'periodicidad', 'cada cuanto', 'inspeccion'],
      respuesta:
        'Sí. La ITC-ICG 07 fija cinco años para la inspección de receptoras desde red, para la parte común y para la revisión de las que no están alimentadas desde redes.',
      cita: 'ITC-ICG 07, apartados 4.1 y 4.2',
      url: BOE,
      moduloId: 'inspeccion',
    },
    {
      id: 'b-029',
      pregunta: '¿Qué significa que una botella sea de 15 kg?',
      palabrasClave: ['15 kg', '15kg', 'botella pequeña', 'envase', 'glp'],
      respuesta:
        'Es el límite de carga unitaria usado por el reglamento para varias reglas: la instalación receptora empieza en el regulador, la ITC-ICG 06 exige que la suma de envases no supere 300 kg y la revisión no es obligatoria si hay un solo envase con aparato móvil.',
      cita: 'Reglamento, art. 2.1.h); ITC-ICG 06, apartados 2.1 y 4',
      url: BOE,
      moduloId: 'glp-vivienda',
    },
    {
      id: 'b-030',
      pregunta: '¿Tengo que avisar si cambio un tramo de tubería?',
      palabrasClave: ['modificacion', 'modificación', 'cambio de trazado', 'obras', 'avisar'],
      respuesta:
        'Sí. Se considera modificación un cambio de material o trazado en más de 1 m, una ampliación de consumo o la sustitución de aparatos por otros de características distintas. La empresa instaladora lo comunica al suministrador.',
      cita: 'ITC-ICG 07, apartado 5',
      url: BOE,
      moduloId: 'puesta-servicio',
    },
    {
      id: 'b-031',
      pregunta: '¿Me tienen que dar un papel al poner en marcha la cocina?',
      palabrasClave: ['certificado de puesta en marcha', 'papel', 'cocina', 'aparato nuevo'],
      respuesta:
        'Sí. Quien haga la puesta en marcha debe emitir y entregar al cliente un certificado según el modelo de la ITC y archivarlo al menos cinco años.',
      cita: 'ITC-ICG 08, apartado 5.4',
      url: BOE,
      moduloId: 'aparatos',
    },
    {
      id: 'b-032',
      pregunta: 'Si hay un accidente, ¿cuánto tiempo tiene el suministrador para avisar?',
      palabrasClave: ['24 horas', 'accidente', 'notificacion', 'aviso', 'danos'],
      respuesta:
        'Lo antes posible y nunca más de 24 horas si hay daños importantes o víctimas. Después remite un informe en un plazo máximo de siete días.',
      cita: 'Reglamento, art. 14',
      url: BOE,
      moduloId: 'seguridad',
    },
  ],
  glosario: [
    {
      termino: 'Acometida interior',
      definicion:
        'Tuberías y accesorios entre la llave de acometida, sin contarla, y la llave o llaves del edificio, que sí se cuentan.',
      cita: 'Reglamento, art. 3.a)',
    },
    {
      termino: 'Anomalía principal',
      definicion:
        'Problema grave detectado en una inspección. Si no se puede corregir en el momento, se corta el gas y se precinta la parte afectada. Todas las fugas lo son.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f)',
    },
    {
      termino: 'Anomalía secundaria',
      definicion:
        'Problema menos grave que se comunica al usuario para que lo corrija. Las faltas de estanquidad de este tipo tienen quince días hábiles.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f)',
    },
    {
      termino: 'Aparato de gas',
      definicion: 'Aparato que utiliza combustibles gaseosos para funcionar.',
      cita: 'Reglamento, art. 2.1.i)',
    },
    {
      termino: 'Botella de GLP',
      definicion:
        'Envase metálico móvil que contiene gas licuado del petróleo. Una vez vacío se lleva a llenar para volver a usarse.',
      cita: 'Reglamento, art. 3.l)',
    },
    {
      termino: 'Certificado de instalación',
      definicion:
        'Documento que emite la empresa que ha ejecutado la instalación. Indica que se ha hecho conforme al reglamento y a la documentación técnica.',
      cita: 'Reglamento, art. 5.5.a)',
    },
    {
      termino: 'Certificado de puesta en marcha',
      definicion:
        'Papel que entrega al cliente quien pone en marcha un aparato, según el modelo de la ITC-ICG 08.',
      cita: 'ITC-ICG 08, apartado 5.4',
    },
    {
      termino: 'Cliente',
      definicion: 'Persona física o jurídica que tiene una relación contractual con un suministrador.',
      cita: 'Reglamento, art. 3.c)',
    },
    {
      termino: 'Combustible gaseoso',
      definicion:
        'Gas que puede usarse como combustible, incluido el hidrógeno en fase gaseosa según el reglamento.',
      cita: 'Reglamento, art. 3.d)',
    },
    {
      termino: 'Control administrativo',
      definicion:
        'Comprobación que puede hacer la Comunidad Autónoma en cualquier momento para verificar el cumplimiento de las reglas de seguridad.',
      cita: 'Reglamento, art. 7.3',
    },
    {
      termino: 'Control periódico',
      definicion:
        'Examen de una instalación para comprobar que cumple la normativa de seguridad y es apta para el uso.',
      cita: 'Reglamento, art. 3.g)',
    },
    {
      termino: 'Declaración responsable',
      definicion:
        'Documento previo con el que la empresa instaladora declara su categoría y que cumple los requisitos de la ITC-ICG 09.',
      cita: 'ITC-ICG 09, apartado 3.1',
    },
    {
      termino: 'Distribuidor',
      definicion:
        'Entidad de la Ley del sector de hidrocarburos que, entre otras cosas, interviene en la puesta en servicio y en la inspección de receptoras conectadas a red.',
      cita: 'Reglamento, art. 3.h)',
    },
    {
      termino: 'Empresa instaladora de gas',
      definicion:
        'Persona física o jurídica que monta, repara, mantiene y controla instalaciones de gas cumpliendo la ITC-ICG 09.',
      cita: 'Reglamento, art. 3.j)',
    },
    {
      termino: 'Envase de GLP',
      definicion: 'Depósito móvil de gases licuados del petróleo, como una botella o un botellón.',
      cita: 'Reglamento, art. 3.l)',
    },
    {
      termino: 'Estanquidad',
      definicion:
        'Cualidad de una instalación de no dejar escapar gas. Se comprueba con una prueba antes de entregar la instalación y en los controles periódicos.',
      cita: 'ITC-ICG 07, apartados 3.3 y 4.1',
    },
    {
      termino: 'Fuga',
      definicion:
        'Salida de gas de un punto donde no debería salir. Se considera anomalía principal y obliga a cortar y precintar si no se resuelve en el acto.',
      cita: 'ITC-ICG 07, apartado 4.1.1.f)',
    },
    {
      termino: 'Instalación común',
      definicion:
        'Parte de la instalación compartida por varios usuarios, entre la llave del edificio y las llaves de usuario.',
      cita: 'Reglamento, art. 3.o)',
    },
    {
      termino: 'Instalación individual',
      definicion: 'Parte de la instalación que alimenta a un solo usuario, hasta las llaves de conexión de los aparatos.',
      cita: 'Reglamento, art. 3.p)',
    },
    {
      termino: 'Instalación receptora',
      definicion:
        'Conjunto de tuberías y accesorios entre la llave de acometida y las llaves de conexión de los aparatos, con las exclusiones previstas en el reglamento.',
      cita: 'Reglamento, art. 2.1.h)',
    },
    {
      termino: 'Instalador de gas',
      definicion:
        'Persona con conocimientos teórico-prácticos y cualificación acreditada para realizar y supervisar operaciones de su categoría.',
      cita: 'ITC-ICG 09, apartado 2',
    },
    {
      termino: 'Llave de usuario',
      definicion: 'Llave que delimita el final de la instalación común y el inicio de la individual.',
      cita: 'Reglamento, art. 3.o) y p)',
    },
    {
      termino: 'Mantenimiento',
      definicion:
        'Cuidado y buen uso de la instalación y los aparatos para que sigan funcionando con el nivel de seguridad adecuado.',
      cita: 'Reglamento, art. 7.1',
    },
    {
      termino: 'Organismo de control',
      definicion:
        'Entidad autorizada para comprobar el cumplimiento de requisitos reglamentarios en el cometido que le corresponda.',
      cita: 'Reglamento, art. 3.r)',
    },
    {
      termino: 'Puesta en marcha',
      definicion:
        'Operaciones que verifican que un aparato funciona con el gas y la presión previstos y con una combustión dentro de los parámetros del fabricante.',
      cita: 'Reglamento, art. 3.t)',
    },
    {
      termino: 'Regulador',
      definicion:
        'Dispositivo que regula la presión del gas entre el envase y los aparatos. Su uso es obligatorio salvo en aparatos aprobados para presión directa.',
      cita: 'ITC-ICG 06, apartado 2.1',
    },
    {
      termino: 'Revisión periódica',
      definicion: 'Control periódico que no es inspección; en receptoras sin red lo encarga el titular a una empresa instaladora.',
      cita: 'Reglamento, art. 7.2; ITC-ICG 07, apartado 4.2',
    },
    {
      termino: 'Suministrador',
      definicion: 'Empresa que realiza el suministro de gas al cliente o al usuario.',
      cita: 'Reglamento, art. 3.u)',
    },
    {
      termino: 'Titular de una instalación',
      definicion: 'Persona física o jurídica propietaria o beneficiaria de la instalación.',
      cita: 'Reglamento, art. 3.v)',
    },
    {
      termino: 'Usuario',
      definicion: 'Persona física o jurídica que utiliza el gas para su consumo.',
      cita: 'Reglamento, art. 3.x)',
    },
  ],
}
