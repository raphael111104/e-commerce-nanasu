/**
 * Customer Journey v2 - Service & Data
 * Alur: Cart → Checkout → Payment → Shipping Status + Notifications
 */

export interface Profile {
  name: string;
  phone: string;
  email: string;
  addresses: Address[];
  defaultAddressIndex: number;
}

export interface Address {
  id?: string;
  label: string;
  recipient: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  note?: string;
  isMain?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  variant?: string[];
  size?: string[];
  stock: number;
  rating: number;
  sold: number;
  thumb: string;
  image?: string;
}

export interface ShippingOption {
  code: string;
  name: string;
  eta: string;
  fee: number;
}

export interface PaymentMethod {
  code: string;
  name: string;
  balance?: number;
}

export interface OrderExample {
  orderId: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  items: CartItem[];
  shippingAddress?: Address;
  paymentMethod?: string;
  createdAt?: Date;
}

export interface CartItem {
  productId: string;
  title: string;
  variant?: string;
  size?: string;
  price: number;
  quantity: number;
  thumb: string;
  stock: number;
}

export interface TrackingStep {
  status: string;
  time: string;
  resi?: string;
  description?: string;
  completed: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: string;
}

// ============================================================================
// DUMMY DATA
// ============================================================================

export const dummyProfile: Profile = {
  name: "Raka Pratama",
  phone: "0812-3456-7890",
  email: "raka@example.com",
  addresses: [
    {
      id: "addr-1",
      label: "Rumah",
      recipient: "Raka Pratama",
      phone: "0812-3456-7890",
      street: "Jl. Melati No. 21",
      city: "Bandung",
      zip: "40123",
      note: "Patokan dekat Indomaret",
      isMain: true
    },
    {
      id: "addr-2",
      label: "Kantor",
      recipient: "Raka Pratama",
      phone: "0812-3456-7890",
      street: "Gedung PSTI UPI, Lantai 2",
      city: "Purwakarta",
      zip: "41118",
      note: "",
      isMain: false
    }
  ],
  defaultAddressIndex: 0
};

export const dummyProducts: Product[] = [
  {
    id: "P-1001",
    title: "Kaos Nanasu Basic",
    price: 79000,
    variant: ["Hitam", "Putih"],
    size: ["S", "M", "L"],
    stock: 42,
    rating: 4.6,
    sold: 312,
    thumb: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
  },
  {
    id: "P-1022",
    title: "Totebag Pine Shopper",
    price: 59000,
    variant: ["Olive"],
    size: ["All"],
    stock: 120,
    rating: 4.5,
    sold: 198,
    thumb: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800"
  },
  {
    id: "P-1107",
    title: "Sticker Pack Nanas",
    price: 19000,
    variant: ["Color"],
    size: ["All"],
    stock: 999,
    rating: 4.9,
    sold: 1204,
    thumb: "https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=400",
    image: "https://images.unsplash.com/photo-1618373145247-35f153803e1b?w=800"
  }
];

export const shippingOptions: ShippingOption[] = [
  {
    code: "REG",
    name: "Reguler",
    eta: "2-4 hari",
    fee: 15000
  },
  {
    code: "EXP",
    name: "Express",
    eta: "1-2 hari",
    fee: 28000
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    code: "WALLET",
    name: "NanasuPay (Saldo: Rp120.000)",
    balance: 120000
  },
  {
    code: "VA_BNI",
    name: "Virtual Account BNI"
  },
  {
    code: "CARD",
    name: "Kartu Debit/Kredit"
  }
];

export const orderExample: OrderExample = {
  orderId: "NS-240102-AB12",
  subtotal: 157000,
  shippingFee: 15000,
  discount: 10000,
  total: 162000,
  items: []
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const generateOrderId = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NS-${year}${month}${day}-${random}`;
};

export const generateResi = (courier: string = "JNE"): string => {
  const random = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  return `${courier} ${random}`;
};

export const createTrackingTimeline = (orderId: string, resi: string): TrackingStep[] => {
  const now = new Date();
  
  return [
    {
      status: "Pesanan Dibayar",
      time: new Date(now.getTime() - 6 * 60 * 60 * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      description: `Order ${orderId} telah dibayar`,
      completed: true
    },
    {
      status: "Diproses Penjual",
      time: new Date(now.getTime() - 4 * 60 * 60 * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      description: "Pesanan sedang dikemas oleh penjual",
      completed: true
    },
    {
      status: "Dikirim",
      time: new Date(now.getTime() - 2 * 60 * 60 * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      resi: resi,
      description: `Paket telah diserahkan ke kurir`,
      completed: true
    },
    {
      status: "Dalam Perjalanan",
      time: "Estimasi Hari+1",
      description: "Paket sedang dalam perjalanan ke kota tujuan",
      completed: false
    },
    {
      status: "Tiba di Tujuan",
      time: "Estimasi Hari+2",
      description: "Paket telah sampai di kota tujuan",
      completed: false
    }
  ];
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
