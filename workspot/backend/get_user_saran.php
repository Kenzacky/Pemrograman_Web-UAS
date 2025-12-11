<?php
header('Content-Type: application/json');
session_start();
require_once 'config.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode([
        'success' => false,
        'message' => 'Belum login'
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT * FROM saran WHERE user_id = ? ORDER BY id DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    'success' => true,
    'message' => 'Data ditemukan',
    'data' => $data
]);
