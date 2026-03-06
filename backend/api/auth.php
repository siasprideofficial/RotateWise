<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        if ($method === 'POST') {
            login();
        }
        break;
    case 'logout':
        if ($method === 'POST') {
            logout();
        }
        break;
    case 'check':
        if ($method === 'GET') {
            checkSession();
        }
        break;
    case 'update-profile':
        if ($method === 'PUT') {
            updateProfile();
        }
        break;
    case 'change-password':
        if ($method === 'PUT') {
            changePassword();
        }
        break;
    default:
        sendResponse(['error' => 'Invalid action'], 400);
}

function login() {
    $data = getJsonInput();
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        sendResponse(['error' => 'Email and password are required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ?");
    $stmt->execute([$email]);
    $admin = $stmt->fetch();
    
    if ($admin && password_verify($password, $admin['password'])) {
        session_start();
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_email'] = $admin['email'];
        $_SESSION['admin_name'] = $admin['name'];
        
        sendResponse([
            'success' => true,
            'admin' => [
                'id' => $admin['id'],
                'name' => $admin['name'],
                'email' => $admin['email'],
                'phone' => $admin['phone']
            ]
        ]);
    } else {
        sendResponse(['error' => 'Invalid email or password'], 401);
    }
}

function logout() {
    session_start();
    session_destroy();
    sendResponse(['success' => true, 'message' => 'Logged out successfully']);
}

function checkSession() {
    session_start();
    if (isset($_SESSION['admin_id'])) {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("SELECT id, name, email, phone FROM admins WHERE id = ?");
        $stmt->execute([$_SESSION['admin_id']]);
        $admin = $stmt->fetch();
        
        if ($admin) {
            sendResponse(['authenticated' => true, 'admin' => $admin]);
        }
    }
    sendResponse(['authenticated' => false], 401);
}

function updateProfile() {
    $adminId = checkAuth();
    $data = getJsonInput();
    
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    
    if (empty($name) || empty($email)) {
        sendResponse(['error' => 'Name and email are required'], 400);
    }
    
    $pdo = getDBConnection();
    
    // Check if email is taken by another admin
    $stmt = $pdo->prepare("SELECT id FROM admins WHERE email = ? AND id != ?");
    $stmt->execute([$email, $adminId]);
    if ($stmt->fetch()) {
        sendResponse(['error' => 'Email is already taken'], 400);
    }
    
    $stmt = $pdo->prepare("UPDATE admins SET name = ?, email = ?, phone = ? WHERE id = ?");
    $stmt->execute([$name, $email, $phone, $adminId]);
    
    $_SESSION['admin_name'] = $name;
    $_SESSION['admin_email'] = $email;
    
    sendResponse(['success' => true, 'message' => 'Profile updated successfully']);
}

function changePassword() {
    $adminId = checkAuth();
    $data = getJsonInput();
    
    $currentPassword = $data['currentPassword'] ?? '';
    $newPassword = $data['newPassword'] ?? '';
    
    if (empty($currentPassword) || empty($newPassword)) {
        sendResponse(['error' => 'Current and new passwords are required'], 400);
    }
    
    if (strlen($newPassword) < 6) {
        sendResponse(['error' => 'New password must be at least 6 characters'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT password FROM admins WHERE id = ?");
    $stmt->execute([$adminId]);
    $admin = $stmt->fetch();
    
    if (!password_verify($currentPassword, $admin['password'])) {
        sendResponse(['error' => 'Current password is incorrect'], 400);
    }
    
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE admins SET password = ? WHERE id = ?");
    $stmt->execute([$hashedPassword, $adminId]);
    
    sendResponse(['success' => true, 'message' => 'Password changed successfully']);
}
?>
