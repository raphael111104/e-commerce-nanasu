import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Truck, Tag, Star,
  Users, DollarSign, BarChart3, Settings as SettingsIcon,
  Menu, X, Search, Bell, User as UserIcon, LogOut,
  ChevronDown, Sun, Moon, Monitor, Home, MoreHorizontal
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';
import type { User } from '../../lib/admin/mockData';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User;
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge?: number | string;
  showInBottomNav?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 'beranda',
    label: 'Beranda',
    icon: LayoutDashboard,
    showInBottomNav: true
  },
  {
    id: 'produk',
    label: 'Produk',
    icon: Package,
    showInBottomNav: true
  },
  {
    id: 'pesanan',
    label: 'Pesanan',
    icon: ShoppingCart,
    badge: 8,
    showInBottomNav: true
  },
  {
    id: 'pengiriman',
    label: 'Pengiriman',
    icon: Truck,
    showInBottomNav: true
  },
  {
    id: 'voucher',
    label: 'Voucher',
    icon: Tag,
    showInBottomNav: false
  },
  {
    id: 'ulasan',
    label: 'Ulasan',
    icon: Star,
    badge: 2,
    showInBottomNav: false
  },
  {
    id: 'pengguna',
    label: 'Pengguna & Peran',
    icon: Users,
    showInBottomNav: false
  },
  {
    id: 'keuangan',
    label: 'Keuangan',
    icon: DollarSign,
    showInBottomNav: false
  },
  {
    id: 'laporan',
    label: 'Laporan',
    icon: BarChart3,
    showInBottomNav: false
  },
  {
    id: 'pengaturan',
    label: 'Pengaturan',
    icon: SettingsIcon,
    showInBottomNav: false
  }
];

export function AdminLayout({ children, currentPage, onNavigate, user, onLogout }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: { label: 'Admin', className: 'bg-purple-600' },
      manager: { label: 'Manager', className: 'bg-blue-600' },
      cs: { label: 'CS', className: 'bg-green-600' },
      editor: { label: 'Editor', className: 'bg-orange-600' }
    };
    return badges[role as keyof typeof badges] || badges.admin;
  };

  const roleBadge = getRoleBadge(user.role);
  const bottomNavItems = menuItems.filter(item => item.showInBottomNav);
  const overflowItems = menuItems.filter(item => !item.showInBottomNav);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex bg-white/95 backdrop-blur-xl border-r border-gray-200/50 transition-all duration-300 flex-col fixed h-screen z-40 shadow-xl',
          sidebarCollapsed ? 'w-20' : 'w-72'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#16a34a] rounded-xl flex items-center justify-center">
                <img 
                  src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                  alt="NANASU"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">NANASU</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#16a34a] rounded-xl flex items-center justify-center mx-auto">
              <img 
                src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                alt="NANASU"
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
          
          {!sidebarCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(true)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <TooltipProvider>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Tooltip key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm',
                        currentPage === item.id
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#16a34a] text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100',
                        sidebarCollapsed && 'justify-center'
                      )}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant={typeof item.badge === 'number' ? 'default' : 'destructive'}
                              className="h-5 min-w-5 px-1.5 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </button>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </ScrollArea>

        {/* Collapse Button */}
        {sidebarCollapsed && (
          <div className="p-3 border-t border-gray-200">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(false)}
              className="w-full"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'flex-1 flex flex-col transition-all duration-300',
          'md:ml-20 lg:ml-72',
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-72'
        )}
      >
        {/* Top Bar */}
        <header className="h-14 md:h-16 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-3 md:px-6 sticky top-0 z-30 shadow-sm">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari..."
                className="pl-10 bg-gray-50 border-gray-200 h-9"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                  <Avatar className="w-7 h-7 md:w-8 md:h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-[#D4AF37] to-[#16a34a] text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-500 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      <Badge className={cn('h-5 text-xs', roleBadge.className)}>
                        {roleBadge.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 font-normal">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('catalog')}>
                  <Home className="mr-2 h-4 w-4" />
                  Kembali ke Toko
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="grid grid-cols-5 h-16">
            {bottomNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 relative transition-colors',
                  currentPage === item.id
                    ? 'text-[#D4AF37]'
                    : 'text-gray-600'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
                {item.badge && (
                  <Badge className="absolute top-1 right-4 h-4 min-w-4 px-1 text-xs bg-red-500">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
            
            {/* Lainnya Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-1 text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                  <span className="text-xs">Lainnya</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {overflowItems.map((item) => (
                  <DropdownMenuItem key={item.id} onClick={() => onNavigate(item.id)}>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto h-5 min-w-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl">
            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#16a34a] rounded-xl flex items-center justify-center">
                  <img 
                    src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                    alt="NANASU"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg">NANASU</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-3.5rem)] px-3 py-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm',
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#16a34a] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge className="h-5 min-w-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </aside>
        </>
      )}
    </div>
  );
}
