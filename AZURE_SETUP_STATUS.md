# Azure Setup Status

## ✅ Completed

1. **Azure CLI** - Installed and authenticated
2. **Static Web App** - Created and deployed
   - Name: `Orca-Site`
   - URL: `https://salmon-pond-051745510.1.azurestaticapps.net`
   - Resource Group: `test`
   - Status: Live and connected to GitHub
3. **Azure Communication Services** - Created
   - Name: `orca-email-service`
   - Resource Group: `test`
   - Connection String: Available (see below)

## 🔧 Next Steps Required

### Step 1: Verify Sender Email/Domain (Azure Portal)

**This must be done in Azure Portal** - cannot be done via CLI:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to: **Communication Services** → **orca-email-service** → **Email** → **Domains**
3. Click **"Add domain"** or **"Add email address"**
4. Choose one:
   - **Option A**: Verify your domain (e.g., `orca.bi`)
     - Add DNS records (SPF, DKIM, etc.)
     - Takes longer but allows any email from your domain
   - **Option B**: Verify a single email address (e.g., `noreply@orca.bi`)
     - Verify via email link
     - Quick but only that one email can send
5. Once verified, note the **sender email address** you'll use

### Step 2: Set Environment Variables

After you have:
- ✅ Connection string (see below)
- ✅ Verified sender email address
- ✅ Destination email for contact form (e.g., `contact@orca.bi`)

Run this command:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

az staticwebapp appsettings set `
  --name "Orca-Site" `
  --resource-group "test" `
  --settings `
    ACS_EMAIL_CONNECTION_STRING="endpoint=https://orca-email-service.unitedstates.communication.azure.com/;accesskey=7sC596FS5NME57g8WzcCqQOCo7xVVHJlEYrmbPb0FDx8eNN49zg7JQQJ99CAACULyCpD92UqAAAAAZCSI5Q1" `
    ACS_EMAIL_SENDER="<your-verified-email>" `
    CONTACT_TO_EMAIL="contact@orca.bi" `
    CONTACT_SUBJECT_PREFIX="[Orca Lead]"
```

**Replace `<your-verified-email>` with the email you verified in Step 1.**

## 📋 Connection String

**Primary Connection String:**
```
endpoint=https://orca-email-service.unitedstates.communication.azure.com/;accesskey=7sC596FS5NME57g8WzcCqQOCo7xVVHJlEYrmbPb0FDx8eNN49zg7JQQJ99CAACULyCpD92UqAAAAAZCSI5Q1
```

**⚠️ Security Note:** This connection string is sensitive. Don't commit it to Git. It's already in this file, so consider rotating it after setup.

## 🧪 Testing

After setting environment variables:

1. Visit: `https://salmon-pond-051745510.1.azurestaticapps.net`
2. Go to the Contact page
3. Submit the contact form
4. Check the email address you set for `CONTACT_TO_EMAIL`
5. Check Function logs if it doesn't work:
   - Azure Portal → Static Web App → Functions → Logs

## 📝 Quick Reference

**Your Site:**
- URL: https://salmon-pond-051745510.1.azurestaticapps.net
- Resource Group: `test`
- Static Web App: `Orca-Site`

**Communication Services:**
- Name: `orca-email-service`
- Resource Group: `test`

**Commands:**
```powershell
# Refresh PATH (run this first in new terminals)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Check Static Web App
az staticwebapp show --name "Orca-Site" --resource-group "test"

# List environment variables
az staticwebapp appsettings list --name "Orca-Site" --resource-group "test"

# Update environment variables
az staticwebapp appsettings set --name "Orca-Site" --resource-group "test" --settings KEY="value"
```
