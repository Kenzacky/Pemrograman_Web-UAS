// detail-dynamic.js - Load detail tempat dari database

let allPlaces = [];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');
    
    if (placeId) {
        // Jika ada ID di URL, load detail spesifik tempat
        loadPlaceDetail(placeId);
    } else {
        // Jika tidak ada ID, load semua tempat
        loadAllPlaces();
    }
    
    setupSearch();
});

// Load detail spesifik satu tempat berdasarkan ID
function loadPlaceDetail(id) {
    const container = document.getElementById('detailsGrid');
    
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <div style="display: inline-block; width: 50px; height: 50px; border: 4px solid var(--accent); border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Memuat detail...</p>
        </div>
    `;
    
    fetch(`backend/get_place_detail.php?id=${id}`)
        .then(response => response.json())
        .then(result => {
            console.log('Detail response:', result);
            
            if (result.success && result.data) {
                displaySinglePlace(result.data);
            } else {
                container.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">😕</div>
                        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Tempat Tidak Ditemukan</h3>
                        <p style="color: var(--text-secondary);">Tempat yang Anda cari tidak tersedia.</p>
                        <a href="beranda.html" style="display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--accent); color: white; text-decoration: none; border-radius: 8px;">← Kembali ke Beranda</a>
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
                    <p style="color: var(--text-secondary);">Gagal memuat detail tempat.</p>
                    <a href="beranda.html" style="display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--accent); color: white; text-decoration: none; border-radius: 8px;">← Kembali ke Beranda</a>
                </div>
            `;
        });
}

// Load semua tempat untuk halaman detail
function loadAllPlaces() {
    const container = document.getElementById('detailsGrid');
    
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <div style="display: inline-block; width: 50px; height: 50px; border: 4px solid var(--accent); border-radius: 50%; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Memuat data...</p>
        </div>
    `;
    
    fetch('backend/get_places.php')
        .then(response => response.json())
        .then(result => {
            console.log('All places response:', result);
            
            if (result.success && result.data && result.data.length > 0) {
                allPlaces = result.data;
                displayAllPlaces(result.data);
            } else {
                container.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📋</div>
                        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Belum Ada Tempat</h3>
                        <p style="color: var(--text-secondary);">Belum ada tempat yang ditambahkan.</p>
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
                    <p style="color: var(--text-secondary);">Gagal memuat data.</p>
                </div>
            `;
        });
}

// Display single place detail
function displaySinglePlace(place) {
    const container = document.getElementById('detailsGrid');
    const card = createDetailCard(place);
    container.innerHTML = '';
    container.appendChild(card);
}

// Display all places
function displayAllPlaces(places) {
    const container = document.getElementById('detailsGrid');
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
    
    places.forEach((place, index) => {
        const card = createDetailCard(place, index);
        container.appendChild(card);
    });
}

// Create detail card element
function createDetailCard(place, index = 0) {
    const card = document.createElement('div');
    card.className = 'detail-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Image HTML
    let imageHTML = '';
    if (place.gambar && place.gambar !== '' && place.gambar !== null) {
        imageHTML = `<img src="images/${place.gambar}" alt="${place.nama}" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;background:linear-gradient(135deg,#FFF8E7 0%,#F5E6D3 100%);\\\'><span style=\\'font-size:4rem;opacity:0.4;\\'>☕</span><p style=\\'margin-top:0.75rem;color:#8B7355;font-size:1rem;font-weight:500;\\'>Belum ada foto</p></div>';">`;
    } else {
        imageHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; background: linear-gradient(135deg, #FFF8E7 0%, #F5E6D3 100%);">
                <span style="font-size: 4rem; opacity: 0.4;">☕</span>
                <p style="margin-top: 0.75rem; color: #8B7355; font-size: 1rem; font-weight: 500;">Belum ada foto</p>
            </div>
        `;
    }
    
    // Fasilitas HTML
    let fasilitasHTML = '';
    if (place.fasilitas && place.fasilitas.length > 0) {
        const fasilitasArray = Array.isArray(place.fasilitas) ? place.fasilitas : place.fasilitas.split(',');
        fasilitasHTML = fasilitasArray.map(f => 
            `<span class="facility-tag">${f.trim()}</span>`
        ).join('');
    }
    
    // Maps link HTML
    let mapsHTML = '';
    if (place.maps_link) {
        mapsHTML = `<a href="${place.maps_link}" target="_blank" class="map-button">🗺️ Buka di Google Maps</a>`;
    }
    
    card.innerHTML = `
        <div class="detail-content">
            <div class="detail-image">
                ${imageHTML}
            </div>
            <div class="detail-info">
                <h2>${place.nama}</h2>
                <p class="detail-description">${place.deskripsi_lengkap || place.deskripsi || 'Tempat yang nyaman untuk bekerja dan belajar.'}</p>
                
                <div class="info-item">
                    <strong>📍 Lokasi:</strong>
                    <span>${place.lokasi}</span>
                </div>
                
                <div class="info-item">
                    <strong>🏷️ Kategori:</strong>
                    <span class="category-badge">${place.kategori}</span>
                </div>
                
                <div class="info-item">
                    <strong>⏰ Jam Operasional:</strong>
                    <span class="hours-badge">${place.jam_operasional}</span>
                </div>
                
                ${fasilitasHTML ? `
                <div class="info-item">
                    <strong>✨ Fasilitas:</strong>
                    <div class="facilities">
                        ${fasilitasHTML}
                    </div>
                </div>
                ` : ''}
                
                ${mapsHTML}
            </div>
        </div>
    `;
    
    return card;
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query === '') {
                displayAllPlaces(allPlaces);
                searchResultsInfo.textContent = '';
                return;
            }
            
            const filtered = allPlaces.filter(place => 
                place.nama.toLowerCase().includes(query) ||
                place.lokasi.toLowerCase().includes(query) ||
                place.kategori.toLowerCase().includes(query) ||
                (place.deskripsi && place.deskripsi.toLowerCase().includes(query)) ||
                (place.deskripsi_lengkap && place.deskripsi_lengkap.toLowerCase().includes(query)) ||
                (place.fasilitas && (
                    Array.isArray(place.fasilitas) 
                        ? place.fasilitas.some(f => f.toLowerCase().includes(query))
                        : place.fasilitas.toLowerCase().includes(query)
                ))
            );
            
            displayAllPlaces(filtered);
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