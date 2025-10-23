import { useState } from 'react';
import { ChevronLeft, Filter, Star, Truck } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ProductCard } from '../ProductCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function FreshPage({ onBack, onProductClick, onAddToCart }) {
  const [sortBy, setSortBy] = useState('popular');
  const [filterBy, setFilterBy] = useState('all');

  // Data produk nanas segar
  const freshProducts = [
    {
      id: 1,
      name: 'Nanas Madu Premium Grade A - 1kg',
      price: 35000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 124,
      badges: ['Asli Subang', 'Panen Minggu Ini'],
      stock: 15,
      category: 'fresh',
      farmer: 'Pak Dedi Subang',
      description: 'Nanas madu premium dengan rasa manis alami, dipanen langsung dari kebun petani Subang'
    },
    {
      id: 4,
      name: 'Nanas Baby Sweet 500gr',
      price: 25000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1735052963684-f9e1f4f3ba38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pJTIwcGluZWFwcGxlJTIwYmFieSUyMGZydWl0fGVufDF8fHx8MTc1OTgwMTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 45,
      badges: ['Asli Subang'],
      stock: 12,
      category: 'fresh',
      farmer: 'Bu Sari Wijaya',
      description: 'Nanas baby ukuran mini dengan rasa super manis, cocok untuk camilan sehat'
    },
    {
      id: 8,
      name: 'Nanas Organik Premium 2kg',
      price: 65000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 92,
      badges: ['Asli Subang', 'Organik'],
      stock: 6,
      category: 'fresh',
      farmer: 'Kelompok Tani Organik',
      description: 'Nanas organik premium tanpa pestisida, dibudidayakan dengan metode ramah lingkungan'
    },
    {
      id: 10,
      name: 'Nanas Potong Siap Saji 1kg',
      price: 40000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbGljZXMlMjBmcmVzaCUyMGN1dHxlbnwxfHx8fDE3NTk4MDEwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviewCount: 56,
      badges: ['Asli Subang', 'Ready to Eat'],
      stock: 14,
      category: 'fresh',
      farmer: 'CV Nanas Segar',
      description: 'Nanas segar yang telah dipotong higienis, siap dikonsumsi langsung'
    },
    {
      id: 13,
      name: 'Nanas Super Sweet Grade AA 1,5kg',
      price: 50000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 198,
      badges: ['Asli Subang', 'Premium', 'Extra Sweet'],
      stock: 9,
      category: 'fresh',
      farmer: 'Pak Wahyu Premium',
      description: 'Nanas grade AA dengan kadar gula tertinggi, varietas unggul dari Subang'
    },
    {
      id: 16,
      name: 'Nanas Mini Honey 8pcs',
      price: 35000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1735052963684-f9e1f4f3ba38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pJTIwcGluZWFwcGxlJTIwYmFieSUyMGZydWl0fGVufDF8fHx8MTc1OTgwMTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviewCount: 67,
      badges: ['Asli Subang', 'Premium', 'Mini Size'],
      stock: 16,
      category: 'fresh',
      farmer: 'Pak Iwan',
      description: 'Paket 8 buah nanas mini honey dengan rasa manis seperti madu alami'
    }
  ];

  const filteredProducts = filterBy === 'all' ? freshProducts : 
    freshProducts.filter(product => {
      if (filterBy === 'premium') return product.badges.includes('Premium');
      if (filterBy === 'organic') return product.badges.includes('Organik');
      if (filterBy === 'mini') return product.badges.includes('Mini Size');
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
                <h1 className="font-semibold text-lg md:text-xl">🍍 Nanas Segar</h1>
                <p className="text-xs text-gray-500">Langsung dari kebun petani Subang</p>
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
          className="mb-6 border-[#FACC15]/20 overflow-hidden relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1585537358069-c67a7a471cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMG1hcmtldCUyMG9yZ2FuaWN8ZW58MXx8fHwxNzYwOTcwOTMyfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/85 to-[#16A34A]/85" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🍍</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">Nanas Segar Premium Subang</h2>
                <p className="text-white/90 mb-3">
                  Nikmati kelezatan nanas segar langsung dari kebun petani Subang. Dipilih khusus dengan kualitas terbaik dan rasa manis alami.
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span>Gratis ongkir min. Rp 75.000</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                    <span>Rating rata-rata 4.7/5</span>
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
            className={filterBy === 'all' ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]' : ''}
          >
            Semua ({freshProducts.length})
          </Button>
          <Button
            variant={filterBy === 'premium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('premium')}
            className={filterBy === 'premium' ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]' : ''}
          >
            Premium
          </Button>
          <Button
            variant={filterBy === 'organic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('organic')}
            className={filterBy === 'organic' ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]' : ''}
          >
            Organik
          </Button>
          <Button
            variant={filterBy === 'mini' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('mini')}
            className={filterBy === 'mini' ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]' : ''}
          >
            Mini Size
          </Button>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1F2937]">
              {filterBy === 'all' ? 'Semua Produk' : 
               filterBy === 'premium' ? 'Produk Premium' :
               filterBy === 'organic' ? 'Produk Organik' :
               'Produk Mini Size'}
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

        {/* Benefits Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Keunggulan Nanas Segar NANASU</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🌱</div>
                <h4 className="font-medium mb-2">Langsung dari Kebun</h4>
                <p className="text-sm text-gray-600">Dipetik langsung dari kebun petani Subang untuk menjamin kesegaran</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🍯</div>
                <h4 className="font-medium mb-2">Rasa Manis Alami</h4>
                <p className="text-sm text-gray-600">Kadar gula alami tinggi tanpa tambahan pemanis buatan</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📦</div>
                <h4 className="font-medium mb-2">Kemasan Aman</h4>
                <p className="text-sm text-gray-600">Dikemas dengan hati-hati untuk menjaga kualitas hingga ke tangan Anda</p>
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