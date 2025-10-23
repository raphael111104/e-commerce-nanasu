import { ArrowRight, Package, TrendingUp, Wallet, Clock, Shield, CheckCircle2, BarChart3, Truck, Users, ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';

export function MitraLandingPage({ onNavigate }) {
  const benefits = [
    {
      icon: <Package className="w-8 h-8 text-[#16A34A]" />,
      title: 'Upload Produk Mudah',
      description: 'Kelola katalog produk Anda dalam hitungan menit dengan antarmuka sederhana'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#D4AF37]" />,
      title: 'Pantau Penjualan',
      description: 'Dashboard real-time untuk memantau pesanan, pengiriman, dan performa'
    },
    {
      icon: <Wallet className="w-8 h-8 text-[#16A34A]" />,
      title: 'Payout Terjadwal',
      description: 'Tarik pendapatan secara aman dengan jadwal pencairan yang jelas'
    }
  ];

  const steps = [
    {
      number: '1',
      icon: <Users className="w-6 h-6" />,
      title: 'Daftar',
      description: 'Isi data profil bisnis Anda'
    },
    {
      number: '2',
      icon: <Package className="w-6 h-6" />,
      title: 'Upload Produk',
      description: 'Tambahkan katalog produk nanas'
    },
    {
      number: '3',
      icon: <Truck className="w-6 h-6" />,
      title: 'Kelola Pesanan',
      description: 'Proses dan kirim pesanan pelanggan'
    },
    {
      number: '4',
      icon: <Wallet className="w-6 h-6" />,
      title: 'Terima Pembayaran',
      description: 'Dapatkan payout terjadwal rutin'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#16A34A] via-[#16A34A]/95 to-[#D4AF37]/90 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-10 text-8xl hidden md:block">🍍</div>
        <div className="absolute bottom-10 left-10 opacity-10 text-7xl hidden md:block">📦</div>
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('about')}
            className="text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <Badge className="bg-white/20 text-white border-white/40 backdrop-blur-sm mb-4">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Platform Mitra NANASU
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Bergabung sebagai<br />Mitra NANASU
              </h1>
              
              <p className="text-lg md:text-xl mb-6 opacity-95 leading-relaxed">
                Jual produk nanas dan turunannya ke lebih banyak pelanggan. Perluas jangkauan pasar Anda bersama platform e-commerce terpercaya.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 mb-8">
                {[
                  'Upload produk dalam hitungan menit',
                  'Pantau pesanan dan pengiriman real-time',
                  'Tarik payout terjadwal dengan aman'
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-base">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => onNavigate('mitra-onboarding')}
                  className="bg-white text-[#16A34A] hover:bg-gray-100 shadow-xl"
                >
                  Daftar Mitra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('mitra-login')}
                  className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                >
                  Masuk Mitra
                </Button>
              </div>
            </div>

            {/* Right: Stats Card Preview */}
            <div className="hidden md:block">
              <Card className="border-2 border-white/20 shadow-2xl backdrop-blur-sm bg-white/10">
                <CardContent className="p-6">
                  <div className="text-white mb-4">
                    <h3 className="text-sm font-medium mb-3 opacity-90">Ringkasan Performa Mitra</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                      <div className="text-3xl font-bold text-white mb-1">128</div>
                      <div className="text-xs text-white/90">Pesanan Bulan Ini</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                      <div className="text-3xl font-bold text-white mb-1">96%</div>
                      <div className="text-xs text-white/90">On-time Shipment</div>
                    </div>
                    <div className="col-span-2 bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                      <div className="text-2xl font-bold text-white mb-1">Rp 14.250.000</div>
                      <div className="text-xs text-white/90">Pendapatan Perkiraan</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
                    <BarChart3 className="w-4 h-4" />
                    <span>Data real-time dari dashboard mitra</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Kenapa Bergabung?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#16A34A] to-[#FACC15] mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <Card key={idx} className="border-2 border-gray-200 hover:border-[#16A34A] hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#16A34A]/10 to-[#FACC15]/10 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Cara Kerja
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#16A34A] to-[#FACC15] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <Card className="border-2 border-gray-200 h-full">
                  <CardContent className="p-6 text-center">
                    {/* Step Number */}
                    <div className="mb-4 flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A34A] to-[#D4AF37] text-white flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-3 flex justify-center text-[#16A34A]">
                      {step.icon}
                    </div>
                    
                    <h3 className="font-semibold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow Connector (Desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="text-lg mb-6 opacity-95">
            Bergabung dengan ratusan mitra NANASU lainnya dan kembangkan bisnis Anda
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('mitra-onboarding')}
              className="bg-white text-[#16A34A] hover:bg-gray-100 shadow-xl"
            >
              Daftar Sekarang
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              Punya Pertanyaan?
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-center text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Keamanan Terjamin</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Proses Cepat</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Gratis Bergabung</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
