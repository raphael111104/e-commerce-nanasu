import { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  // Auto-detect theme based on system preference
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Optimized splash screen with pineapple plantation background
  return (
    <SplashScreen
      duration={2000}
      device="mobile"
      theme={theme}
      bgStyle="image"
      loading="progress"
      onComplete={onComplete}
    />
  );
}

// Legacy LoadingScreen (untuk backward compatibility jika masih digunakan di tempat lain)
export function LoadingScreenLegacy() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Optimized: 1.2 seconds instead of 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 3.33, 100); // Reach 100 in ~1.2s
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Render legacy loading screen untuk backward compatibility
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/10 via-[#16A34A]/5 to-[#FACC15]/10">
      <div className="text-center">
        <div className="mb-6">
          <img 
            src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
            alt="NANASU Logo"
            className="w-24 h-24 mx-auto object-contain animate-pulse"
          />
        </div>
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">NANASU</h1>
        <p className="text-sm text-gray-600 mb-6">Nanas Asli Subang</p>
        <div className="w-48 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#16A34A] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{progress.toFixed(0)}%</p>
      </div>
    </div>
  );
}
