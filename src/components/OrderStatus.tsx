import { 
  Clock, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  CreditCard,
  Box,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

/**
 * Order Status Components
 * 
 * - OrderStatusBadge: Simple status badge
 * - OrderStatusTimeline: Detailed timeline with steps
 * - OrderCard: Summary card for order list
 */

export type OrderStatus = 
  | 'pending_payment'
  | 'paid'
  | 'processed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

interface OrderStatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const statusConfig: Record<OrderStatus, OrderStatusConfig> = {
  pending_payment: {
    label: 'Menunggu Pembayaran',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: <Clock className="w-4 h-4" />
  },
  paid: {
    label: 'Dibayar',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: <CreditCard className="w-4 h-4" />
  },
  processed: {
    label: 'Diproses',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: <Box className="w-4 h-4" />
  },
  shipped: {
    label: 'Dikirim',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    icon: <Truck className="w-4 h-4" />
  },
  delivered: {
    label: 'Selesai',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: <CheckCircle className="w-4 h-4" />
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: <XCircle className="w-4 h-4" />
  },
  refunded: {
    label: 'Dikembalikan',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: <XCircle className="w-4 h-4" />
  }
};

/**
 * Order Status Badge
 */

interface OrderStatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
}

export function OrderStatusBadge({ status, showIcon = true }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge 
      variant="secondary"
      className={`${config.bgColor} ${config.color} hover:${config.bgColor} border-0`}
    >
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </Badge>
  );
}

/**
 * Order Status Timeline
 */

interface TimelineStep {
  status: string;
  date: string;
  description: string;
}

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
  timeline?: TimelineStep[];
}

export function OrderStatusTimeline({ currentStatus, timeline }: OrderStatusTimelineProps) {
  const steps: { status: OrderStatus; label: string }[] = [
    { status: 'paid', label: 'Dibayar' },
    { status: 'processed', label: 'Diproses' },
    { status: 'shipped', label: 'Dikirim' },
    { status: 'delivered', label: 'Selesai' }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();
  const progress = currentStatus === 'delivered' 
    ? 100 
    : ((currentStepIndex + 1) / steps.length) * 100;

  if (currentStatus === 'cancelled' || currentStatus === 'refunded') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-red-600">
            <XCircle className="w-6 h-6" />
            <div>
              <p className="font-medium">Pesanan {statusConfig[currentStatus].label}</p>
              {timeline && timeline.length > 0 && (
                <p className="text-sm text-red-600/80 mt-1">
                  {timeline[timeline.length - 1].description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const timelineItem = timeline?.find(t => t.status === step.status);

            return (
              <div key={step.status} className="flex gap-4 pb-8 last:pb-0">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center
                    ${isCompleted 
                      ? 'bg-[#16A34A] border-[#16A34A] text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}>
                    {statusConfig[step.status].icon}
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className={`
                      absolute left-5 top-10 w-0.5 h-full
                      ${isCompleted ? 'bg-[#16A34A]' : 'bg-gray-300'}
                    `} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <p className={`font-medium mb-0.5 ${
                    isCompleted ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  
                  {timelineItem && (
                    <>
                      <p className="text-xs text-gray-500 mb-1">
                        {new Date(timelineItem.date).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {timelineItem.description}
                      </p>
                    </>
                  )}

                  {isCurrent && !timelineItem && (
                    <Badge variant="outline" className="text-xs">
                      Sedang Diproses
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Timeline (if provided) */}
        {timeline && timeline.length > steps.length && (
          <details className="mt-4 pt-4 border-t">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
              Lihat riwayat lengkap
            </summary>
            <div className="mt-4 space-y-3">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-3 text-sm">
                  <span className="text-xs text-gray-500 w-32 flex-shrink-0">
                    {new Date(item.date).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="text-gray-700">{item.description}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Order Card (for list view)
 */

interface OrderCardProps {
  order: {
    id: string;
    status: OrderStatus;
    date: string;
    total: number;
    items: Array<{
      name: string;
      quantity: number;
      image?: string;
    }>;
    itemCount?: number;
  };
  onClick?: (orderId: string) => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const totalItems = order.itemCount || order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(order.id)}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-sm">{order.id}</span>
            </div>
            <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
          </div>
          
          <OrderStatusBadge status={order.status} showIcon={false} />
        </div>

        {/* Items Preview */}
        <div className="space-y-2 mb-3">
          {order.items.slice(0, 2).map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {item.image && (
                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 truncate text-xs md:text-sm">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.quantity}x
                </p>
              </div>
            </div>
          ))}
          
          {totalItems > 2 && (
            <p className="text-xs text-gray-500">
              +{totalItems - 2} produk lainnya
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Total Belanja</p>
            <p className="font-medium text-sm md:text-base">
              Rp {order.total.toLocaleString('id-ID')}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 text-xs"
          >
            Lihat Detail
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Order Empty State
 */

interface OrderEmptyStateProps {
  status?: string;
  onBrowse?: () => void;
}

export function OrderEmptyState({ status, onBrowse }: OrderEmptyStateProps) {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="p-8 md:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2">
          {status ? `Tidak Ada Pesanan ${status}` : 'Belum Ada Pesanan'}
        </h3>
        <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
          Yuk, mulai belanja produk nanas segar dari petani lokal Subang!
        </p>
        
        {onBrowse && (
          <Button
            onClick={onBrowse}
            className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
          >
            Belanja Sekarang
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Order Card Skeleton
 */

export function OrderCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
            <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse" />
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
