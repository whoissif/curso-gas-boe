# ESTADO — workspace principal

> Estado real al 2026-11-18. Fuente de verdad para reanudar tras un límite de contexto o cuota.

## Objetivo

Workspace operativo con continuidad basada en OpenCode puro **y** curso online interactivo `projects/curso-gas-boe/` entregado sobre el RD 919/2006 para jóvenes con poca formación.

## Alcance

- Incluye: desmantelar el sistema Copilot; estado persistente y checkpoints; curso React/Vite sobre instalaciones receptoras de gas en viviendas.
- Excluye: el Copilot del arranque de Windows; commits y push; redes de distribución, GNL y estaciones de servicio (fuera del alcance elegido).

## Decisiones

- 2026-11-18: se desmanteló el sistema Copilot tras el fallo de autenticación del navegador; no se reintentó. Backup en `C:\Users\root\AppData\Local\Temp\opencode\copilot-dismantle-20261118-165235`.
- 2026-11-18: `ESTADO.md` pasa a ser la fuente de verdad; `runner` con `steps: 8` es el agente principal por defecto.
- 2026-11-18: `opencode.jsonc` usa `compaction` automática (`buffer: 20%`, `keep.tokens: 20000`); no se fijó `agents.compaction.model` para no inventar un ID de modelo.
- 2026-11-18: las plantillas de comandos usan `;` en lugar de `&&` (PowerShell 5.1) y la compactación manual es condicional.
- 2026-11-18: norma fuente confirmada: **Real Decreto 919/2006**, Reglamento técnico de distribución y utilización de combustibles gaseosos, consolidado a 03/09/2025 (`BOE-A-2006-15345-consolidado.pdf`).
- 2026-11-18: alcance elegido para el curso: **instalaciones receptoras y vivienda** (gas natural y GLP).
- 2026-11-18: formato elegido: **App React/Vite + TypeScript**, sin backend.
- 2026-11-18: práctica elegida: **70+ tests explicados, casos guiados, buscador con cita del BOE y modo examen con progreso**.
- 2026-11-18: `npm` está bloqueado por la política de scripts de PowerShell; se usa `pnpm` (12.16.1).
- 2026-11-18: la compactación manual **no se solicitó**: el ID de sesión está disponible en `OPENCODE_SESSION_ID`, pero la CLI `opencode` no está en el PATH. No se adivinó ni se reintentó.

## Completado

- [x] Backup y eliminación del sistema Copilot y limpieza de referencias.
- [x] Verificación: JSONC válido, sintaxis PowerShell correcta, `doctor.ps1` → «Todo instalado», `grep` sin referencias de delegación.
- [x] Creación de `ESTADO.md`, `.opencode/agents/runner.md` y comandos `/checkpoint`, `/resume`, `/cerrar`.
- [x] Corrección de las tres plantillas de comando: `&&` → `;` y compactación manual sin ID inventado.
- [x] Extracción del PDF a `C:/Users/root/AppData/Local/Temp/opencode/boe919.txt` (96 páginas, ~324 KB) con `pypdf==7.1.1`.
- [x] Índice normativo verificado: ITC-ICG 07 (receptoras), 08 (aparatos), 09 (instaladores), 06 (envases GLP para uso propio).
- [x] Scaffold de `projects/curso-gas-boe/`: `package.json`, tsconfigs, `vite.config.ts`, `index.html`.
- [x] Contrato de datos en `src/types.ts` y lógica pura en `src/lib/quiz.ts`.
- [x] Interfaz `src/App.tsx`: inicio, módulos, tests con feedback, casos, buscador, examen con temporizador, persistencia y citas al BOE.
- [x] Punto de entrada `src/main.tsx` y diseño responsive en `src/styles.css`.
- [x] Contenido normativo real en `src/data/contenido.ts`: 8 módulos, 72 preguntas, 10 casos, 32 entradas de buscador y 30 términos de glosario, con citas a los arts. 1-14 e ITC-ICG 06/07/08/09.
- [x] `docs/FUENTES.md` con enlace oficial, fecha de consolidación, mapa de módulos y aviso de validez jurídica.
- [x] Correcciones del subagente `reviewer` aplicadas: validación de `localStorage`, temporizador por `Date.now()`, botones de fallos deshabilitados sin fallos, tamaño de examen dinámico, `trim()` en el buscador, `aria-current`, `role="radio"`/`radiogroup`, `aria-expanded`/`aria-controls`, `aria-label` y `:focus-visible`.
- [x] Pruebas reforzadas en `tests/data.test.ts`: volumen mínimo, IDs únicos, una sola respuesta correcta por pregunta y pertenencia a módulo existente.
- [x] **Validación final ejecutada**: `pnpm test` → 2 archivos / 8 pruebas en verde; `pnpm build` → correcto; `pnpm lint` → sin errores.
- [x] **Revisión visual en navegador** (`pnpm dev` → `http://127.0.0.1:5173`): 8 módulos, 72 preguntas, 10 casos, buscador con 7 resultados para «inspección», examen de 20 preguntas con reloj visible a 00:00 al iniciar, sin errores de consola ni desbordamiento horizontal a 800 px.
- [x] Configuración de despliegue preparada: `packageManager=pnpm@12.16.1`, `engines.node=22.x`, `.nvmrc`, `vercel.json` (framework Vite, `pnpm build`, salida `dist`, install frozen), `docs/DESPLIEGUE.md` y enlace en `README.md`.
- [x] Validación de despliegue en verde tras actualizar el lockfile: `pnpm install --frozen-lockfile`; `pnpm test` 8/8; `pnpm build` correcto; `pnpm lint` sin errores; `vercel.json` JSON válido.
- [x] Autenticación de GitHub CLI completada tras rellenar el código de dispositivo en el navegador integrado y confirmar la autorización.
- [x] Commits Conventional Commits `feat(curso-gas): configurar despliegue en Vercel` (77 archivos) y `docs: registrar publicación en GitHub y paso a Vercel`; ambos en `origin/main` y con el remoto sincronizado.
- [x] Despliegue en Vercel completado en producción. Root Directory `projects/curso-gas-boe`, preset detectado desde `vercel.json` (Vite, `pnpm install --frozen-lockfile`, `pnpm build`, Output `dist`).
- [x] URL pública verificada: `https://curso-gas-29efeja5x-whoissif27.vercel.app`. Carga sin errores de consola; navegación por las seis secciones; buscador con 7 resultados para «inspección»; examen iniciado con 4 opciones y reloj a 00:00.
- [x] Estado local verificado con `git status --short`: 13 entradas sin seguimiento (`.gitignore`, `.opencode/`, `AGENTS.md`, PDF, `ESTADO.md`, `README.md`, `docs/`, `opencode.jsonc`, `projects/curso-gas-boe/`, `projects/ejemplo-node/`, `projects/ejemplo-python/`, `projects/web-app/`, `scripts/`).
- [x] Servidor de desarrollo detenido: proceso PID 13580 y sus hijos terminados con `taskkill /T /F`; puerto 5173 verificado como libre.

## Pendiente

- [ ] **Compactación manual pendiente**: requiere CLI `opencode` en el PATH. No se ejecutó el endpoint `--data '{"id":"cp-<timestamp>"}'`.
- [ ] Validar `/checkpoint` una vez que la CLI `opencode` esté disponible.
- [ ] Opcional: configurar `agents.compaction.model` con un ID de modelo real.

## Próxima acción

Lote cerrado. La única acción pendiente es la compactación manual: hacer disponible la CLI `opencode` en el PATH y, usando solo `OPENCODE_SESSION_ID`, ejecutar `opencode api post /api/session/$env:OPENCODE_SESSION_ID/compact --data '{"id":"cp-<timestamp>"}'`. No adivinar el ID ni reintentar sin la CLI.

## Comandos de prueba

```powershell
# Workspace
git status --short; git diff --stat
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doctor.ps1

# Curso (validación final ya ejecutada con resultado correcto)
cd projects/curso-gas-boe; pnpm test; pnpm build; pnpm lint
```

## Archivos tocados

- `ESTADO.md` — este estado, sincronizado con el estado local real.
- `AGENTS.md`, `README.md`, `opencode.jsonc`, `.gitignore`, `scripts/*` — estado anterior, sin seguimiento en git.
- `.opencode/agents/runner.md`, `.opencode/commands/checkpoint.md`, `resume.md`, `cerrar.md` — estado anterior.
- `BOE-A-2006-15345-consolidado.pdf` — fuente, sin modificar.
- `projects/curso-gas-boe/package.json`, `pnpm-lock.yaml`, `tsconfig*.json`, `vite.config.ts`, `index.html`.
- `projects/curso-gas-boe/src/types.ts`, `src/lib/quiz.ts`, `src/data/contenido.ts` (definitivo).
- `projects/curso-gas-boe/src/App.tsx`, `src/main.tsx`, `src/styles.css`.
- `projects/curso-gas-boe/tests/data.test.ts`, `tests/quiz.test.ts`.
- `projects/curso-gas-boe/docs/FUENTES.md`, `projects/curso-gas-boe/docs/DESPLIEGUE.md`.
- `projects/curso-gas-boe/package.json` (`packageManager`, `engines`), `pnpm-lock.yaml` (actualizado), `vercel.json`, `.nvmrc`.
- `README.md` — enlace a la guía de despliegue.
- `projects/curso-gas-boe/dist/` — artefactos generados por el build.
- `projects/ejemplo-node/`, `projects/ejemplo-python/`, `projects/web-app/` — preexistentes, sin seguimiento en git.

## Bloqueos

- **Compactación manual pendiente**: `opencode` no está en el PATH del shell. El ID de sesión sí se obtuvo de `OPENCODE_SESSION_ID`, pero no se llamó al endpoint ni se adivinó el ID. No se reintentó.
- Resuelto: autenticación de GitHub CLI. Los dos primeros intentos `--web` expiraron y sus procesos se detuvieron; el tercero se completó rellenando el código en el navegador integrado y confirmando la autorización. Ya hay remote, repo y push. El push del segundo commit quedó colgado; se detuvo el proceso, se ejecutó `gh auth setup-git` y el push terminó correctamente.
- Resuelto: todo el workspace quedó commiteado y pusheado; `git status --short` sale vacío y local/remoto están en el mismo commit.
- Resuelto: servidor de desarrollo en `http://127.0.0.1:5173` (PID 13580) detenido tras la revisión visual; puerto 5173 libre.
- Resuelto: `npm.ps1` bloqueado por ExecutionPolicy → se usa `pnpm`.
- Resuelto: límite de pasos anterior → se reanudó y cerró el lote.
- Resuelto: `TS6133` por `setInicioExamen` sin usar → corregido al iniciar el temporizador en `iniciarExamen` y `repetirFallos`.
