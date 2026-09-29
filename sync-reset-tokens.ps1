# Generate fresh reset codes (forgot-password) and sync them into api.http
# Usage: powershell -File sync-reset-tokens.ps1

$ErrorActionPreference = "Stop"
$apiHttp = Join-Path $PSScriptRoot "api.http"
if (-not (Test-Path $apiHttp)) { throw "api.http not found at $apiHttp" }

if (-not [bool](docker ps --filter "name=69-s2-db" --format "{{.Names}}")) {
    throw "DB container not running"
}

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) { throw ".env not found at $envFile" }
$envLines = Get-Content -LiteralPath $envFile
function Get-Env($name) {
    $line = $envLines | Where-Object { $_ -match "^$name=" } | Select-Object -First 1
    if (-not $line) { return "" }
    return ($line -replace "^$name=", "").Trim()
}
$admEmail = Get-Env "ADMIN_EMAIL"
$usrEmail = Get-Env "USER_EMAIL"
if (-not $admEmail -or -not $usrEmail) { throw "ADMIN_EMAIL/USER_EMAIL missing in .env" }

# 1) Generate fresh reset codes so tokens in DB are new
Write-Host "Generating admin reset code..."
$null = Invoke-RestMethod -Uri "http://localhost:9091/admin/forgot-password" -Method Post `
    -ContentType "application/json" -Body (@{ email = $admEmail } | ConvertTo-Json)
Write-Host "Generating user reset code..."
$null = Invoke-RestMethod -Uri "http://localhost:9091/api/auth/forgot-password" -Method Post `
    -ContentType "application/json" -Body (@{ email = $usrEmail } | ConvertTo-Json)
Start-Sleep -Seconds 1

# 2) Read fresh codes from DB
$admTok = docker exec 69-s2-db psql -U supakon -d supakon -t -A -c "SELECT reset_password_token FROM admin_users WHERE email='$admEmail';"
$usrTok = docker exec 69-s2-db psql -U supakon -d supakon -t -A -c "SELECT reset_password_token FROM up_users WHERE email='$usrEmail';"
$admTok = $admTok.Trim()
$usrTok = $usrTok.Trim()
if (-not $admTok -or -not $usrTok) { throw "Could not read reset tokens from DB" }

# 3) Inject codes into api.http
$content = Get-Content -LiteralPath $apiHttp -Raw
$content = $content -replace '("resetPasswordToken":\s*")[^"]+(")', "`${1}$admTok`${2}"
$content = $content -replace '("code":\s*")[^"]+(")', "`${1}$usrTok`${2}"
Set-Content -LiteralPath $apiHttp -Value $content -NoNewline

Write-Host "Synced api.http"
Write-Host "  Admin resetToken: $admTok"
Write-Host "  User  resetToken: $usrTok"