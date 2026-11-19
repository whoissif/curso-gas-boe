---
description: Guarda el estado real del trabajo y solicita compactación manual de la sesión
agent: runner
---

Actualiza `ESTADO.md` con el estado real del trabajo: marca lo completado, deja la próxima acción concreta y registra los bloqueos.

Estado local (insertado automáticamente):

!`git status --short; git diff --stat`

Después de escribir `ESTADO.md`, solicita la compactación manual solo si puedes obtener el `id` de la sesión actual desde el entorno de OpenCode; no lo adivines:

`opencode api post /api/session/<id>/compact --data '{"id":"cp-<timestamp>"}'`

Si `opencode` no está en el PATH o no puedes obtener el `id`, registra el bloqueo en `ESTADO.md`, no reintentes y confirma que la compactación queda pendiente. No pegues la salida cruda de la compactación.
