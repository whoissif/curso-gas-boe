# Diagnostico del entorno de desarrollo
# Uso: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/doctor.ps1

$ErrorActionPreference = 'SilentlyContinue'

# Reconstruir el PATH desde el registro. Asi el diagnostico funciona aunque el
# proceso que lanza el script (p. ej. el servicio de OpenCode) tenga un PATH viejo.
$machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
$pnpmHome = [Environment]::GetEnvironmentVariable('PNPM_HOME', 'User')
$extra = @($pnpmHome, (Join-Path $env:LOCALAPPDATA 'pnpm')) | Where-Object { $_ }
$env:Path = (@($machinePath, $userPath) + $extra) -join ';'

function Get-ToolRow {
    param(
        [string]$Name,
        [string]$Exe,
        [string[]]$ArgList
    )

    $cmd = Get-Command $Exe -ErrorAction SilentlyContinue
    if (-not $cmd) {
        return [pscustomobject]@{ Herramienta = $Name; Estado = 'NO INSTALADO'; Version = '' }
    }

    try {
        $raw = & $Exe @ArgList 2>&1 | Select-Object -First 1
        $version = ($raw | Out-String).Trim() -replace "`0", ''
    }
    catch {
        $version = ''
    }

    # Detecta stubs (p. ej. el alias de Microsoft Store para python) y salidas vacias.
    $stub = $version -match 'no se encontr|not found|no se reconoce|was not found|no se puede encontrar'
    if ([string]::IsNullOrWhiteSpace($version) -or $stub) {
        return [pscustomobject]@{ Herramienta = $Name; Estado = 'NO INSTALADO'; Version = '' }
    }

    return [pscustomobject]@{ Herramienta = $Name; Estado = 'OK'; Version = $version }
}

$checks = @(
    @{ Name = 'Git'; Exe = 'git'; ArgList = @('--version') },
    @{ Name = 'Node.js'; Exe = 'node'; ArgList = @('--version') },
    @{ Name = 'npm'; Exe = 'npm.cmd'; ArgList = @('--version') },
    @{ Name = 'pnpm'; Exe = 'pnpm'; ArgList = @('--version') },
    @{ Name = 'Python'; Exe = 'python'; ArgList = @('--version') },
    @{ Name = 'uv'; Exe = 'uv'; ArgList = @('--version') },
    @{ Name = 'VS Code'; Exe = 'code'; ArgList = @('--version') },
    @{ Name = 'GitHub CLI'; Exe = 'gh'; ArgList = @('--version') },
    @{ Name = 'Docker'; Exe = 'docker'; ArgList = @('--version') },
    @{ Name = 'WSL'; Exe = 'wsl'; ArgList = @('--version') },
    @{ Name = 'winget'; Exe = 'winget'; ArgList = @('--version') }
)

$rows = @(foreach ($c in $checks) { Get-ToolRow -Name $c.Name -Exe $c.Exe -ArgList $c.ArgList })

# Android Studio: trae su propio Java (JBR), no hace falta Java en el PATH.
$studio = 'C:\Program Files\Android\Android Studio\bin\studio64.exe'
$info = 'C:\Program Files\Android\Android Studio\product-info.json'
if ((Test-Path $studio) -and (Test-Path $info)) {
    $ver = (Get-Content $info -Raw | ConvertFrom-Json).version
    $rows += [pscustomobject]@{ Herramienta = 'Android Studio'; Estado = 'OK'; Version = "$ver (JBR incluido)" }
}
else {
    $rows += [pscustomobject]@{ Herramienta = 'Android Studio'; Estado = 'NO INSTALADO'; Version = '' }
}

Write-Host ''
Write-Host 'ENTORNO DE DESARROLLO' -ForegroundColor Cyan
Write-Host ('=' * 78)
$rows | Format-Table -AutoSize | Out-String | Write-Host

$missing = @($rows | Where-Object { $_.Estado -ne 'OK' })
if ($missing.Count -eq 0) {
    Write-Host 'Todo instalado.' -ForegroundColor Green
}
else {
    Write-Host ("Faltan {0} herramienta(s): {1}" -f $missing.Count, (($missing | ForEach-Object { $_.Herramienta }) -join ', ')) -ForegroundColor Yellow
    Write-Host 'Instala con: winget install --id <paquete> -e' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'Nota: si acabas de instalar algo, abre una terminal nueva para refrescar el PATH.' -ForegroundColor DarkGray
