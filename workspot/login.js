// login.js - Handle user login dengan Remember Me feature
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Login page loaded');
    
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Load saved email jika ada
    loadSavedEmail();
    
    // Cek jika user sudah login
    checkLoginStatus();
    
    // Handle form submit
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Fungsi untuk load email yang tersimpan
function loadSavedEmail() {
    const savedEmail = localStorage.getItem('workspot_saved_email');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    if (savedEmail) {
        emailInput.value = savedEmail;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
        console.log('📧 Loaded saved email:', savedEmail);
    }
}

// Fungsi untuk save/remove email
function handleRememberMe(email, remember) {
    if (remember) {
        localStorage.setItem('workspot_saved_email', email);
        console.log('💾 Email saved for next time');
    } else {
        localStorage.removeItem('workspot_saved_email');
        console.log('🗑️ Saved email removed');
    }
}

// Fungsi untuk cek status login
async function checkLoginStatus() {
    console.log('🔍 Checking login status...');
    
    try {
        const formData = new FormData();
        formData.append('action', 'check_auth');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        console.log('📥 Check auth response status:', response.status);
        
        const text = await response.text();
        console.log('📄 Check auth raw response:', text);
        
        if (!text || text.trim() === '') {
            console.warn('⚠️ Empty response from check_auth');
            return;
        }
        
        const data = JSON.parse(text);
        console.log('📥 Check auth data:', data);
        
        if (data.success) {
            console.log('✅ Already logged in, redirecting...');
            window.location.href = 'beranda.html';
        } else {
            console.log('ℹ️ Not logged in');
        }
    } catch (error) {
        console.error('❌ Error checking login status:', error);
    }
}

// Fungsi untuk handle login
async function handleLogin(e) {
    e.preventDefault();
    console.log('📝 Form submitted');
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe')?.checked || false;
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password.length);
    console.log('💾 Remember Me:', rememberMe);
    
    // Validasi
    if (!email || !password) {
        showError('Email dan password harus diisi');
        return;
    }
    
    // Disable button dan ubah text
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
    
    try {
        // Kirim request ke backend
        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('email', email);
        formData.append('password', password);
        
        console.log('📤 Sending request to: backend/auth.php');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        console.log('📥 Response status:', response.status);
        console.log('📥 Response ok:', response.ok);
        
        // Ambil response sebagai text dulu
        const responseText = await response.text();
        console.log('📄 Raw response:', responseText);
        console.log('📄 Response length:', responseText.length);
        
        // Cek apakah response kosong
        if (!responseText || responseText.trim() === '') {
            console.error('❌ Empty response from server!');
            showError('Server mengembalikan response kosong. Cek file auth.php!');
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            return;
        }
        
        // Cek apakah response adalah HTML error
        if (responseText.trim().startsWith('<')) {
            console.error('❌ Response is HTML, not JSON!');
            console.error('HTML content:', responseText.substring(0, 500));
            showError('Server error: Response bukan JSON. Cek error log PHP!');
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            return;
        }
        
        // Parse JSON
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('✅ Response data:', data);
        } catch (parseError) {
            console.error('❌ JSON parse error:', parseError);
            console.error('Failed to parse:', responseText);
            showError('Response tidak valid: ' + parseError.message);
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            return;
        }
        
        if (data.success) {
            // Login berhasil
            console.log('✅ Login berhasil!');
            showSuccess(data.message);
            
            // Handle Remember Me
            handleRememberMe(email, rememberMe);
            
            // Simpan data user di localStorage
            localStorage.setItem('workspot_current_user', JSON.stringify(data.data));
            console.log('💾 User data saved to localStorage');
            
            // Redirect ke beranda setelah 1 detik
            console.log('🔄 Redirecting to beranda.html...');
            setTimeout(() => {
                window.location.href = 'beranda.html';
            }, 1000);
            
        } else {
            // Login gagal
            console.log('❌ Login gagal:', data.message);
            showError(data.message);
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
        
    } catch (error) {
        console.error('❌ Login error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        showError('Terjadi kesalahan: ' + error.message);
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    }
}

// Fungsi untuk tampilkan error
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.className = 'error-message';
        
        // Auto hide setelah 5 detik
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else {
        alert('ERROR: ' + message);
    }
}

// Fungsi untuk tampilkan success
function showSuccess(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.className = 'success-message';
    } else {
        alert('SUCCESS: ' + message);
    }
}