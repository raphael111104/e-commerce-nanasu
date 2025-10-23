import { useState } from 'react';
import { AdminLayout } from '../admin/AdminLayout';
import { BerandaPage } from '../admin/pages/BerandaPage';
import { OrdersPage } from '../admin/pages/OrdersPage';
import { ProductsPage } from '../admin/pages/ProductsPage';
import { PengirimanPage } from '../admin/pages/PengirimanPage';
import { VoucherPage } from '../admin/pages/VoucherPage';
import { UlasanPage } from '../admin/pages/UlasanPage';
import { PenggunaPage } from '../admin/pages/PenggunaPage';
import { KeuanganPage } from '../admin/pages/KeuanganPage';
import { LaporanPage } from '../admin/pages/LaporanPage';
import { PengaturanPage } from '../admin/pages/PengaturanPage';
import { mockUsers } from '../../lib/admin/mockData';

interface AdminPageProps {
  userEmail?: string;
  onLogout?: () => void;
}

export function AdminPage({ userEmail = 'admin@nanasu.com', onLogout }: AdminPageProps) {
  const [currentPage, setCurrentPage] = useState('beranda');
  
  // Find user by email or default to admin
  const currentUser = mockUsers.find(u => u.email === userEmail) || mockUsers[0];

  const renderPage = () => {
    switch (currentPage) {
      case 'beranda':
        return <BerandaPage />;
      case 'produk':
        return <ProductsPage />;
      case 'pesanan':
        return <OrdersPage />;
      case 'pengiriman':
        return <PengirimanPage />;
      case 'voucher':
        return <VoucherPage />;
      case 'ulasan':
        return <UlasanPage />;
      case 'pengguna':
        return <PenggunaPage />;
      case 'keuangan':
        return <KeuanganPage />;
      case 'laporan':
        return <LaporanPage />;
      case 'pengaturan':
        return <PengaturanPage />;
      
      default:
        return <BerandaPage />;
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleNavigate = (page: string) => {
    // If navigating back to catalog from sidebar, call onLogout to switch context
    if (page === 'catalog') {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <AdminLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      user={currentUser}
      onLogout={handleLogout}
    >
      {renderPage()}
    </AdminLayout>
  );
}
