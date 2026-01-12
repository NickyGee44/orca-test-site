# Azure Authentication Troubleshooting

## "EnvironmentCredential is unavailable" Error

This error typically means Azure CLI credentials aren't properly set up or cached. Here's how to fix it:

## Solution 1: Clear and Re-authenticate (Recommended)

```powershell
# Clear cached credentials
az account clear

# Clear SWA CLI credentials (if using SWA CLI)
swa login --clear-credentials

# Re-authenticate with Azure CLI
az login

# Verify login
az account show
```

## Solution 2: Use Device Code Login (If Browser Login Fails)

```powershell
# Login using device code (works if browser login has issues)
az login --use-device-code

# Follow the instructions to authenticate
```

## Solution 3: Login with Specific Tenant (If You Have Multiple)

```powershell
# List available tenants
az account tenant list

# Login to specific tenant
az login --tenant <tenant-id>

# Or login and select tenant interactively
az login --tenant <tenant-id-or-domain>
```

## Solution 4: Clear All Azure Credentials

```powershell
# Clear Azure CLI cache
az account clear

# Remove Azure CLI config directory (nuclear option)
Remove-Item -Recurse -Force "$env:USERPROFILE\.azure"

# Re-login
az login
```

## Solution 5: Check Subscription Access

```powershell
# List all subscriptions you have access to
az account list --output table

# Set the correct subscription
az account set --subscription "<subscription-id-or-name>"

# Verify
az account show
```

## Solution 6: For SWA CLI Specifically

If the error happens with `swa deploy`:

```powershell
# Clear SWA CLI credentials
swa login --clear-credentials

# Re-authenticate
swa login

# Or use Azure CLI login first
az login
swa deploy ./dist --api-location ./api
```

## Solution 7: Use Service Principal (For Automation)

If you're deploying from CI/CD or scripts:

```powershell
# Create service principal
az ad sp create-for-rbac --name "orca-site-deploy" --role contributor --scopes /subscriptions/<subscription-id>

# Login with service principal
az login --service-principal -u <appId> -p <password> --tenant <tenant>
```

## Common Causes

1. **Expired Token**: Credentials expired, need to re-login
2. **Multiple Accounts**: Confusion between different Azure accounts
3. **Wrong Subscription**: Not set to the correct subscription
4. **Permission Issues**: Account doesn't have required permissions
5. **Cached Bad Credentials**: Old/invalid credentials in cache

## Verify Everything is Working

After fixing, verify:

```powershell
# Check Azure CLI
az account show

# Check SWA CLI (if using)
swa --version

# Test a simple command
az group list --output table
```

## Still Having Issues?

1. **Check Azure Portal**: Can you log in there? If not, it's an account issue.
2. **Check Permissions**: Ensure your account has Contributor or Owner role
3. **Check Subscription**: Make sure subscription is active and you have access
4. **Try Different Terminal**: Sometimes terminal-specific issues occur

## Quick Fix Script

Run this to reset everything:

```powershell
# Clear all credentials
az account clear
Remove-Item -Recurse -Force "$env:USERPROFILE\.azure" -ErrorAction SilentlyContinue

# Re-login
az login

# Set subscription (if you have multiple)
az account list --output table
az account set --subscription "<your-subscription-id>"

# Verify
az account show
```
