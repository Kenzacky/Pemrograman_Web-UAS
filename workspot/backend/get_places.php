<?php
require 'config.php';
header("Content-Type: application/json; charset=UTF-8");

$sql = "SELECT t.id, t.nama, k.nama_kategori as kategori, t.lokasi, t.jam_operasional, 
               t.deskripsi, t.deskripsi_lengkap, t.fasilitas, t.maps_link, t.gambar, t.created_at
        FROM tempat t
        JOIN kategori k ON t.kategori_id = k.id
        WHERE t.status = 'approved'
        ORDER BY t.created_at DESC";

$result = mysqli_query($conn, $sql);

if (!$result) {
    json_response(false, "Error query: " . mysqli_error($conn));
}

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    // Parse fasilitas jadi array
    $row['fasilitas'] = !empty($row['fasilitas']) ? explode(',', $row['fasilitas']) : [];
    
    // Trim whitespace dari setiap fasilitas
    $row['fasilitas'] = array_map('trim', $row['fasilitas']);
    
    // Add image path
    $row['image_url'] = $row['gambar'] ? 'images/' . $row['gambar'] : 'images/default-place.jpg';
    
    $data[] = $row;
}

json_response(true, "Data berhasil diambil", $data);
mysqli_close($conn);
?>