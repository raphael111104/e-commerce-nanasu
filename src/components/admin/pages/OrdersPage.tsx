import { useState } from 'react';
import { Eye, Download, Printer, MessageCircle, RefreshCcw, CheckCircle, Package, Truck, XCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { DataTable, Column } from '../DataTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../ui/sheet';
import { Separator } from '../../ui/separator';
import { mockOrders, Order } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    payment: 'all',
    channel: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      'new': { label: 'New', className: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700' },
      'paid': { label: 'Paid', className: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 border-green-300 dark:border-green-700' },
      'packed': { label: 'Packed', className: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-300 border-purple-300 dark:border-purple-700' },
      'shipped': { label: 'Shipped', className: 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 dark:from-indigo-900/30 dark:to-blue-900/30 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' },
      'delivered': { label: 'Delivered', className: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 dark:from-emerald-900/30 dark:to-teal-900/30 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' },
      'refund': { label: 'Refund', className: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 border-red-300 dark:border-red-700' },
      'cancelled': { label: 'Cancelled', className: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 dark:from-gray-900/30 dark:to-slate-900/30 dark:text-gray-300 border-gray-300 dark:border-gray-700' }
    };
    const { label, className } = config[status] || config.new;
    return <Badge className={className}>{label}</Badge>;
  };

  const getChannelBadge = (channel: string) => {
    const config = {
      web: { label: 'Web', className: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300' },
      mobile: { label: 'Mobile', className: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-300' },
      marketplace: { label: 'Marketplace', className: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-300' }
    };
    const { label, className } = config[channel as keyof typeof config];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const columns: Column<Order>[] = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      width: 'w-32',
      render: (order) => (
        <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
          {order.id}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      width: 'w-40',
      render: (order) => (
        <div className="text-sm">
          <p className="text-gray-900 dark:text-white">{order.date.split(' ')[0]}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{order.date.split(' ')[1]}</p>
        </div>
      )
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (order) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{order.region}</p>
        </div>
      )
    },
    {
      key: 'items',
      label: 'Items',
      sortable: true,
      align: 'center',
      width: 'w-20',
      render: (order) => (
        <span className="text-sm text-gray-900 dark:text-white">{order.items}</span>
      )
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      align: 'right',
      width: 'w-32',
      render: (order) => (
        <span className="font-medium text-gray-900 dark:text-white">
          Rp {order.total.toLocaleString('id-ID')}
        </span>
      )
    },
    {
      key: 'payment',
      label: 'Payment',
      width: 'w-28',
      render: (order) => (
        <span className="text-sm text-gray-700 dark:text-gray-300">{order.payment}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: 'w-28',
      render: (order) => getStatusBadge(order.status)
    },
    {
      key: 'channel',
      label: 'Channel',
      width: 'w-28',
      render: (order) => getChannelBadge(order.channel)
    }
  ];

  // Apply filters
  const filteredOrders = orders.filter(order => {
    if (filters.status !== 'all' && order.status !== filters.status) return false;
    if (filters.payment !== 'all' && order.payment !== filters.payment) return false;
    if (filters.channel !== 'all' && order.channel !== filters.channel) return false;
    // Date filters would be applied here
    return true;
  });

  const handleBulkUpdateStatus = (selectedIds: string[], newStatus: string) => {
    toast.success(`Updated ${selectedIds.length} order(s) to ${newStatus}`);
  };

  const handleExport = () => {
    toast.success('Exporting orders to CSV...');
  };

  const filterSlot = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <Label htmlFor="status-filter">Status</Label>
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger id="status-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="packed">Packed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="refund">Refund</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="payment-filter">Payment Method</Label>
        <Select value={filters.payment} onValueChange={(value) => setFilters({ ...filters, payment: value })}>
          <SelectTrigger id="payment-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="GoPay">GoPay</SelectItem>
            <SelectItem value="OVO">OVO</SelectItem>
            <SelectItem value="BCA VA">BCA VA</SelectItem>
            <SelectItem value="Mandiri VA">Mandiri VA</SelectItem>
            <SelectItem value="COD">COD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="channel-filter">Channel</Label>
        <Select value={filters.channel} onValueChange={(value) => setFilters({ ...filters, channel: value })}>
          <SelectTrigger id="channel-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="marketplace">Marketplace</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date-filter">Date Range</Label>
        <Input
          id="date-filter"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        />
      </div>
    </div>
  );

  const bulkActions = (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.info('Bulk update feature')}
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        Mark as Paid
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.info('Bulk update feature')}
      >
        <Package className="w-4 h-4 mr-2" />
        Mark as Packed
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => toast.info('Bulk update feature')}
      >
        <Truck className="w-4 h-4 mr-2" />
        Mark as Shipped
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 hover:text-red-700"
        onClick={() => toast.info('Bulk cancel feature')}
      >
        <XCircle className="w-4 h-4 mr-2" />
        Cancel Orders
      </Button>
    </>
  );

  const rowActions = (order: Order) => (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedOrder(order);
        }}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          toast.success('Printing invoice...');
        }}
      >
        <Printer className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-xl backdrop-blur-sm bg-gradient-to-r from-teal-50/50 to-green-50/50 dark:from-teal-900/20 dark:to-green-900/20 border border-teal-200/50 dark:border-teal-800/50 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredOrders}
        columns={columns}
        searchable
        searchPlaceholder="Search by Order ID or Customer..."
        filterable
        filterSlot={filterSlot}
        exportable
        onExport={handleExport}
        selectable
        bulkActions={bulkActions}
        pagination
        pageSize={25}
        onRowClick={(order) => setSelectedOrder(order)}
        rowActions={rowActions}
        emptyState={
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-12">
            <Package className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium mb-1">No orders found</p>
            <p className="text-sm">Try adjusting your filters or search query</p>
          </div>
        }
      />

      {/* Order Detail Sheet */}
      <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedOrder && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>Order {selectedOrder.id}</span>
                  {getStatusBadge(selectedOrder.status)}
                </SheetTitle>
                <SheetDescription>
                  Placed on {selectedOrder.date}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Timeline */}
                <div>
                  <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Order Timeline</h3>
                  <div className="space-y-4">
                    {['new', 'paid', 'packed', 'shipped', 'delivered'].map((status, index) => {
                      const isCompleted = ['new', 'paid', 'packed', 'shipped', 'delivered'].indexOf(selectedOrder.status) >= index;
                      return (
                        <div key={status} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                            }`}>
                              {isCompleted && <CheckCircle className="w-5 h-5" />}
                            </div>
                            {index < 4 && (
                              <div className={`w-0.5 h-12 ${
                                isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                              }`} />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <p className={`font-medium ${
                              isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'
                            }`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </p>
                            {isCompleted && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {selectedOrder.date}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Customer Info */}
                <div>
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900 dark:text-white font-medium">{selectedOrder.customer}</p>
                    <p className="text-gray-600 dark:text-gray-400">ID: {selectedOrder.customerId}</p>
                    <p className="text-gray-600 dark:text-gray-400">Region: {selectedOrder.region}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div>
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Items</span>
                      <span className="text-gray-900 dark:text-white">{selectedOrder.items} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                      <span className="text-gray-900 dark:text-white">{selectedOrder.payment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Channel</span>
                      {getChannelBadge(selectedOrder.channel)}
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tracking Number</span>
                        <span className="font-mono text-gray-900 dark:text-white text-xs">
                          {selectedOrder.trackingNumber}
                        </span>
                      </div>
                    )}
                    <Separator className="my-3" />
                    <div className="flex justify-between font-medium text-base">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">
                        Rp {selectedOrder.total.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Invoice
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Customer
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
