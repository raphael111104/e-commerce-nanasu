import { useState } from 'react';
import { Trash2, Plus, Minus, Tag, ShoppingBag, Heart, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { LazyImage } from '../performance/LazyImage';

interface CartPageProps {
  items: any[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
  onMoveToWishlist?: (id: string) => void;
  onApplyVoucher?: (code: string) => void;
  onRemoveVoucher?: () => void;
  appliedVoucher?: string;
  voucherDiscount?: number;
  onContinueShopping?: () => void;
}

export function CartPage({ 
  items, 
  onUpdateQuantity, 
  onCheckout,
  onMoveToWishlist,
  onApplyVoucher,
  onRemoveVoucher,
  appliedVoucher = '',
  voucherDiscount = 0,
  onContinueShopping
}: CartPageProps) {
  const [voucherCode, setVoucherCode] = useState('');
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 100000 ? 0 : 12000;
  const discount = voucherDiscount;
  const total = subtotal + shipping - discount;

  const handleApplyVoucher = () => {
    if (voucherCode.trim() && onApplyVoucher) {
      onApplyVoucher(voucherCode.trim().toUpperCase());
      setVoucherCode('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-6">
            Belum ada produk di keranjang Anda. Yuk mulai belanja produk nanas segar dari Subang!
          </p>
          <Button 
            className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
            onClick={onContinueShopping}
          >
            Mulai Belanja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.cartId || `${item.id}-${item.variant?.id || 'default'}`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image & Product Info Section */}
                  <div className="flex gap-3 md:gap-4 flex-1">
                    <div className="flex-shrink-0 w-24 md:w-20">
                      <LazyImage
                        src={item.image}
                        alt={item.name}
                        ratio="1:1"
                        priority="high"
                        className=""
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      
                      {item.variant && (
                        <p className="text-sm text-gray-500 mb-2">
                          {item.variant.label}
                        </p>
                      )}

                      {item.badges && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.badges.slice(0, 2).map((badge, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`text-xs ${
                                badge === 'Asli Subang' 
                                  ? 'bg-[#16A34A]/10 text-[#16A34A]' 
                                  : ''
                              }`}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Mobile: Show price here */}
                      <div className="md:hidden mt-2">
                        <p className="font-bold text-gray-900">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rp {item.price.toLocaleString('id-ID')} / item
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Price on the right */}
                  <div className="hidden md:flex md:flex-col md:justify-center md:items-end md:min-w-32">
                    <p className="font-bold text-lg text-gray-900">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rp {item.price.toLocaleString('id-ID')} / item
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Actions - Always at bottom */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center sm:justify-start border rounded-lg w-full sm:w-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-10 w-12 p-0 flex-1 sm:flex-none sm:w-10"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-sm font-medium min-w-16 text-center flex-1 sm:flex-none sm:min-w-12">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity + 1)}
                      className="h-10 w-12 p-0 flex-1 sm:flex-none sm:w-10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-2">
                    {/* Move to Wishlist */}
                    {onMoveToWishlist && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMoveToWishlist(item.cartId || item.id)}
                        className="text-[#16A34A] hover:text-[#16A34A] hover:bg-[#16A34A]/10 border-[#16A34A]/20 h-10 px-4 flex-1 sm:flex-none"
                      >
                        <Heart className="w-4 h-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">Wishlist</span>
                      </Button>
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.cartId || item.id, 0)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 h-10 px-4 flex-1 sm:flex-none"
                    >
                      <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
                      <span className="sm:hidden">Hapus</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Voucher Section */}
              <div>
                {appliedVoucher ? (
                  <div className="p-3 border border-[#16A34A] rounded-lg bg-[#16A34A]/5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Tag className="w-4 h-4 text-[#16A34A]" />
                          <span className="text-sm font-medium text-[#16A34A]">{appliedVoucher}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Hemat Rp {voucherDiscount.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onRemoveVoucher}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-3">
                      <Input
                        placeholder="Kode voucher"
                        className="flex-1"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyVoucher()}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleApplyVoucher}
                        disabled={!voucherCode.trim()}
                      >
                        <Tag className="w-4 h-4 mr-1" />
                        Pakai
                      </Button>
                    </div>
                    
                    {/* Available Vouchers */}
                    <div className="space-y-2">
                      <div className="p-3 border border-dashed border-[#FACC15] rounded-lg bg-[#FACC15]/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#1F2937]">NANASU10</span>
                          <Badge className="bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15]">
                            10% OFF
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">Diskon 10% min. belanja Rp 50.000</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#16A34A] hover:text-[#16A34A] h-6 p-0 mt-1"
                          onClick={() => {
                            setVoucherCode('NANASU10');
                            if (onApplyVoucher) onApplyVoucher('NANASU10');
                          }}
                        >
                          Gunakan Voucher
                        </Button>
                      </div>
                      
                      <div className="p-3 border border-dashed border-[#FACC15] rounded-lg bg-[#FACC15]/5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#1F2937]">HEMAT5</span>
                          <Badge className="bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15]">
                            Rp 5.000
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">Potongan Rp 5.000 tanpa minimum</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#16A34A] hover:text-[#16A34A] h-6 p-0 mt-1"
                          onClick={() => {
                            setVoucherCode('HEMAT5');
                            if (onApplyVoucher) onApplyVoucher('HEMAT5');
                          }}
                        >
                          Gunakan Voucher
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} item)</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Ongkos Kirim</span>
                  <div className="text-right">
                    {shipping === 0 ? (
                      <div>
                        <span className="text-[#16A34A] font-medium">GRATIS</span>
                        <p className="text-xs text-gray-500">Min. Rp 100.000</p>
                      </div>
                    ) : (
                      <span>Rp {shipping.toLocaleString('id-ID')}</span>
                    )}
                  </div>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-[#16A34A]">
                    <span>Diskon Voucher</span>
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
              {subtotal < 100000 && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Belanja Rp {(100000 - subtotal).toLocaleString('id-ID')} lagi untuk gratis ongkir!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={onCheckout}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] font-medium"
                size="lg"
              >
                Checkout ({items.length} item)
              </Button>

              {/* Continue Shopping */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onContinueShopping}
              >
                Lanjut Belanja
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}