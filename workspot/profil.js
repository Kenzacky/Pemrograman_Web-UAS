// profil.js - Handle user profile and saran history

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Profile page loaded');
    checkAuth();
    loadUserSaran();
});

async function checkAuth() {
    console.log('🔐 Checking authentication...');
    
    try {
        const formData = new FormData();
        formData.append('action', 'check_auth');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        console.log('📥 Auth check response:', data);
        
        if (data.success && data.data) {
            // Update profile display
            document.getElementById('profileName').textContent = data.data.nama;
            document.getElementById('profileEmail').textContent = data.data.email;
            
            // Set avatar initial
            const initial = data.data.nama.charAt(0).toUpperCase();
            document.getElementById('profileAvatar').textContent = initial;
            
            console.log('✅ User authenticated:', data.data.nama);
        } else {
            // Belum login, redirect ke login page
            console.log('❌ Not authenticated, redirecting to login...');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('❌ Check auth error:', error);
        window.location.href = 'login.html';
    }
}

async function loadUserSaran() {
    console.log('📋 Loading user saran...');
    
    const container = document.getElementById('saranContainer');
    const countElement = document.getElementById('saranCount');
    
    try {
        const response = await fetch('backend/get_user_saran.php', {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        console.log('📥 Saran data:', data);
        
        if (data.success && data.data) {
            const saranList = data.data;
            
            // Update count
            countElement.textContent = `${saranList.length} saran`;
            console.log('📊 Total saran:', saranList.length);
            
            if (saranList.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <h3>Belum Ada Saran</h3>
                        <p>Anda belum mengirimkan saran apapun</p>
                        <a href="saran.html" class="btn btn-primary">Kirim Saran Pertama</a>
                    </div>
                `;
            } else {
                container.innerHTML = '<div class="saran-grid">' + 
                    saranList.map(saran => createSaranCard(saran)).join('') + 
                    '</div>';
            }
        } else {
            console.error('❌ Failed to load saran:', data.message);
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">❌</div>
                    <h3>Gagal Memuat Data</h3>
                    <p>${data.message || 'Terjadi kesalahan'}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Load saran error:', error);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3>Terjadi Kesalahan</h3>
                <p>Gagal memuat data. Pastikan server berjalan.</p>
                <button class="btn btn-primary" onclick="location.reload()">🔄 Coba Lagi</button>
            </div>
        `;
    }
}

function createSaranCard(saran) {
    console.log('🎨 Creating card for:', saran.nama_tempat);
    
    // Image HTML
    let imageHTML = '';
    if (saran.gambar) {
        imageHTML = `<img src="uploads/saran/${saran.gambar}" alt="${saran.nama_tempat}" 
                     onerror="this.parentElement.innerHTML='<div class=\\'no-image\\'>📷</div>'">`;
    } else {
        imageHTML = '<div class="no-image">📷</div>';
    }
    
    // Status class dan text
    const statusMap = {
        'pending': { class: 'status-pending', icon: '⏳', text: 'Menunggu Review' },
        'approved': { class: 'status-approved', icon: '✅', text: 'Disetujui' },
        'rejected': { class: 'status-rejected', icon: '❌', text: 'Ditolak' }
    };
    
    const status = statusMap[saran.status] || statusMap['pending'];
    
    // Fasilitas HTML
    let fasilitasHTML = '';
    if (saran.fasilitas) {
        const fasilitasArray = saran.fasilitas.split(',').map(f => f.trim()).filter(f => f);
        if (fasilitasArray.length > 0) {
            fasilitasHTML = fasilitasArray.map(f => 
                `<span style="background: var(--accent); color: white; padding: 0.3rem 0.7rem; border-radius: 15px; margin-right: 0.3rem; font-size: 0.85rem; display: inline-block; margin-bottom: 0.3rem;">${f}</span>`
            ).join('');
        }
    }
    
    // Format tanggal
    const tanggal = new Date(saran.created_at).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `
        <div class="saran-card">
            <div class="saran-header">
                <div>
                    <div class="saran-title">${saran.nama_tempat}</div>
                    <div class="saran-date">📅 ${tanggal}</div>
                </div>
                <span class="status-badge ${status.class}">${status.icon} ${status.text}</span>
            </div>
            
            <div class="saran-content">
                <div class="saran-image">
                    ${imageHTML}
                </div>
                
                <div class="saran-info">
                    <p><strong>📍 Lokasi:</strong><br>${saran.lokasi}</p>
                    
                    <p><strong>🏷️ Kategori:</strong> 
                        <span style="background: var(--bg-secondary); padding: 0.3rem 0.8rem; border-radius: 15px;">
                            ${saran.kategori}
                        </span>
                    </p>
                    
                    ${saran.jam_operasional ? `<p><strong>⏰ Jam Operasional:</strong> ${saran.jam_operasional}</p>` : ''}
                    
                    ${fasilitasHTML ? `<p><strong>✨ Fasilitas:</strong><br>${fasilitasHTML}</p>` : ''}
                    
                    <p><strong>📝 Deskripsi:</strong><br>
                        <span style="font-style: italic; color: var(--text-secondary);">"${saran.deskripsi}"</span>
                    </p>
                    
                    ${saran.kontak ? `<p><strong>📞 Kontak:</strong> ${saran.kontak}</p>` : ''}
                    
                    ${saran.maps_link ? `
                        <p><strong>🗺️ Google Maps:</strong> 
                            <a href="${saran.maps_link}" target="_blank" style="color: var(--accent); text-decoration: underline;">
                                Lihat Lokasi →
                            </a>
                        </p>
                    ` : ''}
                </div>
            </div>
            
            ${saran.status === 'approved' ? `
                <div style="background: #d4edda; padding: 1rem; border-radius: 10px; margin-top: 1rem; color: #155724;">
                    ✅ <strong>Saran Anda telah disetujui dan ditambahkan ke website!</strong>
                </div>
            ` : ''}
            
            ${saran.status === 'rejected' ? `
                <div style="background: #f8d7da; padding: 1rem; border-radius: 10px; margin-top: 1rem; color: #721c24;">
                    ❌ Saran Anda ditolak. Silakan kirim saran baru dengan informasi yang lebih lengkap.
                </div>
            ` : ''}
            
            ${saran.status === 'pending' ? `
                <div style="background: #fff3cd; padding: 1rem; border-radius: 10px; margin-top: 1rem; color: #856404;">
                    ⏳ <strong>Saran Anda sedang dalam proses review oleh admin.</strong>
                </div>
            ` : ''}
        </div>
    `;
}

async function handleLogout() {
    if (!confirm('Yakin ingin logout?')) {
        return;
    }
    
    console.log('🚪 Logging out...');
    
    try {
        const formData = new FormData();
        formData.append('action', 'logout');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        console.log('📥 Logout response:', data);
        
        if (data.success) {
            console.log('✅ Logout successful');
            alert('✅ Logout berhasil!');
            
            // Clear localStorage
            localStorage.removeItem('workspot_current_user');
            
            // Redirect
            window.location.href = 'beranda.html';
        } else {
            console.log('❌ Logout failed');
            alert('❌ Gagal logout');
        }
    } catch (error) {
        console.error('❌ Logout error:', error);
        // Tetap redirect meskipun error
        localStorage.removeItem('workspot_current_user');
        window.location.href = 'beranda.html';
    }
}