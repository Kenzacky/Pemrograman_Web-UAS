<?php
/**
 * WorkSpot UNESA - Database Configuration
 * File: backend/config.php
 * Support: MySQLi dan PDO
 */

// Konfigurasi Database
$host = "localhost";
$user = "root";
$pass = "";
$db   = "workspot_db";

// ===== KONEKSI MYSQLI (untuk file lama) =====
$conn = mysqli_connect($host, $user, $pass, $db);
mysqli_set_charset($conn, "utf8mb4");

if (!$conn) {
    die(json_encode([
        "success" => false, 
        "message" => "Koneksi database gagal: " . mysqli_connect_error()
    ]));
}

// ===== KONEKSI PDO (untuk admin system) =====
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    
    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch (PDOException $e) {
    error_log("PDO Connection Error: " . $e->getMessage());
    die(json_encode([
        "success" => false,
        "message" => "Koneksi database PDO gagal!"
    ]));
}

// ===== FUNGSI-FUNGSI HELPER =====

// Fungsi sanitasi input
function sanitize_input($data) {
    global $conn;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return mysqli_real_escape_string($conn, $data);
}

// Fungsi validasi gambar
function validate_image($file) {
    $allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    $max_size = 5 * 1024 * 1024;
    
    if (!in_array($file['type'], $allowed_types)) {
        return ['success' => false, 'message' => 'Format file tidak didukung'];
    }
    
    if ($file['size'] > $max_size) {
        return ['success' => false, 'message' => 'Ukuran file terlalu besar. Maksimal 5MB'];
    }
    
    return ['success' => true];
}

// Generate nama file unik
function generate_unique_filename($original_name) {
    $ext = pathinfo($original_name, PATHINFO_EXTENSION);
    return uniqid('workspot_', true) . '_' . time() . '.' . $ext;
}

// Response JSON
function json_response($success, $message, $data = null) {
    $response = ['success' => $success, 'message' => $message];
    if ($data !== null) {
        $response['data'] = $data;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>