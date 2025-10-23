import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { 
  ShoppingCart, DollarSign, Package, TrendingUp, 
  AlertTriangle, CheckCircle2, Clock, ArrowUp, ArrowDown
} from 'lucide-react';
import { 
  Area, AreaChart, Bar, BarChart, ResponsiveContainer, 
  Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { mockKPIData, mockChartData, mockTasks, Task } from '../../../lib/admin/mockData';
import { useState } from 'react';

export function BerandaPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const kpiCards = [
    {
      title: 'Pesanan Hari Ini',
      value: mockKPIData.ordersToday,
      change: '+20%',
      positive: true,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pendapatan Hari Ini',
      value: formatCurrency(mockKPIData.revenueToday),
      change: '+23%',
      positive: true,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Stok Rendah',
      value: mockKPIData.lowStockCount,
      change: '3 kritis',
      positive: false,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'On-time Shipment',
      value: `${mockKPIData.onTimeShipment}%`,
      change: '+2%',
      positive: true,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Beranda Admin</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Selamat datang kembali! Berikut ringkasan bisnis hari ini.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {card.value}
                    </p>
                    <div className="flex items-center gap-1">
                      {card.positive ? (
                        <ArrowUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-orange-600" />
                      )}
                      <span className={`text-xs ${card.positive ? 'text-green-600' : 'text-orange-600'}`}>
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${card.bgColor} ${card.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Pendapatan 7 Hari</CardTitle>
            <CardDescription>Grafik pendapatan harian dalam seminggu terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}jt`}
                  />
                  <RechartsTooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Pesanan 7 Hari</CardTitle>
            <CardDescription>Grafik jumlah pesanan harian dalam seminggu terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="#D4AF37" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daftar Tugas</CardTitle>
            <CardDescription>Tugas yang perlu diselesaikan hari ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    {task.dueDate && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {new Date(task.dueDate).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {task.priority === 'high' ? 'Tinggi' :
                     task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Status Pesanan</CardTitle>
            <CardDescription>Ringkasan status pesanan aktif</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Pending</p>
                  <p className="text-xs text-gray-500">Menunggu pembayaran</p>
                </div>
              </div>
              <p className="text-xl font-bold text-yellow-600">{mockKPIData.pendingOrders}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Diproses</p>
                  <p className="text-xs text-gray-500">Sedang dikemas</p>
                </div>
              </div>
              <p className="text-xl font-bold text-blue-600">{mockKPIData.processingOrders}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Dikirim</p>
                  <p className="text-xs text-gray-500">Dalam pengiriman</p>
                </div>
              </div>
              <p className="text-xl font-bold text-green-600">{mockKPIData.shippedOrders}</p>
            </div>

            <Button className="w-full mt-4" variant="outline">
              Lihat Semua Pesanan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
