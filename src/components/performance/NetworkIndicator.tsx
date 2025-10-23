import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Signal, SignalLow, SignalMedium } from 'lucide-react';
import { Badge } from '../ui/badge';

type NetworkQuality = 'offline' | 'slow' | 'good' | 'excellent';

interface NetworkIndicatorProps {
  onNetworkChange?: (quality: NetworkQuality) => void;
  showIndicator?: boolean;
}

export function NetworkIndicator({ onNetworkChange, showIndicator = true }: NetworkIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>('good');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      updateNetworkQuality();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkQuality('offline');
      onNetworkChange?.('offline');
    };

    const updateNetworkQuality = () => {
      // @ts-ignore - Network Information API
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      if (!connection) {
        setNetworkQuality('good');
        onNetworkChange?.('good');
        return;
      }

      const effectiveType = connection.effectiveType;
      let quality: NetworkQuality = 'good';

      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          quality = 'slow';
          break;
        case '3g':
          quality = 'good';
          break;
        case '4g':
        case '5g':
          quality = 'excellent';
          break;
        default:
          quality = 'good';
      }

      setNetworkQuality(quality);
      onNetworkChange?.(quality);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkQuality);
    }

    // Initial check
    updateNetworkQuality();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkQuality);
      }
    };
  }, [onNetworkChange]);

  if (!showIndicator) return null;

  const getIcon = () => {
    if (!isOnline) return <WifiOff className="w-3 h-3" />;
    
    switch (networkQuality) {
      case 'slow':
        return <SignalLow className="w-3 h-3" />;
      case 'good':
        return <SignalMedium className="w-3 h-3" />;
      case 'excellent':
        return <Signal className="w-3 h-3" />;
      default:
        return <Wifi className="w-3 h-3" />;
    }
  };

  const getLabel = () => {
    if (!isOnline) return 'Offline';
    return networkQuality === 'slow' ? 'Koneksi Lambat' : '';
  };

  const getVariant = (): "default" | "secondary" | "destructive" | "outline" => {
    if (!isOnline) return 'destructive';
    if (networkQuality === 'slow') return 'outline';
    return 'secondary';
  };

  const label = getLabel();
  if (!label) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
      <Badge variant={getVariant()} className="gap-1.5 shadow-lg">
        {getIcon()}
        <span className="text-xs">{label}</span>
      </Badge>
    </div>
  );
}

// Hook for network-aware loading
export function useNetworkAwareLoading() {
  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>('good');

  const getLoadingDelay = () => {
    switch (networkQuality) {
      case 'offline':
        return 0;
      case 'slow':
        return 400; // Add delay for slow network
      case 'good':
        return 200;
      case 'excellent':
        return 100;
      default:
        return 200;
    }
  };

  const shouldReduceQuality = networkQuality === 'slow';

  return {
    networkQuality,
    loadingDelay: getLoadingDelay(),
    shouldReduceQuality,
    setNetworkQuality
  };
}
