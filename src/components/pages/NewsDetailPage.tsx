import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen, Tag, MapPin, TrendingUp, Facebook, Twitter, Copy, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { LazyImage } from '../performance/LazyImage';
import { toast } from 'sonner@2.0.3';

export function NewsDetailPage({ article, onBack, onArticleClick }) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = (platform: string) => {
    const url = `https://nanasu.com/berita/${article.id}`;
    const text = article.title;

    switch (platform) {
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
          '_blank'
        );
        toast.success('Membuka WhatsApp...');
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        toast.success('Membuka Facebook...');
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        toast.success('Membuka Twitter...');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('Tautan disalin ke clipboard');
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  // Mock related articles based on category
  const relatedArticles = [
    {
      id: 101,
      title: 'Panen Raya Nanas Madu di Cisalak: Petani Targetkan Kualitas Grade A',
      excerpt: 'Kelompok tani Cisalak melaporkan panen raya dengan peningkatan brix dan ukuran rata-rata.',
      image: 'https://images.unsplash.com/photo-1707235163412-df7e8c119322?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc1OTgwMDk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      date: '21 Okt 2025',
      readTime: '4 min',
      category: article.category,
    },
    {
      id: 102,
      title: 'UMKM Anyar di Pagaden Kenalkan Selai Nanas Artisan Berbahan Lokal',
      excerpt: 'Produk baru menonjolkan bahan baku Subang dan kemasan ramah lingkungan.',
      image: 'https://images.unsplash.com/photo-1633062781822-e32867fe7d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYWtlJTIwZGVzc2VydCUyMGZvb2R8ZW58MXx8fHwxNzU5ODAxMDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '19 Okt 2025',
      readTime: '3 min',
      category: article.category,
    },
    {
      id: 103,
      title: 'Festival Nanas Subang 2025: Edukasi, Wisata Kebun, dan Bazar Produk Olahan',
      excerpt: 'Agenda edukasi budidaya, tur kebun, demo olahan untuk mendorong pariwisata lokal.',
      image: 'https://images.unsplash.com/photo-1645682491853-2028a826a571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMHBsYW50YXRpb258ZW58MXx8fHwxNzYwOTc0MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: '15 Okt 2025',
      readTime: '4 min',
      category: 'event',
    },
  ];

  const categoryColors = {
    panen: 'bg-green-600 hover:bg-green-600',
    harga: 'bg-emerald-600 hover:bg-emerald-600',
    umkm: 'bg-amber-600 hover:bg-amber-600',
    distribusi: 'bg-blue-600 hover:bg-blue-600',
    kebijakan: 'bg-purple-600 hover:bg-purple-600',
    event: 'bg-rose-600 hover:bg-rose-600',
  };

  const categoryLabels = {
    panen: 'Panen',
    harga: 'Harga',
    umkm: 'UMKM',
    distribusi: 'Distribusi & Ekspor',
    kebijakan: 'Kebijakan',
    event: 'Event & Wisata',
  };

  // Mock detailed content
  const articleContent = [
    {
      type: 'paragraph',
      content: article.excerpt,
    },
    {
      type: 'paragraph',
      content:
        'Subang, sebagai salah satu sentra produksi nanas terbesar di Indonesia, terus menunjukkan perkembangan positif dalam sektor agrikultur. Petani lokal yang tergabung dalam berbagai kelompok tani aktif mengadopsi praktik terbaik untuk meningkatkan kualitas dan produktivitas.',
    },
    {
      type: 'heading',
      content: 'Dampak bagi Petani Lokal',
    },
    {
      type: 'paragraph',
      content:
        'Perkembangan ini memberikan dampak signifikan bagi kesejahteraan petani di Subang. Dengan harga yang stabil dan permintaan yang terus meningkat, petani dapat merencanakan musim tanam dengan lebih baik dan mengoptimalkan hasil panen.',
    },
    {
      type: 'quote',
      content:
        '"Ini adalah momen yang tepat bagi petani nanas Subang untuk terus berinovasi dan meningkatkan kualitas produk. Dukungan dari semua pihak sangat kami harapkan."',
      author: 'Ketua Kelompok Tani Subang',
    },
    {
      type: 'paragraph',
      content:
        'UMKM yang mengolah nanas menjadi berbagai produk seperti selai, keripik, dan jus juga merasakan manfaat dari stabilitas pasokan dan harga. Mereka dapat fokus pada inovasi produk dan pengembangan pasar.',
    },
    {
      type: 'heading',
      content: 'Rencana Ke Depan',
    },
    {
      type: 'paragraph',
      content:
        'Pemerintah daerah bersama dengan stakeholder terkait terus berupaya meningkatkan infrastruktur pendukung seperti cold storage dan logistik distribusi. Hal ini diharapkan dapat memperluas jangkauan pasar hingga ke luar Jawa.',
    },
    {
      type: 'paragraph',
      content:
        'Program pelatihan dan pendampingan petani juga akan terus ditingkatkan, termasuk adopsi teknologi digital untuk pencatatan hasil panen dan traceability produk.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 page-transition">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Kembali ke Berita</span>
        <span className="sm:hidden">Kembali</span>
      </Button>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Content */}
        <article className="lg:col-span-8">
          {/* Article Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Badge
                className={`${
                  categoryColors[article.category] || 'bg-gray-600 hover:bg-gray-600'
                } text-white shadow-md text-xs`}
              >
                <Tag className="w-3 h-3 mr-1" />
                {categoryLabels[article.category] || 'Umum'}
              </Badge>
              {article.featured && (
                <Badge className="bg-[#D4AF37] text-[#1F2937] hover:bg-[#D4AF37] shadow-md text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Unggulan
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Metadata - Optimized for mobile */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{article.author}</span>
              </div>
              <span className="hidden sm:inline text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{article.date}</span>
              </div>
              <span className="hidden sm:inline text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{article.location}</span>
              </div>
              <span className="hidden sm:inline text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Share Buttons - Icon only on mobile */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="hover:bg-[#25D366] hover:text-white hover:border-[#25D366] flex-shrink-0"
              >
                <Share2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex-shrink-0"
              >
                <Facebook className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] flex-shrink-0"
              >
                <Twitter className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className={`flex-shrink-0 ${copied ? 'bg-green-50 text-green-600 border-green-600' : ''}`}
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 sm:mr-2" />
                ) : (
                  <Copy className="w-4 h-4 sm:mr-2" />
                )}
                <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin'}</span>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-6 sm:mb-8 -mx-3 sm:mx-0">
            <LazyImage
              src={article.image}
              alt={article.title}
              ratio="16:9"
              priority="high"
              className="w-full"
            />
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {article.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-sm sm:prose-lg max-w-none">
            {articleContent.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2
                      key={index}
                      className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4"
                    >
                      {block.content}
                    </h2>
                  );
                case 'quote':
                  return (
                    <div
                      key={index}
                      className="my-6 sm:my-8 pl-4 sm:pl-6 border-l-4 border-[#D4AF37] bg-[#D4AF37]/5 py-3 sm:py-4 pr-3 sm:pr-4 rounded-r-lg"
                    >
                      <p className="text-base sm:text-lg italic text-gray-700 mb-2">
                        {block.content}
                      </p>
                      {block.author && (
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          — {block.author}
                        </p>
                      )}
                    </div>
                  );
                case 'paragraph':
                default:
                  return (
                    <p key={index} className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {block.content}
                    </p>
                  );
              }
            })}
          </div>

          {/* Fakta Singkat */}
          <Card className="my-6 sm:my-8 bg-gradient-to-br from-[#16A34A]/5 to-[#D4AF37]/5 border-[#16A34A]/20">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-base sm:text-lg">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A]" />
                Fakta Singkat
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Dampak ke Petani:</strong> Peningkatan pendapatan hingga
                    15% dengan stabilitas harga
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Perubahan Harga:</strong> Harga stabil di kisaran Rp
                    15.000-20.000 per kg
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Rencana Distribusi:</strong> Ekspansi ke 5 kota besar
                    dengan cold storage
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="my-6 sm:my-8 bg-gradient-to-br from-[#16A34A] to-[#D4AF37] text-white">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-2">Belanja Nanas Subang</h3>
              <p className="text-white/90 mb-4 text-sm sm:text-base">
                Dapatkan nanas segar langsung dari petani Subang. Kualitas terjamin,
                harga terbaik.
              </p>
              <Button
                className="bg-white text-[#16A34A] hover:bg-white/90 w-full sm:w-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Lihat Katalog Produk
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Separator className="my-6 sm:my-8" />

          {/* Related Articles */}
          <div className="mt-8 sm:mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Berita Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedArticles.map((related) => (
                <Card
                  key={related.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => onArticleClick && onArticleClick(related)}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={related.image}
                      alt={related.title}
                      ratio="16:9"
                      priority="low"
                      className="w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#16A34A] transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{related.date}</span>
                      <span>{related.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar - Stacks below content on mobile */}
        <aside className="lg:col-span-4 mt-6 sm:mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
            {/* Popular Tags */}
            <Card>
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Tag Terkait</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A] hover:text-white cursor-pointer transition-colors text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-[#16A34A] hover:text-white cursor-pointer transition-colors text-xs"
                  >
                    #AsliSubang
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-[#16A34A]/10 to-[#D4AF37]/10 border-[#16A34A]/20">
              <CardContent className="p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">
                  Berlangganan Berita
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Dapatkan update berita nanas Subang langsung ke email Anda
                </p>
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                />
                <Button
                  className="w-full bg-[#16A34A] hover:bg-[#16A34A]/90"
                  onClick={() => toast.success('Terima kasih! Anda telah berlangganan')}
                >
                  Berlangganan
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
