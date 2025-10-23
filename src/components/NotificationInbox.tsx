import { useState } from 'react';
import { X, CheckCheck, Trash2, Package, CreditCard, Truck, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import type { Notification } from '../lib/services/customerJourney';

interface NotificationInboxProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationInbox({
  open,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll
}: NotificationInboxProps) {
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string, title: string) => {
    if (title.toLowerCase().includes('pesanan') || title.toLowerCase().includes('order')) {
      return <Package className="w-5 h-5" />;
    }
    if (title.toLowerCase().includes('pembayaran') || title.toLowerCase().includes('bayar')) {
      return <CreditCard className="w-5 h-5" />;
    }
    if (title.toLowerCase().includes('kirim') || title.toLowerCase().includes('kurir')) {
      return <Truck className="w-5 h-5" />;
    }
    if (title.toLowerCase().includes('selesai') || title.toLowerCase().includes('tiba')) {
      return <CheckCircle className="w-5 h-5" />;
    }
    
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'warning':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days < 7) return `${days} hari lalu`;
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const handleNotifClick = (notif: Notification) => {
    setSelectedNotif(notif);
    if (!notif.read) {
      onMarkAsRead(notif.id);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0" aria-describedby="notification-description">
        <SheetHeader className="p-4 pb-3 border-b border-[--border-default]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SheetTitle>Notifikasi</SheetTitle>
              {unreadCount > 0 && (
                <Badge variant="default" className="rounded-full px-2 bg-[--brand-default]">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="text-xs h-8"
                >
                  <CheckCheck className="w-4 h-4 mr-1" />
                  Tandai Dibaca
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearAll}
                  className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus Semua
                </Button>
              )}
            </div>
          </div>
          <span id="notification-description" className="sr-only">
            Daftar notifikasi dan pembaruan pesanan Anda
          </span>
        </SheetHeader>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] p-6 text-center">
            <div className="w-24 h-24 bg-[--bg-surface] rounded-full flex items-center justify-center mb-4">
              <Package className="w-12 h-12 text-[--text-tertiary]" />
            </div>
            <h3 className="font-semibold text-[--text-primary] mb-2">
              Tidak Ada Notifikasi
            </h3>
            <p className="text-sm text-[--text-secondary]">
              Notifikasi Anda akan muncul di sini
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-2">
              <AnimatePresence mode="popLayout">
                {notifications.map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                        !notif.read
                          ? 'bg-[--accent] hover:bg-[--accent]/80'
                          : 'hover:bg-[--bg-surface]'
                      } ${selectedNotif?.id === notif.id ? 'ring-2 ring-[--brand-default]' : ''}`}
                      onClick={() => handleNotifClick(notif)}
                    >
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBgColor(notif.type)}`}>
                          {getIcon(notif.type, notif.title)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`text-sm line-clamp-1 ${!notif.read ? 'font-semibold' : 'font-medium'} text-[--text-primary]`}>
                              {notif.title}
                            </h4>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-[--brand-default] rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          
                          <p className="text-xs text-[--text-secondary] line-clamp-2 mb-1">
                            {notif.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[--text-tertiary]">
                              {formatTime(notif.timestamp)}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(notif.id);
                              }}
                              className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index < notifications.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
