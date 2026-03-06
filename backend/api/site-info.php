<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'get';

switch ($action) {
    case 'get':
        if ($method === 'GET') {
            getSiteInfo();
        }
        break;
    case 'update':
        if ($method === 'PUT') {
            updateSiteInfo();
        }
        break;
    case 'contact-info':
        handleContactInfo($method);
        break;
    case 'footer-sections':
        handleFooterSections($method);
        break;
    case 'footer-links':
        handleFooterLinks($method);
        break;
    case 'social-links':
        handleSocialLinks($method);
        break;
    default:
        sendResponse(['error' => 'Invalid action'], 400);
}

function getSiteInfo() {
    $pdo = getDBConnection();
    
    // Get site info
    $stmt = $pdo->query("SELECT site_key, site_value FROM site_info");
    $rows = $stmt->fetchAll();
    $siteInfo = [];
    foreach ($rows as $row) {
        $siteInfo[$row['site_key']] = $row['site_value'];
    }
    
    // Get contact info
    $stmt = $pdo->query("SELECT * FROM contact_info WHERE enabled = TRUE ORDER BY sort_order");
    $contactInfo = $stmt->fetchAll();
    
    // Get footer sections with links
    $stmt = $pdo->query("SELECT * FROM footer_sections WHERE enabled = TRUE ORDER BY sort_order");
    $sections = $stmt->fetchAll();
    
    foreach ($sections as &$section) {
        $linkStmt = $pdo->prepare("SELECT * FROM footer_links WHERE section_id = ? AND enabled = TRUE ORDER BY sort_order");
        $linkStmt->execute([$section['id']]);
        $section['links'] = $linkStmt->fetchAll();
    }
    
    // Get social links
    $stmt = $pdo->query("SELECT * FROM social_links WHERE enabled = TRUE ORDER BY sort_order");
    $socialLinks = $stmt->fetchAll();
    
    sendResponse([
        'siteInfo' => $siteInfo,
        'contactInfo' => $contactInfo,
        'footerSections' => $sections,
        'socialLinks' => $socialLinks
    ]);
}

function updateSiteInfo() {
    checkAuth();
    $data = getJsonInput();
    
    $pdo = getDBConnection();
    
    $allowedKeys = ['siteName', 'tagline', 'description', 'copyright', 'logo'];
    
    foreach ($data as $key => $value) {
        if (in_array($key, $allowedKeys)) {
            $stmt = $pdo->prepare("INSERT INTO site_info (site_key, site_value) VALUES (?, ?) 
                                   ON DUPLICATE KEY UPDATE site_value = ?");
            $stmt->execute([$key, $value, $value]);
        }
    }
    
    sendResponse(['success' => true, 'message' => 'Site info updated']);
}

function handleContactInfo($method) {
    $pdo = getDBConnection();
    
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("SELECT * FROM contact_info ORDER BY sort_order");
            sendResponse(['contactInfo' => $stmt->fetchAll()]);
            break;
            
        case 'POST':
            checkAuth();
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO contact_info (type, label, value, icon, link, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['type'] ?? 'custom',
                $data['label'] ?? '',
                $data['value'] ?? '',
                $data['icon'] ?? '',
                $data['link'] ?? '',
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0
            ]);
            sendResponse(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'PUT':
            checkAuth();
            $data = getJsonInput();
            $id = $data['id'] ?? $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("UPDATE contact_info SET type = ?, label = ?, value = ?, icon = ?, link = ?, enabled = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([
                $data['type'] ?? 'custom',
                $data['label'] ?? '',
                $data['value'] ?? '',
                $data['icon'] ?? '',
                $data['link'] ?? '',
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0,
                $id
            ]);
            sendResponse(['success' => true]);
            break;
            
        case 'DELETE':
            checkAuth();
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM contact_info WHERE id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true]);
            break;
    }
}

function handleFooterSections($method) {
    $pdo = getDBConnection();
    
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("SELECT * FROM footer_sections ORDER BY sort_order");
            $sections = $stmt->fetchAll();
            foreach ($sections as &$section) {
                $linkStmt = $pdo->prepare("SELECT * FROM footer_links WHERE section_id = ? ORDER BY sort_order");
                $linkStmt->execute([$section['id']]);
                $section['links'] = $linkStmt->fetchAll();
            }
            sendResponse(['footerSections' => $sections]);
            break;
            
        case 'POST':
            checkAuth();
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO footer_sections (title, enabled, sort_order) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['title'] ?? 'New Section',
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0
            ]);
            sendResponse(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'PUT':
            checkAuth();
            $data = getJsonInput();
            $id = $data['id'] ?? $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("UPDATE footer_sections SET title = ?, enabled = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([
                $data['title'] ?? '',
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0,
                $id
            ]);
            sendResponse(['success' => true]);
            break;
            
        case 'DELETE':
            checkAuth();
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM footer_sections WHERE id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true]);
            break;
    }
}

function handleFooterLinks($method) {
    $pdo = getDBConnection();
    
    switch ($method) {
        case 'POST':
            checkAuth();
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO footer_links (section_id, label, url, is_external, enabled, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $data['section_id'] ?? 0,
                $data['label'] ?? '',
                $data['url'] ?? '',
                $data['is_external'] ?? false,
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0
            ]);
            sendResponse(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'PUT':
            checkAuth();
            $data = getJsonInput();
            $id = $data['id'] ?? $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("UPDATE footer_links SET label = ?, url = ?, is_external = ?, enabled = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([
                $data['label'] ?? '',
                $data['url'] ?? '',
                $data['is_external'] ?? false,
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0,
                $id
            ]);
            sendResponse(['success' => true]);
            break;
            
        case 'DELETE':
            checkAuth();
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM footer_links WHERE id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true]);
            break;
    }
}

function handleSocialLinks($method) {
    $pdo = getDBConnection();
    
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("SELECT * FROM social_links ORDER BY sort_order");
            sendResponse(['socialLinks' => $stmt->fetchAll()]);
            break;
            
        case 'POST':
            checkAuth();
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO social_links (platform, url, enabled, sort_order) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data['platform'] ?? '',
                $data['url'] ?? '',
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0
            ]);
            sendResponse(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;
            
        case 'PUT':
            checkAuth();
            $data = getJsonInput();
            $id = $data['id'] ?? $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("UPDATE social_links SET platform = ?, url = ?, enabled = ?, sort_order = ? WHERE id = ?");
            $stmt->execute([
                $data['platform'] ?? '',
                $data['url'] ?? '',
                $data['enabled'] ?? true,
                $data['sort_order'] ?? 0,
                $id
            ]);
            sendResponse(['success' => true]);
            break;
            
        case 'DELETE':
            checkAuth();
            $id = $_GET['id'] ?? 0;
            $stmt = $pdo->prepare("DELETE FROM social_links WHERE id = ?");
            $stmt->execute([$id]);
            sendResponse(['success' => true]);
            break;
    }
}
?>
