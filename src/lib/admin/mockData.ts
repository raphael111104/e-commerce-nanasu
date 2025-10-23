// Admin Mock Data for NANASU E-Commerce Dashboard

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cs' | 'editor';
  avatar?: string;
  permissions: string[];
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  customerId: string;
  items: number;
  total: number;
  payment: string;
  status: 'new' | 'paid' | 'packed' | 'shipped' | 'delivered' | 'refund' | 'cancelled';
  channel: 'web' | 'mobile' | 'marketplace';
  region: string;
  trackingNumber?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  image: string;
  tags: string[];
  sales: number;
  lastUpdated: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  ltv: number;
  segment: 'new' | 'active' | 'at-risk' | 'loyal';
  joinDate: string;
  lastOrder?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customer: string;
  rating: number;
  content: string;
  images?: string[];
  status: 'pending' | 'published' | 'hidden';
  date: string;
}

export interface Voucher {
  id: string;
  code: string;
  type: 'percent' | 'fixed' | 'free-shipping';
  value: number;
  minPurchase: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired' | 'draft';
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customer: string;
  channel: 'email' | 'chat' | 'phone' | 'whatsapp';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  subject: string;
  assignee?: string;
  updated: string;
  created: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'U001',
    name: 'Admin NANASU',
    email: 'admin@nanasu.com',
    role: 'admin',
    permissions: ['*']
  },
  {
    id: 'U002',
    name: 'Manager Store',
    email: 'manager@nanasu.com',
    role: 'manager',
    permissions: ['orders.*', 'products.*', 'customers.read', 'analytics.*']
  },
  {
    id: 'U003',
    name: 'Customer Support',
    email: 'cs@nanasu.com',
    role: 'cs',
    permissions: ['orders.read', 'customers.*', 'support.*']
  },
  {
    id: 'U004',
    name: 'Content Editor',
    email: 'editor@nanasu.com',
    role: 'editor',
    permissions: ['content.*', 'products.read', 'reviews.moderate']
  }
];

// Mock Orders (50 orders)
export const mockOrders: Order[] = [
  {
    id: 'NA-2025-001',
    date: '2025-01-20 10:30',
    customer: 'Budi Santoso',
    customerId: 'C001',
    items: 3,
    total: 285000,
    payment: 'GoPay',
    status: 'new',
    channel: 'mobile',
    region: 'Jakarta'
  },
  {
    id: 'NA-2025-002',
    date: '2025-01-20 09:15',
    customer: 'Siti Nurhaliza',
    customerId: 'C002',
    items: 2,
    total: 156000,
    payment: 'BCA VA',
    status: 'paid',
    channel: 'web',
    region: 'Bandung',
    trackingNumber: 'JNE123456789'
  },
  {
    id: 'NA-2025-003',
    date: '2025-01-20 08:45',
    customer: 'Ahmad Hidayat',
    customerId: 'C003',
    items: 5,
    total: 420000,
    payment: 'OVO',
    status: 'packed',
    channel: 'web',
    region: 'Surabaya',
    trackingNumber: 'SICEPAT987654'
  },
  {
    id: 'NA-2025-004',
    date: '2025-01-19 16:20',
    customer: 'Rina Wijaya',
    customerId: 'C004',
    items: 1,
    total: 85000,
    payment: 'Mandiri VA',
    status: 'shipped',
    channel: 'mobile',
    region: 'Yogyakarta',
    trackingNumber: 'JNT111222333'
  },
  {
    id: 'NA-2025-005',
    date: '2025-01-19 14:30',
    customer: 'Dedi Kurniawan',
    customerId: 'C005',
    items: 4,
    total: 340000,
    payment: 'COD',
    status: 'delivered',
    channel: 'marketplace',
    region: 'Semarang',
    trackingNumber: 'JNE555666777'
  },
  // Add more mock orders...
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `NA-2025-${String(i + 6).padStart(3, '0')}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + ' ' + 
          String(Math.floor(Math.random() * 24)).padStart(2, '0') + ':' + 
          String(Math.floor(Math.random() * 60)).padStart(2, '0'),
    customer: ['Agus', 'Dewi', 'Eko', 'Fitri', 'Gilang', 'Hani', 'Irfan', 'Joko'][Math.floor(Math.random() * 8)] + ' ' +
               ['Santoso', 'Wijaya', 'Pratama', 'Kusuma', 'Saputra', 'Lestari'][Math.floor(Math.random() * 6)],
    customerId: `C${String(i + 6).padStart(3, '0')}`,
    items: Math.floor(Math.random() * 5) + 1,
    total: Math.floor(Math.random() * 500000) + 50000,
    payment: ['GoPay', 'OVO', 'BCA VA', 'Mandiri VA', 'BNI VA', 'COD'][Math.floor(Math.random() * 6)],
    status: ['new', 'paid', 'packed', 'shipped', 'delivered', 'refund'][Math.floor(Math.random() * 6)] as any,
    channel: ['web', 'mobile', 'marketplace'][Math.floor(Math.random() * 3)] as any,
    region: ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Bali', 'Medan'][Math.floor(Math.random() * 7)],
    trackingNumber: Math.random() > 0.3 ? `TRK${Math.random().toString(36).substring(7).toUpperCase()}` : undefined
  }))
];

// Mock Products (40 products)
export const mockProducts: Product[] = [
  {
    id: 'P001',
    sku: 'NS-NM-001',
    name: 'Nanas Madu Premium Grade A - 1kg',
    category: 'Nanas Segar',
    price: 35000,
    stock: 150,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=200',
    tags: ['premium', 'segar', 'best-seller'],
    sales: 1245,
    lastUpdated: '2025-01-19'
  },
  {
    id: 'P002',
    sku: 'NS-JUS-001',
    name: 'Jus Nanas Segar 500ml',
    category: 'Olahan',
    price: 15000,
    stock: 85,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?w=200',
    tags: ['olahan', 'minuman', 'segar'],
    sales: 890,
    lastUpdated: '2025-01-18'
  },
  {
    id: 'P003',
    sku: 'NS-KRP-001',
    name: 'Keripik Nanas Original 200gr',
    category: 'Olahan',
    price: 22000,
    stock: 120,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?w=200',
    tags: ['snack', 'olahan', 'renyah'],
    sales: 456,
    lastUpdated: '2025-01-17'
  },
  {
    id: 'P004',
    sku: 'NS-BND-001',
    name: 'Paket Bundling Keluarga 3kg',
    category: 'Bundling',
    price: 85000,
    stock: 45,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?w=200',
    tags: ['bundle', 'hemat', 'keluarga'],
    sales: 285,
    lastUpdated: '2025-01-16'
  },
  {
    id: 'P005',
    sku: 'NS-PRE-001',
    name: 'Pre-Order Nanas Madu Musim Panen',
    category: 'Pre-Order',
    price: 30000,
    stock: 0,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=200',
    tags: ['preorder', 'musim-panen'],
    sales: 0,
    lastUpdated: '2025-01-15'
  },
  // Add more products...
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `P${String(i + 6).padStart(3, '0')}`,
    sku: `NS-${['NM', 'JUS', 'KRP', 'SMT', 'MNS'][Math.floor(Math.random() * 5)]}-${String(i + 2).padStart(3, '0')}`,
    name: ['Nanas', 'Jus Nanas', 'Keripik', 'Smoothie', 'Manisan'][Math.floor(Math.random() * 5)] + ' ' +
          ['Premium', 'Original', 'Special', 'Manis', 'Segar'][Math.floor(Math.random() * 5)] + ` ${i + 1}`,
    category: ['Nanas Segar', 'Olahan', 'Bundling', 'Pre-Order'][Math.floor(Math.random() * 4)],
    price: Math.floor(Math.random() * 50000) + 10000,
    stock: Math.floor(Math.random() * 200),
    status: ['active', 'draft', 'archived'][Math.floor(Math.random() * 3)] as any,
    image: `https://images.unsplash.com/photo-${1618373145247 + i}?w=200`,
    tags: ['premium', 'segar', 'best-seller'].slice(0, Math.floor(Math.random() * 3) + 1),
    sales: Math.floor(Math.random() * 1000),
    lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }))
];

// Mock Customers (80 customers)
export const mockCustomers: Customer[] = Array.from({ length: 80 }, (_, i) => ({
  id: `C${String(i + 1).padStart(3, '0')}`,
  name: ['Budi', 'Siti', 'Ahmad', 'Rina', 'Dedi', 'Dewi', 'Eko', 'Fitri'][i % 8] + ' ' +
        ['Santoso', 'Wijaya', 'Pratama', 'Kusuma', 'Saputra', 'Lestari'][i % 6],
  email: `customer${i + 1}@email.com`,
  phone: `08${Math.floor(Math.random() * 9) + 1}${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
  orders: Math.floor(Math.random() * 20) + 1,
  ltv: Math.floor(Math.random() * 5000000) + 100000,
  segment: ['new', 'active', 'at-risk', 'loyal'][Math.floor(Math.random() * 4)] as any,
  joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  lastOrder: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
}));

// Mock Reviews (30 reviews)
export const mockReviews: Review[] = Array.from({ length: 30 }, (_, i) => ({
  id: `R${String(i + 1).padStart(3, '0')}`,
  productId: `P${String(Math.floor(Math.random() * 20) + 1).padStart(3, '0')}`,
  productName: mockProducts[Math.floor(Math.random() * mockProducts.length)].name,
  customer: mockCustomers[i].name,
  rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
  content: [
    'Produk sangat segar dan berkualitas!',
    'Packing rapi, pengiriman cepat',
    'Rasanya manis dan segar sekali',
    'Harga terjangkau untuk kualitas premium',
    'Akan order lagi, recommended!',
    'Kualitas bagus sesuai deskripsi',
    'Pengiriman cepat, produk fresh'
  ][Math.floor(Math.random() * 7)],
  images: Math.random() > 0.7 ? [`https://images.unsplash.com/photo-${1618373145247 + i}?w=200`] : undefined,
  status: ['pending', 'published', 'hidden'][Math.floor(Math.random() * 3)] as any,
  date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
}));

// Mock Vouchers (8 vouchers)
export const mockVouchers: Voucher[] = [
  {
    id: 'V001',
    code: 'NANASU25',
    type: 'percent',
    value: 25,
    minPurchase: 100000,
    maxDiscount: 50000,
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    usageLimit: 100,
    usageCount: 45,
    status: 'active'
  },
  {
    id: 'V002',
    code: 'FREESHIP10K',
    type: 'free-shipping',
    value: 0,
    minPurchase: 50000,
    startDate: '2025-01-15',
    endDate: '2025-01-31',
    usageLimit: 200,
    usageCount: 120,
    status: 'active'
  },
  {
    id: 'V003',
    code: 'DISKON50K',
    type: 'fixed',
    value: 50000,
    minPurchase: 200000,
    startDate: '2025-01-10',
    endDate: '2025-01-25',
    usageLimit: 50,
    usageCount: 50,
    status: 'expired'
  },
  {
    id: 'V004',
    code: 'NEWMEMBER',
    type: 'percent',
    value: 15,
    minPurchase: 50000,
    maxDiscount: 30000,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    usageLimit: 1000,
    usageCount: 234,
    status: 'active'
  },
  {
    id: 'V005',
    code: 'FLASHSALE',
    type: 'percent',
    value: 30,
    minPurchase: 150000,
    maxDiscount: 75000,
    startDate: '2025-02-01',
    endDate: '2025-02-05',
    usageLimit: 500,
    usageCount: 0,
    status: 'draft'
  },
  {
    id: 'V006',
    code: 'BUNDEL20',
    type: 'percent',
    value: 20,
    minPurchase: 100000,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    usageLimit: 300,
    usageCount: 89,
    status: 'active'
  },
  {
    id: 'V007',
    code: 'GRATIS15K',
    type: 'fixed',
    value: 15000,
    minPurchase: 75000,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    usageLimit: 100,
    usageCount: 100,
    status: 'expired'
  },
  {
    id: 'V008',
    code: 'SHIPFREE',
    type: 'free-shipping',
    value: 0,
    minPurchase: 100000,
    startDate: '2025-01-20',
    endDate: '2025-02-20',
    usageLimit: 150,
    usageCount: 23,
    status: 'active'
  }
];

// Mock Support Tickets (20 tickets)
export const mockTickets: SupportTicket[] = Array.from({ length: 20 }, (_, i) => ({
  id: `T${String(i + 1).padStart(4, '0')}`,
  customerId: `C${String(Math.floor(Math.random() * 80) + 1).padStart(3, '0')}`,
  customer: mockCustomers[Math.floor(Math.random() * mockCustomers.length)].name,
  channel: ['email', 'chat', 'phone', 'whatsapp'][Math.floor(Math.random() * 4)] as any,
  priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)] as any,
  status: ['open', 'in-progress', 'resolved', 'closed'][Math.floor(Math.random() * 4)] as any,
  subject: [
    'Pesanan belum diterima',
    'Produk tidak sesuai',
    'Ingin refund',
    'Pertanyaan produk',
    'Masalah pembayaran',
    'Update alamat pengiriman',
    'Komplain kualitas'
  ][Math.floor(Math.random() * 7)],
  assignee: Math.random() > 0.5 ? mockUsers[2].name : undefined,
  updated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  created: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString()
}));

// Shipping Data
export interface Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  courier: 'JNE' | 'SiCepat' | 'Ninja' | 'JNT' | 'AnterAja';
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  weight: number;
  eta: string;
  pickupDate?: string;
  deliveryDate?: string;
  customer: string;
}

export const mockShipments: Shipment[] = [
  {
    id: 'SHP001',
    orderId: 'NA-2025-002',
    trackingNumber: 'JNE123456789',
    courier: 'JNE',
    status: 'in-transit',
    origin: 'Jakarta',
    destination: 'Bandung',
    weight: 2.5,
    eta: '2025-01-22',
    pickupDate: '2025-01-20',
    customer: 'Siti Nurhaliza'
  },
  {
    id: 'SHP002',
    orderId: 'NA-2025-003',
    trackingNumber: 'SICEPAT987654',
    courier: 'SiCepat',
    status: 'picked-up',
    origin: 'Jakarta',
    destination: 'Surabaya',
    weight: 3.0,
    eta: '2025-01-23',
    pickupDate: '2025-01-20',
    customer: 'Ahmad Hidayat'
  },
  {
    id: 'SHP003',
    orderId: 'NA-2025-004',
    trackingNumber: 'JNT111222333',
    courier: 'JNT',
    status: 'in-transit',
    origin: 'Jakarta',
    destination: 'Yogyakarta',
    weight: 1.0,
    eta: '2025-01-21',
    pickupDate: '2025-01-19',
    customer: 'Rina Wijaya'
  },
  {
    id: 'SHP004',
    orderId: 'NA-2025-005',
    trackingNumber: 'JNE555666777',
    courier: 'JNE',
    status: 'delivered',
    origin: 'Jakarta',
    destination: 'Semarang',
    weight: 2.0,
    eta: '2025-01-19',
    pickupDate: '2025-01-18',
    deliveryDate: '2025-01-19',
    customer: 'Dedi Kurniawan'
  }
];

// Financial Transactions
export interface Transaction {
  id: string;
  date: string;
  type: 'sale' | 'refund' | 'payout' | 'fee';
  reference: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TRX001',
    date: '2025-01-20 10:30',
    type: 'sale',
    reference: 'NA-2025-001',
    amount: 285000,
    status: 'completed',
    description: 'Penjualan pesanan NA-2025-001'
  },
  {
    id: 'TRX002',
    date: '2025-01-20 09:15',
    type: 'sale',
    reference: 'NA-2025-002',
    amount: 156000,
    status: 'completed',
    description: 'Penjualan pesanan NA-2025-002'
  },
  {
    id: 'TRX003',
    date: '2025-01-19 16:20',
    type: 'refund',
    reference: 'NA-2025-023',
    amount: -75000,
    status: 'completed',
    description: 'Refund pesanan NA-2025-023'
  },
  {
    id: 'TRX004',
    date: '2025-01-18 14:00',
    type: 'payout',
    reference: 'PYT-001',
    amount: -5000000,
    status: 'completed',
    description: 'Payout ke rekening BCA'
  },
  {
    id: 'TRX005',
    date: '2025-01-20 11:00',
    type: 'fee',
    reference: 'FEE-001',
    amount: -12500,
    status: 'completed',
    description: 'Biaya payment gateway'
  }
];

// Admin Users for User Management
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'AU001',
    name: 'Admin NANASU',
    email: 'admin@nanasu.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2025-01-20 10:30',
    createdAt: '2024-01-01'
  },
  {
    id: 'AU002',
    name: 'Manager Store',
    email: 'manager@nanasu.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2025-01-20 09:00',
    createdAt: '2024-02-15'
  },
  {
    id: 'AU003',
    name: 'Customer Support',
    email: 'cs@nanasu.com',
    role: 'Staff',
    status: 'active',
    lastLogin: '2025-01-19 16:45',
    createdAt: '2024-03-10'
  },
  {
    id: 'AU004',
    name: 'Content Editor',
    email: 'editor@nanasu.com',
    role: 'Staff',
    status: 'active',
    lastLogin: '2025-01-19 14:20',
    createdAt: '2024-04-20'
  }
];

// Settings Data
export interface StoreSetting {
  category: string;
  key: string;
  label: string;
  value: any;
  type: 'text' | 'number' | 'boolean' | 'select' | 'textarea';
  options?: string[];
}

export const mockSettings: StoreSetting[] = [
  // Brand Settings
  { category: 'brand', key: 'store_name', label: 'Nama Toko', value: 'NANASU', type: 'text' },
  { category: 'brand', key: 'tagline', label: 'Tagline', value: 'Fresh Pineapple from Farm to Table', type: 'text' },
  { category: 'brand', key: 'store_email', label: 'Email Toko', value: 'info@nanasu.com', type: 'text' },
  { category: 'brand', key: 'store_phone', label: 'Telepon', value: '0812-3456-7890', type: 'text' },
  
  // Store Settings
  { category: 'store', key: 'pickup_address', label: 'Alamat Pickup', value: 'Jl. Raya Bogor KM 25, Jakarta Timur', type: 'textarea' },
  { category: 'store', key: 'operating_hours', label: 'Jam Operasional', value: '09:00 - 17:00 WIB', type: 'text' },
  { category: 'store', key: 'warehouse_location', label: 'Lokasi Gudang', value: 'Jakarta', type: 'text' },
  
  // Payment Settings
  { category: 'payment', key: 'cod_enabled', label: 'COD Aktif', value: true, type: 'boolean' },
  { category: 'payment', key: 'min_cod_amount', label: 'Minimum COD', value: 50000, type: 'number' },
  { category: 'payment', key: 'payment_gateway', label: 'Payment Gateway', value: 'Midtrans', type: 'select', options: ['Midtrans', 'Xendit', 'Manual'] },
  
  // Shipping Settings
  { category: 'shipping', key: 'free_shipping_threshold', label: 'Gratis Ongkir Minimal', value: 100000, type: 'number' },
  { category: 'shipping', key: 'default_courier', label: 'Kurir Default', value: 'JNE', type: 'select', options: ['JNE', 'SiCepat', 'Ninja', 'JNT', 'AnterAja'] },
  { category: 'shipping', key: 'sla_target_days', label: 'Target SLA (hari)', value: 3, type: 'number' },
  { category: 'shipping', key: 'enabled_couriers', label: 'Kurir Aktif', value: 'JNE,SiCepat,Ninja', type: 'text' }
];

// Tasks for Dashboard
export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: string;
}

export const mockTasks: Task[] = [
  {
    id: 'TASK001',
    title: 'Kemas 3 pesanan baru',
    priority: 'high',
    completed: false,
    dueDate: '2025-01-20'
  },
  {
    id: 'TASK002',
    title: 'Restok 5 produk stok rendah',
    priority: 'high',
    completed: false,
    dueDate: '2025-01-20'
  },
  {
    id: 'TASK003',
    title: 'Tinjau 2 ulasan pending',
    priority: 'medium',
    completed: false,
    dueDate: '2025-01-21'
  },
  {
    id: 'TASK004',
    title: 'Balas 5 pesan customer',
    priority: 'medium',
    completed: false,
    dueDate: '2025-01-20'
  },
  {
    id: 'TASK005',
    title: 'Update harga 3 produk',
    priority: 'low',
    completed: true,
    dueDate: '2025-01-19'
  }
];

// KPI Data for Dashboard
export const mockKPIData = {
  ordersToday: 34,
  revenueToday: 5450000,
  lowStockCount: 12,
  onTimeShipment: 95,
  ordersYesterday: 28,
  revenueYesterday: 4200000,
  pendingOrders: 8,
  processingOrders: 12,
  shippedOrders: 10
};

// Analytics time series data (7 days for dashboard)
export const mockChartData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000);
  return {
    date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    orders: Math.floor(Math.random() * 20) + 25,
    revenue: Math.floor(Math.random() * 3000000) + 4000000
  };
});

// Analytics time series data (90 days for reports)
export const mockAnalyticsData = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000);
  return {
    date: date.toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 5000000) + 8000000,
    orders: Math.floor(Math.random() * 50) + 30,
    customers: Math.floor(Math.random() * 40) + 20,
    avgOrderValue: Math.floor(Math.random() * 100000) + 250000
  };
});
