// dashboard.js - Dashboard user functionality (Complete Version)
console.log('🚀 Dashboard script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM loaded, checking authentication...');
    checkAuthAndLoadProfile();
});

// Cek authentication dan load profile dari session PHP
async function checkAuthAndLoadProfile() {
    console.log('🔐 Checking authentication...');
    
    try {
        const formData = new FormData();
        formData.append('action', 'check_auth');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        console.log('📥 Auth response:', data);
        
        if (data.success && data.data) {
            // User authenticated
            console.log('✅ User authenticated:', data.data.nama);
            loadUserProfile(data.data);
        } else {
            // Not authenticated, redirect to login
            console.log('❌ Not authenticated, redirecting to login...');
            alert('⚠️ Anda belum login. Silakan login terlebih dahulu.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('❌ Auth check error:', error);
        alert('⚠️ Terjadi kesalahan saat memeriksa login. Silakan login kembali.');
        window.location.href = 'login.html';
    }
}

// Load user profile data
function loadUserProfile(user) {
    console.log('👤 Loading user profile:', user);
    
    // Update header
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userName) userName.textContent = user.nama || 'User';
    if (userEmail) userEmail.textContent = user.email || '';
    
    // Set avatar initial
    if (userAvatar) {
        const initial = (user.nama || 'U').charAt(0).toUpperCase();
        userAvatar.textContent = initial;
    }
    
    // Update profile info
    const profileInfo = document.getElementById('profileInfo');
    if (profileInfo) {
        const registrationDate = new Date();
        const daysSinceRegistration = 0;
        
        profileInfo.innerHTML = `
            <div class="info-row">
                <div class="info-label">Nama Lengkap:</div>
                <div class="info-value">${user.nama}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">${user.email}</div>
            </div>
            <div class="info-row">
                <div class="info-label">User ID:</div>
                <div class="info-value">#${user.id}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Bergabung:</div>
                <div class="info-value">${registrationDate.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })} (${daysSinceRegistration} hari yang lalu)</div>
            </div>
        `;
    }
}

// Load user's saran history dari backend PHP
async function loadUserSaran() {
    console.log('📋 Loading user saran from backend...');
    
    const saranList = document.getElementById('saranList');
    
    if (!saranList) {
        console.error('❌ Element saranList not found!');
        return;
    }
    
    // Show loading
    saranList.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <p>Memuat data...</p>
        </div>
    `;
    
    try {
        const response = await fetch('backend/get_user_saran.php', {
            method: 'GET',
            credentials: 'include'
        });
        
        const text = await response.text();
        console.log('📥 Raw response:', text);
        
        const data = JSON.parse(text);
        console.log('📥 Parsed saran response:', data);
        
        if (data.success && data.data && data.data.length > 0) {
            console.log('✅ Found', data.data.length, 'saran items');
            displaySaranList(data.data);
        } else {
            console.log('ℹ️ No saran found');
            // No saran found
            saranList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📋</div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Belum Ada Saran</h3>
                    <p>Anda belum mengirimkan saran apapun</p>
                    <a href="saran.html" style="display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--accent); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
                        📝 Kirim Saran Pertama
                    </a>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Load saran error:', error);
        saranList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Terjadi Kesalahan</h3>
                <p>Gagal memuat data saran: ${error.message}</p>
                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Pastikan server XAMPP berjalan dan file backend ada.</p>
                <button onclick="loadUserSaran()" style="margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;">🔄 Coba Lagi</button>
            </div>
        `;
    }
}

// Display saran list
function displaySaranList(saranData) {
    console.log('🎨 Displaying', saranData.length, 'saran items');
    
    const saranList = document.getElementById('saranList');
    
    if (!saranList) {
        console.error('❌ Element saranList not found!');
        return;
    }
    
    saranList.innerHTML = saranData.map((saran, index) => {
        console.log(`📝 Creating card ${index + 1}:`, saran.nama_tempat);
        
        // Format tanggal
        const submittedDate = new Date(saran.created_at);
        const tanggal = submittedDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        const jam = submittedDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Status mapping
        const statusMap = {
            'pending': { class: 'status-pending', text: '⏳ Menunggu Review' },
            'approved': { class: 'status-approved', text: '✅ Disetujui' },
            'rejected': { class: 'status-rejected', text: '❌ Ditolak' }
        };
        
        const status = statusMap[saran.status] || statusMap['pending'];
        
        // Image HTML
        let imageHTML = '';
        if (saran.gambar) {
            imageHTML = `
                <div style="margin-top: 1rem; margin-bottom: 1rem;">
                    <img src="uploads/saran/${saran.gambar}" alt="${saran.nama_tempat}" 
                         style="max-width: 300px; max-height: 200px; border-radius: 10px; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: block;"
                         onerror="console.error('Image load error:', this.src); this.style.display='none';">
                </div>
            `;
        }
        
        // Fasilitas
        let fasilitasHTML = '';
        if (saran.fasilitas) {
            const fasilitasArray = saran.fasilitas.split(',').map(f => f.trim()).filter(f => f);
            if (fasilitasArray.length > 0) {
                fasilitasHTML = `
                    <p style="margin-top: 0.8rem; color: var(--text-secondary);">
                        <strong>✨ Fasilitas:</strong> ${fasilitasArray.join(', ')}
                    </p>
                `;
            }
        }
        
        // Status notification
        let statusNotification = '';
        if (saran.status === 'approved') {
            statusNotification = `
                <div style="margin-top: 1.5rem; padding: 1rem; background: #d4edda; border-radius: 8px; color: #155724; border-left: 4px solid #28a745;">
                    <strong>✅ Saran Anda telah disetujui dan ditambahkan ke website!</strong>
                </div>
            `;
        } else if (saran.status === 'rejected') {
            statusNotification = `
                <div style="margin-top: 1.5rem; padding: 1rem; background: #f8d7da; border-radius: 8px; color: #721c24; border-left: 4px solid #dc3545;">
                    <strong>❌ Saran Anda ditolak.</strong> Silakan kirim saran baru dengan informasi yang lebih lengkap.
                </div>
            `;
        } else if (saran.status === 'pending') {
            statusNotification = `
                <div style="margin-top: 1.5rem; padding: 1rem; background: #fff3cd; border-radius: 8px; color: #856404; border-left: 4px solid #ffc107;">
                    <strong>⏳ Saran Anda sedang dalam proses review oleh admin.</strong>
                </div>
            `;
        }
        
        return `
            <div class="saran-item" style="animation: fadeInUp 0.5s ease ${index * 0.1}s both;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
                    <div style="flex: 1; min-width: 200px;">
                        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.3rem;">${saran.nama_tempat}</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 0.3rem;">
                            📍 ${saran.lokasi}
                        </p>
                        <p style="color: var(--text-secondary); margin-bottom: 0.3rem;">
                            🏷️ ${saran.kategori}
                        </p>
                    </div>
                    <span class="saran-status ${status.class}" style="flex-shrink: 0;">${status.text}</span>
                </div>
                
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    🗓️ Dikirim: ${tanggal}, ${jam}
                </p>
                
                ${imageHTML}
                
                ${saran.jam_operasional ? `
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                        <strong>⏰ Jam Operasional:</strong> ${saran.jam_operasional}
                    </p>
                ` : ''}
                
                ${fasilitasHTML}
                
                <p style="color: var(--text-primary); margin-top: 1rem; font-style: italic; line-height: 1.6; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    "${saran.deskripsi}"
                </p>
                
                ${saran.kontak ? `
                    <p style="color: var(--text-secondary); margin-top: 0.8rem;">
                        <strong>📞 Kontak:</strong> ${saran.kontak}
                    </p>
                ` : ''}
                
                ${saran.maps_link ? `
                    <p style="margin-top: 0.8rem;">
                        <a href="${saran.maps_link}" target="_blank" style="color: var(--accent); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;">
                            🗺️ Lihat di Google Maps <span style="font-size: 1.2rem;">→</span>
                        </a>
                    </p>
                ` : ''}
                
                ${statusNotification}
            </div>
        `;
    }).join('');
    
    // Tambahkan tombol "Kirim Saran Baru" setelah list saran
    saranList.innerHTML += `
        <div style="text-align: center; margin-top: 2rem; padding: 2rem; background: var(--card-bg); border-radius: 15px; box-shadow: 0 4px 15px var(--shadow);">
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Punya Rekomendasi Tempat Lain?</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Bantu teman-teman menemukan tempat nugas terbaik di sekitar UNESA!</p>
            <a href="saran.html" style="display: inline-block; padding: 1rem 2.5rem; background: var(--accent); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 1.1rem; transition: all 0.3s; box-shadow: 0 4px 15px rgba(141, 110, 99, 0.3);" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(141, 110, 99, 0.4)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(141, 110, 99, 0.3)'">
                📝 Kirim Saran Baru
            </a>
        </div>
    `;
    
    console.log('✅ Saran list rendered successfully');
}

// Switch between tabs
function switchTab(tabName) {
    console.log('🔄 Switching to tab:', tabName);
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab
    if (tabName === 'profile') {
        document.getElementById('profileTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        console.log('✅ Switched to Profile tab');
    } else if (tabName === 'saran') {
        document.getElementById('saranTab').classList.add('active');
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        console.log('✅ Switched to Riwayat Saran tab');
        
        // Load saran saat tab dibuka (hanya jika belum di-load)
        const saranList = document.getElementById('saranList');
        if (saranList && saranList.innerHTML.includes('⏳')) {
            console.log('📋 Loading saran for first time...');
            loadUserSaran();
        }
    }
}

console.log('✅ Dashboard script fully loaded');