# Website Caniel - Panduan Lengkap

## 🎉 Perubahan Terbaru

### 1. Navbar Transparan
Navbar sekarang memiliki tampilan transparan yang berubah menjadi solid saat di-scroll.

**Fitur:**
- Tampilan transparan di bagian atas halaman
- Efek glassmorphism saat scroll
- Warna teks adaptif (putih saat transparan, gelap saat scroll)
- Transisi yang halus

### 2. Flex Sections dengan Gambar
Halaman Home sekarang memiliki beberapa section baru dengan layout flexbox.

**Section Baru:**
- **Featured Projects**: Menampilkan 4 project dengan gambar dari Unsplash
- **Why Choose Us**: 3 card dengan ikon dan deskripsi
- Setiap section memiliki animasi dan hover effects

### 3. Carousel Testimonial
Carousel interaktif untuk menampilkan testimonial klien.

**Fitur:**
- Navigasi dengan tombol panah kiri/kanan
- Dot indicators untuk navigasi cepat
- Auto-play tidak diaktifkan (manual navigation)
- Animasi smooth saat berpindah testimonial
- Avatar dan rating bintang

### 4. Admin CMS - Product Management
Sistem manajemen produk yang lengkap telah ditambahkan.

**Fitur Produk:**
- ✅ Tambah produk baru
- ✅ Edit produk
- ✅ Hapus produk
- ✅ Upload gambar produk (via URL)
- ✅ Tambah/hapus fitur produk
- ✅ Status produk (Draft, Published, Archived)
- ✅ Kategori produk
- ✅ Harga produk

**Cara Menggunakan:**
1. Login sebagai admin
2. Klik "Products" di sidebar
3. Klik "New Product" untuk menambah produk
4. Isi informasi produk
5. Tambahkan URL gambar (gunakan URL dari Unsplash atau lainnya)
6. Tambahkan fitur-fitur produk
7. Simpan produk

### 5. User Authorization System
Sistem otorisasi user dengan role-based permissions.

**Default Users:**

1. **Super Admin** (`4dM1n`)
   - Username: `4dM1n`
   - Password: `4dM1n@12&34`
   - Akses penuh ke semua fitur

2. **Content Editor** (`editor`)
   - Username: `editor`
   - Password: `3d1t0r!23`
   - Bisa: Manage & edit blog
   - Tidak bisa: Hapus blog, manage products

3. **Product Manager** (`productmgr`)
   - Username: `productmgr`
   - Password: `Pr0dMGr@456`
   - Bisa: Manage products (tambah, edit, hapus)
   - Bisa: Edit blog (tidak bisa hapus)
   - Tidak bisa: Manage users

**Permissions:**
- `canManageBlogs`: Tambah blog baru
- `canEditBlogs`: Edit blog yang ada
- `canDeleteBlogs`: Hapus blog
- `canManageProducts`: Tambah produk baru
- `canEditProducts`: Edit produk yang ada
- `canDeleteProducts`: Hapus produk
- `canManageUsers`: Kelola user (tambah, edit, hapus)
- `canAccessSettings`: Akses pengaturan sistem

**Cara Menambah User:**
1. Login sebagai Super Admin
2. Klik "Users" di sidebar
3. Klik "Tambah User"
4. Isi username, password, nama tampilan
5. Pilih role
6. Atur permissions secara manual
7. Simpan user

## 📁 Struktur File Baru

```
src/
├── components/
│   ├── admin/
│   │   └── UserManagement.js       # Manajemen user dan permissions
│   ├── products/
│   │   └── ProductEditor.js        # Editor produk
│   └── blog/
│       ├── ArticleEditor.js
│       ├── DeleteConfirmation.js
│       └── RichTextEditor.js
```

## 🔧 Data Storage

Semua data disimpan di localStorage:

- `digitalita_blogs`: Artikel blog
- `digitalita_products`: Data produk
- `cms_users`: Semua user
- `admin_user`: User yang sedang login

## 🎨 Styling

Menggunakan Tailwind CSS dengan:
- Gradient backgrounds
- Glassmorphism effects
- Smooth transitions
- Hover animations
- Dark mode support

## 🚀 Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Aplikasi akan berjalan di `http://localhost:8080`

## 📝 Tips Penggunaan

### Menambahkan Produk dengan Gambar
1. Cari gambar di Unsplash (https://unsplash.com)
2. Klik kanan pada gambar → "Copy Image Address"
3. Paste URL di field "URL gambar"
4. Klik "Tambah"

### Mengatur Permissions User
1. Login sebagai Super Admin
2. Buka "Users"
3. Tambah user baru atau edit user yang ada
4. Check/uncheck permissions yang diinginkan
5. Simpan

### Testimonial Carousel
- Gunakan tombol panah untuk navigasi
- Klik dots di bawah untuk langsung ke testimonial tertentu
- Hover pada card untuk efek interaktif

## 🔒 Keamanan

- Password disimpan dalam localStorage (untuk development)
- reCAPTCHA untuk proteksi login
- Permissions-based access control
- Super Admin tidak bisa dihapus

## 🐛 Troubleshooting

**Navbar tidak transparan:**
- Pastikan scroll di posisi paling atas
- Refresh halaman jika perlu

**Gambar tidak muncul:**
- Pastikan URL gambar valid dan accessible
- Beberapa URL mungkin diblokir oleh CORS

**User tidak bisa login:**
- Pastikan username dan password benar
- Cek console untuk error messages

**Produk/Blog tidak muncul:**
- Cek localStorage di browser DevTools
- Pastikan data berhasil di-save

## 📞 Support

Untuk pertanyaan atau issue, silakan hubungi administrator.

---

**Version:** 2.0.0  
**Last Updated:** April 2026
