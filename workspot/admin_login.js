// admin_login.js - FULL VERSION dengan Super Admin Support
// Redirect otomatis berdasarkan role admin

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Admin login page loaded');
    
    const loginForm = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('rememberMe');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // Check if already logged in
    checkAdminSession();

    // Load saved username if exists
    loadSavedUsername();

    // Form submit handler
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        console.log('🚀 Attempting admin login...');
        console.log('Username:', username);

        // Validation
        if (!username || !password) {
            showError('Username dan password harus diisi!');
            return;
        }

        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '⏳ Logging in...';

        try {
            const formData = new FormData();
            formData.append('action', 'login');
            formData.append('username', username);
            formData.append('password', password);

            console.log('📤 Sending login request to backend...');

            const response = await fetch('backend/admin_auth.php', {
                method: 'POST',
                body: formData
            });

            console.log('📥 Response status:', response.status);

            const data = await response.json();
            console.log('📦 Response data:', data);

            if (data.success) {
                console.log('✅ Login berhasil!');
                console.log('👤 Role:', data.data.role);
                
                // Handle Remember Me
                handleRememberMe(username, remember);

                // Show success message based on role
                const roleText = data.data.role === 'superadmin' ? '👑 Super Admin' : '🔧 Admin';
                showSuccess(`✅ Login berhasil sebagai ${roleText}!`);

                // Redirect berdasarkan role
                setTimeout(() => {
                    if (data.data.role === 'superadmin') {
                        console.log('🔄 Redirecting to Super Admin panel...');
                        window.location.href = 'backend/superadmin.php';
                    } else {
                        console.log('🔄 Redirecting to Admin panel...');
                        window.location.href = 'backend/admin.php';
                    }
                }, 1000);

            } else {
                console.log('❌ Login gagal:', data.message);
                showError(data.message || 'Login gagal! Periksa username dan password.');
                submitButton.disabled = false;
                submitButton.innerHTML = '🔐 Login sebagai Admin';
            }

        } catch (error) {
            console.error('❌ Error during login:', error);
            showError('Terjadi kesalahan saat login. Cek console untuk detail.');
            submitButton.disabled = false;
            submitButton.innerHTML = '🔐 Login sebagai Admin';
        }
    });

    // ===== Remember Me Functions =====
    function handleRememberMe(username, remember) {
        if (remember) {
            localStorage.setItem('workspot_admin_username', username);
            console.log('💾 Username saved:', username);
        } else {
            localStorage.removeItem('workspot_admin_username');
            console.log('🗑️ Saved username removed');
        }
    }

    function loadSavedUsername() {
        const savedUsername = localStorage.getItem('workspot_admin_username');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberCheckbox.checked = true;
            console.log('📂 Loaded saved username:', savedUsername);
        }
    }

    // ===== Check Admin Session =====
    async function checkAdminSession() {
        try {
            const formData = new FormData();
            formData.append('action', 'check_session');

            const response = await fetch('backend/admin_auth.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.success && data.data && data.data.logged_in) {
                console.log('✅ Already logged in as:', data.data.role);
                console.log('🔄 Redirecting...');
                
                // Redirect berdasarkan role
                if (data.data.role === 'superadmin') {
                    window.location.href = 'backend/superadmin.php';
                } else {
                    window.location.href = 'backend/admin.php';
                }
            } else {
                console.log('ℹ️ Not logged in, showing login form');
            }
        } catch (error) {
            console.log('⚠️ Session check failed:', error);
        }
    }

    // ===== Message Functions =====
    function showError(message) {
        errorMessage.textContent = '❌ ' + message;
        errorMessage.className = 'message error-message';
        errorMessage.style.display = 'block';
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.className = 'message success-message';
        errorMessage.style.display = 'block';
    }

    // ===== Keyboard Shortcuts =====
    document.addEventListener('keydown', function(e) {
        // ESC key to clear form
        if (e.key === 'Escape') {
            usernameInput.value = '';
            passwordInput.value = '';
            usernameInput.focus();
        }
    });
});