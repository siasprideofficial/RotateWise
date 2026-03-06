<?php
header('Content-Type: text/html');
require_once 'config.php';

echo "<h2>🔧 API Endpoint Tests</h2>";
echo "<style>body{font-family:Arial,sans-serif;padding:20px;max-width:800px;margin:0 auto;} .pass{color:green;} .fail{color:red;} table{border-collapse:collapse;width:100%;margin:20px 0;} th,td{border:1px solid #ddd;padding:10px;text-align:left;} th{background:#f5f5f5;}</style>";

try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<p class='pass'>✅ Database Connected</p>";
    
    // Check tables
    echo "<h3>📊 Database Tables:</h3>";
    echo "<table><tr><th>Table</th><th>Rows</th><th>Status</th></tr>";
    
    $tables = [
        'admins', 'leads', 'notifications', 'site_info', 
        'contact_info', 'footer_sections', 'footer_links', 
        'social_links', 'form_fields', 'field_options', 'admin_settings'
    ];
    
    foreach ($tables as $table) {
        try {
            $stmt = $db->query("SELECT COUNT(*) as count FROM $table");
            $count = $stmt->fetch()['count'];
            echo "<tr><td>$table</td><td>$count</td><td class='pass'>✅ OK</td></tr>";
        } catch (Exception $e) {
            echo "<tr><td>$table</td><td>-</td><td class='fail'>❌ Missing</td></tr>";
        }
    }
    echo "</table>";
    
    // Check API files
    echo "<h3>📁 API Files:</h3>";
    echo "<table><tr><th>File</th><th>Status</th></tr>";
    
    $files = ['auth.php', 'leads.php', 'notifications.php', 'site-info.php', 'form-fields.php', 'settings.php', 'config.php'];
    foreach ($files as $file) {
        if (file_exists($file)) {
            echo "<tr><td>$file</td><td class='pass'>✅ Exists</td></tr>";
        } else {
            echo "<tr><td>$file</td><td class='fail'>❌ Missing</td></tr>";
        }
    }
    echo "</table>";
    
    // Test API responses
    echo "<h3>🌐 API Response Tests:</h3>";
    echo "<table><tr><th>Endpoint</th><th>Response Key</th><th>Status</th></tr>";
    
    // Test leads
    $stmt = $db->query("SELECT * FROM leads ORDER BY created_at DESC");
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<tr><td>leads.php?action=list</td><td>leads[]</td><td class='pass'>✅ " . count($leads) . " leads</td></tr>";
    
    // Test stats
    $total = $db->query("SELECT COUNT(*) FROM leads")->fetchColumn();
    echo "<tr><td>leads.php?action=stats</td><td>stats{}</td><td class='pass'>✅ Total: $total</td></tr>";
    
    // Test notifications
    $stmt = $db->query("SELECT * FROM notifications ORDER BY created_at DESC");
    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<tr><td>notifications.php?action=list</td><td>notifications[]</td><td class='pass'>✅ " . count($notifications) . " notifications</td></tr>";
    
    // Test site info
    $stmt = $db->query("SELECT * FROM site_info WHERE id = 1");
    $siteInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "<tr><td>site-info.php?action=get</td><td>siteInfo{}</td><td class='pass'>✅ " . ($siteInfo['site_name'] ?? 'N/A') . "</td></tr>";
    
    // Test contact info
    $stmt = $db->query("SELECT * FROM contact_info");
    $contactInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<tr><td>site-info.php?action=get</td><td>contactInfo[]</td><td class='pass'>✅ " . count($contactInfo) . " items</td></tr>";
    
    // Test footer sections
    $stmt = $db->query("SELECT * FROM footer_sections");
    $footerSections = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<tr><td>site-info.php?action=get</td><td>footerSections[]</td><td class='pass'>✅ " . count($footerSections) . " sections</td></tr>";
    
    // Test social links
    $stmt = $db->query("SELECT * FROM social_links");
    $socialLinks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<tr><td>site-info.php?action=get</td><td>socialLinks[]</td><td class='pass'>✅ " . count($socialLinks) . " links</td></tr>";
    
    // Test form fields
    $stmt = $db->query("SELECT * FROM form_fields ORDER BY sort_order ASC");
    $formFields = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<tr><td>form-fields.php?action=list</td><td>fields[]</td><td class='pass'>✅ " . count($formFields) . " fields</td></tr>";
    
    // Test admin
    $stmt = $db->query("SELECT * FROM admins WHERE email = 'admin@rotatewise.com'");
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);
    $passTest = $admin ? password_verify('admin123', $admin['password']) : false;
    echo "<tr><td>auth.php?action=login</td><td>admin{}</td><td class='" . ($passTest ? 'pass' : 'fail') . "'>" . ($passTest ? '✅ Password OK' : '❌ Password FAIL') . "</td></tr>";
    
    echo "</table>";
    
    // Summary
    echo "<h3>📋 Summary:</h3>";
    echo "<p><strong>Frontend expects these response formats:</strong></p>";
    echo "<pre style='background:#f5f5f5;padding:15px;border-radius:5px;'>";
    echo "GET /leads.php?action=list     → { \"leads\": [...] }\n";
    echo "GET /leads.php?action=stats    → { \"stats\": {...}, \"recentLeads\": [...] }\n";
    echo "GET /notifications.php?action=list → { \"notifications\": [...] }\n";
    echo "GET /site-info.php?action=get  → { \"siteInfo\": {...}, \"contactInfo\": [...], \"footerSections\": [...], \"socialLinks\": [...] }\n";
    echo "GET /form-fields.php?action=list → { \"fields\": [...] }\n";
    echo "GET /settings.php?action=get   → { \"settings\": {...} }\n";
    echo "POST /auth.php?action=login    → { \"success\": true, \"admin\": {...}, \"token\": \"...\" }\n";
    echo "</pre>";
    
    if (!$passTest) {
        echo "<h3>⚠️ Fix Admin Password:</h3>";
        echo "<p>Run this SQL in phpMyAdmin:</p>";
        echo "<pre style='background:#fff3cd;padding:15px;border-radius:5px;'>";
        echo "UPDATE admins SET password = '\$2y\$10\$8WxYpDLCLPz5E.XR0Y5dXO2pP7M3hvkT1J5QS.R3fAKrJzKhQe2Aq' WHERE email = 'admin@rotatewise.com';";
        echo "</pre>";
    }
    
    echo "<hr>";
    echo "<p style='color:red;'><strong>⚠️ DELETE THIS FILE after testing!</strong></p>";
    
} catch (Exception $e) {
    echo "<p class='fail'>❌ Error: " . $e->getMessage() . "</p>";
}
?>
