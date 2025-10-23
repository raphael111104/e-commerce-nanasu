import { useState } from 'react';
import { ChevronLeft, Calendar, Clock, TrendingDown, MapPin, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ProductCard } from '../ProductCard';

export function PreOrderPage({ onBack, onProductClick, onAddToCart }) {
  const [sortBy, setSortBy] = useState('harvest');
  const [filterBy, setFilterBy] = useState('all');

  // Data produk pre-order
  const preOrderProducts = [
    {
      id: 6,
      name: 'Pre-Order Nanas Panen Januari',
      price: 30000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 156,
      badges: ['Pre-Order', 'Asli Subang'],
      stock: null,
      category: 'preorder',
      farmer: 'Pak Dedi & Kelompok Tani',
      harvestDate: '15-30 Januari 2025',
      deliveryDate: '1-5 Februari 2025',
      location: 'Kebun Cijambe, Subang',
      discount: 14,
      description: 'Pesan sekarang untuk mendapat nanas segar langsung dari panen Januari dengan harga spesial'
    },
    {
      id: 15,
      name: 'Pre-Order Nanas Panen Februari',
      price: 32000,
      originalPrice: 38000,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 234,
      badges: ['Pre-Order', 'Asli Subang', 'Early Bird'],
      stock: null,
      category: 'preorder',
      farmer: 'Bu Sri & Kelompok Wanita Tani',
      harvestDate: '10-25 Februari 2025',
      deliveryDate: '28 Feb - 5 Mar 2025',
      location: 'Kebun Pamanukan, Subang',
      discount: 16,
      description: 'Dapatkan harga early bird untuk panen Februari dengan kualitas premium'
    },
    {
      id: 25,
      name: 'Pre-Order Nanas Organik Maret',
      price: 45000,
      originalPrice: 55000,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 87,
      badges: ['Pre-Order', 'Organik', 'Premium'],
      stock: null,
      category: 'preorder',
      farmer: 'Kelompok Tani Organik Subang',
      harvestDate: '15-30 Maret 2025',
      deliveryDate: '1-7 April 2025',
      location: 'Kebun Organik Tanjungsiang',
      discount: 18,
      description: 'Nanas organik tanpa pestisida, dibudidayakan dengan metode ramah lingkungan'
    },
    {
      id: 26,
      name: 'Pre-Order Nanas MD2 Premium April',
      price: 38000,
      originalPrice: 45000,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 112,
      badges: ['Pre-Order', 'MD2 Variety', 'Super Sweet'],
      stock: null,
      category: 'preorder',
      farmer: 'CV Nanas Unggul Subang',
      harvestDate: '20 April - 5 Mei 2025',
      deliveryDate: '7-12 Mei 2025',
      location: 'Kebun Binong, Subang',
      discount: 16,
      description: 'Varietas MD2 dengan rasa extra manis dan aroma harum yang khas'
    },
    {
      id: 27,
      name: 'Pre-Order Paket Bundle 5kg Mei',
      price: 140000,
      originalPrice: 175000,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 45,
      badges: ['Pre-Order', 'Bundle Package', 'Best Value'],
      stock: null,
      category: 'preorder',
      farmer: 'Aliansi Petani Subang',
      harvestDate: '15-31 Mei 2025',
      deliveryDate: '1-8 Juni 2025',
      location: 'Multi Kebun Subang',
      discount: 20,
      description: 'Paket 5kg campuran berbagai varietas terbaik dengan harga spesial'
    },
    {
      id: 28,
      name: 'Pre-Order Nanas Baby Sweet Juni',
      price: 28000,
      originalPrice: 33000,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviewCount: 78,
      badges: ['Pre-Order', 'Baby Sweet', 'Mini Size'],
      stock: null,
      category: 'preorder',
      farmer: 'Petani Khusus Mini Pineapple',
      harvestDate: '10-25 Juni 2025',
      deliveryDate: '27 Juni - 3 Juli 2025',
      location: 'Kebun Kalijati, Subang',
      discount: 15,
      description: 'Nanas baby sweet ukuran mini dengan rasa manis yang intensif'
    }
  ];

  const filteredProducts = filterBy === 'all' ? preOrderProducts : 
    preOrderProducts.filter(product => {
      if (filterBy === 'january') return product.name.includes('Januari');
      if (filterBy === 'organic') return product.badges.includes('Organik');
      if (filterBy === 'bundle') return product.badges.includes('Bundle Package');
      return true;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'harvest':
        // Sort by harvest date (earlier first)
        return new Date(a.harvestDate.split('-')[0] + ' 2025') - new Date(b.harvestDate.split('-')[0] + ' 2025');
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(a.harvestDate.split('-')[0] + ' 2025') - new Date(b.harvestDate.split('-')[0] + ' 2025');
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
                <h1 className="font-semibold text-lg md:text-xl">📅 Pre-Order Panen</h1>
                <p className="text-xs text-gray-500">Pesan sekarang, terima saat panen</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white"
              >
                <option value="harvest">Waktu Panen</option>
                <option value="discount">Diskon Terbesar</option>
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
          className="mb-6 border-blue-200 overflow-hidden relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617106399900-61a7561d1d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHBsYW5uaW5nJTIwc2NoZWR1bGV8ZW58MXx8fHwxNzYwODk1Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/85 to-cyan-700/85" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📅</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">Pre-Order Panen Nanas Subang</h2>
                <p className="text-white/90 mb-3">
                  Dapatkan nanas segar langsung dari kebun dengan sistem pre-order. Pesan sekarang dengan harga spesial, 
                  terima saat waktu panen tiba. Dijamin 100% fresh dari pohon!
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    <span>Harga lebih murah 15-20%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    <span>Notifikasi waktu panen</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How Pre-Order Works */}
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">🚀 Cara Kerja Pre-Order</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">1️⃣</div>
                <h4 className="font-medium mb-1">Pesan Sekarang</h4>
                <p className="text-xs text-gray-600">Pilih produk dan lakukan pembayaran</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">2️⃣</div>
                <h4 className="font-medium mb-1">Pantau Perkembangan</h4>
                <p className="text-xs text-gray-600">Dapatkan update progress penanaman</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">3️⃣</div>
                <h4 className="font-medium mb-1">Notifikasi Panen</h4>
                <p className="text-xs text-gray-600">Kami kabari saat mulai dipanen</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">4️⃣</div>
                <h4 className="font-medium mb-1">Terima Fresh</h4>
                <p className="text-xs text-gray-600">Nanas langsung dikirim ke alamat Anda</p>
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
            className={filterBy === 'all' ? 'bg-blue-500 hover:bg-blue-500/90 text-white' : ''}
          >
            Semua ({preOrderProducts.length})
          </Button>
          <Button
            variant={filterBy === 'january' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('january')}
            className={filterBy === 'january' ? 'bg-blue-500 hover:bg-blue-500/90 text-white' : ''}
          >
            🗓️ Januari
          </Button>
          <Button
            variant={filterBy === 'organic' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('organic')}
            className={filterBy === 'organic' ? 'bg-blue-500 hover:bg-blue-500/90 text-white' : ''}
          >
            🌱 Organik
          </Button>
          <Button
            variant={filterBy === 'bundle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('bundle')}
            className={filterBy === 'bundle' ? 'bg-blue-500 hover:bg-blue-500/90 text-white' : ''}
          >
            📦 Paket
          </Button>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1F2937]">
              {filterBy === 'all' ? 'Semua Pre-Order' : 
               filterBy === 'january' ? 'Panen Januari' :
               filterBy === 'organic' ? 'Pre-Order Organik' :
               'Paket Pre-Order'}
            </h3>
            <span className="text-sm text-gray-500">
              {sortedProducts.length} slot tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500 hover:bg-blue-500 text-white">
                      Pre-Order
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-red-500 hover:bg-red-500 text-white">
                      -{product.discount}%
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Farmer & Location */}
                  <div className="mb-3 space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="font-medium">Petani:</span>
                      <span>{product.farmer}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{product.location}</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-green-600" />
                        <span className="font-medium">Panen:</span>
                        <span className="text-green-600">{product.harvestDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span className="font-medium">Kirim:</span>
                        <span className="text-blue-600">{product.deliveryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-bold text-lg text-blue-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <span className="text-yellow-400">★</span>
                    <span>{product.rating}</span>
                    <span>({product.reviewCount} pre-order sebelumnya)</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => onProductClick(product)}
                    >
                      Lihat Detail
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-500 hover:bg-blue-500/90"
                      onClick={() => onAddToCart(product)}
                    >
                      Pre-Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Keuntungan Pre-Order NANASU</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-medium mb-2">Harga Lebih Murah</h4>
                <p className="text-sm text-gray-600">Dapatkan diskon hingga 20% dari harga normal</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🌱</div>
                <h4 className="font-medium mb-2">100% Fresh</h4>
                <p className="text-sm text-gray-600">Langsung dari pohon ke tangan Anda</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-medium mb-2">Update Real-time</h4>
                <p className="text-sm text-gray-600">Pantau perkembangan tanaman melalui aplikasi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Load More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Lihat Slot Pre-Order Lainnya
          </Button>
        </div>
      </div>
    </div>
  );
}