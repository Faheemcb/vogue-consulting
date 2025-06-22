<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Max-Age: 3600");
header("Content-Type: application/json");

include "config.php";

// Add these constants at the top of your file
define('ADMIN_PASSWORD', 'admin@vogue'); 
define('JWT_SECRET', '!,SG,7dyQ./=]4z.;tzKa%W.uLRd6r
9GHSp+ggmnv/00M(Rvm0tjJznmnf[p
7RCzh]{-c4LG)]*1e7?}[yn6$fYd_}
x_WiyiRg5((JF(5NYStunT!@5{2PL3
&GU7a-{YSP;L{a]ff+J}cAyf7e2h;{
W&GCCS7cdC2dbeN]4&S{2WF#C@$zZD
_XKXn6G1B9R5mY3f$H#a6(4gr}VR5V
rXT.Dy#=Sj;aA}{2B&n#1N=C;B$[{1
C*H=.ZyZUYNgv1QP3&.5D5j2gjG$W@
J**,[]7S&hy[c;w&?+Q;F]S)_yYrvT'); 

// Function to generate JWT token
function generateToken() {
    $payload = [
        'exp' => time() + (60 * 60 * 24), // 24 hour expiration
        'admin' => true
    ];
    
    return jwt_encode($payload, JWT_SECRET);
}

// Function to verify JWT token
function verifyToken($token) {
    try {
        $payload = jwt_decode($token, JWT_SECRET);
        return $payload && $payload['exp'] > time();
    } catch(Exception $e) {
        return false;
    }
}

// Simple JWT encode function
function jwt_encode($payload, $secret) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode($payload);
    
    $base64Header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64Header . "." . $base64Payload, $secret, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64Header . "." . $base64Payload . "." . $base64Signature;
}

// Simple JWT decode function
function jwt_decode($token, $secret) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    
    $payload = json_decode(base64_decode($parts[1]), true);
    
    $signature = hash_hmac('sha256', $parts[0] . "." . $parts[1], $secret, true);
    $base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    if ($base64Signature !== $parts[2]) return null;
    
    return $payload;
}

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// New endpoint for admin login
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_GET['action']) && $_GET['action'] === 'login') {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (isset($input['password']) && $input['password'] === ADMIN_PASSWORD) {
        echo json_encode([
            "success" => true,
            "token" => generateToken()
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Invalid credentials"
        ]);
    }
    exit();
}

// Handle GET request - Fetch all form submissions (now with authentication)
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Check if it's an admin request (has Authorization header)
    $headers = apache_request_headers();
    $isAdminRequest = isset($headers['Authorization']);
    
    if ($isAdminRequest) {
        // Verify the token
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        if (!verifyToken($token)) {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            exit();
        }
    }
    
    $sql = "SELECT id, name, email, service, message, created_at FROM contact_form ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $row['service'] = json_decode($row['service'], true);
        $data[] = $row;
    }

    echo json_encode(["success" => true, "data" => $data]);
}

// Handle POST request - Save form submission (remains unchanged)
if ($_SERVER["REQUEST_METHOD"] === "POST" && !isset($_GET['action'])) {
    $input = json_decode(file_get_contents("php://input"), true);

    $name = $input['name'];
    $email = $input['email'];
    $service = json_encode($input['service']);
    $message = $input['message'];

    $sql = "INSERT INTO contact_form (name, email, service, message) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $service, $message);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Form submitted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit form"]);
    }
}

$conn->close();
?>