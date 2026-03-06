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

// GET all leads - action=list
if ($method === 'GET' && $action === 'list') {
    $sql = "SELECT * FROM leads WHERE 1=1";
    $params = [];
    
    if (!empty($_GET['status'])) {
        $sql .= " AND status = ?";
        $params[] = $_GET['status'];
    }
    if (!empty($_GET['source'])) {
        $sql .= " AND source = ?";
        $params[] = $_GET['source'];
    }
    if (!empty($_GET['search'])) {
        $sql .= " AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)";
        $search = '%' . $_GET['search'] . '%';
        $params[] = $search;
        $params[] = $search;
        $params[] = $search;
    }
    
    $sql .= " ORDER BY created_at DESC";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['leads' => $leads]);
    exit;
}

// GET single lead - action=get&id=X
if ($method === 'GET' && $action === 'get') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    $stmt = $db->prepare("SELECT * FROM leads WHERE id = ?");
    $stmt->execute([$id]);
    $lead = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['lead' => $lead]);
    exit;
}

// GET stats - action=stats
if ($method === 'GET' && $action === 'stats') {
    $total = $db->query("SELECT COUNT(*) FROM leads")->fetchColumn();
    $new = $db->query("SELECT COUNT(*) FROM leads WHERE status = 'new'")->fetchColumn();
    $contacted = $db->query("SELECT COUNT(*) FROM leads WHERE status = 'contacted'")->fetchColumn();
    $converted = $db->query("SELECT COUNT(*) FROM leads WHERE status = 'converted'")->fetchColumn();
    
    // Get recent leads
    $stmt = $db->query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 5");
    $recentLeads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'stats' => [
            'total' => (int)$total,
            'new' => (int)$new,
            'contacted' => (int)$contacted,
            'converted' => (int)$converted
        ],
        'recentLeads' => $recentLeads
    ]);
    exit;
}

// POST create lead - action=create
if ($method === 'POST' && ($action === 'create' || empty($action))) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $db->prepare("INSERT INTO leads (name, email, phone, loan_amount, employment_status, message, source, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', NOW())");
    $stmt->execute([
        $input['name'] ?? '',
        $input['email'] ?? '',
        $input['phone'] ?? '',
        $input['loanAmount'] ?? $input['loan_amount'] ?? '',
        $input['employmentStatus'] ?? $input['employment_status'] ?? '',
        $input['message'] ?? '',
        $input['source'] ?? 'website'
    ]);
    
    $leadId = $db->lastInsertId();
    
    // Create notification
    $stmt = $db->prepare("INSERT INTO notifications (type, title, message, lead_id, is_read, created_at) VALUES ('lead', 'New Lead', ?, ?, 0, NOW())");
    $stmt->execute([
        'New consultation request from ' . ($input['name'] ?? 'Unknown'),
        $leadId
    ]);
    
    echo json_encode(['success' => true, 'id' => (int)$leadId]);
    exit;
}

// PUT update lead status - action=update-status
if ($method === 'PUT' && $action === 'update-status') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? 0;
    $status = $input['status'] ?? 'new';
    
    $stmt = $db->prepare("UPDATE leads SET status = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$status, $id]);
    
    // Create notification for status change
    $stmt = $db->prepare("SELECT name FROM leads WHERE id = ?");
    $stmt->execute([$id]);
    $lead = $stmt->fetch();
    
    $stmt = $db->prepare("INSERT INTO notifications (type, title, message, lead_id, is_read, created_at) VALUES ('status', 'Status Updated', ?, ?, 0, NOW())");
    $stmt->execute([
        'Lead "' . ($lead['name'] ?? 'Unknown') . '" status changed to ' . $status,
        $id
    ]);
    
    echo json_encode(['success' => true]);
    exit;
}

// PUT update lead - action=update&id=X
if ($method === 'PUT' && $action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = isset($_GET['id']) ? (int)$_GET['id'] : ($input['id'] ?? 0);
    
    $stmt = $db->prepare("UPDATE leads SET status = ?, updated_at = NOW() WHERE id = ?");
    $stmt->execute([$input['status'] ?? 'new', $id]);
    
    echo json_encode(['success' => true]);
    exit;
}

// DELETE lead - action=delete&id=X
if ($method === 'DELETE' && $action === 'delete') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    // Delete related notifications first
    $stmt = $db->prepare("DELETE FROM notifications WHERE lead_id = ?");
    $stmt->execute([$id]);
    
    // Delete lead
    $stmt = $db->prepare("DELETE FROM leads WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['error' => 'Invalid request']);
?>
