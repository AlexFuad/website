# Deployment Guide for Hostinger - digitalita.my.id

## Problem Fixed ✅
The "This Page Does Not Exist" error occurred because Hostinger's Apache server needs URL rewriting rules for React Router (Single Page Application).

## What Was Added:
- Created `public/.htaccess` file with Apache rewrite rules
- This file tells Apache to redirect all routes to `index.html`
- React Router then handles the routing client-side

## Deploy to Hostinger:

### Method 1: Using File Manager (Recommended)

1. **Login to Hostinger Control Panel**
   - Go to: https://hpanel.hostinger.com

2. **Navigate to File Manager**
   - Go to: Websites → digitalita.my.id → Manage
   - Click: "File Manager" under "Files" section

3. **Navigate to public_html**
   - Open: `public_html` folder (or your domain's root folder)

4. **Backup Current Files (Optional)**
   - Create a backup folder
   - Move existing files there

5. **Upload Build Files**
   - Open the `build` folder from your project:
     ```
     d:\My Files\Developer\Javascript\Caniel\Website\build
     ```
   - Select ALL files and folders inside `build/` (NOT the build folder itself)
   - Upload to `public_html/` on Hostinger

6. **Important Files to Upload:**
   - `.htaccess` (CRITICAL - fixes the routing issue)
   - `index.html`
   - `asset-manifest.json`
   - `static/` folder (contains JS and CSS files)
   - Any other files in the build folder

7. **Verify Upload**
   - Make sure `.htaccess` is in the root of `public_html`
   - Make sure `index.html` is in the root of `public_html`
   - The structure should look like:
     ```
     public_html/
     ├── .htaccess
     ├── index.html
     ├── asset-manifest.json
     └── static/
         ├── css/
         └── js/
     ```

### Method 2: Using FTP (FileZilla)

1. **Connect to Hostinger via FTP**
   - Host: Your domain IP or `digitalita.my.id`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

2. **Navigate to public_html**

3. **Delete Old Files** (after backup)

4. **Upload New Build Files**
   - Upload everything from the `build` folder

5. **Verify .htaccess exists**

## After Deployment:

### Test These URLs:
- ✅ https://digitalita.my.id/ (Home)
- ✅ https://digitalita.my.id/news (News page)
- ✅ https://digitalita.my.id/news/{id} (News detail)
- ✅ https://digitalita.my.id/admin (Admin panel)
- ✅ https://digitalita.my.id/login (Login page)

### If Still Getting 404 Error:
1. Check if `.htaccess` file exists in root directory
2. Check if mod_rewrite is enabled in Hostinger (usually enabled by default)
3. Clear browser cache
4. Try hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

## Build Command:
Whenever you need to update the site:
```bash
npm run build
```
Then upload the contents of the `build` folder to Hostinger.

## Important Notes:
- ⚠️ Always upload the `.htaccess` file - it's critical for React Router
- ⚠️ The build folder contents go in `public_html`, NOT a subfolder
- ⚠️ After making code changes, always run `npm run build` first
- ⚠️ Keep a backup of current files before uploading

## Environment Variables on Hostinger:
For production environment variables (like reCAPTCHA keys):
- The `.env` file is NOT included in the build
- Environment variables are baked into the build at build time
- To change environment variables, update `.env` then run `npm run build` again

## Troubleshooting:

### "This Page Does Not Exist" Error
**Solution:** Ensure `.htaccess` is uploaded to the root of public_html

### Blank Page / White Screen
**Solution:** 
- Check browser console for errors
- Verify all static files (JS/CSS) uploaded correctly
- Check file paths in index.html

### Routes Work But API Calls Don't
**Solution:** API calls need separate backend configuration

### Login Not Working
**Solution:** Login is client-side only (no backend). Check localStorage is working.

---

**Last Updated:** April 9, 2026
**Build Status:** ✅ Ready to deploy
