/**
 * Operaciones aritmeticas simples.
 */

/**
 * Divide `a` entre `b`.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {RangeError} Si `b` es cero.
 */
export function dividir(a, b) {
  if (b === 0) throw new RangeError('No se puede dividir entre cero');
  return a / b;
}

/**
 * Devuelve el promedio de una secuencia no vacia.
 * @param {Iterable<number>} valores
 * @returns {number}
 * @throws {RangeError} Si la secuencia esta vacia.
 */
export function promedio(valores) {
  const datos = [...valores];
  if (datos.length === 0) throw new RangeError('La secuencia no puede estar vacia');
  return datos.reduce((acc, n) => acc + n, 0) / datos.length;
}
