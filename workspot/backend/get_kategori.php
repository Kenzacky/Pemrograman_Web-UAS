<?php
require 'config.php';
header("Content-Type: application/json");

$sql = "SELECT * FROM kategori ORDER BY nama_kategori ASC";
$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>