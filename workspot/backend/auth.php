<?php
// PENTING: Set header JSON SEBELUM apapun
header('Content-Type: application/json');

// Matikan error display agar tidak ganggu JSON
error_reporting(0);
ini_set('display_errors', 0);

session_start();
require_once 'config.php';

$action = isset($_POST['action']) ? $_POST['action'] : '';

// ===== FUNGSI HELPER =====
function sendResponse($success, $message, $data = null) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// ===== REGISTRASI =====
if ($action === 'register') {
    $nama_lengkap = trim($_POST['nama'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($nama_lengkap) || empty($email) || empty($password)) {
        sendResponse(false, 'Semua field harus diisi');
    }
    
    if (!validateEmail($email)) {
        sendResponse(false, 'Format email tidak valid');
    }
    
    if (strlen($password) < 6) {
        sendResponse(false, 'Password minimal 6 karakter');
    }
    
    // Cek email sudah terdaftar
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        sendResponse(false, 'Email sudah terdaftar');
    }
    
    // Hash password & insert (sesuaikan dengan kolom di tabel Anda)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (nama_lengkap, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nama_lengkap, $email, $hashed_password);
    
    if ($stmt->execute()) {
        sendResponse(true, 'Registrasi berhasil! Silakan login.', ['user_id' => $conn->insert_id]);
    } else {
        sendResponse(false, 'Registrasi gagal: ' . $conn->error);
    }
}

// ===== LOGIN =====
else if ($action === 'login') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        sendResponse(false, 'Email dan password harus diisi');
    }
    
    // Query dengan kolom nama_lengkap (sesuai tabel Anda)
    $stmt = $conn->prepare("SELECT id, nama_lengkap, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendResponse(false, 'Email tidak terdaftar');
    }
    
    $user = $result->fetch_assoc();
    
    if (!password_verify($password, $user['password'])) {
        sendResponse(false, 'Password salah');
    }
    
    // Set session dengan kolom yang benar
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_nama'] = $user['nama_lengkap'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['logged_in'] = true;
    
    sendResponse(true, 'Login berhasil!', [
        'id' => $user['id'],
        'nama' => $user['nama_lengkap'],
        'email' => $user['email']
    ]);
}

// ===== LOGOUT =====
else if ($action === 'logout') {
    session_destroy();
    sendResponse(true, 'Logout berhasil');
}

// ===== CEK AUTH =====
else if ($action === 'check_auth') {
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        sendResponse(true, 'Sudah login', [
            'id' => $_SESSION['user_id'],
            'nama' => $_SESSION['user_nama'],
            'email' => $_SESSION['user_email']
        ]);
    } else {
        sendResponse(false, 'Belum login');
    }
}

// ===== UPDATE PROFILE =====
else if ($action === 'update_profile') {
    if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        sendResponse(false, 'Belum login');
    }
    
    $user_id = $_SESSION['user_id'];
    $nama_lengkap = trim($_POST['nama'] ?? '');
    $email = trim($_POST['email'] ?? '');
    
    if (empty($nama_lengkap) || empty($email)) {
        sendResponse(false, 'Nama dan email harus diisi');
    }
    
    if (!validateEmail($email)) {
        sendResponse(false, 'Format email tidak valid');
    }
    
    // Cek email sudah dipakai user lain
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
    $stmt->bind_param("si", $email, $user_id);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        sendResponse(false, 'Email sudah digunakan user lain');
    }
    
    // Update data
    $stmt = $conn->prepare("UPDATE users SET nama_lengkap = ?, email = ? WHERE id = ?");
    $stmt->bind_param("ssi", $nama_lengkap, $email, $user_id);
    
    if ($stmt->execute()) {
        $_SESSION['user_nama'] = $nama_lengkap;
        $_SESSION['user_email'] = $email;
        
        sendResponse(true, 'Profile berhasil diupdate', [
            'id' => $user_id,
            'nama' => $nama_lengkap,
            'email' => $email
        ]);
    } else {
        sendResponse(false, 'Gagal update profile');
    }
}

// ===== CHANGE PASSWORD =====
else if ($action === 'change_password') {
    if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        sendResponse(false, 'Belum login');
    }
    
    $user_id = $_SESSION['user_id'];
    $old_password = $_POST['old_password'] ?? '';
    $new_password = $_POST['new_password'] ?? '';
    
    if (empty($old_password) || empty($new_password)) {
        sendResponse(false, 'Password lama dan baru harus diisi');
    }
    
    if (strlen($new_password) < 6) {
        sendResponse(false, 'Password baru minimal 6 karakter');
    }
    
    // Cek password lama
    $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    if (!password_verify($old_password, $user['password'])) {
        sendResponse(false, 'Password lama salah');
    }
    
    // Update password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $hashed_password, $user_id);
    
    if ($stmt->execute()) {
        sendResponse(true, 'Password berhasil diubah');
    } else {
        sendResponse(false, 'Gagal ubah password');
    }
}

else {
    sendResponse(false, 'Action tidak valid');
}

$conn->close();
?>