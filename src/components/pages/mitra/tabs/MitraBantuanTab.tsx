import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../ui/accordion';

export function MitraBantuanTab() {
  const faqs = [
    {
      question: 'Bagaimana cara menambahkan produk baru?',
      answer: 'Anda bisa menambahkan produk melalui menu Produk, lalu klik tombol "Tambah Produk". Isi informasi produk seperti nama, deskripsi, harga, stok, dan upload foto produk. Setelah selesai, klik "Simpan Produk".'
    },
    {
      question: 'Berapa lama waktu yang dibutuhkan untuk verifikasi akun mitra?',
      answer: 'Proses verifikasi akun mitra biasanya memakan waktu 1-2 hari kerja setelah Anda melengkapi semua dokumen yang diperlukan. Tim kami akan menghubungi Anda via email atau telepon jika ada informasi tambahan yang dibutuhkan.'
    },
    {
      question: 'Bagaimana cara membuat resi pengiriman?',
      answer: 'Buka menu Pengiriman, lalu klik tombol "Buat Resi". Pilih kurir yang diinginkan dan masukkan berat paket. Sistem akan otomatis generate nomor resi dan estimasi waktu tiba. Anda bisa mencetak atau menyimpan resi tersebut.'
    },
    {
      question: 'Kapan saya bisa menarik saldo (payout)?',
      answer: 'Anda bisa mengajukan payout kapan saja dengan minimal pencairan Rp 100.000. Proses payout membutuhkan waktu 1-2 hari kerja. Pastikan data rekening bank Anda sudah benar sebelum mengajukan payout.'
    },
    {
      question: 'Bagaimana jika ada pesanan yang ingin dibatalkan pelanggan?',
      answer: 'Jika pelanggan ingin membatalkan pesanan, Anda bisa mengubah status pesanan menjadi "Dibatalkan" di menu Pesanan. Dana akan otomatis dikembalikan ke pelanggan dalam 3-5 hari kerja.'
    },
    {
      question: 'Apa yang harus dilakukan jika produk mengalami masalah kualitas?',
      answer: 'Jika ada keluhan terkait kualitas produk, segera hubungi tim dukungan kami. Kami akan membantu mediasi dengan pelanggan dan mencari solusi terbaik. Pastikan selalu menjaga kualitas produk sesuai standar yang telah ditetapkan.'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bantuan</h2>
        <p className="text-gray-600">Temukan jawaban atas pertanyaan Anda</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Cards */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-2 border-gray-200 hover:border-[#16A34A] hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A34A] to-[#D4AF37] flex items-center justify-center text-white mx-auto mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-sm text-gray-600 mb-3">mitra@nanasu.id</p>
              <Button variant="outline" size="sm" className="w-full">
                Kirim Email
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-[#16A34A] hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
              <p className="text-sm text-gray-600 mb-3">0812-3456-7890</p>
              <Button variant="outline" size="sm" className="w-full">
                Hubungi
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-[#16A34A] hover:shadow-lg transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white mx-auto mb-3">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-sm text-gray-600 mb-3">Chat langsung</p>
              <Button variant="outline" size="sm" className="w-full">
                Chat WA
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle>Pertanyaan yang Sering Diajukan (FAQ)</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Tidak menemukan jawaban yang Anda cari?
                </p>
                <Button className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                  Hubungi Dukungan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
