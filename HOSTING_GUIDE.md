# RotateWise Hosting Guide for Hostinger

## Quick Setup (5 Steps)

### Step 1: Create Database
1. Login to **Hostinger Panel**
2. Go to **Databases** → **MySQL Databases**
3. Create new database and note down:
   - Database Name
   - Database Username
   - Database Password

### Step 2: Import Database Schema
1. Go to **Databases** → **phpMyAdmin**
2. Select your database
3. Click **Import** tab
4. Upload `backend/database.sql` file
5. Click **Go** to import

### Step 3: Upload Website Files
Upload to `public_html/`:
```
public_html/
├── index.html          (from dist/)
├── assets/             (from dist/)
└── api/
    ├── .htaccess       (from backend/api/)
    ├── config.php      (from backend/api/)
    ├── auth.php        (from backend/api/)
    ├── leads.php       (from backend/api/)
    ├── notifications.php
    ├── site-info.php
    ├── form-fields.php
    ├── settings.php
    └── test.php        (for testing, delete later)
```

### Step 4: Configure Database
Edit `api/config.php` on Hostinger with your credentials:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_rotatewise');  // Your database name
define('DB_USER', 'u123456789_admin');       // Your database user
define('DB_PASS', 'YourPassword123');        // Your database password
```

### Step 5: Test
1. Visit: `https://yourdomain.com/api/test.php`
2. All tests should show ✅
3. Delete `test.php` after successful testing

---

## Admin Login
- **URL**: `https://yourdomain.com/#/admin`
- **Email**: `admin@rotatewise.com`
- **Password**: `admin123`
- ⚠️ **Change password immediately in Settings!**

---

## Troubleshooting

### Error: "Unable to connect to server"

**Check 1: Test the API**
Visit `https://yourdomain.com/api/test.php` in your browser.
- If you see PHP code instead of results → PHP is not enabled
- If you see database error → Check config.php credentials

**Check 2: Verify config.php credentials**
```php
// Make sure these match your Hostinger database exactly:
define('DB_HOST', 'localhost');           // Usually localhost
define('DB_NAME', 'u123456789_dbname');   // From Hostinger panel
define('DB_USER', 'u123456789_username'); // From Hostinger panel
define('DB_PASS', 'your_password');       // The password you set
```

**Check 3: File permissions**
In Hostinger File Manager:
- `api/` folder: 755
- All `.php` files: 644

**Check 4: .htaccess uploaded**
Make sure `api/.htaccess` file is uploaded (it handles CORS).

### Error: "There was an error submitting your request"

**Check 1: Database tables exist**
Visit `https://yourdomain.com/api/test.php` and verify all tables show ✅

**Check 2: Re-import database**
1. Go to phpMyAdmin
2. Drop all tables
3. Re-import `database.sql`

### Error: 500 Internal Server Error

**Check 1: PHP version**
- Go to Hostinger → **Advanced** → **PHP Configuration**
- Select PHP 8.0 or higher

**Check 2: Error logs**
- Go to Hostinger → **Advanced** → **Error Logs**
- Check for specific PHP errors

---

## File Structure on Hostinger

```
public_html/
│
├── index.html              ← Main website
├── assets/
│   ├── index-xxxxx.js      ← JavaScript
│   └── index-xxxxx.css     ← Styles
│
└── api/
    ├── .htaccess           ← CORS & routing
    ├── config.php          ← Database credentials
    ├── auth.php            ← Login/logout
    ├── leads.php           ← Contact form submissions
    ├── notifications.php   ← Admin notifications
    ├── site-info.php       ← Site settings
    ├── form-fields.php     ← Form customization
    ├── settings.php        ← Admin settings
    └── test.php            ← Testing (delete after)
```

---

## Common Hostinger Issues

### Issue: API returns HTML instead of JSON
**Solution**: PHP might not be processing. Check PHP version in Hostinger panel.

### Issue: CORS errors in browser console
**Solution**: Make sure `.htaccess` file is uploaded to `api/` folder.

### Issue: Database connection refused
**Solution**: 
- DB_HOST should be `localhost` (not your domain)
- Verify username/password in Hostinger → Databases

### Issue: 404 on API endpoints
**Solution**: Make sure all PHP files are in `public_html/api/` folder.

---

## Security Checklist

After successful setup:

- [ ] Delete `api/test.php`
- [ ] Change admin password in Admin Panel → Settings
- [ ] Change `JWT_SECRET` in config.php to a random string
- [ ] Enable SSL certificate (Hostinger → SSL → Install)
- [ ] Set proper file permissions (755 for folders, 644 for files)

---

## Need Help?

1. Visit `https://yourdomain.com/api/test.php` first
2. Check Hostinger Error Logs
3. Verify all credentials match exactly
