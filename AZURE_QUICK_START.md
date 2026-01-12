# Azure Quick Start Checklist

## What You Need to Connect

### 1. Azure Communication Services (Email) ✅ REQUIRED

**Purpose**: Send emails from contact form

**Steps**:
1. Create Communication Services resource in Azure Portal
2. Get **Connection String** from "Keys" section
3. Set up verified sender email/domain in "Email" → "Domains"
4. Note the **verified sender email address**

**Environment Variables Needed**:
- `ACS_EMAIL_CONNECTION_STRING` = Connection string from Keys
- `ACS_EMAIL_SENDER` = Verified sender email (e.g., `noreply@yourdomain.com`)

### 2. Azure Static Web Apps ✅ REQUIRED

**Purpose**: Host your React site + Azure Functions

**Steps**:
1. Create Static Web App resource
2. Connect to GitHub repository (`orca-test-site`)
3. Configure build settings:
   - App location: `/`
   - Api location: `/api`
   - Output location: `/dist`
4. Set environment variables (see below)

**Environment Variables Needed**:
- `CONTACT_TO_EMAIL` = Where to send contact form submissions
- `CONTACT_SUBJECT_PREFIX` = `[Orca Lead]` (optional)
- `TURNSTILE_SECRET_KEY` = Cloudflare Turnstile secret (optional)

### 3. (Optional) Azure Key Vault

**Purpose**: Securely store secrets instead of plain environment variables

**When to use**: Production deployments

## Quick Setup Summary

1. **Create Communication Services** → Get connection string + verify sender
2. **Create Static Web App** → Connect GitHub → Configure build
3. **Add Environment Variables** in Static Web App Configuration:
   ```
   ACS_EMAIL_CONNECTION_STRING = <from Communication Services>
   ACS_EMAIL_SENDER = <verified email>
   CONTACT_TO_EMAIL = <your inbox>
   ```
4. **Wait for deployment** → First build takes 5-10 minutes
5. **Test** → Visit your site URL and test contact form

## Your Site Will Be Available At

`https://<your-app-name>.azurestaticapps.net`

## Files Already Configured

- ✅ `api/contact/index.js` - Azure Function for contact form
- ✅ `api/host.json` - Azure Functions configuration
- ✅ `api/package.json` - Dependencies
- ✅ `staticwebapp.config.json` - Azure Static Web Apps routing

## Need Help?

See `AZURE_DEPLOYMENT_GUIDE.md` for detailed step-by-step instructions.
