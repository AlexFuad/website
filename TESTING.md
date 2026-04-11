# Testing Checklist

## ✅ Navbar Transparan
- [ ] Navbar transparan di bagian atas halaman
- [ ] Navbar berubah jadi solid saat scroll
- [ ] Teks navbar putih saat transparan, gelap saat scroll
- [ ] Logo memiliki ring putih saat transparan
- [ ] Mobile menu juga transparan

## ✅ Flex Sections dengan Gambar
- [ ] Section "Featured Projects" muncul dengan 4 gambar
- [ ] Gambar memiliki overlay gradient
- [ ] Tags teknologi muncul di bawah gambar
- [ ] Section "Why Choose Us" muncul dengan 3 cards
- [ ] Hover effects berfungsi

## ✅ Carousel Testimonial
- [ ] Carousel testimonial muncul dengan background gradient
- [ ] Tombol panah kiri/kanan berfungsi
- [ ] Dot indicators berfungsi
- [ ] Avatar dan rating bintang muncul
- [ ] Animasi smooth saat berpindah

## ✅ Product Management
- [ ] Menu "Products" muncul di sidebar Admin CMS
- [ ] Bisa tambah produk baru
- [ ] Bisa edit produk
- [ ] Bisa hapus produk
- [ ] Bisa tambah gambar via URL
- [ ] Bisa tambah fitur produk
- [ ] Status produk (draft/published/archived) berfungsi

## ✅ User Authorization
- [ ] Bisa login dengan user `4dM1n` (Super Admin)
- [ ] Bisa login dengan user `editor` (Content Editor)
- [ ] Bisa login dengan user `productmgr` (Product Manager)
- [ ] Menu Users muncul untuk Super Admin
- [ ] Bisa tambah user baru
- [ ] Bisa edit user
- [ ] Bisa atur permissions
- [ ] Tombol edit/hapus blog sesuai permissions
- [ ] Tombol tambah/edit produk sesuai permissions

## 🎯 Default Login Credentials

### Super Admin (Full Access)
- Username: `4dM1n`
- Password: `4dM1n@12&34`

### Content Editor
- Username: `editor`
- Password: `3d1t0r!23`

### Product Manager
- Username: `productmgr`
- Password: `Pr0dMGr@456`

## 🌐 URL Aplikasi

Development server seharusnya berjalan di:
**http://localhost:8080**

## 📋 Langkah Testing

1. **Test Navbar Transparan:**
   - Buka http://localhost:8080
   - Pastikan navbar transparan di posisi paling atas
   - Scroll ke bawah, navbar berubah solid
   - Scroll ke atas lagi, navbar kembali transparan

2. **Test Home Page Sections:**
   - Scroll ke bawah setelah Hero section
   - Harus muncul "Featured Projects" dengan 4 gambar
   - Scroll lagi untuk "Why Choose Us" dengan 3 cards
   - Scroll lagi untuk testimonial carousel

3. **Test Carousel:**
   - Klik tombol panah kanan untuk testimonial berikutnya
   - Klik tombol panah kiri untuk testimonial sebelumnya
   - Klik dots untuk langsung ke testimonial tertentu

4. **Test Admin CMS - Products:**
   - Login sebagai Super Admin
   - Klik "Products" di sidebar
   - Klik "New Product"
   - Isi semua field
   - Tambahkan gambar (URL dari Unsplash)
   - Tambahkan fitur-fitur
   - Simpan
   - Produk muncul di tabel

5. **Test User Management:**
   - Login sebagai Super Admin
   - Klik "Users" di sidebar
   - Tambah user baru
   - Atur permissions
   - Logout
   - Login dengan user baru
   - Cek permissions berfungsi

6. **Test Permissions:**
   - Login sebagai `editor`
   - Seharusnya bisa tambah/edit blog
   - Tidak bisa akses Products (atau hanya view)
   - Menu Users tidak muncul
   
   - Login sebagai `productmgr`
   - Seharusnya bisa tambah/edit/hapus produk
   - Bisa edit blog tapi tidak bisa hapus
   - Menu Users tidak muncul

## ✨ Expected Results

Semua fitur harus berfungsi dengan baik:
- Navbar transparan dengan smooth transitions
- Sections dengan gambar dan animasi
- Carousel interaktif
- Product management lengkap
- User authorization berdasarkan permissions

## 🐛 Known Issues

Tidak ada issue yang diketahui pada versi ini.
