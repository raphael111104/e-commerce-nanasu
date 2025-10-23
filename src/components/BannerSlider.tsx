import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Gratis Ongkir ke Seluruh Indonesia',
      subtitle: 'Minimum pembelian Rp 100.000',
      bgColor: 'bg-gradient-to-r from-[#FACC15] to-[#FACC15]/80',
      textColor: 'text-[#1F2937]',
      badge: 'FREEONGKIR',
      emoji: '🚚'
    },
    {
      id: 2,
      title: 'Panen Pekan Ini',
      subtitle: 'Nanas segar langsung dari kebun',
      bgColor: 'bg-gradient-to-r from-[#16A34A] to-[#16A34A]/80',
      textColor: 'text-white',
      badge: 'FRESH',
      emoji: '🌱'
    },
    {
      id: 3,
      title: 'Diskon 20% Paket Bundling',
      subtitle: 'Hemat lebih banyak dengan paket keluarga',
      bgColor: 'bg-gradient-to-r from-red-500 to-red-400',
      textColor: 'text-white',
      badge: 'NANASU20',
      emoji: '🎉'
    },
    {
      id: 4,
      title: 'Pre-Order Panen Februari',
      subtitle: 'Dapatkan harga terbaik dengan pre-order',
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-400',
      textColor: 'text-white',
      badge: 'PREORDER',
      emoji: '📅'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-32 md:h-40 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              banner.textColor
            } flex items-center justify-between px-6 md:px-8 overflow-hidden`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              backgroundImage: banner.id === 1 
                ? `url('https://images.unsplash.com/photo-1698012185061-1a6a686cbefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrJTIwc2hpcHBpbmd8ZW58MXx8fHwxNzYwOTUxNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                : banner.id === 2
                ? `url('https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZpZWxkJTIwaGFydmVzdHxlbnwxfHx8fDE3NjA5NzA4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                : banner.id === 3
                ? `url('https://images.unsplash.com/photo-1643365944732-2b004f0c37d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlJTIwZGlzY291bnQlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjA5NjI3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                : `url('https://images.unsplash.com/photo-1617106399900-61a7561d1d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHBsYW5uaW5nJTIwc2NoZWR1bGV8ZW58MXx8fHwxNzYwODk1Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div 
              className="absolute inset-0"
              style={{
                background: banner.id === 1 
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(29, 78, 216, 0.85) 100%)'
                  : banner.id === 2
                  ? 'linear-gradient(135deg, rgba(22, 163, 74, 0.85) 0%, rgba(21, 128, 61, 0.85) 100%)'
                  : banner.id === 3
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.85) 0%, rgba(220, 38, 38, 0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(168, 85, 247, 0.85) 0%, rgba(147, 51, 234, 0.85) 100%)'
              }}
            />

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute right-1/4 bottom-1/4 w-24 h-24 rounded-full bg-white/5 blur-xl" />
            </div>

            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{banner.emoji}</span>
                <Badge className="bg-white/20 text-current hover:bg-white/30 backdrop-blur-sm">
                  {banner.badge}
                </Badge>
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-1">
                {banner.title}
              </h3>
              <p className="text-sm md:text-base opacity-90">
                {banner.subtitle}
              </p>
            </div>
            <div className="hidden md:block text-4xl opacity-20 relative z-10">
              {banner.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-6 h-2'
                : 'bg-white/50 w-2 h-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}