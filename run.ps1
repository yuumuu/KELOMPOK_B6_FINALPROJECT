# PowerShell script to run Docker via WSL
# Save as: run.ps1

Write-Host "🚀 Starting Express Docker Application via WSL..." -ForegroundColor Cyan
Write-Host ""

# Check if WSL is available
try {
    wsl --version | Out-Null
} catch {
    Write-Host "❌ WSL is not installed or not available!" -ForegroundColor Red
    Write-Host "Please install WSL first: https://docs.microsoft.com/en-us/windows/wsl/install" -ForegroundColor Yellow
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  File .env tidak ditemukan!" -ForegroundColor Yellow
    Write-Host "📋 Membuat .env dari .env.example..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env"
    Write-Host "✅ File .env berhasil dibuat." -ForegroundColor Green
    Write-Host "⚠️  Silakan edit file .env sesuai kebutuhan, lalu jalankan script ini lagi." -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

Write-Host "🐳 Running Docker Compose via WSL..." -ForegroundColor Cyan
Write-Host ""

# Get current directory in WSL format
$currentPath = (Get-Location).Path
$wslPath = $currentPath -replace '\\', '/' -replace '^([A-Z]):', '/mnt/$1' -replace '/mnt/([A-Z])', {'/mnt/' + $_.Groups[1].Value.ToLower()}

# If using \\wsl.localhost path, convert it
if ($currentPath -match '\\\\wsl.localhost\\Ubuntu\\(.+)') {
    $wslPath = '/' + $matches[1] -replace '\\', '/'
}

Write-Host "Working directory: $wslPath" -ForegroundColor Gray
Write-Host ""

# Run docker compose via WSL
wsl -d Ubuntu bash -c "cd '$wslPath' && docker compose up --build"

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Docker Compose failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible solutions:" -ForegroundColor Yellow
    Write-Host "1. Make sure Docker Desktop is installed and running" -ForegroundColor White
    Write-Host "2. Enable WSL integration in Docker Desktop settings" -ForegroundColor White
    Write-Host "3. Check if .env file has correct values" -ForegroundColor White
    Write-Host ""
    exit 1
}
