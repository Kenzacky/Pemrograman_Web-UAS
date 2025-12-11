// beranda-dynamic.js - Load tempat dari database
let allPlaces = [];

document.addEventListener('DOMContentLoaded', function() {
    loadPlaces();
    setupSearch();
});

function loadPlaces() {
    const container = document.getElementById('placesGrid');
    
    fetch('backend/get_places.php')
        .then(response => response.json())
        .then(result => {
            console.log('Backend response:', result);
            
            if (result.success && result.data && result.data.length > 0) {
                allPlaces = result.data;
                displayPlaces(result.data);
                displayRecommendation(result.data);
            } else {
                container.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📋</div>
                        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Belum Ada Tempat</h3>
                        <p style="color: var(--text-secondary);">Belum ada tempat yang ditambahkan. <a href="saran.html" style="color: var(--accent);">Berikan saran!</a></p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Terjadi Kesalahan</h3>
                    <p style="color: var(--text-secondary);">Gagal memuat data. Pastikan XAMPP sudah berjalan dan file backend ada.</p>
                </div>
            `;
        });
}

function displayPlaces(places) {
    const container = document.getElementById('placesGrid');
    container.innerHTML = '';
    
    if (places.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="color: var(--text-primary);">Tidak Ada Hasil</h3>
                <p style="color: var(--text-secondary);">Coba kata kunci lain</p>
            </div>
        `;
        return;
    }
    
    places.forEach(place => {
        const card = createPlaceCard(place);
        container.appendChild(card);
    });
}

/**
 * Fungsi createPlaceCard yang dimodifikasi agar sesuai dengan tampilan screenshot.
 * Menghilangkan jam operasional dan fasilitas, menambahkan deskripsi.
 */
function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    
    // Image HTML - FIXED dengan gradient warm
    let imageHTML = '';
    if (place.gambar && place.gambar !== '' && place.gambar !== null) {
        // Asumsi place.gambar berisi nama file, seperti "dcoffeecup.jpg"
        imageHTML = `<img src="images/${place.gambar}" alt="${place.nama}">`;
    } else {
        imageHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: linear-gradient(135deg, #FFF8E7 0%, #F5E6D3 100%);">
                <span style="font-size: 3rem; opacity: 0.4;">☕</span>
                <p style="margin-top: 0.5rem; color: #8B7355; font-size: 0.85rem; font-weight: 500;">Belum ada foto</p>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="place-image">
            ${imageHTML}
        </div>
        <div class="place-info">
            <h3>${place.nama}</h3>
            <p class="place-location-text">📍 ${place.lokasi}</p> 
            <p class="place-description">${place.deskripsi || 'Tempat yang nyaman untuk bekerja dan belajar.'}</p> 
            
            <a href="detail.html?id=${place.id}" class="detail-btn">Informasi Selengkapnya →</a>
        </div>
    `;
    
    return card;
}

/**
 * Fungsi displayRecommendation yang dimodifikasi untuk menghilangkan jam dan fasilitas.
 */
function displayRecommendation(places) {
    if (places.length === 0) return;
    
    const recommendationCard = document.getElementById('recommendationCard');
    const randomPlace = places[Math.floor(Math.random() * places.length)];
    
    // Image HTML
    let imageHTML = '';
    if (randomPlace.gambar && randomPlace.gambar !== '' && randomPlace.gambar !== null) {
        imageHTML = `<img src="images/${randomPlace.gambar}" alt="${randomPlace.nama}">`;
    } else {
        imageHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: linear-gradient(135deg, #FFF8E7 0%, #F5E6D3 100%);">
                <span style="font-size: 4rem; opacity: 0.4;">☕</span>
                <p style="margin-top: 0.75rem; color: #8B7355; font-size: 1rem; font-weight: 500;">Belum ada foto</p>
            </div>
        `;
    }
    
    recommendationCard.innerHTML = `
        <div class="recommendation-image">
            ${imageHTML}
        </div>
        <div class="recommendation-info">
            <h3>${randomPlace.nama}</h3>
            <p class="recommendation-location">📍 ${randomPlace.lokasi}</p>
            <p class="recommendation-description">${randomPlace.deskripsi || randomPlace.deskripsi_lengkap || 'Tempat yang nyaman untuk bekerja dan belajar.'}</p>
            <a href="detail.html?id=${randomPlace.id}" class="detail-btn">Informasi Selengkapnya →</a>
        </div>
    `;
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query === '') {
                displayPlaces(allPlaces);
                searchResultsInfo.textContent = '';
                return;
            }
            
            const filtered = allPlaces.filter(place => 
                place.nama.toLowerCase().includes(query) ||
                place.lokasi.toLowerCase().includes(query) ||
                place.kategori.toLowerCase().includes(query) ||
                (place.deskripsi && place.deskripsi.toLowerCase().includes(query)) ||
                // Cek fasilitas, pastikan fasilitas berupa array atau string yang bisa di-split
                (place.fasilitas && (Array.isArray(place.fasilitas) ? place.fasilitas.some(f => f.toLowerCase().includes(query)) : place.fasilitas.toLowerCase().includes(query)))
            );
            
            displayPlaces(filtered);
            searchResultsInfo.textContent = filtered.length > 0 
                ? `Ditemukan ${filtered.length} tempat` 
                : `Tidak ada hasil`;
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.focus();
    }
}