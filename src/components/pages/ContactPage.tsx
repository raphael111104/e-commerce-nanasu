import { useState } from 'react';
import { ChevronLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telepon',
    value: '+62 812-3456-7890',
    description: 'Senin - Sabtu, 08:00 - 17:00 WIB',
    color: 'text-[#16A34A]'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@nanasu.id',
    description: 'Respon dalam 2-4 jam kerja',
    color: 'text-[#FACC15]'
  },
  {
    icon: MapPin,
    title: 'Alamat Kantor',
    value: 'Jl. Nanas Raya No. 123',
    description: 'Subang, Jawa Barat 41211',
    color: 'text-[#1F2937]'
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    value: 'Senin - Sabtu',
    description: '08:00 - 17:00 WIB',
    color: 'text-blue-600'
  }
];

const locations = [
  {
    name: 'Kantor Pusat NANASU',
    address: 'Jl. Nanas Raya No. 123, Subang',
    phone: '+62 812-3456-7890',
    type: 'Kantor Pusat',
    coordinates: { lat: -6.5699, lng: 107.7599 }
  },
  {
    name: 'Kebun Percontohan',
    address: 'Desa Cijambe, Subang',
    phone: '+62 813-7890-1234',
    type: 'Kebun',
    coordinates: { lat: -6.5800, lng: 107.7500 }
  },
  {
    name: 'Pusat Pengolahan',
    address: 'Jl. Industri No. 45, Subang',
    phone: '+62 814-5678-9012',
    type: 'Pabrik',
    coordinates: { lat: -6.5600, lng: 107.7700 }
  }
];

const socialMedia = [
  {
    name: 'Facebook',
    icon: Facebook,
    handle: '@nanasu.subang',
    followers: '12K',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    handle: '@nanasu_official',
    followers: '8.5K',
    color: 'text-pink-600',
    bg: 'bg-pink-50'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    handle: 'NANASU Channel',
    followers: '3.2K',
    color: 'text-red-600',
    bg: 'bg-red-50'
  }
];

const faqData = [
  {
    question: 'Bagaimana cara memesan produk NANASU?',
    answer: 'Anda bisa memesan langsung melalui website kami, WhatsApp, atau datang langsung ke kantor pusat. Kami melayani pemesanan online 24/7.'
  },
  {
    question: 'Apakah ada minimum order?',
    answer: 'Untuk pembelian retail tidak ada minimum order. Untuk pembelian grosir atau kemitraan, minimum order 50kg atau sesuai kesepakatan.'
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Untuk area Jawa Barat 1-2 hari kerja, Jabodetabek 1 hari kerja, luar Jawa 2-4 hari kerja tergantung lokasi.'
  },
  {
    question: 'Bagaimana dengan garansi kesegaran produk?',
    answer: 'Kami memberikan garansi 100% uang kembali jika produk tidak sesuai standar kesegaran saat diterima.'
  }
];

export function ContactPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Pesan berhasil dikirim!', {
      description: 'Tim kami akan menghubungi Anda dalam 2-4 jam kerja.',
      duration: 4000,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      type: 'general'
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-16 md:top-16 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 h-12 md:h-14">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="md:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <MessageCircle className="w-6 h-6 text-[#16A34A]" />
            <h1 className="font-semibold text-lg md:text-xl">Hubungi Kami</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ada yang Bisa Kami Bantu?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim NANASU siap membantu Anda 24/7. Hubungi kami untuk pertanyaan, 
            pemesanan, atau kemitraan bisnis.
          </p>
        </div>

        {/* Quick Contact Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${info.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{info.title}</h3>
                  <p className="font-medium text-sm mb-1">{info.value}</p>
                  <p className="text-xs text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contact">Kontak</TabsTrigger>
            <TabsTrigger value="locations">Lokasi</TabsTrigger>
            <TabsTrigger value="social">Sosial Media</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Contact Form Tab */}
          <TabsContent value="contact">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="08xx-xxxx-xxxx"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Kategori Pesan</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white"
                        required
                      >
                        <option value="general">Pertanyaan Umum</option>
                        <option value="order">Pemesanan</option>
                        <option value="partnership">Kemitraan</option>
                        <option value="complaint">Keluhan</option>
                        <option value="suggestion">Saran</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subjek</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subjek pesan Anda"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Pesan</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tuliskan pesan Anda di sini..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#16A34A] hover:bg-[#16A34A]/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info & Map */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Kontak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#16A34A] mt-0.5" />
                        <div>
                          <p className="font-medium">Alamat Kantor</p>
                          <p className="text-sm text-gray-600">
                            Jl. Nanas Raya No. 123<br />
                            Subang, Jawa Barat 41211
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#16A34A] mt-0.5" />
                        <div>
                          <p className="font-medium">Telepon & WhatsApp</p>
                          <p className="text-sm text-gray-600">+62 812-3456-7890</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#16A34A] mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-gray-600">hello@nanasu.id</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#16A34A] mt-0.5" />
                        <div>
                          <p className="font-medium">Jam Operasional</p>
                          <p className="text-sm text-gray-600">
                            Senin - Sabtu: 08:00 - 17:00 WIB<br />
                            Minggu: Tutup
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card>
                  <CardContent className="p-0">
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-medium">Peta Lokasi</p>
                        <p className="text-sm">Jl. Nanas Raya No. 123, Subang</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <Badge variant="outline">{location.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#16A34A] mt-0.5" />
                        <p className="text-sm text-gray-600">{location.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#16A34A]" />
                        <p className="text-sm">{location.phone}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        Lihat di Peta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <div className="grid md:grid-cols-3 gap-6">
              {socialMedia.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="text-center pt-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${social.bg} flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 ${social.color}`} />
                      </div>
                      <h3 className="font-semibold mb-2">{social.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{social.handle}</p>
                      <p className="text-sm font-medium mb-4">{social.followers} followers</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Kunjungi
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Ikuti Media Sosial Kami</h3>
                <p className="text-gray-600 mb-6">
                  Dapatkan update terbaru tentang produk, tips pertanian, dan promo menarik
                </p>
                <div className="flex justify-center gap-4">
                  {socialMedia.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Button key={index} variant="outline" size="sm">
                        <IconComponent className="w-4 h-4 mr-2" />
                        {social.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Pertanyaan yang sering diajukan tentang NANASU</p>
              </div>

              {faqData.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-[#16A34A] text-white">
                <CardContent className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Tidak Menemukan Jawaban?
                  </h3>
                  <p className="mb-6 opacity-90">
                    Tim customer service kami siap membantu Anda 24/7
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="secondary">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline" className="border-white/80 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Hubungi Kami
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}