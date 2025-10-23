import { useState } from 'react';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { BannerSlider } from '../BannerSlider';
import { CategoryGrid } from '../CategoryGrid';
import { FilterChips } from '../FilterChips';
import { FlashSale } from '../FlashSale';
import { ProductCard } from '../ProductCard';
import { QuickViewModal } from '../QuickViewModal';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';

export function CatalogPage({ onProductClick, onAddToCart, onNavigate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState(['semua']);
  const [sortBy, setSortBy] = useState('terbaru');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Mock products data (18 products untuk demo)
  const allProducts = [
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
      soldCount: 450,
      createdAt: new Date('2025-01-10')
    },
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
      soldCount: 890,
      createdAt: new Date('2025-01-12')
    },
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
      soldCount: 320,
      createdAt: new Date('2025-01-08')
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
      soldCount: 210,
      createdAt: new Date('2025-01-09')
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
      soldCount: 560,
      createdAt: new Date('2025-01-07')
    },
    {
      id: 6,
      name: 'Pre-Order Nanas Panen Januari',
      price: 30000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 156,
      badges: ['Pre-Order', 'Asli Subang'],
      stock: null,
      category: 'preorder',
      soldCount: 780,
      createdAt: new Date('2025-01-14')
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
      soldCount: 145,
      createdAt: new Date('2025-01-06')
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
      soldCount: 380,
      createdAt: new Date('2025-01-11')
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
      soldCount: 290,
      createdAt: new Date('2025-01-13')
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
      soldCount: 420,
      createdAt: new Date('2025-01-05')
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
      soldCount: 1200,
      createdAt: new Date('2025-01-14')
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
      soldCount: 340,
      createdAt: new Date('2025-01-04')
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
      soldCount: 670,
      createdAt: new Date('2025-01-13')
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
      soldCount: 490,
      createdAt: new Date('2025-01-03')
    },
    {
      id: 15,
      name: 'Pre-Order Nanas Panen Februari',
      price: 32000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 234,
      badges: ['Pre-Order', 'Asli Subang', 'Early Bird'],
      stock: null,
      category: 'preorder',
      soldCount: 950,
      createdAt: new Date('2025-01-14')
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
      soldCount: 310,
      createdAt: new Date('2025-01-02')
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
      soldCount: 230,
      createdAt: new Date('2025-01-01')
    },
    {
      id: 18,
      name: 'Nanas Organik Grade B 2,5kg',
      price: 75000,
      originalPrice: 85000,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 105,
      badges: ['Asli Subang', 'Organik', 'Diskon'],
      discount: 12,
      stock: 7,
      category: 'fresh',
      soldCount: 410,
      createdAt: new Date('2024-12-30')
    }
  ];

  // Filter dan Sort Logic
  const getFilteredAndSortedProducts = () => {
    let filtered = [...allProducts];

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by category
    if (!activeFilters.includes('semua')) {
      filtered = filtered.filter(product =>
        activeFilters.some(filter => {
          if (filter === 'fresh') return product.category === 'fresh';
          if (filter === 'olahan') return product.category === 'processed';
          if (filter === 'bundle') return product.category === 'bundle';
          if (filter === 'preorder') return product.category === 'preorder';
          return true;
        })
      );
    }

    // Sort
    switch (sortBy) {
      case 'terbaru':
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'terlaris':
        filtered.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'harga-terendah':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'harga-tertinggi':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const displayedProducts = getFilteredAndSortedProducts();

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleCategoryClick = (categoryId) => {
    onNavigate(categoryId);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const ProductSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-3">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 page-transition">
      {/* Banner Slider */}
      <BannerSlider />

      {/* Category Grid */}
      <CategoryGrid onCategoryClick={handleCategoryClick} />

      {/* Flash Sale */}
      <FlashSale onProductClick={onProductClick} />

      {/* Filter Chips */}
      <FilterChips onFilterChange={handleFilterChange} />

      {/* Toolbar: Sort & Filters */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-sm text-gray-600 hidden md:block">
            {displayedProducts.length} produk ditemukan
          </span>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] md:w-[200px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="terbaru">Terbaru</SelectItem>
              <SelectItem value="terlaris">Terlaris</SelectItem>
              <SelectItem value="harga-terendah">Harga Terendah</SelectItem>
              <SelectItem value="harga-tertinggi">Harga Tertinggi</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Filter Sheet (Mobile & Desktop) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden md:inline">Filter Harga</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Harga</SheetTitle>
                <SheetDescription>
                  Atur rentang harga produk yang ingin ditampilkan
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <Label>Rentang Harga</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={200000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">
                      Rp {priceRange[0].toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-500">-</span>
                    <span className="font-semibold">
                      Rp {priceRange[1].toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preset Cepat</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([0, 25000])}
                    >
                      &lt; 25k
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([25000, 50000])}
                    >
                      25k - 50k
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([50000, 100000])}
                    >
                      50k - 100k
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPriceRange([100000, 200000])}
                    >
                      &gt; 100k
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 500);
                  }}
                >
                  Terapkan Filter
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* View Mode Toggle (Desktop only) */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-white shadow-sm' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="mb-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Coba ubah filter atau rentang harga Anda
            </p>
            <Button
              onClick={() => {
                setActiveFilters(['semua']);
                setPriceRange([0, 200000]);
              }}
              variant="outline"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                : 'space-y-4'
            }
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={onProductClick}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {!isLoading && displayedProducts.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="px-8">
            Muat Lebih Banyak
          </Button>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
        onNavigateToDetail={onProductClick}
      />
    </div>
  );
}
