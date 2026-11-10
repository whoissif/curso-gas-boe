# Fuentes, metodología y limitaciones

Consulta: **10 de noviembre de 2026**. Importes en EUR con IVA incluido salvo que se indique lo contrario.

---

## 1. Ofertas de renting verificadas

| Proveedor | Versión | Plazo | Km/año | Entrada | Cuota | Seguro | Neu. | ITV | Fuente |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Toyota Easy Renting | 140H Advance | 48 | 10.000 | 4.583 € | 350 € | TR sin franquicia | No | No detallada | [toyota.es](https://www.toyota.es/promociones/toyota-c-hr-hybrid-140h-advance-easy-renting) |
| Toyota Easy Renting | 200H Advance | 48 | 10.000 | 5.769 € | 370 € | TR sin franquicia | No | No detallada | [toyota.es](https://www.toyota.es/promociones/toyota-c-hr-hybrid-200h-advance-easy-renting) |
| Toyota Easy Renting | 220PH Advance | 48 | 10.000 | 7.994 € | 370 € | TR sin franquicia | No | No detallada | [toyota.es](https://www.toyota.es/promociones/toyota-c-hr-hybrid-220ph-advance-easy-renting) |
| REVEL | 140H Advance | 36 | 15.000 | 0 € | 440 € | TR, franquicia 300 € | Sí | Sí | [driverevel.com](https://driverevel.com/es/es/coches/toyota-c-hr-hibrido-automatico-60df283c14b0b659b58d22e9_c81460e5f5) |
| REVEL | 220PH Advance | 36 | 15.000 | 0 € | 502 € | TR, franquicia 300 € | Sí | Sí | [driverevel.com](https://driverevel.com/es/es/toyota/c-hr) |
| Total Renting | 140H Advance | 48 | 15.000 | 0 € | 434,42 € + IVA | TR | Sí | Sí | [totalrenting.com](https://totalrenting.com/toyota-c-hr-advance-hybrid-140-e-cvt-ma/) |
| Total Renting | 140H Advance | 48 | 10.000 | 0 € | 413,96 € + IVA | TR | Sí | Sí | [totalrenting.com](https://totalrenting.com/toyota-c-hr-advance-hybrid-140-e-cvt-ma/) |
| Total Renting | 140H Advance | 60 | 15.000 | 0 € | 417,91 € + IVA | TR | Sí | Sí | [totalrenting.com](https://totalrenting.com/toyota-c-hr-advance-hybrid-140-e-cvt-ma/) |
| Swipcar | 220PH Advance | 48 | 10.000 | 0 € | 564 € | TR sin franquicia | No detalla | No detalla | [swipcar.com](https://swipcar.com/es/renting-toyota/c-hr/220ph-e-cvt-advance) |

Notas de normalización:

- **Total Renting** publica sin IVA. Se aplica el 21 %: 434,42 → 525,65 €/mes; 413,96 → 500,89;
  417,91 → 505,67.
- **REVEL** añade 1.000 km extra de regalo; no se computan para no inflar la comparación.
- Toyota publica las cuotas con IVA incluido.

### PVP al contado

| Versión | PVP | Consumo | Etiqueta |
| --- | --- | --- | --- |
| 140H Advance | 31.725 € | 5,2 l/100 km | ECO |
| 200H Advance | 33.690 € | 5,7 l/100 km | ECO |
| 220PH Advance | 35.725 € | 2,6 l/100 km + 9 kWh/100 km | 0 |

---

## 2. Compra financiada (Toyota Easy Plus, 48 meses)

| Versión | Entrada | Cuota | Última cuota | TIN | TAE | Total a plazos |
| --- | --- | --- | --- | --- | --- | --- |
| 140H | 10.931,20 € | 160 € | 17.435,54 € | 7,75 % | 8,99 % | 36.046,74 € |
| 200H | 11.679,50 € | 180 € | 11.948,35 € | 7,50 % | 8,73 % | 32.267,85 € |
| 220PH | 12.017,80 € | 200 € | 18.868,60 € | 7,75 % | 9,01 % | 40.486,40 € |

El **200H** se excluye del benchmark principal: su total a plazos (32.267,85 €) es inferior al
PVP (33.690 €), lo que implica incentivos o condiciones no detalladas. Usarlo como benchmark
falsearía la comparación.

---

## 3. Referencias de mercado (no usadas en el ranking)

| Fuente | Dato | Por qué no entra |
| --- | --- | --- |
| [coches.net](https://www.coches.net/renting/toyota/chr/) | 140H 36m/15k desde 440 €; 140H 48m/10k desde 491 €; 220PH 48m/10k desde 482 €; 220PH 48m/20k desde 553 € | No detalla entrada ni franquicia; es un agregador |
| [Carwow](https://www.carwow.es/toyota/c-hr/renting) | Desde 440 €/mes, coincide con REVEL | Duplica una oferta ya incluida |

---

## 4. Estimaciones propias y cómo se derivan

Todas están marcadas en la interfaz con la etiqueta **Estimado** o **Entrada simulada**.

### 4.1 Salto de 10.000 a 15.000 km/año: +5 %

Total Renting publica el mismo contrato a dos kilometrajes:

```
48 meses · 10.000 km → 413,96 €/mes (sin IVA)
48 meses · 15.000 km → 434,42 €/mes (sin IVA)
```

Incremento: `434,42 / 413,96 − 1 = +4,94 %` por 5.000 km adicionales.
Se aplica un factor lineal de `1 + 0,05 × (km − kmBase) / 5.000`, limitado entre 0,5 y 2,5.

### 4.2 Toyota a 36 meses: cuota de 48 × 1,04

Toyota no publica Easy Renting a 36 meses para este modelo. La escalera de Total Renting
permite estimar el efecto del plazo:

```
48 meses → 434,42 €   (15.000 km)
60 meses → 417,91 €   (15.000 km)
```

`417,91 / 434,42 − 1 = −3,8 %` por 12 meses adicionales. Se aplica el simétrico `+4 %` al pasar
de 48 a 36 meses, manteniendo la entrada publicada de 48 meses.

Es una aproximación: la entrada de un contrato a 36 meses podría ser distinta.

### 4.3 Sin entrada y entrada personalizada

La entrada publicada se financia al **7,75 % TIN** (el tipo de Toyota Easy Plus) durante el
mismo plazo y se reparte en la cuota:

```
cuota_extra = entrada / factor_anualidad(meses, 7,75 %)
```

En «entrada personalizada» se financia la diferencia entre la entrada publicada y la elegida.
Son simulaciones: ningún proveedor ha publicado estas condiciones.

### 4.4 Valor residual

| Plazo | Residual sobre PVP |
| --- | --- |
| 3 años | 62 % |
| 4 años | 54 % |
| 5 años | 46 % |

Interpolación lineal entre esos puntos. Es la variable más frágil del modelo y es ajustable en
el informe.

### 4.5 Costes de uso (compra y extras del renting)

| Concepto | Valor | Nota |
| --- | --- | --- |
| Gasolina | 1,55 €/l | Ajustable |
| Electricidad | 0,18 €/kWh | Solo 220PH |
| Seguro a todo riesgo | 650 €/año | Solo si la oferta no lo incluye |
| Mantenimiento | 350 €/año | Solo si la oferta no lo incluye |
| Neumáticos | 0,0125 €/km | 187,50 €/año a 15.000 km |
| ITV | 40 € | A partir del 4.º año si no está incluida |
| Impuesto de circulación | 120 €/año | Solo si la oferta no lo incluye |
| Provisión de franquicia | 0 €/año por defecto | Ajustable para REVEL (300 €) |

---

## 5. Metodología de cálculo

### 5.1 Coste total equivalente

Para cada oferta se construye el flujo mensual:

```
t = 0        → entrada ajustada
t = 1..n     → cuota + extras_no_cubiertos/12 + energía/12 + ITV (si procede)
```

Se descuenta a la tasa anual elegida (3 % por defecto):

```
VPN = Σ flujo_t / (1 + r)^t ,  r = tasa / 12
```

Y se convierte en cuota mensual equivalente:

```
€/mes equivalente = VPN / factor_anualidad(n, tasa)
factor_anualidad = (1 − (1 + r)^−n) / r
```

También se muestra el **total nominal** (suma sin descontar), que es lo que se paga de verdad.

### 5.2 Compra al contado

```
t = 0        → PVP
t = 1..n     → seguro + mantenimiento + neumáticos + ITV + impuesto + energía
t = n        → − valor residual (PVP × % residual)
```

### 5.3 Compra financiada

```
t = 0        → entrada
t = 1..n     → cuota + costes de uso
t = n        → última cuota − valor residual
```

### 5.4 Por qué VPN y no suma simple

Una entrada de 4.583 € hoy no cuesta lo mismo que 4.583 € repartidos en 48 meses. Sin
descontar, el renting con entrada alta parecería más barato de lo que es. El VPN iguala el
valor del dinero en el tiempo y permite comparar ofertas con estructuras de pago distintas.

---

## 6. Contradicciones y hallazgos

### Neumáticos en Toyota

La landing de Easy Renting muestra el icono de neumáticos incluidos, pero el texto legal de
cada promoción dice literalmente: **«Sustitución de neumáticos no incluida»**. El estudio
aplica el texto legal y provisiona 0,0125 €/km para las tres ofertas de Toyota. Si el concesionario
los incluyera, el coste de Toyota bajaría unos 16 €/mes.

### El 200H financiado

El total a plazos publicado es inferior al PVP. No se usa como benchmark para no mezclar
descuentos no detallados con el coste del dinero.

### El 220PH y el ahorro energético

Con 2,6 l/100 km y 9 kWh/100 km, el coste energético del 220PH es de unos 64 €/mes a 15.000 km,
frente a 101 €/mes del 140H. El ahorro de ~37 €/mes no compensa una cuota y una entrada más
altas en todas las ofertas comparadas.

---

## 7. Ofertas descartadas

| Oferta | Motivo |
| --- | --- |
| Toyota C-HR Style / GR Sport | Sin ofertas públicas verificadas de renting a 15.000 km en la fecha del estudio |
| Kinto One 180H Advance | C-HR de ocasión (180H), 354 €/mes sin IVA a 48 meses; no es vehículo nuevo |
| Renting Partner 140H Active | Modelo anterior y sin stock; 510 €/mes + IVA a 60 meses |
| Toyota Easy Renting 36 meses | No publicada; las variantes del informe son estimaciones marcadas |

---

## 8. Limitaciones

- Foto fija del 10/11/2026. Las promociones Toyota caducan el 30/11/2026.
- Los precios de renting para particulares cambian con frecuencia y dependen de stock y campaña.
- Las estimaciones de plazo y kilometraje son lineales; las tarifas reales pueden tener escalones.
- El valor residual es una hipótesis, no una cotización de compraventa.
- No se modelan fiscalidad de autónomos o empresas, ni deducciones, ni IVA deducible.
- El informe no es asesoramiento financiero.
