-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2025 at 12:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workspot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `role` enum('admin','superadmin') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `nama_lengkap`, `email`, `created_at`, `last_login`, `status`, `role`) VALUES
(2, 'superadmin', '$2y$10$R5MjIBfEMX.w13CDIP3yTuNVoHZmII3cmgIXcptuUT9S0eJ9ZLP6m', 'Super Administrator', 'superadmin@workspot.unesa.ac.id', '2025-12-08 05:18:03', '2025-12-09 11:13:08', 'active', 'superadmin'),
(3, 'admin', '$2y$10$jUMjuPyoTKfCnd7D65zJV.wa25v3C4ucw4L9Ld8Ti15gBCTvge/uC', 'Administrator', 'admin@workspot.unesa.ac.id', '2025-12-08 09:34:54', '2025-12-09 11:12:34', 'active', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama_kategori`, `created_at`) VALUES
(1, 'Kafe', '2025-11-30 13:04:21'),
(2, 'Co-working Space', '2025-11-30 13:04:21'),
(3, 'Perpustakaan', '2025-11-30 13:04:21'),
(4, 'Restoran', '2025-11-30 13:04:21'),
(5, 'Tempat Nongkrong', '2025-11-30 13:04:21');

-- --------------------------------------------------------

--
-- Table structure for table `saran`
--

CREATE TABLE `saran` (
  `id` int(11) NOT NULL,
  `nama_tempat` varchar(255) NOT NULL,
  `lokasi` text NOT NULL,
  `kategori` varchar(100) NOT NULL,
  `fasilitas` text DEFAULT NULL,
  `jam_operasional` varchar(255) DEFAULT NULL,
  `deskripsi` text NOT NULL,
  `kontak` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `maps_link` varchar(500) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `status` enum('pending','reviewed','approved') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saran`
--

INSERT INTO `saran` (`id`, `nama_tempat`, `lokasi`, `kategori`, `fasilitas`, `jam_operasional`, `deskripsi`, `kontak`, `user_id`, `maps_link`, `gambar`, `status`, `created_at`) VALUES
(2, 'test cafe', 'Jl. Ketintang Barat. No.1, Karah, Kec. Jambangan, Surabaya', 'kafe', 'WiFi, AC, Colokan', '08.00 - 22.00', 'coba dulu ajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '@renekopi', NULL, 'https://www.google.com/maps/search/cafe+surabaya/@-7.3189468,112.6124742,11z?entry=ttu&amp;g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', 'workspot_692c4787c020f2.96296879_1764509575.jpg', 'approved', '2025-11-30 13:32:55'),
(4, 'jokopi', 'jalan hayam wuruk', 'co-working', 'wifi', '20.00-03.00', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssss', '@jokopi.oficial', NULL, 'https://www.google.com/maps/search/cafe+surabaya/@-7.3189468,112.6124742,11z?entry=ttu&amp;g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', 'workspot_692d067315bdd8.20443118_1764558451.jpg', 'approved', '2025-12-01 03:07:31'),
(5, 'jokopi', 'jalan hayam wuruk', 'kafe', 'wifi', '20.00-03.00', 'Cafe dengan atmosfer hangat dan cozy, cocok untuk nugas dan nongkrong.', '@jokopi.oficial', NULL, 'https://www.google.com/maps/search/cafe+surabaya/@-7.3189468,112.6124742,11z?entry=ttu&amp;g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', 'workspot_692d081a7639a5.76832282_1764558874.jpeg', 'approved', '2025-12-01 03:14:34'),
(6, 'Omah Rakjat', 'Jl. Gayung Kebonsari VIII No.38, Ketintang, Kec. Gayungan, Surabaya', 'kafe', 'WiFi, Colokan, AC, Toilet', '10.00 - 23.00', 'Tempat nongkrong asri yang terasa seperti di rumah nenek.', '@omahrakjat.id', NULL, 'https://www.google.com/maps/search/tempat+nongkrong+ketintang+surabaya/@-7.326637,112.723842,15z?entry=s&amp;sa=X&amp;ved=1t%3A199789', 'workspot_692d2e9cdfda67.66959720_1764568732.jpg', 'approved', '2025-12-01 05:58:52'),
(7, 'test cafe', 'Jl. Ketintang Barat. No.1, Karah, Kec. Jambangan, Surabaya', 'co-working', 'WiFi, AC, Colokan', '08.00 - 22.00', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaasebanyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '@renekopi', 3, 'https://www.google.com/maps/search/cafe+surabaya/@-7.3189468,112.6124742,11z?entry=ttu&amp;g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', 'workspot_692fdd139a71e8.41874588_1764744467.png', 'approved', '2025-12-03 06:47:47'),
(8, 'test cafe', 'Jl. Ketintang Barat. No.1, Karah, Kec. Jambangan, Surabaya', 'kafe', 'WiFi, AC, Colokan', '08.00 - 22.00', 'asikkkk bangetttttttttttttttttttttttttttttttttt', '@renekopi', 3, 'https://www.google.com/maps/search/cafe+surabaya/@-7.3189468,112.6124742,11z?entry=ttu&amp;g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', 'workspot_69369ea4399ab3.23702879_1765187236.jpg', '', '2025-12-08 09:47:16'),
(9, 'test cafe', 'Jl. Ketintang Barat. No.1, Karah, Kec. Jambangan, Surabaya', 'kafe', 'WiFi, AC, Colokan', '08.00 - 22.00', 'bagusssssssssssssssssssssssssssssssssssssssssssssssssssssss', '@renekopi', 3, 'https://www.google.com/maps/search/cafe+surabaya/@-7.3189468,112.6124742,11z?entry=ttu&amp;g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', 'workspot_69380b4d9e9976.15472444_1765280589.jpg', '', '2025-12-09 11:43:09');

-- --------------------------------------------------------

--
-- Table structure for table `tempat`
--

CREATE TABLE `tempat` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `lokasi` text NOT NULL,
  `jam_operasional` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `deskripsi_lengkap` text DEFAULT NULL,
  `fasilitas` text DEFAULT NULL,
  `maps_link` varchar(500) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tempat`
--

INSERT INTO `tempat` (`id`, `nama`, `kategori_id`, `lokasi`, `jam_operasional`, `deskripsi`, `deskripsi_lengkap`, `fasilitas`, `maps_link`, `gambar`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Brain Coffee', 1, 'Jl. Wonokromo Tangkis No. 52, Surabaya', '07.00 - 22.00 WIB', 'Cafe dengan atmosfer hangat dan cozy, cocok untuk nugas dan nongkrong.', 'Brain Coffee Surabaya mempunyai ciri khas dengan hal-hal yang sangat menarik. Cafe ini menonjolkan sisi yang begitu menghangatkan dengan atmosfer yang cozy.', 'Indoor & Outdoor,Photo Spot,Toilet,Area Parkir,Protokol Kesehatan', 'https://maps.app.goo.gl/mYiVRFHaDHjXrX466', 'brain c.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(2, 'Dee Aksara', 1, 'Jl. Ketintang Sel. No.47, Karah, Kec. Jambangan, Surabaya', '07.00 - 22.00 WIB', 'Spot produktif dengan WiFi cepat, ideal untuk mengerjakan tugas.', 'Kafe yang menawarkan tempat untuk bekerja atau berkumpul (spot produktif) dengan berbagai menu makanan ringan dan minuman. Cocok untuk mengerjakan tugas kuliah.', 'WiFi Cepat,Mushola,Toilet,Colokan', 'https://www.google.com/maps/place/Dee+Aksara/@-7.3172662,112.7212648,17z', 'aksara.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(3, 'Oi Kafe', 1, 'Jl. Ketintang Madya No.187, Karah, Kec. Jambangan, Surabaya', 'Senin-Jumat: 10.00-22.00 | Sabtu-Minggu: 11.00-23.00 WIB', 'Kafe nyaman dengan fasilitas lengkap untuk belajar dan santai.', 'Kafe nyaman untuk nongkrong dan bersantai bersama teman. Menu variatif dengan harga terjangkau untuk mahasiswa.', 'Toilet,Mushola,Indoor AC', 'https://www.google.com/maps/place/oi+kafe', 'oi kafe.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(4, 'Kopi Nuku', 1, 'Jl. Ketintang Baru IV No.14, Ketintang, Kec. Gayungan, Surabaya', '14.00 - 22.00 WIB', 'Tempat ngopi santai dengan harga ramah mahasiswa.', 'Tempat ngopi santai dengan suasana yang nyaman. Harga ramah di kantong mahasiswa dengan berbagai pilihan kopi lokal.', 'WiFi,Colokan,Area Santai', 'https://www.google.com/maps/place/KOPINUKU', 'nuku.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(5, 'AADK', 1, 'Jl. Raya Menganti Karangan No.85, Babatan, Kec. Wiyung, Surabaya', 'Setiap Hari 07.00 - 02.00', 'Cafe dua lantai dengan berbagai zona tematik untuk aktivitas produktif.', 'Kafe dua lantai dengan berbagai zona tematik seperti Zona Nyaman, Zona Sepoi, Zona Inspirasi, Zona Kreatif, dan Pojok Cerita. Perfect untuk produktivitas!', 'Indoor & Outdoor,WiFi Cepat,Colokan di Setiap Sudut,Toilet,Musala,Parkir Luas', 'https://www.google.com/maps/place/ADA+APA+DENGAN+KOPI+-+AADK+WIYUNG', 'aadk.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(6, 'Bagi Kopi Margorejo', 1, 'Jl. Margorejo Indah No.511, Margorejo, Wonocolo, Surabaya', 'Setiap Hari 09.00 - 02.00', 'Area outdoor yang nyaman untuk nugas sambil menikmati udara segar.', 'Tempat ngopi outdoor yang nyaman dan santai. Cocok untuk yang suka suasana outdoor sambil mengerjakan tugas.', 'Area Outdoor,WiFi,Toilet,Parkir', 'https://www.google.com/maps/place/bagi+kopi+margorejo', 'bagi.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(7, 'D\'Coffee Cup', 1, 'Jl. Raya Menganti No.748, Lidah Wetan, Kec. Lakarsantri', 'Buka 24 Jam', 'Cafe 24 jam, perfect untuk begadang nugas deadline!', 'D\'Coffee Cup Wiyung adalah kafe 24 jam yang menawarkan suasana nyaman untuk berbagai kegiatan. Cocok untuk begadang nugas deadline!', 'Indoor AC,Outdoor,Mushola,Toilet,Colokan,WiFi Gratis,Parkir Luas,24 Jam', 'https://www.google.com/maps/place/D\'Coffee+Cup+Wiyung/@-7.308505,112.6707767,17z', 'd coffe.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(8, 'Djoes Kode Babatan', 1, 'Jl. Raya Menganti No. 13 Babatan, Wiyung, Surabaya', 'Senin-Kamis: 07.00-22.00 | Jumat-Minggu: 07.00-23.00 WIB', 'Kedai dengan rooftop aesthetic, jus segar dan tempat instagramable.', 'Kedai jus viral di Surabaya dengan buah asli dan segar. Tempat nyaman dan aesthetic dengan tiga lantai dan rooftop instagramable.', 'Rooftop Area,Colokan,Toilet,3 Lantai,Aesthetic', 'https://www.google.com/maps/place/Jus+Kode+Surabaya+Wiyung', 'djoes kode.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(9, 'Batatua', 5, 'Jl. Ketintang Madya No.82, Ketintang, Kec. Gayungan, Surabaya', 'Setiap Hari 09.00 - 00.00 WIB', 'Spot nongkrong dengan board games dan sofa santai.', 'Spot nongkrong enak buat nyore dengan harga mahasiswa banget. Banyak sofa yang bikin nyaman dan ada board games untuk main bareng teman.', 'Banyak Sofa & Kursi Santai,Board Games,WiFi Gratis,Colokan,Mushola', 'https://maps.app.goo.gl/eyoeYKuQAZPEjFwo7', 'bata.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(10, 'Kammari Ketintang', 5, 'Jl. Ketintang Baru II No. KAV 7 Ketintang, Surabaya', 'Setiap Hari 09.00 - 23.00 WIB', 'Ruang luas untuk kerja kelompok dan kegiatan kreatif mahasiswa.', 'Tempat nongkrong untuk segala kalangan terutama mahasiswa. Area luas yang menunjang kegiatan produktif baik untuk bekerja, mengerjakan tugas, dan berkegiatan kreatif.', 'Sofa & Kursi Santai,Board Games,WiFi Gratis,Colokan,Area Luas', 'https://www.google.com/maps/place/KAMMARI/@-7.3143105,112.7279143,17z', 'kammari.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(11, 'Kafe Titik Koma', 1, 'Jl. Ketintang Brt. No.13, Karah, Kec. Jambangan, Surabaya', '09.00 - 23.00 WIB', 'Kafe aesthetic dengan suasana tenang, cocok untuk nugas atau sekadar santai.', 'Kafe Titik Koma mengusung konsep minimalis dan tenang, sangat cocok bagi mahasiswa yang ingin mengerjakan tugas atau menikmati waktu santai dengan teman. Menu kopi dan snack-nya juga ramah di kantong.', 'WiFi Cepat,Colokan,Indoor AC,Area Parkir', 'https://www.google.com/maps/place/Kopi+Titik+Koma+Riverside+Ketintang/@-7.3086944,112.7193638,17z', 'koma.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(12, 'Perpustakaan BI', 3, 'Jl. Taman Mayangkara No.6, Darmo, Kec. Wonokromo, Surabaya', 'Senin - Sabtu: 08.00 - 16.30 WIB | Minggu: Tutup', 'Perpustakaan yang menawarkan suasana belajar yang nyaman dan inspiratif.', 'Perpustakaan Bank Indonesia Surabaya merupakan salah satu perpustakaan umum yang menawarkan suasana belajar yang nyaman dan inspiratif. Interiornya yang tertata rapi serta spot-spot estetik menjadikannya tidak hanya tempat membaca, tetapi juga ruang produktif bagi pengunjung.', 'Wifi,Ruang komputer,Ruang Baca,Musholla,Toilet', 'https://www.google.com/maps/place/Perpustakaan+Bank+Indonesia/@-7.2942525,112.7387455,17z', 'perpus.jpeg', 'approved', '2025-11-30 13:05:03', '2025-11-30 13:05:03'),
(17, 'Omah Rakjat', 1, 'Jl. Gayung Kebonsari VIII No.38, Ketintang, Kec. Gayungan, Surabaya', '10.00 - 23.00', 'Tempat nongkrong asri yang terasa seperti di rumah nenek.', 'Tempat nongkrong asri yang terasa seperti di rumah nenek.', 'WiFi, Colokan, AC, Toilet', 'https://www.google.com/maps/search/tempat+nongkrong+ketintang+surabaya/@-7.326637,112.723842,15z?entry=s&amp;sa=X&amp;ved=1t%3A199789', 'workspot_692d2e9cdfda67.66959720_1764568732.jpg', 'approved', '2025-12-01 06:00:01', '2025-12-01 06:00:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nim` varchar(20) DEFAULT NULL,
  `prodi` varchar(100) DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama_lengkap`, `email`, `password`, `nim`, `prodi`, `foto_profil`, `created_at`, `last_login`, `status`) VALUES
(2, 'Ken Zacky', 'kenzacky1@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, NULL, NULL, '2025-12-03 05:22:00', NULL, 'active'),
(3, 'test', 'test123@gmail.com', '$2y$10$csMlmaQjWiOjo0Yvfpp8FOrjXPtWqF14uEAARj9hQA3LNcR3siPni', NULL, NULL, NULL, '2025-12-03 05:22:57', NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `user_bookmarks`
--

CREATE TABLE `user_bookmarks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `place_name` varchar(200) NOT NULL,
  `place_location` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_unique` (`username`),
  ADD UNIQUE KEY `email_unique` (`email`),
  ADD KEY `idx_username` (`username`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saran`
--
ALTER TABLE `saran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tempat`
--
ALTER TABLE `tempat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nim` (`nim`),
  ADD KEY `idx_email` (`email`);

--
-- Indexes for table `user_bookmarks`
--
ALTER TABLE `user_bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `saran`
--
ALTER TABLE `saran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tempat`
--
ALTER TABLE `tempat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_bookmarks`
--
ALTER TABLE `user_bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `saran`
--
ALTER TABLE `saran`
  ADD CONSTRAINT `saran_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `tempat`
--
ALTER TABLE `tempat`
  ADD CONSTRAINT `tempat_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_bookmarks`
--
ALTER TABLE `user_bookmarks`
  ADD CONSTRAINT `user_bookmarks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
