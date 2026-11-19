# Instrucciones del proyecto

Este es el espacio de trabajo principal para desarrollar proyectos con OpenCode en este equipo.

## Entorno

- Windows 11 + PowerShell 5.1 (por defecto) y PowerShell 7 si esta disponible.
- Toolchain instalado con `winget`: Git, Node.js LTS, Python 3.12, VS Code, GitHub CLI, uv.
- Contenedores: Docker Desktop + WSL2 (requiere reinicio tras la instalacion).
- Movil: Android Studio (requiere reinicio y configuracion inicial del SDK).

## Estructura

```
.
├─ opencode.jsonc          # configuracion de OpenCode (permisos, compaction)
├─ AGENTS.md               # estas instrucciones
├─ ESTADO.md               # continuidad entre sesiones
├─ .opencode/
│  ├─ agents/              # runner, reviewer, tester, docs
│  └─ commands/            # /review, /test, /doc, /commit, /doctor, /checkpoint, /resume, /cerrar
├─ scripts/
│  ├─ doctor.ps1           # diagnostico del entorno
│  └─ nuevo-proyecto.ps1   # scaffold basico de proyecto
└─ docs/
   └─ ENTORNO.md           # que hay instalado y como verificarlo
```

Cada proyecto nuevo va en su propia carpeta dentro de este espacio de trabajo.

## Convenciones de trabajo

- Responde en espanol, salvo que el codigo o la documentacion del proyecto usen otro idioma.
- Antes de cambios grandes, propone un plan corto y espera confirmacion.
- No inventes APIs ni versiones: verifica en el codigo o en la documentacion oficial.
- Nunca escribas secretos en el repositorio. Usa `.env` (ignorado por git) y variables de entorno.
- Ejecuta las pruebas antes de dar una tarea por terminada.
- Commits en formato Conventional Commits y sin `git push` automatico.

## Continuidad de trabajo

- Todo trabajo que pueda pasar de una sesión mantiene `ESTADO.md` actualizado: objetivo, decisiones, completado, pendiente, próxima acción, pruebas y bloqueos.
- Usa `/checkpoint` al cerrar un lote, `/resume` al reanudar y `/cerrar` al terminar. La compactación es auxiliar; `ESTADO.md` manda.

## Herramientas por stack

| Stack | Comandos |
| --- | --- |
| Web / Node | `pnpm install`, `pnpm dev`, `pnpm test`, `pnpm build` |
| Python | `uv sync`, `uv run pytest`, `uv run python` |
| Contenedores | `docker compose up -d`, `docker compose logs -f` |
| Movil | Android Studio o `flutter run` si el proyecto lo usa |

## Subagentes disponibles

- `runner`: agente principal con checkpoints cada 8 pasos.
- `reviewer`: revision de solo lectura, reporta bugs y riesgos.
- `tester`: ejecuta pruebas y solo edita archivos de test.
- `docs`: escribe y actualiza documentacion.

Usalos explicitamente cuando aporten (por ejemplo: "usa el subagente reviewer").
