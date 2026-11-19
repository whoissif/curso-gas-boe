# Espacio de trabajo de desarrollo

Configuracion lista para desarrollar proyectos con OpenCode, agentes especializados y el toolchain instalado en este equipo.

## Que hay aqui

| Archivo | Para que sirve |
| --- | --- |
| `opencode.jsonc` | Configuracion de OpenCode: agente por defecto y permisos |
| `AGENTS.md` | Convenciones que siguen todos los agentes |
| `ESTADO.md` | Estado persistente para reanudar trabajo tras límites de sesión |
| `.opencode/agents/` | Agente `runner` y subagentes `reviewer`, `tester` y `docs` |
| `.opencode/commands/` | Comandos `/review`, `/test`, `/doc`, `/commit`, `/doctor`, `/checkpoint`, `/resume` y `/cerrar` |
| `scripts/doctor.ps1` | Verifica que todo este instalado |
| `scripts/nuevo-proyecto.ps1` | Crea un proyecto con la estructura base |
| `docs/ENTORNO.md` | Detalle del entorno y pendientes |
| `projects/curso-gas-boe/docs/DESPLIEGUE.md` | Pasos para publicar el curso en GitHub + Vercel |

## Primeros pasos

1. Abre una terminal nueva (para que el PATH incluya lo recien instalado).
2. Verifica el entorno:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doctor.ps1
   ```

3. Crea un proyecto con el scaffold:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts/nuevo-proyecto.ps1 -Nombre mi-proyecto
   ```

4. Inicia OpenCode y usa `/doctor` para verificar el entorno.

## Continuidad

`runner` fuerza un resumen cada 8 pasos; `/checkpoint`, `/resume` y `/cerrar` mantienen `ESTADO.md`. La compactación automática está configurada en `opencode.jsonc`, pero `ESTADO.md` es la fuente de verdad.

## Pendiente despues del reinicio

- Docker Desktop: abrir una vez para aceptar terminos y habilitar WSL2.
- Android Studio: abrir una vez y completar el asistente del SDK.

Detalle completo en `docs/ENTORNO.md`.

## Despliegue

El curso `projects/curso-gas-boe/` se publica en GitHub + Vercel siguiendo `projects/curso-gas-boe/docs/DESPLIEGUE.md`.
