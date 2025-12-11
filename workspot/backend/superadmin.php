<?php
/**
 * WorkSpot UNESA - Super Admin Dashboard
 * File: backend/superadmin.php
 * COMPLETE FIXED VERSION
 */

session_start();

if (!isset($_SESSION['admin_logged_in']) || !isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'superadmin') {
    header('Location: ../admin_login.html');
    exit;
}

$admin_username = $_SESSION['admin_username'] ?? 'superadmin';
$admin_nama = $_SESSION['admin_nama'] ?? 'Super Administrator';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Super Admin Panel - WorkSpot UNESA</title>
    <link rel="stylesheet" href="../web.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../superadmin_style.css">
</head>
<body>
    <div class="superadmin-container">
        <!-- Header -->
        <div class="superadmin-header">
            <div class="header-content">
                <div class="header-info">
                    <h1>
                        <i class="fas fa-crown"></i>
                        Super Admin Panel
                    </h1>
                    <p>Selamat datang, <strong><?php echo htmlspecialchars($admin_nama); ?></strong> (<?php echo htmlspecialchars($admin_username); ?>)</p>
                </div>
                <div class="header-actions">
                    <a href="../beranda.html" class="btn-link">
                        <i class="fas fa-home"></i> Beranda
                    </a>
                    <a href="admin.php" class="btn-link">
                        <i class="fas fa-clipboard-list"></i> Review Saran
                    </a>
                    <button onclick="handleLogout()" class="btn-logout">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats -->
        <div class="stats-grid">
            <div class="stat-card users">
                <div class="stat-icon"><i class="fas fa-users"></i></div>
                <div class="stat-number" id="totalUsers">0</div>
                <div class="stat-label">Total Users</div>
            </div>
            <div class="stat-card places">
                <div class="stat-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div class="stat-number" id="totalPlaces">0</div>
                <div class="stat-label">Total Tempat</div>
            </div>
            <div class="stat-card suggestions">
                <div class="stat-icon"><i class="fas fa-lightbulb"></i></div>
                <div class="stat-number" id="totalSuggestions">0</div>
                <div class="stat-label">Saran Pending</div>
            </div>
            <div class="stat-card admins">
                <div class="stat-icon"><i class="fas fa-user-shield"></i></div>
                <div class="stat-number" id="totalAdmins">0</div>
                <div class="stat-label">Total Admins</div>
            </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="nav-tabs">
            <button class="tab-btn active" onclick="showTab('admins')">
                <i class="fas fa-user-shield"></i> Kelola Admin
            </button>
            <button class="tab-btn" onclick="showTab('users')">
                <i class="fas fa-users"></i> Kelola Users
            </button>
            <button class="tab-btn" onclick="showTab('places')">
                <i class="fas fa-map-marker-alt"></i> Kelola Tempat
            </button>
        </div>

        <!-- Content: Kelola Admin -->
        <div id="admins-section" class="content-section active">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-user-shield"></i> Kelola Admin</h2>
                <button class="btn-add" onclick="openAddAdminModal()">
                    <i class="fas fa-plus"></i> Tambah Admin
                </button>
            </div>
            <div id="adminsTable" class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading data admin...</p>
            </div>
        </div>

        <!-- Content: Kelola Users -->
        <div id="users-section" class="content-section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-users"></i> Kelola Users</h2>
            </div>
            <div id="usersTable" class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading data users...</p>
            </div>
        </div>

        <!-- Content: Kelola Tempat -->
        <div id="places-section" class="content-section">
            <div class="section-header">
                <h2 class="section-title"><i class="fas fa-map-marker-alt"></i> Kelola Tempat</h2>
            </div>
            <div id="placesTable" class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading data tempat...</p>
            </div>
        </div>
    </div>

    <!-- Modal: Add Admin -->
    <div id="addAdminModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Tambah Admin Baru</h3>
                <button class="modal-close" onclick="closeAddAdminModal()">×</button>
            </div>
            <form id="addAdminForm" onsubmit="handleAddAdmin(event)">
                <div class="form-group">
                    <label for="newUsername">Username *</label>
                    <input type="text" id="newUsername" required minlength="4" placeholder="Minimal 4 karakter">
                </div>
                <div class="form-group">
                    <label for="newPassword">Password *</label>
                    <input type="password" id="newPassword" required minlength="6" placeholder="Minimal 6 karakter">
                </div>
                <div class="form-group">
                    <label for="newNamaLengkap">Nama Lengkap *</label>
                    <input type="text" id="newNamaLengkap" required placeholder="Nama lengkap admin">
                </div>
                <div class="form-group">
                    <label for="newEmail">Email *</label>
                    <input type="email" id="newEmail" required placeholder="email@example.com">
                </div>
                <div class="form-group">
                    <label for="newRole">Role *</label>
                    <select id="newRole" required>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <button type="submit" class="btn-submit">
                    <i class="fas fa-plus"></i> Tambah Admin
                </button>
            </form>
        </div>
    </div>

    <script src="../web.js"></script>
    <script src="../superadmin_script.js"></script>
</body>
</html>