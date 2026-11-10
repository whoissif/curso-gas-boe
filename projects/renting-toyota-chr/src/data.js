/* Datos del estudio. Precios consultados el 10/11/2026.
   Todas las cuotas se normalizan a IVA incluido (21 %). */
(function (global) {
  "use strict";

  const META = {
    titulo: "Toyota C-HR híbrido: renting vs compra",
    subtitulo:
      "Estudio cuantitativo de las ofertas de renting para particulares en España, con benchmark de compra al contado y financiada.",
    fecha: "10/11/2026",
    vigencia: "Promociones Toyota válidas hasta el 30/11/2026 en Península y Baleares.",
    moneda: "EUR",
    iva: 0.21,
    kmReferencia: 15000,
    plazos: [36, 48, 60]
  };

  const DEFAULTS = {
    horizon: 48,
    entryMode: "published",
    customEntry: 3000,
    km: 15000,
    includeEstimates: true,
    fuel: 1.55,
    electricity: 0.18,
    discount: 3,
    residual3: 62,
    residual4: 54,
    residual5: 46,
    insurance: 650,
    maintenance: 350,
    tireKm: 0.0125,
    itv: 40,
    tax: 120,
    franchiseProvision: 0,
    entryRate: 7.75,
    benchmarkVersion: "140H"
  };

  const VERSIONS = {
    "140H": {
      pvp: 31725,
      consumo: 5.2,
      electrico: 0,
      etiqueta: "ECO",
      potencia: 140,
      color: "#22d3ee"
    },
    "200H": {
      pvp: 33690,
      consumo: 5.7,
      electrico: 0,
      etiqueta: "ECO",
      potencia: 197,
      color: "#a78bfa"
    },
    "220PH": {
      pvp: 35725,
      consumo: 2.6,
      electrico: 9,
      etiqueta: "0",
      potencia: 223,
      color: "#34d399"
    }
  };

  /* Financiación Toyota Easy Plus (48 meses, TIN 7,75 %, IVA incl.).
     Solo se usa como benchmark de compra financiada. */
  const FINANCE = {
    "140H": {
      entrada: 10931.2,
      meses: 48,
      cuota: 160,
      ultima: 17435.54,
      total: 36046.74,
      tin: 7.75,
      tae: 8.99,
      fuenteId: "toyota-easy-plus-140"
    },
    "200H": {
      entrada: 11679.5,
      meses: 48,
      cuota: 180,
      ultima: 11948.35,
      total: 32267.85,
      tin: 7.5,
      tae: 8.73,
      fuenteId: "toyota-easy-plus-200",
      nota:
        "La promoción publicada del 200H implica un total a plazos inferior al PVP; se excluye del benchmark principal para no mezclar incentivos no detallados."
    },
    "220PH": {
      entrada: 12017.8,
      meses: 48,
      cuota: 200,
      ultima: 18868.6,
      total: 40486.4,
      tin: 7.75,
      tae: 9.01,
      fuenteId: "toyota-easy-plus-220"
    }
  };

  const OFFERS = [
    {
      id: "toyota-140-48-10",
      proveedor: "Toyota Easy Renting",
      proveedorCorto: "Toyota",
      version: "140H",
      acabado: "Advance",
      meses: 48,
      kmBase: 10000,
      entrada: 4583,
      cuota: 350,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: false,
        itv: false,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 0,
      tipo: "real",
      fuenteId: "toyota-140-renting",
      color: "#e5002b",
      notas:
        "Cuota publicada a 10.000 km/año. A 15.000 km se estima +5 % (elasticidad observada en Total Renting: 413,96 → 434,42 para +5.000 km). Neumáticos no incluidos según el texto legal, aunque la landing muestre el icono. ITV no detallada: se provisiona 40 €/año desde el 4.º año."
    },
    {
      id: "toyota-200-48-10",
      proveedor: "Toyota Easy Renting",
      proveedorCorto: "Toyota",
      version: "200H",
      acabado: "Advance",
      meses: 48,
      kmBase: 10000,
      entrada: 5769,
      cuota: 370,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: false,
        itv: false,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 0,
      tipo: "real",
      fuenteId: "toyota-200-renting",
      color: "#e5002b",
      notas:
        "Cuota publicada a 10.000 km/año; a 15.000 km se estima +5 %. Misma dotación que el 140H: seguro TR sin franquicia, mantenimiento, asistencia e impuestos; neumáticos no incluidos según el texto legal."
    },
    {
      id: "toyota-220-48-10",
      proveedor: "Toyota Easy Renting",
      proveedorCorto: "Toyota",
      version: "220PH",
      acabado: "Advance",
      meses: 48,
      kmBase: 10000,
      entrada: 7994,
      cuota: 370,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: false,
        itv: false,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 0,
      tipo: "real",
      fuenteId: "toyota-220-renting",
      color: "#e5002b",
      notas:
        "Cuota publicada a 10.000 km/año; a 15.000 km se estima +5 %. Híbrido enchufable: el cálculo añade energía eléctrica además de gasolina. Neumáticos no incluidos según el texto legal."
    },
    {
      id: "toyota-140-36-est",
      proveedor: "Toyota Easy Renting",
      proveedorCorto: "Toyota",
      version: "140H",
      acabado: "Advance",
      meses: 36,
      kmBase: 15000,
      entrada: 4583,
      cuota: 382.2,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: false,
        itv: false,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 0,
      tipo: "estimado",
      fuenteId: "toyota-140-renting",
      color: "#e5002b",
      notas:
        "Estimación propia, no publicada: cuota de 48 meses a 15.000 km (367,50 €) × 1,04 por plazo. El factor 1,04 se deriva de Total Renting (48 meses 434,42 € → 60 meses 417,91 €, −3,8 % por 12 meses). Entrada publicada de 48 meses."
    },
    {
      id: "toyota-200-36-est",
      proveedor: "Toyota Easy Renting",
      proveedorCorto: "Toyota",
      version: "200H",
      acabado: "Advance",
      meses: 36,
      kmBase: 15000,
      entrada: 5769,
      cuota: 404.04,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: false,
        itv: false,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 0,
      tipo: "estimado",
      fuenteId: "toyota-200-renting",
      color: "#e5002b",
      notas:
        "Estimación propia: cuota de 48 meses a 15.000 km (388,50 €) × 1,04 por plazo. No es una oferta publicada; sirve para comparar el horizonte de 3 años."
    },
    {
      id: "toyota-220-36-est",
      proveedor: "Toyota Easy Renting",
      proveedorCorto: "Toyota",
      version: "220PH",
      acabado: "Advance",
      meses: 36,
      kmBase: 15000,
      entrada: 7994,
      cuota: 404.04,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: false,
        itv: false,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 0,
      tipo: "estimado",
      fuenteId: "toyota-220-renting",
      color: "#e5002b",
      notas:
        "Estimación propia: cuota de 48 meses a 15.000 km (388,50 €) × 1,04 por plazo. No es una oferta publicada; sirve para comparar el horizonte de 3 años."
    },
    {
      id: "revel-140-36-15",
      proveedor: "REVEL",
      proveedorCorto: "REVEL",
      version: "140H",
      acabado: "Advance",
      meses: 36,
      kmBase: 15000,
      entrada: 0,
      cuota: 440,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: true,
        itv: true,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 300,
      tipo: "real",
      fuenteId: "revel-140",
      color: "#22d3ee",
      notas:
        "Oferta real a 36 meses y 15.000 km/año, sin entrada. Incluye seguro a todo riesgo con franquicia de 300 €, mantenimiento, averías, neumáticos, impuestos, asistencia y coche de sustitución. Añade 1.000 km extra de regalo (no computados)."
    },
    {
      id: "revel-220-36-15",
      proveedor: "REVEL",
      proveedorCorto: "REVEL",
      version: "220PH",
      acabado: "Advance",
      meses: 36,
      kmBase: 15000,
      entrada: 0,
      cuota: 502,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: true,
        itv: true,
        impuestos: true,
        asistencia: true,
        sustitucion: true
      },
      franquicia: 300,
      tipo: "real",
      fuenteId: "revel-220",
      color: "#22d3ee",
      notas:
        "Oferta real a 36 meses y 15.000 km/año, sin entrada. Incluye seguro a todo riesgo con franquicia de 300 €, mantenimiento, averías, neumáticos, impuestos, asistencia y coche de sustitución."
    },
    {
      id: "total-140-48-15",
      proveedor: "Total Renting",
      proveedorCorto: "Total Renting",
      version: "140H",
      acabado: "Advance",
      meses: 48,
      kmBase: 15000,
      entrada: 0,
      cuota: 525.65,
      cuotaSinIva: 434.42,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: true,
        itv: true,
        impuestos: true,
        asistencia: true,
        sustitucion: false
      },
      franquicia: null,
      tipo: "real",
      fuenteId: "total-renting",
      color: "#a78bfa",
      notas:
        "Precio publicado sin IVA: 434,42 €/mes. Normalizado a IVA incluido: 525,65 €/mes. Sin entrada, seguro TR, mantenimiento, cambio de neumáticos e impuestos. Franquicia del seguro no publicada. Coche de sustitución no detallado."
    },
    {
      id: "total-140-60-15",
      proveedor: "Total Renting",
      proveedorCorto: "Total Renting",
      version: "140H",
      acabado: "Advance",
      meses: 60,
      kmBase: 15000,
      entrada: 0,
      cuota: 505.67,
      cuotaSinIva: 417.91,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: true,
        itv: true,
        impuestos: true,
        asistencia: true,
        sustitucion: false
      },
      franquicia: null,
      tipo: "real",
      fuenteId: "total-renting",
      color: "#a78bfa",
      notas:
        "Precio publicado sin IVA: 417,91 €/mes. Normalizado a IVA incluido: 505,67 €/mes. Sin entrada, seguro TR, mantenimiento, cambio de neumáticos e impuestos. Franquicia del seguro no publicada."
    },
    {
      id: "total-140-48-10",
      proveedor: "Total Renting",
      proveedorCorto: "Total Renting",
      version: "140H",
      acabado: "Advance",
      meses: 48,
      kmBase: 10000,
      entrada: 0,
      cuota: 500.89,
      cuotaSinIva: 413.96,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: true,
        itv: true,
        impuestos: true,
        asistencia: true,
        sustitucion: false
      },
      franquicia: null,
      tipo: "real",
      fuenteId: "total-renting",
      color: "#a78bfa",
      notas:
        "Precio publicado sin IVA: 413,96 €/mes. Normalizado a IVA incluido: 500,89 €/mes. A 15.000 km se estima +5 %. Sin entrada, seguro TR, mantenimiento, neumáticos e impuestos."
    },
    {
      id: "swipcar-220-48-10",
      proveedor: "Swipcar",
      proveedorCorto: "Swipcar",
      version: "220PH",
      acabado: "Advance",
      meses: 48,
      kmBase: 10000,
      entrada: 0,
      cuota: 564,
      incluye: {
        seguro: true,
        mantenimiento: true,
        neumaticos: true,
        itv: true,
        impuestos: true,
        asistencia: true,
        sustitucion: false
      },
      franquicia: 0,
      tipo: "real",
      fuenteId: "swipcar-220",
      color: "#f59e0b",
      notas:
        "Oferta real a 48 meses y 10.000 km/año, sin entrada. Seguro a todo riesgo sin franquicia, mantenimiento, averías, impuestos y asistencia. A 15.000 km se estima +5 %. No detalla coche de sustitución ni ITV."
    }
  ];

  const SOURCES = [
    {
      id: "toyota-140-renting",
      nombre: "Toyota España · C-HR Hybrid 140 Advance · Easy Renting",
      url: "https://www.toyota.es/promociones/toyota-c-hr-hybrid-140h-advance-easy-renting",
      fecha: "10/11/2026",
      tipo: "Oferta oficial",
      detalle:
        "350 €/mes con IVA, 48 meses, 10.000 km/año, entrada 4.583 €. Seguro TR sin franquicia, mantenimiento integral, asistencia, impuestos y vehículo de sustitución. El texto legal indica: «Sustitución de neumáticos no incluida»."
    },
    {
      id: "toyota-200-renting",
      nombre: "Toyota España · C-HR Hybrid 200H Advance · Easy Renting",
      url: "https://www.toyota.es/promociones/toyota-c-hr-hybrid-200h-advance-easy-renting",
      fecha: "10/11/2026",
      tipo: "Oferta oficial",
      detalle:
        "370 €/mes con IVA, 48 meses, 10.000 km/año, entrada 5.769 €. Misma dotación legal que el 140H: seguro TR sin franquicia, mantenimiento, asistencia e impuestos; neumáticos no incluidos."
    },
    {
      id: "toyota-220-renting",
      nombre: "Toyota España · C-HR Plug-in Hybrid 220 Advance · Easy Renting",
      url: "https://www.toyota.es/promociones/toyota-c-hr-hybrid-220ph-advance-easy-renting",
      fecha: "10/11/2026",
      tipo: "Oferta oficial",
      detalle:
        "370 €/mes con IVA, 48 meses, 10.000 km/año, entrada 7.994 €. Seguro TR sin franquicia, mantenimiento, asistencia e impuestos; neumáticos no incluidos según el texto legal."
    },
    {
      id: "toyota-easy-plus-140",
      nombre: "Toyota España · C-HR Hybrid 140 Advance · Toyota Easy Plus",
      url: "https://www.toyota.es/promociones/toyota-c-hr-140h-advance-easy-plus",
      fecha: "10/11/2026",
      tipo: "Financiación",
      detalle:
        "PVP al contado 31.725 €. Entrada 10.931,20 €, 48 cuotas de 160 € y última cuota 17.435,54 €. TIN 7,75 %, TAE 8,99 %, precio total a plazos 36.046,74 €. Incluye 4 años de mantenimiento y garantía."
    },
    {
      id: "toyota-easy-plus-200",
      nombre: "Toyota España · C-HR Hybrid 200H Advance · Toyota Easy Plus",
      url: "https://www.toyota.es/promociones/toyota-c-hr-200h-advance-easy-plus",
      fecha: "10/11/2026",
      tipo: "Financiación",
      detalle:
        "PVP al contado 33.690 €. Entrada 11.679,50 €, 48 cuotas de 180 € y última cuota 11.948,35 €. TIN 7,50 %, TAE 8,73 %. Se cita como referencia, pero no se usa en el benchmark principal."
    },
    {
      id: "toyota-easy-plus-220",
      nombre: "Toyota España · C-HR Plug-in Hybrid 220 Advance · Toyota Easy Plus",
      url: "https://www.toyota.es/promociones/toyota-c-hr-220ph-advance-easy-plus",
      fecha: "10/11/2026",
      tipo: "Financiación",
      detalle:
        "PVP al contado 35.725 €. Entrada 12.017,80 €, 48 cuotas de 200 € y última cuota 18.868,60 €. TIN 7,75 %, TAE 9,01 %, precio total a plazos 40.486,40 €."
    },
    {
      id: "revel-140",
      nombre: "REVEL · Toyota C-HR 140H Advance",
      url: "https://driverevel.com/es/es/coches/toyota-c-hr-hibrido-automatico-60df283c14b0b659b58d22e9_c81460e5f5",
      fecha: "10/11/2026",
      tipo: "Oferta real",
      detalle:
        "440 €/mes IVA incl., 36 meses, 15.000 km/año, sin entrada. Seguro TR con franquicia de 300 €, mantenimiento, averías, neumáticos, impuestos, asistencia y coche de sustitución."
    },
    {
      id: "revel-220",
      nombre: "REVEL · Toyota C-HR 220PH Advance",
      url: "https://driverevel.com/es/es/toyota/c-hr",
      fecha: "10/11/2026",
      tipo: "Oferta real",
      detalle:
        "502 €/mes IVA incl., 36 meses, 15.000 km/año, sin entrada. Misma dotación que el 140H, con seguro TR y franquicia de 300 €."
    },
    {
      id: "total-renting",
      nombre: "Total Renting · Toyota C-HR Advance Hybrid 140 e-CVT",
      url: "https://totalrenting.com/toyota-c-hr-advance-hybrid-140-e-cvt-ma/",
      fecha: "10/11/2026",
      tipo: "Oferta real",
      detalle:
        "Precios sin IVA: 434,42 €/mes a 48 meses y 15.000 km; 417,91 €/mes a 60 meses y 15.000 km; 413,96 €/mes a 48 meses y 10.000 km. Sin entrada, seguro TR, mantenimiento, neumáticos e impuestos. Normalizados a IVA incluido en el estudio."
    },
    {
      id: "swipcar-220",
      nombre: "Swipcar · Toyota C-HR 220PH e-CVT Advance",
      url: "https://swipcar.com/es/renting-toyota/c-hr/220ph-e-cvt-advance",
      fecha: "10/11/2026",
      tipo: "Oferta real",
      detalle:
        "564 €/mes IVA incl., 48 meses, 10.000 km/año, sin entrada. Seguro TR sin franquicia, mantenimiento, averías, impuestos y asistencia. A 15.000 km se estima +5 %."
    },
    {
      id: "coches-net",
      nombre: "coches.net · Renting Toyota C-HR",
      url: "https://www.coches.net/renting/toyota/chr/",
      fecha: "10/11/2026",
      tipo: "Referencia de mercado",
      detalle:
        "Agregador: 140H Advance 36 meses/15.000 km desde 440 €/mes; 140H 48 meses/10.000 km desde 491 €/mes; 220PH 48 meses/10.000 km desde 482 €/mes; 220PH 48 meses/20.000 km desde 553 €/mes. No se usa en el ranking porque no detalla entrada ni franquicia."
    },
    {
      id: "carwow",
      nombre: "Carwow · Renting Toyota C-HR",
      url: "https://www.carwow.es/toyota/c-hr/renting",
      fecha: "10/11/2026",
      tipo: "Referencia de mercado",
      detalle:
        "Renting para particulares desde 440 €/mes; la oferta coincide con la de REVEL (36 meses, 15.000 km). Carwow declara seguro TR, mantenimiento, neumáticos, averías, impuesto de circulación e ITV incluidos."
    },
    {
      id: "kinto",
      nombre: "Kinto One · Toyota C-HR 180H Advance (ocasión)",
      url: "https://www.kinto-mobility.eu/es/es/kinto-one/renting/toyota-CHRnegro180starbaix-used/ca1024",
      fecha: "10/11/2026",
      tipo: "Descartada",
      detalle:
        "48 meses, 15.000 km, sin entrada, 354 €/mes sin IVA. Es un C-HR de ocasión (180H), no un vehículo nuevo, por lo que no es comparable con el resto del estudio."
    }
  ];

  const MARKET = [
    {
      etiqueta: "Rango de mercado 140H · 48 meses · 10.000 km",
      valor: "491 – 501 €/mes",
      detalle: "coches.net (491 €/mes) y Total Renting normalizado (500,89 €/mes)."
    },
    {
      etiqueta: "Rango de mercado 220PH · 48 meses · 10.000 km",
      valor: "482 – 564 €/mes",
      detalle: "coches.net (482 €/mes) y Swipcar (564 €/mes)."
    },
    {
      etiqueta: "Rango de mercado 140H · 36 meses · 15.000 km",
      valor: "440 €/mes",
      detalle: "REVEL, replicado por Carwow y coches.net."
    }
  ];

  const DISCARDED = [
    {
      nombre: "Toyota C-HR Style / GR Sport",
      motivo:
        "No se han encontrado ofertas públicas verificadas de renting para estos acabados a 15.000 km/año en la fecha del estudio. No se estiman para no inventar precios; el ranking se limita a Advance."
    },
    {
      nombre: "Kinto One 180H Advance",
      motivo:
        "Vehículo de ocasión (180H), no nuevo. 354 €/mes sin IVA a 48 meses y 15.000 km; no comparable."
    },
    {
      nombre: "Renting Partner 140H Active",
      motivo:
        "60 meses, 10.000 km, 510 €/mes + IVA, pero corresponde al modelo anterior y sin stock. Se descarta por no ser el C-HR actual."
    },
    {
      nombre: "Toyota Easy Renting a 36 meses",
      motivo:
        "La promoción publicada solo detalla 48 meses y 10.000 km. Las variantes a 36 meses del estudio son estimaciones propias y están marcadas como tales."
    }
  ];

  global.CHR_DATA = {
    META,
    DEFAULTS,
    VERSIONS,
    FINANCE,
    OFFERS,
    SOURCES,
    MARKET,
    DISCARDED
  };
})(typeof window !== "undefined" ? window : globalThis);
