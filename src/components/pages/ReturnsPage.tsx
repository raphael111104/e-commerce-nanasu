import { useState } from 'react';
import { ArrowLeft, Package, CheckCircle, Upload, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { Order, Return, ReturnItem } from '../../lib/services/ecommerceState';

interface ReturnsPageProps {
  order?: Order;
  returns?: Return[];
  mode?: 'create' | 'list' | 'detail';
  selectedReturn?: Return;
  onBack: () => void;
  onSubmitReturn?: (returnData: any) => void;
  onViewReturn?: (returnData: Return) => void;
}

export function ReturnsPage({ 
  order, 
  returns = [],
  mode = 'list',
  selectedReturn,
  onBack, 
  onSubmitReturn,
  onViewReturn
}: ReturnsPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: { selected: boolean; quantity: number } }>({});
  const [reason, setReason] = useState('');
  const [reasonDetail, setReasonDetail] = useState('');
  const [returnMethod, setReturnMethod] = useState<'pickup' | 'dropoff'>('pickup');
  const [photos, setPhotos] = useState<string[]>([]);

  // CREATE MODE - Return Wizard
  if (mode === 'create' && order) {
    const handleItemToggle = (itemId: string) => {
      setSelectedItems(prev => ({
        ...prev,
        [itemId]: {
          selected: !prev[itemId]?.selected,
          quantity: prev[itemId]?.quantity || 1
        }
      }));
    };

    const handleQuantityChange = (itemId: string, quantity: number) => {
      setSelectedItems(prev => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: Math.max(1, Math.min(quantity, getItemMaxQty(itemId)))
        }
      }));
    };

    const getItemMaxQty = (itemId: string) => {
      const item = order.items.find(i => i.id === itemId);
      return item?.quantity || 1;
    };

    const getSelectedItemsCount = () => {
      return Object.values(selectedItems).filter(item => item.selected).length;
    };

    const canProceedStep1 = () => {
      return getSelectedItemsCount() > 0;
    };

    const canProceedStep2 = () => {
      return reason !== '';
    };

    const handleSubmit = () => {
      const returnItems: ReturnItem[] = order.items
        .filter(item => selectedItems[item.id]?.selected)
        .map(item => ({
          productId: item.id,
          name: item.name,
          variant: item.variant,
          quantity: selectedItems[item.id]?.quantity || 1,
          price: item.price,
          image: item.image
        }));

      const refundAmount = returnItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );

      const returnData = {
        orderId: order.id,
        items: returnItems,
        reason,
        reasonDetail,
        photos,
        returnMethod,
        refundMethod: order.paymentMethod,
        refundAmount,
        address: order.address
      };

      onSubmitReturn?.(returnData);
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <h1 className="text-2xl text-gray-900 mb-2">Ajukan Retur</h1>
        <p className="text-sm text-gray-600 mb-6">Order ID: {order.id}</p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step <= currentStep
                      ? 'bg-[#FACC15] text-[#1F2937]'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{step}</span>
                  )}
                </div>
                <p className="text-xs mt-2 text-center">
                  {step === 1 && 'Pilih Item'}
                  {step === 2 && 'Alasan Retur'}
                  {step === 3 && 'Metode Retur'}
                </p>
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 ${
                    step < currentStep ? 'bg-[#FACC15]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Items */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Pilih Item yang Akan Diretur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-4 p-4 border rounded-lg ${
                    selectedItems[item.id]?.selected ? 'border-[#FACC15] bg-[#FACC15]/5' : ''
                  }`}
                >
                  <Checkbox
                    checked={selectedItems[item.id]?.selected || false}
                    onCheckedChange={() => handleItemToggle(item.id)}
                    className="mt-1"
                  />
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
                    <p className="text-sm font-medium">
                      Rp {item.price.toLocaleString('id-ID')} × {item.quantity}
                    </p>
                    
                    {selectedItems[item.id]?.selected && (
                      <div className="mt-3">
                        <Label className="text-sm text-gray-600 mb-2 block">
                          Jumlah yang diretur:
                        </Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                (selectedItems[item.id]?.quantity || 1) - 1
                              )
                            }
                            disabled={(selectedItems[item.id]?.quantity || 1) <= 1}
                          >
                            -
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {selectedItems[item.id]?.quantity || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                (selectedItems[item.id]?.quantity || 1) + 1
                              )
                            }
                            disabled={
                              (selectedItems[item.id]?.quantity || 1) >= item.quantity
                            }
                          >
                            +
                          </Button>
                          <span className="text-sm text-gray-600 ml-2">
                            (Maks: {item.quantity})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedStep1()}
                  className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
                >
                  Lanjutkan ({getSelectedItemsCount()} item dipilih)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Return Reason */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Alasan Retur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">Pilih Alasan *</Label>
                <RadioGroup value={reason} onValueChange={setReason}>
                  <div className="space-y-2">
                    {[
                      'Produk rusak',
                      'Salah kirim',
                      'Produk tidak sesuai deskripsi',
                      'Kualitas tidak memuaskan',
                      'Lainnya'
                    ].map((r) => (
                      <div key={r} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value={r} id={r} />
                        <Label htmlFor={r} className="flex-1 cursor-pointer">
                          {r}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {reason && (
                <div>
                  <Label htmlFor="detail" className="mb-2 block">
                    Detail Alasan (Opsional)
                  </Label>
                  <Textarea
                    id="detail"
                    placeholder="Jelaskan lebih detail kondisi produk atau masalah yang Anda alami..."
                    value={reasonDetail}
                    onChange={(e) => setReasonDetail(e.target.value)}
                    rows={4}
                  />
                </div>
              )}

              <div>
                <Label className="mb-2 block">Lampiran Foto (Opsional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1">
                    Klik untuk upload foto produk
                  </p>
                  <p className="text-xs text-gray-500">
                    Max 5 foto, format JPG/PNG, maks 5MB per foto
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Pilih Foto
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  Kembali
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedStep2()}
                  className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
                >
                  Lanjutkan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Return Method */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Metode Pengembalian</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={returnMethod} onValueChange={(v) => setReturnMethod(v as 'pickup' | 'dropoff')}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="pickup" className="cursor-pointer">
                          <div className="font-medium mb-1">Pick-up Kurir</div>
                          <p className="text-sm text-gray-600">
                            Kurir akan mengambil barang di alamat pengiriman Anda
                          </p>
                          {returnMethod === 'pickup' && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-gray-600" />
                                <div className="text-sm">
                                  <p className="font-medium">{order.address.name}</p>
                                  <p className="text-gray-600">{order.address.phone}</p>
                                  <p className="text-gray-600">{order.address.address}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="dropoff" id="dropoff" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="dropoff" className="cursor-pointer">
                          <div className="font-medium mb-1">Drop-off</div>
                          <p className="text-sm text-gray-600">
                            Antar sendiri ke konter terdekat
                          </p>
                          {returnMethod === 'dropoff' && (
                            <div className="mt-3 space-y-2">
                              <p className="text-sm font-medium">Konter Terdekat:</p>
                              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                                <p className="font-medium">NANASU Store Purwakarta</p>
                                <p className="text-gray-600">Jl. Veteran No. 45, Purwakarta</p>
                                <p className="text-gray-600">Buka: Senin-Sabtu, 09:00-17:00</p>
                              </div>
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#16A34A]" />
                  Metode Refund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Dana akan dikembalikan ke:</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Estimasi: 2-5 hari kerja setelah barang diterima dan diverifikasi
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Retur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items
                  .filter(item => selectedItems[item.id]?.selected)
                  .map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {selectedItems[item.id]?.quantity}
                      </span>
                      <span className="font-medium">
                        Rp {(item.price * (selectedItems[item.id]?.quantity || 1)).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total Refund</span>
                  <span className="text-[#16A34A]">
                    Rp{' '}
                    {order.items
                      .filter(item => selectedItems[item.id]?.selected)
                      .reduce((sum, item) => sum + (item.price * (selectedItems[item.id]?.quantity || 1)), 0)
                      .toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <div className="flex gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      Pastikan produk dalam kondisi baik dan kemasan asli untuk mempercepat proses verifikasi.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="flex-1"
              >
                Kembali
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
              >
                Ajukan Retur
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DETAIL MODE - View Return Details
  if (mode === 'detail' && selectedReturn) {
    const getStatusBadge = (status: string) => {
      const statusConfig = {
        'pending_pickup': { label: 'Menunggu Pengambilan', color: 'bg-orange-100 text-orange-700' },
        'picked_up': { label: 'Sudah Diambil', color: 'bg-blue-100 text-blue-700' },
        'received': { label: 'Diterima di Gudang', color: 'bg-purple-100 text-purple-700' },
        'inspecting': { label: 'Sedang Diperiksa', color: 'bg-yellow-100 text-yellow-700' },
        'approved': { label: 'Disetujui', color: 'bg-green-100 text-green-700' },
        'rejected': { label: 'Ditolak', color: 'bg-red-100 text-red-700' },
        'refund_processing': { label: 'Refund Diproses', color: 'bg-blue-100 text-blue-700' },
        'refund_completed': { label: 'Refund Selesai', color: 'bg-green-100 text-green-700' }
      };
      
      const config = statusConfig[status] || statusConfig.pending_pickup;
      return (
        <Badge className={`${config.color} border-0`}>
          {config.label}
        </Badge>
      );
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl text-gray-900 mb-1">{selectedReturn.id}</h1>
            <p className="text-sm text-gray-600">Order ID: {selectedReturn.orderId}</p>
            <p className="text-sm text-gray-600">{selectedReturn.date}</p>
          </div>
          {getStatusBadge(selectedReturn.status)}
        </div>

        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status Retur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedReturn.timeline.map((step, index) => (
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
                      {index < selectedReturn.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            step.completed ? 'bg-[#16A34A]' : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">{step.step}</p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {step.time && step.time !== '-' && (
                        <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Item Diretur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedReturn.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    {item.variant && (
                      <p className="text-sm text-gray-600">Varian: {item.variant}</p>
                    )}
                    <div className="flex justify-between mt-2">
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

          {/* Reason */}
          <Card>
            <CardHeader>
              <CardTitle>Alasan Retur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">{selectedReturn.reason}</p>
              {selectedReturn.reasonDetail && (
                <p className="text-sm text-gray-600">{selectedReturn.reasonDetail}</p>
              )}
            </CardContent>
          </Card>

          {/* Refund Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Refund</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Metode Refund</span>
                <span className="font-medium">{selectedReturn.refundMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah Refund</span>
                <span className="font-medium text-[#16A34A]">
                  Rp {selectedReturn.refundAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  {selectedReturn.estimatedRefund}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // LIST MODE - View All Returns
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl text-gray-900 mb-6">Retur Saya</h1>

      {returns.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-xl text-gray-900 mb-2">Belum Ada Retur</h2>
          <p className="text-gray-500 mb-6">
            Retur yang Anda ajukan akan muncul di sini
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((ret) => (
            <Card key={ret.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onViewReturn?.(ret)}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{ret.id}</h3>
                    <p className="text-sm text-gray-600">Order: {ret.orderId}</p>
                    <p className="text-sm text-gray-600">{ret.date}</p>
                  </div>
                  <Badge className={
                    ret.status === 'refund_completed' 
                      ? 'bg-green-100 text-green-700 border-0'
                      : ret.status === 'rejected'
                      ? 'bg-red-100 text-red-700 border-0'
                      : 'bg-orange-100 text-orange-700 border-0'
                  }>
                    {ret.status === 'pending_pickup' && 'Menunggu Pengambilan'}
                    {ret.status === 'inspecting' && 'Sedang Diperiksa'}
                    {ret.status === 'approved' && 'Disetujui'}
                    {ret.status === 'refund_completed' && 'Refund Selesai'}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {ret.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="text-gray-900">{item.name}</span>
                      <span className="text-gray-600"> × {item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-sm text-gray-600">Total Refund</span>
                  <span className="font-medium text-[#16A34A]">
                    Rp {ret.refundAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
