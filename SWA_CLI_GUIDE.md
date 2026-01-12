# Azure Static Web Apps CLI Guide

You have SWA CLI installed and logged in! Here's how to use it with your Orca site.

## Prerequisites

Before using SWA CLI, make sure you have:

1. **Azure Functions Core Tools** (required for running API functions locally)
   ```powershell
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```
   Verify installation: `func --version` (should show v4.x.x)

2. **SWA CLI** (you already have this ✅)
   ```powershell
   npm install -g @azure/static-web-apps-cli
   ```

## Quick Commands

### 1. Test Locally (Recommended First Step)

Run your site locally with Azure Functions emulation:

```powershell
# Build your site first
npm run build

# Start SWA emulator (serves dist/ folder and api/ functions)
swa start ./dist --api-location ./api
```

This will:
- Serve your built React app from `dist/`
- Run your Azure Functions from `api/`
- Make `/api/contact` available locally
- Show you the local URL (usually `http://localhost:4280`)

### 2. Deploy to Azure

Deploy directly from your local machine:

```powershell
# Build first
npm run build

# Deploy to Azure
swa deploy ./dist --api-location ./api
```

**First time deploying?** You'll need to:
1. Create a Static Web App in Azure Portal first (see `AZURE_DEPLOYMENT_GUIDE.md`)
2. Or use `swa init` to create one via CLI

### 3. Initialize New Static Web App (If Not Created Yet)

If you haven't created the Static Web App in Azure Portal:

```powershell
swa init
```

This will:
- Guide you through creating a new Static Web App
- Connect it to your GitHub repo
- Set up deployment

## Configuration File (Optional)

You can create `swa-cli.config.json` for easier commands:

```json
{
  "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
  "configurations": {
    "orca-site": {
      "appLocation": ".",
      "outputLocation": "dist",
      "appBuildCommand": "npm run build",
      "apiLocation": "api",
      "apiBuildCommand": "",
      "run": "npm run dev",
      "devServerUrl": "http://localhost:5173"
    }
  }
}
```

Then you can just run:
```powershell
swa start orca-site
swa deploy orca-site
```

## Common Workflows

### Development Workflow

```powershell
# Terminal 1: Run Vite dev server
npm run dev

# Terminal 2: Run SWA emulator (connects to Vite dev server)
swa start http://localhost:5173 --api-location ./api
```

### Production Deployment Workflow

```powershell
# 1. Build the site
npm run build

# 2. Deploy to Azure
swa deploy ./dist --api ./api --env production

# Or if you have a config:
swa deploy orca-site --env production
```

## Environment Variables

For local development, create `api/local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "ACS_EMAIL_CONNECTION_STRING": "your-connection-string",
    "ACS_EMAIL_SENDER": "noreply@yourdomain.com",
    "CONTACT_TO_EMAIL": "contact@orca.bi",
    "CONTACT_SUBJECT_PREFIX": "[Orca Lead]"
  }
}
```

**⚠️ Important:** Add `api/local.settings.json` to `.gitignore` (don't commit secrets!)

## Testing Your Deployment

### Test Locally First

```powershell
# Build
npm run build

# Start emulator
swa start ./dist --api-location ./api

# Visit http://localhost:4280
# Test the contact form at http://localhost:4280/api/contact
```

### Test After Deployment

1. Get your site URL:
   ```powershell
   az staticwebapp show --name orca-site --resource-group orca-resources --query "defaultHostname" --output tsv
   ```

2. Visit: `https://<your-app-name>.azurestaticapps.net`
3. Test the contact form

## Troubleshooting

### "Static Web App not found"
- Create it first in Azure Portal, or
- Run `swa init` to create via CLI

### "API functions not working"
- **Install Azure Functions Core Tools**: `npm install -g azure-functions-core-tools@4 --unsafe-perm true`
- Check `api/` folder structure
- Verify `api/host.json` exists
- Check `api/package.json` has dependencies
- Run `cd api && npm install`
- Verify Functions Core Tools: `func --version`

### "Build fails"
- Check Node version: `node --version` (needs >= 18)
- Clear build: `rm -rf dist node_modules/.vite`
- Rebuild: `npm run build`

### "Environment variables not working"
- Set them in Azure Portal → Static Web App → Configuration
- For local: use `api/local.settings.json`

## Next Steps

1. **Test locally**: `swa start ./dist --api ./api`
2. **Deploy**: `swa deploy ./dist --api ./api`
3. **Set environment variables** in Azure Portal
4. **Test your live site**

## Useful Commands

```powershell
# Check SWA CLI version
swa --version

# Login (if needed)
swa login

# View help
swa --help
swa deploy --help
swa start --help

# List your Static Web Apps
az staticwebapp list --output table
```

## Documentation

- SWA CLI Docs: https://aka.ms/swa/cli-local-development
- Azure Static Web Apps: https://docs.microsoft.com/azure/static-web-apps/
