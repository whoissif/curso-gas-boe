# Crea un proyecto con la estructura base del workspace.
param(
    [Parameter(Mandatory = $true)]
    [string]$Nombre
)

$ErrorActionPreference = 'Stop'

if ($Nombre -notmatch '^[A-Za-z0-9][A-Za-z0-9._-]*$') {
    throw 'El nombre solo puede contener letras, numeros, punto, guion y guion bajo, y empezar por letra o numero.'
}

$workspace = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$destino = Join-Path $workspace (Join-Path 'projects' $Nombre)
if (Test-Path $destino) {
    throw "Ya existe el proyecto en $destino"
}

New-Item -ItemType Directory -Force -Path (Join-Path $destino 'src'), (Join-Path $destino 'tests') | Out-Null

$agents = @'
# Reglas de __NOMBRE__

Este proyecto hereda las instrucciones del `AGENTS.md` raiz del workspace.
'@

$estado = @'
# ESTADO — __NOMBRE__

## Objetivo

Una frase con el resultado concreto esperado.

## Alcance

- Incluye: ...
- Excluye: ...

## Decisiones

- YYYY-MM-DD: decision y motivo breve.

## Completado

- [x] ...

## Pendiente

- [ ] ...

## Proxima accion

Verbo concreto + ruta:linea o archivo. Si no queda nada: Ninguna: proyecto cerrado.

## Comandos de prueba

```powershell
# Ejemplo: pnpm test  (o uv run pytest)
```

## Archivos tocados

- ruta — que cambio.

## Bloqueos

- Ninguno | descripcion concreta y decision tomada.
'@

$readme = @'
# __NOMBRE__

## Estado

Nuevo proyecto creado con la estructura base del workspace.

## Estructura

```
src/       codigo fuente
tests/     pruebas
ESTADO.md  continuidad entre sesiones
```

## Pruebas

Detecta el stack y ejecuta su comando de pruebas antes de dar cualquier tarea por terminada.
'@

$gitignore = @'
node_modules/
.venv/
venv/
__pycache__/
.env
.env.*
!.env.example
'@

$agents.Replace('__NOMBRE__', $Nombre) | Set-Content -Path (Join-Path $destino 'AGENTS.md') -Encoding UTF8
$estado.Replace('__NOMBRE__', $Nombre) | Set-Content -Path (Join-Path $destino 'ESTADO.md') -Encoding UTF8
$readme.Replace('__NOMBRE__', $Nombre) | Set-Content -Path (Join-Path $destino 'README.md') -Encoding UTF8
$gitignore | Set-Content -Path (Join-Path $destino '.gitignore') -Encoding UTF8

Write-Host "Proyecto creado: $destino"
Write-Host 'Siguiente paso: revisa ESTADO.md y usa /checkpoint, /resume o /cerrar.'
