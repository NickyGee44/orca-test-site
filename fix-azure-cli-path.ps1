# Quick fix to make Azure CLI work in current PowerShell session
# Run this in your PowerShell terminal: .\fix-azure-cli-path.ps1

Write-Host "Refreshing PATH to include Azure CLI..." -ForegroundColor Yellow

# Refresh PATH from both Machine and User environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Test if az works now
Write-Host "`nTesting Azure CLI..." -ForegroundColor Yellow
try {
    $version = az --version 2>&1 | Select-Object -First 1
    if ($version -like "*azure-cli*") {
        Write-Host "✓ Azure CLI is now working!" -ForegroundColor Green
        Write-Host "`nYou can now run:" -ForegroundColor Cyan
        Write-Host "  az login" -ForegroundColor White
        Write-Host "  az account show" -ForegroundColor White
    } else {
        Write-Host "✗ Azure CLI still not found" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

Write-Host "`nNote: This fix only works for this terminal session." -ForegroundColor Yellow
Write-Host "To make it permanent, restart your terminal/PowerShell." -ForegroundColor Yellow
