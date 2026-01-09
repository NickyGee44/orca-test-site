# Admin Dashboard Setup

## Overview
The Orca admin dashboard allows non-technical users to manage site content, articles, SEO settings, and contact form submissions without editing code.

## Access
- URL: `/admin/login`
- Default password: `orca2024` (set via `VITE_ADMIN_PASSWORD` environment variable)

## Features

### Dashboard (`/admin`)
- Overview statistics
- Quick actions to common tasks

### Pages (`/admin/pages`)
- Edit content for all marketing pages
- Update hero sections, metrics, value props, etc.
- Rich text editing for content blocks

### Articles (`/admin/articles`)
- Create and edit AI-generated articles
- Manage external article visibility
- Set article metadata (tags, featured status, etc.)

### Contact (`/admin/contact`)
- View all contact form submissions
- Mark submissions as read/responded
- Add notes to submissions
- Export submissions

### SEO (`/admin/seo`)
- Configure SEO for each page
- Set global SEO settings
- Manage OpenGraph tags
- Configure Google Analytics

### Settings (`/admin/settings`)
- Site-wide configuration
- Admin user management (future)

## Data Storage

### Current (MVP)
- Uses localStorage for data persistence
- Suitable for development and testing

### Production
- Will use Netlify Functions + JSON files in `data/` directory
- Or external database (Fauna, Supabase, MongoDB Atlas)
- All services include commented code for Netlify Function integration

## Environment Variables

Set in Netlify dashboard or `.env` file:
- `VITE_ADMIN_PASSWORD` - Admin login password
- `ACS_EMAIL_CONNECTION_STRING` - Azure Communication Services Email connection string (for `/api/contact`)
- `ACS_EMAIL_SENDER` - Verified sender address in ACS (for `/api/contact`)
- `CONTACT_TO_EMAIL` - Destination inbox for demo requests (for `/api/contact`)
- `CONTACT_SUBJECT_PREFIX` - Optional subject prefix (default: `[Orca Lead]`)
- `TURNSTILE_SECRET_KEY` - Optional Cloudflare Turnstile secret (recommended)

## Deployment

1. Build the site: `npm run build`
2. Deploy to Netlify (connect GitHub repo or use Netlify CLI)
3. Set environment variables in Netlify dashboard
4. Netlify Functions:
   - `/api/contact` is implemented as a Netlify Function (see `netlify/functions/contact.js`)
   - `netlify.toml` includes redirects for `/api/*` and SPA routing

## Security Notes

- Password authentication is basic for MVP
- In production, consider:
  - OAuth (Google, GitHub)
  - Netlify Identity
  - Proper password hashing (bcrypt)
  - Rate limiting on API endpoints
  - CSRF protection
