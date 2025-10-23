import { useState, useEffect, useCallback } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginPage } from './components/pages/LoginPage';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { CatalogPage } from './components/pages/CatalogPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { NewsPage } from './components/pages/NewsPage';
import { AccountPage } from './components/pages/AccountPage';
import { OrdersPage } from './components/pages/OrdersPage';
import { OrderDetailPage } from './components/pages/OrderDetailPage';
import { ReturnsPage } from './components/pages/ReturnsPage';
import { AdminPage } from './components/pages/AdminPage';
import { NewsDetailPage } from './components/pages/NewsDetailPage';
import { CategoryPage } from './components/pages/CategoryPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { FreshPage } from './components/pages/FreshPage';
import { ProcessedPage } from './components/pages/ProcessedPage';
import { BundlePage } from './components/pages/BundlePage';
import { PreOrderPage } from './components/pages/PreOrderPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { ShippingStatusPage } from './components/pages/ShippingStatusPage';
import { EducationPage } from './components/pages/EducationPage';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { MitraLandingPage } from './components/pages/mitra/MitraLandingPage';
import { MitraLoginPage } from './components/pages/mitra/MitraLoginPage';
import { MitraOnboardingPage } from './components/pages/mitra/MitraOnboardingPage';
import { MitraDashboardPage } from './components/pages/mitra/MitraDashboardPage';
import { MitraOrderDetailPage } from './components/pages/mitra/MitraOrderDetailPage';
import { NotificationInbox } from './components/NotificationInbox';
import { UnsavedChangesDialog } from './components/UnsavedChangesDialog';
import { BackEdgeIndicator } from './components/BackEdgeIndicator';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import type { Notification, OrderExample, TrackingStep, CartItem } from './lib/services/customerJourney';
import { generateOrderId as generateOrderIdOld, generateResi as generateResiOld, createTrackingTimeline, dummyProfile } from './lib/services/customerJourney';
import type { Order, Return, Address } from './lib/services/ecommerceState';
import { 
  PRODUCTS, 
  SAMPLE_ORDERS, 
  SAMPLE_RETURNS,
  ADDRESSES, 
  SHIPPING_OPTIONS,
  validateVoucher,
  generateOrderId as generateOrderIdNew,
  generateRMAId,
  generateResi as generateResiNew,
  canReturnOrder
} from './lib/services/ecommerceState';
import { useNavigationHistory } from './lib/hooks/useNavigationHistory';
import { navigationHistory, captureScrollPosition, type UIState } from './lib/services/navigationHistory';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  
  // Customer Journey v2 State
  const [currentOrder, setCurrentOrder] = useState<OrderExample | null>(null);
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([]);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed'>('success');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotificationInbox, setShowNotificationInbox] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState<OrderExample[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('REG');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('WALLET');

  // E-commerce Full State
  const [ecomOrders, setEcomOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [returns, setReturns] = useState<Return[]>(SAMPLE_RETURNS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<Return | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(ADDRESSES[0]);
  const [appliedVoucher, setAppliedVoucher] = useState<string>('');
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);

  // Navigation History State
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{ page: string; params?: any } | null>(null);
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Mitra State
  const [selectedMitraOrderId, setSelectedMitraOrderId] = useState<string | null>(null);

  // Capture current UI state for history
  const getCurrentUIState = useCallback((): Partial<UIState> => {
    return {
      scrollY: captureScrollPosition(),
      modalOpen: showPaymentSuccess,
      sheetOpen: showNotificationInbox,
      isDirty: formIsDirty,
      isProcessing: isProcessingPayment,
      voucherCode: appliedVoucher,
    };
  }, [showPaymentSuccess, showNotificationInbox, formIsDirty, isProcessingPayment, appliedVoucher]);

  // Restore UI state from history
  const onRestoreUIState = useCallback((uiState: UIState) => {
    // Restore modals/sheets
    if (uiState.modalOpen !== undefined) {
      setShowPaymentSuccess(uiState.modalOpen);
    }
    if (uiState.sheetOpen !== undefined) {
      setShowNotificationInbox(uiState.sheetOpen);
    }
    if (uiState.voucherCode) {
      setAppliedVoucher(uiState.voucherCode);
    }
    // Other state restoration handled by individual pages
  }, []);

  // Enhanced navigation with history
  const handleNavigate = useCallback((page: string, params?: any) => {
    // Close any open modals/sheets first
    if (showPaymentSuccess) {
      setShowPaymentSuccess(false);
    }
    if (showNotificationInbox) {
      setShowNotificationInbox(false);
    }

    // Set the page
    setCurrentPage(page);

    // Update selected items based on params
    if (params?.product) {
      setSelectedProduct(params.product);
    }
    if (params?.article) {
      setSelectedArticle(params.article);
    }
    if (params?.order) {
      setSelectedOrder(params.order);
    }
    if (params?.return) {
      setSelectedReturn(params.return);
    }
    if (params?.mitraOrderId) {
      setSelectedMitraOrderId(params.mitraOrderId);
    }
  }, [showPaymentSuccess, showNotificationInbox]);

  // Setup navigation history hook
  const { handleBack, updateUIState, blockBack, canGoBack } = useNavigationHistory({
    currentPage,
    onNavigate: handleNavigate,
    getCurrentUIState,
    onRestoreUIState,
    enableGuards: true,
  });

  // Setup guard for unsaved changes
  useEffect(() => {
    navigationHistory.setGuard(async (entry) => {
      if (entry.uiState?.isDirty) {
        return new Promise((resolve) => {
          setPendingNavigation({ page: 'back', params: null });
          setShowUnsavedDialog(true);
          // Resolution handled by dialog callbacks
          (window as any).__navigationGuardResolve = resolve;
        });
      }
      return true;
    });
  }, []);

  // Handle unsaved changes dialog
  const handleConfirmLeave = useCallback(() => {
    setShowUnsavedDialog(false);
    setFormIsDirty(false);
    updateUIState({ isDirty: false });
    
    if ((window as any).__navigationGuardResolve) {
      (window as any).__navigationGuardResolve(true);
      delete (window as any).__navigationGuardResolve;
    }
  }, [updateUIState]);

  const handleCancelLeave = useCallback(() => {
    setShowUnsavedDialog(false);
    setPendingNavigation(null);
    
    if ((window as any).__navigationGuardResolve) {
      (window as any).__navigationGuardResolve(false);
      delete (window as any).__navigationGuardResolve;
    }
  }, []);

  useEffect(() => {
    // Loading screen with pineapple background - 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to top when page changes - INSTANT for immediate feedback
  useEffect(() => {
    // Only scroll to top if NOT restoring from back navigation
    if (!navigationHistory.isRestoring()) {
      // Force scroll to top immediately for forward navigation
      window.scrollTo(0, 0);
      
      // Also ensure document body scroll is reset
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    
    // Clear restoring flag after a short delay
    setTimeout(() => {
      navigationHistory.clearRestoringFlag();
    }, 200);
  }, [currentPage]);

  // Notification Helper
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Cart Management
  const addToCart = (product, quantity = 1) => {
    // Ensure product has required fields
    const normalizedProduct = {
      id: product.id || product.sku,
      sku: product.sku || product.id,
      name: product.name || product.title,
      price: product.price,
      image: product.image || product.thumb,
      variant: product.variant,
      stock: product.stock || 999,
      badges: product.badges,
      category: product.category
    };

    setCartItems(prev => {
      const productKey = `${normalizedProduct.id}-${normalizedProduct.variant || 'default'}`;
      const existingItem = prev.find(item => 
        `${item.id}-${item.variant || 'default'}` === productKey
      );
      
      if (existingItem) {
        // Check stock
        if (existingItem.quantity + quantity > existingItem.stock) {
          toast.error(`Stok tidak mencukupi, sisa ${existingItem.stock}`, {
            duration: 3000,
          });
          return prev;
        }

        const updated = prev.map(item =>
          `${item.id}-${item.variant || 'default'}` === productKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        toast.success(`${normalizedProduct.name} berhasil ditambahkan ke keranjang!`, {
          description: `Jumlah: ${existingItem.quantity + quantity}`,
          duration: 3000,
        });
        
        // Add notification
        addNotification({
          type: 'success',
          title: 'Produk Ditambahkan',
          message: `${normalizedProduct.name} telah ditambahkan ke keranjang`
        });
        
        return updated;
      }
      
      // Check stock for new item
      if (quantity > normalizedProduct.stock) {
        toast.error(`Stok tidak mencukupi, sisa ${normalizedProduct.stock}`, {
          duration: 3000,
        });
        return prev;
      }

      toast.success(`${normalizedProduct.name} berhasil ditambahkan ke keranjang!`, {
        description: `Jumlah: ${quantity}`,
        duration: 3000,
      });
      
      // Add notification
      addNotification({
        type: 'success',
        title: 'Produk Ditambahkan',
        message: `${normalizedProduct.name} telah ditambahkan ke keranjang`
      });
      
      return [...prev, { ...normalizedProduct, quantity, cartId: productKey }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      const itemToRemove = cartItems.find(item => 
        item.cartId === productId || item.id === productId
      );
      
      setCartItems(prev => prev.filter(item => 
        item.cartId !== productId && item.id !== productId
      ));
      
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} dihapus dari keranjang`, {
          duration: 3000,
        });
      }
    } else {
      setCartItems(prev =>
        prev.map(item =>
          (item.cartId === productId || item.id === productId) 
            ? { ...item, quantity } 
            : item
        )
      );
    }
  };

  const navigateToProduct = (product) => {
    handleNavigate('product', { product });
  };

  const navigateToArticle = (article) => {
    handleNavigate('news-detail', { article });
  };

  // Wishlist Management
  const addToWishlist = (product) => {
    const exists = wishlistItems.find(item => item.id === product.id);
    if (exists) {
      toast.info(`${product.name} sudah ada di wishlist`);
      return;
    }
    
    setWishlistItems(prev => [...prev, product]);
    toast.success(`${product.name} ditambahkan ke wishlist!`);
    addNotification({
      type: 'success',
      title: 'Wishlist',
      message: `${product.name} ditambahkan ke wishlist`
    });
  };

  const removeFromWishlist = (productId) => {
    const item = wishlistItems.find(i => i.id === productId);
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    if (item) {
      toast.info(`${item.name} dihapus dari wishlist`);
    }
  };

  const moveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  // Voucher Management
  const handleApplyVoucher = (code: string) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const result = validateVoucher(code, subtotal);
    
    if (result.valid) {
      setAppliedVoucher(code);
      setVoucherDiscount(result.discount);
      toast.success(result.message);
      addNotification({
        type: 'success',
        title: 'Voucher Diterapkan',
        message: result.message
      });
    } else {
      toast.error(result.message);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher('');
    setVoucherDiscount(0);
    toast.info('Voucher dihapus');
  };

  // Move item from cart to wishlist
  const moveCartItemToWishlist = (productId: string) => {
    const item = cartItems.find(i => i.id === productId || i.cartId === productId);
    if (item) {
      addToWishlist(item);
      updateCartQuantity(productId, 0);
      toast.success(`${item.name} dipindahkan ke wishlist`);
    }
  };

  // Address Management
  const handleAddAddress = (newAddress: Omit<Address, 'id'>) => {
    const address: Address = {
      ...newAddress,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [...prev, address]);
    toast.success('Alamat baru berhasil ditambahkan');
  };

  // Return Management
  const handleSubmitReturn = (returnData: any) => {
    const rmaId = generateRMAId();
    const now = new Date(2025, 9, 21, 11, 0); // 21 Okt 2025 11:00
    
    const newReturn: Return = {
      id: rmaId,
      orderId: returnData.orderId,
      date: now.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
      }) + ' WIB',
      dateObj: now,
      status: 'pending_pickup',
      items: returnData.items,
      reason: returnData.reason,
      reasonDetail: returnData.reasonDetail,
      photos: returnData.photos,
      returnMethod: returnData.returnMethod,
      refundMethod: returnData.refundMethod,
      refundAmount: returnData.refundAmount,
      address: returnData.address,
      estimatedRefund: '2-5 hari kerja setelah barang diterima',
      timeline: [
        {
          step: 'Pengajuan Diterima',
          description: 'Permintaan retur telah diterima',
          time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          completed: true,
          current: true
        },
        {
          step: returnData.returnMethod === 'pickup' ? 'Menunggu Pengambilan' : 'Menunggu Drop-off',
          description: returnData.returnMethod === 'pickup' 
            ? 'Kurir akan mengambil barang' 
            : 'Silakan antar barang ke konter',
          completed: false
        },
        {
          step: 'Diterima di Gudang',
          description: 'Barang telah diterima di gudang',
          completed: false
        },
        {
          step: 'Diperiksa QA',
          description: 'Barang sedang diperiksa tim QA',
          completed: false
        },
        {
          step: 'Disetujui',
          description: 'Retur disetujui',
          completed: false
        },
        {
          step: 'Refund Diproses',
          description: 'Dana refund sedang diproses',
          completed: false
        },
        {
          step: 'Refund Selesai',
          description: 'Dana refund telah dikembalikan',
          completed: false
        }
      ]
    };

    setReturns(prev => [newReturn, ...prev]);
    
    // Update order status to retur
    setEcomOrders(prev => prev.map(order => 
      order.id === returnData.orderId 
        ? { ...order, status: 'retur' as OrderStatus }
        : order
    ));
    
    toast.success(`Retur berhasil diajukan! RMA ID: ${rmaId}`);
    addNotification({
      type: 'success',
      title: 'Retur Diajukan',
      message: `Retur ${rmaId} telah dibuat. Ikuti instruksi pengembalian.`
    });
    
    handleNavigate('returns-list');
  };

  // Payment & Order Management
  const handlePaymentSuccess = () => {
    // Generate order
    const orderId = generateOrderIdNew();
    const now = new Date(2025, 9, 21, 10, 24); // 21 Okt 2025 10:24
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Get shipping fee based on selected method
    const shippingOption = SHIPPING_OPTIONS.find(s => s.id === selectedShippingMethod);
    const shippingFee = subtotal >= 100000 ? 0 : (shippingOption?.price || 12000);
    
    const discount = voucherDiscount;
    const total = subtotal + shippingFee - discount;

    // Create new order with proper type
    const newOrder: Order = {
      id: orderId,
      date: now.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
      }) + ' WIB',
      dateObj: now,
      status: 'diproses',
      paymentMethod: getPaymentMethodName(selectedPaymentMethod),
      paymentStatus: 'success',
      items: cartItems.map(item => ({
        id: item.id,
        sku: item.sku || item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        variant: item.variant,
        stock: item.stock || 999,
        quantity: item.quantity,
        cartId: item.cartId || `cart-${item.id}`
      })),
      subtotal,
      discount,
      shippingFee,
      shippingMethod: shippingOption?.name || 'Reguler',
      total,
      address: selectedAddress,
      voucher: appliedVoucher,
      timeline: [
        {
          step: 'Order Placed',
          description: 'Pesanan berhasil dibuat',
          time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          completed: true
        },
        {
          step: 'Payment Confirmed',
          description: 'Pembayaran berhasil dikonfirmasi',
          time: new Date(now.getTime() + 60000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          completed: true
        },
        {
          step: 'Packed',
          description: 'Pesanan sedang dikemas',
          completed: false,
          current: true
        },
        {
          step: 'Pickup',
          description: 'Menunggu pickup kurir',
          completed: false
        },
        {
          step: 'In-Transit',
          description: 'Paket dalam perjalanan',
          completed: false
        },
        {
          step: 'Out for Delivery',
          description: 'Paket sedang diantar ke alamat tujuan',
          completed: false
        },
        {
          step: 'Delivered',
          description: 'Paket telah diterima',
          completed: false
        }
      ]
    };

    setEcomOrders(prev => [newOrder, ...prev]);
    setSelectedOrder(newOrder);
    
    // Also set old order format for compatibility
    const oldOrder: OrderExample = {
      orderId,
      subtotal,
      shippingFee,
      discount,
      total,
      items: cartItems.map(item => ({
        productId: item.id,
        title: item.name,
        variant: item.variant,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        thumb: item.image || item.thumb,
        stock: item.stock || 999
      })),
      shippingAddress: dummyProfile.addresses[dummyProfile.defaultAddressIndex],
      paymentMethod: selectedPaymentMethod,
      createdAt: now
    };
    
    setCurrentOrder(oldOrder);
    setOrders(prev => [oldOrder, ...prev]);
    
    // Clear cart and voucher
    setCartItems([]);
    setAppliedVoucher('');
    setVoucherDiscount(0);

    // Show success modal
    setPaymentStatus('success');
    setShowPaymentSuccess(true);

    // Add notification
    addNotification({
      type: 'success',
      title: 'Pembayaran Berhasil',
      message: `Pesanan ${orderId} telah dibayar. Total: Rp ${total.toLocaleString('id-ID')}`
    });

    // Simulate order updates
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: 'Pesanan Diproses',
        message: `Pesanan ${orderId} sedang diproses.`
      });
    }, 3000);
  };

  const getPaymentMethodName = (method: string): string => {
    const methods = {
      'WALLET': 'E-Wallet (DANA)',
      'VA_BNI': 'VA BNI',
      'CARD': 'Kartu (Visa)',
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'bca': 'VA BCA',
      'mandiri': 'VA Mandiri',
      'bni': 'VA BNI'
    };
    return methods[method] || method;
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Clear history on login
    navigationHistory.clear();
    // Regular user goes to catalog
    if (userData.role === 'customer') {
      handleNavigate('catalog');
    }
  };

  const handleAdminLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Clear history and go to admin
    navigationHistory.clear();
    handleNavigate('admin');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCartItems([]);
    // Clear history on logout
    navigationHistory.clear();
    handleNavigate('catalog');
    toast.info('Anda telah logout dari NANASU');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onAdminLogin={handleAdminLogin}
      />
    );
  }

  // Admin view - full screen, no header/footer
  if (currentPage === 'admin' && user?.role === 'admin') {
    return (
      <>
        <AdminPage 
          userEmail={user?.email}
          onLogout={handleLogout}
        />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'catalog':
        return <CatalogPage onProductClick={navigateToProduct} onAddToCart={addToCart} onNavigate={setCurrentPage} />;
      case 'product':
        return (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            onBuyNow={(product, quantity) => {
              addToCart(product, quantity);
              handleNavigate('checkout');
            }}
            onBack={handleBack}
          />
        );
      case 'cart':
        return (
          <CartPage
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={() => handleNavigate('checkout')}
            onMoveToWishlist={moveCartItemToWishlist}
            onApplyVoucher={handleApplyVoucher}
            onRemoveVoucher={handleRemoveVoucher}
            appliedVoucher={appliedVoucher}
            voucherDiscount={voucherDiscount}
            onContinueShopping={() => handleNavigate('catalog')}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            cartItems={cartItems} 
            onBack={handleBack}
            onPaymentSuccess={handlePaymentSuccess}
            selectedShipping={selectedShippingMethod}
            onShippingChange={setSelectedShippingMethod}
            selectedPayment={selectedPaymentMethod}
            onPaymentChange={setSelectedPaymentMethod}
            addresses={addresses}
            selectedAddress={selectedAddress}
            onAddressChange={setSelectedAddress}
            onAddAddress={handleAddAddress}
            appliedVoucher={appliedVoucher}
            voucherDiscount={voucherDiscount}
          />
        );
      case 'news':
        return <NewsPage onArticleClick={navigateToArticle} />;
      case 'news-detail':
        return <NewsDetailPage article={selectedArticle} onBack={handleBack} />;
      case 'category':
        return (
          <CategoryPage
            onBack={handleBack}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        );
      case 'fresh':
        return (
          <FreshPage
            onBack={handleBack}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        );
      case 'processed':
        return (
          <ProcessedPage
            onBack={handleBack}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        );
      case 'bundle':
        return (
          <BundlePage
            onBack={handleBack}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        );
      case 'preorder':
        return (
          <PreOrderPage
            onBack={handleBack}
            onProductClick={navigateToProduct}
            onAddToCart={addToCart}
          />
        );
      case 'about':
        return <AboutPage onBack={handleBack} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onBack={handleBack} />;
      case 'mitra-landing':
        return <MitraLandingPage onNavigate={handleNavigate} />;
      case 'mitra-login':
        return <MitraLoginPage onNavigate={handleNavigate} onBack={handleBack} onLoginSuccess={() => {}} />;
      case 'mitra-onboarding':
        return <MitraOnboardingPage onNavigate={handleNavigate} onBack={handleBack} />;
      case 'mitra-dashboard':
        return <MitraDashboardPage onNavigate={handleNavigate} onBack={handleBack} />;
      case 'mitra-order-detail':
        return <MitraOrderDetailPage orderId={selectedMitraOrderId} onBack={handleBack} onNavigate={handleNavigate} />;
      case 'orders':
        return (
          <OrdersPage 
            orders={ecomOrders.map(order => ({
              id: order.id,
              date: order.date,
              status: order.status === 'retur' ? 'selesai' : order.status === 'diproses' ? 'dikemas' : order.status,
              items: order.items.map(item => ({
                id: item.id,
                name: item.name,
                image: item.image,
                quantity: item.quantity,
                price: item.price
              })),
              total: order.total,
              trackingNumber: order.resi,
              estimatedDelivery: order.estimatedDelivery,
              deliveredDate: order.deliveredDate,
              canReview: order.canReturn
            }))}
            onViewOrder={(order: any) => {
              const fullOrder = ecomOrders.find(o => o.id === order.id);
              if (fullOrder) {
                handleNavigate('order-detail', { order: fullOrder });
              }
            }}
          />
        );
      case 'order-detail':
        return selectedOrder ? (
          <OrderDetailPage 
            order={selectedOrder}
            onBack={handleBack}
            onReturnOrder={(order) => {
              setSelectedOrder(order);
              handleNavigate('returns-create', { order });
            }}
            onCopyResi={(resi) => {
              toast.success('Nomor resi berhasil disalin');
            }}
            onCopyOrderId={(orderId) => {
              toast.success('Order ID berhasil disalin');
            }}
          />
        ) : null;
      case 'returns-create':
        return selectedOrder ? (
          <ReturnsPage
            mode="create"
            order={selectedOrder}
            onBack={handleBack}
            onSubmitReturn={handleSubmitReturn}
          />
        ) : null;
      case 'returns-list':
        return (
          <ReturnsPage
            mode="list"
            returns={returns}
            onBack={handleBack}
            onViewReturn={(returnData) => {
              setSelectedReturn(returnData);
              handleNavigate('returns-detail', { return: returnData });
            }}
          />
        );
      case 'returns-detail':
        return selectedReturn ? (
          <ReturnsPage
            mode="detail"
            selectedReturn={selectedReturn}
            onBack={handleBack}
          />
        ) : null;
      case 'shipping-status':
        return currentOrder ? (
          <ShippingStatusPage
            order={currentOrder}
            trackingSteps={trackingSteps}
            shippingAddress={currentOrder.shippingAddress || dummyProfile.addresses[0]}
            onBack={handleBack}
          />
        ) : null;
      case 'account':
        return <AccountPage user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />;
      case 'wishlist':
        return (
          <WishlistPage 
            items={wishlistItems}
            onNavigate={setCurrentPage} 
            onAddToCart={moveToCart}
            onRemove={removeFromWishlist}
          />
        );
      case 'education':
        return <EducationPage onBack={handleBack} />;
      default:
        return <CatalogPage onProductClick={navigateToProduct} onAddToCart={addToCart} onNavigate={setCurrentPage} />;
    }
  };

  // Mitra view - full screen, no header/footer
  if (currentPage.startsWith('mitra-')) {
    return (
      <>
        <div className="min-h-screen bg-pattern tropical-mesh relative">
          {/* Custom brand colors */}
          <style>{`
            :root {
              --nanasu-yellow: #FACC15;
              --nanasu-green: #16A34A;
              --nanasu-dark: #1F2937;
              --nanasu-white: #FFFFFF;
            }
          `}</style>
          
          {/* Decorative floating orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div 
              className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(250, 204, 21, 0.4) 0%, transparent 70%)',
                animation: 'float 20s ease-in-out infinite',
              }}
            />
            <div 
              className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(75, 93, 255, 0.3) 0%, transparent 70%)',
                animation: 'float 25s ease-in-out infinite',
                animationDelay: '5s',
              }}
            />
            <div 
              className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(19, 194, 179, 0.3) 0%, transparent 70%)',
                animation: 'float 18s ease-in-out infinite',
                animationDelay: '10s',
              }}
            />
          </div>
          
          <div className="relative z-10">
            <main className="page-transition">
              {renderPage()}
            </main>
          </div>
        </div>
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-pattern tropical-mesh relative">
      {/* Custom brand colors */}
      <style>{`
        :root {
          --nanasu-yellow: #FACC15;
          --nanasu-green: #16A34A;
          --nanasu-dark: #1F2937;
          --nanasu-white: #FFFFFF;
        }
      `}</style>
      
      {/* Decorative floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(250, 204, 21, 0.4) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(75, 93, 255, 0.3) 0%, transparent 70%)',
            animation: 'float 25s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />
        <div 
          className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(19, 194, 179, 0.3) 0%, transparent 70%)',
            animation: 'float 18s ease-in-out infinite',
            animationDelay: '10s',
          }}
        />
      </div>
      
      <div className="relative z-10">
        <Header 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          user={user}
          onProductClick={navigateToProduct}
          notificationCount={notifications.filter(n => !n.read).length}
          onOpenNotifications={() => setShowNotificationInbox(true)}
        />
        
        <main className="pb-16 md:pb-0 page-transition">
          {renderPage()}
        </main>
        
        <BottomNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
      
      {/* Payment Success Modal */}
      <PaymentSuccessModal
        open={showPaymentSuccess}
        onClose={() => setShowPaymentSuccess(false)}
        status={paymentStatus}
        orderId={currentOrder?.orderId}
        total={currentOrder?.total}
        paymentMethod={currentOrder?.paymentMethod}
        onViewShipping={() => {
          setShowPaymentSuccess(false);
          handleNavigate('shipping-status');
        }}
        onBackToHome={() => {
          setShowPaymentSuccess(false);
          handleNavigate('catalog');
        }}
      />
      
      {/* Notification Inbox */}
      <NotificationInbox
        open={showNotificationInbox}
        onClose={() => setShowNotificationInbox(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onDelete={deleteNotification}
        onClearAll={clearAllNotifications}
      />

      {/* Back Edge Indicator for Mobile */}
      <BackEdgeIndicator
        canGoBack={canGoBack()}
        onBack={handleBack}
      />

      {/* Unsaved Changes Dialog */}
      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
      
      <Toaster 
        position="top-center" 
        richColors 
        closeButton
        theme="light"
      />
    </div>
  );
}