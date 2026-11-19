"""Operaciones aritmeticas simples."""

from collections.abc import Iterable


def dividir(a: float, b: float) -> float:
    """Divide ``a`` entre ``b``.

    Lanza ``ValueError`` si ``b`` es cero.
    """
    if b == 0:
        raise ValueError("No se puede dividir entre cero")
    return a / b


def promedio(valores: Iterable[float]) -> float:
    """Devuelve el promedio de una secuencia no vacia.

    Lanza ``ValueError`` si la secuencia esta vacia.
    """
    datos = list(valores)
    if not datos:
        raise ValueError("La secuencia no puede estar vacia")
    return sum(datos) / len(datos)
