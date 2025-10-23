import { useState } from 'react';
import { ChevronLeft, Filter, Grid3X3, List, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ProductCard } from '../ProductCard';

const categories = [
  {
    id: 'fresh',
    name: 'Nanas Segar',
    count: 4,
    color: 'bg-[#16A34A]'
  },
  {
    id: 'processed',
    name: 'Olahan Nanas',
    count: 2,
    color: 'bg-[#FACC15]'
  },
  {
    id: 'dried',
    name: 'Nanas Kering',
    count: 3,
    color: 'bg-orange-500'
  },
  {
    id: 'juice',
    name: 'Jus & Minuman',
    count: 4,
    color: 'bg-blue-500'
  },
  {
    id: 'snacks',
    name: 'Snack Nanas',
    count: 3,
    color: 'bg-purple-500'
  },
  {
    id: 'bundle',
    name: 'Paket Bundling',
    count: 2,
    color: 'bg-red-500'
  }
];

const products = [
  {
    id: 1,
    name: 'Nanas MD2 Premium',
    price: 25000,
    originalPrice: 30000,
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 45,
    sold: 120,
    category: 'fresh',
    badges: ['Asli Subang', 'Fresh'],
    farmer: 'Pak Dedi',
    stock: 25
  },
  {
    id: 2,
    name: 'Keripik Nanas Original',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 32,
    sold: 95,
    category: 'snacks',
    badges: ['Crispy', 'No MSG'],
    farmer: 'Bu Sari',
    stock: 18
  },
  {
    id: 3,
    name: 'Selai Nanas Homemade',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYW5kaWVkJTIwc3dlZXQlMjBzbmFja3xlbnwxfHx8fDE3NTk4MDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 27,
    sold: 78,
    category: 'processed',
    badges: ['Homemade', 'No Preservatives'],
    farmer: 'Pak Agus',
    stock: 12
  },
  {
    id: 4,
    name: 'Jus Nanas Fresh 500ml',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 67,
    sold: 156,
    category: 'juice',
    badges: ['Fresh', '100% Natural'],
    farmer: 'Bu Rina',
    stock: 35
  },
  {
    id: 5,
    name: 'Nanas Kering Premium',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    reviewCount: 19,
    sold: 43,
    category: 'dried',
    badges: ['Premium', 'Healthy Snack'],
    farmer: 'Pak Bambang',
    stock: 8
  },
  {
    id: 6,
    name: 'Paket Nanas Keluarga',
    price: 85000,
    originalPrice: 100000,
    image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 15,
    sold: 32,
    category: 'bundle',
    badges: ['Bundle', 'Hemat 15%'],
    farmer: 'Kelompok Tani Maju',
    stock: 5
  },
  {
    id: 7,
    name: 'Nanas Honey Queen 1,5kg',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 89,
    sold: 203,
    category: 'fresh',
    badges: ['Asli Subang', 'Extra Sweet'],
    farmer: 'Pak Wahyu',
    stock: 18
  },
  {
    id: 8,
    name: 'Smoothie Nanas Tropical',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1564956213070-84f5a0cb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbW9vdGhpZSUyMGhlYWx0aHklMjBkcmlua3xlbnwxfHx8fDE3NTk4MDEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 56,
    sold: 134,
    category: 'juice',
    badges: ['Fresh Blend', 'Healthy'],
    farmer: 'Bu Maya',
    stock: 28
  },
  {
    id: 9,
    name: 'Manisan Nanas Kering',
    price: 28000,
    originalPrice: 35000,
    image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYW5kaWVkJTIwc3dlZXQlMjBzbmFja3xlbnwxfHx8fDE3NTk4MDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.4,
    reviewCount: 23,
    sold: 67,
    category: 'dried',
    badges: ['Traditional', 'Sweet & Tangy'],
    farmer: 'Bu Lestari',
    stock: 15
  },
  {
    id: 10,
    name: 'Nanas Mini Sweet 6pcs',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1735052963684-f9e1f4f3ba38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pJTIwcGluZWFwcGxlJTIwYmFieSUyMGZydWl0fGVufDF8fHx8MTc1OTgwMTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 41,
    sold: 89,
    category: 'fresh',
    badges: ['Mini Size', 'Premium Quality'],
    farmer: 'Pak Iwan',
    stock: 22
  },
  {
    id: 11,
    name: 'Keripik Nanas Pedas Manis',
    price: 17000,
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 78,
    sold: 145,
    category: 'snacks',
    badges: ['Spicy Sweet', 'Addictive'],
    farmer: 'Bu Endah',
    stock: 31
  },
  {
    id: 12,
    name: 'Jus Nanas Botol 1 Liter',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    reviewCount: 92,
    sold: 178,
    category: 'juice',
    badges: ['Family Size', 'No Sugar Added'],
    farmer: 'Koperasi Subang Maju',
    stock: 19
  },
  {
    id: 13,
    name: 'Paket Bundling Premium 5kg',
    price: 120000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 26,
    sold: 47,
    category: 'bundle',
    badges: ['Premium Bundle', 'Best Value'],
    farmer: 'Kelompok Tani Subang Sejahtera',
    stock: 8
  },
  {
    id: 14,
    name: 'Nanas Potong Siap Saji',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbGljZXMlMjBmcmVzaCUyMGN1dHxlbnwxfHx8fDE3NTk4MDEwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 64,
    sold: 112,
    category: 'fresh',
    badges: ['Ready to Eat', 'Hygenic Cut'],
    farmer: 'CV Nanas Segar',
    stock: 16
  },
  {
    id: 15,
    name: 'Keripik Nanas Balado',
    price: 19000,
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.3,
    reviewCount: 37,
    sold: 84,
    category: 'snacks',
    badges: ['Spicy Balado', 'Limited Edition'],
    farmer: 'Bu Nurul',
    stock: 24
  },
  {
    id: 16,
    name: 'Sirup Nanas Concentrate',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1564956213070-84f5a0cb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbW9vdGhpZSUyMGhlYWx0aHklMjBkcmlua3xlbnwxfHx8fDE3NTk4MDEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 43,
    sold: 76,
    category: 'processed',
    badges: ['Concentrate', 'Make 2L Juice'],
    farmer: 'UMKM Subang Manis',
    stock: 21
  },
  {
    id: 17,
    name: 'Nanas Kering Cokelat',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 18,
    sold: 35,
    category: 'dried',
    badges: ['Chocolate Coated', 'Premium Snack'],
    farmer: 'Pak Hendra',
    stock: 9
  },
  {
    id: 18,
    name: 'Bundle Mix Olahan 8 Items',
    price: 195000,
    originalPrice: 240000,
    image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 12,
    sold: 23,
    category: 'bundle',
    badges: ['Complete Set', 'Try Everything'],
    farmer: 'Aliansi UMKM Subang',
    stock: 4
  }
];

export function CategoryPage({ onBack, onProductClick, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
        return b.sold - a.sold;
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
                className="md:hidden"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-semibold text-lg md:text-xl">Kategori Produk</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
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
        {/* Mobile Category Chips */}
        <div className="lg:hidden mb-6 fade-in">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] whitespace-nowrap' : 'whitespace-nowrap'}
            >
              Semua ({products.length})
            </Button>
            
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] whitespace-nowrap' : 'whitespace-nowrap'}
              >
                <div className={`w-2 h-2 rounded-full ${category.color} mr-2`} />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar Categories */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0 fade-in">
            <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-4">Kategori</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#FACC15] text-[#1F2937]'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Semua Produk</span>
                    <Badge variant="secondary">{products.length}</Badge>
                  </div>
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#FACC15] text-[#1F2937]'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span>{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Price - Desktop Only */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 mt-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-4">Filter Harga</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Dibawah Rp 20.000</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Rp 20.000 - Rp 50.000</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Diatas Rp 50.000</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Menampilkan {sortedProducts.length} produk
                {selectedCategory !== 'all' && (
                  <span> untuk kategori "{categories.find(c => c.id === selectedCategory)?.name}"</span>
                )}
              </p>
            </div>

            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                  onAddToCart={onAddToCart}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍍</div>
                <h3 className="text-lg font-semibold mb-2">Produk tidak ditemukan</h3>
                <p className="text-gray-600">
                  Coba pilih kategori lain atau ubah filter pencarian.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}