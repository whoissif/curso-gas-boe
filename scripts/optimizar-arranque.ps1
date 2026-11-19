<#
.SYNOPSIS
    Desactiva el arranque automatico de apps pesadas y servicios no esenciales,
    guardando antes un backup para poder revertir los cambios con -Undo.

.DESCRIPTION
    Apps (Run de HKCU): OneDrive, Docker Desktop, Copilot, Edge (prelanzamiento)
    y RustDesk Tray. El servicio de RustDesk NO se toca: el acceso remoto sigue
    funcionando, solo desaparece el icono de bandeja.
    Servicios a Manual: CxUIUSvc (falla con timeout de 45 s en cada arranque),
    NI LabVIEW (mxssvr, niLXIDiscovery, nimDNSResponder, NiSvcLoc), Spooler y
    DiagTrack.
    Ademas se desactiva la tarea "OneDrive Startup Task".

.PARAMETER Undo
    Restaura todo al estado guardado en el backup.

.PARAMETER BackupFile
    Ruta del backup JSON (por defecto, arranque-backup.json junto al script).

.NOTES
    Creado con OpenCode el 2026-11-18. Requiere elevacion (UAC).
    Para deshacer, ejecutar de nuevo con -Undo en un PowerShell elevado.
#>
param(
    [switch]$Undo,
    [switch]$SoloUsuario,
    [string]$BackupFile = "$PSScriptRoot\arranque-backup.json",
    [string]$LogFile = "$env:TEMP\opencode\arranque.log"
)

$ErrorActionPreference = 'Continue'

$esAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $esAdmin -and -not $SoloUsuario) {
    Write-Output 'ERROR: requiere PowerShell elevado (administrador).'
    exit 1
}

New-Item -ItemType Directory -Force -Path (Split-Path $LogFile) | Out-Null
Start-Transcript -LiteralPath $LogFile -Force

$runKey = 'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run'
$runNames = @(
    'OneDrive',
    'Docker Desktop',
    'MicrosoftCopilotAutoLaunch_DC01AC635201E1BA13BDB8ACCE8A97DF',
    'MicrosoftEdgeAutoLaunch_DD8D0EC99D58FD1D2F3ABBB0979B792C',
    'RustDesk Tray'
)
$svcNames = @('CxUIUSvc', 'niLXIDiscovery', 'nimDNSResponder', 'NiSvcLoc', 'mxssvr', 'Spooler', 'DiagTrack')

if ($Undo) {
    if (-not (Test-Path $BackupFile)) {
        'ERROR: no hay backup en ' + $BackupFile
        Stop-Transcript
        exit 1
    }
    $b = Get-Content -LiteralPath $BackupFile -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($r in $b.RunEntries) {
        if ($r.Exists) {
            Set-ItemProperty -Path $runKey -Name $r.Name -Value $r.Value -Force -ErrorAction SilentlyContinue
            'Restaurado arranque: ' + $r.Name
        } else {
            Remove-ItemProperty -Path $runKey -Name $r.Name -ErrorAction SilentlyContinue
            'Eliminado arranque: ' + $r.Name
        }
    }
    if ($esAdmin) {
        foreach ($s in $b.Services) {
            if ($s.StartType -ne 'Missing') {
                Set-Service -Name $s.Name -StartupType $s.StartType -ErrorAction SilentlyContinue
                'Restaurado servicio ' + $s.Name + ' -> ' + $s.StartType
            }
        }
    } else {
        'Servicios: sin cambios (el deshacer de servicios requiere administrador)'
    }
    foreach ($t in $b.Tasks) {
        if ($t.State -eq 'Ready') {
            Enable-ScheduledTask -TaskName $t.Name -TaskPath $t.Path -ErrorAction SilentlyContinue | Out-Null
            'Reactivada tarea: ' + $t.Name
        } else {
            Disable-ScheduledTask -TaskName $t.Name -TaskPath $t.Path -ErrorAction SilentlyContinue | Out-Null
            'Desactivada tarea: ' + $t.Name
        }
    }
    'DESHECHO. Reinicia el equipo para aplicar el estado original.'
    Stop-Transcript
    exit 0
}

if (Test-Path $BackupFile) {
    'ERROR: ya existe un backup en ' + $BackupFile + '. Usa -Undo antes de volver a ejecutar.'
    Stop-Transcript
    exit 2
}

$b = @{ SoloUsuario = [bool]$SoloUsuario; RunEntries = @(); Services = @(); Tasks = @() }
foreach ($n in $runNames) {
    $p = Get-ItemProperty -Path $runKey -Name $n -ErrorAction SilentlyContinue
    if ($p) { $b.RunEntries += @{ Name = $n; Exists = $true; Value = $p.$n } }
    else { $b.RunEntries += @{ Name = $n; Exists = $false; Value = '' } }
}
foreach ($n in $svcNames) {
    $s = Get-Service -Name $n -ErrorAction SilentlyContinue
    if ($s) { $b.Services += @{ Name = $n; StartType = [string]$s.StartType; Status = [string]$s.Status } }
    else { $b.Services += @{ Name = $n; StartType = 'Missing'; Status = 'Missing' } }
}
$tareas = Get-ScheduledTask -ErrorAction SilentlyContinue | Where-Object { $_.TaskName -like 'OneDrive Startup Task-*' }
foreach ($t in $tareas) { $b.Tasks += @{ Name = $t.TaskName; Path = $t.TaskPath; State = [string]$t.State } }

$b | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $BackupFile -Encoding UTF8
'Backup guardado en: ' + $BackupFile

foreach ($r in $b.RunEntries) {
    if ($r.Exists) {
        Remove-ItemProperty -Path $runKey -Name $r.Name -ErrorAction SilentlyContinue
        'Desactivado arranque: ' + $r.Name
    }
}
if (-not $SoloUsuario) {
    foreach ($s in $b.Services) {
        if ($s.StartType -ne 'Missing' -and $s.StartType -ne 'Manual') {
            Set-Service -Name $s.Name -StartupType Manual -ErrorAction SilentlyContinue
            $ahora = (Get-Service -Name $s.Name -ErrorAction SilentlyContinue).StartType
            'Servicio ' + $s.Name + ': ' + $s.StartType + ' -> ' + $ahora
        } else {
            'Servicio ' + $s.Name + ': sin cambios (' + $s.StartType + ')'
        }
    }
} else {
    'Servicios: sin cambios (requiere administrador)'
}
foreach ($t in $b.Tasks) {
    Disable-ScheduledTask -TaskName $t.Name -TaskPath $t.Path -ErrorAction SilentlyContinue | Out-Null
    'Tarea desactivada: ' + $t.Name
}

'=== Estado final ==='
foreach ($n in $runNames) {
    $p = Get-ItemProperty -Path $runKey -Name $n -ErrorAction SilentlyContinue
    if ($p) { 'Run SIGUE activo: ' + $n } else { 'Run desactivado: ' + $n }
}
foreach ($s in $b.Services) {
    if ($s.StartType -ne 'Missing') {
        $ahora = Get-Service -Name $s.Name -ErrorAction SilentlyContinue
        'Servicio ' + $s.Name + ': ' + $ahora.StartType
    }
}
'REINICIA para que los cambios surtan efecto.'
Stop-Transcript
exit 0
