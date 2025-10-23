import { useState } from 'react';
import { Package, Clock, Truck, CheckCircle, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OrdersPageProps {
  orders?: any[];
  onViewOrder?: (order: any) => void;
}

export function OrdersPage({ orders: propsOrders, onViewOrder }: OrdersPageProps) {
  const [selectedTab, setSelectedTab] = useState('semua');

  const orderStatuses = {
    'belum_bayar': { label: 'Belum Bayar', icon: Clock, color: 'text-orange-500' },
    'dikemas': { label: 'Dikemas', icon: Package, color: 'text-blue-500' },
    'dikirim': { label: 'Dikirim', icon: Truck, color: 'text-purple-500' },
    'selesai': { label: 'Selesai', icon: CheckCircle, color: 'text-green-500' }
  };

  // Use provided orders or fallback to mock data
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '5 Januari 2025',
      status: 'dikirim',
      items: [
        {
          id: 1,
          name: 'Nanas Madu Premium Grade A - 1kg',
          image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2,
          price: 35000
        }
      ],
      total: 70000,
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '7 Januari 2025'
    },
    {
      id: 'ORD-002',
      date: '3 Januari 2025',
      status: 'selesai',
      items: [
        {
          id: 2,
          name: 'Paket Bundling Keluarga - 3kg Mix',
          image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 1,
          price: 85000
        },
        {
          id: 3,
          name: 'Jus Nanas Segar 500ml',
          image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 3,
          price: 15000
        }
      ],
      total: 130000,
      deliveredDate: '4 Januari 2025',
      canReview: true
    },
    {
      id: 'ORD-003',
      date: '1 Januari 2025',
      status: 'dikemas',
      items: [
        {
          id: 4,
          name: 'Keripik Nanas Original 200gr',
          image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2,
          price: 22000
        }
      ],
      total: 44000,
      estimatedShipping: '6 Januari 2025'
    },
    {
      id: 'ORD-004',
      date: '30 Desember 2025',
      status: 'belum_bayar',
      items: [
        {
          id: 5,
          name: 'Nanas Organik Premium 2kg',
          image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 1,
          price: 65000
        }
      ],
      total: 65000,
      paymentExpiry: '31 Desember 2025 23:59'
    },
    {
      id: 'ORD-005',
      date: '28 Desember 2025',
      status: 'selesai',
      items: [
        {
          id: 6,
          name: 'Smoothie Nanas Tropical 400ml',
          image: 'https://images.unsplash.com/photo-1564956213070-84f5a0cb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbW9vdGhpZSUyMGhlYWx0aHklMjBkcmlua3xlbnwxfHx8fDE3NTk4MDEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 4,
          price: 20000
        },
        {
          id: 7,
          name: 'Nanas Mini Sweet 6pcs',
          image: 'https://images.unsplash.com/photo-1735052963684-f9e1f4f3ba38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pJTIwcGluZWFwcGxlJTIwYmFieSUyMGZydWl0fGVufDF8fHx8MTc1OTgwMTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2,
          price: 35000
        }
      ],
      total: 150000,
      deliveredDate: '30 Desember 2025',
      canReview: false
    },
    {
      id: 'ORD-006',
      date: '26 Desember 2024',
      status: 'dikirim',
      items: [
        {
          id: 8,
          name: 'Manisan Nanas Tradisional 250gr',
          image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYW5kaWVkJTIwc3dlZXQlMjBzbmFja3xlbnwxfHx8fDE3NTk4MDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 3,
          price: 18000
        }
      ],
      total: 54000,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '8 Januari 2025'
    },
    {
      id: 'ORD-007',
      date: '24 Desember 2024',
      status: 'dikemas',
      items: [
        {
          id: 9,
          name: 'Nanas Potong Siap Saji 1kg',
          image: 'https://images.unsplash.com/photo-1671063334743-e2ad4c2cdea4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbGljZXMlMjBmcmVzaCUyMGN1dHxlbnwxfHx8fDE3NTk4MDEwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2,
          price: 40000
        },
        {
          id: 10,
          name: 'Keripik Nanas Pedas Manis 150gr',
          image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2,
          price: 18000
        }
      ],
      total: 116000,
      estimatedShipping: '9 Januari 2025'
    },
    {
      id: 'ORD-008',
      date: '22 Desember 2024',
      status: 'selesai',
      items: [
        {
          id: 11,
          name: 'Paket Bundle Premium 5kg',
          image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 1,
          price: 120000
        }
      ],
      total: 120000,
      deliveredDate: '25 Desember 2024',
      canReview: true
    },
    {
      id: 'ORD-009',
      date: '20 Desember 2024',
      status: 'belum_bayar',
      items: [
        {
          id: 12,
          name: 'Jus Nanas Botol 1 Liter',
          image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 5,
          price: 25000
        }
      ],
      total: 125000,
      paymentExpiry: '21 Desember 2024 23:59'
    },
    {
      id: 'ORD-010',
      date: '18 Desember 2024',
      status: 'selesai',
      items: [
        {
          id: 13,
          name: 'Nanas Super Sweet Grade AA 1,5kg',
          image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 3,
          price: 50000
        },
        {
          id: 14,
          name: 'Selai Nanas Homemade 300gr',
          image: 'https://images.unsplash.com/photo-1644204010805-90a62ab0bdc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBjYW5kaWVkJTIwc3dlZXQlMjBzbmFja3xlbnwxfHx8fDE3NTk4MDEwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          quantity: 2,
          price: 24000
        }
      ],
      total: 198000,
      deliveredDate: '21 Desember 2024',
      canReview: true
    }
  ];

  // Use provided orders or mock data
  const orders = propsOrders && propsOrders.length > 0 ? propsOrders : mockOrders;

  const filteredOrders = selectedTab === 'semua' 
    ? orders 
    : orders.filter(order => order.status === selectedTab);

  const getStatusInfo = (status) => {
    const statusInfo = orderStatuses[status];
    if (!statusInfo) return { label: status, icon: Package, color: 'text-gray-500' };
    return statusInfo;
  };

  const OrderCard = ({ order }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
      <Card className="mb-4">
        <CardContent className="p-6">
          {/* Order Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{order.id}</h3>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <div className="text-right">
              <Badge 
                variant="secondary" 
                className={`${statusInfo.color} bg-transparent border`}
              >
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.label}
              </Badge>
              <p className="text-sm font-bold text-gray-900 mt-1">
                Rp {order.total.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3 mb-4">
            {order.items.map((item, itemIndex) => (
              <div key={`${order.id}-item-${item.id}-${itemIndex}`} className="flex gap-3">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">
                    {item.name}
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">x{item.quantity}</span>
                    <span className="font-medium">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Status Specific Info */}
          {order.status === 'belum_bayar' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-700 mb-2">
                ⏰ Batas waktu pembayaran: {order.paymentExpiry}
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]">
                  Bayar Sekarang
                </Button>
                <Button variant="outline" size="sm">
                  Lihat Detail
                </Button>
              </div>
            </div>
          )}

          {order.status === 'dikemas' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700">
                📦 Pesanan sedang dikemas. Estimasi pengiriman: {order.estimatedShipping}
              </p>
            </div>
          )}

          {order.status === 'dikirim' && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-purple-700">
                  🚚 Pesanan dalam perjalanan
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-purple-700 h-6 p-0"
                  onClick={() => onViewOrder?.(order)}
                >
                  Lacak Paket
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <p className="text-xs text-purple-600">
                No. Resi: {order.trackingNumber} | Estimasi tiba: {order.estimatedDelivery}
              </p>
            </div>
          )}

          {order.status === 'selesai' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-green-700">
                  ✅ Pesanan telah diterima pada {order.deliveredDate}
                </p>
                {order.canReview && (
                  <Button variant="ghost" size="sm" className="text-green-700 h-6 p-0">
                    <Star className="w-3 h-3 mr-1" />
                    Beri Ulasan
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onViewOrder?.(order)}
            >
              Lihat Detail
            </Button>
            {order.status === 'selesai' && (
              <Button size="sm" className="flex-1 bg-[#16A34A] hover:bg-[#16A34A]/90">
                Beli Lagi
              </Button>
            )}
            {order.status !== 'belum_bayar' && order.status !== 'selesai' && (
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Pesanan</h2>
          <p className="text-gray-500 mb-6">
            Yuk mulai belanja produk nanas segar dari Subang!
          </p>
          <Button className="bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]">
            Mulai Belanja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pesanan Saya</h1>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="belum_bayar" className="text-orange-600">
            Belum Bayar
          </TabsTrigger>
          <TabsTrigger value="dikemas" className="text-blue-600">
            Dikemas
          </TabsTrigger>
          <TabsTrigger value="dikirim" className="text-purple-600">
            Dikirim
          </TabsTrigger>
          <TabsTrigger value="selesai" className="text-green-600">
            Selesai
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">
                Tidak ada pesanan dengan status ini
              </h3>
              <p className="text-gray-500">
                Pesanan dengan status {orderStatuses[selectedTab]?.label.toLowerCase()} akan muncul di sini
              </p>
            </div>
          ) : (
            <div>
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}