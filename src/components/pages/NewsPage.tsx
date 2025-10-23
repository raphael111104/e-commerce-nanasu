import { useState } from 'react';
import { Calendar, MapPin, ArrowRight, TrendingUp, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LazyImage } from '../performance/LazyImage';

export function NewsPage({ onArticleClick }) {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const categories = [
    { id: 'semua', label: 'Semua' },
    { id: 'panen', label: 'Panen' },
    { id: 'harga', label: 'Harga' },
    { id: 'umkm', label: 'UMKM' },
    { id: 'distribusi', label: 'Distribusi & Ekspor' },
    { id: 'kebijakan', label: 'Kebijakan' },
    { id: 'event', label: 'Event & Wisata' },
  ];

  const dateFilters = [
    { id: 'semua', label: 'Semua Waktu' },
    { id: '7', label: '7 Hari Terakhir' },
    { id: '30', label: '30 Hari Terakhir' },
    { id: '90', label: '3 Bulan Terakhir' },
  ];

  const allArticles = [
    {
      id: 1,
      title: 'Panen Raya Nanas Madu di Cisalak: Petani Targetkan Kualitas Grade A',
      excerpt: 'Kelompok tani Cisalak melaporkan panen raya dengan peningkatan brix dan ukuran rata-rata. Distribusi diarahkan ke pasar regional dan platform online.',
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'panen',
      date: '21 Oktober 2025',
      location: 'Cisalak, Subang',
      author: 'Redaksi Nanasu',
      readTime: '4 min',
      tags: ['#PanenRaya', '#Kualitas', '#AsliSubang'],
      featured: true
    },
    {
      id: 2,
      title: 'Harga Nanas Subang Stabil Menjelang Akhir Bulan, UMKM Didorong Perluas Variasi Produk',
      excerpt: 'Harga di tingkat petani relatif stabil; pelaku UMKM meningkatkan olahan seperti keripik & selai untuk menjaga margin.',
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'harga',
      date: '20 Oktober 2025',
      location: 'Subang',
      author: 'Tim Analisis Nanasu',
      readTime: '5 min',
      tags: ['#HargaNanas', '#UMKMSubang'],
      featured: true
    },
    {
      id: 3,
      title: 'UMKM Anyar di Pagaden Kenalkan Selai Nanas Artisan Berbahan Lokal',
      excerpt: 'Produk baru menonjolkan bahan baku Subang dan kemasan ramah lingkungan, menyasar pasar ritel & online.',
      image: 'https://images.unsplash.com/photo-1633062781822-e32867fe7d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYWtlJTIwZGVzc2VydCUyMGZvb2R8ZW58MXx8fHwxNzU5ODAxMDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'umkm',
      date: '19 Oktober 2025',
      location: 'Pagaden, Subang',
      author: 'Contributor UMKM',
      readTime: '3 min',
      tags: ['#UMKMSubang', '#ProdukOlahan']
    },
    {
      id: 4,
      title: 'Peningkatan Rantai Dingin: Nanas Subang Siap Perluas Kiriman Antar-Kota',
      excerpt: 'Uji coba pengiriman berpendingin menjaga kesegaran hingga 48 jam; kerja sama logistik diperluas.',
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'distribusi',
      date: '18 Oktober 2025',
      location: 'Subang',
      author: 'Redaksi Nanasu',
      readTime: '6 min',
      tags: ['#Logistik', '#RantaiDingin']
    },
    {
      id: 5,
      title: 'Pelatihan Digital untuk Petani: Pencatatan Panen & Kualitas Kini Berbasis Aplikasi',
      excerpt: 'Program pelatihan membantu pencatatan mutu dan asal-usul (traceability) untuk memperkuat daya saing.',
      image: 'https://images.unsplash.com/photo-1710563849800-73af5bfc9f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZmFybWVyJTIwYWdyaWN1bHR1cmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk4MDA5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'kebijakan',
      date: '17 Oktober 2025',
      location: 'Subang',
      author: 'Redaksi Nanasu',
      readTime: '5 min',
      tags: ['#Digitalisasi', '#Traceability']
    },
    {
      id: 6,
      title: 'Festival Nanas Subang 2025: Edukasi, Wisata Kebun, dan Bazar Produk Olahan',
      excerpt: 'Agenda edukasi budidaya, tur kebun, demo olahan, dan promo bundling untuk mendorong pariwisata lokal.',
      image: 'https://images.unsplash.com/photo-1645682491853-2028a826a571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMHBsYW50YXRpb258ZW58MXx8fHwxNzYwOTc0MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'event',
      date: '15 Oktober 2025',
      location: 'Jalancagak, Subang',
      author: 'Redaksi Nanasu',
      readTime: '4 min',
      tags: ['#FestivalNanas', '#WisataKebun']
    },
    {
      id: 7,
      title: 'Cuaca Bersahabat, Produktivitas Nanas di Serangpanjang Meningkat',
      excerpt: 'Curah hujan terkendali dan sinar matahari cukup meningkatkan ukuran serta rasa nanas.',
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'panen',
      date: '14 Oktober 2025',
      location: 'Serangpanjang, Subang',
      author: 'Contributor Petani',
      readTime: '3 min',
      tags: ['#Panen', '#Produktivitas']
    },
    {
      id: 8,
      title: 'Kemitraan Baru: UMKM Subang Gandeng Retail Modern untuk Produk Nanas Olahan',
      excerpt: 'Kesepakatan pasok bertahap untuk keripik & selai membuka kanal distribusi baru bagi pelaku lokal.',
      image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'umkm',
      date: '12 Oktober 2025',
      location: 'Subang',
      author: 'Contributor UMKM',
      readTime: '4 min',
      tags: ['#Kemitraan', '#RetailModern']
    },
  ];

  // Popular articles for sidebar
  const popularArticles = [
    { id: 1, title: 'Panen Raya Nanas Madu di Cisalak', date: '21 Okt 2025' },
    { id: 6, title: 'Festival Nanas Subang 2025', date: '15 Okt 2025' },
    { id: 2, title: 'Harga Nanas Subang Stabil', date: '20 Okt 2025' },
    { id: 4, title: 'Peningkatan Rantai Dingin', date: '18 Okt 2025' },
    { id: 5, title: 'Pelatihan Digital untuk Petani', date: '17 Okt 2025' },
  ];

  // Tag cloud
  const allTags = [
    '#PanenRaya',
    '#HargaNanas',
    '#UMKMSubang',
    '#Logistik',
    '#Ekspor',
    '#FestivalNanas',
    '#EdukasiPetani',
    '#Digitalisasi',
    '#WisataKebun',
    '#Traceability',
  ];

  // Filter articles
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'semua' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory('semua');
    setSearchQuery('');
    setDateFilter('semua');
    setCurrentPage(1);
  };

  const ArticleCard = ({ article, featured = false }) => (
    <Card
      className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${
        featured ? 'border-[#D4AF37]/30 shadow-md' : ''
      }`}
      onClick={() => onArticleClick(article)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <LazyImage
          src={article.image}
          alt={article.title}
          ratio="16:9"
          priority={featured ? 'high' : 'normal'}
          className="w-full group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3">
          <Badge
            className={`${
              article.category === 'panen'
                ? 'bg-green-600 hover:bg-green-600'
                : article.category === 'harga'
                ? 'bg-emerald-600 hover:bg-emerald-600'
                : article.category === 'umkm'
                ? 'bg-amber-600 hover:bg-amber-600'
                : article.category === 'distribusi'
                ? 'bg-blue-600 hover:bg-blue-600'
                : article.category === 'kebijakan'
                ? 'bg-purple-600 hover:bg-purple-600'
                : article.category === 'event'
                ? 'bg-rose-600 hover:bg-rose-600'
                : 'bg-gray-600 hover:bg-gray-600'
            } text-white shadow-lg`}
          >
            {categories.find((cat) => cat.id === article.category)?.label ||
              'Umum'}
          </Badge>
        </div>

        {featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-[#D4AF37] text-[#1F2937] hover:bg-[#D4AF37] shadow-lg">
              <TrendingUp className="w-3 h-3 mr-1" />
              Unggulan
            </Badge>
          </div>
        )}
      </div>

      <CardContent className={`${featured ? 'p-5' : 'p-4'}`}>
        <h3
          className={`font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#16A34A] transition-colors ${
            featured ? 'text-lg' : 'text-base'
          }`}
        >
          {article.title}
        </h3>

        <p
          className={`text-gray-600 line-clamp-3 mb-3 ${
            featured ? 'text-base' : 'text-sm'
          }`}
        >
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {article.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col gap-2 text-xs text-gray-500 border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{article.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#16A34A] hover:text-[#16A34A] hover:bg-[#16A34A]/5 p-0 h-auto group-hover:gap-2 transition-all"
          >
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 page-transition">
      {/* Hero Section */}
      <div
        className="mb-8 rounded-2xl p-8 relative overflow-hidden fade-in"
        style={{
          background: 'linear-gradient(135deg, #16A34A 0%, #D4AF37 100%)',
        }}
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
            <Badge className="bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15] text-xs">
              Asli Subang
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Berita Nanas Subang
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl">
            Kabar panen, UMKM, harga, dan event seputar nanas asli Subang.
          </p>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -left-10 top-0 w-40 h-40 rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Filter Bar */}
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#16A34A] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
              {(selectedCategory !== 'semua' || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan {currentArticles.length} dari {filteredArticles.length} berita
            </p>
          </div>

          {/* Articles Grid */}
          {currentArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    featured={article.featured && currentPage === 1}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Sebelumnya
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? 'bg-[#16A34A] hover:bg-[#16A34A]/90'
                              : ''
                          }
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="text-center py-16 px-4">
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Belum ada berita untuk filter ini
              </h3>
              <p className="text-gray-600 mb-6">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button onClick={resetFilters} variant="outline">
                Hapus Filter
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Popular Articles */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                  Terpopuler
                </h3>
                <div className="space-y-3">
                  {popularArticles.map((article, index) => (
                    <button
                      key={article.id}
                      onClick={() =>
                        onArticleClick(
                          allArticles.find((a) => a.id === article.id)
                        )
                      }
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex gap-3">
                        <span className="text-2xl font-bold text-gray-200 group-hover:text-[#16A34A] transition-colors">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#16A34A] transition-colors">
                            {article.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {article.date}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tag Cloud */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-bold text-gray-900 mb-4">Tag Populer</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-[#16A34A] hover:text-white text-gray-700 text-sm rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-[#16A34A] to-[#D4AF37] text-white">
              <CardContent className="p-5">
                <h3 className="font-bold mb-2">Belanja Nanas Subang</h3>
                <p className="text-sm text-white/90 mb-4">
                  Dapatkan nanas segar langsung dari petani
                </p>
                <Button
                  className="w-full bg-white text-[#16A34A] hover:bg-white/90"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Lihat Katalog
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
