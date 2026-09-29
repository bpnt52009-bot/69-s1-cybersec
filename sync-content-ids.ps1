# Inject the latest DB id of each content type into api.http (3.1.3/3.1.4/3.1.5 URLs)
# Usage: powershell -File sync-content-ids.ps1  (run after 3.1.1 Create)

$ErrorActionPreference = "Stop"
$apiHttp = Join-Path $PSScriptRoot "api.http"
if (-not (Test-Path $apiHttp)) { throw "api.http not found at $apiHttp" }

if (-not [bool](docker ps --filter "name=69-s2-db" --format "{{.Names}}")) {
    throw "DB container not running"
}

$content = Get-Content -LiteralPath $apiHttp -Raw

foreach ($ep in @("students", "teachers", "subjects")) {
    $id = docker exec 69-s2-db psql -U supakon -d supakon -t -A -c "SELECT COALESCE(MAX(id), 0) FROM $ep;"
    $id = $id.Trim()
    if ($id -eq "0") {
        Write-Host "  $ep : no rows, keep as-is"
        continue
    }
    $content = $content -replace "(/api/$ep/)\d+", "`${1}$id"
    Write-Host "  $ep : id=$id"
}

Set-Content -LiteralPath $apiHttp -Value $content -NoNewline
Write-Host "Synced content ids into api.http"