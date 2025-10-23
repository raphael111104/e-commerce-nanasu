# 📚 Admin Panel Guide - NANASU E-Commerce

> Panduan lengkap penggunaan Admin Panel NANASU untuk mengelola toko online

---

## 🎯 Gambaran Umum

Admin Panel NANASU adalah dashboard lengkap untuk mengelola semua aspek toko online, mulai dari produk, pesanan, pengiriman, hingga laporan keuangan.

### ✨ Fitur Utama
- 📊 **Dashboard KPI** - Monitoring bisnis real-time
- 📦 **Manajemen Produk** - CRUD produk lengkap
- 📋 **Manajemen Pesanan** - Track dan proses pesanan
- 🚚 **Pengiriman** - Generate resi dan tracking
- 🎫 **Voucher** - Buat dan kelola promo
- ⭐ **Moderasi Ulasan** - Approve/reject review
- 👥 **User & Role Management** - Kelola admin
- 💰 **Keuangan** - Track transaksi dan payout
- 📈 **Laporan** - Analytics dan reporting
- ⚙️ **Pengaturan** - Konfigurasi toko

---

## 🔐 Akses Admin Panel

### Login Admin
1. Klik **"Login"** di navigasi utama
2. Masukkan email admin:
   - `admin@nanasu.com` (Super Admin)
   - `manager@nanasu.com` (Manager)
   - `cs@nanasu.com` (Customer Service)
   - `editor@nanasu.com` (Content Editor)
3. Masukkan password (minimal 6 karakter)
4. Sistem akan mendeteksi role dan redirect ke Admin Panel

### Akses Langsung
- URL: Tidak ada route khusus, terdeteksi otomatis dari login email

---

## 📱 Navigasi

### Desktop (> 768px)
- **Sidebar Kiri**: Menu navigasi dengan icons
- **Top Bar**: Search, notifications, user menu
- **Collapsible**: Klik icon X untuk collapse sidebar

### Mobile (< 768px)
- **Bottom Navigation**: 4 menu utama
  - Beranda
  - Produk  
  - Pesanan (dengan badge)
  - Pengiriman
- **Lainnya**: Menu overflow untuk 6 menu lainnya
- **Hamburger Menu**: Drawer sidebar untuk full navigation

---

## 🏠 1. Beranda (Dashboard)

### KPI Cards
- **Pesanan Hari Ini**: Total pesanan masuk hari ini dengan persentase perubahan
- **Pendapatan Hari Ini**: Total revenue dengan trend
- **Stok Rendah**: Jumlah SKU yang perlu restok (dengan jumlah kritis)
- **On-time Shipment**: Persentase pengiriman tepat waktu

### Grafik Tren
- **Tren Pendapatan 7 Hari**: Area chart menampilkan revenue harian
- **Tren Pesanan 7 Hari**: Bar chart jumlah pesanan

### Daftar Tugas
- Checkbox untuk mark complete
- Priority badges (Tinggi, Sedang, Rendah)
- Due date untuk setiap task

### Status Pesanan Quick View
- **Pending**: Menunggu pembayaran
- **Diproses**: Sedang dikemas
- **Dikirim**: Dalam pengiriman

---

## 📦 2. Produk

### View Produk
- **Desktop**: Table dengan kolom Gambar, Nama, SKU, Kategori, Harga, Stok, Status
- **Mobile**: Cards dengan semua info produk

### Status
- 🟢 **Active**: Produk aktif di katalog
- 🟡 **Draft**: Belum dipublikasi
- ⚫ **Archived**: Tidak ditampilkan

### Actions
- **View**: Lihat detail produk
- **Edit**: Edit informasi (upcoming)
- **Duplicate**: Copy produk (upcoming)
- **Delete**: Hapus produk (upcoming)

### Future: Form Produk
- Tab: Informasi, Harga & Stok, Media, SEO
- Upload foto multiple
- Tag management
- Inventory threshold

---

## 📋 3. Pesanan

### Order Table
- Order ID, Tanggal, Customer, Total, Payment Method, Status

### Status Badges
- 🆕 **New**: Pesanan baru masuk
- 💰 **Paid**: Sudah dibayar
- 📦 **Packed**: Sudah dikemas
- 🚚 **Shipped**: Dalam pengiriman
- ✅ **Delivered**: Sudah diterima
- ❌ **Cancelled**: Dibatalkan

### Filter
- Filter by status
- Search by Order ID, email, nomor HP

### Actions
- View detail order
- Change status
- Generate resi
- Print invoice

---

## 🚚 4. Pengiriman

### Generate Resi
1. Klik **"Buat Resi"**
2. Masukkan Order ID
3. Pilih Kurir (JNE, SiCepat, Ninja, JNT, AnterAja)
4. Input Berat (kg)
5. Input Tujuan
6. Klik **"Generate Resi"**
7. Nomor resi format: `NNS-XXXX-KUR`
8. ETA auto-calculated (2-5 hari)

### Tracking
- View semua shipment dengan status real-time
- **Pending**: Menunggu pickup
- **Picked-up**: Sudah diambil kurir
- **In-transit**: Dalam perjalanan
- **Delivered**: Sudah diterima
- **Cancelled**: Dibatalkan

### Actions
- **Lacak**: Track shipment (external link)
- **Mark Delivered**: Manual mark sebagai terkirim
- **Cancel**: Batalkan shipment (hanya untuk pending)

---

## 🎫 5. Voucher

### Create Voucher
1. Klik **"Buat Voucher"**
2. Input **Kode** (huruf besar, misal: NANASU10)
3. Pilih **Tipe**:
   - **Potongan Persentase**: Diskon % dengan max diskon optional
   - **Potongan Nominal**: Diskon Rp fixed
   - **Gratis Ongkir**: Free shipping
4. Input **Nilai** (persen atau rupiah)
5. Set **Min. Pembelian**
6. Set **Periode** (tanggal mulai - berakhir)
7. Set **Kuota**
8. Klik **"Buat Voucher"**

### Features
- **Copy Code**: Klik icon copy untuk copy ke clipboard
- **Status Auto**: Active jika dalam periode, Expired jika lewat
- **Usage Tracking**: Monitor used/total quota
- **Edit & Delete**: Quick actions

### Stats
- Total voucher aktif
- Total penggunaan
- Total kadaluarsa

---

## ⭐ 6. Ulasan

### Moderasi
1. **Filter** by status (Pending, Published, Hidden)
2. **View** ulasan dengan rating, text, customer
3. **Actions**:
   - ✅ **Setujui**: Publish ke katalog
   - ❌ **Tolak**: Hide dari publik
   - 👁️ **Sembunyikan**: Hide ulasan yang sudah published

### Stats Dashboard
- Menunggu Review
- Dipublikasi
- Disembunyikan

### Rating Display
- Visual 5-star rating
- Customer name & avatar
- Product yang di-review
- Tanggal review

---

## 👥 7. Pengguna & Peran

### Invite User
1. Klik **"Undang Pengguna"**
2. Input Nama Lengkap
3. Input Email
4. Pilih Role:
   - **Super Admin**: Full access
   - **Manager**: Manage operations
   - **Staff**: Limited access
5. Klik **"Kirim Undangan"**
6. Email invitation sent (mock)

### User Management
- View all admin users
- Role badges dengan warna berbeda
- Last login tracking
- Status (Active/Inactive)

### Permission Matrix
Matrix visual menampilkan hak akses per role:

| Modul | Super Admin | Manager | Staff |
|-------|-------------|---------|-------|
| Dashboard | ✓ | ✓ | ✓ |
| Produk | ✓ | ✓ | ✗ |
| Pesanan | ✓ | ✓ | ✓ |
| Pengiriman | ✓ | ✓ | ✓ |
| Voucher | ✓ | ✓ | ✗ |
| Ulasan | ✓ | ✓ | ✓ |
| Pengguna | ✓ | ✗ | ✗ |
| Keuangan | ✓ | ✓ | ✗ |
| Laporan | ✓ | ✓ | ✗ |
| Pengaturan | ✓ | ✗ | ✗ |

---

## 💰 8. Keuangan

### Financial Overview
- **Saldo Tersedia**: Current balance
- **Penjualan Bulan Ini**: Total sales MTD
- **Refund Bulan Ini**: Total refunds MTD

### Payout Management
- **Scheduled Payout**: Tanggal dan jumlah payout berikutnya
- **Process Payout**: Button untuk trigger payout (mock)

### Transaction History
- **Tipe Transaksi**:
  - 💚 **Penjualan**: Income dari order
  - 🔴 **Refund**: Pengembalian dana
  - 🔵 **Payout**: Transfer ke bank
  - 🟡 **Biaya**: Payment gateway fee

### Export
- Export CSV untuk accounting

---

## 📈 9. Laporan

### Generate Laporan
1. Pilih **Jenis Laporan**:
   - Laporan Penjualan
   - Produk Terlaris
   - Kategori Terlaris
   - SLA Pengiriman
   - Conversion Rate
2. Pilih **Periode**:
   - 7 hari terakhir
   - 30 hari terakhir
   - 60 hari terakhir
   - 90 hari terakhir
3. Klik **"Export CSV"**

### Summary Stats
- Total Pendapatan
- Total Pesanan
- Average Order Value
- Total Pelanggan

### Charts
- **Tren Pendapatan**: Line chart revenue per hari
- **Tren Pesanan**: Line chart order count per hari

### Quick Reports
Pre-defined reports dengan one-click download:
- Penjualan Hari Ini
- Produk Terlaris Bulan Ini
- Kategori Terlaris
- Laporan SLA Pengiriman

---

## ⚙️ 10. Pengaturan

### Tab Navigation
4 kategori pengaturan dengan tab:

#### 🏪 Brand
- **Identitas**:
  - Nama Toko
  - Tagline
  - Email Toko
  - Telepon
- **Visual**:
  - Upload Logo Header
  - Upload Favicon

#### 🏬 Toko
- **Operasional**:
  - Alamat Pickup (untuk kurir)
  - Jam Operasional
  - Lokasi Gudang

#### 💳 Pembayaran
- **COD Settings**:
  - Toggle COD On/Off
  - Minimum pembelian COD
- **Payment Gateway**:
  - Pilih gateway (Midtrans, Xendit, Manual)
  - Konfigurasi akun

#### 🚚 Pengiriman
- **Gratis Ongkir**:
  - Set minimum pembelian
- **Courier**:
  - Pilih kurir default
  - Enable/disable individual couriers
- **SLA**:
  - Target hari pengiriman

### Save Changes
- Setiap tab punya button "Simpan Perubahan"
- Toast notification untuk konfirmasi

---

## 🎨 Design System

### Colors (NANASU Brand)
- **Primary Gold**: `#D4AF37`
- **Pine Green**: `#16a34a`
- **Gradient**: `from-[#D4AF37] to-[#16a34a]`

### Status Colors
- **Success/Active**: Green (`bg-green-600`)
- **Warning/Pending**: Yellow (`bg-yellow-600`)
- **Error/Cancelled**: Red (`bg-red-600`)
- **Info**: Blue (`bg-blue-600`)
- **Neutral**: Gray (`bg-gray-500`)

### Components
- **Cards**: White background, rounded-lg, shadow-sm
- **Buttons**: Primary gradient, outline, ghost
- **Badges**: Pill shape dengan semantic colors
- **Tables**: Zebra striping, sticky header
- **Forms**: Label + Input + Helper text

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Bottom navigation bar
- Card views instead of tables
- Stacked forms
- Touch-friendly button sizes (min 44x44px)
- Collapsible sections

### Desktop Features
- Sidebar navigation
- Wide tables
- Multi-column grids
- Hover states
- Tooltips

---

## 🔔 Notifications

### Toast Notifications (Sonner)
- **Success**: Green checkmark
- **Error**: Red X
- **Info**: Blue info icon
- **Position**: Bottom right
- **Duration**: 2-3 seconds

### Examples
- "Resi berhasil dibuat!"
- "Voucher berhasil dibuat!"
- "Ulasan disetujui"
- "Pengaturan berhasil disimpan!"

---

## 🚀 Quick Start Workflow

### Daily Routine
1. **Login** → Auto redirect ke Beranda
2. **Check Dashboard** → Review KPI dan tasks
3. **Process Orders** → Pesanan → Pack & Ship
4. **Generate Resi** → Pengiriman → Create tracking
5. **Moderate Reviews** → Ulasan → Approve/Reject
6. **Check Reports** → Laporan → Monitor trends

### Weekly Tasks
- Review laporan penjualan 7 hari
- Check stok rendah dan restok
- Create new vouchers untuk promo
- Review user performance
- Update settings jika perlu

### Monthly Tasks
- Generate laporan bulanan
- Process payout
- Review conversion rate
- Analyze best-selling products
- Update pricing strategy

---

## 🐛 Troubleshooting

### Common Issues

**Q: Tidak bisa login ke admin panel**
A: Pastikan menggunakan email admin yang terdaftar (lihat DEMO_ACCOUNTS.md)

**Q: Menu tidak muncul di sidebar**
A: Check role permissions - beberapa menu terbatas untuk role tertentu

**Q: Data tidak tersimpan**
A: Ini mock data, refresh akan reset. Production akan tersimpan ke database

**Q: Export CSV tidak bekerja**
A: Feature masih mock, akan diimplementasi dengan backend

**Q: Bottom nav tidak muncul di mobile**
A: Pastikan viewport < 768px. Check responsive mode di browser

---

## 📞 Support

Untuk bantuan lebih lanjut:
- **Email**: admin@nanasu.com
- **Documentation**: Lihat CHANGELOG.md untuk detail update
- **Demo**: Gunakan credentials di DEMO_ACCOUNTS.md

---

## 🎓 Tips & Best Practices

### Security
- Gunakan password kuat di production
- Jangan share admin credentials
- Logout setelah selesai
- Review audit logs regularly (upcoming feature)

### Data Management
- Export data secara berkala
- Review stok rendah setiap hari
- Moderate ulasan maksimal 24 jam
- Process payout tepat waktu

### Performance
- Filter data untuk large datasets
- Use pagination untuk table besar
- Export report di off-peak hours
- Clear browser cache jika slow

### User Experience
- Reply customer reviews
- Update order status real-time
- Provide tracking numbers ASAP
- Keep product info updated

---

**Version**: 1.0.0  
**Last Updated**: 22 Januari 2025  
**Author**: NANASU Development Team

---

*Panduan ini akan terus diupdate seiring development fitur baru*
