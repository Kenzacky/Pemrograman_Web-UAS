<?php
/**
 * WorkSpot UNESA - Admin Authentication Backend
 * File: backend/admin_auth.php
 * FULL VERSION dengan Super Admin Support
 */

// Set header JSON
header('Content-Type: application/json');

// Matikan error display
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

// ===== LOGIN ADMIN =====
if ($action === 'login') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    // Validasi input
    if (empty($username) || empty($password)) {
        sendResponse(false, 'Username dan password harus diisi');
    }
    
    // Query admin dari database dengan ROLE
    $stmt = $conn->prepare("SELECT id, username, password, nama_lengkap, email, status, role FROM admins WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendResponse(false, 'Username tidak ditemukan');
    }
    
    $admin = $result->fetch_assoc();
    
    // Cek status admin
    if ($admin['status'] !== 'active') {
        sendResponse(false, 'Akun admin tidak aktif. Hubungi super admin.');
    }
    
    // Verify password
    if (!password_verify($password, $admin['password'])) {
        sendResponse(false, 'Password salah');
    }
    
    // Update last login
    $updateStmt = $conn->prepare("UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?");
    $updateStmt->bind_param("i", $admin['id']);
    $updateStmt->execute();
    
    // Set session admin dengan ROLE
    $_SESSION['admin_id'] = $admin['id'];
    $_SESSION['admin_username'] = $admin['username'];
    $_SESSION['admin_nama'] = $admin['nama_lengkap'];
    $_SESSION['admin_email'] = $admin['email'];
    $_SESSION['admin_role'] = $admin['role'] ?? 'admin';
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['is_admin'] = true;
    $_SESSION['is_superadmin'] = ($admin['role'] === 'superadmin');
    
    sendResponse(true, 'Login admin berhasil!', [
        'id' => $admin['id'],
        'username' => $admin['username'],
        'nama' => $admin['nama_lengkap'],
        'email' => $admin['email'],
        'role' => $admin['role'] ?? 'admin'
    ]);
}

// ===== CHECK SESSION =====
else if ($action === 'check_session') {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        sendResponse(true, 'Admin sudah login', [
            'logged_in' => true,
            'id' => $_SESSION['admin_id'],
            'username' => $_SESSION['admin_username'],
            'nama' => $_SESSION['admin_nama'],
            'email' => $_SESSION['admin_email'],
            'role' => $_SESSION['admin_role'] ?? 'admin',
            'is_superadmin' => $_SESSION['is_superadmin'] ?? false
        ]);
    } else {
        sendResponse(false, 'Belum login sebagai admin', [
            'logged_in' => false
        ]);
    }
}

// ===== CHECK ADMIN AUTH =====
else if ($action === 'check_admin_auth') {
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        sendResponse(true, 'Admin sudah login', [
            'id' => $_SESSION['admin_id'],
            'username' => $_SESSION['admin_username'],
            'nama' => $_SESSION['admin_nama'],
            'email' => $_SESSION['admin_email'],
            'role' => $_SESSION['admin_role'] ?? 'admin',
            'is_superadmin' => $_SESSION['is_superadmin'] ?? false
        ]);
    } else {
        sendResponse(false, 'Belum login sebagai admin');
    }
}

// ===== LOGOUT ADMIN =====
else if ($action === 'logout') {
    // Hapus semua session admin
    unset($_SESSION['admin_id']);
    unset($_SESSION['admin_username']);
    unset($_SESSION['admin_nama']);
    unset($_SESSION['admin_email']);
    unset($_SESSION['admin_role']);
    unset($_SESSION['admin_logged_in']);
    unset($_SESSION['is_admin']);
    unset($_SESSION['is_superadmin']);
    
    session_destroy();
    sendResponse(true, 'Logout admin berhasil');
}

// ===== GET ADMIN PROFILE =====
else if ($action === 'get_admin_profile') {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        sendResponse(false, 'Belum login sebagai admin');
    }
    
    $admin_id = $_SESSION['admin_id'];
    
    $stmt = $conn->prepare("SELECT id, username, nama_lengkap, email, role, created_at, last_login, status FROM admins WHERE id = ?");
    $stmt->bind_param("i", $admin_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendResponse(false, 'Admin tidak ditemukan');
    }
    
    $admin = $result->fetch_assoc();
    sendResponse(true, 'Profile admin berhasil diambil', $admin);
}

// ===== CHANGE ADMIN PASSWORD =====
else if ($action === 'change_admin_password') {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        sendResponse(false, 'Belum login sebagai admin');
    }
    
    $admin_id = $_SESSION['admin_id'];
    $old_password = $_POST['old_password'] ?? '';
    $new_password = $_POST['new_password'] ?? '';
    
    if (empty($old_password) || empty($new_password)) {
        sendResponse(false, 'Password lama dan baru harus diisi');
    }
    
    if (strlen($new_password) < 6) {
        sendResponse(false, 'Password baru minimal 6 karakter');
    }
    
    // Cek password lama
    $stmt = $conn->prepare("SELECT password FROM admins WHERE id = ?");
    $stmt->bind_param("i", $admin_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $admin = $result->fetch_assoc();
    
    if (!password_verify($old_password, $admin['password'])) {
        sendResponse(false, 'Password lama salah');
    }
    
    // Update password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE admins SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $hashed_password, $admin_id);
    
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