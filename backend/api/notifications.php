<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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

// GET all notifications - action=list
if ($method === 'GET' && $action === 'list') {
    $filter = isset($_GET['filter']) ? $_GET['filter'] : 'all';
    
    $sql = "SELECT n.*, l.name as lead_name, l.email as lead_email 
            FROM notifications n 
            LEFT JOIN leads l ON n.lead_id = l.id 
            WHERE 1=1";
    
    if ($filter === 'read') {
        $sql .= " AND n.is_read = 1";
    } elseif ($filter === 'unread') {
        $sql .= " AND n.is_read = 0";
    }
    
    $sql .= " ORDER BY n.created_at DESC";
    
    $stmt = $db->query($sql);
    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Convert is_read to boolean
    foreach ($notifications as &$n) {
        $n['is_read'] = (bool)$n['is_read'];
    }
    
    echo json_encode(['notifications' => $notifications]);
    exit;
}

// GET unread count - action=unread-count
if ($method === 'GET' && $action === 'unread-count') {
    $stmt = $db->query("SELECT COUNT(*) as count FROM notifications WHERE is_read = 0");
    $count = $stmt->fetch()['count'];
    echo json_encode(['count' => (int)$count]);
    exit;
}

// PUT mark as read - action=mark-read
if ($method === 'PUT' && $action === 'mark-read') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? 0;
    
    $stmt = $db->prepare("UPDATE notifications SET is_read = 1 WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true]);
    exit;
}

// PUT mark all as read - action=mark-all-read
if ($method === 'PUT' && $action === 'mark-all-read') {
    $db->query("UPDATE notifications SET is_read = 1");
    echo json_encode(['success' => true]);
    exit;
}

// DELETE notification - action=delete&id=X
if ($method === 'DELETE' && $action === 'delete') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    $stmt = $db->prepare("DELETE FROM notifications WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
}

// DELETE clear read notifications - action=clear-read
if ($method === 'DELETE' && $action === 'clear-read') {
    $db->query("DELETE FROM notifications WHERE is_read = 1");
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['error' => 'Invalid request']);
?>
