// ===== DATA TEMPAT =====
const places = [
    {
        name: "Brain Coffee",
        location: "Jl. Wonokromo Tangkis No. 52, Surabaya",
        image: "images/brain c.jpeg",
        description: "Cafe dengan atmosfer hangat dan cozy, cocok untuk nugas dan nongkrong.",
        facilities: ["Indoor & Outdoor", "Photo Spot", "Toilet", "Area Parkir", "Protokol Kesehatan"],
        hours: "07.00 - 22.00 WIB",
        maps: "https://maps.app.goo.gl/mYiVRFHaDHjXrX466",
        fullDescription: "Brain Coffee Surabaya mempunyai ciri khas dengan hal-hal yang sangat menarik. Cafe ini menonjolkan sisi yang begitu menghangatkan dengan atmosfer yang cozy."
    },
    {
        name: "Dee Aksara",
        location: "Jl. Ketintang Sel. No.47, Karah, Kec. Jambangan, Surabaya",
        image: "images/aksara.jpeg",
        description: "Spot produktif dengan WiFi cepat, ideal untuk mengerjakan tugas.",
        facilities: ["WiFi Cepat", "Mushola", "Toilet", "Colokan"],
        hours: "07.00 - 22.00 WIB",
        maps: "https://www.google.com/maps/place/Dee+Aksara/@-7.3172662,112.7212648,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fb7d1fc09b5f:0xb663ce34e52ea245!8m2!3d-7.3172662!4d112.7238397!16s%2Fg%2F11wt__8sjp?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D",
        fullDescription: "Kafe yang menawarkan tempat untuk bekerja atau berkumpul (spot produktif) dengan berbagai menu makanan ringan dan minuman. Cocok untuk mengerjakan tugas kuliah."
    },
    {
        name: "Oi Kafe",
        location: "Jl. Ketintang Madya No.187, Karah, Kec. Jambangan, Surabaya",
        image: "images/oi kafe.jpeg",
        description: "Kafe nyaman dengan fasilitas lengkap untuk belajar dan santai.",
        facilities: ["Toilet", "Mushola", "Indoor AC"],
        hours: "Senin-Jumat: 10.00-22.00 | Sabtu-Minggu: 11.00-23.00 WIB",
        maps: "https://www.google.com/maps/place/oi+kafe",
        fullDescription: "Kafe nyaman untuk nongkrong dan bersantai bersama teman. Menu variatif dengan harga terjangkau untuk mahasiswa."
    },
    {
        name: "Kopi Nuku",
        location: "Jl. Ketintang Baru IV No.14, Ketintang, Kec. Gayungan, Surabaya",
        image: "images/nuku.jpeg",
        description: "Tempat ngopi santai dengan harga ramah mahasiswa.",
        facilities: ["WiFi", "Colokan", "Area Santai"],
        hours: "14.00 - 22.00 WIB",
        maps: "https://www.google.com/maps/place/KOPINUKU",
        fullDescription: "Tempat ngopi santai dengan suasana yang nyaman. Harga ramah di kantong mahasiswa dengan berbagai pilihan kopi lokal."
    },
    {
        name: "AADK",
        location: "Jl. Raya Menganti Karangan No.85, Babatan, Kec. Wiyung, Surabaya",
        image: "images/aadk.jpeg",
        description: "Cafe dua lantai dengan berbagai zona tematik untuk aktivitas produktif.",
        facilities: ["Indoor & Outdoor", "WiFi Cepat", "Colokan di Setiap Sudut", "Toilet", "Musala", "Parkir Luas"],
        hours: "Setiap Hari 07.00 - 02.00",
        maps: "https://www.google.com/maps/place/ADA+APA+DENGAN+KOPI+-+AADK+WIYUNG",
        fullDescription: "Kafe dua lantai dengan berbagai zona tematik seperti Zona Nyaman, Zona Sepoi, Zona Inspirasi, Zona Kreatif, dan Pojok Cerita. Perfect untuk produktivitas!"
    },
    {
        name: "Bagi Kopi Margorejo",
        location: "Jl. Margorejo Indah No.511, Margorejo, Wonocolo, Surabaya",
        image: "images/bagi.jpeg",
        description: "Area outdoor yang nyaman untuk nugas sambil menikmati udara segar.",
        facilities: ["Area Outdoor", "WiFi", "Toilet", "Parkir"],
        hours: "Setiap Hari 09.00 - 02.00",
        maps: "https://www.google.com/maps/place/bagi+kopi+margorejo",
        fullDescription: "Tempat ngopi outdoor yang nyaman dan santai. Cocok untuk yang suka suasana outdoor sambil mengerjakan tugas."
    },
    {
        name: "D'Coffee Cup",
        location: "Jl. Raya Menganti No.748, Lidah Wetan, Kec. Lakarsantri",
        image: "images/d coffe.jpeg",
        description: "Cafe 24 jam, perfect untuk begadang nugas deadline!",
        facilities: ["Indoor AC", "Outdoor", "Mushola", "Toilet", "Colokan", "WiFi Gratis", "Parkir Luas", "24 Jam"],
        hours: "Buka 24 Jam",
        maps: "https://www.google.com/maps/place/D'Coffee+Cup+Wiyung/@-7.308505,112.6707767,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fd000f3ba6fb:0x78b048fb8d20050c!8m2!3d-7.308505!4d112.6733516!16s%2Fg%2F11x2d_l1lk?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D",
        fullDescription: "D'Coffee Cup Wiyung adalah kafe 24 jam yang menawarkan suasana nyaman untuk berbagai kegiatan. Cocok untuk begadang nugas deadline!"
    },
    {
        name: "Djoes Kode Babatan",
        location: "Jl. Raya Menganti No. 13 Babatan, Wiyung, Surabaya",
        image: "images/djoes kode.jpeg",
        description: "Kedai dengan rooftop aesthetic, jus segar dan tempat instagramable.",
        facilities: ["Rooftop Area", "Colokan", "Toilet", "3 Lantai", "Aesthetic"],
        hours: "Senin-Kamis: 07.00-22.00 | Jumat-Minggu: 07.00-23.00 WIB",
        maps: "https://www.google.com/maps/place/Jus+Kode+Surabaya+Wiyung",
        fullDescription: "Kedai jus viral di Surabaya dengan buah asli dan segar. Tempat nyaman dan aesthetic dengan tiga lantai dan rooftop instagramable."
    },
    {
        name: "Batatua",
        location: "Jl. Ketintang Madya No.82, Ketintang, Kec. Gayungan, Surabaya",
        image: "images/bata.jpeg",
        description: "Spot nongkrong dengan board games dan sofa santai.",
        facilities: ["Banyak Sofa & Kursi Santai", "Board Games", "WiFi Gratis", "Colokan", "Mushola"],
        hours: "Setiap Hari 09.00 - 00.00 WIB",
        maps: "https://maps.app.goo.gl/eyoeYKuQAZPEjFwo7",
        fullDescription: "Spot nongkrong enak buat nyore dengan harga mahasiswa banget. Banyak sofa yang bikin nyaman dan ada board games untuk main bareng teman."
    },
    {
        name: "Kammari Ketintang",
        location: "Jl. Ketintang Baru II No. KAV 7 Ketintang, Surabaya",
        image: "images/kammari.jpeg",
        description: "Ruang luas untuk kerja kelompok dan kegiatan kreatif mahasiswa.",
        facilities: ["Sofa & Kursi Santai", "Board Games", "WiFi Gratis", "Colokan", "Area Luas"],
        hours: "Setiap Hari 09.00 - 23.00 WIB",
        maps: "https://www.google.com/maps/place/KAMMARI/@-7.3143105,112.7279143,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fb86f14b5ec5:0x9dcbd855b8270d16!8m2!3d-7.3143105!4d112.7304892!16s%2Fg%2F11x64t0gpw?entry=ttu&g_ep=EgoyMDI5MTAxMi4wIKXMDSoASAFQAw%3D%3D",
        fullDescription: "Tempat nongkrong untuk segala kalangan terutama mahasiswa. Area luas yang menunjang kegiatan produktif baik untuk bekerja, mengerjakan tugas, dan berkegiatan kreatif."
    },
    {
        name: "Kafe Titik Koma",
        location: "Jl. Ketintang Brt. No.13, Karah, Kec. Jambangan, Surabaya",
        image: "images/koma.jpeg",
        description: "Kafe aesthetic dengan suasana tenang, cocok untuk nugas atau sekadar santai.",
        facilities: ["WiFi Cepat", "Colokan", "Indoor AC", "Area Parkir"],
        hours: "09.00 - 23.00 WIB",
        maps: "https://www.google.com/maps/place/Kopi+Titik+Koma+Riverside+Ketintang/@-7.3086944,112.7193638,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fb74f0cf5bf7:0x6442ae1ee87ed8d!8m2!3d-7.3086944!4d112.7219387!16s%2Fg%2F11lkcwbdvw?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D",
        fullDescription: "Kafe Titik Koma mengusung konsep minimalis dan tenang, sangat cocok bagi mahasiswa yang ingin mengerjakan tugas atau menikmati waktu santai dengan teman. Menu kopi dan snack-nya juga ramah di kantong."
    },
    {
        name: "Perpustakaan BI",
        location: "Jl. Taman Mayangkara No.6, Darmo, Kec. Wonokromo, Surabaya",
        image: "images/perpus.jpeg",
        description: "Perpustakaan yang menawarkan suasana belajar yang nyaman dan inspiratif.",
        facilities: ["Wifi", "Ruang komputer", "Ruang Baca", "Musholla", "Toilet"],
        hours: "Senin - Sabtu: 08.00 - 16.30 WIB | Minggu: Tutup",
        maps: "https://www.google.com/maps/place/Perpustakaan+Bank+Indonesia/@-7.2942525,112.7387455,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fbbd83e7a20f:0x5de6a9c354f08d6d!8m2!3d-7.2942525!4d112.7387455!16s%2Fg%2F12lppsyjv?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
        fullDescription: "Perpustakaan Bank Indonesia Surabaya merupakan salah satu perpustakaan umum yang menawarkan suasana belajar yang nyaman dan inspiratif. Interiornya yang tertata rapi serta spot-spot estetik menjadikannya tidak hanya tempat membaca, tetapi juga ruang produktif bagi pengunjung."
    }
];

// ===== ANIMASI JELAJAHI TEMPAT =====
function initializeExploreAnimation() {
    const exploreBtn = document.querySelector('.hero-btn.primary');
    const targetSection = document.getElementById('placesGrid');
    
    if (exploreBtn && targetSection) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll ke section tempat dengan efek khusus
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Tambah efek animasi khusus pada section target
            setTimeout(() => {
                // Reset animasi pada semua cards
                const cards = targetSection.querySelectorAll('.place-card');
                cards.forEach((card, index) => {
                    card.style.animation = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    // Trigger reflow
                    card.offsetHeight;
                    
                    // Terapkan animasi dengan delay bertahap
                    setTimeout(() => {
                        card.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s both`;
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                });
            }, 800); // Delay untuk sinkronisasi dengan scroll
        });
    }
}

// ===== NAVIGASI KE DETAIL TEMPAT =====
function goToPlaceDetail(placeName) {
    // Simpan nama tempat yang dipilih ke localStorage
    localStorage.setItem('selectedPlace', placeName);
    // Redirect ke halaman detail
    window.location.href = 'detail.html';
}

// ===== DARK MODE =====
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector(".dark-mode-toggle");

    body.classList.toggle("dark-mode");

    // Simpan preferensi ke localStorage
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDark);

    // Ubah teks tombol sesuai mode
    if (toggleBtn) {
        toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌗 Dark Mode";
    }
}

// ===== LOAD DARK MODE STATE SAAT AWAL =====
function loadDarkMode() {
    const body = document.body;
    const toggleBtn = document.querySelector(".dark-mode-toggle");

    const savedMode = localStorage.getItem("dark-mode") === "true";
    if (savedMode) {
        body.classList.add("dark-mode");
        if (toggleBtn) {
            toggleBtn.textContent = "☀️ Light Mode";
        }
    } else {
        body.classList.remove("dark-mode");
        if (toggleBtn) {
            toggleBtn.textContent = "🌗 Dark Mode";
        }
    }
}

// ===== USER AUTHENTICATION FUNCTIONS =====

// Fungsi untuk mengecek status login dan update navbar
function checkAuthStatus() {
    const currentUser = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Cari elemen "Tentang Kami" untuk menempatkan login/logout di sebelahnya
    const tentangKamiItem = Array.from(navLinks.children).find(li => 
        li.querySelector('a[href="tentang.html"]')
    );
    
    if (!tentangKamiItem) return;
    
    // Hapus tombol login/logout yang sudah ada
    const existingAuthButton = document.querySelector('.auth-button');
    if (existingAuthButton) {
        existingAuthButton.remove();
    }
    
    // Buat elemen baru
    const authLi = document.createElement('li');
    authLi.className = 'auth-button';
    
    if (currentUser) {
        // User sudah login, tampilkan dropdown dengan nama user dan logout
        authLi.innerHTML = `
            <div class="user-dropdown">
                <button class="user-menu-btn">
                    👤 ${currentUser.nama.split(' ')[0]}
                </button>
                <div class="user-dropdown-content">
                    <span class="user-email">${currentUser.email}</span>
                    <button onclick="logout()" class="logout-btn">Logout</button>
                </div>
            </div>
        `;
    } else {
        // User belum login, tampilkan tombol login
        authLi.innerHTML = `
            <a href="login.html" class="login-link">Login</a>
        `;
    }
    
    // Sisipkan setelah "Tentang Kami"
    tentangKamiItem.parentNode.insertBefore(authLi, tentangKamiItem.nextSibling);
    
    // Setup dropdown behavior
    setupUserDropdown();
}

// Setup dropdown behavior untuk user menu
function setupUserDropdown() {
    const userMenuBtn = document.querySelector('.user-menu-btn');
    const dropdownContent = document.querySelector('.user-dropdown-content');
    
    if (userMenuBtn && dropdownContent) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });
        
        // Tutup dropdown ketika klik di luar
        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }
}

// Fungsi untuk logout
function logout() {
    localStorage.removeItem('workspot_current_user');
    window.location.href = 'login.html';
}

// Fungsi untuk mengecek apakah user sudah login
function isLoggedIn() {
    return localStorage.getItem('workspot_current_user') !== null;
}

// Fungsi untuk mendapatkan data user yang login
function getCurrentUser() {
    const userData = localStorage.getItem('workspot_current_user');
    return userData ? JSON.parse(userData) : null;
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const placesGrid = document.getElementById('placesGrid');
    const detailsGrid = document.getElementById('detailsGrid');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                if (placesGrid) renderPlaces();
                if (detailsGrid) renderDetails();
                if (searchResultsInfo) {
                    searchResultsInfo.textContent = '';
                }
                return;
            }
            
            const filteredPlaces = places.filter(place => 
                place.name.toLowerCase().includes(searchTerm) ||
                place.location.toLowerCase().includes(searchTerm) ||
                place.description.toLowerCase().includes(searchTerm) ||
                place.fullDescription.toLowerCase().includes(searchTerm) ||
                place.facilities.some(facility => 
                    facility.toLowerCase().includes(searchTerm)
                )
            );
            
            if (placesGrid) renderFilteredPlaces(filteredPlaces);
            if (detailsGrid) renderFilteredDetails(filteredPlaces);
            
            if (searchResultsInfo) {
                if (filteredPlaces.length === 0) {
                    searchResultsInfo.innerHTML = `<span style="color: var(--accent);">😔 Tidak ditemukan tempat yang cocok dengan "${searchTerm}"</span>`;
                } else {
                    searchResultsInfo.textContent = `Ditemukan ${filteredPlaces.length} tempat yang cocok dengan "${searchTerm}"`;
                }
            }
        });
    }
}

function renderFilteredPlaces(filteredPlaces) {
    const grid = document.getElementById('placesGrid');
    if (grid) {
        if (filteredPlaces.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <span class="icon">☕</span>
                    <p>Tidak ada tempat yang cocok dengan pencarian Anda</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem;">Coba gunakan kata kunci yang berbeda</p>
                </div>
            `;
        } else {
            grid.innerHTML = filteredPlaces.map(place => `
                <div class="place-card">
                    <div class="place-image">
                        <img src="${place.image}" alt="${place.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2I1YjRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kTmFtZTwvdGV4dD48L3N2Zz4='">
                    </div>
                    <div class="place-content">
                        <h3>${place.name}</h3>
                        <p>📍 ${place.location}</p>
                        <p>${place.description}</p>
                        <button onclick="goToPlaceDetail('${place.name}')" class="place-btn">Informasi Selengkapnya →</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function renderFilteredDetails(filteredPlaces) {
    const grid = document.getElementById('detailsGrid');
    if (grid) {
        if (filteredPlaces.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <span class="icon">☕</span>
                    <p>Tidak ada tempat yang cocok dengan pencarian Anda</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem;">Coba gunakan kata kunci yang berbeda</p>
                </div>
            `;
        } else {
            grid.innerHTML = filteredPlaces.map((place, index) => `
                <div class="detail-card" style="animation-delay: ${index * 0.1}s">
                    <div class="detail-content">
                        <div class="detail-image">
                            <img src="${place.image}" alt="${place.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2I1YjRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kTmFtZTwvdGV4dD48L3N2Zz4='">
                        </div>
                        <div class="detail-info">
                            <h2>${place.name}</h2>
                            <p>${place.fullDescription}</p>
                            
                            <div class="info-item">
                                <strong>📍 Lokasi:</strong>
                                <span>${place.location}</span>
                            </div>
                            
                            <div class="info-item">
                                <strong>⏰ Jam Buka:</strong>
                                <span class="hours-badge">${place.hours}</span>
                            </div>
                            
                            <div class="info-item">
                                <strong>✨ Fasilitas:</strong>
                                <div class="facilities">
                                    ${place.facilities.map(f => `<span class="facility-tag">${f}</span>`).join('')}
                                </div>
                            </div>
                            
                            ${place.maps ? `<a href="${place.maps}" target="_blank" class="map-button">📍 Buka di Google Maps</a>` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// ===== BERANDA - REKOMENDASI ACAK =====
function showRandomRecommendation() {
    const randomIndex = Math.floor(Math.random() * places.length);
    const place = places[randomIndex];
    
    const card = document.getElementById('recommendationCard');
    if (card) {
        card.innerHTML = `
            <div class="place-image">
                <img src="${place.image}" alt="${place.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2I1YjRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kTmFtZTwvdGV4dD48L3N2Zz4='">
            </div>
            <div class="recommendation-info">
                <h3>${place.name}</h3>
                <p>📍 ${place.location}</p>
                <p>${place.description}</p>
                <button onclick="goToPlaceDetail('${place.name}')" class="place-btn">Lihat Detail Lengkap</button>
            </div>
        `;
    }
}

// ===== BERANDA - RENDER DAFTAR TEMPAT =====
function renderPlaces() {
    const grid = document.getElementById('placesGrid');
    if (grid) {
        grid.innerHTML = places.map(place => `
            <div class="place-card">
                <div class="place-image">
                    <img src="${place.image}" alt="${place.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2I1YjRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kTmFtZTwvdGV4dD48L3N2Zz4='">
                </div>
                <div class="place-content">
                    <h3>${place.name}</h3>
                    <p>📍 ${place.location}</p>
                    <p>${place.description}</p>
                    <button onclick="goToPlaceDetail('${place.name}')" class="place-btn">Informasi Selengkapnya →</button>
                </div>
            </div>
        `).join('');
    }
}

// ===== DETAIL - RENDER DETAIL CARDS =====
function renderDetails() {
    const grid = document.getElementById('detailsGrid');
    if (grid) {
        // Cek apakah ada tempat yang dipilih dari beranda
        const selectedPlaceName = localStorage.getItem('selectedPlace');
        
        if (selectedPlaceName) {
            // Tampilkan hanya tempat yang dipilih
            const selectedPlace = places.find(place => place.name === selectedPlaceName);
            if (selectedPlace) {
                grid.innerHTML = `
                    <div class="detail-card">
                        <div class="detail-content">
                            <div class="detail-image">
                                <img src="${selectedPlace.image}" alt="${selectedPlace.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2I1YjRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kTmFtZTwvdGV4dD48L3N2Zz4='">
                            </div>
                            <div class="detail-info">
                                <h2>${selectedPlace.name}</h2>
                                <p>${selectedPlace.fullDescription}</p>
                                
                                <div class="info-item">
                                    <strong>📍 Lokasi:</strong>
                                    <span>${selectedPlace.location}</span>
                                </div>
                                
                                <div class="info-item">
                                    <strong>⏰ Jam Buka:</strong>
                                    <span class="hours-badge">${selectedPlace.hours}</span>
                                </div>
                                
                                <div class="info-item">
                                    <strong>✨ Fasilitas:</strong>
                                    <div class="facilities">
                                        ${selectedPlace.facilities.map(f => `<span class="facility-tag">${f}</span>`).join('')}
                                    </div>
                                </div>
                                
                                ${selectedPlace.maps ? `<a href="${selectedPlace.maps}" target="_blank" class="map-button">Buka di Google Maps</a>` : ''}
                            </div>
                        </div>
                    </div>
                `;
                
                // Hapus data yang dipilih setelah ditampilkan
                localStorage.removeItem('selectedPlace');
                return;
            }
        }
        
        // Jika tidak ada tempat yang dipilih, tampilkan semua tempat
        grid.innerHTML = places.map((place, index) => `
            <div class="detail-card" style="animation-delay: ${index * 0.1}s">
                <div class="detail-content">
                    <div class="detail-image">
                        <img src="${place.image}" alt="${place.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2I1YjRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4kTmFtZTwvdGV4dD48L3N2Zz4='">
                    </div>
                    <div class="detail-info">
                        <h2>${place.name}</h2>
                        <p>${place.fullDescription}</p>
                        
                        <div class="info-item">
                            <strong>📍 Lokasi:</strong>
                            <span>${place.location}</span>
                        </div>
                        
                        <div class="info-item">
                            <strong>⏰ Jam Buka:</strong>
                            <span class="hours-badge">${place.hours}</span>
                        </div>
                        
                        <div class="info-item">
                            <strong>✨ Fasilitas:</strong>
                            <div class="facilities">
                                ${place.facilities.map(f => `<span class="facility-tag">${f}</span>`).join('')}
                            </div>
                        </div>
                        
                        ${place.maps ? `<a href="${place.maps}" target="_blank" class="map-button">Buka di Google Maps</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ===== FORM SARAN - VALIDASI =====
function validateForm() {
    const namaTempat = document.getElementById('namaTempat').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();
    const kategori = document.getElementById('kategori').value;
    const fasilitas = document.getElementById('fasilitas').value.trim();
    const jamBuka = document.getElementById('jamBuka').value.trim();
    const deskripsi = document.getElementById('deskripsi').value.trim();
    const kontak = document.getElementById('kontak').value.trim();
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    
    // Reset success message
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('show');
    }
    
    // Validate nama tempat
    if (namaTempat === '') {
        document.getElementById('errorNama').textContent = 'Nama tempat wajib diisi';
        document.getElementById('errorNama').classList.add('show');
        isValid = false;
    } else if (namaTempat.length < 2) {
        document.getElementById('errorNama').textContent = 'Nama tempat minimal 2 karakter';
        document.getElementById('errorNama').classList.add('show');
        isValid = false;
    }
    
    // Validate lokasi
    if (lokasi === '') {
        document.getElementById('errorLokasi').textContent = 'Lokasi wajib diisi';
        document.getElementById('errorLokasi').classList.add('show');
        isValid = false;
    } else if (lokasi.length < 5) {
        document.getElementById('errorLokasi').textContent = 'Lokasi minimal 5 karakter';
        document.getElementById('errorLokasi').classList.add('show');
        isValid = false;
    }
    
    // Validate kategori
    if (kategori === '') {
        document.getElementById('errorKategori').textContent = 'Kategori wajib dipilih';
        document.getElementById('errorKategori').classList.add('show');
        isValid = false;
    }
    
    // Validate deskripsi
    if (deskripsi === '') {
        document.getElementById('errorDeskripsi').textContent = 'Deskripsi tempat wajib diisi';
        document.getElementById('errorDeskripsi').classList.add('show');
        isValid = false;
    } else if (deskripsi.length < 20) {
        document.getElementById('errorDeskripsi').textContent = 'Deskripsi minimal 20 karakter';
        document.getElementById('errorDeskripsi').classList.add('show');
        isValid = false;
    }
    
    // Validate kontak (optional but if filled, validate format)
    if (kontak !== '') {
        // Basic validation for social media handles
        if (!kontak.includes('@') && !kontak.includes('.com') && !kontak.includes('.id') && !kontak.includes('http')) {
            // Create contact error element if doesn't exist
            let contactError = document.getElementById('errorKontak');
            if (!contactError) {
                const contactGroup = document.querySelector('input[name="kontak"]').parentNode;
                contactError = document.createElement('div');
                contactError.className = 'error-message';
                contactError.id = 'errorKontak';
                contactGroup.appendChild(contactError);
            }
            contactError.textContent = 'Format kontak/media sosial tidak valid. Contoh: @username atau link website';
            contactError.classList.add('show');
            isValid = false;
        }
    }
    
    return isValid;
}

// ===== FORM SARAN - SUBMIT HANDLER =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call/processing
        setTimeout(() => {
            // Show success message
            const successMessage = document.getElementById('successMessage');
            const namaTempat = document.getElementById('namaTempat').value;
            
            successMessage.innerHTML = `
                <div class="success-content">
                    <span class="icon">✅</span>
                    <h3>Terima Kasih!</h3>
                    <p>Saran tempat "<strong>${namaTempat}</strong>" berhasil dikirim.</p>
                </div>
            `;
            successMessage.classList.add('show');
            
            // Reset form
            document.getElementById('saranForm').reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 6 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 6000);
            
        }, 1500); // Simulate 1.5 second delay
    } else {
        // Show first error message
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// ===== REAL-TIME VALIDATION =====
function initializeRealTimeValidation() {
    const form = document.getElementById('saranForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear error when user starts typing
        input.addEventListener('input', function() {
            const errorId = this.id === 'namaTempat' ? 'errorNama' :
                          this.id === 'lokasi' ? 'errorLokasi' :
                          this.id === 'kategori' ? 'errorKategori' :
                          this.id === 'deskripsi' ? 'errorDeskripsi' :
                          this.id === 'kontak' ? 'errorKontak' : null;
            
            if (errorId) {
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let errorElement;
    
    switch(field.id) {
        case 'namaTempat':
            errorElement = document.getElementById('errorNama');
            if (value === '') {
                errorElement.textContent = 'Nama tempat wajib diisi';
                errorElement.classList.add('show');
            } else if (value.length < 2) {
                errorElement.textContent = 'Nama tempat minimal 2 karakter';
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
            break;
            
        case 'lokasi':
            errorElement = document.getElementById('errorLokasi');
            if (value === '') {
                errorElement.textContent = 'Lokasi wajib diisi';
                errorElement.classList.add('show');
            } else if (value.length < 5) {
                errorElement.textContent = 'Lokasi minimal 5 karakter';
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
            break;
            
        case 'kategori':
            errorElement = document.getElementById('errorKategori');
            if (value === '') {
                errorElement.textContent = 'Kategori wajib dipilih';
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
            break;
            
        case 'deskripsi':
            errorElement = document.getElementById('errorDeskripsi');
            if (value === '') {
                errorElement.textContent = 'Deskripsi tempat wajib diisi';
                errorElement.classList.add('show');
            } else if (value.length < 20) {
                errorElement.textContent = 'Deskripsi minimal 20 karakter';
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
            break;
            
        case 'kontak':
            if (value !== '' && !value.includes('@') && !value.includes('.com') && !value.includes('.id') && !value.includes('http')) {
                let contactError = document.getElementById('errorKontak');
                if (!contactError) {
                    const contactGroup = field.parentNode;
                    contactError = document.createElement('div');
                    contactError.className = 'error-message';
                    contactError.id = 'errorKontak';
                    contactGroup.appendChild(contactError);
                }
                contactError.textContent = 'Format kontak/media sosial tidak valid. Contoh: @username atau link website';
                contactError.classList.add('show');
            } else {
                const contactError = document.getElementById('errorKontak');
                if (contactError) {
                    contactError.classList.remove('show');
                }
            }
            break;
    }
}

// ===== ANIMASI SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe semua cards
    document.querySelectorAll('.place-card, .detail-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// ===== INISIALISASI =====
document.addEventListener('DOMContentLoaded', function() {
    loadDarkMode();
    showRandomRecommendation();
    renderPlaces();
    renderDetails();
    initializeSearch();
    initializeRealTimeValidation();
    initializeScrollAnimations();
    initializeExploreAnimation();
    
    // Check auth status untuk update navbar
    checkAuthStatus();
    
    const form = document.getElementById('saranForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

// Tambahkan/replace fungsi checkAuthStatus di web.js dengan versi ini

// ===== AUTH CHECK & USER MENU (BACKEND VERSION) =====
// GANTI fungsi checkAuthStatus() dan setupUserDropdown() yang lama dengan ini:

// Di web.js, ganti fungsi checkAuthStatus() dengan ini:
async function checkAuthStatus() {
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    const tentangKamiItem = Array.from(navLinks.children).find(li => 
        li.querySelector('a[href="tentang.html"]')
    );
    
    if (!tentangKamiItem) return;
    
    const existingAuthButton = document.querySelector('.auth-button');
    if (existingAuthButton) {
        existingAuthButton.remove();
    }
    
    try {
        // FIX: Gunakan FormData
        const formData = new FormData();
        formData.append('action', 'check_auth');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        const authLi = document.createElement('li');
        authLi.className = 'auth-button';
        
        if (data.success) {
            const userData = data.data;
            localStorage.setItem('workspot_current_user', JSON.stringify(userData));
            
            authLi.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-menu-btn">
                        👤 ${userData.nama.split(' ')[0]}
                    </button>
                    <div class="user-dropdown-content">
                        <span class="user-email">${userData.email}</span>
                        <a href="dashboard.html" class="dropdown-link">
                            📊 Dashboard Saya
                        </a>
                        <button onclick="handleLogout()" class="logout-btn">
                            🚪 Logout
                        </button>
                    </div>
                </div>
            `;
        } else {
            authLi.innerHTML = `
                <a href="login.html" class="login-link">🔐 Login</a>
            `;
        }
        
        tentangKamiItem.parentNode.insertBefore(authLi, tentangKamiItem.nextSibling);
        
        if (data.success) {
            setupUserDropdown();
        }
        
    } catch (error) {
        console.error('Error checking auth:', error);
        
        const authLi = document.createElement('li');
        authLi.className = 'auth-button';
        authLi.innerHTML = `
            <a href="login.html" class="login-link">🔐 Login</a>
        `;
        tentangKamiItem.parentNode.insertBefore(authLi, tentangKamiItem.nextSibling);
    }
}

// Tambahkan fungsi handleLogout baru
async function handleLogout() {
    if (!confirm('Yakin ingin logout?')) {
        return;
    }
    
    try {
        const formData = new FormData();
        formData.append('action', 'logout');
        
        const response = await fetch('backend/auth.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.removeItem('workspot_current_user');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert('Gagal logout. Silakan coba lagi.');
    }
}