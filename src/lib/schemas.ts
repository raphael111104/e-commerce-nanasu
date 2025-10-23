/**
 * NANASU - Zod Schemas & Types
 * 
 * All validation schemas for forms, API contracts, and data structures.
 * Use with React Hook Form for type-safe form validation.
 */

import { z } from "zod";

// ============================================================================
// 1. SEARCH & CATALOG
// ============================================================================

export const SearchQuerySchema = z.object({
  q: z.string().max(120).optional(),
  category: z.string().optional(),
  min: z.coerce.number().min(0).optional(),
  max: z.coerce.number().min(0).optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  sort: z.enum(["newest", "bestselling", "price_asc", "price_desc", "rating_desc"]).optional(),
  page: z.coerce.number().int().min(1).default(1),
});
export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const VariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  stock: z.number().int().min(0),
  sku: z.string().optional(),
});
export type Variant = z.infer<typeof VariantSchema>;

export const AddToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  qty: z.number().int().min(1),
});
export type AddToCart = z.infer<typeof AddToCartSchema>;

// ============================================================================
// 2. PRODUCT
// ============================================================================

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  slug: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  stock: z.number().int().min(0),
  images: z.array(z.string().url()).min(1),
  badges: z.array(z.enum(["asli-subang", "discount", "preorder", "bestseller", "new"])).default([]),
  variants: z.array(VariantSchema).default([]),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  minOrder: z.number().int().min(1).default(1),
  maxOrder: z.number().int().min(1).optional(),
  weight: z.number().positive().optional(),
  sellerId: z.string(),
  sellerName: z.string(),
  createdAt: z.string().datetime().optional(),
});
export type Product = z.infer<typeof ProductSchema>;

export const ReviewSchema = z.object({
  id: z.string(),
  productId: z.string(),
  userId: z.string(),
  userName: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000),
  images: z.array(z.string().url()).max(5).default([]),
  helpful: z.number().int().min(0).default(0),
  createdAt: z.string().datetime(),
  verified: z.boolean().default(false),
});
export type Review = z.infer<typeof ReviewSchema>;

export const QuestionSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  question: z.string().min(10).max(500),
  answer: z.string().max(1000).optional(),
  askedBy: z.string(),
  answeredBy: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  answeredAt: z.string().datetime().optional(),
  helpful: z.number().int().min(0).default(0),
});
export type Question = z.infer<typeof QuestionSchema>;

// ============================================================================
// 3. CART & CHECKOUT
// ============================================================================

export const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  productImage: z.string().url(),
  variantId: z.string().optional(),
  variantName: z.string().optional(),
  price: z.number().nonnegative(),
  quantity: z.number().int().min(1),
  stock: z.number().int().min(0),
  weight: z.number().positive().optional(),
  checked: z.boolean().default(true),
  available: z.boolean().default(true),
  badges: z.array(z.string()).default([]),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const CouponSchema = z.object({
  code: z.string().min(3).max(20).toUpperCase(),
  type: z.enum(["percentage", "fixed", "shipping"]),
  value: z.number().positive(),
  minPurchase: z.number().nonnegative().default(0),
  maxDiscount: z.number().positive().optional(),
  validUntil: z.string().datetime(),
  description: z.string().optional(),
});
export type Coupon = z.infer<typeof CouponSchema>;

export const AddressSchema = z.object({
  id: z.string().optional(),
  label: z.enum(["Rumah", "Kantor", "Lainnya"]).default("Rumah"),
  recipient: z.string().min(2, "Nama penerima minimal 2 karakter"),
  phone: z.string().min(8, "Nomor telepon tidak valid").regex(/^[0-9+\-() ]+$/, "Format nomor tidak valid"),
  street: z.string().min(5, "Alamat lengkap minimal 5 karakter"),
  city: z.string().min(2, "Kota harus diisi"),
  province: z.string().min(2, "Provinsi harus diisi"),
  postalCode: z.string().regex(/^\d{5}$/, "Kode pos harus 5 digit"),
  notes: z.string().max(200).optional(),
  isDefault: z.boolean().default(false),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
export type Address = z.infer<typeof AddressSchema>;

export const ShippingOptionSchema = z.object({
  code: z.string(),
  label: z.string(),
  provider: z.string(),
  price: z.number().nonnegative(),
  etaDays: z.number().int().min(1),
  etaText: z.string(),
  preorderLeadDays: z.number().int().min(0).optional(),
  available: z.boolean().default(true),
  description: z.string().optional(),
});
export type ShippingOption = z.infer<typeof ShippingOptionSchema>;

export const PaymentMethodSchema = z.object({
  type: z.enum(["ewallet", "va", "transfer", "cod", "card"]),
  provider: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  available: z.boolean().default(true),
  fee: z.number().nonnegative().default(0),
  description: z.string().optional(),
  requiresAuth: z.boolean().default(false),
});
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export const CheckoutSchema = z.object({
  items: z.array(CartItemSchema).min(1, "Keranjang kosong"),
  addressId: z.string().min(1, "Pilih alamat pengiriman"),
  shippingCode: z.string().min(1, "Pilih metode pengiriman"),
  paymentType: z.string().min(1, "Pilih metode pembayaran"),
  couponCode: z.string().optional(),
  notes: z.string().max(500).optional(),
});
export type Checkout = z.infer<typeof CheckoutSchema>;

// ============================================================================
// 4. ACCOUNT & PROFILE
// ============================================================================

export const ProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon tidak valid"),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  avatarUrl: z.string().url().optional(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const OTPVerifySchema = z.object({
  code: z.string().length(6, "Kode OTP harus 6 digit").regex(/^\d+$/, "Kode OTP harus berupa angka"),
});
export type OTPVerify = z.infer<typeof OTPVerifySchema>;

export const PasswordChangeSchema = z.object({
  oldPassword: z.string().min(8, "Password minimal 8 karakter"),
  newPassword: z.string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Harus ada huruf besar")
    .regex(/[a-z]/, "Harus ada huruf kecil")
    .regex(/\d/, "Harus ada angka"),
  confirmNew: z.string().min(8, "Password minimal 8 karakter"),
}).refine(d => d.newPassword === d.confirmNew, {
  path: ["confirmNew"],
  message: "Konfirmasi password tidak sama"
}).refine(d => d.oldPassword !== d.newPassword, {
  path: ["newPassword"],
  message: "Password baru harus berbeda dari password lama"
});
export type PasswordChange = z.infer<typeof PasswordChangeSchema>;

export const SessionSchema = z.object({
  id: z.string(),
  deviceName: z.string(),
  deviceType: z.enum(["desktop", "mobile", "tablet"]),
  browser: z.string(),
  location: z.string(),
  ipAddress: z.string(),
  lastActive: z.string().datetime(),
  isCurrent: z.boolean().default(false),
});
export type Session = z.infer<typeof SessionSchema>;

export const PaymentAliasSchema = z.object({
  id: z.string().optional(),
  kind: z.enum(["ewallet", "va", "card"]),
  provider: z.string(),
  label: z.string().min(2, "Label minimal 2 karakter"),
  masked: z.string().min(4, "Nomor tidak valid"),
  isDefault: z.boolean().default(false),
  expiryMonth: z.number().int().min(1).max(12).optional(),
  expiryYear: z.number().int().min(2024).optional(),
});
export type PaymentAlias = z.infer<typeof PaymentAliasSchema>;

export const NotificationPrefSchema = z.object({
  category: z.enum(["promo", "order", "system"]),
  channel: z.enum(["email", "sms", "push"]),
  enabled: z.boolean(),
});
export type NotificationPref = z.infer<typeof NotificationPrefSchema>;

export const QuietHoursSchema = z.object({
  enabled: z.boolean(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Format waktu tidak valid (HH:mm)"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Format waktu tidak valid (HH:mm)"),
});
export type QuietHours = z.infer<typeof QuietHoursSchema>;

export const ConsentSchema = z.object({
  essential: z.literal(true),
  analytics: z.boolean(),
  marketing: z.boolean(),
});
export type Consent = z.infer<typeof ConsentSchema>;

export const ReferralSchema = z.object({
  code: z.string().min(6).max(20),
  link: z.string().url(),
  totalReferred: z.number().int().min(0),
  totalEarned: z.number().nonnegative(),
  milestones: z.array(z.object({
    count: z.number().int().positive(),
    reward: z.string(),
    achieved: z.boolean(),
  })),
});
export type Referral = z.infer<typeof ReferralSchema>;

// ============================================================================
// 5. ORDERS & RETURNS
// ============================================================================

export const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  productImage: z.string().url(),
  variantName: z.string().optional(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  subtotal: z.number().nonnegative(),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.enum(["unpaid", "paid", "processing", "shipped", "delivered", "completed", "cancelled", "refunded"]),
  items: z.array(OrderItemSchema),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  discount: z.number().nonnegative().default(0),
  tax: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
  address: AddressSchema,
  shippingMethod: z.string(),
  paymentMethod: z.string(),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  paidAt: z.string().datetime().optional(),
  shippedAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  cancelReason: z.string().optional(),
});
export type Order = z.infer<typeof OrderSchema>;

export const ReturnRequestSchema = z.object({
  orderId: z.string(),
  itemIds: z.array(z.string()).min(1, "Pilih minimal 1 item"),
  reason: z.enum(["rusak", "salah_barang", "tidak_sesuai", "lainnya"]),
  note: z.string().min(10, "Alasan minimal 10 karakter").max(500, "Alasan maksimal 500 karakter"),
  images: z.array(z.string().url()).max(5, "Maksimal 5 foto").optional(),
});
export type ReturnRequest = z.infer<typeof ReturnRequestSchema>;

export const RatingSchema = z.object({
  orderId: z.string(),
  itemId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  anonymous: z.boolean().default(false),
});
export type Rating = z.infer<typeof RatingSchema>;

// ============================================================================
// 6. LOYALTY & REWARDS
// ============================================================================

export const LoyaltyTierSchema = z.object({
  level: z.enum(["bronze", "silver", "gold", "platinum"]),
  minPoints: z.number().int().min(0),
  benefits: z.array(z.string()),
});
export type LoyaltyTier = z.infer<typeof LoyaltyTierSchema>;

export const PointsSchema = z.object({
  total: z.number().int().min(0),
  expiringSoon: z.number().int().min(0),
  expiryDate: z.string().datetime().optional(),
  tier: LoyaltyTierSchema,
  history: z.array(z.object({
    id: z.string(),
    type: z.enum(["earned", "redeemed", "expired"]),
    amount: z.number().int(),
    description: z.string(),
    date: z.string().datetime(),
  })),
});
export type Points = z.infer<typeof PointsSchema>;

export const RewardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  pointCost: z.number().int().positive(),
  type: z.enum(["voucher", "discount", "item", "shipping"]),
  value: z.number().positive(),
  available: z.boolean().default(true),
  expiryDays: z.number().int().positive(),
});
export type Reward = z.infer<typeof RewardSchema>;

// ============================================================================
// 7. PRE-ORDER & BUNDLES
// ============================================================================

export const PreorderInfoSchema = z.object({
  leadDays: z.number().int().min(1),
  quota: z.number().int().min(0),
  quotaUsed: z.number().int().min(0),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});
export type PreorderInfo = z.infer<typeof PreorderInfoSchema>;

export const BundleItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  weight: z.number().positive(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive().default(1),
});
export type BundleItem = z.infer<typeof BundleItemSchema>;

export const BundleConfigSchema = z.object({
  items: z.array(BundleItemSchema).min(1, "Pilih minimal 1 item"),
  maxWeight: z.number().positive(),
}).refine(d => {
  const totalWeight = d.items.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  return totalWeight <= d.maxWeight;
}, {
  message: "Total berat melebihi batas maksimal",
  path: ["items"]
});
export type BundleConfig = z.infer<typeof BundleConfigSchema>;

// ============================================================================
// 8. CONTENT (NEWS & EDUCATION)
// ============================================================================

export const CommentSchema = z.object({
  id: z.string().optional(),
  postId: z.string(),
  body: z.string().min(3, "Komentar minimal 3 karakter").max(2000, "Komentar maksimal 2000 karakter"),
  parentId: z.string().optional(),
  author: z.string(),
  createdAt: z.string().datetime().optional(),
  approved: z.boolean().default(false),
});
export type Comment = z.infer<typeof CommentSchema>;

export const NewsSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  featuredImage: z.string().url(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().datetime(),
  viewCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
});
export type News = z.infer<typeof NewsSchema>;

export const EducationModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  category: z.enum(["tips", "recipe", "hygiene", "farming"]),
  duration: z.number().int().positive(), // minutes
  thumbnail: z.string().url(),
  content: z.string(),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url().optional(),
  })),
});
export type EducationModule = z.infer<typeof EducationModuleSchema>;

// ============================================================================
// 9. CONTACT & SUPPORT
// ============================================================================

export const ContactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon tidak valid"),
  topic: z.enum(["pesanan", "pengembalian", "pembayaran", "akun", "produk", "lainnya"]),
  message: z.string().min(10, "Pesan minimal 10 karakter").max(2000, "Pesan maksimal 2000 karakter"),
  attachments: z.array(z.string().url()).max(3, "Maksimal 3 lampiran").optional(),
  orderId: z.string().optional(),
});
export type Contact = z.infer<typeof ContactSchema>;

export const FAQSchema = z.object({
  id: z.string(),
  category: z.string(),
  question: z.string(),
  answer: z.string(),
  helpful: z.number().int().min(0).default(0),
  order: z.number().int().min(0).default(0),
});
export type FAQ = z.infer<typeof FAQSchema>;

// ============================================================================
// 10. ADMIN
// ============================================================================

export const AdminProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Nama produk minimal 2 karakter"),
  slug: z.string().optional(),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  category: z.string().min(1, "Kategori harus dipilih"),
  price: z.number().nonnegative("Harga harus positif"),
  originalPrice: z.number().nonnegative().optional(),
  stock: z.number().int().min(0, "Stok tidak boleh negatif"),
  images: z.array(z.string().url()).min(1, "Minimal 1 gambar produk"),
  badges: z.array(z.enum(["asli-subang", "discount", "preorder", "bestseller", "new"])).default([]),
  variants: z.array(VariantSchema).default([]),
  weight: z.number().positive().optional(),
  minOrder: z.number().int().min(1).default(1),
  maxOrder: z.number().int().min(1).optional(),
  status: z.enum(["draft", "active", "inactive"]).default("active"),
});
export type AdminProduct = z.infer<typeof AdminProductSchema>;

export const BulkOrderActionSchema = z.object({
  orderIds: z.array(z.string()).min(1, "Pilih minimal 1 pesanan"),
  action: z.enum(["mark_shipped", "mark_delivered", "cancel", "export"]),
  reason: z.string().optional(),
});
export type BulkOrderAction = z.infer<typeof BulkOrderActionSchema>;

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}
