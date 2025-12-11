<?php
require_once 'config.php';

// Test password hash dan verify
$email = 'kenzacky1@gmail.com';
$password_input = 'angely123';

echo "<h2>🔍 Password Debug Tool</h2>";
echo "<hr>";

// 1. Cek user di database
echo "<h3>1. Data User dari Database:</h3>";
$stmt = $conn->prepare("SELECT id, nama_lengkap, email, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "❌ <strong>User tidak ditemukan!</strong><br>";
    echo "Email: $email<br>";
    exit;
}

$user = $result->fetch_assoc();
echo "✅ User ditemukan!<br>";
echo "ID: " . $user['id'] . "<br>";
echo "Nama: " . $user['nama_lengkap'] . "<br>";
echo "Email: " . $user['email'] . "<br>";
echo "Password Hash: <code>" . $user['password'] . "</code><br>";
echo "Hash Length: " . strlen($user['password']) . " karakter<br>";

echo "<hr>";

// 2. Test password verify
echo "<h3>2. Test Password Verify:</h3>";
echo "Password yang dicoba: <strong>$password_input</strong><br>";

if (password_verify($password_input, $user['password'])) {
    echo "✅ <strong style='color: green;'>PASSWORD COCOK!</strong><br>";
    echo "Login seharusnya berhasil.<br>";
} else {
    echo "❌ <strong style='color: red;'>PASSWORD TIDAK COCOK!</strong><br>";
    echo "Password hash tidak match dengan input.<br>";
}

echo "<hr>";

// 3. Generate hash baru untuk testing
echo "<h3>3. Generate Hash Baru:</h3>";
$new_hash = password_hash($password_input, PASSWORD_DEFAULT);
echo "Password: <strong>$password_input</strong><br>";
echo "Hash baru: <code>$new_hash</code><br>";
echo "Length: " . strlen($new_hash) . " karakter<br>";

// Test hash baru
if (password_verify($password_input, $new_hash)) {
    echo "✅ Hash baru valid<br>";
} else {
    echo "❌ Hash baru gagal (ini aneh, ada masalah PHP)<br>";
}

echo "<hr>";

// 4. Info PHP
echo "<h3>4. PHP Info:</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "password_hash available: " . (function_exists('password_hash') ? 'Yes ✅' : 'No ❌') . "<br>";
echo "password_verify available: " . (function_exists('password_verify') ? 'Yes ✅' : 'No ❌') . "<br>";

echo "<hr>";

// 5. SQL untuk update password (jika perlu)
echo "<h3>5. SQL untuk Update Password (Copy jika perlu):</h3>";
echo "<textarea style='width: 100%; height: 100px; font-family: monospace;'>";
echo "-- Update password user menjadi 'angely123'\n";
echo "UPDATE users SET password = '$new_hash' WHERE email = '$email';\n\n";
echo "-- Atau insert user baru:\n";
echo "INSERT INTO users (nama_lengkap, email, password) VALUES\n";
echo "('Angely Intan', '$email', '$new_hash');";
echo "</textarea>";

$conn->close();
?>

<style>
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
    }
    code {
        background: #eee;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 12px;
        word-break: break-all;
    }
    h2 { color: #333; }
    h3 { color: #666; margin-top: 20px; }
    hr { margin: 20px 0; border: 1px solid #ddd; }
</style>