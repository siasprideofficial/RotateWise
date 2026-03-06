<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'list':
        if ($method === 'GET') {
            getFormFields();
        }
        break;
    case 'create':
        if ($method === 'POST') {
            createFormField();
        }
        break;
    case 'update':
        if ($method === 'PUT') {
            updateFormField();
        }
        break;
    case 'delete':
        if ($method === 'DELETE') {
            deleteFormField();
        }
        break;
    case 'reorder':
        if ($method === 'PUT') {
            reorderFields();
        }
        break;
    case 'options':
        handleOptions($method);
        break;
    default:
        sendResponse(['error' => 'Invalid action'], 400);
}

function getFormFields() {
    $pdo = getDBConnection();
    
    $stmt = $pdo->query("SELECT * FROM form_fields ORDER BY sort_order");
    $fields = $stmt->fetchAll();
    
    foreach ($fields as &$field) {
        if ($field['field_type'] === 'select') {
            $optStmt = $pdo->prepare("SELECT * FROM form_options WHERE field_id = ? ORDER BY sort_order");
            $optStmt->execute([$field['id']]);
            $field['options'] = $optStmt->fetchAll();
        } else {
            $field['options'] = [];
        }
    }
    
    sendResponse(['fields' => $fields]);
}

function createFormField() {
    checkAuth();
    $data = getJsonInput();
    
    $pdo = getDBConnection();
    
    // Get max sort order
    $stmt = $pdo->query("SELECT MAX(sort_order) as max_order FROM form_fields");
    $maxOrder = $stmt->fetch()['max_order'] ?? 0;
    
    $stmt = $pdo->prepare("INSERT INTO form_fields (field_name, label, field_type, placeholder, required, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['field_name'] ?? $data['fieldName'] ?? '',
        $data['label'] ?? '',
        $data['field_type'] ?? $data['fieldType'] ?? 'text',
        $data['placeholder'] ?? '',
        $data['required'] ?? false,
        $data['enabled'] ?? true,
        $maxOrder + 1
    ]);
    
    $fieldId = $pdo->lastInsertId();
    
    // Add options if it's a select field
    if (($data['field_type'] ?? $data['fieldType'] ?? 'text') === 'select' && isset($data['options'])) {
        foreach ($data['options'] as $index => $option) {
            $optStmt = $pdo->prepare("INSERT INTO form_options (field_id, option_value, option_label, sort_order) VALUES (?, ?, ?, ?)");
            $optStmt->execute([
                $fieldId,
                $option['value'] ?? $option['option_value'] ?? '',
                $option['label'] ?? $option['option_label'] ?? '',
                $index
            ]);
        }
    }
    
    sendResponse(['success' => true, 'id' => $fieldId]);
}

function updateFormField() {
    checkAuth();
    $data = getJsonInput();
    $id = $data['id'] ?? $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Field ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    
    $stmt = $pdo->prepare("UPDATE form_fields SET field_name = ?, label = ?, field_type = ?, placeholder = ?, required = ?, enabled = ?, sort_order = ? WHERE id = ?");
    $stmt->execute([
        $data['field_name'] ?? $data['fieldName'] ?? '',
        $data['label'] ?? '',
        $data['field_type'] ?? $data['fieldType'] ?? 'text',
        $data['placeholder'] ?? '',
        $data['required'] ?? false,
        $data['enabled'] ?? true,
        $data['sort_order'] ?? $data['sortOrder'] ?? 0,
        $id
    ]);
    
    sendResponse(['success' => true]);
}

function deleteFormField() {
    checkAuth();
    $id = $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Field ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("DELETE FROM form_fields WHERE id = ?");
    $stmt->execute([$id]);
    
    sendResponse(['success' => true]);
}

function reorderFields() {
    checkAuth();
    $data = getJsonInput();
    
    if (!isset($data['fields']) || !is_array($data['fields'])) {
        sendResponse(['error' => 'Fields array is required'], 400);
    }
    
    $pdo = getDBConnection();
    
    foreach ($data['fields'] as $index => $fieldId) {
        $stmt = $pdo->prepare("UPDATE form_fields SET sort_order = ? WHERE id = ?");
        $stmt->execute([$index, $fieldId]);
    }
    
    sendResponse(['success' => true]);
}

function handleOptions($method) {
    $pdo = getDBConnection();
    
    switch ($method) {
        case 'POST':
            checkAuth();
            $data = getJsonInput();
            
            // Get max sort order for this field
            $stmt = $pdo->prepare("SELECT MAX(sort_order) as max_order FROM form_options WHERE field_id = ?");
            $stmt->execute([$data['field_id'] ?? $data['fieldId'] ?? 0]);
            $maxOrder = $stmt->fetch()['max_order'] ?? 0;
            
            $stmt = $pdo->prepare("INSERT INTO form_options (field_id, option_value, option_label, sort_order) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['field_id'] ?? $data['fieldId'] ?? 0,
                $data['option_value'] ?? $data['value'] ?? '',
                $data['option_label'] ?? $data['label'] ?? '',
                $maxOrder + 1
            ]);
            sendResponse(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'PUT':
            checkAuth();
            $data = getJsonInput();
            $id = $data['id'] ?? $_GET['id'] ?? 0;
            
            $stmt = $pdo->prepare("UPDATE form_options SET option_value = ?, option_label = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([
                $data['option_value'] ?? $data['value'] ?? '',
                $data['option_label'] ?? $data['label'] ?? '',
                $data['sort_order'] ?? $data['sortOrder'] ?? 0,
                $id
            ]);
            sendResponse(['success' => true]);
            break;
            
        case 'DELETE':
            checkAuth();
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM form_options WHERE id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true]);
            break;
    }
}
?>
