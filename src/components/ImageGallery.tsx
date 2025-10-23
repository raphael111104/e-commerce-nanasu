import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

/**
 * ImageGallery Component - Premium Edition
 * 
 * Full-featured image gallery with:
 * - Thumbnail navigation
 * - Zoom modal with glass morphism
 * - Keyboard navigation (arrow keys, ESC)
 * - Fallback images
 * - Loading states with elegant animations
 * - Forest Premium theme integration
 * 
 * Props:
 * - images: string[] - Array of image URLs
 * - alt: string - Alt text for images
 * - className?: string - Additional classes
 * - badges?: React.ReactNode - Badge overlays
 * - actions?: React.ReactNode - Action overlays
 */

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
}

export function ImageGallery({ images, alt, className, badges, actions }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setIsLoading(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isZoomOpen) return;
    
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setIsZoomOpen(false);
  };

  // Keyboard navigation
  useState(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown as any);
      return () => window.removeEventListener('keydown', handleKeyDown as any);
    }
  });

  return (
    <div className={className}>
      {/* Main Image */}
      <div className="relative group mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-square shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center z-10">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-[#F59E0B] animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-gray-200 border-t-transparent animate-spin animation-delay-150"></div>
            </div>
          </div>
        )}
        
        <ImageWithFallback
          src={images[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        
        {/* Badges Overlay (Top Left) */}
        {badges && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {badges}
          </div>
        )}

        {/* Actions Overlay (Top Right) */}
        {actions && (
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {actions}
          </div>
        )}

        {/* Zoom Button - Premium style */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white backdrop-blur-md shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 border border-gray-200 z-10 rounded-xl px-4 py-2"
          aria-label="Zoom image"
        >
          <ZoomIn className="w-4 h-4 mr-2 text-[#065F46]" />
          <span className="text-sm text-[#065F46]">Perbesar</span>
        </Button>

        {/* Navigation Arrows (desktop) - Premium style */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-md shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:flex h-12 w-12 p-0 rounded-full border border-gray-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-[#065F46]" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-md shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hidden md:flex h-12 w-12 p-0 rounded-full border border-gray-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-[#065F46]" />
            </Button>
          </>
        )}

        {/* Image Counter - Premium style */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-[#065F46]/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip - Premium style */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#065F46]/20 scrollbar-track-transparent">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] shadow-md hover:shadow-lg ${
                selectedIndex === index 
                  ? 'border-[#F59E0B] ring-4 ring-[#F59E0B]/30 scale-105' 
                  : 'border-gray-200 hover:border-[#F59E0B]/50 hover:scale-105'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-pressed={selectedIndex === index}
            >
              <ImageWithFallback
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal - Premium glass morphism style */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent 
          className="max-w-7xl w-full h-[90vh] p-0 bg-[#065F46]/95 backdrop-blur-2xl border-2 border-white/10 shadow-2xl" 
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">Tampilan Gambar Diperbesar</DialogTitle>
          
          {/* Close Button - Premium floating style */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-6 right-6 bg-white/95 hover:bg-white backdrop-blur-md text-[#065F46] z-20 h-12 w-12 p-0 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Close zoom"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Large Image */}
            <ImageWithFallback
              src={images[selectedIndex]}
              alt={`${alt} - Zoomed ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />

            {/* Navigation in Modal - Premium style */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-md text-[#065F46] h-14 w-14 p-0 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-7 h-7" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white backdrop-blur-md text-[#065F46] h-14 w-14 p-0 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-7 h-7" />
                </Button>
                
                {/* Counter - Premium style */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-[#065F46] px-5 py-2.5 rounded-full shadow-xl border border-white/20">
                  <span className="text-sm">
                    {selectedIndex + 1} / {images.length}
                  </span>
                </div>
              </>
            )}

            {/* Thumbnail navigation in modal - Premium style */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 max-w-xl overflow-x-auto px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                      selectedIndex === index 
                        ? 'border-[#F59E0B] ring-4 ring-[#F59E0B]/30 scale-110' 
                        : 'border-gray-300 hover:border-[#F59E0B]/50 hover:scale-105'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
