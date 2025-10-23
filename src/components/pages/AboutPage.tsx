import { 
  ChevronLeft, Heart, Award, Target, Shield, Sparkles, TrendingUp, 
  Users, Package, Truck, BarChart3, Check, ArrowRight, Leaf, 
  ShoppingBag, MapPin, Star, CheckCircle2, Zap, Clock, Layers
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Logo } from '../brand/Logo';

export function AboutPage({ onBack, onNavigate }) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-16 md:top-16 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 h-12 md:h-14">

            <h1 className="font-semibold text-lg md:text-xl">Tentang NANASU</h1>
          </div>
        </div>
      </div>

      {/* Hero Section - Above the Fold */}
      <div 
        className="relative py-10 md:py-14 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1676454954218-b9daf2caeb8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBmYXJtJTIwc3ViYW5nJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MTExODk1Mnww&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A]/90 via-[#D4AF37]/85 to-[#FACC15]/90" />
        
        {/* Decorative Elements */}
        <div className="absolute top-6 right-6 opacity-10 text-6xl md:text-7xl">🍍</div>
        <div className="absolute bottom-6 left-6 opacity-10 text-5xl md:text-6xl">🍍</div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 md:p-5 border-2 border-white/30 shadow-2xl">
              <Logo size={64} className="mx-auto" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            NANASU — Nanas Asli Subang,
            <br className="hidden md:block" />
            <span className="text-[#FACC15]">dari Petani Lokal ke Meja Anda</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg mb-5 max-w-3xl mx-auto leading-relaxed opacity-95">
            Platform e-commerce yang memperluas akses pasar, memberdayakan petani & UMKM, 
            serta menghadirkan produk nanas Subang segar dan olahan berkualitas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="default" 
              className="bg-white text-[#16A34A] hover:bg-gray-100 shadow-xl px-6"
              onClick={() => onNavigate && onNavigate('catalog')}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Mulai Belanja
            </Button>
            <Button 
              size="default" 
              variant="outline"
              className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-6"
              onClick={() => scrollToSection('misi-tujuan')}
            >
              Kenali Misi Kami
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Badge */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            <Badge className="bg-white/20 text-white border-white/40 backdrop-blur-sm px-3 py-1 text-xs">
              ✓ Fresh & Local
            </Badge>
            <Badge className="bg-white/20 text-white border-white/40 backdrop-blur-sm px-3 py-1 text-xs">
              ✓ Asli Subang
            </Badge>
          </div>
        </div>
      </div>

      {/* Brand Bar - 4 Nilai Utama */}
      <div className="bg-white py-6 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🏆', label: 'Asli Subang' },
              { icon: '🍍', label: 'Segar & Berkualitas' },
              { icon: '🤝', label: 'UMKM Lokal' },
              { icon: '🔒', label: 'Aman & Transparan' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs md:text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* 1. Latar Belakang */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Mengapa NANASU Hadir
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#16A34A] to-[#FACC15] mx-auto rounded-full" />
          </div>

          <Card className="border-2 border-gray-200 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Subang dikenal sebagai sentra <strong className="text-[#16A34A]">nanas madu</strong> berkualitas tinggi. 
                Namun, akses pasar pelaku lokal belum optimal, sementara permintaan produk sehat dan lokal terus meningkat. 
                <strong className="text-[#D4AF37]"> NANASU</strong> lahir untuk menjembatani petani dan UMKM dengan konsumen 
                melalui penjualan online yang <strong>mudah, aman, dan tepercaya</strong>, sekaligus memperkuat identitas 
                komoditas unggulan daerah.
              </p>

              {/* CTA untuk Mitra */}
              <div className="flex justify-center mb-6">
                <Button
                  variant="outline"
                  onClick={() => onNavigate && onNavigate('mitra-landing')}
                  className="border-2 border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Untuk Mitra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Users className="w-6 h-6 text-[#16A34A]" />,
                    text: 'Mendekatkan petani & UMKM ke pasar regional/nasional'
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6 text-[#D4AF37]" />,
                    text: 'Mendorong nilai tambah lewat produk olahan'
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-[#16A34A]" />,
                    text: 'Etalase digital dengan traceability produk'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. Misi & Tujuan */}
        <section id="misi-tujuan">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Misi & Tujuan Kami
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#16A34A] to-[#FACC15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Misi */}
            <Card className="border-2 border-[#16A34A]/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#16A34A]">
                  <Heart className="w-6 h-6" />
                  Misi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  <strong>Memberdayakan petani dan UMKM Subang</strong> melalui platform e-commerce 
                  modern yang cepat, transparan, dan aman.
                </p>
              </CardContent>
            </Card>

            {/* Tujuan */}
            <Card className="border-2 border-[#FACC15]/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#D4AF37]">
                  <Target className="w-6 h-6" />
                  Tujuan Utama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    'Memperluas akses pasar produk nanas Subang',
                    'Meningkatkan pendapatan petani & daya saing UMKM',
                    'Pengalaman belanja efisien: pemesanan → pembayaran → pengiriman',
                    'Membangun identitas daerah "Asli Subang" yang kuat'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. Nilai & Keunikan */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Nilai & Keunikan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Apa yang membuat NANASU berbeda dan dipercaya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8 text-[#16A34A]" />,
                title: 'Asal Terpercaya',
                desc: 'Dari kebun Subang, kualitas terkurasi'
              },
              {
                icon: <Package className="w-8 h-8 text-[#D4AF37]" />,
                title: 'Produk Lengkap',
                desc: 'Segar & olahan (keripik, selai, bundling, PO panen)'
              },
              {
                icon: <Sparkles className="w-8 h-8 text-[#16A34A]" />,
                title: 'Transparansi & Edukasi',
                desc: 'Kenali petani, tips penyimpanan, resep, manfaat'
              },
              {
                icon: <Zap className="w-8 h-8 text-[#D4AF37]" />,
                title: 'Kemudahan Berbelanja',
                desc: 'Antarmuka ramah, e-wallet/VA, pelacakan pesanan'
              }
            ].map((item, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
                <CardContent className="pt-6 pb-6">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Sorotan Analisis Sistem */}
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-10 border-2 border-gray-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Fondasi Sistem NANASU
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Dibangun dengan analisis mendalam untuk memastikan pengalaman terbaik bagi semua pihak
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BPMN */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#16A34A]">
                  <Layers className="w-5 h-5" />
                  Alur Inti (BPMN)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Pilih', 'Pesan', 'Bayar', 'Siap Kirim', 'Terkirim', 'Ulasan'].map((step, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {idx + 1}. {step}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Alur pembelian yang sederhana dan efisien dari awal hingga akhir.
                </p>
              </CardContent>
            </Card>

            {/* CATWOE */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#D4AF37]">
                  <Users className="w-5 h-5" />
                  Fokus Utama (CATWOE)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Pusat:</strong> Pelanggan & Petani
                </p>
                <p className="text-sm text-gray-600">
                  Transformasi dari penjualan tradisional ke digital yang efisien dan adil untuk semua.
                </p>
              </CardContent>
            </Card>

            {/* SWOT */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#16A34A]">
                  <BarChart3 className="w-5 h-5" />
                  Analisis SWOT
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong className="text-[#16A34A]">Kekuatan:</strong>
                  <p className="text-gray-600">Reputasi nanas Subang, bahan baku melimpah, distribusi digital</p>
                </div>
                <div>
                  <strong className="text-[#D4AF37]">Peluang:</strong>
                  <p className="text-gray-600">Tren produk lokal sehat, digitalisasi UMKM, ekspansi nasional</p>
                </div>
              </CardContent>
            </Card>

            {/* PESTLE */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#D4AF37]">
                  <Award className="w-5 h-5" />
                  Lingkungan (PESTLE)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dukungan kebijakan UMKM & digitalisasi</li>
                  <li>• Pertumbuhan ekonomi digital</li>
                  <li>• Preferensi produk lokal sehat</li>
                  <li>• Adopsi teknologi agribisnis</li>
                </ul>
              </CardContent>
            </Card>

            {/* Value Chain */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#16A34A]">
                  <TrendingUp className="w-5 h-5" />
                  Rantai Nilai
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Sortir mutu premium</li>
                  <li>✓ Kemas aman & menarik</li>
                  <li>✓ Distribusi cepat</li>
                  <li>✓ Pemasaran digital kuat</li>
                  <li>✓ Layanan purna jual responsif</li>
                </ul>
              </CardContent>
            </Card>

            {/* CSF */}
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#D4AF37]">
                  <Star className="w-5 h-5" />
                  Faktor Kunci (CSF)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kualitas & kemasan</li>
                  <li>• Platform andal</li>
                  <li>• Logistik tepat waktu</li>
                  <li>• UX mudah & intuitif</li>
                  <li>• Evaluasi berkelanjutan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. Produk & Layanan */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Produk & Layanan
            </h2>
            <p className="text-gray-600">
              Beragam pilihan produk nanas berkualitas untuk setiap kebutuhan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kategori */}
            <Card className="border-2 border-[#16A34A]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#16A34A]" />
                  Kategori Utama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { emoji: '🍍', name: 'Nanas Segar', desc: 'Langsung dari kebun Subang' },
                    { emoji: '🥤', name: 'Produk Olahan', desc: 'Keripik, selai, dodol, minuman' },
                    { emoji: '📦', name: 'Paket Bundling', desc: 'Hemat dan gift package' },
                    { emoji: '📅', name: 'Pre-Order Panen', desc: 'Booking langsung dari panen' }
                  ].map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div>
                        <p className="font-medium text-sm">{cat.name}</p>
                        <p className="text-xs text-gray-600">{cat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fitur Pembeda */}
            <Card className="border-2 border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  Fitur Pembeda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { icon: <Shield className="w-5 h-5" />, text: '"Kenali Petanimu" dengan QR/traceability' },
                    { icon: <Leaf className="w-5 h-5" />, text: 'Konten edukasi: tips, resep, nutrisi' },
                    { icon: <Award className="w-5 h-5" />, text: 'Program loyalitas & komunitas' },
                    { icon: <Star className="w-5 h-5" />, text: 'Sertifikasi mutu & keamanan pangan' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="text-[#16A34A] mt-0.5">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. Dampak & Pemberdayaan */}
        <section className="bg-gradient-to-br from-[#16A34A]/10 to-[#FACC15]/10 rounded-3xl p-8 md:p-12 border-2 border-[#16A34A]/20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Dampak & Pemberdayaan
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Dampak ekonomi lokal meningkat melalui kanal penjualan digital, edukasi pelaku, 
              dan storytelling kebun Subang
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '150+', label: 'Petani & UMKM Terbantu', icon: <Users className="w-8 h-8" /> },
              { value: '25+', label: 'Kota Terjangkau', icon: <MapPin className="w-8 h-8" /> },
              { value: '98%', label: 'Kepuasan Pelanggan', icon: <Star className="w-8 h-8" /> }
            ].map((stat, idx) => (
              <Card key={idx} className="text-center border-2 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8 pb-8">
                  <div className="text-[#16A34A] mb-3 flex justify-center">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-[#16A34A] mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 7. Diferensiasi */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Kenapa NANASU Berbeda?
            </h2>
          </div>

          <Card className="border-2 border-[#D4AF37]/30 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-4">
                {[
                  'Fokus spesifik pada komoditas unggulan Subang',
                  'Transparansi asal produk dengan sistem traceability',
                  'Bundling & pre-order yang menyesuaikan musim panen',
                  'Komunitas pelanggan aktif & program loyalitas',
                  'Edukasi berkelanjutan tentang manfaat nanas',
                  'Kemitraan langsung dengan petani lokal'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#16A34A] to-[#FACC15] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 pt-0.5">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 8. Roadmap */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Roadmap Pengembangan
            </h2>
            <p className="text-gray-600">
              Perjalanan kami menuju platform e-commerce nanas terbaik
            </p>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-[#16A34A] via-[#D4AF37] to-[#FACC15]" />
            
            <div className="grid md:grid-cols-4 gap-6 md:gap-4">
              {[
                {
                  stage: 'Tahap 1',
                  status: 'Done',
                  title: 'MVP Core',
                  items: ['Katalog produk', 'Keranjang belanja', 'Checkout', 'Payment gateway'],
                  color: 'bg-[#16A34A]'
                },
                {
                  stage: 'Tahap 2',
                  status: 'Done',
                  title: 'Integrasi',
                  items: ['Sistem pengiriman', 'Notifikasi real-time', 'Beta testing', 'Bug fixes'],
                  color: 'bg-[#16A34A]'
                },
                {
                  stage: 'Tahap 3',
                  status: 'On-going',
                  title: 'Enhancement',
                  items: ['Program loyalitas', 'Sistem ulasan', 'SEO optimization', 'Performa tuning'],
                  color: 'bg-[#D4AF37]'
                },
                {
                  stage: 'Tahap 4',
                  status: 'Next',
                  title: 'Ekspansi',
                  items: ['Multi-channel', 'Kolaborasi UMKM', 'Edukasi lanjutan', 'Analitik lanjut'],
                  color: 'bg-gray-400'
                }
              ].map((phase, idx) => (
                <div key={idx} className="relative">
                  {/* Milestone Circle */}
                  <div className={`w-10 h-10 ${phase.color} rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 relative z-10 shadow-lg`}>
                    {idx + 1}
                  </div>
                  
                  <Card className="border-2 hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-sm">{phase.stage}</CardTitle>
                        <Badge 
                          variant={phase.status === 'Done' ? 'default' : phase.status === 'On-going' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {phase.status}
                        </Badge>
                      </div>
                      <CardDescription className="font-medium text-gray-900">
                        {phase.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-[#16A34A] mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Tim & Kredit */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Tim & Kredit
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform ini dikembangkan melalui kolaborasi pengembang, petani/UMKM Subang, 
              dan dukungan akademik
            </p>
          </div>

          {/* Peran Inti */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: <Zap className="w-6 h-6" />, role: 'Product & Tech', desc: 'Pengembangan platform & fitur' },
              { icon: <Truck className="w-6 h-6" />, role: 'Operasional & Logistik', desc: 'Manajemen distribusi' },
              { icon: <Users className="w-6 h-6" />, role: 'Kemitraan Petani', desc: 'Koordinasi dengan petani' },
              { icon: <TrendingUp className="w-6 h-6" />, role: 'Pemasaran & Komunitas', desc: 'Brand & engagement' }
            ].map((role, idx) => (
              <Card key={idx} className="text-center border-2 hover:shadow-lg transition-all">
                <CardContent className="pt-6 pb-6">
                  <div className="text-[#16A34A] mb-3 flex justify-center">{role.icon}</div>
                  <h3 className="font-semibold mb-1">{role.role}</h3>
                  <p className="text-xs text-gray-600">{role.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Logo Watermark */}
          <div className="text-center p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200">
            <Logo size={48} showWordmark className="mx-auto mb-4" />
            <Separator className="my-4 max-w-xs mx-auto" />
            <p className="text-xs md:text-sm text-gray-500">
              Created by <span className="font-medium text-gray-700">5B PSTI'23</span> © 2025
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
