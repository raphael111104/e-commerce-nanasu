import { useState, useEffect, useRef } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

type ImageState = 'loading' | 'loaded' | 'error';
type ImageQuality = 'lqip' | 'thumb' | 'full';
type ImagePriority = 'low' | 'normal' | 'high';
type ImageRatio = '1:1' | '4:3' | '3:2' | '16:9' | '2:3';

interface LazyImageProps {
  src: string;
  alt: string;
  ratio?: ImageRatio;
  quality?: ImageQuality;
  priority?: ImagePriority;
  lqip?: string; // Low Quality Image Placeholder (base64)
  thumb?: string; // Thumbnail URL
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const RATIO_MAP: Record<ImageRatio, string> = {
  '1:1': '100%',
  '4:3': '75%',
  '3:2': '66.67%',
  '16:9': '56.25%',
  '2:3': '150%'
};

export function LazyImage({
  src,
  alt,
  ratio = '1:1',
  quality = 'full',
  priority = 'normal',
  lqip,
  thumb,
  className = '',
  onLoad,
  onError
}: LazyImageProps) {
  const [state, setState] = useState<ImageState>('loading');
  const [currentSrc, setCurrentSrc] = useState<string | null>(lqip || null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority === 'high') {
      // Immediately load for high priority
      loadImage();
    } else {
      // Use IntersectionObserver for lazy loading
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              if (observerRef.current && imgRef.current) {
                observerRef.current.unobserve(imgRef.current);
              }
            }
          });
        },
        {
          rootMargin: '50px' // Start loading 50px before viewport
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const loadImage = async () => {
    try {
      // Progressive loading: LQIP → Thumb → Full
      if (quality === 'full' && thumb && !lqip) {
        // Load thumbnail first
        await preloadImage(thumb);
        setCurrentSrc(thumb);
      }

      // Load final image
      const finalSrc = quality === 'lqip' ? (lqip || src) : quality === 'thumb' ? (thumb || src) : src;
      await preloadImage(finalSrc);
      setCurrentSrc(finalSrc);
      setState('loaded');
      onLoad?.();
    } catch (err) {
      setState('error');
      onError?.();
    }
  };

  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleRetry = () => {
    setState('loading');
    setCurrentSrc(lqip || null);
    loadImage();
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden rounded-lg bg-[--surface-secondary] ${className}`}
      style={{ paddingBottom: RATIO_MAP[ratio] }}
    >
      {/* Priority Badge (for design handoff) */}
      {priority === 'high' && (
        <div className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded bg-[--brand-default]/10 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-[--brand-default]">HIGH</span>
        </div>
      )}

      {state === 'loading' && (
        <>
          {/* Skeleton Background */}
          <div className="absolute inset-0 bg-[--surface-tertiary]" />
          
          {/* Shimmer Effect */}
          <div
            className="absolute inset-0 shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />

          {/* Camera Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-8 h-8 text-[--text-tertiary] opacity-40" />
          </div>

          {/* LQIP Preview */}
          {currentSrc && (
            <img
              src={currentSrc}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover blur-sm opacity-60"
            />
          )}
        </>
      )}

      {state === 'loaded' && currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 animate-fadeIn"
          style={{
            animation: 'blurUp 400ms ease-out forwards'
          }}
        />
      )}

      {state === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 bg-[--surface-secondary]">
          <AlertCircle className="w-6 h-6 text-[--status-error]" />
          <p className="text-xs text-[--text-secondary] text-center">Gagal memuat</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRetry}
            className="h-7 text-xs"
          >
            Coba lagi
          </Button>
        </div>
      )}
    </div>
  );
}

// Preload critical images
export function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}
