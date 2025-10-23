import { Home, Grid3X3, Newspaper, Info, User } from 'lucide-react';

export function BottomNavigation({ currentPage, onNavigate }) {
  const navItems = [
    {
      id: 'catalog',
      label: 'Home',
      icon: Home,
      action: () => onNavigate('catalog')
    },
    {
      id: 'category',
      label: 'Kategori',
      icon: Grid3X3,
      action: () => onNavigate('category')
    },
    {
      id: 'news',
      label: 'Berita',
      icon: Newspaper,
      action: () => onNavigate('news')
    },
    {
      id: 'about',
      label: 'Tentang',
      icon: Info,
      action: () => onNavigate('about')
    },
    {
      id: 'account',
      label: 'Akun',
      icon: User,
      action: () => onNavigate('account')
    }
  ];

  const isActive = (itemId) => {
    if (itemId === 'catalog' && (currentPage === 'catalog' || currentPage === 'product')) {
      return true;
    }
    if (itemId === 'category' && (currentPage === 'category' || currentPage === 'fresh' || currentPage === 'processed' || currentPage === 'bundle' || currentPage === 'preorder')) {
      return true;
    }
    if (itemId === 'news' && (currentPage === 'news' || currentPage === 'news-detail')) {
      return true;
    }
    if (itemId === 'about' && (currentPage === 'about' || currentPage === 'contact')) {
      return true;
    }
    return currentPage === itemId;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-nav border-t-0 border-t border-[--border-default] z-50 slide-in-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);
          
          return (
            <button
              key={item.id}
              onClick={item.action}
              type="button"
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 relative touch-manipulation ${
                active
                  ? 'text-primary transform scale-105'
                  : 'text-[--text-tertiary] hover:text-[--text-secondary] active:scale-95'
              }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-primary rounded-full shadow-lg shadow-primary/30 scale-in"></div>
              )}
              <Icon className={`w-5 h-5 transition-all duration-300 ${active ? 'fill-current' : ''}`} />
              <span className={`text-xs font-medium transition-all duration-300 ${active ? 'text-primary' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}