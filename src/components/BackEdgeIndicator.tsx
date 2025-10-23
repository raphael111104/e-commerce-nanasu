import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackEdgeIndicatorProps {
  canGoBack: boolean;
  onBack: () => void;
}

export function BackEdgeIndicator({ canGoBack, onBack }: BackEdgeIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch.clientX <= 24 && canGoBack) {
        setTouchStartX(touch.clientX);
        setShowIndicator(true);
        
        // Auto hide after 2 seconds if not swiping
        timeoutId = setTimeout(() => {
          setShowIndicator(false);
        }, 2000);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!showIndicator) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX;
      
      if (deltaX > 80) {
        setShowIndicator(false);
        clearTimeout(timeoutId);
      }
    };

    const handleTouchEnd = () => {
      setShowIndicator(false);
      clearTimeout(timeoutId);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(timeoutId);
    };
  }, [canGoBack, touchStartX, showIndicator]);

  if (!canGoBack) return null;

  return (
    <>
      {/* Invisible hotspot for easy back gesture */}
      <div
        className="fixed left-0 top-0 bottom-0 w-6 z-[60] md:hidden"
        onClick={onBack}
        style={{ touchAction: 'none' }}
      />

      {/* Visual indicator when touching edge */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-[61] md:hidden pointer-events-none"
          >
            <div className="bg-gray-900/80 backdrop-blur-sm text-white rounded-r-lg px-3 py-2 flex items-center gap-2 shadow-lg">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Kembali</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
