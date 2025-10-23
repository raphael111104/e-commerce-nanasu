import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

export function MitraPesananTab({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const orders = [
    { id: 'ORD-1023', date: '2025-01-20', customer: 'Budi Santoso', total: 245000, status: 'baru', items: 2 },
    { id: 'ORD-1022', date: '2025-01-20', customer: 'Ani Wijaya', total: 180000, status: 'diproses', items: 3 },
    { id: 'ORD-1021', date: '2025-01-19', customer: 'Citra Dewi', total: 350000, status: 'dikirim', items: 5 },
    { id: 'ORD-1020', date: '2025-01-19', customer: 'Dedi Kurniawan', total: 125000, status: 'selesai', items: 1 },
    { id: 'ORD-1019', date: '2025-01-18', customer: 'Eka Putri', total: 90000, status: 'dibatalkan', items: 2 }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      baru: { label: 'Baru', variant: 'default' as const, color: 'bg-blue-100 text-blue-700' },
      diproses: { label: 'Diproses', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-700' },
      dikirim: { label: 'Dikirim', variant: 'default' as const, color: 'bg-purple-100 text-purple-700' },
      selesai: { label: 'Selesai', variant: 'success' as const, color: 'bg-green-100 text-green-700' },
      dibatalkan: { label: 'Dibatalkan', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-700' }
    };
    return configs[status] || configs.baru;
  };

  const filteredOrders = (status?: string) => {
    let filtered = orders;
    if (status) {
      filtered = filtered.filter(o => o.status === status);
    }
    if (searchQuery) {
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const OrderTable = ({ orders }) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Customer</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Total</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            return (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">{order.id}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.items} item</div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-900">
                    Rp {order.total.toLocaleString('id-ID')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate(`mitra-order-detail`, order.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pesanan</h2>
        <p className="text-gray-600">Kelola semua pesanan masuk</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Cari order ID atau nama customer..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="semua" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
          <TabsTrigger value="semua">Semua ({orders.length})</TabsTrigger>
          <TabsTrigger value="baru">Baru ({orders.filter(o => o.status === 'baru').length})</TabsTrigger>
          <TabsTrigger value="diproses">Diproses ({orders.filter(o => o.status === 'diproses').length})</TabsTrigger>
          <TabsTrigger value="dikirim">Dikirim ({orders.filter(o => o.status === 'dikirim').length})</TabsTrigger>
          <TabsTrigger value="selesai">Selesai ({orders.filter(o => o.status === 'selesai').length})</TabsTrigger>
          <TabsTrigger value="dibatalkan">Dibatalkan ({orders.filter(o => o.status === 'dibatalkan').length})</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <Card className="border-2 border-gray-200">
            <TabsContent value="semua" className="m-0">
              <OrderTable orders={filteredOrders()} />
            </TabsContent>
            <TabsContent value="baru" className="m-0">
              <OrderTable orders={filteredOrders('baru')} />
            </TabsContent>
            <TabsContent value="diproses" className="m-0">
              <OrderTable orders={filteredOrders('diproses')} />
            </TabsContent>
            <TabsContent value="dikirim" className="m-0">
              <OrderTable orders={filteredOrders('dikirim')} />
            </TabsContent>
            <TabsContent value="selesai" className="m-0">
              <OrderTable orders={filteredOrders('selesai')} />
            </TabsContent>
            <TabsContent value="dibatalkan" className="m-0">
              <OrderTable orders={filteredOrders('dibatalkan')} />
            </TabsContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}
