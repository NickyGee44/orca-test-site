# Azure Resources Setup Script for Orca Site
# This script helps set up the remaining Azure resources needed

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "=== Orca Site Azure Setup ===" -ForegroundColor Cyan
Write-Host ""

# Current Status
Write-Host "Current Resources:" -ForegroundColor Yellow
Write-Host "  ✓ Static Web App: Orca-Site" -ForegroundColor Green
Write-Host "  ✓ URL: https://salmon-pond-051745510.1.azurestaticapps.net" -ForegroundColor Green
Write-Host "  ✗ Communication Services: Not found" -ForegroundColor Red
Write-Host "  ✗ Environment Variables: Not configured" -ForegroundColor Red
Write-Host ""

# Step 1: Create Communication Services
Write-Host "Step 1: Create Azure Communication Services" -ForegroundColor Cyan
Write-Host "Run this command to create Communication Services:" -ForegroundColor Yellow
Write-Host ""
Write-Host 'az communication create \' -ForegroundColor White
Write-Host '  --name "orca-email-service" \' -ForegroundColor White
Write-Host '  --resource-group "test" \' -ForegroundColor White
Write-Host '  --location "centralus" \' -ForegroundColor White
Write-Host '  --data-location "United States"' -ForegroundColor White
Write-Host ""

# Step 2: Get Connection String
Write-Host "Step 2: After creating, get the connection string:" -ForegroundColor Cyan
Write-Host 'az communication list-key --name "orca-email-service" --resource-group "test"' -ForegroundColor White
Write-Host ""

# Step 3: Set Environment Variables
Write-Host "Step 3: Set environment variables on Static Web App" -ForegroundColor Cyan
Write-Host "After you have:" -ForegroundColor Yellow
Write-Host "  - Connection string from Communication Services" -ForegroundColor White
Write-Host "  - Verified sender email address" -ForegroundColor White
Write-Host "  - Destination email for contact form submissions" -ForegroundColor White
Write-Host ""
Write-Host "Run this command:" -ForegroundColor Yellow
Write-Host ""
Write-Host 'az staticwebapp appsettings set \' -ForegroundColor White
Write-Host '  --name "Orca-Site" \' -ForegroundColor White
Write-Host '  --resource-group "test" \' -ForegroundColor White
Write-Host '  --settings \' -ForegroundColor White
Write-Host '    ACS_EMAIL_CONNECTION_STRING="<your-connection-string>" \' -ForegroundColor White
Write-Host '    ACS_EMAIL_SENDER="noreply@orca.bi" \' -ForegroundColor White
Write-Host '    CONTACT_TO_EMAIL="contact@orca.bi" \' -ForegroundColor White
Write-Host '    CONTACT_SUBJECT_PREFIX="[Orca Lead]"' -ForegroundColor White
Write-Host ""

Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Create Communication Services (command above)" -ForegroundColor Yellow
Write-Host "2. Verify sender email/domain in Azure Portal" -ForegroundColor Yellow
Write-Host "3. Get connection string" -ForegroundColor Yellow
Write-Host "4. Set environment variables" -ForegroundColor Yellow
Write-Host "5. Test your contact form!" -ForegroundColor Yellow
Write-Host ""
