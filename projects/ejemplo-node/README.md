# ejemplo-node

Paquete Node.js en formato ESM con dos operaciones aritmeticas: `dividir` y `promedio`.
No tiene dependencias externas y usa el runner de pruebas incluido en Node.

## Que hace

`src/calculadora.js` exporta dos funciones:

| Funcion | Entrada | Devuelve | Lanza |
| --- | --- | --- | --- |
| `dividir(a, b)` | Dos numeros | El cociente `a / b` | `RangeError` si `b` es `0` |
| `promedio(valores)` | Un iterable de numeros no vacio | La media aritmetica | `RangeError` si el iterable esta vacio |

`promedio` acepta cualquier iterable (array, `Set`, generador) y lo expande una sola vez, asi que tambien funciona con generadores de un solo uso. Al expandirlo, evita pasarle generadores infinitos.

## Requisitos

- Node.js 26 o superior (probado con 26.13.0 LTS).
- pnpm 9 o superior (el `pnpm-lock.yaml` usa `lockfileVersion: '9.0'`; probado con 12.16.1).

Comprueba las versiones antes de empezar:

```powershell
node --version
pnpm --version
```

## Instalacion

Desde la raiz del proyecto:

```powershell
cd projects/ejemplo-node
pnpm install
```

El paquete no declara dependencias, por lo que `pnpm install` solo prepara `node_modules` y valida el lockfile. No hace falta ningun paso de compilacion: los archivos `.js` se ejecutan directamente porque `package.json` declara `"type": "module"`.

## Uso de la API

Guarda este archivo como `ejemplo.js` en la raiz del proyecto y ejecutalo con `node ejemplo.js`:

```js
// ejemplo.js
import { dividir, promedio } from './src/calculadora.js';

console.log(dividir(10, 2)); // 5
console.log(dividir(1, 4)); // 0.25
console.log(promedio([2, 4, 6])); // 4
console.log(promedio(new Set([2, 4, 6]))); // 4

function* valores() {
  yield 2;
  yield 4;
  yield 6;
}

console.log(promedio(valores())); // 4
```

```powershell
node ejemplo.js
```

La importacion es relativa (`./src/calculadora.js`) porque el paquete no declara un campo `exports`; no uses `import ... from 'ejemplo-node'`.

### Manejar el error de division

```js
// ejemplo-error.js
import { dividir } from './src/calculadora.js';

try {
  dividir(1, 0);
} catch (error) {
  if (error instanceof RangeError) {
    console.error(error.message); // No se puede dividir entre cero
  }
}
```

```powershell
node ejemplo-error.js
```

## Como correr las pruebas

```powershell
pnpm test
```

El script `test` de `package.json` ejecuta `node --test`, que descubre los archivos `*.test.js` del proyecto. Las pruebas usan `node:test` y `node:assert/strict`, sin frameworks adicionales.

Para ejecutar solo un archivo:

```powershell
node --test test/calculadora.test.js
```

## Estructura de carpetas

```
ejemplo-node/
├─ package.json            # nombre, version y script test (ESM)
├─ pnpm-lock.yaml          # lockfile v9.0, sin dependencias
├─ README.md               # este archivo
├─ src/
│  └─ calculadora.js       # dividir y promedio
├─ test/
│  └─ calculadora.test.js  # pruebas con node:test
└─ node_modules/           # generado por pnpm install (no se versiona)
```

## Errores comunes

### `RangeError: No se puede dividir entre cero`

Lo lanza `dividir(a, 0)`. Tambien se dispara con `-0`, porque `-0 === 0` en JavaScript. Valida el divisor antes de llamar a la funcion si el cero es un caso esperado. Guarda este archivo como `ejemplo-validacion.js` en la raiz del proyecto:

```js
// ejemplo-validacion.js
import { dividir } from './src/calculadora.js';

function dividirSeguro(a, b) {
  if (b === 0) return null;
  return dividir(a, b);
}

console.log(dividirSeguro(10, 2)); // 5
console.log(dividirSeguro(10, 0)); // null
```

### `RangeError: La secuencia no puede estar vacia`

Lo lanza `promedio` cuando el iterable no produce ningun valor: `promedio([])`, `promedio(new Set())` o un generador que no llega a `yield`. Comprueba que haya datos antes de calcular la media.

### `TypeError: ... is not iterable`

No es un `RangeError`, pero aparece si pasas a `promedio` algo que no es iterable, por ejemplo un numero suelto: `promedio(5)`. Pasa siempre un array, un `Set` o un generador.

### `SyntaxError: Cannot use import statement outside a module`

Ocurre si ejecutas el codigo desde una carpeta sin `"type": "module"` en su `package.json`, o si guardas el ejemplo con extension `.js` fuera del proyecto. Guarda los ejemplos en la raiz de `ejemplo-node` o usa la extension `.mjs`.

## Notas para mantener el README

- Si agregas funciones a `src/calculadora.js`, actualiza la tabla de la seccion "Que hace".
- Si cambias los mensajes de error, actualiza la seccion "Errores comunes": las pruebas solo verifican el tipo `RangeError`, no el texto.
