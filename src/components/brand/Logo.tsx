import { cn } from '../../lib/utils';

interface LogoProps {
  size?: 24 | 32 | 48 | 64 | 96 | 128 | 160;
  detail?: 'full' | 'mono';
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ 
  size = 48, 
  detail = 'full',
  className,
  showWordmark = false 
}: LogoProps) {
  const logoUrl = 'https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png';
  
  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      {/* Logo Image - Optimized */}
      <img
        src={logoUrl}
        alt="NANASU Logo"
        width={size}
        height={size}
        className={cn(
          'object-contain transition-all duration-300 scale-110',
          detail === 'mono' && 'grayscale'
        )}
        loading="eager"
        decoding="async"
      />
      
      {/* Wordmark - Optional */}
      {showWordmark && (
        <div className="flex flex-col">
          <span 
            className="font-bold tracking-tight text-[#D4AF37] dark:text-[#FACC15]"
            style={{
              fontSize: size >= 96 ? '2.5rem' : size >= 64 ? '2rem' : size >= 48 ? '1.5rem' : '1.25rem',
              letterSpacing: '-0.02em'
            }}
          >
            NANASU
          </span>
          <span 
            className="text-[--text-tertiary] leading-none"
            style={{
              fontSize: size >= 96 ? '1rem' : size >= 64 ? '0.875rem' : size >= 48 ? '0.75rem' : '0.625rem',
            }}
          >
            Nanas Asli Subang
          </span>
        </div>
      )}
    </div>
  );
}

// Preload Component untuk digunakan di <head>
// Note: Preload dapat ditambahkan langsung di index.html untuk performa optimal
export function LogoPreload() {
  // This component is for documentation purposes
  // In production, add this directly to index.html:
  // <link rel="preload" as="image" href="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png">
  return null;
}
