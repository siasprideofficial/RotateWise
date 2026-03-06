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
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

// POST login - action=login
if ($method === 'POST' && $action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = isset($input['email']) ? trim($input['email']) : '';
    $password = isset($input['password']) ? $input['password'] : '';
    
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    
    $stmt = $db->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$admin) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    
    if (!password_verify($password, $admin['password'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    
    // Generate token
    $token = bin2hex(random_bytes(32));
    
    // Update last login
    $stmt = $db->prepare("UPDATE admins SET updated_at = NOW() WHERE id = ?");
    $stmt->execute([$admin['id']]);
    
    echo json_encode([
        'success' => true,
        'token' => $token,
        'admin' => [
            'id' => (int)$admin['id'],
            'name' => $admin['name'],
            'email' => $admin['email'],
            'phone' => $admin['phone'] ?? ''
        ]
    ]);
    exit;
}

// POST logout - action=logout
if ($method === 'POST' && $action === 'logout') {
    echo json_encode(['success' => true]);
    exit;
}

// GET check session - action=check
if ($method === 'GET' && $action === 'check') {
    // For now, just return not authenticated (client-side handles session)
    echo json_encode(['authenticated' => false]);
    exit;
}

// PUT update profile - action=update-profile
if ($method === 'PUT' && $action === 'update-profile') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $db->prepare("UPDATE admins SET name = ?, email = ?, phone = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([
        $input['name'] ?? '',
        $input['email'] ?? '',
        $input['phone'] ?? '',
        $input['id'] ?? 1
    ]);
    
    echo json_encode(['success' => true]);
    exit;
}

// PUT change password - action=change-password
if ($method === 'PUT' && $action === 'change-password') {
    $input = json_decode(file_get_contents('php://input'), true);
    $adminId = $input['id'] ?? 1;
    $currentPassword = $input['currentPassword'] ?? '';
    $newPassword = $input['newPassword'] ?? '';
    
    // Get current password hash
    $stmt = $db->prepare("SELECT password FROM admins WHERE id = ?");
    $stmt->execute([$adminId]);
    $admin = $stmt->fetch();
    
    if (!$admin || !password_verify($currentPassword, $admin['password'])) {
        echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
        exit;
    }
    
    // Update password
    $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $db->prepare("UPDATE admins SET password = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$newHash, $adminId]);
    
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid request']);
?>
