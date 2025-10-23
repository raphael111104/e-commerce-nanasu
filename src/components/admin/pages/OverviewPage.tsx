import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users,
  Package, AlertTriangle, Star, ArrowRight, RefreshCcw, Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { mockKPIData, mockOrders, mockProducts, mockTickets } from '../../../lib/admin/mockData';

export function OverviewPage() {
  const kpi = mockKPIData;

  // Recent orders (last 5)
  const recentOrders = mockOrders.slice(0, 5);

  // Low stock products
  const lowStockProducts = mockProducts
    .filter(p => p.stock < 50)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  // Recent tickets
  const recentTickets = mockTickets
    .filter(t => t.status === 'open' || t.status === 'in-progress')
    .slice(0, 5);

  // Revenue chart data (last 30 days)
  const revenueData = Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}`,
    revenue: Math.floor(Math.random() * 5000000) + 8000000,
    orders: Math.floor(Math.random() * 50) + 30
  }));

  // Orders by category
  const categoryData = [
    { category: 'Nanas Segar', count: 450, fill: '#4B5DFF' },
    { category: 'Olahan', count: 320, fill: '#13C2B3' },
    { category: 'Bundling', count: 180, fill: '#FF5A4E' },
    { category: 'Pre-Order', count: 95, fill: '#FACC15' }
  ];

  // Payment methods
  const paymentData = [
    { method: 'E-Wallet', value: 45, fill: '#4B5DFF' },
    { method: 'Bank Transfer', value: 30, fill: '#13C2B3' },
    { method: 'COD', value: 20, fill: '#FF5A4E' },
    { method: 'Credit Card', value: 5, fill: '#FACC15' }
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      'new': { label: 'New', className: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300' },
      'paid': { label: 'Paid', className: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300' },
      'packed': { label: 'Packed', className: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-300' },
      'shipped': { label: 'Shipped', className: 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border-indigo-300' },
      'delivered': { label: 'Delivered', className: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-300' }
    };
    const { label, className } = config[status] || { label: status, className: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300' };
    return <Badge className={className}>{label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { label: string; className: string }> = {
      'urgent': { label: 'Urgent', className: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300' },
      'high': { label: 'High', className: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-300' },
      'medium': { label: 'Medium', className: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-300' },
      'low': { label: 'Low', className: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300' }
    };
    const { label, className } = config[priority];
    return <Badge className={className}>{label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-xl backdrop-blur-sm bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-[#4B5DFF] to-[#13C2B3] hover:opacity-90 text-white shadow-lg transition-all duration-300" size="sm">
            View Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* GMV Today */}
        <Card className="col-span-2 relative overflow-hidden backdrop-blur-sm border-blue-200 dark:border-blue-800">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">GMV Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  Rp {(kpi.gmv.today / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{kpi.gmv.change}%</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">vs yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="relative overflow-hidden backdrop-blur-sm border-green-200 dark:border-green-800">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/20 dark:to-transparent"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders Today</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{kpi.orders.today}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{kpi.orders.change}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="relative overflow-hidden backdrop-blur-sm border-purple-200 dark:border-purple-800">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/20 dark:to-transparent"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conv. Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{kpi.conversionRate.value}%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{kpi.conversionRate.change}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AOV */}
        <Card className="relative overflow-hidden backdrop-blur-sm border-orange-200 dark:border-orange-800">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/20 dark:to-transparent"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AOV</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  Rp {Math.floor(kpi.aov.value / 1000)}K
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+{kpi.aov.change}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-900/10 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-red-50/30 dark:from-orange-900/20 dark:to-red-900/20"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-orange-900 dark:text-orange-400">Low Stock</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-300 mt-2">
                  {kpi.lowStock.count}
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-400 mt-2">
                  {kpi.lowStock.critical} critical
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="backdrop-blur-sm border-blue-200 dark:border-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-900/10 dark:to-transparent"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Revenue (Last 30 Days)</CardTitle>
            <CardDescription>Daily revenue and orders trend</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4B5DFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4B5DFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4B5DFF"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders by Category */}
        <Card className="backdrop-blur-sm border-teal-200 dark:border-teal-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-transparent dark:from-teal-900/10 dark:to-transparent"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Orders by Category</CardTitle>
            <CardDescription>Distribution this month</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 backdrop-blur-sm border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-transparent dark:from-slate-900/10 dark:to-transparent"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </p>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Rp {order.total.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.items} items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Low Stock */}
          <Card className="border-orange-200 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 to-transparent dark:from-orange-900/10 dark:to-transparent"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-orange-900 dark:text-orange-400">Low Stock Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-800 rounded-lg"
                >
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{product.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.sku}</p>
                    <Badge variant="destructive" className="text-xs">
                      {product.stock} left
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View Inventory <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card className="backdrop-blur-sm border-indigo-200 dark:border-indigo-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent dark:from-indigo-900/10 dark:to-transparent"></div>
            <CardHeader className="relative z-10">
              <CardTitle>Active Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{ticket.subject}</p>
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.customer}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(ticket.updated).toLocaleDateString()}
                  </p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Tickets <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Package className="w-5 h-5" />
          <span>Add Product</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Tag className="w-5 h-5" />
          <span>Create Voucher</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Star className="w-5 h-5" />
          <span>Manage Banners</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Users className="w-5 h-5" />
          <span>View Customers</span>
        </Button>
      </div>
    </div>
  );
}
