<?php
session_start(); // Tambahkan ini di bagian paling atas
require 'config.php';
header("Content-Type: application/json; charset=UTF-8");

// Ambil user_id dari session (jika sudah login)
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// Cek method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, "Method tidak diizinkan");
}

// Validasi input wajib
$required_fields = ['namaTempat', 'lokasi', 'kategori', 'deskripsi'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        json_response(false, "Field " . $field . " wajib diisi");
    }
}

// Sanitasi input
$nama_tempat = sanitize_input($_POST['namaTempat']);
$lokasi = sanitize_input($_POST['lokasi']);
$kategori = sanitize_input($_POST['kategori']);
$fasilitas = isset($_POST['fasilitas']) ? sanitize_input($_POST['fasilitas']) : '';
$jam_buka = isset($_POST['jamBuka']) ? sanitize_input($_POST['jamBuka']) : '';
$deskripsi = sanitize_input($_POST['deskripsi']);
$kontak = isset($_POST['kontak']) ? sanitize_input($_POST['kontak']) : '';
$maps_link = isset($_POST['mapsLink']) ? sanitize_input($_POST['mapsLink']) : '';

// Validasi panjang
if (strlen($nama_tempat) < 2) {
    json_response(false, "Nama tempat minimal 2 karakter");
}

if (strlen($lokasi) < 5) {
    json_response(false, "Lokasi minimal 5 karakter");
}

if (strlen($deskripsi) < 20) {
    json_response(false, "Deskripsi minimal 20 karakter");
}

// Validasi Maps link
if (!empty($maps_link)) {
    if (!filter_var($maps_link, FILTER_VALIDATE_URL)) {
        json_response(false, "Format link Google Maps tidak valid");
    }
}

// Upload gambar
$gambar_name = null;

// Path absolut ke folder upload
$upload_dir = dirname(__DIR__) . "/uploads/saran/";

// Pastikan folder exists
if (!is_dir($upload_dir)) {
    if (!mkdir($upload_dir, 0777, true)) {
        json_response(false, "Gagal membuat folder upload: " . $upload_dir);
    }
}

// Log folder path untuk debug
error_log("Upload directory: " . $upload_dir);
error_log("Directory exists: " . (is_dir($upload_dir) ? "YES" : "NO"));
error_log("Directory writable: " . (is_writable($upload_dir) ? "YES" : "NO"));

// Cek upload
if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
    
    error_log("File upload detected");
    error_log("File name: " . $_FILES['gambar']['name']);
    error_log("File size: " . $_FILES['gambar']['size']);
    error_log("File type: " . $_FILES['gambar']['type']);
    error_log("Temp name: " . $_FILES['gambar']['tmp_name']);
    
    // Validasi gambar
    $validation = validate_image($_FILES['gambar']);
    if (!$validation['success']) {
        json_response(false, $validation['message']);
    }
    
    $gambar_name = generate_unique_filename($_FILES['gambar']['name']);
    $target_path = $upload_dir . $gambar_name;
    
    error_log("Target path: " . $target_path);
    
    if (move_uploaded_file($_FILES['gambar']['tmp_name'], $target_path)) {
        error_log("File uploaded successfully: " . $gambar_name);
        
        // Cek apakah file benar-benar ada
        if (file_exists($target_path)) {
            error_log("File verified exists at: " . $target_path);
        } else {
            error_log("WARNING: File not found after upload!");
        }
    } else {
        error_log("Failed to move uploaded file");
        error_log("Source: " . $_FILES['gambar']['tmp_name']);
        error_log("Destination: " . $target_path);
        json_response(false, "Gagal mengupload gambar. Cek permission folder.");
    }
    
} elseif (isset($_FILES['gambar']) && $_FILES['gambar']['error'] !== UPLOAD_ERR_NO_FILE) {
    
    $error_messages = array(
        UPLOAD_ERR_INI_SIZE => 'File terlalu besar (php.ini)',
        UPLOAD_ERR_FORM_SIZE => 'File terlalu besar (form)',
        UPLOAD_ERR_PARTIAL => 'File hanya terupload sebagian',
        UPLOAD_ERR_NO_TMP_DIR => 'Folder temporary tidak ditemukan',
        UPLOAD_ERR_CANT_WRITE => 'Gagal menulis file ke disk',
        UPLOAD_ERR_EXTENSION => 'Upload dihentikan'
    );
    
    $error_code = $_FILES['gambar']['error'];
    $error_msg = isset($error_messages[$error_code]) ? $error_messages[$error_code] : 'Error upload';
    
    error_log("Upload error: " . $error_msg . " (code: " . $error_code . ")");
    json_response(false, $error_msg);
}

// Insert database DENGAN user_id
$sql = "INSERT INTO saran (user_id, nama_tempat, lokasi, kategori, fasilitas, jam_operasional, deskripsi, kontak, maps_link, gambar, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')";

$stmt = mysqli_prepare($conn, $sql);

if (!$stmt) {
    json_response(false, "Error database: " . mysqli_error($conn));
}

// Bind parameter dengan user_id (i = integer untuk user_id)
mysqli_stmt_bind_param($stmt, "isssssssss", $user_id, $nama_tempat, $lokasi, $kategori, $fasilitas, $jam_buka, $deskripsi, $kontak, $maps_link, $gambar_name);

if (mysqli_stmt_execute($stmt)) {
    $inserted_id = mysqli_insert_id($conn);
    
    error_log("Data saved to database. ID: " . $inserted_id . ", User ID: " . ($user_id ? $user_id : 'NULL') . ", Gambar: " . ($gambar_name ? $gambar_name : 'NULL'));
    
    $response_data = array(
        'id' => $inserted_id,
        'user_id' => $user_id,
        'nama_tempat' => $nama_tempat,
        'gambar' => $gambar_name,
        'upload_dir' => $upload_dir
    );
    
    json_response(true, "Terima kasih! Saran berhasil dikirim", $response_data);
    
} else {
    
    // Hapus gambar jika gagal
    if ($gambar_name && file_exists($upload_dir . $gambar_name)) {
        unlink($upload_dir . $gambar_name);
    }
    
    json_response(false, "Gagal menyimpan: " . mysqli_error($conn));
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>