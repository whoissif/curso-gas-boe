---
description: Prepara un commit con mensaje estilo Conventional Commits
agent: build
---

Prepara un commit con los cambios actuales.

Estado:

!`git status --short`

Resumen de cambios:

!`git diff --stat`

Diff completo:

!`git diff`

Haz esto:

1. Agrupa los cambios por intencion; si conviene, propone varios commits.
2. Redacta mensajes en formato Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).
3. No hagas `git push`.
4. Pide confirmacion antes de ejecutar cualquier comando que modifique el historial.
