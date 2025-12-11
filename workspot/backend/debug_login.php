<?php
/**
 * Debug Login Tool
 * File: backend/debug_login.php
 */

// Cek apakah config.php ada
if (!file_exists('config.php')) {
    die("❌ File config.php tidak ditemukan!");
}

require 'config.php';

// Cek apakah $pdo terdefinisi
if (!isset($pdo)) {
    die("❌ Variable \$pdo tidak terdefinisi di config.php!");
}

$username = 'superadmin';
$password = 'super123';

echo "<h2>🔍 Debug Login Super Admin</h2>";
echo "<hr>";

// 1. Cek koneksi database
echo "<h3>1️⃣ Koneksi Database:</h3>";
try {
    $test = $pdo->query("SELECT 1");
    echo "<p style='color: green;'>✅ Koneksi database berhasil</p>";
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Koneksi database gagal: " . $e->getMessage() . "</p>";
    exit;
}

// 2. Cek apakah user ada
echo "<h3>2️⃣ Cek User di Database:</h3>";
$stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->execute([$username]);
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$admin) {
    echo "<p style='color: red;'>❌ User '$username' tidak ditemukan!</p>";
    echo "<p>Jalankan SQL ini:</p>";
    echo "<pre>INSERT INTO admins (username, password, role, nama_lengkap, email, status) 
VALUES ('superadmin', '\$2y\$10\$o5pvFdudzbUd0qOog5ZH3OtKEXroUXmH1BnZivsJMHEj1O6SWw7fq', 'superadmin', 'Super Administrator', 'superadmin@workspot.unesa.ac.id', 'active');</pre>";
    exit;
}

echo "<p style='color: green;'>✅ User ditemukan!</p>";
echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
echo "<tr><th>Field</th><th>Value</th></tr>";
echo "<tr><td>ID</td><td>" . $admin['id'] . "</td></tr>";
echo "<tr><td>Username</td><td>" . $admin['username'] . "</td></tr>";
echo "<tr><td>Role</td><td>" . $admin['role'] . "</td></tr>";
echo "<tr><td>Nama Lengkap</td><td>" . $admin['nama_lengkap'] . "</td></tr>";
echo "<tr><td>Email</td><td>" . $admin['email'] . "</td></tr>";
echo "<tr><td>Status</td><td>" . $admin['status'] . "</td></tr>";
echo "<tr><td>Password Length</td><td>" . strlen($admin['password']) . " karakter</td></tr>";
echo "<tr><td>Password Preview</td><td>" . substr($admin['password'], 0, 30) . "...</td></tr>";
echo "</table>";

// 3. Cek password verify
echo "<h3>3️⃣ Test Password Verify:</h3>";
echo "<p>Password yang ditest: <strong>$password</strong></p>";
echo "<p>Hash di database: <code>" . $admin['password'] . "</code></p>";

if (password_verify($password, $admin['password'])) {
    echo "<p style='color: green; font-weight: bold; font-size: 18px;'>✅ PASSWORD COCOK!</p>";
    echo "<p>Login seharusnya berhasil. Jika masih gagal, cek file admin_auth.php</p>";
} else {
    echo "<p style='color: red; font-weight: bold; font-size: 18px;'>❌ PASSWORD TIDAK COCOK!</p>";
    echo "<p>Hash di database salah. Jalankan SQL update lagi:</p>";
    echo "<pre style='background: #ffe6e6; padding: 10px;'>UPDATE admins 
SET password = '\$2y\$10\$o5pvFdudzbUd0qOog5ZH3OtKEXroUXmH1BnZivsJMHEj1O6SWw7fq'
WHERE username = 'superadmin';</pre>";
}

// 4. Cek struktur tabel
echo "<h3>4️⃣ Struktur Tabel Admins:</h3>";
$stmt = $pdo->query("DESCRIBE admins");
$columns = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th></tr>";
foreach ($columns as $col) {
    echo "<tr>";
    echo "<td>" . $col['Field'] . "</td>";
    echo "<td>" . $col['Type'] . "</td>";
    echo "<td>" . $col['Null'] . "</td>";
    echo "<td>" . $col['Key'] . "</td>";
    echo "<td>" . ($col['Default'] ?? 'NULL') . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cek apakah kolom 'role' ada
$hasRole = false;
foreach ($columns as $col) {
    if ($col['Field'] === 'role') {
        $hasRole = true;
        break;
    }
}

if (!$hasRole) {
    echo "<p style='color: red;'>❌ Kolom 'role' tidak ada! Jalankan SQL ini:</p>";
    echo "<pre style='background: #ffe6e6; padding: 10px;'>ALTER TABLE admins 
ADD COLUMN role ENUM('admin', 'superadmin') DEFAULT 'admin' AFTER password;</pre>";
}

echo "<hr>";
echo "<h3>✅ Kesimpulan:</h3>";
echo "<ul>";
echo "<li>Database: " . ($pdo ? "✅ Connected" : "❌ Error") . "</li>";
echo "<li>User exists: " . ($admin ? "✅ Yes" : "❌ No") . "</li>";
echo "<li>Password correct: " . (password_verify($password, $admin['password']) ? "✅ Yes" : "❌ No") . "</li>";
echo "<li>Role column: " . ($hasRole ? "✅ Exists" : "❌ Missing") . "</li>";
echo "</ul>";
?>