<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

// GET settings - action=get
if ($method === 'GET' && $action === 'get') {
    // Get settings from admin_settings table or return defaults
    $stmt = $db->query("SELECT * FROM admin_settings WHERE id = 1");
    $settings = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($settings) {
        echo json_encode([
            'settings' => [
                'emailNotifications' => (bool)$settings['email_notifications'],
                'dailySummary' => (bool)$settings['daily_summary'],
                'weeklyReport' => (bool)$settings['weekly_report']
            ]
        ]);
    } else {
        // Return defaults
        echo json_encode([
            'settings' => [
                'emailNotifications' => true,
                'dailySummary' => false,
                'weeklyReport' => true
            ]
        ]);
    }
    exit;
}

// PUT update settings - action=update
if ($method === 'PUT' && $action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Check if settings exist
    $stmt = $db->query("SELECT id FROM admin_settings WHERE id = 1");
    $exists = $stmt->fetch();
    
    if ($exists) {
        $stmt = $db->prepare("UPDATE admin_settings SET 
            email_notifications = ?, 
            daily_summary = ?, 
            weekly_report = ?,
            updated_at = NOW()
            WHERE id = 1");
        $stmt->execute([
            ($input['emailNotifications'] ?? false) ? 1 : 0,
            ($input['dailySummary'] ?? false) ? 1 : 0,
            ($input['weeklyReport'] ?? false) ? 1 : 0
        ]);
    } else {
        $stmt = $db->prepare("INSERT INTO admin_settings (id, email_notifications, daily_summary, weekly_report, created_at, updated_at) 
            VALUES (1, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([
            ($input['emailNotifications'] ?? false) ? 1 : 0,
            ($input['dailySummary'] ?? false) ? 1 : 0,
            ($input['weeklyReport'] ?? false) ? 1 : 0
        ]);
    }
    
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['error' => 'Invalid request']);
?>
