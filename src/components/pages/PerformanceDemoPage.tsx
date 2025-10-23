import { useState } from 'react';
import { ArrowLeft, Zap, Image as ImageIcon, Grid3x3, Loader, WifiOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { LazyImage } from '../performance/LazyImage';
import { ProductCardLazy } from '../performance/ProductCardLazy';
import { ProductGrid } from '../performance/ProductGrid';
import { SectionLoader, CompactLoader } from '../performance/SectionLoader';
import { EmptyState, InlineError } from '../performance/EmptyState';
import { NetworkIndicator, useNetworkAwareLoading } from '../performance/NetworkIndicator';

interface PerformanceDemoPageProps {
  onBack: () => void;
}

export function PerformanceDemoPage({ onBack }: PerformanceDemoPageProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showNetwork, setShowNetwork] = useState(true);
  const { networkQuality, shouldReduceQuality } = useNetworkAwareLoading();

  // Mock products for demo
  const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Nanas ${i % 2 === 0 ? 'Madu' : 'Manis'} Premium ${i + 1}`,
    price: 45000 + (i * 5000),
    originalPrice: i % 3 === 0 ? 55000 + (i * 5000) : undefined,
    rating: 4.5 + (Math.random() * 0.5),
    image: `https://images.unsplash.com/photo-1550828486-3d61dffa5f47?w=800&h=800&fit=crop&q=${shouldReduceQuality ? '60' : '80'}`,
    thumb: `https://images.unsplash.com/photo-1550828486-3d61dffa5f47?w=400&h=400&fit=crop&q=60`,
    badge: i % 4 === 0 ? 'PROMO' : i % 5 === 0 ? 'BARU' : undefined,
    stock: i % 7 === 0 ? 3 : 50
  }));

  const [activeTab, setActiveTab] = useState('lazy-image');

  return (
    <div className="min-h-screen bg-[--bg-default]">
      {/* Network Indicator */}
      {showNetwork && <NetworkIndicator showIndicator />}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[--surface-default] border-b border-[--border-default]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-xl font-bold text-[--text-primary] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[--brand-default]" />
                  Performance & Lazy Loading
                </h1>
                <p className="text-xs text-[--text-secondary]">
                  Demo sistem loading optimal untuk NANASU
                </p>
              </div>
            </div>

            {/* Network Quality Badge */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  networkQuality === 'offline' ? 'bg-red-500' :
                  networkQuality === 'slow' ? 'bg-yellow-500' :
                  networkQuality === 'good' ? 'bg-green-500' :
                  'bg-emerald-500'
                } animate-pulse`} />
                <span className="text-xs capitalize">{networkQuality}</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Settings */}
        <div className="mb-6 p-4 bg-[--surface-secondary] rounded-lg border border-[--border-default]">
          <h3 className="font-semibold text-[--text-primary] mb-3">⚙️ Settings</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
              <Label htmlFor="reduced-motion" className="text-sm">
                Reduced Motion
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="show-network"
                checked={showNetwork}
                onCheckedChange={setShowNetwork}
              />
              <Label htmlFor="show-network" className="text-sm">
                Show Network Indicator
              </Label>
            </div>
          </div>
        </div>

        {/* Demo Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger value="lazy-image" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              LazyImage
            </TabsTrigger>
            <TabsTrigger value="product-card" className="gap-2">
              <Grid3x3 className="w-4 h-4" />
              Product Card
            </TabsTrigger>
            <TabsTrigger value="grid" className="gap-2">
              <Grid3x3 className="w-4 h-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="loaders" className="gap-2">
              <Loader className="w-4 h-4" />
              Loaders
            </TabsTrigger>
            <TabsTrigger value="empty-states" className="gap-2">
              <WifiOff className="w-4 h-4" />
              Empty States
            </TabsTrigger>
            <TabsTrigger value="checklist">
              ✅ Checklist
            </TabsTrigger>
          </TabsList>

          {/* LazyImage Demo */}
          <TabsContent value="lazy-image" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[--text-primary] mb-4">
                LazyImage Component
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Different ratios */}
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">1:1 - High Priority</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1550828486-3d61dffa5f47?w=400"
                    alt="Nanas"
                    ratio="1:1"
                    priority="high"
                  />
                </div>
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">4:3 - Normal</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1589927986089-35812378d7c4?w=400"
                    alt="Nanas"
                    ratio="4:3"
                  />
                </div>
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">16:9 - Low Priority</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400"
                    alt="Nanas"
                    ratio="16:9"
                    priority="low"
                  />
                </div>
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">3:2</p>
                  <LazyImage
                    src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400"
                    alt="Nanas"
                    ratio="3:2"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Product Card Demo */}
          <TabsContent value="product-card" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[--text-primary] mb-4">
                Product Card States
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">Loading</p>
                  <ProductCardLazy state="loading" />
                </div>
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">Loaded - Comfy</p>
                  <ProductCardLazy
                    product={mockProducts[0]}
                    density="comfy"
                  />
                </div>
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">Loaded - Compact</p>
                  <ProductCardLazy
                    product={mockProducts[1]}
                    density="compact"
                  />
                </div>
                <div>
                  <p className="text-xs text-[--text-tertiary] mb-2">With Badge</p>
                  <ProductCardLazy
                    product={mockProducts[0]}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Grid Demo */}
          <TabsContent value="grid" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[--text-primary] mb-4">
                Product Grid with Infinite Scroll
              </h2>
              <ProductGrid
                products={mockProducts}
                columns="auto"
                paging="infinite"
                hasMore={true}
                onLoadMore={async () => {
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </div>
          </TabsContent>

          {/* Loaders Demo */}
          <TabsContent value="loaders" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-[--text-primary] mb-4">
                Section Loaders
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-medium text-[--text-secondary] mb-3">Hero Skeleton</p>
                  <SectionLoader type="hero" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[--text-secondary] mb-3">Carousel Skeleton</p>
                  <SectionLoader type="carousel" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[--text-secondary] mb-3">List Skeleton</p>
                  <SectionLoader type="list" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[--text-secondary] mb-3">Details Skeleton</p>
                  <SectionLoader type="details" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[--text-secondary] mb-3">Compact Loaders</p>
                  <CompactLoader count={3} type="card" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Empty States Demo */}
          <TabsContent value="empty-states" className="space-y-6">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-[--text-secondary] mb-3">Empty State</p>
                <EmptyState type="empty" />
              </div>
              <div>
                <p className="text-sm font-medium text-[--text-secondary] mb-3">Error State</p>
                <EmptyState type="error" onAction={() => alert('Retry clicked')} />
              </div>
              <div>
                <p className="text-sm font-medium text-[--text-secondary] mb-3">Offline State</p>
                <EmptyState type="offline" onAction={() => alert('Retry clicked')} />
              </div>
              <div>
                <p className="text-sm font-medium text-[--text-secondary] mb-3">No Results</p>
                <EmptyState type="no-results" />
              </div>
              <div>
                <p className="text-sm font-medium text-[--text-secondary] mb-3">Inline Error</p>
                <InlineError
                  message="Gagal memuat data produk"
                  onRetry={() => alert('Retry clicked')}
                />
              </div>
            </div>
          </TabsContent>

          {/* Checklist */}
          <TabsContent value="checklist">
            <div className="bg-[--surface-secondary] rounded-lg p-6 border border-[--border-default]">
              <h2 className="text-lg font-semibold text-[--text-primary] mb-4">
                📋 Performance Checklist
              </h2>
              <div className="space-y-3">
                {[
                  'Semua komponen punya state loading | loaded | error',
                  'LazyImage memiliki ratio tetap & shimmer',
                  'LQIP → Thumb → Full flow terdokumentasi',
                  'Grid menyertakan "Sentinel" untuk infinite scroll',
                  'Variants untuk theme light/dark tersedia',
                  'Network awareness (slow/good/offline)',
                  'Background/hero < 150KB (WebP/AVIF)',
                  'Motion patuh prefers-reduced-motion',
                  'Intersection Observer untuk lazy loading',
                  'Skeleton loaders konsisten',
                  'Error states dengan retry action',
                  'Offline detection & feedback'
                ].map((item, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 mt-0.5 rounded border-[--border-default] text-[--brand-default] focus:ring-[--brand-default]"
                    />
                    <span className="text-sm text-[--text-secondary] group-hover:text-[--text-primary] transition-colors">
                      {item}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[--brand-default]/10 rounded-lg border border-[--brand-default]/20">
                <h3 className="font-semibold text-[--text-primary] mb-2">📝 Handoff Notes</h3>
                <ul className="text-xs text-[--text-secondary] space-y-1">
                  <li>• Gunakan tag gambar responsif (srcset/sizes) + format AVIF/WebP</li>
                  <li>• Dimensikan container sebelum gambar dimuat (hindari CLS)</li>
                  <li>• Preload hanya hero/logo; sisanya lazy</li>
                  <li>• Batch fetch 12–20 item; debounce scroll 100ms</li>
                  <li>• Cache policy: immutable untuk aset, revalidate untuk data</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
