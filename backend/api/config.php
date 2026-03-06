<?php
// ============================================
// DATABASE CONFIGURATION
// ============================================
// Update these values with your Hostinger database credentials
// Find them in: Hostinger Panel → Databases → MySQL Databases

define('DB_HOST', 'localhost');           // Usually 'localhost' for Hostinger
define('DB_NAME', 'your_database_name');  // Your database name from Hostinger
define('DB_USER', 'your_database_user');  // Your database username from Hostinger  
define('DB_PASS', 'your_database_pass');  // Your database password from Hostinger

// ============================================
// JWT SECRET KEY (Change this to a random string)
// ============================================
define('JWT_SECRET', 'your-secret-key-change-this-to-something-random-123');

// ============================================
// CORS HEADERS - DO NOT MODIFY
// ============================================
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================================
// DATABASE CONNECTION FUNCTION
// ============================================
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Database connection failed: ' . $e->getMessage()
        ]);
        exit();
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit();
}

function sendError($message, $statusCode = 400) {
    http_response_code($statusCode);
    echo json_encode(['success' => false, 'message' => $message]);
    exit();
}

function getRequestBody() {
    $json = file_get_contents('php://input');
    return json_decode($json, true) ?? [];
}

// Simple JWT functions
function createToken($payload) {
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload['exp'] = time() + (24 * 60 * 60); // 24 hours
    $payload = base64_encode(json_encode($payload));
    $signature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    return "$header.$payload.$signature";
}

function verifyToken($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    
    list($header, $payload, $signature) = $parts;
    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
    
    if ($signature !== $validSignature) return null;
    
    $payload = json_decode(base64_decode($payload), true);
    if ($payload['exp'] < time()) return null;
    
    return $payload;
}

function getAuthUser() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        return null;
    }
    
    return verifyToken($matches[1]);
}

function requireAuth() {
    $user = getAuthUser();
    if (!$user) {
        sendError('Unauthorized', 401);
    }
    return $user;
}
?>
