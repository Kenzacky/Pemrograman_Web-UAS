<?php
/**
 * WorkSpot UNESA - Super Admin API
 * File: backend/superadmin_api.php
 * FIXED VERSION - Correct queries
 */

session_start();
require_once 'config.php';

// Set header JSON
header('Content-Type: application/json');

// ===== CHECK SUPERADMIN ACCESS =====
if (!isset($_SESSION['admin_logged_in']) || !isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'superadmin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized access. Super Admin only.']);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : '');

// ===== GET STATISTICS =====
if ($action === 'get_stats') {
    try {
        // Total users
        $users_query = "SELECT COUNT(*) as count FROM users";
        $users_result = mysqli_query($conn, $users_query);
        $total_users = mysqli_fetch_assoc($users_result)['count'] ?? 0;
        
        // Total tempat
        $places_query = "SELECT COUNT(*) as count FROM tempat";
        $places_result = mysqli_query($conn, $places_query);
        $total_places = mysqli_fetch_assoc($places_result)['count'] ?? 0;
        
        // Pending suggestions
        $suggestions_query = "SELECT COUNT(*) as count FROM saran WHERE status = 'pending'";
        $suggestions_result = mysqli_query($conn, $suggestions_query);
        $pending_suggestions = mysqli_fetch_assoc($suggestions_result)['count'] ?? 0;
        
        // Total admins
        $admins_query = "SELECT COUNT(*) as count FROM admins WHERE status = 'active'";
        $admins_result = mysqli_query($conn, $admins_query);
        $total_admins = mysqli_fetch_assoc($admins_result)['count'] ?? 0;
        
        echo json_encode([
            'success' => true,
            'data' => [
                'total_users' => $total_users,
                'total_places' => $total_places,
                'pending_suggestions' => $pending_suggestions,
                'total_admins' => $total_admins
            ]
        ]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

// ===== GET ALL ADMINS =====
else if ($action === 'get_admins') {
    try {
        $query = "SELECT id, username, nama_lengkap, email, role, status, created_at, last_login 
                  FROM admins 
                  ORDER BY 
                    CASE role 
                      WHEN 'superadmin' THEN 1 
                      WHEN 'admin' THEN 2 
                      ELSE 3 
                    END,
                    id ASC";
        
        $result = mysqli_query($conn, $query);
        
        if (!$result) {
            throw new Exception(mysqli_error($conn));
        }
        
        $admins = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Format dates
            $row['created_at'] = date('d M Y', strtotime($row['created_at']));
            $row['last_login'] = $row['last_login'] ? date('d M Y H:i', strtotime($row['last_login'])) : 'Belum pernah';
            $admins[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $admins,
            'count' => count($admins)
        ]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

// ===== GET ALL USERS =====
else if ($action === 'get_users') {
    try {
        $query = "SELECT id, nama_lengkap, email, created_at 
                  FROM users 
                  ORDER BY created_at DESC 
                  LIMIT 100";
        
        $result = mysqli_query($conn, $query);
        
        if (!$result) {
            throw new Exception(mysqli_error($conn));
        }
        
        $users = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $row['created_at'] = date('d M Y H:i', strtotime($row['created_at']));
            $users[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $users,
            'count' => count($users)
        ]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}

// ===== GET ALL TEMPAT =====
else if ($action === 'get_places') {
    try {
        // Cek struktur tabel tempat dulu
        $check_query = "SHOW COLUMNS FROM tempat";
        $check_result = mysqli_query($conn, $check_query);
        
        if (!$check_result) {
            throw new Exception('Cannot check table structure: ' . mysqli_error($conn));
        }
        
        $columns = [];
        while ($col = mysqli_fetch_assoc($check_result)) {
            $columns[] = $col['Field'];
        }
        
        // Build select fields berdasarkan kolom yang ada
        $select_parts = ['id', 'nama', 'lokasi', 'created_at'];
        $select_fields = [];
        
        foreach ($select_parts as $col) {
            if (in_array($col, $columns)) {
                $select_fields[] = $col;
            }
        }
        
        if (empty($select_fields)) {
            throw new Exception('No valid columns found in tempat table');
        }
        
        // Tambahkan status jika ada
        if (in_array('status', $columns)) {
            $select_fields[] = 'status';
        }
        
        // Tambahkan kategori_id jika ada (untuk ditampilkan)
        if (in_array('kategori_id', $columns)) {
            $select_fields[] = 'kategori_id';
        }
        
        $query = "SELECT " . implode(', ', $select_fields) . " 
                  FROM tempat 
                  ORDER BY created_at DESC 
                  LIMIT 100";
        
        $result = mysqli_query($conn, $query);
        
        if (!$result) {
            throw new Exception('Query error: ' . mysqli_error($conn));
        }
        
        $places = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Format date jika ada
            if (isset($row['created_at'])) {
                $row['created_at'] = date('d M Y', strtotime($row['created_at']));
            }
            
            // Set default values
            if (!isset($row['status'])) {
                $row['status'] = 'approved';
            }
            
            // Kategori nama (sementara pakai ID atau default)
            if (isset($row['kategori_id'])) {
                $row['kategori_nama'] = 'Kategori ' . $row['kategori_id'];
            } else {
                $row['kategori_nama'] = '-';
            }
            
            $places[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $places,
            'count' => count($places),
            'debug' => [
                'columns_found' => $columns,
                'query' => $query
            ]
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Error: ' . $e->getMessage(),
            'debug' => [
                'query' => isset($query) ? $query : 'Query not executed',
                'columns' => isset($columns) ? $columns : []
            ]
        ]);
    }
}

// ===== DELETE ADMIN =====
else if ($action === 'delete_admin') {
    $admin_id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    
    if ($admin_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID admin tidak valid']);
        exit;
    }
    
    // Tidak bisa hapus diri sendiri
    if ($admin_id == $_SESSION['admin_id']) {
        echo json_encode(['success' => false, 'message' => 'Tidak bisa menghapus akun sendiri']);
        exit;
    }
    
    // Check if admin exists and get role
    $check_query = "SELECT id, username, role FROM admins WHERE id = ?";
    $stmt = mysqli_prepare($conn, $check_query);
    mysqli_stmt_bind_param($stmt, "i", $admin_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $admin = mysqli_fetch_assoc($result);
    
    if (!$admin) {
        echo json_encode(['success' => false, 'message' => 'Admin tidak ditemukan']);
        exit;
    }
    
    if ($admin['role'] === 'superadmin') {
        echo json_encode(['success' => false, 'message' => 'Tidak bisa menghapus Super Admin']);
        exit;
    }
    
    // Delete admin
    $delete_query = "DELETE FROM admins WHERE id = ? AND role != 'superadmin'";
    $stmt = mysqli_prepare($conn, $delete_query);
    mysqli_stmt_bind_param($stmt, "i", $admin_id);
    
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'success' => true, 
            'message' => "Admin '{$admin['username']}' berhasil dihapus"
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus admin: ' . mysqli_error($conn)]);
    }
}

// ===== CREATE ADMIN =====
else if ($action === 'create_admin') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $nama_lengkap = trim($_POST['nama_lengkap'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $role = $_POST['role'] ?? 'admin';
    
    // Validation
    if (empty($username) || empty($password) || empty($nama_lengkap) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
        exit;
    }
    
    if (strlen($username) < 4) {
        echo json_encode(['success' => false, 'message' => 'Username minimal 4 karakter']);
        exit;
    }
    
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password minimal 6 karakter']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Format email tidak valid']);
        exit;
    }
    
    if (!in_array($role, ['admin', 'superadmin'])) {
        $role = 'admin';
    }
    
    // Check if username already exists
    $check_query = "SELECT id FROM admins WHERE username = ? OR email = ?";
    $stmt = mysqli_prepare($conn, $check_query);
    mysqli_stmt_bind_param($stmt, "ss", $username, $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(['success' => false, 'message' => 'Username atau email sudah digunakan']);
        exit;
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert admin
    $insert_query = "INSERT INTO admins (username, password, nama_lengkap, email, role, status) 
                     VALUES (?, ?, ?, ?, ?, 'active')";
    $stmt = mysqli_prepare($conn, $insert_query);
    mysqli_stmt_bind_param($stmt, "sssss", $username, $hashed_password, $nama_lengkap, $email, $role);
    
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'success' => true, 
            'message' => "Admin '{$username}' berhasil ditambahkan",
            'data' => [
                'id' => mysqli_insert_id($conn),
                'username' => $username,
                'nama_lengkap' => $nama_lengkap,
                'email' => $email,
                'role' => $role
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan admin: ' . mysqli_error($conn)]);
    }
}

// ===== DELETE USER =====
else if ($action === 'delete_user') {
    $user_id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    
    if ($user_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID user tidak valid']);
        exit;
    }
    
    // Get user info first
    $check_query = "SELECT email FROM users WHERE id = ?";
    $stmt = mysqli_prepare($conn, $check_query);
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);
    
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'User tidak ditemukan']);
        exit;
    }
    
    // Delete user
    $delete_query = "DELETE FROM users WHERE id = ?";
    $stmt = mysqli_prepare($conn, $delete_query);
    mysqli_stmt_bind_param($stmt, "i", $user_id);
    
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'success' => true, 
            'message' => "User '{$user['email']}' berhasil dihapus"
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus user']);
    }
}

// ===== DELETE TEMPAT =====
else if ($action === 'delete_place') {
    $place_id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    
    if ($place_id <= 0) {
        echo json_encode(['success' => false, 'message' => 'ID tempat tidak valid']);
        exit;
    }
    
    // Get tempat info first
    $check_query = "SELECT nama FROM tempat WHERE id = ?";
    $stmt = mysqli_prepare($conn, $check_query);
    mysqli_stmt_bind_param($stmt, "i", $place_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $place = mysqli_fetch_assoc($result);
    
    if (!$place) {
        echo json_encode(['success' => false, 'message' => 'Tempat tidak ditemukan']);
        exit;
    }
    
    // Delete tempat
    $delete_query = "DELETE FROM tempat WHERE id = ?";
    $stmt = mysqli_prepare($conn, $delete_query);
    mysqli_stmt_bind_param($stmt, "i", $place_id);
    
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            'success' => true, 
            'message' => "Tempat '{$place['nama']}' berhasil dihapus"
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus tempat']);
    }
}

else {
    echo json_encode(['success' => false, 'message' => 'Action tidak valid']);
}

mysqli_close($conn);
?>