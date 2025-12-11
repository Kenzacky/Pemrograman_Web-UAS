<?php
// ===== SESSION CHECK - HARUS DI PALING ATAS =====
session_start();

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Redirect ke login jika belum login
    header('Location: ../admin_login.html');
    exit;
}

// Ambil data admin dari session
$admin_username = $_SESSION['admin_username'] ?? 'Admin';
$admin_nama = $_SESSION['admin_nama'] ?? 'Administrator';

require 'config.php';

// Handle approve/reject actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $id = sanitize_input($_POST['id']);
    $action = $_POST['action'];
    
    if ($action === 'approve') {
        // Get saran data
        $sql = "SELECT * FROM saran WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $saran = mysqli_fetch_assoc($result);
        
        if ($saran) {
            // Get kategori_id
            $kategori_map = array(
                'kafe' => 1,
                'co-working' => 2,
                'perpustakaan' => 3,
                'restoran' => 4,
                'tempat-nongkrong' => 5
            );
            $kategori_id = isset($kategori_map[$saran['kategori']]) ? $kategori_map[$saran['kategori']] : 1;
            
            // Copy gambar dari saran ke images folder jika ada
            $gambar_final = null;
            if ($saran['gambar']) {
                $source = "../uploads/saran/" . $saran['gambar'];
                if (file_exists($source)) {
                    $gambar_final = $saran['gambar'];
                    $destination = "../images/" . $gambar_final;
                    
                    // Buat folder images jika belum ada
                    if (!is_dir("../images/")) {
                        mkdir("../images/", 0777, true);
                    }
                    
                    copy($source, $destination);
                }
            }
            
            // Insert to tempat table
            $insert_sql = "INSERT INTO tempat (nama, kategori_id, lokasi, jam_operasional, deskripsi, deskripsi_lengkap, fasilitas, maps_link, gambar, status)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')";
            $insert_stmt = mysqli_prepare($conn, $insert_sql);
            mysqli_stmt_bind_param(
                $insert_stmt, 
                "sisssssss",
                $saran['nama_tempat'],
                $kategori_id,
                $saran['lokasi'],
                $saran['jam_operasional'],
                $saran['deskripsi'],
                $saran['deskripsi'],
                $saran['fasilitas'],
                $saran['maps_link'],
                $gambar_final
            );
            
            if (mysqli_stmt_execute($insert_stmt)) {
                // Update saran status
                $update_sql = "UPDATE saran SET status = 'approved' WHERE id = ?";
                $update_stmt = mysqli_prepare($conn, $update_sql);
                mysqli_stmt_bind_param($update_stmt, "i", $id);
                mysqli_stmt_execute($update_stmt);
                
                $message = "✅ Saran berhasil disetujui dan ditambahkan ke daftar tempat!";
                $message_type = "success";
            } else {
                $message = "❌ Gagal menambahkan ke daftar tempat: " . mysqli_error($conn);
                $message_type = "danger";
            }
        }
    } elseif ($action === 'reject') {
        $sql = "UPDATE saran SET status = 'rejected' WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        
        $message = "❌ Saran berhasil ditolak.";
        $message_type = "warning";
    }
}

// Get all pending saran
$sql = "SELECT * FROM saran WHERE status = 'pending' ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - WorkSpot UNESA</title>
    <link rel="stylesheet" href="../web.css">
    <style>
        .admin-container {
            max-width: 1400px;
            margin: 20px auto;
            padding: 2rem;
        }
        
        .admin-header {
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            box-shadow: 0 4px 15px var(--shadow);
        }
        
        .admin-header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .admin-info h1 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-size: 1.8rem;
        }
        
        .admin-info p {
            color: var(--text-secondary);
            margin: 0;
        }
        
        .admin-info .welcome-text {
            font-weight: 600;
            color: var(--accent);
        }
        
        .admin-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .btn-link {
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.3s;
        }
        
        .btn-link:hover {
            background: var(--bg-secondary);
        }
        
        .btn-logout {
            background: #f44336;
            color: white;
            border: none;
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            font-size: 0.95rem;
        }
        
        .btn-logout:hover {
            background: #da190b;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(244, 67, 54, 0.3);
        }
        
        .saran-grid {
            display: grid;
            gap: 2rem;
        }
        
        .saran-card {
            background: var(--card-bg);
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 4px 15px var(--shadow);
            border-left: 4px solid var(--accent);
            transition: transform 0.3s;
        }
        
        .saran-card:hover {
            transform: translateY(-5px);
        }
        
        .saran-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 1rem;
        }
        
        .saran-content {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 2rem;
            margin-bottom: 1.5rem;
        }
        
        .saran-image {
            width: 250px;
            height: 180px;
            border-radius: 10px;
            overflow: hidden;
            background: var(--bg-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--bg-secondary);
        }
        
        .saran-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .saran-image .no-image {
            font-size: 4rem;
            color: var(--text-secondary);
        }
        
        .saran-info p {
            margin-bottom: 0.8rem;
            line-height: 1.6;
            color: var(--text-primary);
        }
        
        .saran-actions {
            display: flex;
            gap: 1rem;
        }
        
        .btn {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            font-size: 1rem;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .btn-approve {
            background: #4CAF50;
            color: white;
        }
        
        .btn-approve:hover {
            background: #45a049;
        }
        
        .btn-reject {
            background: #f44336;
            color: white;
        }
        
        .btn-reject:hover {
            background: #da190b;
        }
        
        .badge {
            display: inline-block;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: bold;
        }
        
        .badge-pending {
            background: #FF9800;
            color: white;
        }
        
        .alert {
            padding: 1.2rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            font-weight: 500;
            animation: slideDown 0.5s ease;
        }
        
        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 2px solid #c3e6cb;
        }
        
        .alert-warning {
            background: #fff3cd;
            color: #856404;
            border: 2px solid #ffeaa7;
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-secondary);
        }
        
        .empty-state-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .admin-header-content {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .admin-actions {
                width: 100%;
                justify-content: space-between;
            }
            
            .saran-content {
                grid-template-columns: 1fr;
            }
            
            .saran-image {
                width: 100%;
                max-width: 300px;
                margin: 0 auto;
            }
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <div class="admin-header-content">
                <div class="admin-info">
                    <h1>🔧 Admin Panel - Review Saran</h1>
                    <p>
                        Selamat datang, <span class="welcome-text"><?php echo htmlspecialchars($admin_nama); ?></span> 
                        (<?php echo htmlspecialchars($admin_username); ?>)
                    </p>
                </div>
                <div class="admin-actions">
                    <a href="../beranda.html" class="btn-link">← Beranda</a>
                    <button onclick="handleLogout()" class="btn-logout">
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>

        <?php if (isset($message)): ?>
        <div class="alert alert-<?php echo $message_type; ?>">
            <?php echo $message; ?>
        </div>
        <?php endif; ?>

        <div class="saran-grid">
            <?php if (mysqli_num_rows($result) == 0): ?>
                <div class="saran-card">
                    <div class="empty-state">
                        <div class="empty-state-icon">📋</div>
                        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Tidak Ada Saran Pending</h3>
                        <p>Semua saran sudah ditinjau atau belum ada yang masuk</p>
                    </div>
                </div>
            <?php else: ?>
                <?php while($saran = mysqli_fetch_assoc($result)): ?>
                <div class="saran-card">
                    <div class="saran-header">
                        <div>
                            <h2 style="color: var(--text-primary); margin-bottom: 0.5rem;">
                                <?php echo htmlspecialchars($saran['nama_tempat']); ?>
                            </h2>
                            <span class="badge badge-pending">⏳ Pending Review</span>
                        </div>
                        <small style="color: var(--text-secondary);">
                            📅 <?php echo date('d M Y, H:i', strtotime($saran['created_at'])); ?>
                        </small>
                    </div>

                    <div class="saran-content">
                        <div class="saran-image">
                            <?php if ($saran['gambar'] && file_exists("../uploads/saran/" . $saran['gambar'])): ?>
                                <img src="../uploads/saran/<?php echo htmlspecialchars($saran['gambar']); ?>" 
                                     alt="<?php echo htmlspecialchars($saran['nama_tempat']); ?>"
                                     onerror="this.parentElement.innerHTML='<div class=\'no-image\'>📷</div>'">
                            <?php else: ?>
                                <div class="no-image">📷</div>
                            <?php endif; ?>
                        </div>

                        <div class="saran-info">
                            <p><strong>📍 Lokasi:</strong><br><?php echo htmlspecialchars($saran['lokasi']); ?></p>
                            
                            <p><strong>🏷️ Kategori:</strong> 
                                <span style="background: var(--bg-secondary); padding: 0.3rem 0.8rem; border-radius: 15px;">
                                    <?php echo htmlspecialchars(ucfirst($saran['kategori'])); ?>
                                </span>
                            </p>
                            
                            <?php if ($saran['fasilitas']): ?>
                            <p><strong>✨ Fasilitas:</strong><br>
                                <?php 
                                $fasilitas_array = explode(',', $saran['fasilitas']);
                                foreach ($fasilitas_array as $f) {
                                    echo '<span style="background: var(--accent); color: white; padding: 0.3rem 0.7rem; border-radius: 15px; margin: 0.2rem; display: inline-block; font-size: 0.85rem;">' . htmlspecialchars(trim($f)) . '</span> ';
                                }
                                ?>
                            </p>
                            <?php endif; ?>
                            
                            <?php if ($saran['jam_operasional']): ?>
                            <p><strong>⏰ Jam Operasional:</strong> <?php echo htmlspecialchars($saran['jam_operasional']); ?></p>
                            <?php endif; ?>
                            
                            <p><strong>📝 Deskripsi:</strong><br>
                                <span style="font-style: italic; color: var(--text-secondary);">"<?php echo nl2br(htmlspecialchars($saran['deskripsi'])); ?>"</span>
                            </p>
                            
                            <?php if ($saran['kontak']): ?>
                            <p><strong>📞 Kontak:</strong> <?php echo htmlspecialchars($saran['kontak']); ?></p>
                            <?php endif; ?>
                            
                            <?php if ($saran['maps_link']): ?>
                            <p><strong>🗺️ Google Maps:</strong> 
                                <a href="<?php echo htmlspecialchars($saran['maps_link']); ?>" target="_blank" style="color: var(--accent); text-decoration: underline;">
                                    Lihat di Maps →
                                </a>
                            </p>
                            <?php endif; ?>
                        </div>
                    </div>

                    <div class="saran-actions">
                        <form method="POST" style="display: inline;">
                            <input type="hidden" name="id" value="<?php echo $saran['id']; ?>">
                            <input type="hidden" name="action" value="approve">
                            <button type="submit" class="btn btn-approve" onclick="return confirm('✅ Setujui saran ini dan tambahkan ke website?')">
                                ✓ Setujui
                            </button>
                        </form>
                        
                        <form method="POST" style="display: inline;">
                            <input type="hidden" name="id" value="<?php echo $saran['id']; ?>">
                            <input type="hidden" name="action" value="reject">
                            <button type="submit" class="btn btn-reject" onclick="return confirm('❌ Yakin tolak saran ini?')">
                                ✗ Tolak
                            </button>
                        </form>
                    </div>
                </div>
                <?php endwhile; ?>
            <?php endif; ?>
        </div>
    </div>

    <footer style="margin-top: 3rem; text-align: center; padding: 2rem; color: var(--text-secondary);">
        <p>© 2025 WorkSpot UNESA | Admin Panel</p>
    </footer>

    <script src="../web.js"></script>
    <script>
        // Logout function
        async function handleLogout() {
            if (!confirm('🚪 Yakin ingin logout?')) return;
            
            try {
                const formData = new FormData();
                formData.append('action', 'logout');
                
                const response = await fetch('admin_auth.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('✅ Logout berhasil!');
                    window.location.href = '../admin_login.html';
                } else {
                    alert('❌ Logout gagal: ' + data.message);
                }
            } catch (error) {
                console.error('Error logout:', error);
                alert('❌ Terjadi kesalahan saat logout');
            }
        }
    </script>
</body>
</html>