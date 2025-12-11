/**
 * WorkSpot UNESA - Super Admin JavaScript
 * File: superadmin_script.js (di ROOT folder)
 * COMPLETE FIXED VERSION
 */

// ===== TAB SWITCHING =====
function showTab(tabName) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + '-section').classList.add('active');
    event.target.closest('.tab-btn').classList.add('active');
    
    if (tabName === 'admins') loadAdmins();
    if (tabName === 'users') loadUsers();
    if (tabName === 'places') loadPlaces();
}

// ===== LOAD STATS =====
async function loadStats() {
    try {
        const response = await fetch('superadmin_api.php?action=get_stats');
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('totalUsers').textContent = data.data.total_users || 0;
            document.getElementById('totalPlaces').textContent = data.data.total_places || 0;
            document.getElementById('totalSuggestions').textContent = data.data.pending_suggestions || 0;
            document.getElementById('totalAdmins').textContent = data.data.total_admins || 0;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ===== LOAD ADMINS =====
async function loadAdmins() {
    const container = document.getElementById('adminsTable');
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><p>Loading...</p></div>';
    
    try {
        const response = await fetch('superadmin_api.php?action=get_admins');
        const data = await response.json();
        
        console.log('Admins API Response:', data); // Debug
        
        if (data.success && data.data && data.data.length > 0) {
            let html = `
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Nama Lengkap</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Last Login</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            data.data.forEach(admin => {
                const roleClass = admin.role === 'superadmin' ? 'role-superadmin' : 'role-admin';
                const statusClass = admin.status === 'active' ? 'status-active' : 'status-inactive';
                const safeUsername = String(admin.username || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                
                html += `
                    <tr>
                        <td>${admin.id}</td>
                        <td><strong>${admin.username || '-'}</strong></td>
                        <td>${admin.nama_lengkap || '-'}</td>
                        <td>${admin.email || '-'}</td>
                        <td><span class="role-badge ${roleClass}">${admin.role || 'admin'}</span></td>
                        <td><span class="status-badge ${statusClass}">${admin.status || 'active'}</span></td>
                        <td>${admin.last_login || 'Belum pernah'}</td>
                        <td class="table-actions">
                            ${admin.role !== 'superadmin' ? `
                                <button class="btn-sm btn-delete" onclick="deleteAdmin(${admin.id}, '${safeUsername}')">
                                    <i class="fas fa-trash"></i> Hapus
                                </button>
                            ` : '<em style="color: #999;">Protected</em>'}
                        </td>
                    </tr>
                `;
            });
            
            html += '</tbody></table></div>';
            container.innerHTML = html;
        } else {
            console.log('No admins data or empty array');
            container.innerHTML = '<p style="text-align:center;padding:2rem;color:#999;">Tidak ada data admin</p>';
        }
    } catch (error) {
        console.error('Error loading admins:', error);
        container.innerHTML = '<p style="text-align:center;padding:2rem;color:red;">Error loading data: ' + error.message + '</p>';
    }
}

// ===== LOAD USERS =====
async function loadUsers() {
    const container = document.getElementById('usersTable');
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><p>Loading...</p></div>';
    
    try {
        const response = await fetch('superadmin_api.php?action=get_users');
        const data = await response.json();
        
        console.log('Users API Response:', data); // Debug
        
        if (data.success && data.data && data.data.length > 0) {
            let html = `
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Bergabung</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            data.data.forEach(user => {
                const safeEmail = String(user.email || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                
                html += `
                    <tr>
                        <td>${user.id}</td>
                        <td><strong>${user.nama_lengkap || '-'}</strong></td>
                        <td>${user.email || '-'}</td>
                        <td>${user.created_at || '-'}</td>
                        <td class="table-actions">
                            <button class="btn-sm btn-delete" onclick="deleteUser(${user.id}, '${safeEmail}')">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            html += '</tbody></table></div>';
            container.innerHTML = html;
        } else {
            console.log('No users data or empty array');
            container.innerHTML = '<p style="text-align:center;padding:2rem;color:#999;">Tidak ada data user</p>';
        }
    } catch (error) {
        console.error('Error loading users:', error);
        container.innerHTML = '<p style="text-align:center;padding:2rem;color:red;">Error loading data: ' + error.message + '</p>';
    }
}

// ===== LOAD PLACES =====
async function loadPlaces() {
    const container = document.getElementById('placesTable');
    container.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><p>Loading...</p></div>';
    
    try {
        const response = await fetch('superadmin_api.php?action=get_places');
        const data = await response.json();
        
        console.log('Places API Response:', data); // Debug
        
        if (data.success && data.data && data.data.length > 0) {
            let html = `
                <div class="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Tempat</th>
                                <th>Kategori</th>
                                <th>Lokasi</th>
                                <th>Status</th>
                                <th>Ditambahkan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            data.data.forEach(place => {
                const statusClass = place.status === 'approved' ? 'status-active' : 'status-pending';
                const safeNama = String(place.nama || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
                
                html += `
                    <tr>
                        <td>${place.id}</td>
                        <td><strong>${place.nama || '-'}</strong></td>
                        <td>${place.kategori_nama || '-'}</td>
                        <td>${place.lokasi || '-'}</td>
                        <td><span class="status-badge ${statusClass}">${place.status || 'approved'}</span></td>
                        <td>${place.created_at || '-'}</td>
                        <td class="table-actions">
                            <button class="btn-sm btn-delete" onclick="deletePlace(${place.id}, '${safeNama}')">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            html += '</tbody></table></div>';
            container.innerHTML = html;
        } else {
            console.log('No places data or empty array');
            container.innerHTML = '<p style="text-align:center;padding:2rem;color:#999;">Tidak ada data tempat</p>';
        }
    } catch (error) {
        console.error('Error loading places:', error);
        container.innerHTML = '<p style="text-align:center;padding:2rem;color:red;">Error loading data: ' + error.message + '</p>';
    }
}

// ===== MODAL FUNCTIONS =====
function openAddAdminModal() {
    document.getElementById('addAdminModal').classList.add('active');
}

function closeAddAdminModal() {
    document.getElementById('addAdminModal').classList.remove('active');
    document.getElementById('addAdminForm').reset();
}

// ===== ADD ADMIN =====
async function handleAddAdmin(event) {
    event.preventDefault();
    
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const nama_lengkap = document.getElementById('newNamaLengkap').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const role = document.getElementById('newRole').value;
    
    if (!confirm(`Tambah admin baru dengan username "${username}"?`)) return;
    
    try {
        const formData = new FormData();
        formData.append('action', 'create_admin');
        formData.append('username', username);
        formData.append('password', password);
        formData.append('nama_lengkap', nama_lengkap);
        formData.append('email', email);
        formData.append('role', role);
        
        const response = await fetch('superadmin_api.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        alert(data.message);
        
        if (data.success) {
            closeAddAdminModal();
            loadAdmins();
            loadStats();
        }
    } catch (error) {
        console.error('Error adding admin:', error);
        alert('Error: ' + error.message);
    }
}

// ===== DELETE ADMIN =====
async function deleteAdmin(id, username) {
    if (!confirm(`⚠️ Yakin hapus admin "${username}"?\n\nTindakan ini tidak bisa dibatalkan!`)) return;
    
    try {
        const formData = new FormData();
        formData.append('action', 'delete_admin');
        formData.append('id', id);
        
        const response = await fetch('superadmin_api.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        alert(data.message);
        
        if (data.success) {
            loadAdmins();
            loadStats();
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Error: ' + error.message);
    }
}

// ===== DELETE USER =====
async function deleteUser(id, email) {
    if (!confirm(`⚠️ Yakin hapus user "${email}"?\n\nTindakan ini tidak bisa dibatalkan!`)) return;
    
    try {
        const formData = new FormData();
        formData.append('action', 'delete_user');
        formData.append('id', id);
        
        const response = await fetch('superadmin_api.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        alert(data.message);
        
        if (data.success) {
            loadUsers();
            loadStats();
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error: ' + error.message);
    }
}

// ===== DELETE PLACE =====
async function deletePlace(id, nama) {
    if (!confirm(`⚠️ Yakin hapus tempat "${nama}"?\n\nTindakan ini tidak bisa dibatalkan!`)) return;
    
    try {
        const formData = new FormData();
        formData.append('action', 'delete_place');
        formData.append('id', id);
        
        const response = await fetch('superadmin_api.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        alert(data.message);
        
        if (data.success) {
            loadPlaces();
            loadStats();
        }
    } catch (error) {
        console.error('Error deleting place:', error);
        alert('Error: ' + error.message);
    }
}

// ===== LOGOUT =====
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

// ===== INIT ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Super Admin Panel loaded');
    loadStats();
    loadAdmins();
});

// ===== CLOSE MODAL WHEN CLICKING OUTSIDE =====
window.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('addAdminModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAddAdminModal();
            }
        });
    }
});