import { useState } from 'react';
import { Star, Heart, MapPin, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { LazyImage } from './performance/LazyImage';
import { toast } from 'sonner@2.0.3';

export function ProductCard({ product, onProductClick, onClick, onAddToCart, onQuickView, viewMode = 'grid' }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);
    
    setTimeout(() => {
      onAddToCart(product);
      setIsAdding(false);
    }, 500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist');
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    } else if (onProductClick) {
      onProductClick(product);
    }
  };

  if (viewMode === 'list') {
    // List view - horizontal layout
    return (
      <Card 
        className="overflow-hidden glass-card hover:shadow-elegant-lg transition-all duration-500 cursor-pointer group scale-in hover-glow"
        onClick={handleCardClick}
      >
        <div className="flex flex-row">
          <div className="relative w-32 flex-shrink-0 overflow-hidden">
            <LazyImage
              src={product.image}
              alt={product.name}
              ratio="1:1"
              priority="normal"
              className="group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {product.badges?.slice(0, 2).map((badge, index) => (
                <Badge
                  key={index}
                  variant={
                    badge === 'Diskon' ? 'sale' :
                    badge === 'Asli Subang' ? 'default' :
                    badge === 'Panen Minggu Ini' ? 'success' :
                    'secondary'
                  }
                  className="text-xs px-2 py-0.5 font-medium shadow-md backdrop-blur-sm"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <CardContent className="flex-1 p-3 flex flex-col">
            <h3 className="font-medium text-sm text-[--text-primary] mb-1 line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-bold text-[--text-primary]">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[--text-tertiary] line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 mb-auto">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span>({product.reviewCount})</span>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button
                onClick={handleWishlist}
                variant="outline"
                size="sm"
                className={`flex-shrink-0 h-9 w-9 p-0 transition-all duration-300 border-stone-200 hover:scale-110 ${
                  isWishlisted ? 'text-red-500 border-red-500 bg-red-50' : 'text-stone-600 hover:border-stone-300'
                }`}
                title={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
              >
                <Heart className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-current scale-110' : ''}`} />
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-900 font-semibold h-9 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
              >
                {isAdding ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rotate rounded-full border-2 border-amber-900 border-t-transparent"></div>
                    <span className="hidden sm:inline">Menambahkan...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Tambah</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Grid view - vertical layout with consistent height
  return (
    <Card 
      className="overflow-hidden glass-card hover:shadow-elegant-lg transition-all duration-500 cursor-pointer group scale-in flex flex-col h-full hover-glow hover-shine"
      onClick={handleCardClick}
    >
      {/* Image Section - Fixed aspect ratio */}
      <div className="relative w-full flex-shrink-0 overflow-hidden">
        <LazyImage
          src={product.image}
          alt={product.name}
          ratio="1:1"
          priority="normal"
          className="group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Badges - Top Left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 slide-in-left z-10">
          {product.badges?.slice(0, 2).map((badge, index) => (
            <Badge
              key={index}
              variant={
                badge === 'Diskon' ? 'sale' :
                badge === 'Asli Subang' ? 'default' :
                badge === 'Panen Minggu Ini' ? 'success' :
                'secondary'
              }
              className="text-xs px-2.5 py-1 font-medium shadow-lg backdrop-blur-sm"
            >
              {badge}
            </Badge>
          ))}
        </div>

        {/* Action Buttons - Top Right */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 slide-in-right">
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 w-9 p-0 glass hover:bg-white/95 transition-all duration-300 shadow-lg hover:scale-110 ${
              isWishlisted ? 'text-red-500' : 'text-stone-600'
            }`}
            onClick={handleWishlist}
            title={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          >
            <Heart className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-current scale-110' : ''}`} />
          </Button>
          
          {/* Quick View - Show on desktop hover */}
          {onQuickView && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 glass hover:bg-white/95 transition-all duration-300 shadow-lg text-stone-600 opacity-0 group-hover:opacity-100 group-hover:scale-110 hidden md:flex items-center justify-center"
              onClick={handleQuickView}
              title="Lihat Cepat"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Discount Badge - Bottom Left */}
        {product.discount && (
          <div className="absolute bottom-2 left-2 scale-in">
            <Badge className="text-xs px-3 py-1 font-bold shadow-lg bg-gradient-to-r from-red-500 to-rose-500 text-white border-0">
              -{product.discount}%
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section - Flexible height with button pushed to bottom */}
      <CardContent className="p-3 flex flex-col flex-1">
        {/* Product Info - Grows to push button down */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-medium text-sm text-gray-900 mb-1.5 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-bold text-base text-[#1F2937]">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Rating and Location */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Subang</span>
            </div>
          </div>

          {/* Stock Info */}
          {product.stock && product.stock < 10 && (
            <p className="text-xs text-orange-600 font-medium mb-2">
              Stok tersisa {product.stock}
            </p>
          )}
        </div>

        {/* Add to Cart Button - Always at bottom */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
          className={`w-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-900 font-semibold h-9 md:h-10 transition-all duration-300 mt-2 shadow-md hover:shadow-lg active:scale-95 ${
            isAdding ? 'opacity-80' : ''
          } ${
            product.stock === 0 ? 'opacity-50 cursor-not-allowed from-stone-200 to-stone-300 text-stone-500' : ''
          }`}
        >
          {product.stock === 0 ? (
            <span className="text-xs sm:text-sm">Stok Habis</span>
          ) : isAdding ? (
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-4 h-4 rotate rounded-full border-2 border-amber-900 border-t-transparent"></div>
              <span className="text-xs sm:text-sm">Menambahkan...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <ShoppingCart className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Tambah ke Keranjang</span>
                <span className="sm:hidden">+ Keranjang</span>
              </span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
