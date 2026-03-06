<?php
// Test file to check database connection and PHP setup
// Access this at: https://yourdomain.com/api/test.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo "<h2>PHP Test Results</h2>";

// Test 1: PHP is working
echo "<p>✅ PHP is working</p>";

// Test 2: Check config file
if (file_exists('config.php')) {
    echo "<p>✅ config.php found</p>";
    require_once 'config.php';
    
    // Test 3: Check database connection
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        echo "<p>✅ Database connection successful!</p>";
        
        // Test 4: Check if tables exist
        $tables = ['admins', 'leads', 'notifications', 'site_info', 'form_fields', 'field_options'];
        foreach ($tables as $table) {
            $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
            if ($stmt->rowCount() > 0) {
                echo "<p>✅ Table '$table' exists</p>";
            } else {
                echo "<p>❌ Table '$table' NOT found</p>";
            }
        }
        
        // Test 5: Check admin user
        $stmt = $pdo->query("SELECT email FROM admins LIMIT 1");
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($admin) {
            echo "<p>✅ Admin user found: " . $admin['email'] . "</p>";
        } else {
            echo "<p>❌ No admin user found</p>";
        }
        
    } catch (PDOException $e) {
        echo "<p>❌ Database connection FAILED: " . $e->getMessage() . "</p>";
        echo "<p>Check your config.php credentials:</p>";
        echo "<ul>";
        echo "<li>DB_HOST: " . DB_HOST . "</li>";
        echo "<li>DB_NAME: " . DB_NAME . "</li>";
        echo "<li>DB_USER: " . DB_USER . "</li>";
        echo "<li>DB_PASS: (hidden)</li>";
        echo "</ul>";
    }
} else {
    echo "<p>❌ config.php NOT found</p>";
}

echo "<hr>";
echo "<p><strong>If all tests pass, your API should work!</strong></p>";
?>
