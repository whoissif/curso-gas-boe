<#
.SYNOPSIS
    Desactiva el cifrado de la unidad C: (BitLocker "en espera de activacion")
    y espera a que termine el descifrado.

.DESCRIPTION
    El portatil se cifro automaticamente al instalar Windows, pero la proteccion
    nunca se activo (sin protectores de clave). Eso deja la unidad "cifrada pero
    sin proteger" y el Explorador muestra el triangulo amarillo sobre el icono
    de C:. Este script ejecuta `manage-bde -off C:` (descifrado en segundo plano,
    sin perdida de datos) y consulta el estado cada 30 s hasta que el porcentaje
    cifrado llega a 0 %, o hasta agotar 45 min.

.PARAMETER LogFile
    Ruta del registro (transcripcion).

.NOTES
    Creado con OpenCode el 2026-11-12. Requiere elevacion (UAC).
    Al terminar conviene REINICIAR para aplicar las tareas pendientes.
#>
param(
    [string]$LogFile = "$PSScriptRoot\bitlocker-off.log"
)

$ErrorActionPreference = 'Continue'

$esAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $esAdmin) {
    Write-Output 'ERROR: este script debe ejecutarse en un PowerShell elevado (administrador).'
    exit 1
}

Start-Transcript -LiteralPath $LogFile -Force

'Estado inicial:'
(manage-bde -status C: | Out-String).Trim()

'o--> Desactivando BitLocker (manage-bde -off C:) ...'
(manage-bde -off C: | Out-String).Trim()
"manage-bde -off termino con codigo: $LASTEXITCODE"

Start-Sleep -Seconds 10
$estado = (manage-bde -status C: | Out-String)
if ($estado -notmatch 'Descifrad|Fully Decrypted') {
    'ADVERTENCIA: el descifrado no figura como iniciado tras 10 s; sigo vigilando de todas formas...'
}

$maxIntentos = 90   # 90 x 30 s = 45 min
for ($i = 1; $i -le $maxIntentos; $i++) {
    Start-Sleep -Seconds 30
    $estado = (manage-bde -status C: | Out-String)
    $pct = if ($estado -match 'Porcentaje cifrado:\s*([0-9.,]+)\s*%') { $matches[1] } else { '?' }
    $conv = if ($estado -match 'Estado de conversi.n:\s*(.+)') { $matches[1].Trim() } else { '?' }
    "Intento $i : conversion = $conv | cifrado = $pct %"
    if ($pct -match '^0[.,]0$' -or $conv -match 'Fully Decrypted|Sin cifrar|Not Encrypted' -or ($conv -match 'Descifrad' -and $conv -notmatch 'en curso')) {
        'DESCIFRADO COMPLETO. El triangulo del icono de C: deberia desaparecer (pulsa F5 en el Explorador).'
        break
    }
}

'--- Estado final ---'
(manage-bde -status C: | Out-String).Trim()
'RECUERDA: reinicia el equipo para aplicar las tareas pendientes (actualizaciones / archivos en espera).'

Stop-Transcript
exit 0
