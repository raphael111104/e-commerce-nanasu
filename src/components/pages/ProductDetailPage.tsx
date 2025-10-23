import { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Truck, Shield, MessageCircle, QrCode, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductDetailPageProps {
  product: any;
  onAddToCart: (product: any, quantity: number) => void;
  onBack: () => void;
  onAddToWishlist?: (product: any) => void;
  onBuyNow?: (product: any, quantity: number) => void;
}

export function ProductDetailPage({ 
  product, 
  onAddToCart, 
  onBack,
  onAddToWishlist,
  onBuyNow
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('matang');
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1632242342964-242876b950c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBmcmVzaCUyMGZydWl0fGVufDF8fHx8MTc1OTc5ODc5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwcm9kdWN0cyUyMGluZG9uZXNpYXxlbnwxfHx8fDE3NTk3OTg4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const variants = [
    { id: 'muda', label: 'Kematangan Muda', description: 'Rasa asam segar', price: product.price },
    { id: 'matang', label: 'Kematangan Matang', description: 'Manis sempurna', price: product.price + 2000 },
    { id: 'sangat-matang', label: 'Sangat Matang', description: 'Extra manis', price: product.price + 5000 }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sari Wulandari',
      rating: 5,
      comment: 'Nanas nya manis banget! Benar-benar dari Subang, kualitas juara. Packaging juga rapi.',
      date: '2 hari lalu',
      verified: true,
      images: [product.image]
    },
    {
      id: 2,
      name: 'Budi Santoso',
      rating: 4,
      comment: 'Pengiriman cepat, nanas fresh. Cocok untuk jus pagi. Pasti order lagi.',
      date: '1 minggu lalu',
      verified: true
    },
    {
      id: 3,
      name: 'Maya Kusuma',
      rating: 5,
      comment: 'Sudah langganan di NANASU. Konsisten kualitasnya, dan petaninya ramah kalau chat.',
      date: '2 minggu lalu',
      verified: true
    }
  ];

  const handleAddToCart = () => {
    const selectedVariantData = variants.find(v => v.id === selectedVariant);
    onAddToCart({
      ...product,
      variant: selectedVariantData,
      price: selectedVariantData.price
    }, quantity);
  };

  const handleBuyNow = () => {
    const selectedVariantData = variants.find(v => v.id === selectedVariant);
    if (onBuyNow) {
      onBuyNow({
        ...product,
        variant: selectedVariantData,
        price: selectedVariantData.price
      }, quantity);
    }
  };

  const handleWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product);
      setIsWishlisted(true);
    }
  };

  const currentPrice = variants.find(v => v.id === selectedVariant)?.price || product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div>
          <div className="relative mb-4">
            <ImageWithFallback
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
            
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badges?.map((badge, index) => (
                <Badge
                  key={index}
                  className={`${
                    badge === 'Asli Subang' 
                      ? 'bg-[#16A34A] text-white hover:bg-[#16A34A]' 
                      : badge === 'Panen Minggu Ini'
                      ? 'bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15]'
                      : ''
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`bg-white/80 hover:bg-white ${isWishlisted ? 'text-red-500' : ''}`}
                onClick={handleWishlist}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-[#FACC15]' : 'border-gray-200'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({product.reviewCount} ulasan)</span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{product.reviewCount + 45} terjual</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-[#1F2937]">
                Rp {currentPrice.toLocaleString('id-ID')}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
              {product.discount && (
                <Badge variant="destructive" className="text-xs">
                  -{product.discount}%
                </Badge>
              )}
            </div>
          </div>

          {/* Variant Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Pilih Kematangan:</h3>
            <div className="grid grid-cols-1 gap-2">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    selectedVariant === variant.id
                      ? 'border-[#FACC15] bg-[#FACC15]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium">{variant.label}</span>
                      <p className="text-sm text-gray-500">{variant.description}</p>
                    </div>
                    <span className="font-medium">
                      Rp {variant.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Jumlah:</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={product.stock && quantity >= product.stock}
              >
                +
              </Button>
              {product.stock && (
                <span className="text-sm text-gray-500 ml-2">
                  Stok: {product.stock}
                </span>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-4 h-4" />
              <span>Gratis ongkir &gt;100k</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Garansi segar</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] font-medium"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Tambah ke Keranjang
            </Button>
            <Button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#1F2937] hover:bg-[#1F2937]/90 text-white"
            >
              Beli Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* Kenali Petanimu Section */}
      <Card className="mb-8 border-[#16A34A]/20 bg-gradient-to-r from-green-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#16A34A]">
            <QrCode className="w-5 h-5" />
            Kenali Petanimu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://images.unsplash.com/photo-1736259762444-d00ed881872f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWElMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTk3OTg4MDN8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-[#1F2937]">Pak Joko Susanto</h4>
                <p className="text-sm text-gray-600 mb-2">Kebun Nanas Subang Jaya</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Desa Cijambe, Subang</span>
                </div>
                <p className="text-sm text-gray-600">
                  Petani nanas berpengalaman 15 tahun dengan metode organik
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tanggal Panen:</span>
                <span className="font-medium">3 Januari 2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Metode Tanam:</span>
                <span className="font-medium">Organik</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lama Perawatan:</span>
                <span className="font-medium">18 bulan</span>
              </div>
              <Separator />
              <Button variant="outline" size="sm" className="w-full">
                <QrCode className="w-4 h-4 mr-2" />
                Lihat Sertifikat Traceability
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Deskripsi</TabsTrigger>
          <TabsTrigger value="reviews">Ulasan ({product.reviewCount})</TabsTrigger>
          <TabsTrigger value="qa">Tanya Jawab</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <h3>Tentang Produk</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nanas premium langsung dari kebun organik Subang yang terkenal dengan kualitas terbaiknya. 
                  Dipetik pada tingkat kematangan optimal untuk memberikan rasa manis yang sempurna dan 
                  kandungan nutrisi yang maksimal.
                </p>
                
                <h4 className="mt-4 mb-2">Keunggulan:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• 100% organik tanpa pestisida</li>
                  <li>• Kandungan vitamin C tinggi</li>
                  <li>• Dipetik langsung saat matang optimal</li>
                  <li>• Kemasan food grade yang aman</li>
                  <li>• Traceability lengkap dari kebun</li>
                </ul>

                <h4 className="mt-4 mb-2">Cara Penyimpanan:</h4>
                <p className="text-gray-600">
                  Simpan di tempat sejuk dan kering. Untuk nanas yang sudah matang, 
                  konsumsi dalam 2-3 hari atau simpan di kulkas maksimal 5 hari.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.name}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Pembeli Terverifikasi
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 mb-3">{review.comment}</p>
                      {review.images && (
                        <div className="flex gap-2">
                          {review.images.map((image, index) => (
                            <ImageWithFallback
                              key={index}
                              src={image}
                              alt={`Review ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="qa" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Belum ada pertanyaan</h3>
                <p className="text-gray-500 mb-4">
                  Jadilah yang pertama bertanya tentang produk ini
                </p>
                <Button variant="outline">
                  Ajukan Pertanyaan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}