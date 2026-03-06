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

// GET all form fields - action=list
if ($method === 'GET' && $action === 'list') {
    $stmt = $db->query("SELECT * FROM form_fields ORDER BY sort_order ASC");
    $fields = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get options for each select field
    foreach ($fields as &$field) {
        $field['required'] = (bool)$field['is_required'];
        $field['enabled'] = (bool)$field['is_enabled'];
        $field['sort_order'] = (int)$field['sort_order'];
        
        if ($field['field_type'] === 'select') {
            $optStmt = $db->prepare("SELECT * FROM field_options WHERE field_id = ? ORDER BY option_order ASC");
            $optStmt->execute([$field['id']]);
            $field['options'] = $optStmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($field['options'] as &$opt) {
                $opt['sort_order'] = (int)$opt['option_order'];
            }
        } else {
            $field['options'] = [];
        }
    }
    
    echo json_encode(['fields' => $fields]);
    exit;
}

// POST create field - action=create
if ($method === 'POST' && $action === 'create') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Get max order
    $maxOrder = $db->query("SELECT MAX(sort_order) FROM form_fields")->fetchColumn() ?? 0;
    
    $stmt = $db->prepare("INSERT INTO form_fields (field_name, field_label, field_type, placeholder, is_required, is_enabled, sort_order) VALUES (?, ?, ?, ?, ?, 1, ?)");
    $stmt->execute([
        $input['field_name'] ?? '',
        $input['label'] ?? $input['field_label'] ?? '',
        $input['field_type'] ?? 'text',
        $input['placeholder'] ?? '',
        ($input['required'] ?? $input['is_required'] ?? false) ? 1 : 0,
        $maxOrder + 1
    ]);
    
    echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
    exit;
}

// PUT update field - action=update&id=X
if ($method === 'PUT' && $action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = isset($_GET['id']) ? (int)$_GET['id'] : ($input['id'] ?? 0);
    
    $stmt = $db->prepare("UPDATE form_fields SET field_label = ?, placeholder = ?, is_required = ?, is_enabled = ? WHERE id = ?");
    $stmt->execute([
        $input['label'] ?? $input['field_label'] ?? '',
        $input['placeholder'] ?? '',
        ($input['required'] ?? $input['is_required'] ?? false) ? 1 : 0,
        ($input['enabled'] ?? $input['is_enabled'] ?? true) ? 1 : 0,
        $id
    ]);
    
    echo json_encode(['success' => true]);
    exit;
}

// DELETE field - action=delete&id=X
if ($method === 'DELETE' && $action === 'delete') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    // Delete options first
    $stmt = $db->prepare("DELETE FROM field_options WHERE field_id = ?");
    $stmt->execute([$id]);
    
    // Delete field
    $stmt = $db->prepare("DELETE FROM form_fields WHERE id = ?");
    $stmt->execute([$id]);
    
    echo json_encode(['success' => true]);
    exit;
}

// PUT reorder fields - action=reorder
if ($method === 'PUT' && $action === 'reorder') {
    $input = json_decode(file_get_contents('php://input'), true);
    $fields = $input['fields'] ?? [];
    
    foreach ($fields as $index => $fieldId) {
        $stmt = $db->prepare("UPDATE form_fields SET sort_order = ? WHERE id = ?");
        $stmt->execute([$index + 1, $fieldId]);
    }
    
    echo json_encode(['success' => true]);
    exit;
}

// Options endpoints - action=options
if ($action === 'options') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    // POST create option
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $fieldId = $input['field_id'] ?? 0;
        
        $maxOrder = $db->query("SELECT MAX(option_order) FROM field_options WHERE field_id = " . (int)$fieldId)->fetchColumn() ?? 0;
        
        $stmt = $db->prepare("INSERT INTO field_options (field_id, option_value, option_label, option_order) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $fieldId,
            $input['option_value'] ?? '',
            $input['option_label'] ?? '',
            $maxOrder + 1
        ]);
        
        echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
        exit;
    }
    
    // PUT update option
    if ($method === 'PUT' && $id > 0) {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $db->prepare("UPDATE field_options SET option_value = ?, option_label = ? WHERE id = ?");
        $stmt->execute([
            $input['option_value'] ?? '',
            $input['option_label'] ?? '',
            $id
        ]);
        
        echo json_encode(['success' => true]);
        exit;
    }
    
    // DELETE option
    if ($method === 'DELETE' && $id > 0) {
        $stmt = $db->prepare("DELETE FROM field_options WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}

echo json_encode(['error' => 'Invalid request']);
?>
