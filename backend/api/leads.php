<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'list':
        if ($method === 'GET') {
            getLeads();
        }
        break;
    case 'get':
        if ($method === 'GET') {
            getLead();
        }
        break;
    case 'create':
        if ($method === 'POST') {
            createLead();
        }
        break;
    case 'update':
        if ($method === 'PUT') {
            updateLead();
        }
        break;
    case 'update-status':
        if ($method === 'PUT') {
            updateLeadStatus();
        }
        break;
    case 'delete':
        if ($method === 'DELETE') {
            deleteLead();
        }
        break;
    case 'stats':
        if ($method === 'GET') {
            getStats();
        }
        break;
    default:
        sendResponse(['error' => 'Invalid action'], 400);
}

function getLeads() {
    checkAuth();
    $pdo = getDBConnection();
    
    $status = $_GET['status'] ?? '';
    $source = $_GET['source'] ?? '';
    $search = $_GET['search'] ?? '';
    
    $sql = "SELECT * FROM leads WHERE 1=1";
    $params = [];
    
    if (!empty($status)) {
        $sql .= " AND status = ?";
        $params[] = $status;
    }
    
    if (!empty($source)) {
        $sql .= " AND source = ?";
        $params[] = $source;
    }
    
    if (!empty($search)) {
        $sql .= " AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)";
        $searchTerm = "%$search%";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }
    
    $sql .= " ORDER BY created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $leads = $stmt->fetchAll();
    
    sendResponse(['leads' => $leads]);
}

function getLead() {
    checkAuth();
    $id = $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Lead ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM leads WHERE id = ?");
    $stmt->execute([$id]);
    $lead = $stmt->fetch();
    
    if (!$lead) {
        sendResponse(['error' => 'Lead not found'], 404);
    }
    
    sendResponse(['lead' => $lead]);
}

function createLead() {
    $data = getJsonInput();
    
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $loanAmount = $data['loanAmount'] ?? $data['loan_amount'] ?? '';
    $employmentStatus = $data['employmentStatus'] ?? $data['employment_status'] ?? '';
    $message = $data['message'] ?? $data['details'] ?? '';
    $source = $data['source'] ?? 'contact-page';
    
    if (empty($name) || empty($email)) {
        sendResponse(['error' => 'Name and email are required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("
        INSERT INTO leads (name, email, phone, loan_amount, employment_status, message, source, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'new')
    ");
    $stmt->execute([$name, $email, $phone, $loanAmount, $employmentStatus, $message, $source]);
    
    $leadId = $pdo->lastInsertId();
    
    // Create notification for new lead
    $notifStmt = $pdo->prepare("
        INSERT INTO notifications (type, title, message, lead_id) 
        VALUES ('lead', 'New Lead Received', ?, ?)
    ");
    $notifStmt->execute(["New consultation request from $name ($email)", $leadId]);
    
    sendResponse(['success' => true, 'id' => $leadId, 'message' => 'Lead created successfully'], 201);
}

function updateLead() {
    checkAuth();
    $data = getJsonInput();
    $id = $data['id'] ?? $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Lead ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    
    $fields = [];
    $params = [];
    
    $allowedFields = ['name', 'email', 'phone', 'loan_amount', 'employment_status', 'message', 'status'];
    
    foreach ($allowedFields as $field) {
        $camelCase = lcfirst(str_replace('_', '', ucwords($field, '_')));
        if (isset($data[$field]) || isset($data[$camelCase])) {
            $fields[] = "$field = ?";
            $params[] = $data[$field] ?? $data[$camelCase];
        }
    }
    
    if (empty($fields)) {
        sendResponse(['error' => 'No fields to update'], 400);
    }
    
    $params[] = $id;
    $sql = "UPDATE leads SET " . implode(', ', $fields) . " WHERE id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    sendResponse(['success' => true, 'message' => 'Lead updated successfully']);
}

function updateLeadStatus() {
    checkAuth();
    $data = getJsonInput();
    $id = $data['id'] ?? $_GET['id'] ?? 0;
    $status = $data['status'] ?? '';
    
    if (!$id || !$status) {
        sendResponse(['error' => 'Lead ID and status are required'], 400);
    }
    
    $validStatuses = ['new', 'contacted', 'converted', 'closed'];
    if (!in_array($status, $validStatuses)) {
        sendResponse(['error' => 'Invalid status'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("UPDATE leads SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);
    
    // Create notification for status change
    $notifStmt = $pdo->prepare("
        INSERT INTO notifications (type, title, message, lead_id) 
        VALUES ('status', 'Lead Status Updated', ?, ?)
    ");
    $notifStmt->execute(["Lead #$id status changed to $status", $id]);
    
    sendResponse(['success' => true, 'message' => 'Status updated successfully']);
}

function deleteLead() {
    checkAuth();
    $id = $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Lead ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
    $stmt->execute([$id]);
    
    sendResponse(['success' => true, 'message' => 'Lead deleted successfully']);
}

function getStats() {
    checkAuth();
    $pdo = getDBConnection();
    
    // Total leads
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM leads");
    $total = $stmt->fetch()['total'];
    
    // New leads (last 7 days)
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM leads WHERE status = 'new'");
    $newLeads = $stmt->fetch()['count'];
    
    // Contacted
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM leads WHERE status = 'contacted'");
    $contacted = $stmt->fetch()['count'];
    
    // Converted
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM leads WHERE status = 'converted'");
    $converted = $stmt->fetch()['count'];
    
    // Recent leads
    $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC LIMIT 5");
    $recentLeads = $stmt->fetchAll();
    
    sendResponse([
        'stats' => [
            'total' => (int)$total,
            'new' => (int)$newLeads,
            'contacted' => (int)$contacted,
            'converted' => (int)$converted
        ],
        'recentLeads' => $recentLeads
    ]);
}
?>
