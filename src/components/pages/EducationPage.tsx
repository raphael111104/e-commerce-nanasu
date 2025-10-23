import { useState } from 'react';
import { ArrowLeft, Lightbulb, ChefHat, Heart, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

interface EducationPageProps {
  onBack: () => void;
}

interface EducationContent {
  id: string;
  title: string;
  icon: any;
  iconColor: string;
  bgColor: string;
  category: string;
  description: string;
  content: string[];
  tips?: string[];
}

export function EducationPage({ onBack }: EducationPageProps) {
  const [selectedContent, setSelectedContent] = useState<EducationContent | null>(null);

  const educationContents: EducationContent[] = [
    {
      id: 'tips-memilih',
      title: 'Tips Memilih Nanas Berkualitas',
      icon: Lightbulb,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      category: 'Panduan',
      description: 'Cara mudah memilih nanas yang manis dan segar',
      content: [
        'Perhatikan warna kulit yang kuning keemasan, terutama di bagian bawah',
        'Cium aromanya - nanas matang memiliki aroma manis yang khas',
        'Tekan bagian bawah nanas, jika sedikit lunak berarti sudah matang',
        'Pilih nanas dengan daun yang hijau segar, bukan yang kering atau kecoklatan',
        'Hindari nanas dengan bintik-bintik coklat atau area lunak berlebihan'
      ],
      tips: [
        'Nanas Subang terkenal dengan rasa manisnya yang khas',
        'Berat nanas yang baik minimal 1kg untuk ukuran sedang',
        'Nanas yang terlalu hijau akan asam, sedangkan terlalu kuning cepat busuk'
      ]
    },
    {
      id: 'cara-simpan',
      title: 'Menyimpan & Mengolah Nanas',
      icon: ChefHat,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      category: 'Panduan',
      description: 'Teknik penyimpanan dan pengolahan yang tepat',
      content: [
        'Nanas utuh bisa disimpan di suhu ruang 1-2 hari',
        'Simpan di kulkas untuk ketahanan hingga 3-5 hari',
        'Nanas yang sudah dipotong harus disimpan dalam wadah tertutup di kulkas',
        'Bekukan potongan nanas untuk smoothie atau jus yang menyegarkan',
        'Gunakan bagian tengah nanas untuk jus karena lebih manis'
      ],
      tips: [
        'Potong daun nanas dan balik posisinya agar rasa manis merata',
        'Rendam potongan nanas dalam air garam 10 menit untuk mengurangi rasa gatal',
        'Nanas cocok untuk berbagai olahan: jus, salad, kue, hingga tumisan'
      ]
    },
    {
      id: 'manfaat-kesehatan',
      title: 'Manfaat Kesehatan Nanas',
      icon: Heart,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      category: 'Kesehatan',
      description: 'Khasiat luar biasa buah nanas untuk tubuh',
      content: [
        'Kaya vitamin C yang meningkatkan sistem kekebalan tubuh',
        'Mengandung bromelain yang membantu pencernaan protein',
        'Antioksidan tinggi untuk melawan radikal bebas',
        'Membantu mengurangi peradangan dan mempercepat penyembuhan',
        'Baik untuk kesehatan tulang karena mengandung mangan'
      ],
      tips: [
        'Konsumsi 1-2 porsi (150-300g) per hari untuk manfaat optimal',
        'Hindari konsumsi berlebihan jika memiliki masalah lambung',
        'Nanas segar lebih baik daripada kalengan untuk kandungan nutrisi'
      ]
    },
    {
      id: 'resep-populer',
      title: 'Resep Nanas Populer',
      icon: BookOpen,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      category: 'Resep',
      description: 'Ide kreatif mengolah nanas menjadi hidangan lezat',
      content: [
        'Jus Nanas Segar: Blender nanas, es, dan sedikit madu',
        'Salad Buah Tropical: Mix nanas, mangga, pepaya, dan jeruk',
        'Nasi Goreng Nanas: Tumis dengan telur, sayuran, dan saus tiram',
        'Smoothie Bowl: Nanas beku, pisang, yogurt, granola topping',
        'Kue Nastar: Selai nanas untuk kue kering tradisional'
      ],
      tips: [
        'Nanas cocok dipadu dengan ayam, udang, atau daging sapi',
        'Tambahkan mint atau basil untuk aroma segar',
        'Panggang nanas dengan kayu manis untuk dessert yang nikmat'
      ]
    },
    {
      id: 'kualitas-subang',
      title: 'Keunggulan Nanas Subang',
      icon: Sparkles,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      category: 'Info',
      description: 'Mengapa Nanas Subang istimewa?',
      content: [
        'Ditanam di dataran tinggi Subang dengan iklim ideal',
        'Kadar gula lebih tinggi mencapai 14-16 brix',
        'Tekstur daging buah lebih padat dan tidak terlalu berair',
        'Aroma harum khas yang lebih kuat',
        'Proses panen tepat waktu saat tingkat kematangan optimal'
      ],
      tips: [
        'Nanas Subang mendapat sertifikasi Indikasi Geografis',
        'Petani lokal menggunakan metode organik tanpa pestisida berbahaya',
        'Setiap nanas dipanen manual untuk menjaga kualitas'
      ]
    },
    {
      id: 'sertifikasi',
      title: 'Sertifikasi & Standar Kualitas',
      icon: ShieldCheck,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      category: 'Info',
      description: 'Jaminan mutu produk NANASU',
      content: [
        'Sertifikat Indikasi Geografis (IG) dari Kemenkumham',
        'Standar SNI untuk keamanan pangan',
        'Good Agricultural Practices (GAP) certification',
        'Inspeksi rutin oleh Dinas Pertanian setempat',
        'Traceability system dari kebun ke konsumen'
      ],
      tips: [
        'Setiap produk NANASU memiliki kode QR untuk tracking',
        'Garansi uang kembali jika produk tidak sesuai standar',
        'Tim QC melakukan sampling setiap batch pengiriman'
      ]
    }
  ];

  const categories = ['Semua', 'Panduan', 'Kesehatan', 'Resep', 'Info'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredContents = selectedCategory === 'Semua'
    ? educationContents
    : educationContents.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[--bg-default] pb-20 md:pb-6">
      {/* Header */}
      <div className="glass-nav sticky top-0 z-10 px-4 py-3 border-b border-[--border-default]">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-[--text-primary]">Edukasi Nanas</h1>
            <p className="text-xs text-[--text-secondary]">Panduan lengkap tentang nanas</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[--brand-default] to-[--accent] text-[--on-brand] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-3">Kenali Lebih Dekat Nanas</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Pelajari cara memilih, menyimpan, dan menikmati nanas berkualitas premium dari Subang
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-[57px] z-[9] glass-nav border-b border-[--border-default] px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'bg-[--brand-default] text-[--on-brand]' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredContents.map((content, index) => {
            const Icon = content.icon;
            return (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="glass-card border-[--border-default] cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => setSelectedContent(content)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-full ${content.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${content.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <CardTitle className="text-base line-clamp-2">
                            {content.title}
                          </CardTitle>
                          <Badge variant="secondary" className="flex-shrink-0 text-xs">
                            {content.category}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {content.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-[--brand-default] group-hover:bg-[--brand-default]/10">
                      Baca Selengkapnya
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Content Modal */}
      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedContent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-full ${selectedContent.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <selectedContent.icon className={`w-6 h-6 ${selectedContent.iconColor}`} />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedContent.title}</DialogTitle>
                    <Badge variant="secondary" className="mt-1">
                      {selectedContent.category}
                    </Badge>
                  </div>
                </div>
                <DialogDescription className="text-base">
                  {selectedContent.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-3 text-[--text-primary]">Poin Penting:</h4>
                  <ul className="space-y-2">
                    {selectedContent.content.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-[--brand-default] font-bold flex-shrink-0">•</span>
                        <span className="text-sm text-[--text-secondary]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedContent.tips && selectedContent.tips.length > 0 && (
                  <div className="bg-[--accent] rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-[--text-primary] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[--brand-default]" />
                      Tips Tambahan
                    </h4>
                    <ul className="space-y-2">
                      {selectedContent.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-[--brand-default] flex-shrink-0">✓</span>
                          <span className="text-sm text-[--text-secondary]">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
