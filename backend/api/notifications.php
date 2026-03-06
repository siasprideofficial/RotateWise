<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'list';

switch ($action) {
    case 'list':
        if ($method === 'GET') {
            getNotifications();
        }
        break;
    case 'mark-read':
        if ($method === 'PUT') {
            markAsRead();
        }
        break;
    case 'mark-all-read':
        if ($method === 'PUT') {
            markAllAsRead();
        }
        break;
    case 'delete':
        if ($method === 'DELETE') {
            deleteNotification();
        }
        break;
    case 'clear-read':
        if ($method === 'DELETE') {
            clearReadNotifications();
        }
        break;
    case 'unread-count':
        if ($method === 'GET') {
            getUnreadCount();
        }
        break;
    default:
        sendResponse(['error' => 'Invalid action'], 400);
}

function getNotifications() {
    checkAuth();
    $pdo = getDBConnection();
    
    $filter = $_GET['filter'] ?? 'all';
    
    $sql = "SELECT n.*, l.name as lead_name, l.email as lead_email 
            FROM notifications n 
            LEFT JOIN leads l ON n.lead_id = l.id 
            WHERE 1=1";
    
    if ($filter === 'unread') {
        $sql .= " AND n.is_read = FALSE";
    } else if ($filter === 'read') {
        $sql .= " AND n.is_read = TRUE";
    }
    
    $sql .= " ORDER BY n.created_at DESC";
    
    $stmt = $pdo->query($sql);
    $notifications = $stmt->fetchAll();
    
    sendResponse(['notifications' => $notifications]);
}

function markAsRead() {
    checkAuth();
    $data = getJsonInput();
    $id = $data['id'] ?? $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Notification ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("UPDATE notifications SET is_read = TRUE WHERE id = ?");
    $stmt->execute([$id]);
    
    sendResponse(['success' => true, 'message' => 'Notification marked as read']);
}

function markAllAsRead() {
    checkAuth();
    $pdo = getDBConnection();
    $stmt = $pdo->query("UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE");
    
    sendResponse(['success' => true, 'message' => 'All notifications marked as read']);
}

function deleteNotification() {
    checkAuth();
    $id = $_GET['id'] ?? 0;
    
    if (!$id) {
        sendResponse(['error' => 'Notification ID is required'], 400);
    }
    
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("DELETE FROM notifications WHERE id = ?");
    $stmt->execute([$id]);
    
    sendResponse(['success' => true, 'message' => 'Notification deleted']);
}

function clearReadNotifications() {
    checkAuth();
    $pdo = getDBConnection();
    $stmt = $pdo->query("DELETE FROM notifications WHERE is_read = TRUE");
    
    sendResponse(['success' => true, 'message' => 'Read notifications cleared']);
}

function getUnreadCount() {
    checkAuth();
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM notifications WHERE is_read = FALSE");
    $count = $stmt->fetch()['count'];
    
    sendResponse(['count' => (int)$count]);
}
?>
