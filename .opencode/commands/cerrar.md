---
description: Verifica las pruebas y cierra el trabajo marcando ESTADO.md como done
agent: runner
---

Ejecuta el comando de pruebas indicado en `ESTADO.md` (detecta el stack si no está). Solo si pasa, marca todas las tareas como completadas y escribe `Próxima acción: Ninguna: proyecto cerrado`. Si falla, registra el error concreto en `Bloqueos` y no cierres.

Resultado local (insertado automáticamente):

!`git status --short; git diff --stat`
