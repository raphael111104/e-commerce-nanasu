import { useState } from 'react';
import { 
  Home, Package, ShoppingCart, Truck, Wallet, HelpCircle, Menu, X, 
  LogOut, Bell, User, ChevronDown
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

// Import tab components
import { MitraBerandaTab } from './tabs/MitraBerandaTab';
import { MitraProdukTab } from './tabs/MitraProdukTab';
import { MitraPesananTab } from './tabs/MitraPesananTab';
import { MitraPengirimanTab } from './tabs/MitraPengirimanTab';
import { MitraKeuanganTab } from './tabs/MitraKeuanganTab';
import { MitraBantuanTab } from './tabs/MitraBantuanTab';

export function MitraDashboardPage({ onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState('beranda');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-5 h-5" />, badge: null },
    { id: 'produk', label: 'Produk', icon: <Package className="w-5 h-5" />, badge: null },
    { id: 'pesanan', label: 'Pesanan', icon: <ShoppingCart className="w-5 h-5" />, badge: 3 },
    { id: 'pengiriman', label: 'Pengiriman', icon: <Truck className="w-5 h-5" />, badge: null },
    { id: 'keuangan', label: 'Keuangan', icon: <Wallet className="w-5 h-5" />, badge: null },
    { id: 'bantuan', label: 'Bantuan', icon: <HelpCircle className="w-5 h-5" />, badge: null },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <MitraBerandaTab onNavigate={onNavigate} />;
      case 'produk':
        return <MitraProdukTab />;
      case 'pesanan':
        return <MitraPesananTab onNavigate={onNavigate} />;
      case 'pengiriman':
        return <MitraPengirimanTab />;
      case 'keuangan':
        return <MitraKeuanganTab />;
      case 'bantuan':
        return <MitraBantuanTab />;
      default:
        return <MitraBerandaTab onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header - Mobile Optimized */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Menu Toggle & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-base sm:text-lg text-gray-900 truncate">Dashboard Mitra</h1>
              <p className="text-xs text-gray-500 hidden sm:block truncate">Toko Nanas Subang Jaya</p>
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 p-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#16A34A] to-[#D4AF37] flex items-center justify-center text-white text-sm font-semibold">
                    T
                  </div>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 sm:w-56">
                <DropdownMenuLabel className="text-sm">Akun Mitra</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBack()} className="text-sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation (Desktop) - Mobile Optimized */}
        <aside className={`
          fixed md:sticky top-14 sm:top-16 left-0 z-30 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 sm:w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 md:transform-none overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-3 sm:p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#16A34A] to-[#D4AF37] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }
                `}
              >
                {tab.icon}
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.badge && (
                  <Badge variant="secondary" className={`text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'}`}>
                    {tab.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Mobile Optimized */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 pb-20 sm:pb-24 md:pb-6 overflow-x-hidden">
          {renderTabContent()}
        </main>
      </div>

      {/* Bottom Navigation (Mobile) - Improved Responsiveness */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg safe-area-bottom">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-0.5 sm:gap-1 p-1 sm:p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-2 sm:py-2.5 rounded-lg transition-all active:scale-95
                ${activeTab === tab.id
                  ? 'text-[#16A34A] bg-[#16A34A]/5'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <div className="relative">
                <div className={`${activeTab === tab.id ? 'scale-110' : ''} transition-transform`}>
                  {tab.icon}
                </div>
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-white text-[9px] sm:text-[10px] flex items-center justify-center font-semibold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-medium leading-tight text-center ${activeTab === tab.id ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-0.5 sm:h-1 bg-[#16A34A] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
