import { useState } from 'react';
import { ArrowLeft, Package, MapPin, Truck, CreditCard, Copy, Check, Phone, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { Order } from '../../lib/services/ecommerceState';

interface OrderDetailPageProps {
  order: Order;
  onBack: () => void;
  onReturnOrder?: (order: Order) => void;
  onCopyResi?: (resi: string) => void;
  onCopyOrderId?: (orderId: string) => void;
}

export function OrderDetailPage({ 
  order, 
  onBack, 
  onReturnOrder,
  onCopyResi,
  onCopyOrderId
}: OrderDetailPageProps) {
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [copiedResi, setCopiedResi] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedOrderId(true);
    onCopyOrderId?.(order.id);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const handleCopyResi = () => {
    if (order.resi) {
      navigator.clipboard.writeText(order.resi);
      setCopiedResi(true);
      onCopyResi?.(order.resi);
      setTimeout(() => setCopiedResi(false), 2000);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'diproses': { label: 'Diproses', color: 'bg-blue-100 text-blue-700' },
      'dikirim': { label: 'Dikirim', color: 'bg-purple-100 text-purple-700' },
      'selesai': { label: 'Selesai', color: 'bg-green-100 text-green-700' },
      'dibatalkan': { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
      'retur': { label: 'Retur', color: 'bg-orange-100 text-orange-700' }
    };
    
    const config = statusConfig[status] || statusConfig.diproses;
    return (
      <Badge className={`${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali
      </Button>

      {/* Order ID & Status */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl text-gray-900">{order.id}</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyOrderId}
              className="h-8 px-2"
            >
              {copiedOrderId ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-500">{order.date}</p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <div className="space-y-6">
        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#16A34A]" />
              Status Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        step.completed
                          ? 'bg-[#16A34A]'
                          : step.current
                          ? 'bg-[#FACC15] ring-4 ring-[#FACC15]/20'
                          : 'bg-gray-300'
                      }`}
                    />
                    {index < order.timeline.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.completed ? 'bg-[#16A34A]' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`font-medium ${step.current ? 'text-[#1F2937]' : 'text-gray-900'}`}>
                      {step.step}
                    </p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {step.time && step.time !== '-' && (
                      <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                    )}
                    {step.resi && (
                      <p className="text-xs text-gray-500 mt-1">Resi: {step.resi}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Info */}
        {order.resi && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#16A34A]" />
                Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nomor Resi</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono">
                    {order.resi}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyResi}
                  >
                    {copiedResi ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-green-600" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Salin
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Metode Pengiriman</p>
                  <p className="font-medium">{order.shippingMethod}</p>
                </div>
                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-gray-600">Estimasi Tiba</p>
                    <p className="font-medium">{order.estimatedDelivery}</p>
                  </div>
                )}
                {order.deliveredDate && (
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Diterima</p>
                    <p className="font-medium text-green-600">{order.deliveredDate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#16A34A]" />
              Alamat Pengiriman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{order.address.label}</span>
                  {order.address.isMain && (
                    <Badge variant="secondary" className="text-xs">
                      Utama
                    </Badge>
                  )}
                </div>
                <p className="font-medium">{order.address.name}</p>
                <p className="text-sm text-gray-600">{order.address.phone}</p>
                <p className="text-sm text-gray-600 mt-1">{order.address.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Produk Dipesan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                  {item.variant && (
                    <p className="text-sm text-gray-600 mb-2">Varian: {item.variant}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                    <span className="font-medium">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#16A34A]" />
              Ringkasan Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal Produk</span>
              <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ongkos Kirim</span>
              <span>Rp {order.shippingFee.toLocaleString('id-ID')}</span>
            </div>
            
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Diskon {order.voucher ? `(${order.voucher})` : ''}</span>
                <span>-Rp {order.discount.toLocaleString('id-ID')}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-medium text-lg">
              <span>Total Pembayaran</span>
              <span className="text-[#1F2937]">Rp {order.total.toLocaleString('id-ID')}</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Metode Pembayaran:</span> {order.paymentMethod}
              </p>
              <p className="text-sm text-green-600 mt-1">
                ✓ Pembayaran {order.paymentStatus === 'success' ? 'Berhasil' : 'Pending'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {order.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Catatan Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {order.resi && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(`https://cekresi.com/?noresi=${order.resi}`, '_blank')}
            >
              <Truck className="w-4 h-4 mr-2" />
              Lacak Paket
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => alert('CS akan menghubungi Anda melalui WhatsApp')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Hubungi CS
          </Button>

          {order.canReturn && (
            <Button
              className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
              onClick={() => onReturnOrder?.(order)}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Ajukan Retur
            </Button>
          )}

          {order.status === 'selesai' && !order.canReturn && (
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">
                Batas waktu pengajuan retur telah berakhir (7 hari setelah diterima)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
