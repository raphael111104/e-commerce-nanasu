import { Grape, Package, Gift, Calendar, BookOpen } from 'lucide-react';

export function CategoryGrid({ onCategoryClick }) {
  const categories = [
    {
      id: 'fresh',
      name: 'Nanas Segar',
      icon: '🍍',
      bgColor: 'bg-[#FACC15]/10',
      iconColor: 'text-[#FACC15]'
    },
    {
      id: 'processed',
      name: 'Olahan',
      icon: '🥤',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-500'
    },
    {
      id: 'bundle',
      name: 'Paket Bundling',
      icon: '📦',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-500'
    },
    {
      id: 'preorder',
      name: 'Pre-Order Panen',
      icon: '📅',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-500'
    }
  ];

  const handleClick = (categoryId) => {
    console.log('Category clicked:', categoryId);
    if (onCategoryClick && typeof onCategoryClick === 'function') {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div className="mb-6 fade-in">
      <h2 className="font-bold text-lg text-[#1F2937] mb-4">Kategori Produk</h2>
      
      {/* Mobile & Desktop: Grid layout - No Background */}
      <div className="grid grid-cols-4 gap-2 md:gap-2.5">
        {categories.map((category, index) => (
          <div
            key={category.id}
            onClick={() => handleClick(category.id)}
            className="group relative cursor-pointer touch-manipulation select-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(category.id);
              }
            }}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Card Background */}
            <div className="relative h-full rounded-xl overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 group-active:scale-95">
              
              {/* Gradient Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${category.bgColor} opacity-80 group-hover:opacity-100 group-hover:h-1 transition-all duration-300`} />
              
              {/* Subtle Pattern Background */}
              <div className={`absolute inset-0 ${category.bgColor} opacity-5`} />
              
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-white/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100" />

              {/* Content */}
              <div className="relative p-3 md:p-4 flex flex-col items-center justify-center gap-1.5 md:gap-2 min-h-[90px] md:min-h-[105px]">
                
                {/* Icon with Animated Background */}
                <div className="relative">
                  {/* Pulsing Background Circle */}
                  <div className={`absolute inset-0 -m-2.5 md:-m-3 rounded-full ${category.bgColor} opacity-20 group-hover:opacity-30 blur-md group-hover:scale-125 transition-all duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative text-2xl md:text-3xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 pointer-events-none filter drop-shadow-md">
                    {category.icon}
                  </div>
                  
                  {/* Sparkle Effect on Hover */}
                  <div className="absolute -top-0.5 -right-0.5 text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:rotate-12">
                    ✨
                  </div>
                </div>

                {/* Category Name */}
                <div className="text-center w-full">
                  <p className="text-xs md:text-sm text-gray-800 group-hover:text-gray-900 transition-colors duration-300 pointer-events-none leading-tight px-0.5">
                    {category.name}
                  </p>
                  
                  {/* Animated Underline */}
                  <div className="mt-1 mx-auto w-0 group-hover:w-6 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent transition-all duration-500 rounded-full" />
                </div>
              </div>

              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Outer Ring on Hover */}
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
