<?php
/**
 * Test Tool - Generate Hash untuk Super Admin
 * File: backend/test_superadmin_hash.php
 */

// Password yang ingin di-hash
$password = 'super123';

// Generate hash baru
$new_hash = password_hash($password, PASSWORD_BCRYPT);

echo "<h2>🔐 Password Hash Generator untuk Super Admin</h2>";
echo "<hr>";

echo "<h3>Password yang akan di-hash:</h3>";
echo "<pre>$password</pre>";

echo "<h3>Hash baru yang di-generate:</h3>";
echo "<pre style='background: #f0f0f0; padding: 10px; border-radius: 5px; word-wrap: break-word;'>$new_hash</pre>";

echo "<h3>Panjang hash:</h3>";
echo "<pre>" . strlen($new_hash) . " karakter (harus 60)</pre>";

echo "<hr>";
echo "<h3>📋 SQL untuk Update Database:</h3>";
echo "<pre style='background: #e8f5e9; padding: 15px; border-radius: 5px;'>";
echo "UPDATE admins \n";
echo "SET password = '$new_hash'\n";
echo "WHERE username = 'superadmin';";
echo "</pre>";

echo "<hr>";
echo "<h3>🧪 Test Verifikasi:</h3>";

// Test dengan hash yang baru di-generate
if (password_verify($password, $new_hash)) {
    echo "<p style='color: green; font-weight: bold;'>✅ PASSWORD COCOK dengan hash baru!</p>";
} else {
    echo "<p style='color: red; font-weight: bold;'>❌ PASSWORD TIDAK COCOK (ini seharusnya tidak mungkin terjadi)</p>";
}

echo "<hr>";
echo "<h3>📝 Langkah Selanjutnya:</h3>";
echo "<ol>";
echo "<li>Copy SQL di atas</li>";
echo "<li>Jalankan di phpMyAdmin</li>";
echo "<li>Test login dengan username: <strong>superadmin</strong> dan password: <strong>super123</strong></li>";
echo "</ol>";
?>