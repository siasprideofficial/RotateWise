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

// GET site info - action=get
if ($method === 'GET' && $action === 'get') {
    // Get site info
    $stmt = $db->query("SELECT * FROM site_info WHERE id = 1");
    $info = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $siteInfo = [
        'siteName' => $info['site_name'] ?? 'RotateWise',
        'tagline' => $info['tagline'] ?? 'Smart Credit Card Loan Solutions',
        'description' => $info['description'] ?? 'Expert consultation for credit card loans',
        'copyright' => $info['copyright'] ?? '© 2024 RotateWise. All rights reserved.',
        'logo' => $info['logo_url'] ?? ''
    ];
    
    // Get contact info
    $stmt = $db->query("SELECT * FROM contact_info ORDER BY sort_order ASC");
    $contactInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$contactInfo) $contactInfo = [];
    
    // Convert enabled to boolean
    foreach ($contactInfo as &$c) {
        $c['enabled'] = (bool)$c['enabled'];
    }
    
    // Get footer sections with links
    $stmt = $db->query("SELECT * FROM footer_sections ORDER BY sort_order ASC");
    $footerSections = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$footerSections) $footerSections = [];
    
    foreach ($footerSections as &$section) {
        $section['enabled'] = (bool)$section['enabled'];
        $linkStmt = $db->prepare("SELECT * FROM footer_links WHERE section_id = ? ORDER BY sort_order ASC");
        $linkStmt->execute([$section['id']]);
        $section['links'] = $linkStmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($section['links'] as &$link) {
            $link['enabled'] = (bool)$link['enabled'];
            $link['is_external'] = (bool)$link['is_external'];
        }
    }
    
    // Get social links
    $stmt = $db->query("SELECT * FROM social_links ORDER BY sort_order ASC");
    $socialLinks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$socialLinks) $socialLinks = [];
    
    foreach ($socialLinks as &$s) {
        $s['enabled'] = (bool)$s['enabled'];
    }
    
    echo json_encode([
        'siteInfo' => $siteInfo,
        'contactInfo' => $contactInfo,
        'footerSections' => $footerSections,
        'socialLinks' => $socialLinks
    ]);
    exit;
}

// PUT update site info - action=update
if ($method === 'PUT' && $action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Check if record exists
    $stmt = $db->query("SELECT id FROM site_info WHERE id = 1");
    $exists = $stmt->fetch();
    
    if ($exists) {
        $stmt = $db->prepare("UPDATE site_info SET 
            site_name = ?, 
            tagline = ?, 
            description = ?, 
            logo_url = ?,
            copyright = ?,
            updated_at = NOW()
            WHERE id = 1");
        $stmt->execute([
            $input['siteName'] ?? 'RotateWise',
            $input['tagline'] ?? '',
            $input['description'] ?? '',
            $input['logo'] ?? '',
            $input['copyright'] ?? ''
        ]);
    } else {
        $stmt = $db->prepare("INSERT INTO site_info (id, site_name, tagline, description, logo_url, copyright, created_at, updated_at) 
            VALUES (1, ?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([
            $input['siteName'] ?? 'RotateWise',
            $input['tagline'] ?? '',
            $input['description'] ?? '',
            $input['logo'] ?? '',
            $input['copyright'] ?? ''
        ]);
    }
    
    echo json_encode(['success' => true]);
    exit;
}

// Contact Info endpoints - action=contact-info
if ($action === 'contact-info') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($method === 'GET') {
        $stmt = $db->query("SELECT * FROM contact_info ORDER BY sort_order ASC");
        $contactInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($contactInfo as &$c) {
            $c['enabled'] = (bool)$c['enabled'];
        }
        echo json_encode(['contactInfo' => $contactInfo]);
        exit;
    }
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $maxOrder = $db->query("SELECT MAX(sort_order) FROM contact_info")->fetchColumn() ?? 0;
        
        $stmt = $db->prepare("INSERT INTO contact_info (type, label, value, icon, link, enabled, sort_order) VALUES (?, ?, ?, ?, ?, 1, ?)");
        $stmt->execute([
            $input['type'] ?? 'custom',
            $input['label'] ?? '',
            $input['value'] ?? '',
            $input['icon'] ?? 'info',
            $input['link'] ?? '',
            $maxOrder + 1
        ]);
        echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
        exit;
    }
    
    if ($method === 'PUT' && $id > 0) {
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("UPDATE contact_info SET type = ?, label = ?, value = ?, icon = ?, link = ?, enabled = ? WHERE id = ?");
        $stmt->execute([
            $input['type'] ?? 'custom',
            $input['label'] ?? '',
            $input['value'] ?? '',
            $input['icon'] ?? 'info',
            $input['link'] ?? '',
            $input['enabled'] ? 1 : 0,
            $id
        ]);
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($method === 'DELETE' && $id > 0) {
        $stmt = $db->prepare("DELETE FROM contact_info WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}

// Footer Sections endpoints - action=footer-sections
if ($action === 'footer-sections') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $maxOrder = $db->query("SELECT MAX(sort_order) FROM footer_sections")->fetchColumn() ?? 0;
        
        $stmt = $db->prepare("INSERT INTO footer_sections (title, enabled, sort_order) VALUES (?, 1, ?)");
        $stmt->execute([
            $input['title'] ?? 'New Section',
            $maxOrder + 1
        ]);
        echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
        exit;
    }
    
    if ($method === 'PUT' && $id > 0) {
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("UPDATE footer_sections SET title = ?, enabled = ? WHERE id = ?");
        $stmt->execute([
            $input['title'] ?? '',
            $input['enabled'] ? 1 : 0,
            $id
        ]);
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($method === 'DELETE' && $id > 0) {
        // Delete links first
        $stmt = $db->prepare("DELETE FROM footer_links WHERE section_id = ?");
        $stmt->execute([$id]);
        // Delete section
        $stmt = $db->prepare("DELETE FROM footer_sections WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}

// Footer Links endpoints - action=footer-links
if ($action === 'footer-links') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $maxOrder = $db->query("SELECT MAX(sort_order) FROM footer_links WHERE section_id = " . (int)$input['section_id'])->fetchColumn() ?? 0;
        
        $stmt = $db->prepare("INSERT INTO footer_links (section_id, label, url, is_external, enabled, sort_order) VALUES (?, ?, ?, ?, 1, ?)");
        $stmt->execute([
            $input['section_id'] ?? 0,
            $input['label'] ?? '',
            $input['url'] ?? '',
            $input['is_external'] ? 1 : 0,
            $maxOrder + 1
        ]);
        echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
        exit;
    }
    
    if ($method === 'PUT' && $id > 0) {
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("UPDATE footer_links SET label = ?, url = ?, is_external = ?, enabled = ? WHERE id = ?");
        $stmt->execute([
            $input['label'] ?? '',
            $input['url'] ?? '',
            $input['is_external'] ? 1 : 0,
            $input['enabled'] ? 1 : 0,
            $id
        ]);
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($method === 'DELETE' && $id > 0) {
        $stmt = $db->prepare("DELETE FROM footer_links WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}

// Social Links endpoints - action=social-links
if ($action === 'social-links') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $maxOrder = $db->query("SELECT MAX(sort_order) FROM social_links")->fetchColumn() ?? 0;
        
        $stmt = $db->prepare("INSERT INTO social_links (platform, url, enabled, sort_order) VALUES (?, ?, 1, ?)");
        $stmt->execute([
            $input['platform'] ?? '',
            $input['url'] ?? '',
            $maxOrder + 1
        ]);
        echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
        exit;
    }
    
    if ($method === 'PUT' && $id > 0) {
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $db->prepare("UPDATE social_links SET platform = ?, url = ?, enabled = ? WHERE id = ?");
        $stmt->execute([
            $input['platform'] ?? '',
            $input['url'] ?? '',
            $input['enabled'] ? 1 : 0,
            $id
        ]);
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($method === 'DELETE' && $id > 0) {
        $stmt = $db->prepare("DELETE FROM social_links WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}

echo json_encode(['error' => 'Invalid request']);
?>
