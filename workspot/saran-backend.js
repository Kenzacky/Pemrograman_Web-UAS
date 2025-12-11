// ===== IMAGE PREVIEW =====
document.getElementById('gambar')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    const errorGambar = document.getElementById('errorGambar');
    
    errorGambar.classList.remove('show');
    
    if (file) {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            errorGambar.textContent = 'Ukuran file terlalu besar. Maksimal 5MB';
            errorGambar.classList.add('show');
            e.target.value = '';
            preview.innerHTML = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            errorGambar.textContent = 'Format tidak didukung. Gunakan JPG, PNG, GIF, atau WEBP';
            errorGambar.classList.add('show');
            e.target.value = '';
            preview.innerHTML = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.innerHTML = `
                <div style="margin-top: 1rem; position: relative;">
                    <img src="${event.target.result}" style="max-width: 300px; max-height: 200px; border-radius: 10px; box-shadow: 0 4px 10px var(--shadow);">
                    <button type="button" onclick="removeImagePreview()" style="position: absolute; top: 10px; right: 10px; background: rgba(244, 67, 54, 0.9); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 1.2rem; line-height: 1;">×</button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
});

function removeImagePreview() {
    document.getElementById('gambar').value = '';
    document.getElementById('imagePreview').innerHTML = '';
}

// ===== VALIDASI GOOGLE MAPS =====
document.getElementById('mapsLink')?.addEventListener('blur', function() {
    const value = this.value.trim();
    const errorMaps = document.getElementById('errorMaps');
    
    if (value !== '') {
        try {
            const url = new URL(value);
            if (!value.includes('google.com/maps') && !value.includes('maps.app.goo.gl')) {
                errorMaps.textContent = 'Link harus dari Google Maps';
                errorMaps.classList.add('show');
                return;
            }
        } catch (e) {
            errorMaps.textContent = 'Format link tidak valid';
            errorMaps.classList.add('show');
            return;
        }
    }
    errorMaps.classList.remove('show');
});

document.getElementById('mapsLink')?.addEventListener('input', function() {
    document.getElementById('errorMaps')?.classList.remove('show');
});

// ===== FORM SUBMIT DENGAN BACKEND =====
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
        // JANGAN tambahkan Content-Type header! Browser akan set otomatis dengan boundary
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
            const successMessage = document.getElementById('successMessage');
            const namaTempat = document.getElementById('namaTempat').value;
            
            successMessage.innerHTML = `
                <div class="success-content">
                    <span class="icon" style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">✅</span>
                    <h3 style="margin-bottom: 0.5rem;">Terima Kasih!</h3>
                    <p style="margin-bottom: 0.3rem;">Saran "<strong>${namaTempat}</strong>" berhasil dikirim.</p>
                    <p style="font-size: 0.85rem; opacity: 0.9;">Tim kami akan meninjau saran Anda.</p>
                    ${data.data && data.data.gambar ? '<p style="font-size: 0.8rem; color: #4CAF50;">✓ Gambar berhasil diupload</p>' : '<p style="font-size: 0.8rem; color: #FF9800;">⚠ Tanpa gambar</p>'}
                </div>
            `;
            successMessage.classList.add('show');
            
            // Reset form
            document.getElementById('saranForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 8000);
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
} // ← INI YANG HILANG!

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('saran-backend.js loaded!');
    
    const form = document.getElementById('saranForm');
    if (form) {
        // Hapus event listener lama dari web.js
        const oldHandler = form.onsubmit;
        form.onsubmit = null;
        
        // Tambah event listener baru
        form.addEventListener('submit', handleFormSubmitBackend);
        
        console.log('Form submit handler attached');
    } else {
        console.error('Form saranForm tidak ditemukan!');
    }
});