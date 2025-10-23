import { useEffect, useState } from 'react';
import { Logo } from './brand/Logo';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { cn } from '../lib/utils';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
  device?: 'mobile' | 'tablet' | 'desktop';
  theme?: 'light' | 'dark';
  bgStyle?: 'solid' | 'gradient' | 'image';
  loading?: 'none' | 'progress' | 'skeleton';
}

export function SplashScreen({
  onComplete,
  duration = 2000,
  device = 'mobile',
  theme = 'light',
  bgStyle = 'image',
  loading = 'progress'
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Auto-detect device size
  useEffect(() => {
    if (loading === 'progress') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + (100 / (duration / 50));
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [duration, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // Logo size based on device
  const logoSize = device === 'desktop' ? 160 : device === 'tablet' ? 128 : 96;
  const titleSize = device === 'desktop' ? 'text-4xl' : device === 'tablet' ? 'text-3xl' : 'text-2xl';

  // Background styles - NANASU Brand Colors
  const getBackgroundStyle = () => {
    if (bgStyle === 'solid') {
      return theme === 'light' 
        ? 'bg-gradient-to-br from-[#D4AF37] to-[#B38F1F]' // Gold gradient
        : 'bg-gradient-to-br from-[#0f1f13] to-[#1a1a1a]'; // Dark with Pine Green tint
    }
    
    if (bgStyle === 'gradient') {
      return theme === 'light'
        ? 'bg-gradient-to-br from-[#D4AF37]/15 via-[#16A34A]/10 to-[#FACC15]/15'
        : 'bg-gradient-to-br from-[#0f1f13] via-[#16A34A]/15 to-[#D4AF37]/15';
    }

    // bgStyle === 'image'
    return '';
  };

  const textColor = bgStyle === 'solid' && theme === 'light' 
    ? 'text-white' 
    : theme === 'light' 
      ? 'text-gray-900' 
      : 'text-white';

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-300',
        getBackgroundStyle(),
        fadeOut && 'opacity-0'
      )}
      style={
        bgStyle === 'image'
          ? {
              backgroundImage: `url('https://images.unsplash.com/photo-1645682491853-2028a826a571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMHBsYW50YXRpb258ZW58MXx8fHwxNzYwOTc0MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Overlay for image background - NANASU Brand Tint */}
      {bgStyle === 'image' && (
        <div 
          className={cn(
            'absolute inset-0 backdrop-blur-sm'
          )}
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.75) 0%, rgba(22, 163, 74, 0.70) 100%)'
              : 'linear-gradient(135deg, rgba(15, 31, 19, 0.85) 0%, rgba(26, 26, 26, 0.85) 100%)'
          }}
        />
      )}

      {/* Decorative NANASU Brand Elements */}
      {bgStyle === 'gradient' && (
        <>
          {/* Animated Gold Orb */}
          <div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          {/* Animated Pine Green Orb */}
          <div 
            className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(22, 163, 74, 0.5) 0%, transparent 70%)',
              animation: 'float 10s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />
        </>
      )}
      
      {/* Safe Area Indicators (Non-visible guides) */}
      <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" />

      {/* Content Container */}
      <div 
        className={cn(
          'relative z-10 flex flex-col items-center gap-4 px-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-300',
          device === 'mobile' && 'gap-3',
          device === 'tablet' && 'gap-4',
          device === 'desktop' && 'gap-6'
        )}
      >
        {/* Logo */}
        <div className="animate-in zoom-in-95 duration-400">
          <Logo 
            size={logoSize as any}
            detail={theme === 'dark' && bgStyle === 'solid' ? 'full' : 'full'}
            showWordmark={false}
          />
        </div>

        {/* App Name */}
        <div className="text-center space-y-1">
          <h1 className={cn(
            titleSize,
            'font-bold tracking-tight',
            textColor
          )}>
            NANASU
          </h1>
          <p className={cn(
            'text-sm opacity-80',
            textColor,
            device === 'mobile' && 'text-xs',
            device === 'desktop' && 'text-base'
          )}>
            Nanas Asli Subang
          </p>
        </div>

        {/* Loading Indicators - NANASU Brand */}
        {loading === 'progress' && (
          <div className="w-48 mt-4 animate-in fade-in-0 duration-500">
            <Progress 
              value={progress} 
              className={cn(
                'h-1',
                theme === 'light' ? 'bg-[#D4AF37]/20' : 'bg-[#16A34A]/20'
              )}
              style={{
                // Override progress indicator color to NANASU gold
                ['--tw-bg-opacity' as any]: '1',
              }}
            />
            <style>{`
              [data-slot="progress-indicator"] {
                background: linear-gradient(90deg, #D4AF37 0%, #FACC15 100%) !important;
              }
            `}</style>
          </div>
        )}

        {loading === 'skeleton' && (
          <div className="w-64 space-y-2 mt-6">
            <Skeleton className={cn(
              "h-8 w-full",
              theme === 'light' ? 'bg-[#D4AF37]/10' : 'bg-[#16A34A]/20'
            )} />
            <Skeleton className={cn(
              "h-8 w-3/4 mx-auto",
              theme === 'light' ? 'bg-[#D4AF37]/10' : 'bg-[#16A34A]/20'
            )} />
          </div>
        )}
      </div>

      {/* Bottom Tagline */}
      {device !== 'mobile' && (
        <div className={cn(
          'absolute bottom-8 text-center text-xs opacity-60',
          textColor
        )}>
          Platform E-Commerce Nanas Terpercaya
        </div>
      )}

      {/* Float Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

// Variants for showcase/testing
export function SplashScreenShowcase() {
  const [activeVariant, setActiveVariant] = useState(0);

  const variants = [
    { device: 'mobile', theme: 'light', bgStyle: 'solid', loading: 'none' },
    { device: 'mobile', theme: 'light', bgStyle: 'image', loading: 'progress' },
    { device: 'mobile', theme: 'dark', bgStyle: 'gradient', loading: 'skeleton' },
    { device: 'desktop', theme: 'light', bgStyle: 'image', loading: 'none' },
  ] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVariant(prev => (prev + 1) % variants.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentVariant = variants[activeVariant];

  return (
    <SplashScreen
      {...currentVariant}
      duration={2500}
      onComplete={() => console.log('Splash complete')}
    />
  );
}
