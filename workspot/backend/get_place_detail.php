<?php
require 'config.php';
header("Content-Type: application/json; charset=UTF-8");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID tidak valid']);
    exit;
}

$sql = "SELECT t.*, k.nama_kategori as kategori
        FROM tempat t
        JOIN kategori k ON t.kategori_id = k.id
        WHERE t.id = ? AND t.status = 'approved'";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$data = mysqli_fetch_assoc($result);

if ($data) {
    // Split fasilitas jadi array
    if (!empty($data['fasilitas'])) {
        $data['fasilitas'] = array_map('trim', explode(',', $data['fasilitas']));
    } else {
        $data['fasilitas'] = [];
    }
    
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Tempat tidak ditemukan']);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
