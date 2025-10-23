# Demo Accounts - NANASU E-Commerce

Dokumen ini berisi informasi akun demo untuk mengakses berbagai panel di aplikasi NANASU E-Commerce.

---

## 🛍️ Customer Account (Pelanggan)

Untuk login sebagai pelanggan biasa, gunakan email dan password apapun (tidak ada validasi khusus di mode demo).

**Contoh:**
- **Email:** customer@example.com
- **Password:** password123

---

## 👔 Admin Panel

Untuk mengakses Admin Panel, gunakan salah satu email admin yang telah didaftarkan:

### Admin Utama
- **Email:** admin@nanasu.com
- **Password:** admin123
- **Role:** Super Admin

### Manager
- **Email:** manager@nanasu.com
- **Password:** manager123
- **Role:** Manager

### Customer Service
- **Email:** cs@nanasu.com
- **Password:** cs123
- **Role:** Customer Service

### Content Editor
- **Email:** editor@nanasu.com
- **Password:** editor123
- **Role:** Content Editor

---

## 🏪 Mitra (Partner) Panel

Untuk mengakses Mitra Dashboard, gunakan kredensial berikut:

### Mitra Demo
- **Email:** mitra@nanasu.com
- **Kode Unik Mitra:** MTR001
- **Password:** mitra123
- **Role:** Partner/Seller

---

## 📝 Catatan Penting

1. **Akun Demo:** Semua akun di atas adalah akun demo untuk keperluan testing dan demonstrasi.
2. **Keamanan:** Di production, JANGAN gunakan password yang sederhana seperti di atas.
3. **Validasi:** Password hanya divalidasi panjangnya (minimal 6 karakter) di mode demo.
4. **Auto-Login:** Sistem akan mendeteksi role berdasarkan email yang digunakan.
5. **Data Persistence:** Semua data disimpan di localStorage dan akan hilang jika cache browser dibersihkan.

---

## 🚀 Cara Mengakses

### Customer Login
1. Buka halaman Login dari navigasi utama
2. Masukkan email dan password apapun
3. Klik "Masuk"

### Admin Login
1. Buka halaman Login dari navigasi utama
2. Masukkan salah satu email admin di atas
3. Masukkan password apapun (minimal 6 karakter)
4. Sistem akan otomatis redirect ke Admin Panel

### Mitra Login
1. Dari halaman utama, klik "Masuk Mitra" di footer atau navigasi
2. Atau akses langsung halaman Mitra Landing lalu klik "Masuk"
3. Masukkan email, kode unik mitra, dan password
4. Klik "Masuk ke Dashboard"

---

## 🔄 Update Terakhir

**Tanggal:** 22 Oktober 2025  
**Versi:** 1.0.0

---

*Dokumen ini dibuat untuk memudahkan testing dan demonstrasi aplikasi NANASU E-Commerce.*
