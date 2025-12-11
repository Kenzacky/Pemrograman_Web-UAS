// register.js - Handle user registration dengan backend PHP (FIXED)
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // Setup password strength indicator
    setupPasswordStrengthIndicator();
    
    // Cek jika sudah login
    checkIfLoggedIn();
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirm_password').value.trim();
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Validasi
            if (!nama || !email || !password || !confirmPassword) {
                showError('Semua field harus diisi');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('Format email tidak valid');
                return;
            }
            
            if (password.length < 6) {
                showError('Password minimal 6 karakter');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('Password dan konfirmasi password tidak sama');
                return;
            }
            
            // Disable button & show loading
            submitButton.disabled = true;
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Memproses...';
            
            try {
                // Kirim request ke backend dengan FormData
                const formData = new FormData();
                formData.append('action', 'register');
                formData.append('nama', nama);
                formData.append('email', email);
                formData.append('password', password);
                
                const response = await fetch('backend/auth.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Registrasi berhasil
                    showSuccess(data.message);
                    
                    // Reset form
                    registerForm.reset();
                    updatePasswordStrengthIndicator('');
                    
                    // Redirect ke login setelah 2 detik
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                    
                } else {
                    // Registrasi gagal
                    showError(data.message);
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }
                
            } catch (error) {
                console.error('Register error:', error);
                showError('Terjadi kesalahan koneksi. Silakan coba lagi.');
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
});

// Validasi email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Cek jika sudah login - FIXED: Gunakan FormData
async function checkIfLoggedIn() {
    try {
        const formData = new FormData();
        formData.append('action', 'check_auth');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = 'beranda.html';
        }
    } catch (error) {
        console.error('Check auth error:', error);
    }
}

// ===== PASSWORD STRENGTH INDICATOR =====
function setupPasswordStrengthIndicator() {
    const passwordInput = document.getElementById('password');
    
    if (passwordInput) {
        const container = document.createElement('div');
        container.id = 'passwordStrengthContainer';
        container.style.marginTop = '0.5rem';
        
        const barContainer = document.createElement('div');
        barContainer.id = 'passwordStrengthBar';
        barContainer.style.display = 'flex';
        barContainer.style.gap = '3px';
        barContainer.style.height = '5px';
        barContainer.style.marginBottom = '5px';
        
        for (let i = 0; i < 4; i++) {
            const bar = document.createElement('div');
            bar.className = 'strength-segment';
            bar.style.flex = '1';
            bar.style.borderRadius = '2px';
            bar.style.backgroundColor = '#e0e0e0';
            bar.style.transition = 'background-color 0.3s ease';
            barContainer.appendChild(bar);
        }
        
        const textIndicator = document.createElement('div');
        textIndicator.id = 'passwordStrengthText';
        textIndicator.style.fontSize = '0.85rem';
        textIndicator.style.marginTop = '3px';
        
        container.appendChild(barContainer);
        container.appendChild(textIndicator);
        
        passwordInput.parentNode.appendChild(container);
        
        passwordInput.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            updatePasswordStrengthIndicator(this.value, strength);
        });
        
        const confirmPasswordInput = document.getElementById('confirm_password');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                const password = document.getElementById('password').value;
                checkPasswordMatch(password, this.value);
            });
        }
    }
}

function checkPasswordStrength(password) {
    if (!password) return 'empty';
    
    let score = 0;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;
    
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (hasLower && hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;
    if (length >= 16) score += 1;
    
    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
}

function updatePasswordStrengthIndicator(password, strength = null) {
    if (!strength) {
        strength = checkPasswordStrength(password);
    }
    
    const barContainer = document.getElementById('passwordStrengthBar');
    const textIndicator = document.getElementById('passwordStrengthText');
    const segments = barContainer?.querySelectorAll('.strength-segment');
    
    if (!segments || !textIndicator) return;
    
    let color, text, filledSegments;
    
    switch(strength) {
        case 'empty':
            color = '#e0e0e0';
            text = '';
            filledSegments = 0;
            break;
        case 'weak':
            color = '#f44336';
            text = 'Kata sandi lemah';
            filledSegments = 1;
            break;
        case 'medium':
            color = '#ff9800';
            text = 'Kata sandi cukup';
            filledSegments = 2;
            break;
        case 'strong':
            color = '#4CAF50';
            text = 'Kata sandi kuat';
            filledSegments = 4;
            break;
    }
    
    segments.forEach((segment, index) => {
        segment.style.backgroundColor = index < filledSegments ? color : '#e0e0e0';
    });
    
    textIndicator.textContent = text;
    textIndicator.style.color = color;
    textIndicator.style.fontWeight = '500';
}

function checkPasswordMatch(password, confirmPassword) {
    const confirmInput = document.getElementById('confirm_password');
    const passwordGroup = confirmInput?.parentNode;
    let matchIndicator = document.getElementById('passwordMatchIndicator');
    
    if (!passwordGroup) return;
    
    if (!matchIndicator) {
        matchIndicator = document.createElement('div');
        matchIndicator.id = 'passwordMatchIndicator';
        matchIndicator.style.fontSize = '0.85rem';
        matchIndicator.style.marginTop = '0.3rem';
        passwordGroup.appendChild(matchIndicator);
    }
    
    if (!password || !confirmPassword) {
        matchIndicator.textContent = '';
        confirmInput.style.borderColor = '';
        return;
    }
    
    if (password === confirmPassword) {
        matchIndicator.textContent = '✓ Kata sandi cocok';
        matchIndicator.style.color = '#4CAF50';
        confirmInput.style.borderColor = '#4CAF50';
    } else {
        matchIndicator.textContent = '✗ Kata sandi tidak cocok';
        matchIndicator.style.color = '#f44336';
        confirmInput.style.borderColor = '#f44336';
    }
}

// FIXED: Sesuaikan dengan HTML & CSS yang ada
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.classList.add('show');
        
        if (successMessage) {
            successMessage.style.display = 'none';
            successMessage.classList.remove('show');
        }
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

// FIXED: Sesuaikan dengan HTML & CSS yang ada
function showSuccess(message) {
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        successMessage.classList.add('show');
        
        if (errorMessage) {
            errorMessage.style.display = 'none';
            errorMessage.classList.remove('show');
        }
    }
}