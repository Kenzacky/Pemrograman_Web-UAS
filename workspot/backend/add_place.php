<?php
require 'config.php';
header("Content-Type: application/json");

// Validasi input wajib
if (
    empty($_POST['nama']) ||
    empty($_POST['kategori_id']) ||
    empty($_POST['lokasi']) ||
    empty($_POST['jam_operasional']) ||
    empty($_POST['deskripsi']) ||
    empty($_POST['maps_link'])
) {
    echo json_encode(["success" => false, "message" => "Semua field wajib diisi"]);
    exit;
}

// Ambil data POST
$nama = $_POST['nama'];
$kategori_id = $_POST['kategori_id'];
$lokasi = $_POST['lokasi'];
$jam_operasional = $_POST['jam_operasional'];
$deskripsi = $_POST['deskripsi'];
$maps_link = $_POST['maps_link'];

// Cek jika tidak ada file upload
if (!isset($_FILES['gambar']) || $_FILES['gambar']['error'] != 0) {
    echo json_encode(["success" => false, "message" => "Upload gambar wajib"]);
    exit;
}

// Proses upload gambar
$upload_dir = "uploads/";
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$file_tmp = $_FILES['gambar']['tmp_name'];
$file_name = time() . "_" . basename($_FILES['gambar']['name']);
$target_path = $upload_dir . $file_name;

if (!move_uploaded_file($file_tmp, $target_path)) {
    echo json_encode(["success" => false, "message" => "Gagal mengupload gambar"]);
    exit;
}

// Query ke database
$sql = "INSERT INTO tempat (nama, kategori_id, lokasi, jam_operasional, deskripsi, maps_link, gambar)
        VALUES ('$nama', '$kategori_id', '$lokasi', '$jam_operasional', '$deskripsi', '$maps_link', '$file_name')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Saran berhasil ditambahkan"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . mysqli_error($conn)]);
}
?>
