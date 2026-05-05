# Hostinger Deployment Guide

## Project Structure
This is a monorepo with frontend and backend separated:
- `frontend/` - React application (port 3000)
- `backend/` - Express.js API (port 5000)

## Frontend Deployment (React SPA)

### Prerequisites
- Hostinger shared hosting or VPS
- FTP access or File Manager
- Domain configured

### Deployment Steps

#### 1. Build the Project
```bash
npm run build
```
This creates the production build in `frontend/build/`

#### 2. Upload Files to Hostinger

**Using File Manager:**
1. Login to Hostinger hPanel
2. Go to File Manager
3. Navigate to `public_html` (or your domain's root directory)
4. Delete all existing files in `public_html` (backup first if needed)
5. Upload ALL contents from `frontend/build/` folder to `public_html`

**Using FTP:**
1. Connect to your Hostinger FTP account
2. Navigate to `public_html`
3. Upload all files from `frontend/build/` to `public_html`

#### 3. Verify File Structure
After upload, your `public_html` should contain:
```
public_html/
├── .htaccess
├── index.html
├── manifest.json
├── asset-manifest.json
└── static/
    ├── css/
    ├── js/
    └── media/
```

#### 4. File Permissions
Ensure correct permissions:
- Files: 644 (rw-r--r--)
- Directories: 755 (rwxr-xr-x)

Set permissions via File Manager:
- Right-click on files/folders
- Select "Change Permissions"
- Set to 644 for files, 755 for directories

#### 5. .htaccess Configuration
The `.htaccess` file is already included in the build and contains:
- React Router support (SPA routing)
- Security headers
- Gzip compression
- Static asset caching
- Directory browsing disabled

## Troubleshooting 403 Errors

### Common Causes and Solutions

#### 1. Wrong Root Directory
**Problem:** Files uploaded to wrong directory
**Solution:** Ensure files are in `public_html`, not a subdirectory

#### 2. Missing index.html
**Problem:** index.html not in public_html
**Solution:** Verify `index.html` exists in `public_html` root

#### 3. Incorrect File Permissions
**Problem:** Files have wrong permissions
**Solution:** 
- Files should be 644
- Directories should be 755
- Never use 777 (security risk)

#### 4. .htaccess Issues
**Problem:** .htaccess not working or misconfigured
**Solution:**
- Ensure `.htaccess` is in `public_html`
- Check that mod_rewrite is enabled (usually enabled by default)
- Verify no syntax errors in .htaccess

#### 5. Apache Configuration
**Problem:** Server configuration blocking access
**Solution:**
- Check Hostinger hPanel for any security settings
- Verify domain is properly pointed to the hosting
- Check if there's an IP blocking or firewall rule

### Verification Steps

1. **Check if files are accessible:**
   - Try accessing `yourdomain.com/index.html` directly
   - Try accessing `yourdomain.com/static/js/main.[hash].js`

2. **Check Apache error logs:**
   - Go to hPanel > Files > Error Logs
   - Look for 403 errors and their causes

3. **Test with simple HTML:**
   - Create a test file `test.html` in public_html
   - Try accessing `yourdomain.com/test.html`
   - If this works, the issue is with your React build

## Backend Deployment (Express.js)

### Option 1: Hostinger VPS
For full backend deployment, you need a VPS:

1. SSH into your VPS
2. Install Node.js and npm
3. Upload `backend/` folder
4. Run `npm install` in backend directory
5. Configure PM2 to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name digitalita-backend
   pm2 save
   pm2 startup
   ```
6. Configure Nginx as reverse proxy

### Option 2: External Backend Service
For shared hosting, consider:
- Deploy backend to Render, Railway, or Heroku
- Configure CORS to allow your domain
- Update frontend API calls to use the external backend URL

## Environment Variables

### Frontend (.env)
Create `.env` in frontend directory before building:
```
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (.env)
Create `.env` in backend directory:
```
PORT=5000
NODE_ENV=production
DATABASE_URL=your_database_url
```

## Post-Deployment Checklist

- [ ] Website loads without 403 errors
- [ ] All pages navigate correctly (React Router)
- [ ] Static assets (CSS, JS, images) load
- [ ] No console errors in browser
- [ ] Mobile responsive design works
- [ ] Contact forms (if any) submit correctly
- [ ] Admin login works (if applicable)

## Support Resources

- Hostinger Knowledge Base: https://support.hostinger.com
- React Deployment Guide: https://cra.link/deployment
- Video Tutorial: https://www.youtube.com/watch?v=wWtYqgOBe3Q

## Quick Fix for 403 Error

If you're still getting 403 errors:

1. **Check file ownership:**
   - Files should be owned by your hosting user
   - In File Manager, check file properties

2. **Disable .htaccess temporarily:**
   - Rename `.htaccess` to `.htaccess.backup`
   - Try accessing the site
   - If it works, the issue is in .htaccess

3. **Check index.html:**
   - Ensure it's not empty
   - Verify it has proper HTML structure

4. **Contact Hostinger Support:**
   - If all else fails, submit a ticket
   - Include error logs and steps taken
