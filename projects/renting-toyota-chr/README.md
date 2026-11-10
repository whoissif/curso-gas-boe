# Toyota C-HR híbrido · renting vs compra

Estudio cuantitativo de las ofertas de renting para particulares en España del Toyota C-HR
híbrido (140H, 200H y 220PH, acabado Advance), con benchmark de compra al contado y financiada.

El entregable es **`index.html`**: un informe autocontenido, gráfico e interactivo que funciona
sin conexión, sin servidor y sin dependencias externas.

---

## Abrir el informe

Doble clic en `index.html`. No hace falta instalar nada ni levantar un servidor: los datos,
los estilos y los cálculos están embebidos en el propio archivo.

El informe incluye:

- Ranking por coste total equivalente, con desglose de entrada, cuota, extras y energía.
- Dispersión entre cuota nominal y coste real.
- Flujo de caja acumulado frente a la compra al contado y financiada.
- Comparativa por plazo (36 / 48 / 60 meses) y curva de cruce.
- Tabla ordenable y exportación a CSV.
- Panel de supuestos ajustable en tiempo real (energía, seguro, residual, descuento…).
- Fichas de fuentes, referencias de mercado y descartes.

---

## Resultados con los supuestos base

15.000 km/año, entrada publicada, descuento del 3 % anual, IVA incluido.
Cifras en **€/mes equivalente** (no es la cuota nominal; ver metodología).

| Plazo | Mejor renting | Coste | Compra al contado 140H | Coste | Diferencia |
| --- | --- | --- | --- | --- | --- |
| 36 meses | REVEL · 140H Advance | 541 € | 140H Advance | 609 € | Renting −69 €/mes |
| 48 meses | Toyota Easy Renting · 140H Advance | 586 € | 140H Advance | 576 € | Compra −10 €/mes |
| 60 meses | Total Renting · 140H Advance | 606 € | 140H Advance | 555 € | Compra −51 €/mes |

**Lectura rápida**

- **A 3 años gana el renting con claridad**: unos 69 €/mes, unos 2.500 € en el periodo.
- **A 4 años hay empate técnico**: 10 €/mes de diferencia (480 € en total) es menos que el
  margen de error de estimar la cuota a 15.000 km. No es una diferencia robusta.
- **A 5 años gana la compra**: el coche ya está pagado y conserva valor.
- **La compra financiada es la peor opción a 48 meses** (618 €/mes): el TAE del 8,99 % y la
  última cuota pesan más que el ahorro de no inmovilizar el capital.
- **Pedir «sin entrada» encarece el Toyota 140H** de 586 a 596 €/mes: financiar la entrada al
  7,75 % cuesta más que darla.
- **El 220PH no compensa**: su cuota y su entrada son más altas y el ahorro energético no cubre
  la diferencia salvo que se enchufe y se haga la mayor parte de los kilómetros en eléctrico.

El punto de cruce con los supuestos base está en torno a **46 meses**.

---

## Qué se ha verificado y qué se ha estimado

De las 12 ofertas del modelo, **9 son reales** (precio público consultado el 10/11/2026) y
**3 son estimaciones propias** claramente marcadas en la interfaz.

Reales:

- Toyota Easy Renting 140H, 200H y 220PH a 48 meses y 10.000 km.
- REVEL 140H y 220PH a 36 meses y 15.000 km.
- Total Renting 140H a 48 meses/15.000 km, 48 meses/10.000 km y 60 meses/15.000 km.
- Swipcar 220PH a 48 meses y 10.000 km.

Estimadas:

- Toyota 140H, 200H y 220PH a 36 meses. Se derivan de la cuota de 48 meses aplicando un
  factor +4 %, obtenido de la propia escalera de Total Renting (48 → 60 meses supone −3,8 %).
- El salto de 10.000 a 15.000 km en todas las ofertas que se publican a 10.000 km: +5 % por
  cada 5.000 km, derivado de Total Renting (413,96 € → 434,42 €, +4,94 %).
- Los modos «sin entrada» y «entrada personalizada»: la entrada se financia al 7,75 % TIN y se
  reparte en la cuota. Son simulaciones, no ofertas publicadas.

Detalle completo en [`docs/FUENTES.md`](docs/FUENTES.md).

---

## Metodología en una frase

Se compara el **coste total de disponer del coche durante el plazo**, no la cuota:

```
TCO = entrada + cuotas + energía + seguro + mantenimiento + neumáticos + ITV + impuestos
```

Todo se descuenta a la tasa elegida (3 % por defecto) y se convierte en una cuota mensual
equivalente dividiendo por el factor de anualidad. Así una entrada de 4.583 € se compara en
igualdad de condiciones con una oferta sin entrada.

En la compra se descuenta el **valor residual** estimado al final del periodo, porque el coche
sigue siendo tuyo. En el renting no se recupera nada.

---

## Estructura del proyecto

```
renting-toyota-chr/
├─ index.html          # entregable final autocontenido
├─ build.mjs           # concatena src/ en index.html
├─ package.json        # scripts y dependencia de test (playwright)
├─ src/
│  ├─ data.js          # ofertas, versiones, financiación y fuentes
│  ├─ engine.js        # TCO, VPN, anualidades, residual y benchmark
│  ├─ app.js           # estado, UI y gráficos SVG
│  ├─ styles.css       # tema visual y responsive
│  └─ template.html    # estructura base con marcadores
├─ tests/
│  ├─ engine.test.mjs  # comprobaciones numéricas del motor
│  ├─ ui.check.mjs     # navegador real: consola, DOM y responsive
│  └─ print.mjs        # volcado de rankings por plazo
├─ tools/
│  └─ audit.mjs        # auditoría de layout y desbordamientos
└─ docs/
   └─ FUENTES.md       # fuentes, supuestos y limitaciones
```

## Comandos

```bash
npm install        # solo para las pruebas de navegador
npm run build      # regenera index.html desde src/
npm test           # comprobaciones del motor de cálculo
npm run check      # carga index.html en Chromium y valida la UI
npm run all        # build + test + check
```

`npm run check` necesita Chromium de Playwright:

```bash
npx playwright install chromium
```

---

## Limitaciones

- **No hay ofertas públicas verificadas de Style ni GR Sport** a 15.000 km. No se estiman para
  no inventar precios; el ranking se limita a Advance.
- **Toyota no publica Easy Renting a 36 meses**: esa variante es una estimación marcada.
- **A 60 meses solo hay una oferta real** (Total Renting). El resto de proveedores no publica
  ese plazo para este modelo.
- **Toyota muestra el icono de neumáticos incluidos en la landing, pero el texto legal de cada
  promoción dice «Sustitución de neumáticos no incluida»**. El modelo provisiona neumáticos
  para Toyota (0,0125 €/km) y lo documenta.
- **El 200H financiado se excluye del benchmark principal**: su precio total a plazos publicado
  es inferior al PVP, lo que indica incentivos no detallados.
- **Kinto One y Renting Partner se descartan**: el primero es un C-HR de ocasión (180H); el
  segundo corresponde al modelo anterior sin stock.
- Los precios son una foto fija del 10/11/2026 y las promociones Toyota caducan el 30/11/2026.
- El informe no es asesoramiento financiero ni una oferta comercial.

## Aviso sobre las cifras

Los importes se han normalizado a IVA incluido. Total Renting publica sin IVA y se ha aplicado
el 21 %. Las cuotas de Toyota se publican con IVA. Las estimaciones de kilometraje y plazo son
lineales y pueden desviarse de la tarifa real de cada proveedor.
