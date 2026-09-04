$root = Split-Path -Parent $PSScriptRoot

function Stop-Port($port) {
    $procs = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
             Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $procs) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "Killed process $pid on port $port" -ForegroundColor DarkYellow
    }
}

Write-Host "Cleaning up ports..." -ForegroundColor Cyan
Stop-Port 3000
Stop-Port 3001
Stop-Port 3002
Start-Sleep -Seconds 1

Write-Host "Starting all services..." -ForegroundColor Cyan

$client = Start-Process -NoNewWindow -PassThru -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "$root\client"
$server = Start-Process -NoNewWindow -PassThru -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "$root\server"
$admin = Start-Process -NoNewWindow -PassThru -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "$root\admin"

Write-Host ""
Write-Host "Client  -> http://localhost:3000" -ForegroundColor Green
Write-Host "Server  -> http://localhost:3001" -ForegroundColor Green
Write-Host "Admin   -> http://localhost:3002" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop all services." -ForegroundColor Yellow

try {
    while ($true) {
        Start-Sleep -Seconds 1
        if ($client.HasExited -and $server.HasExited -and $admin.HasExited) {
            Write-Host "All services stopped." -ForegroundColor Red
            break
        }
    }
} finally {
    if (-not $client.HasExited) { Stop-Process -Id $client.Id -Force -ErrorAction SilentlyContinue }
    if (-not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
    if (-not $admin.HasExited)  { Stop-Process -Id $admin.Id  -Force -ErrorAction SilentlyContinue }
    Write-Host "All services stopped." -ForegroundColor Red
}
