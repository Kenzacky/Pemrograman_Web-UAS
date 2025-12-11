

# 🌟 **WorkSpot UNESA — Website Rekomendasi Tempat Nugas Mahasiswa**


💻 **Project UAS Pemrograman Web**
📍 Universitas Negeri Surabaya (UNESA)
✨ Dibangun dengan HTML, CSS, JavaScript, PHP, dan MySQL

---

## 🚀 **Deskripsi Singkat**

**WorkSpot UNESA** adalah website yang membantu mahasiswa menemukan tempat terbaik untuk mengerjakan tugas, belajar, atau berdiskusi—mulai dari kafe, coworking space, perpustakaan, hingga spot-spot kampus.

Website ini merupakan pengembangan dari project UTS yang awalnya hanya berbasis HTML–CSS–JS.
Pada project UAS ini, sistem dikembangkan menjadi lebih lengkap dengan:

* 🗃 **Database MySQL**
* 🔐 **Login & Logout**
* 🛠 **Dashboard User, Admin, & Super Admin**
* 🔎 **Pencarian + Filter Tempat**
* 📬 **Saran Tempat oleh User**
* 📌 **CRUD Data Tempat**
* 🎨 **UI responsif dan dark mode**

Website dirancang agar **ringan, cepat, dan mudah digunakan**, sesuai dengan kebutuhan mahasiswa UNESA.

---

## ⭐ **Fitur Utama**

### 🔐 **1. Sistem Login & Manajemen Role**

Website memiliki tiga jenis pengguna dengan fitur berbeda:

#### 👤 **User**

* Melihat daftar tempat nugas
* Menggunakan pencarian & filter
* Melihat detail tempat
* Mengirim saran tempat

#### 🛠 **Admin**

* CRUD data tempat
* Review & kelola saran user
* Kelola kategori/fasilitas

#### 🛡 **Super Admin**

* Semua fitur Admin
* Tambah/Hapus Admin
* Kelola seluruh user dan role

---

### 🔍 **2. Fitur Pencarian & Filter**

User dapat mencari tempat berdasarkan:

* Nama tempat
* Lokasi
* Kategori
* Fasilitas
* Jam operasional

Filter dapat digabungkan dengan pencarian untuk hasil yang lebih akurat.

---

### 🏡 **3. Halaman User**

* Beranda menampilkan semua tempat
* Detail lengkap (foto, fasilitas, jam buka, link Maps)
* Rekomendasi tempat acak
* Formulir saran tempat

---

### 🛠 **4. Dashboard Admin**

Fitur lengkap untuk pengelolaan data:

* Tambah tempat
* Edit tempat
* Hapus tempat
* Validasi dan review saran

---

### 🛡 **5. Dashboard Super Admin**

Kendali penuh:

* Buat admin baru
* Kelola role & izin akses
* Monitoring aktivitas sistem

---

### 🗄 **6. Integrasi Database**

Database menyimpan:

* Data user & admin
* Data super admin
* Data tempat
* Data saran pengguna
* Data kategori & fasilitas

Backend berjalan menggunakan **PHP Native + MySQL**.

---

## 🧱 **Teknologi yang Digunakan**

| Bagian          | Teknologi             |
| --------------- | --------------------- |
| Frontend        | HTML, CSS, JavaScript |
| Backend         | PHP Native            |
| Database        | MySQL / MariaDB       |
| Server          | XAMPP                 |
| Version Control | GitHub                |

---

## 👥 **Pembagian Tugas**

### 🎨 **Syawailie Syaf Anhar — 24091397053**

**Frontend Developer**

* Mendesain tampilan halaman User dan Dashboard
* Mengatur UI/UX website
* Implementasi fitur pencarian dan filter
* Menangani responsivitas & dark/light mode

---

### 🛠 **Ken Izmie Mumtazzacky — 24091397060**

**Backend Developer**

* Membuat database MySQL
* Menyusun backend PHP
* Sistem login/logout (session)
* CRUD tempat & saran
* Dashboard Admin & Super Admin
* Keamanan input & validasi backend

---

### 📝 **Angely Intan Marcella — 24091397047**

**Full-stack Support & Dokumentasi**

* Membantu frontend & backend
* Menyusun dokumentasi & laporan proyek
* Membuat struktur database awal
* Menyusun README GitHub
* Testing fitur & debugging

---

## 🚀 **Cara Menjalankan Project**

1. Install **XAMPP**
2. Pindahkan folder ke:

   ```
   C:\xampp\htdocs\WorkSpot-UNESA
   ```
3. Import `database.sql` ke phpMyAdmin
4. Jalankan Apache & MySQL
5. Buka di browser:

   ```
   http://localhost/WorkSpot-UNESA
   ```

---

## 📜 **Lisensi**

Project ini dibuat untuk memenuhi **UAS Pemrograman Web UNESA** dan dapat digunakan sebagai referensi pembelajaran.

---
