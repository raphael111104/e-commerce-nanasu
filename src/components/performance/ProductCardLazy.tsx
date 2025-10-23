import { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LazyImage } from './LazyImage';

type CardState = 'loading' | 'loaded' | 'error';
type CardDensity = 'comfy' | 'compact';

interface ProductCardLazyProps {
  state?: CardState;
  density?: CardDensity;
  product?: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    image: string;
    thumb?: string;
    lqip?: string;
    badge?: string;
    stock?: number;
  };
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
  priority?: 'low' | 'normal' | 'high';
}

export function ProductCardLazy({
  state = 'loaded',
  density = 'comfy',
  product,
  onAddToCart,
  onToggleWishlist,
  priority = 'normal'
}: ProductCardLazyProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product?.id || '');
  };

  const padding = density === 'comfy' ? 'p-3' : 'p-2';
  const spacing = density === 'comfy' ? 'space-y-2' : 'space-y-1.5';

  if (state === 'loading' || !product) {
    return (
      <div className={`bg-[--surface-default] rounded-xl border border-[--border-default] overflow-hidden ${padding}`}>
        {/* Image Skeleton */}
        <div className="relative aspect-square rounded-lg bg-[--surface-tertiary] mb-2 overflow-hidden">
          <div
            className="absolute inset-0 shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />
        </div>

        {/* Content Skeleton */}
        <div className={spacing}>
          {/* Title Skeleton */}
          <div className="space-y-1.5">
            <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-[90%]" />
            <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-[70%]" />
          </div>

          {/* Price Skeleton */}
          <div className="h-5 bg-[--surface-tertiary] rounded animate-pulse w-[50%]" />

          {/* Rating Skeleton */}
          <div className="h-3 bg-[--surface-tertiary] rounded animate-pulse w-[40%]" />

          {/* Button Skeleton */}
          <div className="h-9 bg-[--surface-tertiary] rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[--surface-default] rounded-xl border border-[--border-default] overflow-hidden hover:shadow-lg transition-all duration-300 group ${padding}`}
    >
      {/* Image Container */}
      <div className="relative mb-2">
        <LazyImage
          src={product.image}
          thumb={product.thumb}
          lqip={product.lqip}
          alt={product.name}
          ratio="1:1"
          priority={priority}
          onLoad={() => setImageLoaded(true)}
          className="group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-[--text-secondary]'
            } transition-colors`}
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <Badge
              variant="default"
              className="bg-[--brand-default] text-white shadow-lg"
            >
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Stock Warning */}
        {product.stock !== undefined && product.stock < 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 z-10">
            <Badge variant="outline" className="bg-amber-500/90 text-white border-0 backdrop-blur-sm">
              Stok {product.stock}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={spacing}>
        {/* Title - Max 2 lines */}
        <h3
          className="text-sm font-medium text-[--text-primary] line-clamp-2 min-h-[2.5rem]"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[--text-primary]">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-[--text-tertiary] line-through">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating !== undefined && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs text-[--text-secondary]">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Button
          size="sm"
          onClick={() => onAddToCart?.(product.id)}
          disabled={product.stock === 0}
          className="w-full gap-2"
          style={{
            background: product.stock === 0 ? undefined : 'linear-gradient(135deg, #D4AF37 0%, #16A34A 100%)',
            color: 'white'
          }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {product.stock === 0 ? 'Habis' : 'Tambah'}
        </Button>
      </div>
    </div>
  );
}
