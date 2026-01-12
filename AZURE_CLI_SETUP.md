# Azure CLI Authentication & Setup Guide

This guide helps you authenticate to Azure using Azure CLI for deploying the Orca site.

## Install Azure CLI

### Windows
1. Download the MSI installer: https://aka.ms/installazurecliwindows
2. Run the installer
3. Restart your terminal/PowerShell

### Verify Installation
```powershell
az --version
```

## Authentication Methods

### Option 1: Interactive Login (Recommended for Getting Started)

This is the easiest method for local development and learning:

```powershell
az login
```

**What happens:**
1. Opens your default browser
2. Prompts you to sign in with your Azure account
3. Shows a subscription selector (if you have multiple subscriptions)
4. Automatically sets your default subscription

**After login, verify:**
```powershell
az account show
```

### Option 2: Azure Cloud Shell (Easiest)

If you're using Azure Portal:
1. Click the **Cloud Shell** icon (top right of Azure Portal)
2. Select **Bash** or **PowerShell**
3. You're automatically authenticated!

### Option 3: Service Principal (For Automation/Scripts)

Use this for CI/CD pipelines or automated scripts:

```powershell
# Create a service principal
az ad sp create-for-rbac --name "orca-site-deploy" --role contributor --scopes /subscriptions/<subscription-id>

# This outputs:
# {
#   "appId": "...",
#   "password": "...",
#   "tenant": "..."
# }

# Login with service principal
az login --service-principal -u <appId> -p <password> --tenant <tenant>
```

**⚠️ Security Note:** Store service principal credentials securely (Azure Key Vault, GitHub Secrets, etc.)

## Set Your Default Subscription

If you have multiple subscriptions:

```powershell
# List all subscriptions
az account list --output table

# Set default subscription
az account set --subscription "<subscription-id-or-name>"

# Verify
az account show
```

## Quick Commands for Your Deployment

### Check Your Authentication
```powershell
az account show
```

### List Resource Groups
```powershell
az group list --output table
```

### Create Resource Group (if needed)
```powershell
az group create --name "orca-resources" --location "eastus"
```

### List Static Web Apps
```powershell
az staticwebapp list --output table
```

### List Communication Services
```powershell
az communication list --output table
```

## Deploy Using Azure CLI (Alternative to Portal)

Instead of using the Azure Portal, you can deploy via CLI:

### Create Static Web App via CLI

```powershell
# Create Static Web App
az staticwebapp create \
  --name "orca-site" \
  --resource-group "orca-resources" \
  --location "eastus" \
  --sku "Free" \
  --source "https://github.com/NickyGee44/orca-test-site" \
  --branch "main" \
  --app-location "/" \
  --api-location "/api" \
  --output-location "/dist"
```

### Set Environment Variables via CLI

```powershell
# Set environment variables
az staticwebapp appsettings set \
  --name "orca-site" \
  --resource-group "orca-resources" \
  --settings \
    ACS_EMAIL_CONNECTION_STRING="<your-connection-string>" \
    ACS_EMAIL_SENDER="noreply@yourdomain.com" \
    CONTACT_TO_EMAIL="contact@orca.bi" \
    CONTACT_SUBJECT_PREFIX="[Orca Lead]"
```

### Get Static Web App URL

```powershell
az staticwebapp show \
  --name "orca-site" \
  --resource-group "orca-resources" \
  --query "defaultHostname" \
  --output tsv
```

## Refresh Your Token

If your token expires:

```powershell
# Get a new access token
az account get-access-token

# Or re-authenticate
az login
```

## Troubleshooting

### "You do not have authorization to perform action"
- Check your subscription permissions
- Verify you're using the correct subscription: `az account show`

### "Subscription not found"
- List subscriptions: `az account list`
- Set correct subscription: `az account set --subscription "<id>"`

### Token Expired
- Re-authenticate: `az login`
- Or get new token: `az account get-access-token`

## Next Steps

After authenticating:

1. **Follow the deployment guide**: See `AZURE_DEPLOYMENT_GUIDE.md`
2. **Or use CLI commands** above to deploy programmatically
3. **Set up environment variables** in Azure Portal or via CLI

## Security Best Practices

1. **Don't commit credentials** - Use environment variables or Key Vault
2. **Use service principals** for automation (not personal accounts)
3. **Limit permissions** - Only grant what's needed
4. **Rotate credentials** regularly
5. **Use Key Vault** for production secrets

## Quick Reference

```powershell
# Login
az login

# Check current account
az account show

# List subscriptions
az account list --output table

# Set subscription
az account set --subscription "<subscription-id>"

# List resources
az resource list --output table

# Get help
az --help
az <command> --help
```
