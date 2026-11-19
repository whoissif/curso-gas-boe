---
description: Reanuda el trabajo desde ESTADO.md tras una sesión nueva o cuota agotada
agent: runner
---

Lee `ESTADO.md` y reanuda exactamente la primera tarea de `Pendiente`.

Contexto local (insertado automáticamente):

!`git status --short; git diff --stat`

Si `ESTADO.md` no existe o no tiene una próxima acción concreta, detente y pregunta. No rehagas trabajo ya marcado como completado. Trabaja un lote de 3 a 5 tareas, ejecuta las pruebas y vuelve a actualizar `ESTADO.md`.
