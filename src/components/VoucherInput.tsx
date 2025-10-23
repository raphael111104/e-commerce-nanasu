import { useState } from 'react';
import { Tag, X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

/**
 * Voucher Input Component
 * 
 * Features:
 * - Apply/Remove voucher
 * - Validation states (valid/invalid/expired)
 * - Loading state during validation
 * - Error messages
 * - Success feedback
 * - Discount calculation preview
 * 
 * Props:
 * - onApply: (code: string) => Promise<{success: boolean, data?: any, error?: string}>
 * - onRemove: () => void
 * - appliedVoucher?: {code: string, discount: number}
 * - cartTotal: number
 */

interface AppliedVoucher {
  code: string;
  title?: string;
  discountType: 'percentage' | 'fixed' | 'shipping';
  discountValue: number;
  maxDiscount?: number;
}

interface VoucherInputProps {
  onApply: (code: string) => Promise<{success: boolean; data?: any; error?: string}>;
  onRemove: () => void;
  appliedVoucher?: AppliedVoucher | null;
  cartTotal: number;
}

export function VoucherInput({ 
  onApply, 
  onRemove, 
  appliedVoucher,
  cartTotal
}: VoucherInputProps) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Masukkan kode voucher');
      return;
    }

    setError(null);
    setIsValidating(true);

    try {
      const result = await onApply(code.trim().toUpperCase());
      
      if (result.success) {
        toast.success('Voucher berhasil diterapkan!', {
          description: `Kode: ${code.toUpperCase()}`
        });
        setCode('');
      } else {
        setError(result.error || 'Kode voucher tidak valid');
        toast.error('Voucher tidak valid', {
          description: result.error
        });
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
      toast.error('Gagal menerapkan voucher');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    toast.info('Voucher dihapus');
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;

    if (appliedVoucher.discountType === 'percentage') {
      const discount = (cartTotal * appliedVoucher.discountValue) / 100;
      return appliedVoucher.maxDiscount 
        ? Math.min(discount, appliedVoucher.maxDiscount)
        : discount;
    }
    
    if (appliedVoucher.discountType === 'fixed') {
      return appliedVoucher.discountValue;
    }

    return 0; // shipping voucher calculated separately
  };

  const discountAmount = calculateDiscount();

  return (
    <div className="space-y-3">
      {/* Applied Voucher */}
      {appliedVoucher ? (
        <Card className="border-[#16A34A] bg-[#16A34A]/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#16A34A]/10 flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-[#16A34A]" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {appliedVoucher.code}
                      </span>
                      <Badge className="bg-[#16A34A] hover:bg-[#16A34A] text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Aktif
                      </Badge>
                    </div>
                    {appliedVoucher.title && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        {appliedVoucher.title}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600"
                    aria-label="Remove voucher"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {appliedVoucher.discountType !== 'shipping' && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#16A34A]/20">
                    <span className="text-xs text-gray-600">Hemat</span>
                    <span className="font-medium text-[#16A34A]">
                      - Rp {discountAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Voucher Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Masukkan kode voucher"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleApply();
                  }
                }}
                className={`pl-10 uppercase ${error ? 'border-red-500' : ''}`}
                disabled={isValidating}
              />
            </div>
            
            <Button
              onClick={handleApply}
              disabled={!code.trim() || isValidating}
              className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] min-w-[80px]"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  <span className="hidden sm:inline">Cek...</span>
                </>
              ) : (
                'Pakai'
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

/**
 * Voucher Card Component
 * Display voucher in list/grid
 */

interface VoucherCardProps {
  voucher: {
    id: string;
    code: string;
    title: string;
    description?: string;
    discountType: 'percentage' | 'fixed' | 'shipping';
    discountValue: number;
    minPurchase?: number;
    maxDiscount?: number;
    validUntil: string;
    stock?: number;
    used?: number;
    status: 'active' | 'expired' | 'used';
    terms?: string[];
  };
  onClaim?: (voucherId: string) => void;
  onCopy?: (code: string) => void;
  compact?: boolean;
}

export function VoucherCard({ voucher, onClaim, onCopy, compact = false }: VoucherCardProps) {
  const isExpired = voucher.status === 'expired';
  const isUsed = voucher.status === 'used';
  const isAvailable = voucher.status === 'active';

  const formatDiscount = () => {
    if (voucher.discountType === 'percentage') {
      return `${voucher.discountValue}%`;
    }
    if (voucher.discountType === 'fixed') {
      return `Rp ${voucher.discountValue.toLocaleString('id-ID')}`;
    }
    return 'Gratis Ongkir';
  };

  const formatExpiry = () => {
    const date = new Date(voucher.validUntil);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(voucher.code);
    toast.success('Kode voucher disalin!', {
      description: voucher.code
    });
    onCopy?.(voucher.code);
  };

  if (compact) {
    return (
      <div className={`
        border-2 rounded-lg p-3 flex items-center gap-3
        ${isAvailable ? 'border-[#FACC15] bg-[#FACC15]/5' : 'border-gray-200 bg-gray-50 opacity-60'}
      `}>
        <div className="w-12 h-12 rounded-lg bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
          <Tag className="w-6 h-6 text-[#FACC15]" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-medium text-sm">{formatDiscount()}</span>
            {!isAvailable && (
              <Badge variant="secondary" className="text-xs">
                {isExpired ? 'Kedaluwarsa' : 'Terpakai'}
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-600 truncate">{voucher.title}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!isAvailable}
          className="h-8"
        >
          Salin
        </Button>
      </div>
    );
  }

  return (
    <Card className={`
      border-2 transition-all hover:shadow-md
      ${isAvailable ? 'border-[#FACC15]' : 'border-gray-200 opacity-60'}
    `}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Left: Discount Badge */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FACC15] to-[#16A34A] flex flex-col items-center justify-center text-white">
              <span className="text-lg font-bold">{formatDiscount()}</span>
              <span className="text-[10px] uppercase">OFF</span>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1">{voucher.title}</h4>
            
            {voucher.description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {voucher.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {voucher.minPurchase && (
                <Badge variant="outline" className="text-xs">
                  Min. Rp {voucher.minPurchase.toLocaleString('id-ID')}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                s/d {formatExpiry()}
              </Badge>
              {voucher.stock && voucher.used && (
                <Badge variant="outline" className="text-xs">
                  {voucher.stock - voucher.used} tersisa
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <code className="flex-1 px-2 py-1 bg-gray-100 rounded text-xs font-mono border border-dashed border-gray-300">
                {voucher.code}
              </code>
              
              {isAvailable ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 text-xs"
                  >
                    Salin
                  </Button>
                  {onClaim && (
                    <Button
                      size="sm"
                      onClick={() => onClaim(voucher.id)}
                      className="h-7 bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937] text-xs"
                    >
                      Pakai
                    </Button>
                  )}
                </>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  {isExpired ? 'Kedaluwarsa' : 'Terpakai'}
                </Badge>
              )}
            </div>

            {voucher.terms && voucher.terms.length > 0 && (
              <details className="mt-3 text-xs">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                  Syarat & Ketentuan
                </summary>
                <ul className="mt-2 space-y-1 text-gray-600 list-disc list-inside">
                  {voucher.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
