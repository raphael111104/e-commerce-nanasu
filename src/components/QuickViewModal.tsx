import { X, Heart, ShoppingCart, Star, Minus, Plus, CheckCircle, Truck, Shield } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export function QuickViewModal({ product, isOpen, onClose, onAddToCart, onNavigateToDetail }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      quantity
    });
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Dihapus dari wishlist' : 'Ditambahkan ke wishlist');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 bg-white border-2 border-[#065F46]/10 shadow-2xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Lihat detail produk {product.name} - Rp {product.price.toLocaleString('id-ID')}
        </DialogDescription>
        
        {/* Close Button - Elegant floating style */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group backdrop-blur-sm"
          aria-label="Tutup"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-[#065F46]/20 scrollbar-track-transparent">
          {/* Left: Images Section */}
          <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg group">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg border-0 px-3 py-1.5 transition-all duration-300 hover:scale-105">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                    selectedImage === idx 
                      ? 'border-[#F59E0B] ring-4 ring-[#F59E0B]/20 scale-105' 
                      : 'border-gray-200 hover:border-[#F59E0B]/50 hover:scale-105'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info Section */}
          <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge, idx) => (
                  <Badge 
                    key={idx}
                    variant={
                      badge === 'Diskon' ? 'sale' :
                      badge === 'Asli Subang' ? 'default' :
                      badge === 'Panen Minggu Ini' ? 'success' :
                      'secondary'
                    }
                    className="transition-all duration-300 hover:scale-105 shadow-sm px-3 py-1"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Product Name */}
            <div className="space-y-2">
              <h2 className="text-3xl text-[--text-primary] leading-tight">
                {product.name}
              </h2>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-[--warning-bg] px-3 py-1.5 rounded-lg border border-[--warning]">
                  <Star className="w-4 h-4 fill-[--warning] text-[--warning]" />
                  <span className="text-[--text-primary]">{product.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  ({product.reviewCount} ulasan)
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-2 p-4 bg-accent rounded-xl border border-border">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl text-[--text-primary]">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[--text-tertiary] line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
              {product.stock !== null && (
                <div className={`flex items-center gap-2 text-sm ${
                  product.stock > 10 ? 'text-[--success]' : 'text-[--warning]'
                }`}>
                  <CheckCircle className="w-4 h-4" />
                  {product.stock > 0 ? `Stok: ${product.stock} tersedia` : 'Stok habis'}
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm text-gray-700">Jumlah</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:border-[#F59E0B]/50 transition-colors duration-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-11 w-11 rounded-none hover:bg-[#F59E0B]/10 disabled:opacity-40 transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-16 text-center text-[#065F46]">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                    disabled={product.stock && quantity >= product.stock}
                    className="h-11 w-11 rounded-none hover:bg-[#F59E0B]/10 disabled:opacity-40 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  Maks: {product.stock || '∞'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed border-0"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-300 hover:bg-red-100' 
                    : 'border-gray-300 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isWishlisted ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'
                  }`} 
                />
              </Button>
            </div>

            {/* View Full Details */}
            <Button
              variant="ghost"
              onClick={() => {
                onNavigateToDetail(product);
                onClose();
              }}
              className="w-full text-[#065F46] hover:text-[#064E3B] hover:bg-[#065F46]/5 h-11 rounded-xl transition-all duration-300 border border-transparent hover:border-[#065F46]/20"
            >
              Lihat Detail Lengkap →
            </Button>

            {/* Quick Info - Premium style */}
            <div className="pt-6 border-t-2 border-gray-100 space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-600 group">
                <Truck className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span>Gratis ongkir minimal pembelian Rp 100.000</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600 group">
                <Shield className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span>Garansi kesegaran produk</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600 group">
                <CheckCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span>Langsung dari petani Subang</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
