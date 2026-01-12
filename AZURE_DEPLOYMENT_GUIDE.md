# Azure Deployment Guide

This guide walks you through connecting and deploying the Orca site to Azure.

## Prerequisites

1. **Azure Account** - You have access ✅
2. **Azure CLI** (optional, for command-line deployment)
   - Install: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
3. **Git** - Already set up ✅

## Azure Services You'll Need

### 1. Azure Static Web Apps
- Hosts your React frontend
- Automatically builds and deploys from GitHub
- Includes Azure Functions support

### 2. Azure Communication Services (Email)
- Sends emails from the contact form
- Requires a verified sender domain/email

### 3. (Optional) Azure Key Vault
- Securely stores secrets (connection strings, API keys)
- Recommended for production

## Step-by-Step Setup

### Step 1: Create Azure Communication Services Email Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Communication Services"**
4. Click **"Create"**
5. Fill in:
   - **Resource Group**: Create new or use existing
   - **Name**: `orca-email-service` (or your choice)
   - **Region**: Choose closest to you (e.g., `East US`)
6. Click **"Review + create"** then **"Create"**

#### Get Connection String:
1. Go to your Communication Services resource
2. Navigate to **"Keys"** in the left menu
3. Copy the **Connection string** (starts with `endpoint=https://...`)

#### Set Up Verified Sender:
1. In your Communication Services resource, go to **"Email"** → **"Domains"**
2. Click **"Add domain"** or **"Add email address"**
3. Follow the verification process:
   - For a domain: Add DNS records
   - For an email: Verify via email link
4. Once verified, note the sender email address (e.g., `noreply@yourdomain.com`)

### Step 2: Create Azure Static Web App

1. In Azure Portal, click **"Create a resource"**
2. Search for **"Static Web Apps"**
3. Click **"Create"**
4. Fill in:
   - **Subscription**: Your subscription
   - **Resource Group**: Same as above or create new
   - **Name**: `orca-site` (or your choice)
   - **Plan type**: Free (or Standard for custom domains)
   - **Region**: Choose closest to you
   - **Deployment details**:
     - **Source**: GitHub
     - **Sign in with GitHub**: Authorize Azure
     - **Organization**: Your GitHub org/username
     - **Repository**: `orca-test-site`
     - **Branch**: `main`
   - **Build details**:
     - **Build Presets**: Custom
     - **App location**: `/` (root)
     - **Api location**: `/api` (this is where your Azure Functions are)
     - **Output location**: `/dist` (Vite build output)
5. Click **"Review + create"** then **"Create"**

### Step 3: Configure Environment Variables

After the Static Web App is created:

1. Go to your Static Web App resource in Azure Portal
2. Navigate to **"Configuration"** in the left menu
3. Click **"+ Add"** to add each environment variable:

#### Required Variables:

```
ACS_EMAIL_CONNECTION_STRING
```
- Value: The connection string from Step 1 (e.g., `endpoint=https://...`)

```
ACS_EMAIL_SENDER
```
- Value: Your verified sender email (e.g., `noreply@yourdomain.com`)

```
CONTACT_TO_EMAIL
```
- Value: Where contact form submissions should be sent (e.g., `contact@orca.bi`)

#### Optional Variables:

```
CONTACT_SUBJECT_PREFIX
```
- Value: `[Orca Lead]` (or your preference)
- Default: `[Orca Lead]` if not set

```
TURNSTILE_SECRET_KEY
```
- Value: Your Cloudflare Turnstile secret key (if using Turnstile for spam protection)
- Only needed if you've set up Cloudflare Turnstile

### Step 4: (Optional) Set Up Azure Key Vault

For better security, store secrets in Key Vault:

1. Create a Key Vault:
   - Search for **"Key Vault"** in Azure Portal
   - Create with a unique name
   - Note the **Vault URI**

2. Add secrets to Key Vault:
   - Go to **"Secrets"** → **"Generate/Import"**
   - Add each secret:
     - `ACS-EMAIL-CONNECTION-STRING`
     - `ACS-EMAIL-SENDER`
     - `CONTACT-TO-EMAIL`

3. Link Key Vault to Static Web App:
   - In Static Web App → **"Configuration"**
   - For each variable, use Key Vault reference:
     - `@Microsoft.KeyVault(SecretUri=https://your-vault.vault.azure.net/secrets/ACS-EMAIL-CONNECTION-STRING/)`

### Step 5: Verify Deployment

1. After Static Web App is created, it will automatically:
   - Build your site from GitHub
   - Deploy to a URL like: `https://your-app-name.azurestaticapps.net`

2. Check deployment status:
   - Go to Static Web App → **"Deployment history"**
   - Wait for build to complete (first build takes ~5-10 minutes)

3. Test the contact form:
   - Visit your deployed site
   - Submit the contact form
   - Check that emails are received

## Troubleshooting

### Build Fails
- Check **"Deployment history"** for error logs
- Common issues:
  - Missing `dist` folder (check build output location)
  - Node version mismatch (check `package.json` engines)

### Contact Form Not Working
- Check environment variables are set correctly
- Verify ACS sender is verified
- Check Function logs:
  - Static Web App → **"Functions"** → **"Logs"**

### Functions Not Deploying
- Ensure `api/` folder structure is correct
- Check `api/host.json` exists
- Verify `api/package.json` has correct dependencies

## Local Development with Azure Functions

To test Azure Functions locally:

1. Install Azure Functions Core Tools:
   ```bash
   npm install -g azure-functions-core-tools@4
   ```

2. Install dependencies:
   ```bash
   cd api
   npm install
   ```

3. Create `local.settings.json`:
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

4. Run functions locally:
   ```bash
   func start
   ```

5. Run frontend (in another terminal):
   ```bash
   npm run dev
   ```

## Next Steps

- Set up custom domain (in Static Web App → **"Custom domains"**)
- Configure CDN for better performance
- Set up monitoring and alerts
- Configure staging environments

## Support

If you encounter issues:
1. Check Azure Portal logs
2. Review deployment history
3. Check Function App logs
4. Verify all environment variables are set
