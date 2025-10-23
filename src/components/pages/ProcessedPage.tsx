import { useState } from 'react';
import { ChevronLeft, Award, Heart, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ProductCard } from '../ProductCard';

export function ProcessedPage({ onBack, onProductClick, onAddToCart }) {
  const [sortBy, setSortBy] = useState('popular');
  const [filterBy, setFilterBy] = useState('all');

  // Data produk olahan nanas
  const processedProducts = [
    {
      id: 3,
      name: 'Jus Nanas Segar 500ml',
      price: 15000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviewCount: 67,
      badges: ['Olahan UMKM'],
      stock: 25,
      category: 'processed',
      farmer: 'UMKM Sari Buah',
      description: 'Jus nanas segar 100% tanpa pengawet dan tambahan gula'
    },
    {
      id: 5,
      name: 'Keripik Nanas Original 200gr',
      price: 22000,
      originalPrice: 28000,
      image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviewCount: 78,
      badges: ['Olahan UMKM', 'Diskon'],
      discount: 21,
      stock: 30,
      category: 'processed',
      farmer: 'Bu Sari Makmur',
      description: 'Keripik nanas renyah tanpa MSG, digoreng dengan minyak pilihan'
    },
    {
      id: 7,
      name: 'Manisan Nanas Tradisional 250gr',
      price: 18000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYW5kaWVkJTIwc3dlZXQlMjBzbmFja3xlbnwxfHx8fDE3NTk4MDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.4,
      reviewCount: 34,
      badges: ['Olahan UMKM'],
      stock: 18,
      category: 'processed',
      farmer: 'Ibu Tini Tradisional',
      description: 'Manisan nanas tradisional dengan resep turun temurun'
    },
    {
      id: 9,
      name: 'Smoothie Nanas Mix Tropical 400ml',
      price: 20000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1564956213070-84f5a0cb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbW9vdGhpZSUyMGhlYWx0aHklMjBkcmlua3xlbnwxfHx8fDE3NTk4MDEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviewCount: 89,
      badges: ['Olahan UMKM', 'Fresh'],
      stock: 22,
      category: 'processed',
      farmer: 'Healthy Smoothie Co',
      description: 'Smoothie nanas mix dengan buah tropis lainnya, kaya vitamin'
    },
    {
      id: 12,
      name: 'Jus Nanas Botol 1 Liter',
      price: 25000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 72,
      badges: ['Olahan UMKM', 'Family Size'],
      stock: 18,
      category: 'processed',
      farmer: 'CV Nanas Fresh',
      description: 'Jus nanas kemasan 1 liter, cocok untuk keluarga'
    },
    {
      id: 14,
      name: 'Keripik Nanas Pedas Manis 150gr',
      price: 18000,
      originalPrice: 23000,
      image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.4,
      reviewCount: 83,
      badges: ['Olahan UMKM', 'Diskon', 'Spicy'],
      discount: 22,
      stock: 27,
      category: 'processed',
      farmer: 'Keripik Nusantara',
      description: 'Keripik nanas dengan rasa pedas manis yang unik dan nagih'
    },
    {
      id: 17,
      name: 'Selai Nanas Homemade 300gr',
      price: 24000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYW5kaWVkJTIwc3dlZXQlMjBzbmFja3xlbnwxfHx8fDE3NTk4MDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviewCount: 43,
      badges: ['Olahan UMKM', 'Homemade'],
      stock: 21,
      category: 'processed',
      farmer: 'Dapur Rumahan Sari',
      description: 'Selai nanas homemade tanpa pengawet, cocok untuk roti dan kue'
    }
  ];

  const filteredProducts = filterBy === 'all' ? processedProducts : 
    processedProducts.filter(product => {
      if (filterBy === 'juice') return product.name.toLowerCase().includes('jus') || product.name.toLowerCase().includes('smoothie');
      if (filterBy === 'snack') return product.name.toLowerCase().includes('keripik') || product.name.toLowerCase().includes('manisan');
      if (filterBy === 'homemade') return product.badges.includes('Homemade');
      return true;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // popular
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      {/* Header */}
      <div className="sticky top-16 md:top-16 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12 md:h-14">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-lg md:text-xl">🥤 Olahan Nanas</h1>
                <p className="text-xs text-gray-500">Produk olahan berkualitas dari UMKM Subang</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white"
              >
                <option value="popular">Terpopuler</option>
                <option value="newest">Terbaru</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Info Banner */}
        <Card 
          className="mb-6 border-orange-200 overflow-hidden relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGRyaW5rJTIwcHJvY2Vzc2luZ3xlbnwxfHx8fDE3NjA5NzA5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/85 to-yellow-600/85" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🥤</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">Produk Olahan Nanas UMKM Subang</h2>
                <p className="text-white/90 mb-3">
                  Nikmati berbagai produk olahan nanas berkualitas dari UMKM binaan NANASU. Dari jus segar hingga keripik renyah, semuanya dibuat dengan resep tradisional dan standar higienis.
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>Produk bersertifikat UMKM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>Mendukung ekonomi lokal</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={filterBy === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('all')}
            className={filterBy === 'all' ? 'bg-orange-500 hover:bg-orange-500/90 text-white' : ''}
          >
            Semua ({processedProducts.length})
          </Button>
          <Button
            variant={filterBy === 'juice' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('juice')}
            className={filterBy === 'juice' ? 'bg-orange-500 hover:bg-orange-500/90 text-white' : ''}
          >
            🧃 Minuman
          </Button>
          <Button
            variant={filterBy === 'snack' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('snack')}
            className={filterBy === 'snack' ? 'bg-orange-500 hover:bg-orange-500/90 text-white' : ''}
          >
            🍪 Camilan
          </Button>
          <Button
            variant={filterBy === 'homemade' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('homemade')}
            className={filterBy === 'homemade' ? 'bg-orange-500 hover:bg-orange-500/90 text-white' : ''}
          >
            🏠 Homemade
          </Button>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1F2937]">
              {filterBy === 'all' ? 'Semua Produk Olahan' : 
               filterBy === 'juice' ? 'Minuman Nanas' :
               filterBy === 'snack' ? 'Camilan Nanas' :
               'Produk Homemade'}
            </h3>
            <span className="text-sm text-gray-500">
              {sortedProducts.length} produk ditemukan
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>

        {/* UMKM Partners Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Keunggulan Produk Olahan NANASU</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🏭</div>
                <h4 className="font-medium mb-2">Standar Higienis</h4>
                <p className="text-sm text-gray-600">Diproduksi dengan standar kebersihan dan keamanan pangan yang ketat</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-medium mb-2">Mendukung UMKM</h4>
                <p className="text-sm text-gray-600">Setiap pembelian mendukung pemberdayaan UMKM lokal Subang</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🌟</div>
                <h4 className="font-medium mb-2">Resep Tradisional</h4>
                <p className="text-sm text-gray-600">Menggunakan resep turun temurun dengan cita rasa autentik</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UMKM Partnership Info */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Program Pemberdayaan UMKM NANASU</h4>
                <p className="text-blue-800 text-sm mb-3">
                  NANASU bermitra dengan 25+ UMKM di Subang untuk menghasilkan produk olahan berkualitas. 
                  Setiap pembelian Anda membantu meningkatkan kesejahteraan petani dan pengrajin lokal.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600 hover:bg-blue-600">15+ Resep Tradisional</Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-600">Sertifikat Halal</Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-600">PIRT Terdaftar</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Load More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Muat Lebih Banyak
          </Button>
        </div>
      </div>
    </div>
  );
}