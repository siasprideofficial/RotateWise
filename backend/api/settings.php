<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'get';

switch ($action) {
    case 'get':
        if ($method === 'GET') {
            getSettings();
        }
        break;
    case 'update':
        if ($method === 'PUT') {
            updateSettings();
        }
        break;
    default:
        sendResponse(['error' => 'Invalid action'], 400);
}

function getSettings() {
    $adminId = checkAuth();
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("SELECT setting_key, setting_value FROM admin_settings WHERE admin_id = ?");
    $stmt->execute([$adminId]);
    $rows = $stmt->fetchAll();
    
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'] === 'true' ? true : ($row['setting_value'] === 'false' ? false : $row['setting_value']);
    }
    
    sendResponse(['settings' => $settings]);
}

function updateSettings() {
    $adminId = checkAuth();
    $data = getJsonInput();
    
    $pdo = getDBConnection();
    
    $allowedKeys = ['emailNotifications', 'dailySummary', 'weeklyReport'];
    
    foreach ($data as $key => $value) {
        if (in_array($key, $allowedKeys)) {
            $stringValue = is_bool($value) ? ($value ? 'true' : 'false') : $value;
            
            $stmt = $pdo->prepare("INSERT INTO admin_settings (admin_id, setting_key, setting_value) 
                                   VALUES (?, ?, ?) 
                                   ON DUPLICATE KEY UPDATE setting_value = ?");
            $stmt->execute([$adminId, $key, $stringValue, $stringValue]);
        }
    }
    
    sendResponse(['success' => true, 'message' => 'Settings updated']);
}
?>
