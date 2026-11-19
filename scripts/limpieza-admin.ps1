<#
.SYNOPSIS
    Limpieza y reparacion de la unidad C: de este equipo (requiere administrador).

.DESCRIPTION
    Pasos:
      0. Informe de salud: SMART, BitLocker y bit "sucio" de NTFS de C:.
         Si C: esta marcada como sucia (causa tipica del triangulo amarillo sobre
         el icono de la unidad en el Explorador de archivos), se programa un
         chkdsk sin conexion para el siguiente arranque.
      1. Eliminar C:\Windows.old (copia del sistema previa a la ultima
         actualizacion grande de Windows).
      2. Vaciar la cache de descargas de Windows Update.
      3. DISM /RestoreHealth y sfc /scannow (reparacion del almacen de
         componentes y de archivos de sistema; indicado tras fallos de
         actualizacion tipo 0x800f0983).

.PARAMETER LogFile
    Ruta del archivo de registro (transcripcion) que genera el script.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\limpieza-admin.ps1 -LogFile C:\temp\limpieza.log

.NOTES
    Creado con OpenCode el 2026-11-10. Al terminar conviene REINICIAR el equipo.
#>
param(
    [string]$LogFile = "$PSScriptRoot\limpieza-admin.log"
)

$ErrorActionPreference = 'Continue'

$esAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $esAdmin) {
    Write-Output 'ERROR: este script debe ejecutarse en un PowerShell elevado (administrador).'
    exit 1
}

Start-Transcript -LiteralPath $LogFile -Force

function Get-MB($ruta) {
    $m = Get-ChildItem $ruta -Recurse -Force -ErrorAction SilentlyContinue |
         Where-Object { -not $_.PSIsContainer } | Measure-Object Length -Sum
    if ($m.Sum) { [math]::Round($m.Sum / 1MB, 1) } else { 0 }
}

$libreAntes = [math]::Round((Get-Volume -DriveLetter C).SizeRemaining / 1GB, 2)
"Espacio libre en C: al empezar: $libreAntes GB"

"=== PASO 0/4: salud de la unidad y bit sucio ==="
try {
    Get-PhysicalDisk | Get-StorageReliabilityCounter -ErrorAction SilentlyContinue |
        Select-Object DeviceId, Wear, ReadErrorsUncorrected, WriteErrorsUncorrected, Temperature, PowerOnHours |
        Format-List | Out-String
} catch { "No se pudo leer SMART: $($_.Exception.Message)" }

manage-bde -status C:

$dirty = (fsutil dirty query C: 2>&1 | Out-String).Trim()
"fsutil dirty query C: -> $dirty"
if ($dirty -match 'sucio|Dirty' -and $dirty -notmatch 'limpi[oa]|Clean') {
    'La unidad esta marcada como SUCIA (motivo tipico del triangulo amarillo en el icono de C:).'
    'Programando reparacion (chkdsk sin conexion) para el siguiente arranque...'
    try {
        Repair-Volume -DriveLetter C -OfflineScanAndFix -ErrorAction Stop
        'Repair-Volume -OfflineScanAndFix programado correctamente.'
    } catch {
        "Repair-Volume fallo: $($_.Exception.Message)"
        'Intentando chkdsk C: /f...'
        "S`nY`n" | chkdsk.exe C: /f
    }
}

"=== PASO 1/4: eliminar C:\Windows.old ==="
if (Test-Path C:\Windows.old) {
    "Tamano aproximado de Windows.old: $(Get-MB C:\Windows.old) MB"
    Remove-Item -LiteralPath C:\Windows.old -Recurse -Force -ErrorAction SilentlyContinue
    if (Test-Path C:\Windows.old) {
        'Quedan restos protegidos: tomando propiedad y reintentando (puede tardar varios minutos)...'
        takeown /F C:\Windows.old /R /D Y 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) { takeown /F C:\Windows.old /R /D S 2>&1 | Out-Null }
        icacls C:\Windows.old /grant "*S-1-5-32-544:(OI)(CI)F" /T /C /Q 2>&1 | Out-Null
        Remove-Item -LiteralPath C:\Windows.old -Recurse -Force -ErrorAction SilentlyContinue
        if (Test-Path C:\Windows.old) { cmd /c "rd /s /q C:\Windows.old" 2>&1 | Out-Null }
    }
    if (Test-Path C:\Windows.old) {
        'ADVERTENCIA: quedan restos de Windows.old; se podran borrar tras un reinicio o desde el Liberador de espacio en disco.'
    } else {
        'Windows.old eliminado.'
    }
} else {
    'Windows.old no existe (ya eliminado).'
}

"=== PASO 2/4: cache de descargas de Windows Update ==="
'Deteniendo servicios wuauserv y bits...'
Stop-Service -Name wuauserv -Force -ErrorAction SilentlyContinue
Stop-Service -Name bits -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
$cacheAntes = Get-MB C:\Windows\SoftwareDistribution\Download
Remove-Item C:\Windows\SoftwareDistribution\Download\* -Recurse -Force -ErrorAction SilentlyContinue
$cacheDespues = Get-MB C:\Windows\SoftwareDistribution\Download
"Cache de Windows Update: $cacheAntes MB -> $cacheDespues MB"
Start-Service -Name bits -ErrorAction SilentlyContinue
Start-Service -Name wuauserv -ErrorAction SilentlyContinue
'Servicios de Windows Update reiniciados.'

"=== PASO 3/4: DISM /RestoreHealth (repara el almacen de componentes) ==="
DISM.exe /Online /Cleanup-Image /RestoreHealth
"DISM termino con codigo: $LASTEXITCODE (0 = correcto)"

"=== PASO 4/4: sfc /scannow (repara archivos de sistema) ==="
sfc.exe /scannow
"sfc termino con codigo: $LASTEXITCODE (0 = correcto)"

"=== RESUMEN FINAL ==="
$dirtyFinal = (fsutil dirty query C: 2>&1 | Out-String).Trim()
"fsutil dirty query C: -> $dirtyFinal"
$libreDespues = [math]::Round((Get-Volume -DriveLetter C).SizeRemaining / 1GB, 2)
"Espacio libre en C: al terminar: $libreDespues GB (antes: $libreAntes GB)"
'RECUERDA: reinicia el equipo para aplicar la reparacion y completar la actualizacion pendiente.'

Stop-Transcript
exit 0
