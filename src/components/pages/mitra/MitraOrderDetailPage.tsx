import { useState } from 'react';
import { ArrowLeft, Package, Truck, User, MapPin, Phone, Mail, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { LazyImage } from '../../performance/LazyImage';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { toast } from 'sonner@2.0.3';

export function MitraOrderDetailPage({ orderId, onBack, onNavigate }) {
  const [orderStatus, setOrderStatus] = useState('baru');
  const [showResiDialog, setShowResiDialog] = useState(false);
  const [resiForm, setResiForm] = useState({ courier: '', weight: '' });
  const [generatedResi, setGeneratedResi] = useState(null);

  const order = {
    id: orderId || 'ORD-1023',
    date: '2025-01-20 14:30',
    status: orderStatus,
    customer: {
      name: 'Budi Santoso',
      phone: '08123456789',
      email: 'budi@email.com'
    },
    shippingAddress: {
      recipient: 'Budi Santoso',
      phone: '08123456789',
      address: 'Jl. Merdeka No. 123, RT 02/RW 05',
      city: 'Bandung, Jawa Barat 40114'
    },
    items: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=200',
        name: 'Nanas Madu Subang Premium',
        price: 45000,
        quantity: 3,
        subtotal: 135000
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=200',
        name: 'Dodol Nanas 250gr',
        price: 25000,
        quantity: 2,
        subtotal: 50000
      }
    ],
    summary: {
      subtotal: 185000,
      shipping: 15000,
      discount: 0,
      total: 200000
    },
    note: 'Tolong kirim yang segar ya, terima kasih',
    timeline: [
      { status: 'Dibuat', timestamp: '2025-01-20 14:30', completed: true },
      { status: 'Dibayar', timestamp: '2025-01-20 14:35', completed: true },
      { status: 'Diproses', timestamp: orderStatus !== 'baru' ? '2025-01-20 15:00' : null, completed: orderStatus !== 'baru' },
      { status: 'Dikirim', timestamp: null, completed: false },
      { status: 'Selesai', timestamp: null, completed: false }
    ],
    resi: generatedResi
  };

  const handlePrepareOrder = () => {
    setOrderStatus('diproses');
    toast.success('Pesanan diperbarui: Sedang Diproses');
  };

  const generateResi = () => {
    if (!resiForm.courier || !resiForm.weight) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    const courierCodes = { Ninja: 'NJX', SiCepat: 'SCP', JNE: 'JNE' };
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const resiNumber = `NNS-${randomNum}-${courierCodes[resiForm.courier]}`;
    
    const today = new Date();
    const etaDays = Math.floor(2 + Math.random() * 4);
    const etaDate = new Date(today);
    etaDate.setDate(today.getDate() + etaDays);

    setGeneratedResi({
      courier: resiForm.courier,
      resi: resiNumber,
      eta: etaDate.toISOString().split('T')[0]
    });

    setOrderStatus('dikirim');
    toast.success('Resi berhasil dibuat dan pesanan diperbarui');
    setShowResiDialog(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      baru: 'bg-blue-100 text-blue-700',
      diproses: 'bg-yellow-100 text-yellow-700',
      dikirim: 'bg-purple-100 text-purple-700',
      selesai: 'bg-green-100 text-green-700'
    };
    return colors[status] || colors.baru;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-16 md:top-16 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 h-14">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-lg">Detail Pesanan</h1>
              <p className="text-xs text-gray-500">{order.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Order Header */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{order.id}</h2>
                  <Badge className={getStatusColor(orderStatus)}>
                    {orderStatus === 'baru' ? 'Baru' : orderStatus === 'diproses' ? 'Diproses' : orderStatus === 'dikirim' ? 'Dikirim' : 'Selesai'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Dipesan pada {new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="flex gap-2">
                {orderStatus === 'baru' && (
                  <Button onClick={handlePrepareOrder} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                    <Package className="w-4 h-4 mr-2" />
                    Siapkan Pesanan
                  </Button>
                )}
                {orderStatus === 'diproses' && !generatedResi && (
                  <Button onClick={() => setShowResiDialog(true)} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                    <Truck className="w-4 h-4 mr-2" />
                    Buat Resi
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resi Info (if exists) */}
        {generatedResi && (
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-2">Nomor Resi: {generatedResi.resi}</h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-green-700">Kurir:</span>
                      <span className="font-medium text-green-900 ml-2">{generatedResi.courier}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Estimasi Tiba:</span>
                      <span className="font-medium text-green-900 ml-2">
                        {new Date(generatedResi.eta).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Resi Callout */}
        {orderStatus === 'diproses' && !generatedResi && (
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 mb-1">Belum ada resi</h3>
                  <p className="text-sm text-yellow-700 mb-3">Buat resi pengiriman untuk melanjutkan pesanan ini</p>
                  <Button size="sm" onClick={() => setShowResiDialog(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    Buat Resi Sekarang
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Shipping Info */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Pelanggan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Nama</div>
                    <div className="font-medium text-gray-900">{order.customer.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Telepon</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {order.customer.phone}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {order.customer.email}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Alamat Pengiriman</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{order.shippingAddress.recipient}</div>
                    <div className="text-sm text-gray-600">{order.shippingAddress.phone}</div>
                    <div className="text-sm text-gray-600">{order.shippingAddress.address}</div>
                    <div className="text-sm text-gray-600">{order.shippingAddress.city}</div>
                  </div>
                </div>

                {order.note && (
                  <>
                    <Separator />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Catatan Pembeli</div>
                      <div className="text-sm text-gray-900 italic">"{order.note}"</div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-gray-300" />
                          )}
                        </div>
                        {idx < order.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${item.completed ? 'bg-green-200' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                          {item.status}
                        </div>
                        {item.timestamp && (
                          <div className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString('id-ID', { 
                              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Items */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>Item Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 flex-shrink-0">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        ratio="1:1"
                        priority="high"
                        className=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 mb-1">{item.name}</div>
                      <div className="text-xs text-gray-600">
                        {item.quantity}x @ Rp {item.price.toLocaleString('id-ID')}
                      </div>
                      <div className="font-medium text-sm text-gray-900 mt-1">
                        Rp {item.subtotal.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">Rp {order.summary.subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ongkir</span>
                  <span className="text-gray-900">Rp {order.summary.shipping.toLocaleString('id-ID')}</span>
                </div>
                {order.summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Diskon</span>
                    <span className="text-green-600">-Rp {order.summary.discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">Rp {order.summary.total.toLocaleString('id-ID')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Resi Dialog */}
      <Dialog open={showResiDialog} onOpenChange={setShowResiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Resi Pengiriman</DialogTitle>
            <DialogDescription>
              Masukkan detail pengiriman untuk membuat nomor resi
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div>
              <Label>Order ID</Label>
              <Input value={order.id} disabled />
            </div>

            <div>
              <Label htmlFor="courier">
                Pilih Kurir <span className="text-red-500">*</span>
              </Label>
              <Select
                value={resiForm.courier}
                onValueChange={(value) => setResiForm({...resiForm, courier: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kurir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ninja">Ninja Express</SelectItem>
                  <SelectItem value="SiCepat">SiCepat</SelectItem>
                  <SelectItem value="JNE">JNE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="weight">
                Berat (gram) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="1000"
                value={resiForm.weight}
                onChange={(e) => setResiForm({...resiForm, weight: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowResiDialog(false)}>
                Batal
              </Button>
              <Button onClick={generateResi} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                Generate Resi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
