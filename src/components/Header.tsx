import { Bell, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlobalSearch } from './GlobalSearch';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  user: any;
  onProductClick: (product: any) => void;
  notificationCount?: number;
  onOpenNotifications?: () => void;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  cartCount, 
  user, 
  onProductClick,
  notificationCount = 0,
  onOpenNotifications
}: HeaderProps) {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Navigate to catalog with search query
    onNavigate('catalog');
  };

  const handleLogoClick = () => {
    onNavigate('catalog');
    // Force scroll to top when clicking logo
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block sticky top-0 z-40 glass-nav slide-in-bottom">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Logo - Modern & Clean */}
            <div 
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
              onClick={handleLogoClick}
            >
              <div className="transition-transform duration-200 group-hover:scale-110">
                <img 
                  src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                  alt="NANASU Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tight text-[--brand-default]">
                  NANASU
                </h1>
                <p className="text-xs text-[--text-tertiary] leading-none">Nanas Asli Subang</p>
              </div>
            </div>

            {/* Navigation - Clean Pills */}
            <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => onNavigate('catalog')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${ currentPage === 'catalog' 
                    ? 'text-primary-foreground bg-primary shadow-md' 
                    : 'text-[--text-secondary] hover:text-primary hover:bg-accent'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('category')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  currentPage === 'category'
                    ? 'text-primary-foreground bg-primary shadow-md' 
                    : 'text-[--text-secondary] hover:text-primary hover:bg-accent'
                }`}
              >
                Kategori
              </button>
              <button
                onClick={() => onNavigate('news')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  currentPage === 'news' || currentPage === 'news-detail'
                    ? 'text-primary-foreground bg-primary shadow-md' 
                    : 'text-[--text-secondary] hover:text-primary hover:bg-accent'
                }`}
              >
                Berita
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  currentPage === 'about'
                    ? 'text-primary-foreground bg-primary shadow-md' 
                    : 'text-[--text-secondary] hover:text-primary hover:bg-accent'
                }`}
              >
                Tentang
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  currentPage === 'contact'
                    ? 'text-primary-foreground bg-primary shadow-md' 
                    : 'text-[--text-secondary] hover:text-primary hover:bg-accent'
                }`}
              >
                Kontak
              </button>
            </nav>

            {/* Search Bar - Prominent */}
            <div className="flex-1 max-w-2xl">
              <GlobalSearch 
                onSearch={handleSearch}
                onProductClick={onProductClick}
                isMobile={false}
              />
            </div>

            {/* Actions - Modern Icon Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onOpenNotifications}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-all duration-300 hover:scale-110 group focus-visible:focus-ring"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5 text-[--text-secondary] group-hover:text-primary transition-colors duration-300" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[--error] text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-md animate-in zoom-in-50 duration-300">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => onNavigate('cart')}
                className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-all duration-300 hover:scale-110 group focus-visible:focus-ring"
                title="Keranjang"
              >
                <ShoppingCart className="w-5 h-5 text-[--text-secondary] group-hover:text-primary transition-colors duration-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-md animate-in zoom-in-50 duration-300">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('account')}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-all duration-300 hover:scale-110 group focus-visible:focus-ring"
                title="Akun Saya"
              >
                <User className="w-5 h-5 text-[--text-secondary] group-hover:text-primary transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 glass-nav slide-in-bottom">
        <div className="px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
              onClick={handleLogoClick}
            >
              <div>
                <img 
                  src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                  alt="NANASU Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-base leading-none text-[--brand-default]">
                  NANASU
                </h1>
                <p className="text-xs text-[--text-tertiary] leading-none">Nanas Asli Subang</p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover:bg-muted transition-all active:scale-95 rounded-xl"
                onClick={onOpenNotifications}
              >
                <Bell className="w-5 h-5 text-[--text-secondary]" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[--error] hover:bg-[--error] min-w-5 h-5 flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-muted transition-all active:scale-95 rounded-xl"
                onClick={() => onNavigate('cart')}
              >
                <ShoppingCart className="w-5 h-5 text-[--text-secondary]" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground hover:bg-primary min-w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="pb-3 fade-in">
            <GlobalSearch 
              onSearch={handleSearch}
              onProductClick={onProductClick}
              isMobile={true}
            />
          </div>
        </div>
      </header>
    </>
  );
}
