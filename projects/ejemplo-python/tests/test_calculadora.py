from collections.abc import Iterator

import pytest

from ejemplo_python.calculadora import dividir, promedio


def test_dividir() -> None:
    assert dividir(10, 2) == 5


def test_dividir_entre_cero() -> None:
    with pytest.raises(ValueError):
        dividir(1, 0)


def test_promedio() -> None:
    assert promedio([2, 4, 6]) == 4


def test_promedio_vacio() -> None:
    with pytest.raises(ValueError):
        promedio([])


def test_promedio_acepta_generador() -> None:
    def valores() -> Iterator[float]:
        yield 2
        yield 4
        yield 6

    generador = valores()

    # Un generador es un iterable de un solo uso: promedio() debe consumirlo
    # una sola vez y aun asi devolver el resultado correcto.
    assert promedio(generador) == 4

    # Tras consumirlo, el generador esta agotado.
    assert list(generador) == []
