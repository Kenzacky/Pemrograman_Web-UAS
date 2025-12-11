<?php
require_once 'config.php';

echo "<h2>🔍 Admin Password Debug Tool</h2>";
echo "<hr>";

// Test credentials
$test_username = 'admin';
$test_password = 'admin123';

echo "<h3>1. Testing Credentials:</h3>";
echo "Username: <strong>$test_username</strong><br>";
echo "Password: <strong>$test_password</strong><br><br>";

// Cek admin di database
echo "<h3>2. Data Admin dari Database:</h3>";
$stmt = $conn->prepare("SELECT id, username, password, nama_lengkap, email, status FROM admins WHERE username = ?");
$stmt->bind_param("s", $test_username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "❌ <strong style='color: red;'>Admin tidak ditemukan!</strong><br>";
    echo "Username: $test_username tidak ada di database<br><br>";
    
    echo "<h3>3. Semua Admin yang Ada:</h3>";
    $allAdmins = $conn->query("SELECT id, username, nama_lengkap, email FROM admins");
    if ($allAdmins->num_rows > 0) {
        echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
        echo "<tr><th>ID</th><th>Username</th><th>Nama</th><th>Email</th></tr>";
        while ($row = $allAdmins->fetch_assoc()) {
            echo "<tr>";
            echo "<td>{$row['id']}</td>";
            echo "<td>{$row['username']}</td>";
            echo "<td>{$row['nama_lengkap']}</td>";
            echo "<td>{$row['email']}</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "❌ <strong>TIDAK ADA ADMIN DI DATABASE!</strong><br>";
        echo "Jalankan SQL insert admin terlebih dahulu.";
    }
    exit;
}

$admin = $result->fetch_assoc();
echo "✅ Admin ditemukan!<br>";
echo "ID: " . $admin['id'] . "<br>";
echo "Username: " . $admin['username'] . "<br>";
echo "Nama: " . $admin['nama_lengkap'] . "<br>";
echo "Email: " . $admin['email'] . "<br>";
echo "Status: " . $admin['status'] . "<br>";
echo "Password Hash: <code style='background: #f0f0f0; padding: 5px; word-break: break-all;'>" . $admin['password'] . "</code><br>";
echo "Hash Length: " . strlen($admin['password']) . " karakter<br><br>";

// Test password verify
echo "<h3>3. Test Password Verify:</h3>";
echo "Password yang dicoba: <strong>$test_password</strong><br>";

if (password_verify($test_password, $admin['password'])) {
    echo "✅ <strong style='color: green; font-size: 18px;'>PASSWORD COCOK!</strong><br>";
    echo "Login seharusnya berhasil.<br><br>";
} else {
    echo "❌ <strong style='color: red; font-size: 18px;'>PASSWORD TIDAK COCOK!</strong><br>";
    echo "Password hash tidak match dengan input.<br><br>";
    
    // Generate hash baru
    echo "<h3>4. Generate Hash Baru untuk '$test_password':</h3>";
    $new_hash = password_hash($test_password, PASSWORD_DEFAULT);
    echo "Hash baru: <code style='background: #f0f0f0; padding: 5px; word-break: break-all;'>$new_hash</code><br>";
    echo "Length: " . strlen($new_hash) . " karakter<br><br>";
    
    // Test hash baru
    if (password_verify($test_password, $new_hash)) {
        echo "✅ Hash baru valid (PHP berfungsi dengan baik)<br><br>";
    }
    
    echo "<h3>5. SQL untuk Update Password:</h3>";
    echo "<textarea style='width: 100%; height: 120px; font-family: monospace; padding: 10px;'>";
    echo "-- Update password admin menjadi 'admin123'\n";
    echo "UPDATE admins SET password = '$new_hash' WHERE username = '$test_username';\n\n";
    echo "-- Atau hapus dan insert ulang:\n";
    echo "DELETE FROM admins WHERE username = '$test_username';\n";
    echo "INSERT INTO admins (username, password, nama_lengkap, email, status) VALUES\n";
    echo "('$test_username', '$new_hash', 'Administrator', 'admin@workspot.unesa.ac.id', 'active');";
    echo "</textarea>";
}

echo "<hr>";

// Test berbagai password
echo "<h3>6. Test Password Lain:</h3>";
$test_passwords = ['admin123', 'user123', 'Admin123', 'ADMIN123', '123456'];

echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
echo "<tr><th>Password</th><th>Result</th></tr>";
foreach ($test_passwords as $pwd) {
    $match = password_verify($pwd, $admin['password']) ? '✅ COCOK' : '❌ Tidak cocok';
    $color = password_verify($pwd, $admin['password']) ? 'green' : 'red';
    echo "<tr>";
    echo "<td><strong>$pwd</strong></td>";
    echo "<td style='color: $color;'>$match</td>";
    echo "</tr>";
}
echo "</table>";

echo "<hr>";

// PHP Info
echo "<h3>7. PHP Info:</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "password_hash available: " . (function_exists('password_hash') ? 'Yes ✅' : 'No ❌') . "<br>";
echo "password_verify available: " . (function_exists('password_verify') ? 'Yes ✅' : 'No ❌') . "<br>";

$conn->close();
?>

<style>
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
    }
    h2 { color: #333; }
    h3 { color: #666; margin-top: 25px; }
    hr { margin: 25px 0; border: 1px solid #ddd; }
    code {
        background: #eee;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 13px;
    }
    table {
        background: white;
        margin: 15px 0;
    }
</style>