import { useState } from 'react';
import { ArrowLeft, Package, MapPin, Truck, Phone, Copy, Check, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import type { OrderExample, TrackingStep, Address } from '../../lib/services/customerJourney';
import { formatPrice } from '../../lib/services/customerJourney';

interface ShippingStatusPageProps {
  order: OrderExample;
  trackingSteps: TrackingStep[];
  shippingAddress: Address;
  onBack: () => void;
}

export function ShippingStatusPage({
  order,
  trackingSteps,
  shippingAddress,
  onBack
}: ShippingStatusPageProps) {
  const [copiedResi, setCopiedResi] = useState(false);

  const currentStep = trackingSteps.filter(step => step.completed).length - 1;
  const activeResi = trackingSteps.find(step => step.resi)?.resi || '';

  const handleCopyResi = () => {
    if (activeResi) {
      navigator.clipboard.writeText(activeResi);
      setCopiedResi(true);
      toast.success('Nomor resi berhasil disalin');
      setTimeout(() => setCopiedResi(false), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('selesai') || lowerStatus.includes('tiba')) {
      return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    }
    if (lowerStatus.includes('dikirim') || lowerStatus.includes('perjalanan')) {
      return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
    }
    if (lowerStatus.includes('diproses') || lowerStatus.includes('dikemas')) {
      return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
    }
    return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
  };

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
            <h1 className="font-semibold text-[--text-primary]">Status Pengiriman</h1>
            <p className="text-xs text-[--text-secondary]">{order.orderId}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card border-[--border-default]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(trackingSteps[currentStep]?.status || '')}`}>
                  <Package className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-[--text-primary] mb-1">
                    {trackingSteps[currentStep]?.status || 'Pesanan Dibuat'}
                  </h2>
                  <p className="text-sm text-[--text-secondary]">
                    {trackingSteps[currentStep]?.description || 'Pesanan Anda sedang diproses'}
                  </p>
                  <p className="text-xs text-[--text-tertiary] mt-1">
                    {trackingSteps[currentStep]?.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resi Number */}
        {activeResi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="glass-card border-[--border-default]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[--text-secondary] mb-1">Nomor Resi</p>
                    <p className="font-mono font-semibold text-[--text-primary]">{activeResi}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyResi}
                      className="h-9"
                    >
                      {copiedResi ? (
                        <Check className="w-4 h-4 mr-1 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 mr-1" />
                      )}
                      {copiedResi ? 'Tersalin' : 'Salin'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={() => toast.info('Fitur lacak paket akan segera hadir')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Lacak
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-[--border-default]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="w-5 h-5 text-[--brand-default]" />
                Riwayat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step.completed
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          step.completed
                            ? 'bg-green-300 dark:bg-green-700'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`font-medium ${
                          step.completed ? 'text-[--text-primary]' : 'text-[--text-tertiary]'
                        }`}>
                          {step.status}
                        </h4>
                        <span className={`text-xs ${
                          step.completed ? 'text-[--text-secondary]' : 'text-[--text-tertiary]'
                        }`}>
                          {step.time}
                        </span>
                      </div>
                      {step.description && (
                        <p className="text-sm text-[--text-secondary]">{step.description}</p>
                      )}
                      {step.resi && (
                        <Badge variant="outline" className="mt-2">
                          Resi: {step.resi}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="glass-card border-[--border-default]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[--brand-default]" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[--text-primary]">{shippingAddress.recipient}</p>
                  <p className="text-sm text-[--text-secondary] flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {shippingAddress.phone}
                  </p>
                </div>
                {shippingAddress.isMain && (
                  <Badge variant="default" className="bg-[--brand-default]">Utama</Badge>
                )}
              </div>
              <Separator />
              <div className="text-sm text-[--text-secondary]">
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.city}, {shippingAddress.zip}</p>
                {shippingAddress.note && (
                  <p className="text-xs text-[--text-tertiary] mt-2">
                    Catatan: {shippingAddress.note}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-[--border-default]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="w-5 h-5 text-[--brand-default]" />
                Daftar Produk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-64">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-3 p-3 rounded-lg bg-[--bg-surface]">
                      <ImageWithFallback
                        src={item.thumb}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-[--text-primary] line-clamp-1">
                          {item.title}
                        </h4>
                        {(item.variant || item.size) && (
                          <p className="text-xs text-[--text-tertiary]">
                            {[item.variant, item.size].filter(Boolean).join(' • ')}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-[--text-secondary]">
                            x{item.quantity}
                          </span>
                          <span className="font-semibold text-sm text-[--brand-default]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[--text-secondary]">Subtotal</span>
                  <span className="text-[--text-primary]">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[--text-secondary]">Ongkos Kirim</span>
                  <span className="text-[--text-primary]">{formatPrice(order.shippingFee)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[--text-secondary]">Diskon</span>
                    <span className="text-green-600 dark:text-green-400">
                      -{formatPrice(order.discount)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span className="text-[--text-primary]">Total</span>
                  <span className="text-lg text-[--brand-default]">{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast.info('Hubungi CS: 0812-3456-7890')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Butuh Bantuan?
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
