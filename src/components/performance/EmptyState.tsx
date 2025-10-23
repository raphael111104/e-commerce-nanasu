import { Package, WifiOff, AlertCircle, Search, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '../ui/button';

type StateType = 'empty' | 'error' | 'offline' | 'no-results' | 'no-cart' | 'no-wishlist';

interface EmptyStateProps {
  type: StateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const STATE_CONFIG = {
  empty: {
    icon: Package,
    title: 'Belum Ada Data',
    description: 'Saat ini belum ada item yang tersedia',
    iconColor: 'text-[--text-tertiary]'
  },
  error: {
    icon: AlertCircle,
    title: 'Terjadi Kesalahan',
    description: 'Maaf, terjadi kesalahan saat memuat data',
    iconColor: 'text-[--status-error]'
  },
  offline: {
    icon: WifiOff,
    title: 'Tidak Ada Koneksi',
    description: 'Periksa koneksi internet Anda dan coba lagi',
    iconColor: 'text-[--status-warning]'
  },
  'no-results': {
    icon: Search,
    title: 'Tidak Ditemukan',
    description: 'Tidak ada produk yang sesuai dengan pencarian Anda',
    iconColor: 'text-[--text-tertiary]'
  },
  'no-cart': {
    icon: ShoppingBag,
    title: 'Keranjang Kosong',
    description: 'Belum ada produk di keranjang belanja Anda',
    iconColor: 'text-[--text-tertiary]'
  },
  'no-wishlist': {
    icon: Heart,
    title: 'Wishlist Kosong',
    description: 'Tambahkan produk favorit ke wishlist Anda',
    iconColor: 'text-[--text-tertiary]'
  }
};

export function EmptyState({
  type,
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  const config = STATE_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon with subtle background */}
      <div className="relative mb-6">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20"
          style={{
            background: type === 'error'
              ? 'var(--status-error)'
              : type === 'offline'
              ? 'var(--status-warning)'
              : 'var(--brand-default)'
          }}
        />
        <div className="relative w-24 h-24 rounded-full bg-[--surface-secondary] flex items-center justify-center">
          <Icon className={`w-12 h-12 ${config.iconColor}`} strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-sm space-y-2 mb-6">
        <h3 className="text-xl font-semibold text-[--text-primary]">
          {title || config.title}
        </h3>
        <p className="text-sm text-[--text-secondary]">
          {description || config.description}
        </p>
      </div>

      {/* Action Button */}
      {(actionLabel || onAction) && (
        <Button
          onClick={onAction}
          variant={type === 'error' || type === 'offline' ? 'outline' : 'default'}
          className="min-w-[120px]"
        >
          {actionLabel || (type === 'offline' ? 'Coba Lagi' : 'Muat Ulang')}
        </Button>
      )}

      {/* Offline Tips */}
      {type === 'offline' && (
        <div className="mt-6 p-4 rounded-lg bg-[--surface-secondary] max-w-md">
          <p className="text-xs text-[--text-tertiary] mb-2">💡 Tips:</p>
          <ul className="text-xs text-[--text-secondary] space-y-1 text-left">
            <li>• Periksa WiFi atau data seluler Anda</li>
            <li>• Coba aktifkan mode pesawat, lalu matikan kembali</li>
            <li>• Pastikan tidak ada gangguan jaringan</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Compact Error Component
export function InlineError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[--status-error]/10 border border-[--status-error]/20">
      <div className="flex items-center gap-2 flex-1">
        <AlertCircle className="w-4 h-4 text-[--status-error] flex-shrink-0" />
        <span className="text-sm text-[--text-primary]">{message}</span>
      </div>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry} className="ml-2">
          Retry
        </Button>
      )}
    </div>
  );
}
