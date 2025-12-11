// Tambahkan fungsi ini di saran-backend.js setelah submit berhasil

// Update fungsi handleFormSubmitBackend untuk menyimpan ke user history
function handleFormSubmitBackend(e) {
    e.preventDefault();
    
    console.log('Form submitted!');
    
    // Validasi form dulu
    if (!validateForm()) {
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span style="display: inline-block; width: 20px; height: 20px; border: 2px solid #ffffff; border-radius: 50%; border-top-color: transparent; animation: spin 1s ease-in-out infinite;"></span> Mengirim...';
    submitBtn.disabled = true;
    
    // Buat FormData
    const formData = new FormData();
    formData.append('namaTempat', document.getElementById('namaTempat').value.trim());
    formData.append('lokasi', document.getElementById('lokasi').value.trim());
    formData.append('kategori', document.getElementById('kategori').value);
    formData.append('fasilitas', document.getElementById('fasilitas').value.trim());
    formData.append('jamBuka', document.getElementById('jamBuka').value.trim());
    formData.append('deskripsi', document.getElementById('deskripsi').value.trim());
    formData.append('kontak', document.getElementById('kontak').value.trim());
    formData.append('mapsLink', document.getElementById('mapsLink').value.trim());
    
    // PENTING: Append gambar file
    const gambarInput = document.getElementById('gambar');
    if (gambarInput && gambarInput.files.length > 0) {
        const gambarFile = gambarInput.files[0];
        formData.append('gambar', gambarFile);
        console.log('Gambar file ditambahkan:', gambarFile.name, gambarFile.size, 'bytes');
    } else {
        console.log('Tidak ada gambar yang dipilih');
    }
    
    // Debug: Log FormData contents
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
            console.log(pair[0] + ': FILE - ' + pair[1].name + ' (' + pair[1].size + ' bytes)');
        } else {
            console.log(pair[0] + ': ' + pair[1]);
        }
    }
    
    // Kirim ke server
    fetch('backend/add_saran.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (data.success) {
            // Simpan saran ke user history (localStorage)
            saveToUserHistory(formData);
            
            const successMessage = document.getElementById('successMessage');
            const namaTempat = document.getElementById('namaTempat').value;
            
            successMessage.innerHTML = `
                <div class="success-content">
                    <span class="icon" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">✅</span>
                    <h3 style="margin-bottom: 0.5rem;">Terima Kasih!</h3>
                    <p style="margin-bottom: 0.3rem;">Saran "<strong>${namaTempat}</strong>" berhasil dikirim.</p>
                    <p style="font-size: 0.85rem; opacity: 0.9;">Tim kami akan meninjau saran Anda.</p>
                    ${data.data && data.data.gambar ? '<p style="font-size: 0.8rem; color: #4CAF50;">✓ Gambar berhasil diupload</p>' : '<p style="font-size: 0.8rem; color: #FF9800;">⚠ Tanpa gambar</p>'}
                    <a href="dashboard.html" style="display: inline-block; margin-top: 1rem; padding: 0.6rem 1.2rem; background: white; color: var(--accent); text-decoration: none; border-radius: 8px; font-weight: 500;">
                        Lihat Dashboard →
                    </a>
                </div>
            `;
            successMessage.classList.add('show');
            
            // Reset form
            document.getElementById('saranForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 10000);
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        alert('Terjadi kesalahan saat mengirim data. Pastikan server PHP (XAMPP) sudah berjalan.\n\nError: ' + error.message);
    });
}

// Fungsi untuk menyimpan saran ke user history
function saveToUserHistory(formData) {
    const currentUser = getCurrentUser();
    
    // Jika user login, simpan ke history
    if (currentUser) {
        const saranData = {
            id: Date.now(),
            nama_tempat: formData.get('namaTempat'),
            lokasi: formData.get('lokasi'),
            kategori: formData.get('kategori'),
            fasilitas: formData.get('fasilitas'),
            jam_operasional: formData.get('jamBuka'),
            deskripsi: formData.get('deskripsi'),
            kontak: formData.get('kontak'),
            maps_link: formData.get('mapsLink'),
            status: 'pending',
            submitted_at: new Date().toISOString()
        };
        
        // Ambil history saran user
        const userSaranKey = 'user_saran_' + currentUser.id;
        const userSaran = JSON.parse(localStorage.getItem(userSaranKey) || '[]');
        
        // Tambahkan saran baru
        userSaran.push(saranData);
        
        // Simpan kembali
        localStorage.setItem(userSaranKey, JSON.stringify(userSaran));
        
        console.log('Saran saved to user history:', saranData);
    }
}

// Fungsi untuk mendapatkan user yang login (jika belum ada di file ini)
function getCurrentUser() {
    const userData = localStorage.getItem('workspot_current_user');
    return userData ? JSON.parse(userData) : null;
}