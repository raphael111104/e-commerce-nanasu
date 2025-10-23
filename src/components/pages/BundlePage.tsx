import { useState } from 'react';
import { ChevronLeft, Gift, Percent, Users, Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ProductCard } from '../ProductCard';

export function BundlePage({ onBack, onProductClick, onAddToCart }) {
  const [sortBy, setSortBy] = useState('discount');
  const [filterBy, setFilterBy] = useState('all');

  // Data produk paket bundling
  const bundleProducts = [
    {
      id: 2,
      name: 'Paket Bundling Keluarga - 3kg Mix',
      price: 85000,
      originalPrice: 105000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 89,
      badges: ['Asli Subang', 'Diskon'],
      discount: 19,
      stock: 8,
      category: 'bundle',
      farmer: 'Kelompok Tani Sejahtera',
      description: 'Paket 3kg berisi campuran nanas Grade A dan B, cocok untuk keluarga besar',
      contents: ['2kg Nanas Grade A', '1kg Nanas Grade B', 'Free 2 botol jus'],
      savings: 20000
    },
    {
      id: 11,
      name: 'Paket Bundle Premium 5kg',
      price: 120000,
      originalPrice: 150000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 143,
      badges: ['Asli Subang', 'Diskon', 'Best Seller'],
      discount: 20,
      stock: 5,
      category: 'bundle',
      farmer: 'Kelompok Tani Premium',
      description: 'Paket premium 5kg dengan kualitas terbaik untuk acara spesial',
      contents: ['3kg Nanas Super Sweet', '2kg Nanas Honey', 'Free keripik nanas', 'Free tas kain NANASU'],
      savings: 30000
    },
    {
      id: 21,
      name: 'Paket Starter - 2kg Fresh Mix',
      price: 55000,
      originalPrice: 70000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviewCount: 65,
      badges: ['Asli Subang', 'Hemat', 'Starter Pack'],
      discount: 21,
      stock: 15,
      category: 'bundle',
      farmer: 'CV Nanas Subang',
      description: 'Paket starter untuk yang ingin mencoba berbagai varietas',
      contents: ['1kg Nanas MD2', '1kg Nanas Baby Sweet', 'Free jus 500ml'],
      savings: 15000
    },
    {
      id: 22,
      name: 'Paket Juara - 10kg Grosir',
      price: 220000,
      originalPrice: 280000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 34,
      badges: ['Grosir', 'Super Hemat', 'Bulk Order'],
      discount: 21,
      stock: 3,
      category: 'bundle',
      farmer: 'Aliansi Petani Subang',
      description: 'Paket grosir untuk warung, kantin, atau acara besar',
      contents: ['6kg Nanas Grade A', '4kg Nanas Grade B', 'Free 10 botol jus', 'Free ongkir'],
      savings: 60000
    },
    {
      id: 23,
      name: 'Paket Olahan Komplit',
      price: 95000,
      originalPrice: 125000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3cw&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 78,
      badges: ['Mix Products', 'Try All', 'UMKM Support'],
      discount: 24,
      stock: 12,
      category: 'bundle',
      farmer: 'Kolaborasi UMKM',
      description: 'Paket lengkap berisi nanas segar dan berbagai produk olahan',
      contents: ['2kg Nanas Segar', '3 botol jus 500ml', '2 pack keripik', '2 jar selai'],
      savings: 30000
    },
    {
      id: 24,
      name: 'Paket Gift Premium',
      price: 175000,
      originalPrice: 210000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 45,
      badges: ['Gift Box', 'Premium', 'Limited Edition'],
      discount: 17,
      stock: 8,
      category: 'bundle',
      farmer: 'NANASU Premium Collection',
      description: 'Paket hadiah mewah dalam kemasan eksklusif untuk orang tersayang',
      contents: ['3kg Nanas Super Premium', '1 set produk olahan premium', 'Gift box eksklusif', 'Kartu ucapan'],
      savings: 35000
    }
  ];

  const filteredProducts = filterBy === 'all' ? bundleProducts : 
    bundleProducts.filter(product => {
      if (filterBy === 'family') return product.name.toLowerCase().includes('keluarga') || product.name.toLowerCase().includes('starter');
      if (filterBy === 'premium') return product.badges.includes('Premium') || product.badges.includes('Best Seller');
      if (filterBy === 'bulk') return product.badges.includes('Grosir') || product.name.toLowerCase().includes('grosir');
      return true;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      case 'savings':
        return (b.savings || 0) - (a.savings || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default: // discount
        return (b.discount || 0) - (a.discount || 0);
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
                <h1 className="font-semibold text-lg md:text-xl">📦 Paket Bundling</h1>
                <p className="text-xs text-gray-500">Hemat lebih banyak dengan paket pilihan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white"
              >
                <option value="discount">Diskon Terbesar</option>
                <option value="savings">Penghematan Terbesar</option>
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
          className="mb-6 border-purple-200 overflow-hidden relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1673573032549-8394cf9282f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBwYWNrYWdlJTIwYm94fGVufDF8fHx8MTc2MDk3MDkzMXww&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/85 to-pink-700/85" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📦</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">Paket Bundling Hemat NANASU</h2>
                <p className="text-white/90 mb-3">
                  Dapatkan harga terbaik dengan paket bundling pilihan kami. Cocok untuk keluarga, acara, atau kebutuhan grosir. 
                  Hemat hingga 30% dibanding beli satuan!
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Percent className="w-4 h-4" />
                    <span>Hemat hingga 30%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    <span>Bonus produk gratis</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings Calculator */}
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 mb-1">💰 Total Penghematan Hari Ini</h3>
                <p className="text-green-800 text-sm">
                  Dengan membeli paket bundling, Anda berpotensi menghemat hingga <span className="font-bold">Rp 60.000</span> dibanding beli satuan!
                </p>
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
            className={filterBy === 'all' ? 'bg-purple-500 hover:bg-purple-500/90 text-white' : ''}
          >
            Semua ({bundleProducts.length})
          </Button>
          <Button
            variant={filterBy === 'family' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('family')}
            className={filterBy === 'family' ? 'bg-purple-500 hover:bg-purple-500/90 text-white' : ''}
          >
            👨‍👩‍👧‍👦 Keluarga
          </Button>
          <Button
            variant={filterBy === 'premium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('premium')}
            className={filterBy === 'premium' ? 'bg-purple-500 hover:bg-purple-500/90 text-white' : ''}
          >
            ⭐ Premium
          </Button>
          <Button
            variant={filterBy === 'bulk' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('bulk')}
            className={filterBy === 'bulk' ? 'bg-purple-500 hover:bg-purple-500/90 text-white' : ''}
          >
            📦 Grosir
          </Button>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#1F2937]">
              {filterBy === 'all' ? 'Semua Paket Bundling' : 
               filterBy === 'family' ? 'Paket Keluarga' :
               filterBy === 'premium' ? 'Paket Premium' :
               'Paket Grosir'}
            </h3>
            <span className="text-sm text-gray-500">
              {sortedProducts.length} paket tersedia
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
                    <Badge className="bg-red-500 hover:bg-red-500 text-white">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 hover:bg-green-500 text-white">
                      Hemat Rp {product.savings.toLocaleString('id-ID')}
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

                  {/* Bundle Contents */}
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Isi Paket:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.contents.map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-bold text-lg text-red-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      Rp {product.originalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Rating and Stock */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{product.rating}</span>
                      <span>({product.reviewCount})</span>
                    </div>
                    <span>Stok: {product.stock}</span>
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
                      className="flex-1 bg-purple-500 hover:bg-purple-500/90"
                      onClick={() => onAddToCart(product)}
                    >
                      + Keranjang
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
            <h3 className="font-bold text-lg text-gray-900 mb-4">Keuntungan Paket Bundling NANASU</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-medium mb-2">Hemat Hingga 30%</h4>
                <p className="text-sm text-gray-600">Harga jauh lebih murah dibanding beli satuan</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎁</div>
                <h4 className="font-medium mb-2">Bonus Gratis</h4>
                <p className="text-sm text-gray-600">Dapatkan produk bonus di setiap paket bundling</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📦</div>
                <h4 className="font-medium mb-2">Kemasan Praktis</h4>
                <p className="text-sm text-gray-600">Dikemas dalam satu paket untuk kemudahan pengiriman</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Load More Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Muat Paket Lainnya
          </Button>
        </div>
      </div>
    </div>
  );
}