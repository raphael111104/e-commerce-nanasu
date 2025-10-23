/**
 * Catalog Service
 * API calls for product search, suggestions, and catalog browsing
 */

import type { Product, SearchQuery, PaginatedResponse, ApiResponse, ApiError } from '../schemas';

// Mock data for development
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nanas Madu Premium',
    slug: 'nanas-madu-premium',
    description: 'Nanas madu premium dari kebun Subang dengan rasa manis alami',
    category: 'nanas-segar',
    price: 45000,
    originalPrice: 55000,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800'],
    badges: ['asli-subang', 'bestseller'],
    variants: [],
    rating: 4.8,
    reviewCount: 127,
    minOrder: 1,
    maxOrder: 20,
    weight: 1.5,
    sellerId: 'seller1',
    sellerName: 'Petani Pak Budi',
  },
  {
    id: '2',
    name: 'Nanas Queen Sweet',
    slug: 'nanas-queen-sweet',
    description: 'Nanas queen varietas manis dengan tekstur lembut',
    category: 'nanas-segar',
    price: 38000,
    stock: 80,
    images: ['https://images.unsplash.com/photo-1587132105988-aa0f2e429d14?w=800'],
    badges: ['asli-subang'],
    variants: [],
    rating: 4.6,
    reviewCount: 89,
    minOrder: 1,
    weight: 1.2,
    sellerId: 'seller1',
    sellerName: 'Petani Pak Budi',
  },
  {
    id: '3',
    name: 'Jus Nanas Segar 1L',
    slug: 'jus-nanas-segar-1l',
    description: '100% jus nanas asli tanpa pengawet dan pemanis tambahan',
    category: 'olahan',
    price: 25000,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800'],
    badges: ['new'],
    variants: [
      { id: 'v1', name: '500ml', price: 15000, stock: 50 },
      { id: 'v2', name: '1L', price: 25000, stock: 30 },
    ],
    rating: 4.7,
    reviewCount: 45,
    minOrder: 1,
    weight: 1.0,
    sellerId: 'seller2',
    sellerName: 'UMKM Ibu Ani',
  },
];

/**
 * Search products with filters and sorting
 */
export async function searchProducts(
  query: SearchQuery
): Promise<PaginatedResponse<Product>> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = [...MOCK_PRODUCTS];

  // Filter by search query
  if (query.q) {
    const q = query.q.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Filter by category
  if (query.category) {
    filtered = filtered.filter(p => p.category === query.category);
  }

  // Filter by price range
  if (query.min !== undefined) {
    filtered = filtered.filter(p => p.price >= query.min!);
  }
  if (query.max !== undefined) {
    filtered = filtered.filter(p => p.price <= query.max!);
  }

  // Filter by rating
  if (query.rating) {
    filtered = filtered.filter(p => p.rating >= query.rating!);
  }

  // Sort
  switch (query.sort) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating_desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'bestselling':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
    default:
      // Already in newest order
      break;
  }

  // Pagination
  const page = query.page || 1;
  const limit = 12;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

/**
 * Get single product by ID or slug
 */
export async function getProduct(idOrSlug: string): Promise<ApiResponse<Product>> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const product = MOCK_PRODUCTS.find(
    p => p.id === idOrSlug || p.slug === idOrSlug
  );

  if (!product) {
    return {
      success: false,
      error: {
        code: 'PRODUCT_NOT_FOUND',
        message: 'Produk tidak ditemukan',
      },
    };
  }

  return {
    success: true,
    data: product,
  };
}

/**
 * Get search suggestions (auto-complete)
 */
export async function getSuggestions(
  query: string
): Promise<ApiResponse<{
  products: Product[];
  categories: { id: string; name: string; count: number }[];
  sellers: { id: string; name: string; location: string }[];
}>> {
  await new Promise(resolve => setTimeout(resolve, 200));

  if (!query || query.length < 2) {
    return {
      success: true,
      data: {
        products: [],
        categories: [],
        sellers: [],
      },
    };
  }

  const q = query.toLowerCase();
  
  const products = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  ).slice(0, 5);

  const categories = [
    { id: 'nanas-segar', name: 'Nanas Segar', count: 45 },
    { id: 'olahan', name: 'Produk Olahan', count: 23 },
    { id: 'paket', name: 'Paket Bundling', count: 12 },
  ].filter(c => c.name.toLowerCase().includes(q));

  const sellers = [
    { id: 'seller1', name: 'Petani Pak Budi', location: 'Subang' },
    { id: 'seller2', name: 'UMKM Ibu Ani', location: 'Subang Kota' },
  ].filter(s => s.name.toLowerCase().includes(q));

  return {
    success: true,
    data: {
      products,
      categories,
      sellers,
    },
  };
}

/**
 * Get featured/recommended products
 */
export async function getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    success: true,
    data: MOCK_PRODUCTS.filter(p => p.badges.includes('bestseller')),
  };
}

/**
 * Get related products
 */
export async function getRelatedProducts(productId: string): Promise<ApiResponse<Product[]>> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  if (!product) {
    return {
      success: false,
      error: {
        code: 'PRODUCT_NOT_FOUND',
        message: 'Produk tidak ditemukan',
      },
    };
  }

  const related = MOCK_PRODUCTS.filter(
    p => p.id !== productId && p.category === product.category
  ).slice(0, 4);

  return {
    success: true,
    data: related,
  };
}

/**
 * Get categories with product counts
 */
export async function getCategories(): Promise<ApiResponse<{
  id: string;
  name: string;
  slug: string;
  count: number;
  icon?: string;
}[]>> {
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    success: true,
    data: [
      { id: '1', name: 'Nanas Segar', slug: 'nanas-segar', count: 45, icon: '🍍' },
      { id: '2', name: 'Produk Olahan', slug: 'olahan', count: 23, icon: '🧃' },
      { id: '3', name: 'Paket Bundling', slug: 'paket', count: 12, icon: '📦' },
      { id: '4', name: 'Pre-Order', slug: 'preorder', count: 8, icon: '📅' },
    ],
  };
}

/**
 * Error handler helper
 */
export function handleApiError(error: any): ApiError {
  if (error.response) {
    return {
      code: error.response.data?.code || 'API_ERROR',
      message: error.response.data?.message || 'Terjadi kesalahan pada server',
      details: error.response.data?.details,
    };
  }

  if (error.request) {
    return {
      code: 'NETWORK_ERROR',
      message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'Terjadi kesalahan yang tidak diketahui',
  };
}
