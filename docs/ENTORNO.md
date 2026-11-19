# Entorno de desarrollo

Instalado el 2026-11-05 en Windows 11 Pro con `winget` (instalacion elevada).

## Herramientas

| Herramienta | Version | Notas |
| --- | --- | --- |
| Git | 2.56.0 | Incluye Git Bash y credencial manager |
| Node.js | 26.13.0 (LTS) | Node 26 ya no incluye Corepack |
| npm | 11.20.0 | Incluido con Node |
| pnpm | 12.16.1 | Binario independiente en `%LOCALAPPDATA%\pnpm` |
| Python | 3.12.10 | Con pip; usar `uv` para entornos |
| uv | 0.13.7 | Gestor de entornos y paquetes Python |
| VS Code | 1.143.1 | Instalacion de usuario |
| GitHub CLI | 2.103.3 | Falta `gh auth login` |
| Docker | 29.9.2 | Docker Desktop; servicio aun detenido |
| WSL | 3.0.3.0 | Instalado sin distribucion |
| Android Studio | AI-262.10968.63.2622.16730706 | Trae su propio Java (JBR) |
| winget | 1.29.290 | Gestor de paquetes |

## Variables de entorno

- `PNPM_HOME` = `C:\Users\root\AppData\Local\pnpm`
- `PATH` de usuario incluye `%LOCALAPPDATA%\pnpm`

Abre una terminal nueva para que los cambios de PATH surtan efecto.

## Pendiente

1. **Reiniciar Windows**: hay un reinicio pendiente por WSL2 y Docker Desktop.
2. **Docker Desktop**: abrirlo una vez para aceptar terminos y completar la configuracion.
3. **Android Studio**: abrirlo una vez y completar el asistente del SDK.
4. **Git**: configurar identidad (`user.name` y `user.email`).
5. **GitHub CLI**: ejecutar `gh auth login` para autenticar.
6. **WSL**: opcional, instalar una distribucion con `wsl --install -d Ubuntu`.

## Verificar

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doctor.ps1
```

O dentro de OpenCode: `/doctor`.

## Instalar algo mas

```powershell
winget search <nombre>
winget install --id <paquete> -e
```

Paquetes utiles segun el proyecto:

| Necesidad | Paquete winget |
| --- | --- |
| PostgreSQL local | `PostgreSQL.PostgreSQL` |
| Redis (via WSL o Memurai) | `Memurai.MemuraiDeveloper` |
| Flutter | `Google.Flutter` |
| .NET SDK | `Microsoft.DotNet.SDK.10` |
| PowerShell 7 | `Microsoft.PowerShell` |
