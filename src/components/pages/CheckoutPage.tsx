import { useState } from 'react';
import { ArrowLeft, MapPin, Truck, CreditCard, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { LazyImage } from '../performance/LazyImage';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isMain?: boolean;
}

interface CheckoutPageProps {
  cartItems: any[];
  onBack: () => void;
  onPaymentSuccess?: () => void;
  selectedShipping?: string;
  onShippingChange?: (value: string) => void;
  selectedPayment?: string;
  onPaymentChange?: (value: string) => void;
  addresses?: Address[];
  selectedAddress?: Address;
  onAddressChange?: (address: Address) => void;
  onAddAddress?: (address: Omit<Address, 'id'>) => void;
  appliedVoucher?: string;
  voucherDiscount?: number;
}

export function CheckoutPage({ 
  cartItems, 
  onBack,
  onPaymentSuccess,
  selectedShipping: externalShipping,
  onShippingChange,
  selectedPayment: externalPayment,
  onPaymentChange,
  addresses: propsAddresses,
  selectedAddress: propsSelectedAddress,
  onAddressChange,
  onAddAddress,
  appliedVoucher = '',
  voucherDiscount = 0
}: CheckoutPageProps) {
  const defaultAddresses = [
    {
      id: 'main',
      label: 'Rumah',
      name: 'John Doe',
      phone: '081234567890',
      address: 'Jl. Merdeka No. 123, Kel. Menteng, Kec. Menteng, Jakarta Pusat 10310',
      isMain: true
    },
    {
      id: 'office',
      label: 'Kantor',
      name: 'John Doe',
      phone: '081234567890',
      address: 'Jl. Sudirman No. 456, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan 12190',
      isMain: false
    }
  ];

  const addresses = propsAddresses || defaultAddresses;
  const [selectedAddressId, setSelectedAddressId] = useState(propsSelectedAddress?.id || addresses[0]?.id);
  const [selectedShipping, setSelectedShipping] = useState(externalShipping || 'regular');
  const [selectedPayment, setSelectedPayment] = useState(externalPayment || 'gopay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const handleAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId);
    const address = addresses.find(a => a.id === addressId);
    if (address && onAddressChange) {
      onAddressChange(address);
    }
  };

  const handleShippingChange = (value: string) => {
    setSelectedShipping(value);
    onShippingChange?.(value === 'regular' ? 'REG' : 'EXP');
  };

  const handlePaymentChange = (value: string) => {
    setSelectedPayment(value);
    const paymentMap = {
      'gopay': 'WALLET',
      'ovo': 'WALLET',
      'dana': 'WALLET',
      'bni': 'VA_BNI',
      'mandiri': 'VA_BNI',
      'bca': 'VA_BNI',
      'card': 'CARD'
    };
    onPaymentChange?.(paymentMap[value] || 'WALLET');
  };



  const shippingOptions = [
    {
      id: 'regular',
      name: 'Reguler',
      description: '2-3 hari kerja',
      price: 12000,
      estimatedDays: '2-3'
    },
    {
      id: 'kilat',
      name: 'Kilat',
      description: '1-2 hari kerja',
      price: 22000,
      estimatedDays: '1-2'
    },
    {
      id: 'po',
      name: 'PO (Pre-Order)',
      description: 'Estimasi kirim 24 Okt 2025',
      price: 0,
      estimatedDays: 'H+3'
    }
  ];

  const paymentMethods = [
    {
      id: 'gopay',
      name: 'GoPay',
      description: 'Bayar dengan saldo GoPay',
      icon: '💚',
      type: 'ewallet'
    },
    {
      id: 'ovo',
      name: 'OVO',
      description: 'Bayar dengan saldo OVO',
      icon: '💜',
      type: 'ewallet'
    },
    {
      id: 'dana',
      name: 'DANA',
      description: 'Bayar dengan saldo DANA',
      icon: '💙',
      type: 'ewallet'
    },
    {
      id: 'qris',
      name: 'QRIS',
      description: 'Scan QR dengan aplikasi apapun',
      icon: '📱',
      type: 'qris'
    },
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      description: 'BCA, Mandiri, BNI, BRI',
      icon: '🏦',
      type: 'bank'
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const selectedShippingCost = shippingOptions.find(s => s.id === selectedShipping)?.price || 0;
  const freeShippingThreshold = 100000;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : selectedShippingCost;
  const discount = voucherDiscount;
  const total = subtotal + shippingCost - discount;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      if (onPaymentSuccess) {
        onPaymentSuccess();
      } else {
        alert('Pesanan berhasil dibuat! Silakan lakukan pembayaran.');
      }
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Kembali ke Keranjang
      </Button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#16A34A]" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAddressId} onValueChange={handleAddressChange}>
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-start space-x-3 p-3 border rounded-lg mb-3">
                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={address.id} className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{address.label}</span>
                          {address.isMain && (
                            <span className="text-xs bg-[#FACC15] text-[#1F2937] px-2 py-0.5 rounded">
                              Utama
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">{address.name} | {address.phone}</p>
                          <p>{address.address}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => setShowAddAddressModal(true)}
              >
                Tambah Alamat Baru
              </Button>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#16A34A]" />
                Metode Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedShipping} onValueChange={handleShippingChange}>
                {shippingOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer">
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                          <p className="text-xs text-gray-500">Estimasi: {option.estimatedDays} hari</p>
                        </div>
                      </Label>
                    </div>
                    <div className="text-right">
                      {subtotal >= freeShippingThreshold ? (
                        <span className="text-[#16A34A] font-medium">GRATIS</span>
                      ) : (
                        <span className="font-medium">Rp {option.price.toLocaleString('id-ID')}</span>
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#16A34A]" />
                Metode Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPayment} onValueChange={handlePaymentChange}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <Label htmlFor={method.id} className="cursor-pointer">
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.cartId || item.id} className="flex gap-3">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      {item.variant && (
                        <p className="text-xs text-gray-500">{item.variant.label}</p>
                      )}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">x{item.quantity}</span>
                        <span className="text-sm font-medium">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} item)</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Ongkos Kirim</span>
                  <div className="text-right">
                    {shippingCost === 0 ? (
                      <span className="text-[#16A34A] font-medium">GRATIS</span>
                    ) : (
                      <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                    )}
                  </div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-[#16A34A]">
                    <span>Diskon {appliedVoucher ? `(${appliedVoucher})` : ''}</span>
                    <span>-Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#1F2937]">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Free Shipping Info */}
              {subtotal < freeShippingThreshold && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    💡 Belanja Rp {(freeShippingThreshold - subtotal).toLocaleString('id-ID')} lagi untuk gratis ongkir!
                  </p>
                </div>
              )}

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] font-medium"
                size="lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#1F2937]/20 border-t-[#1F2937] rounded-full animate-spin" />
                    Memproses...
                  </div>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Bayar Sekarang
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Dengan melanjutkan, Anda menyetujui syarat dan ketentuan NANASU
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}