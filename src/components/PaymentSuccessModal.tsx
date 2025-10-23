import { CheckCircle, XCircle, ArrowRight, Home } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { formatPrice } from '../lib/services/customerJourney';
import { motion } from 'motion/react';

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
  status: 'success' | 'failed';
  orderId?: string;
  total?: number;
  paymentMethod?: string;
  onViewShipping?: () => void;
  onBackToHome?: () => void;
}

export function PaymentSuccessModal({
  open,
  onClose,
  status = 'success',
  orderId,
  total,
  paymentMethod,
  onViewShipping,
  onBackToHome
}: PaymentSuccessModalProps) {
  
  const handleViewShipping = () => {
    onViewShipping?.();
    onClose();
  };

  const handleBackToHome = () => {
    onBackToHome?.();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
            >
              {status === 'success' ? (
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
              )}
            </motion.div>
          </div>

          <DialogTitle className="text-2xl">
            {status === 'success' ? 'Pembayaran Berhasil!' : 'Pembayaran Gagal'}
          </DialogTitle>
          
          <DialogDescription className="text-base">
            {status === 'success' 
              ? 'Terima kasih! Pesanan Anda sedang diproses dan akan segera dikirim.'
              : 'Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi.'}
          </DialogDescription>
        </DialogHeader>

        {status === 'success' && orderId && total && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mt-4 glass-card border border-[--border-default]">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[--text-secondary]">No. Pesanan</span>
                  <span className="font-semibold text-[--text-primary]">{orderId}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[--text-secondary]">Total Pembayaran</span>
                  <span className="font-bold text-lg text-[--brand-default]">
                    {formatPrice(total)}
                  </span>
                </div>
                
                {paymentMethod && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[--text-secondary]">Metode Pembayaran</span>
                    <span className="text-sm font-medium text-[--text-primary]">{paymentMethod}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="flex flex-col gap-3 mt-6">
          {status === 'success' ? (
            <>
              <Button
                onClick={handleViewShipping}
                className="w-full bg-[--brand-default] hover:bg-[--brand-hover] text-[--on-brand]"
                size="lg"
              >
                Lihat Status Pengiriman
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onClose}
                className="w-full bg-[--brand-default] hover:bg-[--brand-hover] text-[--on-brand]"
                size="lg"
              >
                Coba Lagi
              </Button>
              
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Kembali ke Beranda
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
