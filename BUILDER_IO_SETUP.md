# Builder.io Setup & Troubleshooting

## What's Been Set Up

1. **Builder.io SDK Installed**: `@builder.io/react` and `@builder.io/sdk`
2. **API Key Configured**: `bpk-75435189e8f04d8894e8f009b495b4dc`
3. **Custom Components Registered**: Your React components are registered with Builder.io
4. **Routes Added**: 
   - Public: `/builder/*` - View Builder.io pages
   - Admin: `/admin/builder` - Access Builder.io editor

## How It Works

Builder.io is a **headless CMS** - it doesn't host your site, it provides content that your React app renders.

1. **Your React app** runs on your hosting (Netlify, Vercel, etc.)
2. **Builder.io** stores page content in the cloud
3. **Your app** fetches content from Builder.io and renders it

## Common Issues

### Issue: "Page Not Found" or "Error Loading Page"

**Cause**: The page hasn't been created in Builder.io yet.

**Solution**:
1. Go to `/admin/builder` in your admin dashboard
2. Click "Open Builder.io Editor"
3. Create a new page in Builder.io
4. Set the URL path (e.g., `/test-page`)
5. Publish the page
6. Visit `/builder/test-page` on your site

### Issue: Components Not Showing in Builder.io

**Cause**: Components need to be registered and accept props.

**Solution**: Components have been updated to accept Builder.io props. Make sure:
- Builder.io service is imported in `main.tsx` (already done)
- Components accept props (already fixed for ValuePropsGrid, FinalCtaBand, etc.)

### Issue: Can't Access Builder.io Editor

**Solution**:
1. Make sure you're logged into the admin dashboard
2. Visit `/admin/builder`
3. Click "Open Builder.io Editor" - this opens Builder.io in a new tab
4. You may need to sign in to Builder.io with your Builder.io account

### Issue: API Key Not Working

**Solution**:
- The API key is configured in `src/services/builderService.ts`
- Make sure the key is correct: `bpk-75435189e8f04d8894e8f009b495b4dc`
- If you need to change it, update `BUILDER_API_KEY` in `builderService.ts`

## Testing Builder.io

1. **Create a Test Page**:
   - Go to `/admin/builder`
   - Click "Open Builder.io Editor"
   - Create a new page
   - Set URL to `/test`
   - Add some content (text, images, or your custom components)
   - Publish

2. **View the Page**:
   - Visit `/builder/test` on your site
   - The page should render

3. **Use Custom Components**:
   - In Builder.io editor, look for your components in the components panel:
     - "Value Props Grid"
     - "Services Overview"
     - "Product Preview"
     - "AI Section"
     - "Timeline Strip"
     - "Final CTA Band"
     - "Metrics Showcase"
     - "Laptop Mockup"
     - "Desktop Mockup"
     - "Hero Visual"

## Exporting Existing Pages

To help recreate your existing pages in Builder.io:

1. Go to `/admin/builder`
2. Click "Export All Pages" or export individual pages
3. This downloads JSON files with your current page structure
4. Use these as reference when building pages in Builder.io

## Next Steps

1. **Create your first Builder.io page**:
   - Visit `/admin/builder`
   - Open Builder.io Editor
   - Create a new page
   - Set URL path
   - Add content using your custom components
   - Publish

2. **View it on your site**:
   - Visit `/builder/[your-page-url]`

3. **Gradually migrate pages** (optional):
   - Export existing pages
   - Recreate them in Builder.io using your custom components
   - Update routes if needed

## Important Notes

- Builder.io pages are at `/builder/*` routes
- Your existing React pages still work at their original routes
- Builder.io is for creating NEW pages visually, not replacing your entire site
- You still host your React app (Netlify, Vercel, etc.)
- Builder.io just provides the content
