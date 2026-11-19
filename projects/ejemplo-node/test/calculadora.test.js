import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dividir, promedio } from '../src/calculadora.js';

test('dividir devuelve el cociente', () => {
  assert.equal(dividir(10, 2), 5);
});

test('dividir lanza RangeError si el divisor es cero', () => {
  assert.throws(() => dividir(1, 0), RangeError);
});

test('promedio calcula la media', () => {
  assert.equal(promedio([2, 4, 6]), 4);
});

test('promedio lanza RangeError con una secuencia vacia', () => {
  assert.throws(() => promedio([]), RangeError);
});

test('promedio acepta un generador de un solo uso', () => {
  function* valores() {
    yield 2;
    yield 4;
    yield 6;
  }

  assert.equal(promedio(valores()), 4);
});
