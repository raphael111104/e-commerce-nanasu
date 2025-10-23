/**
 * Mock Data Service - NANASU E-Commerce
 * 
 * Centralized mock data untuk development & testing
 * Data konsisten di seluruh aplikasi
 */

export const mockProducts = [
  {
    id: 'prod-001',
    name: 'Nanas Madu Premium',
    slug: 'nanas-madu-premium',
    category: 'fresh',
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    rating: 4.8,
    reviewCount: 127,
    stock: 45,
    sold: 234,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800',
    images: [
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800',
      'https://images.unsplash.com/photo-1632242342964-242876b950c3?w=800',
      'https://images.unsplash.com/photo-1589606663923-283bbd309229?w=800'
    ],
    badges: ['Asli Subang', 'Panen Minggu Ini'],
    description: 'Nanas premium langsung dari kebun organik Subang dengan rasa manis sempurna',
    variants: [
      { id: 'var-001-1', name: 'Kematangan Muda', description: 'Rasa asam segar', price: 45000, stock: 20 },
      { id: 'var-001-2', name: 'Kematangan Matang', description: 'Manis sempurna', price: 47000, stock: 15 },
      { id: 'var-001-3', name: 'Sangat Matang', description: 'Extra manis', price: 50000, stock: 10 }
    ],
    seller: {
      id: 'seller-001',
      name: 'Pak Joko Susanto',
      farm: 'Kebun Nanas Subang Jaya',
      location: 'Desa Cijambe, Subang',
      experience: '15 tahun',
      method: 'Organik',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1736259762444-d00ed881872f?w=200'
    },
    harvestDate: '2025-01-03',
    certifications: ['Organik', 'GAP', 'Traceability']
  },
  {
    id: 'prod-002',
    name: 'Nanas Queen Sweet',
    slug: 'nanas-queen-sweet',
    category: 'fresh',
    price: 38000,
    rating: 4.7,
    reviewCount: 89,
    stock: 62,
    sold: 178,
    image: 'https://images.unsplash.com/photo-1632242342964-242876b950c3?w=800',
    badges: ['Asli Subang'],
    description: 'Varietas Queen dengan tingkat kemanisan tinggi'
  },
  {
    id: 'prod-003',
    name: 'Jus Nanas Segar 500ml',
    slug: 'jus-nanas-segar-500ml',
    category: 'processed',
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    rating: 4.6,
    reviewCount: 156,
    stock: 0,
    sold: 445,
    image: 'https://images.unsplash.com/photo-1589606663923-283bbd309229?w=800',
    badges: ['Diskon'],
    description: '100% jus nanas tanpa gula tambahan, kemasan higenis'
  }
];

export const mockReviews = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    userId: 'user-001',
    userName: 'Sari Wulandari',
    userAvatar: null,
    rating: 5,
    comment: 'Nanas nya manis banget! Benar-benar dari Subang, kualitas juara. Packaging juga rapi.',
    date: '2025-01-12',
    verified: true,
    helpful: 24,
    images: ['https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400'],
    variant: 'Kematangan Matang'
  },
  {
    id: 'rev-002',
    productId: 'prod-001',
    userId: 'user-002',
    userName: 'Budi Santoso',
    userAvatar: null,
    rating: 4,
    comment: 'Pengiriman cepat, nanas fresh. Cocok untuk jus pagi. Pasti order lagi.',
    date: '2025-01-05',
    verified: true,
    helpful: 12,
    images: null,
    variant: 'Kematangan Muda'
  }
];

export const mockOrders = [
  {
    id: 'ORD-2025-0001',
    status: 'delivered',
    date: '2025-01-10',
    total: 187000,
    items: [
      { productId: 'prod-001', name: 'Nanas Madu Premium', variant: 'Kematangan Matang', quantity: 2, price: 47000 },
      { productId: 'prod-002', name: 'Nanas Queen Sweet', variant: null, quantity: 2, price: 38000 }
    ],
    shipping: {
      courier: 'JNE REG',
      fee: 15000,
      eta: '2-3 hari',
      trackingNumber: 'JNE1234567890',
      address: {
        name: 'Sari Wulandari',
        phone: '081234567890',
        street: 'Jl. Merdeka No. 123',
        district: 'Kecamatan Subang',
        city: 'Subang',
        province: 'Jawa Barat',
        postalCode: '41211',
        label: 'Rumah'
      }
    },
    payment: {
      method: 'e-wallet',
      provider: 'GoPay',
      status: 'paid',
      paidAt: '2025-01-10T10:30:00Z'
    },
    timeline: [
      { status: 'ordered', date: '2025-01-10T10:30:00Z', description: 'Pesanan dibuat' },
      { status: 'paid', date: '2025-01-10T10:35:00Z', description: 'Pembayaran berhasil' },
      { status: 'processed', date: '2025-01-10T14:00:00Z', description: 'Pesanan diproses' },
      { status: 'shipped', date: '2025-01-11T09:00:00Z', description: 'Dikirim via JNE' },
      { status: 'delivered', date: '2025-01-12T15:30:00Z', description: 'Paket diterima' }
    ]
  },
  {
    id: 'ORD-2025-0002',
    status: 'pending_payment',
    date: '2025-01-14',
    total: 95000,
    items: [
      { productId: 'prod-003', name: 'Jus Nanas Segar 500ml', variant: null, quantity: 3, price: 25000 }
    ],
    shipping: {
      courier: 'SiCepat',
      fee: 12000,
      eta: '1-2 hari'
    },
    payment: {
      method: 'bank_transfer',
      provider: 'BCA',
      status: 'pending',
      expiredAt: '2025-01-14T18:00:00Z',
      vaNumber: '1234567890123456'
    }
  }
];

export const mockAddresses = [
  {
    id: 'addr-001',
    label: 'Rumah',
    isDefault: true,
    recipientName: 'Sari Wulandari',
    phone: '081234567890',
    street: 'Jl. Merdeka No. 123',
    district: 'Kecamatan Subang',
    city: 'Subang',
    province: 'Jawa Barat',
    postalCode: '41211',
    notes: 'Rumah cat hijau, sebelah Indomaret',
    coordinates: { lat: -6.570833, lng: 107.760278 }
  },
  {
    id: 'addr-002',
    label: 'Kantor',
    isDefault: false,
    recipientName: 'Sari Wulandari',
    phone: '081234567890',
    street: 'Jl. Sudirman No. 45, Gedung B Lt. 3',
    district: 'Kecamatan Bandung Wetan',
    city: 'Bandung',
    province: 'Jawa Barat',
    postalCode: '40115',
    notes: 'Hubungi resepsionis'
  }
];

export const mockPaymentMethods = [
  {
    id: 'pm-001',
    type: 'e-wallet',
    provider: 'GoPay',
    accountNumber: '0812****7890',
    isDefault: true,
    verified: true
  },
  {
    id: 'pm-002',
    type: 'bank_card',
    provider: 'BCA',
    cardNumber: '4567 **** **** 1234',
    expiryMonth: 12,
    expiryYear: 2026,
    isDefault: false,
    verified: true
  }
];

export const mockVouchers = [
  {
    id: 'vouch-001',
    code: 'NANASU10',
    title: 'Diskon 10% Pembelian Pertama',
    description: 'Berlaku untuk semua produk, min. pembelian Rp 100.000',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 100000,
    maxDiscount: 50000,
    validFrom: '2025-01-01',
    validUntil: '2025-03-31',
    stock: 100,
    used: 45,
    status: 'active',
    terms: ['Berlaku 1x per user', 'Tidak bisa digabung dengan promo lain']
  },
  {
    id: 'vouch-002',
    code: 'FREESHIP50K',
    title: 'Gratis Ongkir min. Rp 50.000',
    description: 'Gratis ongkir untuk pengiriman reguler',
    discountType: 'shipping',
    discountValue: 15000,
    minPurchase: 50000,
    validFrom: '2025-01-01',
    validUntil: '2025-02-28',
    stock: 200,
    used: 78,
    status: 'active'
  },
  {
    id: 'vouch-003',
    code: 'EXPIRED',
    title: 'Voucher Kedaluwarsa',
    discountType: 'percentage',
    discountValue: 20,
    validUntil: '2024-12-31',
    status: 'expired'
  }
];

export const mockLoyaltyPoints = {
  current: 1250,
  lifetime: 3420,
  level: 'Silver',
  nextLevel: 'Gold',
  pointsToNextLevel: 750,
  expiringPoints: [
    { points: 250, expiryDate: '2025-02-28' },
    { points: 150, expiryDate: '2025-03-15' }
  ],
  history: [
    { id: 'pts-001', type: 'earn', points: 100, description: 'Pembelian ORD-2025-0001', date: '2025-01-12' },
    { id: 'pts-002', type: 'redeem', points: -500, description: 'Tukar voucher Rp 25.000', date: '2025-01-10' },
    { id: 'pts-003', type: 'earn', points: 50, description: 'Review produk', date: '2025-01-08' }
  ]
};

export const mockNewsArticles = [
  {
    id: 'news-001',
    slug: 'tips-memilih-nanas-berkualitas',
    title: 'Tips Memilih Nanas Berkualitas Tinggi',
    excerpt: 'Pelajari cara memilih nanas yang manis dan segar langsung dari petani berpengalaman',
    content: 'Content lengkap...',
    category: 'tips',
    tags: ['tips', 'nanas', 'fresh'],
    author: {
      name: 'Tim NANASU',
      avatar: null
    },
    publishedAt: '2025-01-10',
    readTime: 5,
    views: 1243,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800',
    featured: true
  },
  {
    id: 'news-002',
    slug: 'resep-jus-nanas-jahe',
    title: 'Resep Jus Nanas Jahe untuk Imunitas',
    excerpt: 'Tingkatkan daya tahan tubuh dengan jus nanas jahe yang menyegarkan',
    content: 'Content lengkap...',
    category: 'resep',
    tags: ['resep', 'kesehatan', 'jus'],
    author: {
      name: 'Chef Dewi',
      avatar: null
    },
    publishedAt: '2025-01-08',
    readTime: 7,
    views: 892,
    image: 'https://images.unsplash.com/photo-1589606663923-283bbd309229?w=800'
  }
];

export const mockFAQs = [
  {
    id: 'faq-001',
    category: 'Produk',
    question: 'Bagaimana cara memastikan nanas yang saya terima fresh?',
    answer: 'Semua nanas kami dipetik langsung saat pesanan masuk dan dikirim dalam waktu 24 jam. Kami juga memberikan garansi kesegaran 100%.'
  },
  {
    id: 'faq-002',
    category: 'Pengiriman',
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Pengiriman reguler memakan waktu 2-3 hari kerja untuk area Jawa Barat, dan 3-5 hari untuk luar Jawa Barat.'
  },
  {
    id: 'faq-003',
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima pembayaran via e-wallet (GoPay, OVO, DANA), transfer bank (BCA, Mandiri, BNI, BRI), dan COD untuk area tertentu.'
  },
  {
    id: 'faq-004',
    category: 'Retur',
    question: 'Bagaimana jika produk yang diterima tidak sesuai?',
    answer: 'Anda dapat mengajukan retur dalam 24 jam setelah penerimaan. Kami akan mengganti atau refund 100% jika terbukti ada kerusakan atau kesalahan dari kami.'
  }
];

export const mockNotifications = [
  {
    id: 'notif-001',
    type: 'order',
    title: 'Pesanan Dikirim',
    message: 'Pesanan #ORD-2025-0001 telah dikirim via JNE',
    date: '2025-01-11T09:00:00Z',
    read: false,
    link: '/orders/ORD-2025-0001'
  },
  {
    id: 'notif-002',
    type: 'promo',
    title: 'Flash Sale Nanas Madu!',
    message: 'Diskon hingga 25% untuk 100 pembeli pertama',
    date: '2025-01-10T08:00:00Z',
    read: true,
    link: '/catalog?sale=flash'
  },
  {
    id: 'notif-003',
    type: 'system',
    title: 'Poin Anda Akan Kedaluwarsa',
    message: '250 poin akan hangus pada 28 Februari 2025',
    date: '2025-01-09T10:00:00Z',
    read: false,
    link: '/account/loyalty'
  }
];

// Helper functions untuk mock API calls
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAPI = {
  // Products
  getProducts: async (filters?: any) => {
    await delay(500);
    return { success: true, data: mockProducts };
  },
  
  getProductById: async (id: string) => {
    await delay(300);
    const product = mockProducts.find(p => p.id === id);
    return product ? { success: true, data: product } : { success: false, error: 'Product not found' };
  },

  // Reviews
  getReviews: async (productId: string) => {
    await delay(400);
    const reviews = mockReviews.filter(r => r.productId === productId);
    return { success: true, data: reviews };
  },

  submitReview: async (review: any) => {
    await delay(600);
    return { success: true, data: { ...review, id: `rev-${Date.now()}` } };
  },

  // Orders
  getOrders: async (filters?: any) => {
    await delay(500);
    return { success: true, data: mockOrders };
  },

  getOrderById: async (id: string) => {
    await delay(300);
    const order = mockOrders.find(o => o.id === id);
    return order ? { success: true, data: order } : { success: false, error: 'Order not found' };
  },

  // Vouchers
  validateVoucher: async (code: string, cartTotal: number) => {
    await delay(400);
    const voucher = mockVouchers.find(v => v.code === code);
    
    if (!voucher) {
      return { success: false, error: 'Kode voucher tidak valid' };
    }
    
    if (voucher.status === 'expired') {
      return { success: false, error: 'Voucher sudah kedaluwarsa' };
    }
    
    if (voucher.minPurchase && cartTotal < voucher.minPurchase) {
      return { 
        success: false, 
        error: `Minimum pembelian Rp ${voucher.minPurchase.toLocaleString('id-ID')}` 
      };
    }
    
    return { success: true, data: voucher };
  },

  // Loyalty
  getLoyaltyPoints: async () => {
    await delay(300);
    return { success: true, data: mockLoyaltyPoints };
  },

  // News
  getNews: async (filters?: any) => {
    await delay(400);
    return { success: true, data: mockNewsArticles };
  },

  // FAQs
  getFAQs: async () => {
    await delay(200);
    return { success: true, data: mockFAQs };
  }
};
