import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { ProductCardLazy } from './ProductCardLazy';

type GridColumns = 2 | 3 | 4 | 'auto';
type PagingMode = 'none' | 'pagination' | 'infinite';

interface Product {
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
}

interface ProductGridProps {
  products: Product[];
  columns?: GridColumns;
  paging?: PagingMode;
  onLoadMore?: () => Promise<void>;
  hasMore?: boolean;
  isLoading?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
}

export function ProductGrid({
  products,
  columns = 'auto',
  paging = 'infinite',
  onLoadMore,
  hasMore = false,
  isLoading = false,
  onAddToCart,
  onToggleWishlist
}: ProductGridProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Determine grid columns based on screen size
  const gridCols = columns === 'auto'
    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
    : `grid-cols-${columns}`;

  useEffect(() => {
    if (paging !== 'infinite' || !onLoadMore || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          try {
            await onLoadMore();
          } finally {
            setIsLoadingMore(false);
          }
        }
      },
      {
        rootMargin: '100px' // Trigger 100px before reaching sentinel
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [paging, onLoadMore, hasMore, isLoadingMore]);

  if (isLoading && products.length === 0) {
    return (
      <div className={`grid ${gridCols} gap-4`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardLazy key={i} state="loading" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className={`grid ${gridCols} gap-4`}>
        {products.map((product, index) => (
          <ProductCardLazy
            key={product.id}
            product={product}
            state="loaded"
            priority={index < 4 ? 'high' : 'normal'} // First 4 products = high priority
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>

      {/* Loading More Indicator */}
      {paging === 'infinite' && hasMore && (
        <div className={`grid ${gridCols} gap-4`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardLazy key={`loading-${i}`} state="loading" />
          ))}
        </div>
      )}

      {/* Sentinel for Infinite Scroll */}
      {paging === 'infinite' && hasMore && (
        <div
          ref={sentinelRef}
          className="h-8 flex items-center justify-center border-t-2 border-dashed border-[--border-default]"
        >
          <span className="px-3 py-1 bg-[--surface-default] text-[10px] text-[--text-tertiary] font-mono">
            IntersectionObserver Target
          </span>
        </div>
      )}

      {/* No More Results */}
      {paging === 'infinite' && !hasMore && products.length > 0 && (
        <div className="py-8 text-center border-t border-[--border-default]">
          <p className="text-sm text-[--text-tertiary]">
            Semua produk telah ditampilkan
          </p>
        </div>
      )}

      {/* Loading Spinner (Fallback) */}
      {isLoadingMore && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[--brand-default]" />
          <span className="ml-2 text-sm text-[--text-secondary]">
            Memuat produk...
          </span>
        </div>
      )}
    </div>
  );
}
