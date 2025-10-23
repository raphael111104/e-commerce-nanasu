# NANASU E-Commerce Platform

Prototipe website e-commerce modern dengan design system semantic tokens, Light/Dark mode support, dan UX yang memenuhi standar WCAG AA.

## 🎨 Design System

### Color Palette (Semantic Tokens)
- **Primary Gold**: `#D4AF37` - Warna utama brand
- **Onyx**: Untuk elemen dark mode dan aksen
- **Pine Green**: `#065F46` - Warna sekunder untuk aksen natural
- Support penuh untuk **Light/Dark Mode** dengan transisi smooth

### UI Framework
- **Tailwind CSS v4.0** - Utility-first CSS framework
- **Shadcn/UI** - Komponen UI yang dapat dikustomisasi
- **Motion/React** - Animasi dan transisi smooth
- **Glassmorphism** - Efek modern dengan backdrop blur

### Accessibility
- Memenuhi standar **WCAG AA**
- Semantic HTML dan ARIA labels
- Keyboard navigation support
- Screen reader friendly

## ✨ Fitur Utama

### 🛒 Customer Journey v2 (Lengkap)
Alur pembelian end-to-end yang telah sepenuhnya diimplementasikan:

1. **Homepage & Catalog**
   - Banner slider interaktif
   - Flash sale dengan countdown timer
   - Grid kategori produk
   - Filter dan sort produk

2. **Product Discovery**
   - Quick view modal untuk preview cepat
   - Image gallery dengan zoom
   - Variant selector (ukuran, warna, dll)
   - Review dan rating produk
   - Wishlist functionality

3. **Shopping Cart**
   - Add/remove items
   - Update quantity
   - Voucher input dan validasi
   - Estimasi ongkir
   - Cart persistence

4. **Checkout Process**
   - Pilih/tambah alamat pengiriman
   - Pilih metode pengiriman
   - Pilih metode pembayaran
   - Review order sebelum bayar
   - Form validasi lengkap

5. **Payment & Confirmation**
   - Payment Success Modal
   - Order confirmation
   - Download invoice (simulasi)
   - Share order ke social media

6. **Order Tracking**
   - Shipping Status Page
   - Timeline pengiriman real-time
   - Update status otomatis
   - Tracking number

7. **Post-Purchase**
   - Order history
   - Order detail page
   - Return/refund system
   - Review produk setelah pembelian

### 📱 Responsive Design
- **Desktop-first** dengan optimasi mobile lengkap
- **Bottom Navigation** untuk mobile
- **Hamburger menu** untuk mobile sidebar
- Semua halaman responsive dan dioptimasi untuk berbagai viewport
- Touch-friendly untuk mobile devices

### 🔔 Sistem Notifikasi
- **Notification Inbox** dengan badge counter
- Real-time notification updates
- Kategori notifikasi:
  - Order updates
  - Payment confirmation
  - Shipping updates
  - Promotional messages
  - System announcements
- Mark as read functionality
- Notification history

### 🖼️ Performance Optimizations
- **Lazy Loading** untuk semua gambar
- `LazyImage` component dengan IntersectionObserver
- `ProductCardLazy` untuk grid produk
- Skeleton loading states
- Image optimization dengan fallback
- Network indicator
- Empty states untuk UX yang lebih baik

Dokumentasi lengkap di: [`PERFORMANCE_GUIDE.md`](PERFORMANCE_GUIDE.md)

### 🤝 Mitra/Partner Services (P8)

#### Landing & Onboarding
- **Mitra Landing Page** - Halaman untuk calon mitra
- **Mitra Onboarding** - Proses registrasi mitra step-by-step
- **Mitra Login Page** - Halaman login khusus untuk mitra

#### Mitra Dashboard
Dashboard lengkap untuk mitra dengan 6 tab utama:

1. **Beranda**
   - Overview statistik penjualan
   - Grafik performa
   - Quick actions
   - Notifikasi penting

2. **Produk**
   - Katalog produk mitra
   - CRUD produk lengkap
   - Upload gambar produk
   - Manage stok dan varian
   - Filter dan search produk

3. **Pesanan**
   - Daftar pesanan masuk
   - Update status pesanan
   - Detail pesanan lengkap
   - Cetak invoice/label

4. **Pengiriman**
   - Generate nomor resi
   - Update tracking
   - History pengiriman
   - Integrasi dengan kurir

5. **Keuangan**
   - Dashboard pendapatan
   - Riwayat transaksi
   - Payout request
   - Laporan keuangan

6. **Bantuan**
   - FAQ untuk mitra
   - Contact support
   - Dokumentasi
   - Tutorial

#### Mobile Responsive
- Dashboard mitra fully responsive
- Touch-optimized untuk tablet
- Mobile-friendly forms
- Adaptive layouts

### 👨‍💼 Admin Panel

Sistem admin lengkap dengan **10 halaman fungsional**:

#### Layout & Navigation
- **AdminLayout** dengan sidebar (desktop) dan bottom tabs (mobile)
- Responsive untuk semua ukuran layar
- Quick stats di header
- User profile dropdown

#### Halaman Admin

1. **Overview** (`/admin`)
   - Dashboard utama dengan KPI cards
   - Grafik penjualan (Recharts)
   - Recent orders
   - Quick actions

2. **Beranda Management**
   - Manage banner slider
   - Featured products
   - Flash sale settings
   - Promotional content

3. **Products** (`/admin/products`)
   - Daftar semua produk
   - CRUD produk lengkap
   - Bulk actions
   - Category management
   - Stock management
   - Image upload
   - Variant management

4. **Orders** (`/admin/orders`)
   - Semua pesanan dengan filter
   - Update status pesanan
   - View order details
   - Export orders
   - Order analytics

5. **Pengiriman**
   - Generate resi pengiriman
   - Update tracking status
   - Shipping methods management
   - SLA monitoring

6. **Keuangan**
   - Revenue dashboard
   - Transaction history
   - Payment analytics
   - Payout management
   - Financial reports

7. **Voucher**
   - Create/edit voucher
   - Discount code generator
   - Usage analytics
   - Expiry management
   - Campaign tracking

8. **Ulasan (Reviews)**
   - Moderate user reviews
   - Approve/reject reviews
   - Reply to reviews
   - Review analytics
   - Fake review detection

9. **Pengguna (Users)**
   - User management
   - Invite new users
   - Role management
   - User analytics
   - Activity logs

10. **Pengaturan (Settings)**
    - Store configuration
    - Payment gateway settings
    - Shipping settings
    - Email templates
    - System preferences

#### Admin Features
- **Mock data** yang diperluas dan realistis
- **Modal forms** untuk create/edit
- **Data tables** dengan sort, filter, pagination
- **Toast notifications** untuk feedback
- **Confirmation dialogs** untuk actions berbahaya
- **Search dan filter** di semua list pages

Dokumentasi lengkap di: [`ADMIN_GUIDE.md`](ADMIN_GUIDE.md)

### 🔐 Authentication System

#### Multi-Role Login
- **Customer** - Untuk pembeli
- **Mitra** - Untuk seller/partner
- **Admin** - Untuk administrator

#### Demo Accounts
Tersedia akun demo untuk testing:

**Customer:**
- Email: `customer@nanasu.com`
- Password: `customer123`

**Mitra:**
- Email: `mitra@nanasu.com`
- Password: `mitra123`

**Admin:**
- Email: `admin@nanasu.com`
- Password: `admin123`

Lihat [`DEMO_ACCOUNTS.md`](DEMO_ACCOUNTS.md) untuk daftar lengkap akun demo.

### 📄 Halaman Informasi

- **About Page** - Tentang NANASU
  - Visi & Misi
  - Tim
  - Nilai perusahaan
  - Pencapaian

- **Contact Page** - Hubungi kami
  - Form kontak dengan validasi
  - Informasi kontak
  - Maps lokasi
  - FAQ

- **Education Page** - Konten edukatif
  - Tips & tricks
  - Articles
  - Video tutorials
  - Download materials

- **News Page** - Berita & artikel
  - Blog posts
  - Product updates
  - Company news
  - Category filtering

- **News Detail Page** - Detail artikel
  - Full article content
  - Related articles
  - Share buttons
  - Comments (placeholder)
  - Responsive untuk mobile

### 🛍️ Kategori Produk

1. **Nanas Segar (Fresh)**
   - Produk nanas segar berbagai varietas
   - Filter berdasarkan tingkat kematangan
   - Informasi nilai gizi

2. **Nanas Olahan (Processed)**
   - Produk olahan nanas
   - Jus, selai, keripik, dll
   - Informasi komposisi

3. **Paket Bundle**
   - Paket hemat kombinasi produk
   - Hampers gift
   - Subscription boxes

4. **Pre-Order**
   - Produk yang dapat di pre-order
   - Estimasi waktu tersedia
   - Harga special

5. **Katalog Lengkap**
   - Semua produk
   - Advanced filtering
   - Sort by berbagai kriteria

## 🗂️ State Management

### Centralized State
- `ecommerceState.ts` - Global state untuk:
  - Shopping cart
  - Wishlist
  - User session
  - Active orders
  - Notifications
  - Search history

### Mock Services
- `mockData.ts` - Mock data untuk customer
- `admin/mockData.ts` - Mock data untuk admin panel
- `customerJourney.ts` - Journey simulation
- `catalog.ts` - Product catalog services

### Hooks
- `useNavigationHistory` - Browser navigation history
- `use-mobile.ts` - Mobile detection hook

## 🎯 UX Features

### Interaktivitas
- **Smooth animations** dengan Motion/React
- **Hover states** yang jelas
- **Loading states** di semua actions
- **Skeleton screens** untuk better perceived performance
- **Toast notifications** untuk feedback
- **Confirmation dialogs** untuk actions penting

### Navigation
- **Breadcrumbs** untuk orientasi
- **Back buttons** di semua detail pages
- **Bottom navigation** untuk mobile
- **Scroll to top** button
- **Search** global dengan autocomplete

### Forms
- **Validation** dengan error messages
- **Auto-focus** pada input pertama
- **Disabled states** yang jelas
- **Loading states** saat submit
- **Success/error feedback**

## 📱 Komponen Utama

### Layout Components
- `Header.tsx` - Header dengan search, cart, user menu
- `BottomNavigation.tsx` - Bottom nav untuk mobile
- `AdminLayout.tsx` - Layout untuk admin panel

### Feature Components
- `BannerSlider.tsx` - Carousel banner
- `FlashSale.tsx` - Flash sale dengan countdown
- `CategoryGrid.tsx` - Grid kategori
- `ProductCard.tsx` - Card produk
- `ProductCardLazy.tsx` - Card dengan lazy loading
- `QuickViewModal.tsx` - Modal quick view
- `ImageGallery.tsx` - Gallery dengan zoom
- `VariantSelector.tsx` - Selector varian produk
- `VoucherInput.tsx` - Input voucher dengan validasi
- `PaymentSuccessModal.tsx` - Modal sukses pembayaran
- `NotificationInbox.tsx` - Inbox notifikasi
- `OrderStatus.tsx` - Status timeline order

### UI Components (Shadcn)
47 komponen UI yang dapat dikustomisasi di `/components/ui/`

### Performance Components
- `LazyImage.tsx` - Image dengan lazy loading
- `ProductGrid.tsx` - Grid dengan virtualization
- `SectionLoader.tsx` - Loading placeholder
- `EmptyState.tsx` - Empty state UI
- `NetworkIndicator.tsx` - Indikator koneksi

## 🔧 Teknologi Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4.0** - Styling
- **Shadcn/UI** - Component library
- **Motion/React** - Animations
- **Lucide React** - Icons
- **Recharts** - Charts & graphs
- **Sonner** - Toast notifications
- **React Hook Form** - Form management

### Development
- **Vite** - Build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📚 Dokumentasi

- [`README.md`](README.md) - Dokumentasi utama (file ini)
- [`CHANGELOG.md`](CHANGELOG.md) - Riwayat perubahan
- [`DEMO_ACCOUNTS.md`](DEMO_ACCOUNTS.md) - Akun demo untuk testing
- [`ADMIN_GUIDE.md`](ADMIN_GUIDE.md) - Panduan admin panel
- [`PERFORMANCE_GUIDE.md`](PERFORMANCE_GUIDE.md) - Panduan optimasi performa
- [`Attributions.md`](Attributions.md) - Kredit & lisensi
- [`guidelines/Guidelines.md`](guidelines/Guidelines.md) - Design guidelines

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation
```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Demo Login
Gunakan salah satu akun demo dari [`DEMO_ACCOUNTS.md`](DEMO_ACCOUNTS.md) untuk testing.

## 📋 Struktur Folder

```
├── components/
│   ├── admin/          # Admin panel components
│   ├── pages/          # Page components
│   │   └── mitra/      # Mitra dashboard components
│   ├── performance/    # Performance optimization components
│   ├── ui/            # Shadcn UI components
│   ├── brand/         # Brand components (Logo)
│   └── figma/         # Figma import utilities
├── lib/
│   ├── admin/         # Admin mock data & services
│   ├── hooks/         # Custom React hooks
│   ├── services/      # Business logic & state
│   └── utils.ts       # Utility functions
├── styles/
│   └── globals.css    # Global styles & tokens
└── guidelines/        # Design guidelines
```

## ✅ Status Implementasi

### ✔️ Selesai
- [x] Customer Journey v2 lengkap (Cart → Checkout → Payment → Tracking)
- [x] Sistem notifikasi dengan inbox
- [x] Mitra Services (P8) lengkap dengan dashboard
- [x] Admin Panel 10 halaman dengan CRUD lengkap
- [x] Responsive design desktop & mobile
- [x] Performance optimizations (lazy loading)
- [x] Dark mode support
- [x] Authentication multi-role
- [x] State management centralized
- [x] Mock data comprehensive
- [x] Dokumentasi lengkap

### 🎯 Future Enhancements (Opsional)
- [ ] Real backend integration
- [ ] Payment gateway integration (Midtrans, dll)
- [ ] Real-time notifications dengan WebSocket
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] PWA support
- [ ] Accessibility testing dengan automated tools

## 🐛 Bug Fixes Terbaru

### 2024-12-XX
- ✅ Fixed: Missing `Badge` import di `PengaturanPage.tsx`
- ✅ Fixed: Missing `DialogDescription` di 4 dialog components (accessibility)
- ✅ Fixed: Removed unused back button di `AboutPage.tsx`
- ✅ Fixed: Mobile responsiveness di `NewsDetailPage.tsx`

## 📝 Catatan Penting

### Tombol & Fitur Aktif
Semua tombol dan halaman kosong telah diaktifkan dengan:
- State management yang proper
- Modal/dialog untuk interaksi
- Toast notifications untuk feedback
- Loading states
- Error handling

### Mock Data
Semua data adalah **mock/simulasi** untuk keperluan prototipe:
- Product data di `lib/services/mockData.ts`
- Admin data di `lib/admin/mockData.ts`
- Tidak ada koneksi ke backend real
- Tidak ada data persistence (refresh = reset)

### Design Tokens
Jangan mengubah tokens di `styles/globals.css` tanpa alasan yang jelas karena sudah disesuaikan dengan brand identity NANASU.

## 🤝 Contributing

Untuk melakukan perubahan:
1. Ikuti design guidelines di `guidelines/Guidelines.md`
2. Maintain consistency dengan existing code
3. Test responsive di mobile & desktop
4. Update dokumentasi jika ada perubahan signifikan
5. Add entry ke `CHANGELOG.md`

## 📞 Support

Untuk pertanyaan atau issues, silakan buka issue di repository atau hubungi tim development.

---

**NANASU E-Commerce** - Platform Modern untuk Produk Nanas Premium Indonesia 🍍

*Built with ❤️ using React, Tailwind CSS, and Modern Web Technologies*
