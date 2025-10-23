import { ImageIcon } from 'lucide-react';

type LoaderType = 'hero' | 'carousel' | 'list' | 'details';
type LoaderState = 'loading' | 'loaded';

interface SectionLoaderProps {
  type: LoaderType;
  state?: LoaderState;
  children?: React.ReactNode;
}

export function SectionLoader({ type, state = 'loading', children }: SectionLoaderProps) {
  if (state === 'loaded') {
    return <>{children}</>;
  }

  return (
    <>
      {type === 'hero' && <HeroSkeleton />}
      {type === 'carousel' && <CarouselSkeleton />}
      {type === 'list' && <ListSkeleton />}
      {type === 'details' && <DetailsSkeleton />}
    </>
  );
}

function HeroSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-[--surface-secondary] relative">
      <div className="relative w-full aspect-[16/9]">
        {/* Shimmer */}
        <div
          className="absolute inset-0 shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-[--text-tertiary] opacity-20" />
        </div>
      </div>

      {/* Text Bars */}
      <div className="absolute bottom-6 left-6 right-6 space-y-3">
        <div className="h-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg animate-pulse w-3/4" />
        <div className="h-5 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg animate-pulse w-1/2" />
      </div>
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-64 rounded-xl bg-[--surface-secondary] overflow-hidden"
        >
          {/* Image */}
          <div className="relative aspect-square">
            <div
              className="absolute inset-0 shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                animationDelay: `${i * 0.1}s`
              }}
            />
          </div>

          {/* Content */}
          <div className="p-3 space-y-2">
            <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-full" />
            <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-3/4" />
            <div className="h-5 bg-[--surface-tertiary] rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-3 rounded-lg bg-[--surface-secondary]"
        >
          {/* Thumbnail */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg bg-[--surface-tertiary] overflow-hidden">
            <div
              className="absolute inset-0 shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                animationDelay: `${i * 0.05}s`
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-full" />
            <div className="h-3 bg-[--surface-tertiary] rounded animate-pulse w-2/3" />
            <div className="h-3 bg-[--surface-tertiary] rounded animate-pulse w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative w-full aspect-[3/2] rounded-xl bg-[--surface-secondary] overflow-hidden">
        <div
          className="absolute inset-0 shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-20 h-20 text-[--text-tertiary] opacity-20" />
        </div>
      </div>

      {/* Info Bars */}
      <div className="space-y-3">
        <div className="h-8 bg-[--surface-tertiary] rounded-lg animate-pulse w-3/4" />
        <div className="h-6 bg-[--surface-tertiary] rounded-lg animate-pulse w-1/2" />
        <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-full" />
        <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-full" />
        <div className="h-4 bg-[--surface-tertiary] rounded animate-pulse w-2/3" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="h-12 bg-[--surface-tertiary] rounded-lg animate-pulse flex-1" />
        <div className="h-12 bg-[--surface-tertiary] rounded-lg animate-pulse flex-1" />
      </div>
    </div>
  );
}

// Compact Section Loader
interface CompactLoaderProps {
  count?: number;
  type?: 'card' | 'row' | 'block';
}

export function CompactLoader({ count = 3, type = 'card' }: CompactLoaderProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-lg bg-[--surface-secondary] overflow-hidden ${
            type === 'card' ? 'p-4' : type === 'row' ? 'h-16' : 'h-24'
          }`}
        >
          <div
            className="w-full h-full shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: `${i * 0.1}s`
            }}
          />
        </div>
      ))}
    </div>
  );
}
