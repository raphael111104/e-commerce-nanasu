import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface WishlistPageProps {
  items?: any[];
  onNavigate: (page: string) => void;
  onAddToCart: (product: any) => void;
  onRemove?: (productId: string) => void;
}

export function WishlistPage({ items, onNavigate, onAddToCart, onRemove }: WishlistPageProps) {
  // Use provided items or fallback to mock data
  const wishlistItems = items && items.length > 0 ? items : [
    {
      id: 1,
      name: 'Nanas Madu Premium Grade A - 1kg',
      price: 35000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      stock: 15,
      badges: ['Asli Subang', 'Panen Minggu Ini'],
      inStock: true
    },
    {
      id: 2,
      name: 'Paket Bundling Keluarga - 3kg Mix',
      price: 85000,
      originalPrice: 105000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      stock: 8,
      badges: ['Asli Subang', 'Diskon'],
      discount: 19,
      inStock: true
    },
    {
      id: 3,
      name: 'Nanas Organik Premium 2kg',
      price: 65000,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      stock: 0,
      badges: ['Asli Subang', 'Organik'],
      inStock: false
    }
  ];

  const handleRemoveFromWishlist = (itemId, itemName) => {
    if (onRemove) {
      onRemove(itemId);
    } else {
      toast.success(`${itemName} dihapus dari wishlist`);
    }
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) {
      toast.error('Produk sedang habis');
      return;
    }
    onAddToCart({ ...item, quantity: 1 });
    toast.success(`${item.name} ditambahkan ke keranjang`);
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    if (inStockItems.length === 0) {
      toast.error('Tidak ada produk yang tersedia');
      return;
    }
    inStockItems.forEach(item => onAddToCart({ ...item, quantity: 1 }));
    toast.success(`${inStockItems.length} produk ditambahkan ke keranjang`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
              Wishlist Kosong
            </h2>
            <p className="text-gray-600">
              Belum ada produk yang Anda simpan. Mulai jelajahi produk nanas favorit!
            </p>
          </div>
          <Button
            onClick={() => onNavigate('catalog')}
            className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
          >
            Jelajahi Produk
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 fade-in">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Wishlist Saya
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {wishlistItems.length} produk disimpan
          </p>
        </div>
        <Button
          onClick={handleAddAllToCart}
          className="bg-[#16A34A] hover:bg-[#15803D] text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Tambah Semua ke Keranjang
        </Button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="relative aspect-square bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.discount && (
                <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500 text-white">
                  -{item.discount}%
                </Badge>
              )}
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge className="bg-gray-800 hover:bg-gray-800 text-white">
                    Stok Habis
                  </Badge>
                </div>
              )}
              
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap gap-1">
                {item.badges?.slice(0, 2).map((badge, idx) => (
                  <Badge
                    key={idx}
                    className={`text-xs ${
                      badge === 'Asli Subang'
                        ? 'bg-[#FACC15]/20 text-[#1F2937] hover:bg-[#FACC15]/20'
                        : 'bg-green-100 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Name */}
              <h3
                onClick={() => onNavigate('product-detail', item)}
                className="font-semibold text-sm text-[#1F2937] line-clamp-2 cursor-pointer hover:text-[#16A34A] transition-colors"
              >
                {item.name}
              </h3>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-lg text-[#16A34A]">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      Rp {item.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Info */}
              {item.inStock ? (
                <p className="text-xs text-green-600">
                  ✓ Stok tersedia ({item.stock})
                </p>
              ) : (
                <p className="text-xs text-red-600">
                  ✗ Stok habis
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                  className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] disabled:bg-gray-100 disabled:text-gray-400"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Keranjang
                </Button>
                <Button
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-[#1F2937] mb-4">
          Mungkin Anda Juga Suka
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Produk serupa berdasarkan wishlist Anda
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg aspect-square animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
