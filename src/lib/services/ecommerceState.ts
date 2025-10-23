/**
 * E-commerce State Management Service
 * Centralized state for: Products, Cart, Wishlist, Orders, Returns, Addresses, Vouchers
 */

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  stock: number;
  rating?: number;
  badges?: string[];
  category?: string;
  description?: string;
  isPO?: boolean; // Pre-Order
}

export interface CartItem extends Product {
  quantity: number;
  cartId: string;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isMain?: boolean;
}

export interface Voucher {
  code: string;
  discount: number; // percentage or fixed
  type: 'percentage' | 'fixed';
  minPurchase: number;
  maxDiscount?: number;
}

export type OrderStatus = 'diproses' | 'dikirim' | 'selesai' | 'dibatalkan' | 'retur';

export interface OrderTimeline {
  step: string;
  description: string;
  time?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  date: string;
  dateObj: Date;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'success' | 'pending' | 'failed';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  shippingMethod: string;
  total: number;
  address: Address;
  timeline: OrderTimeline[];
  resi?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  voucher?: string;
  notes?: string;
  canReturn?: boolean;
}

export type ReturnStatus = 
  | 'pending_pickup'
  | 'picked_up'
  | 'received'
  | 'inspecting'
  | 'approved'
  | 'rejected'
  | 'refund_processing'
  | 'refund_completed';

export interface ReturnItem {
  productId: string;
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Return {
  id: string; // RMA ID
  orderId: string;
  date: string;
  dateObj: Date;
  status: ReturnStatus;
  items: ReturnItem[];
  reason: string;
  reasonDetail?: string;
  photos?: string[];
  returnMethod: 'pickup' | 'dropoff';
  refundMethod: string;
  refundAmount: number;
  timeline: OrderTimeline[];
  estimatedRefund?: string;
  address?: Address;
}

// ============================================================================
// DUMMY PRODUCTS (8 items as specified)
// ============================================================================

export const PRODUCTS: Product[] = [
  {
    id: 'NNS-MD-15',
    sku: 'NNS-MD-15',
    name: 'Nanas Madu Premium 1,5kg',
    price: 39000,
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=800&q=80',
    variant: '1,5kg/pcs',
    stock: 120,
    rating: 4.7,
    badges: ['Panen Baru'],
    category: 'fresh',
    description: 'Nanas madu premium dengan rasa manis alami, langsung dari kebun Subang. Berat 1,5kg per buah, sempurna untuk keluarga.'
  },
  {
    id: 'NNS-HN-P3',
    sku: 'NNS-HN-P3',
    name: 'Nanas Honi Mini (Pack isi 3)',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1735052963684-f9e1f4f3ba38?w=800&q=80',
    variant: 'Mini/3pcs',
    stock: 80,
    rating: 4.5,
    badges: ['Favorit'],
    category: 'fresh',
    description: 'Nanas mini Honi yang manis dan praktis. Isi 3 buah per pack, cocok untuk camilan sehat.'
  },
  {
    id: 'NNS-BD-SM',
    sku: 'NNS-BD-SM',
    name: 'Paket Bundling Smoothies',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?w=800&q=80',
    variant: 'Bundle 3 item',
    stock: 45,
    badges: ['Hemat'],
    category: 'bundle',
    description: 'Paket hemat berisi 3 item pilihan untuk smoothie: nanas segar, madu, dan topping spesial.'
  },
  {
    id: 'NNS-KY-20',
    sku: 'NNS-KY-20',
    name: 'Nanas Kayna Grade A 2kg',
    price: 49000,
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=800&q=80',
    variant: '2kg/pcs',
    stock: 60,
    rating: 4.6,
    category: 'fresh',
    description: 'Nanas Kayna kualitas Grade A dengan ukuran besar 2kg. Daging tebal, manis, dan segar.'
  },
  {
    id: 'NNS-KP-05',
    sku: 'NNS-KP-05',
    name: 'Nanas Kupas Siap Santap 500g',
    price: 19000,
    image: 'https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?w=800&q=80',
    variant: '500g Cup',
    stock: 150,
    badges: ['Ready to Eat'],
    category: 'processed',
    description: 'Nanas sudah dikupas dan dipotong, siap santap dalam cup 500g. Higienis dan praktis.'
  },
  {
    id: 'NNS-SL-25',
    sku: 'NNS-SL-25',
    name: 'Selai Nanas Artisan 250g',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?w=800&q=80',
    variant: '250g Jar',
    stock: 70,
    category: 'processed',
    description: 'Selai nanas homemade dengan resep artisan. Tanpa pengawet, cocok untuk roti dan kue.'
  },
  {
    id: 'NNS-KR-10',
    sku: 'NNS-KR-10',
    name: 'Keripik Nanas Crispy 100g',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?w=800&q=80',
    variant: '100g',
    stock: 200,
    badges: ['Best Seller'],
    category: 'processed',
    description: 'Keripik nanas renyah dan gurih, terbuat dari nanas pilihan. Camilan sehat tanpa MSG.'
  },
  {
    id: 'NNS-PO-OR',
    sku: 'NNS-PO-OR',
    name: 'Pre-Order Nanas Organik',
    price: 59000,
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=800&q=80',
    variant: '2kg (PO H+3)',
    stock: 999,
    badges: ['Pre-Order'],
    category: 'fresh',
    description: 'Nanas organik premium, ditanam tanpa pestisida kimia. Pre-order pengiriman H+3.',
    isPO: true
  }
];

// ============================================================================
// VOUCHERS
// ============================================================================

export const VOUCHERS: Record<string, Voucher> = {
  'NANASU10': {
    code: 'NANASU10',
    discount: 10,
    type: 'percentage',
    minPurchase: 50000,
    maxDiscount: 50000
  },
  'HEMAT5': {
    code: 'HEMAT5',
    discount: 5000,
    type: 'fixed',
    minPurchase: 0
  }
};

// ============================================================================
// ADDRESSES
// ============================================================================

export const ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Rumah',
    name: 'Dita Ramadhani',
    phone: '0812-3456-7890',
    address: 'Jl. Veteran No. 12, Purwakarta, Jawa Barat 41118',
    isMain: true
  },
  {
    id: 'addr-2',
    label: 'Kampus',
    name: 'UPI PSTI',
    phone: '0851-1122-3344',
    address: 'Jl. Pahlawan, Purwakarta, Jawa Barat 41151',
    isMain: false
  }
];

// ============================================================================
// SHIPPING OPTIONS
// ============================================================================

export interface ShippingOption {
  id: string;
  name: string;
  eta: string;
  price: number;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'regular',
    name: 'Reguler',
    eta: '2-3 hari',
    price: 12000
  },
  {
    id: 'kilat',
    name: 'Kilat',
    eta: '1-2 hari',
    price: 22000
  },
  {
    id: 'po',
    name: 'PO',
    eta: 'Estimasi kirim 24 Okt 2025',
    price: 0
  }
];

// ============================================================================
// SAMPLE ORDERS
// ============================================================================

export const SAMPLE_ORDERS: Order[] = [
  // Order A - Baru dibuat (Diproses)
  {
    id: 'NNS-251021-8742',
    date: '21 Okt 2025 10:24 WIB',
    dateObj: new Date(2025, 9, 21, 10, 24),
    status: 'diproses',
    paymentMethod: 'E-Wallet (DANA)',
    paymentStatus: 'success',
    items: [
      {
        id: 'NNS-MD-15',
        sku: 'NNS-MD-15',
        name: 'Nanas Madu Premium 1,5kg',
        price: 39000,
        image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=800&q=80',
        variant: '1,5kg/pcs',
        stock: 120,
        quantity: 2,
        cartId: 'cart-1'
      },
      {
        id: 'NNS-KR-10',
        sku: 'NNS-KR-10',
        name: 'Keripik Nanas Crispy 100g',
        price: 22000,
        image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?w=800&q=80',
        variant: '100g',
        stock: 200,
        quantity: 1,
        cartId: 'cart-2'
      }
    ],
    subtotal: 100000,
    discount: 10000,
    shippingFee: 12000,
    shippingMethod: 'Reguler',
    total: 102000,
    voucher: 'NANASU10',
    address: ADDRESSES[0],
    timeline: [
      {
        step: 'Order Placed',
        description: 'Pesanan berhasil dibuat',
        time: '21 Okt 2025 10:24',
        completed: true,
        current: false
      },
      {
        step: 'Payment Confirmed',
        description: 'Pembayaran berhasil dikonfirmasi',
        time: '21 Okt 2025 10:25',
        completed: true,
        current: false
      },
      {
        step: 'Packed',
        description: 'Pesanan sedang dikemas',
        time: '-',
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
  },
  
  // Order B - Sedang dikirim
  {
    id: 'NNS-211021-5521',
    date: '21 Okt 2025 09:05 WIB',
    dateObj: new Date(2025, 9, 21, 9, 5),
    status: 'dikirim',
    paymentMethod: 'VA BCA',
    paymentStatus: 'success',
    items: [
      {
        id: 'NNS-KY-20',
        sku: 'NNS-KY-20',
        name: 'Nanas Kayna Grade A 2kg',
        price: 49000,
        image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=800&q=80',
        variant: '2kg/pcs',
        stock: 60,
        quantity: 1,
        cartId: 'cart-3'
      }
    ],
    subtotal: 49000,
    discount: 0,
    shippingFee: 22000,
    shippingMethod: 'Kilat',
    total: 71000,
    address: ADDRESSES[0],
    resi: 'NNSJKT012345678',
    estimatedDelivery: '22 Okt 2025',
    timeline: [
      {
        step: 'Order Placed',
        description: 'Pesanan berhasil dibuat',
        time: '21 Okt 2025 09:05',
        completed: true
      },
      {
        step: 'Payment Confirmed',
        description: 'Pembayaran berhasil dikonfirmasi',
        time: '21 Okt 2025 09:06',
        completed: true
      },
      {
        step: 'Packed',
        description: 'Pesanan telah dikemas',
        time: '21 Okt 2025 09:30',
        completed: true
      },
      {
        step: 'Pickup',
        description: 'Paket telah diambil kurir',
        time: '21 Okt 2025 11:00',
        completed: true
      },
      {
        step: 'In-Transit',
        description: 'Paket dalam perjalanan ke Purwakarta',
        time: '-',
        completed: false,
        current: true
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
  },
  
  // Order C - Selesai (bisa return)
  {
    id: 'NNS-191021-3320',
    date: '19 Okt 2025 14:17 WIB',
    dateObj: new Date(2025, 9, 19, 14, 17),
    status: 'selesai',
    paymentMethod: 'Kartu (Visa)',
    paymentStatus: 'success',
    items: [
      {
        id: 'NNS-SL-25',
        sku: 'NNS-SL-25',
        name: 'Selai Nanas Artisan 250g',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?w=800&q=80',
        variant: '250g Jar',
        stock: 70,
        quantity: 2,
        cartId: 'cart-4'
      }
    ],
    subtotal: 70000,
    discount: 0,
    shippingFee: 12000,
    shippingMethod: 'Reguler',
    total: 82000,
    address: ADDRESSES[0],
    resi: 'NNSJKT987654321',
    deliveredDate: '20 Okt 2025',
    canReturn: true,
    timeline: [
      {
        step: 'Order Placed',
        description: 'Pesanan berhasil dibuat',
        time: '19 Okt 2025 14:17',
        completed: true
      },
      {
        step: 'Payment Confirmed',
        description: 'Pembayaran berhasil dikonfirmasi',
        time: '19 Okt 2025 14:18',
        completed: true
      },
      {
        step: 'Packed',
        description: 'Pesanan telah dikemas',
        time: '19 Okt 2025 15:00',
        completed: true
      },
      {
        step: 'Pickup',
        description: 'Paket telah diambil kurir',
        time: '19 Okt 2025 17:00',
        completed: true
      },
      {
        step: 'In-Transit',
        description: 'Paket dalam perjalanan',
        time: '19 Okt 2025 18:00',
        completed: true
      },
      {
        step: 'Out for Delivery',
        description: 'Paket sedang diantar',
        time: '20 Okt 2025 08:00',
        completed: true
      },
      {
        step: 'Delivered',
        description: 'Paket telah diterima',
        time: '20 Okt 2025 10:30',
        completed: true,
        current: true
      }
    ]
  }
];

// ============================================================================
// SAMPLE RETURNS
// ============================================================================

export const SAMPLE_RETURNS: Return[] = [
  {
    id: 'RMA-251021-0067',
    orderId: 'NNS-191021-3320',
    date: '21 Okt 2025 11:00 WIB',
    dateObj: new Date(2025, 9, 21, 11, 0),
    status: 'inspecting',
    items: [
      {
        productId: 'NNS-SL-25',
        name: 'Selai Nanas Artisan 250g',
        variant: '250g Jar',
        quantity: 1,
        price: 35000,
        image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?w=800&q=80'
      }
    ],
    reason: 'Produk rusak',
    reasonDetail: 'Tutup jar bocor, selai tumpah',
    returnMethod: 'pickup',
    refundMethod: 'Kartu (Visa)',
    refundAmount: 35000,
    address: ADDRESSES[0],
    estimatedRefund: '2-5 hari kerja setelah barang diterima',
    timeline: [
      {
        step: 'Pengajuan Diterima',
        description: 'Permintaan retur telah diterima',
        time: '21 Okt 2025 11:00',
        completed: true
      },
      {
        step: 'Menunggu Pengambilan',
        description: 'Kurir akan mengambil barang',
        time: '21 Okt 2025 11:30',
        completed: true
      },
      {
        step: 'Diterima di Gudang',
        description: 'Barang telah diterima di gudang',
        time: '21 Okt 2025 15:00',
        completed: true
      },
      {
        step: 'Diperiksa QA',
        description: 'Barang sedang diperiksa tim QA',
        time: '-',
        completed: false,
        current: true
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
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const validateVoucher = (code: string, subtotal: number): { valid: boolean; message: string; discount: number } => {
  const voucher = VOUCHERS[code.toUpperCase()];
  
  if (!voucher) {
    return {
      valid: false,
      message: 'Voucher tidak valid',
      discount: 0
    };
  }
  
  if (subtotal < voucher.minPurchase) {
    return {
      valid: false,
      message: `Minimal belanja Rp ${voucher.minPurchase.toLocaleString('id-ID')} untuk menggunakan voucher ini`,
      discount: 0
    };
  }
  
  let discountAmount = 0;
  if (voucher.type === 'percentage') {
    discountAmount = Math.floor(subtotal * voucher.discount / 100);
    if (voucher.maxDiscount) {
      discountAmount = Math.min(discountAmount, voucher.maxDiscount);
    }
  } else {
    discountAmount = voucher.discount;
  }
  
  return {
    valid: true,
    message: `Voucher ${code} berhasil digunakan! Hemat Rp ${discountAmount.toLocaleString('id-ID')}`,
    discount: discountAmount
  };
};

export const generateOrderId = (): string => {
  const now = new Date();
  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NNS-${year}${month}${date}-${random}`;
};

export const generateRMAId = (): string => {
  const now = new Date();
  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RMA-${year}${month}${date}-${random}`;
};

export const generateResi = (): string => {
  const random = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  return `NNSJKT${random}`;
};

export const canReturnOrder = (order: Order): boolean => {
  if (order.status !== 'selesai' || !order.deliveredDate) return false;
  
  const deliveredDate = new Date(order.deliveredDate);
  const now = new Date(2025, 9, 21); // 21 Oktober 2025
  const daysDiff = Math.floor((now.getTime() - deliveredDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysDiff <= 7;
};

export const formatDate = (dateStr: string): string => {
  return dateStr;
};

export const formatCurrency = (amount: number): string => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};
