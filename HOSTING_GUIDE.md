# RotateWise Hosting Guide for Hostinger

## What Files to Upload?

### ✅ ONLY Upload These Files to Hostinger:

```
Upload to public_html/
├── index.html          ← From dist/ folder (after build)
├── assets/             ← From dist/ folder (after build)
├── api/                ← Create this folder manually
│   ├── config.php      ← From backend/ folder
│   ├── auth.php        ← From backend/api/ folder
│   ├── leads.php       ← From backend/api/ folder
│   ├── notifications.php
│   ├── site-info.php
│   ├── form-fields.php
│   └── settings.php
```

### ❌ DO NOT Upload These Files:

- `src/` folder (source code - not needed)
- `node_modules/` folder (dependencies - not needed)
- `package.json` (npm config - not needed)
- `tsconfig.json` (TypeScript config - not needed)
- `vite.config.ts` (Vite config - not needed)
- `.md` files (documentation - not needed)

---

## Step-by-Step Hosting Instructions

### Step 1: Build the Website

The project is already built! The production files are in the `dist/` folder.

If you need to rebuild:
```bash
npm run build
```

### Step 2: Create Database on Hostinger

1. Login to Hostinger → Go to **hPanel**
2. Click **Databases** → **MySQL Databases**
3. Create new database:
   - Database name: `rotatewise_db`
   - Username: `rotatewise_user`
   - Password: (create strong password)
4. **Write down these credentials!**

### Step 3: Setup Database Tables

1. Go to **phpMyAdmin** (in Hostinger panel)
2. Select your new database
3. Click **Import** tab
4. Upload the `backend/database.sql` file
5. Click **Go** to import

### Step 4: Upload Files to Hostinger

#### Method A: Using File Manager (Easy)

1. Go to Hostinger → **File Manager**
2. Navigate to `public_html/`
3. Delete any existing files (default Hostinger files)
4. Upload from your `dist/` folder:
   - `index.html`
   - `assets/` folder (with all files inside)
5. Create new folder called `api/`
6. Upload PHP files to `api/` folder:
   - `backend/config.php` → `api/config.php`
   - All files from `backend/api/` → `api/`

#### Method B: Using FTP

1. Use FileZilla or similar FTP client
2. Connect with Hostinger FTP credentials
3. Navigate to `public_html/`
4. Upload same files as above

### Step 5: Configure Database Connection

1. In Hostinger File Manager, go to `public_html/api/`
2. Edit `config.php`
3. Update these lines with YOUR database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_rotatewise');  // Your actual DB name
define('DB_USER', 'u123456789_admin');        // Your actual DB user
define('DB_PASS', 'YourSecurePassword123');   // Your actual DB password
```

4. Save the file

### Step 6: Test Your Website

1. Visit: `https://yourdomain.com`
2. Test the contact form popup
3. Visit admin: `https://yourdomain.com/#/admin`
4. Login: `admin@rotatewise.com` / `admin123`
5. **IMPORTANT: Change password immediately in Settings!**

---

## File Structure Summary

### Your Project (Development)
```
rotatewise/
├── dist/                 ← UPLOAD contents to public_html
│   ├── index.html
│   └── assets/
├── backend/              ← UPLOAD to public_html/api
│   ├── config.php
│   ├── database.sql      ← Import to phpMyAdmin
│   └── api/
│       ├── auth.php
│       ├── leads.php
│       └── ...
├── src/                  ← DO NOT upload (source code)
├── node_modules/         ← DO NOT upload
└── package.json          ← DO NOT upload
```

### Hostinger Server (Production)
```
public_html/
├── index.html            ← Your website
├── assets/               ← CSS, JS, images
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── api/                  ← Backend PHP files
    ├── config.php        ← Database credentials here
    ├── auth.php
    ├── leads.php
    ├── notifications.php
    ├── site-info.php
    ├── form-fields.php
    └── settings.php
```

---

## Common Questions

### Q: Can I upload all files directly?
**A:** No! Only upload the `dist/` folder contents and `backend/` folder contents. The source code (`src/`), dependencies (`node_modules/`), and config files are not needed on the server.

### Q: What is the `dist/` folder?
**A:** It's the production-ready version of your website. When you run `npm run build`, Vite compiles all your React code into optimized HTML, CSS, and JavaScript files.

### Q: What is the `backend/` folder?
**A:** Contains PHP files that connect to your MySQL database. These handle form submissions, admin login, and data storage.

### Q: How does the frontend connect to backend?
**A:** The React app makes API calls to `/api/` endpoints (e.g., `/api/leads.php`). Since both are in the same domain, it works automatically.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| White screen | Check browser console (F12) for errors |
| API errors | Verify `config.php` has correct DB credentials |
| 500 Server Error | Check PHP error logs in Hostinger |
| Login fails | Make sure database tables were imported |
| Form doesn't submit | Check Network tab in browser for API response |

---

## Security Checklist

After going live:

- [ ] Change admin password (Settings → Security)
- [ ] Enable SSL/HTTPS in Hostinger
- [ ] Update `config.php` CORS to your domain only
- [ ] Set PHP file permissions to 644
- [ ] Remove or rename `database.sql` from server

---

## Admin Panel Access

- **URL:** `https://yourdomain.com/#/admin`
- **Email:** `admin@rotatewise.com`
- **Password:** `admin123`

⚠️ **Change the password immediately after first login!**
