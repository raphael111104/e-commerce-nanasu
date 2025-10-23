import { MapPin, Home, Briefcase, Edit, Trash2, Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

/**
 * Address Card Component
 * 
 * Features:
 * - Display address details
 * - Default address badge
 * - Label icons (Home, Office, Other)
 * - Edit/Delete actions
 * - Select mode for checkout
 * - Delete confirmation dialog
 * 
 * Props:
 * - address: Address object
 * - onEdit?: (address) => void
 * - onDelete?: (addressId) => void
 * - onSelect?: (address) => void
 * - onSetDefault?: (addressId) => void
 * - mode?: 'view' | 'select' - Display mode
 * - selected?: boolean - For select mode
 */

export interface Address {
  id: string;
  label: 'Rumah' | 'Kantor' | 'Lainnya' | string;
  isDefault?: boolean;
  recipientName: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface AddressCardProps {
  address: Address;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSelect?: (address: Address) => void;
  onSetDefault?: (addressId: string) => void;
  mode?: 'view' | 'select';
  selected?: boolean;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSelect,
  onSetDefault,
  mode = 'view',
  selected = false
}: AddressCardProps) {
  
  const getLabelIcon = () => {
    switch (address.label) {
      case 'Rumah':
        return <Home className="w-4 h-4" />;
      case 'Kantor':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const formatAddress = () => {
    return `${address.street}, ${address.district}, ${address.city}, ${address.province} ${address.postalCode}`;
  };

  const handleCardClick = () => {
    if (mode === 'select' && onSelect) {
      onSelect(address);
    }
  };

  return (
    <Card 
      className={`
        transition-all
        ${mode === 'select' ? 'cursor-pointer hover:shadow-md' : ''}
        ${selected ? 'border-2 border-[#FACC15] bg-[#FACC15]/5' : 'border-2 border-transparent hover:border-gray-200'}
      `}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Selection Indicator (for select mode) */}
          {mode === 'select' && (
            <div className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
              ${selected 
                ? 'border-[#FACC15] bg-[#FACC15]' 
                : 'border-gray-300'
              }
            `}>
              {selected && <Check className="w-3 h-3 text-[#1F2937]" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {getLabelIcon()}
                  <span className="font-medium text-sm md:text-base">
                    {address.label}
                  </span>
                </div>
                
                {address.isDefault && (
                  <Badge className="bg-[#16A34A] hover:bg-[#16A34A] text-xs">
                    Utama
                  </Badge>
                )}
              </div>

              {/* Actions (view mode only) */}
              {mode === 'view' && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(address)}
                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                      aria-label="Edit address"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {onDelete && !address.isDefault && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Alamat?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Alamat "{address.label}" akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(address.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              )}
            </div>

            {/* Recipient Info */}
            <div className="space-y-1 text-sm">
              <p className="font-medium text-gray-900">
                {address.recipientName}
              </p>
              <p className="text-gray-600">
                {address.phone}
              </p>
            </div>

            {/* Address */}
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {formatAddress()}
            </p>

            {/* Notes */}
            {address.notes && (
              <p className="text-xs text-gray-500 mt-2 italic">
                Catatan: {address.notes}
              </p>
            )}

            {/* Set as Default (if not default) */}
            {mode === 'view' && !address.isDefault && onSetDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetDefault(address.id)}
                className="mt-3 h-8 text-xs"
              >
                Jadikan Alamat Utama
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Empty Address State
 */

interface EmptyAddressStateProps {
  onAdd: () => void;
}

export function EmptyAddressState({ onAdd }: EmptyAddressStateProps) {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2">
          Belum Ada Alamat
        </h3>
        <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
          Tambahkan alamat pengiriman untuk memudahkan proses checkout
        </p>
        
        <Button
          onClick={onAdd}
          className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Tambah Alamat Baru
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Address Skeleton Loader
 */

export function AddressCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <div className="w-full h-3 bg-gray-200 rounded animate-pulse" />
              <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
