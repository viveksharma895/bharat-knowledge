$ErrorActionPreference = "Continue"

$port = 3000
$useTurbo = $args -contains "-turbo"

Write-Host "`n========================================" -ForegroundColor Yellow
Write-Host " Bharat Knowledge - Client Dev Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Yellow

$inUse = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue
if ($inUse) {
    Write-Host ""
    Write-Host "Port $port is in use by PID(s): $($inUse.OwningProcess -join ', ')" -ForegroundColor Red
    foreach ($pid_ in $inUse.OwningProcess) {
        $p = Get-Process -Id $pid_ -ErrorAction SilentlyContinue
        if ($p) {
            Write-Host "  Killing $($p.ProcessName) (PID $pid_)..." -ForegroundColor Yellow
            Stop-Process -Id $pid_ -Force -ErrorAction SilentlyContinue
        }
    }
    Start-Sleep -Seconds 2
    Write-Host "Port $port freed." -ForegroundColor Green
}

$session = Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like "*next*dev*" -or $_.CommandLine -like "*--workspace client*" }
if ($session) {
    foreach ($s in $session) {
        Write-Host "Stopping stale dev process (PID $($s.ProcessId))..." -ForegroundColor Yellow
        Stop-Process -Id $s.ProcessId -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 1
}

$nextDir = Join-Path (Join-Path $PSScriptRoot "..") "client\.next"
if (Test-Path $nextDir) {
    Write-Host "Clearing cached .next build directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $nextDir -ErrorAction SilentlyContinue
}

Write-Host ""
if ($useTurbo) {
    Write-Host "Starting client dev server (Turbopack) on port $port..." -ForegroundColor Green
} else {
    Write-Host "Starting client dev server (stable Webpack) on port $port..." -ForegroundColor Green
}
Write-Host "Press Ctrl+C to stop.`n" -ForegroundColor Gray

Set-Location (Join-Path $PSScriptRoot "..")
if ($useTurbo) {
    npm --workspace client run dev:turbo
} else {
    npm --workspace client run dev
}
