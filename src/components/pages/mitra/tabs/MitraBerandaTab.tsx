import { TrendingUp, Package, Truck, DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';

export function MitraBerandaTab({ onNavigate }) {
  const kpis = [
    {
      title: 'Total Pesanan Bulan Ini',
      value: '128',
      change: '+12%',
      changeType: 'positive',
      icon: <Package className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'On-time Shipment',
      value: '96%',
      change: '+2%',
      changeType: 'positive',
      icon: <Truck className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Pendapatan Perkiraan',
      value: 'Rp 14.250.000',
      change: '+18%',
      changeType: 'positive',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Nilai Rata-rata Pesanan',
      value: 'Rp 111.000',
      change: '+5%',
      changeType: 'positive',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const tasks = [
    { id: 1, title: 'Kemas 2 pesanan baru', status: 'urgent', icon: <Package className="w-4 h-4" /> },
    { id: 2, title: 'Buat resi untuk #ORD-1023', status: 'pending', icon: <Truck className="w-4 h-4" /> },
    { id: 3, title: 'Balas 1 pertanyaan pelanggan', status: 'pending', icon: <AlertCircle className="w-4 h-4" /> }
  ];

  const chartData = [
    { day: 'Sen', orders: 12 },
    { day: 'Sel', orders: 19 },
    { day: 'Rab', orders: 15 },
    { day: 'Kam', orders: 22 },
    { day: 'Jum', orders: 18 },
    { day: 'Sab', orders: 25 },
    { day: 'Min', orders: 17 }
  ];

  const maxOrders = Math.max(...chartData.map(d => d.orders));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome - Mobile Optimized */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Selamat Datang Kembali! 👋
        </h2>
        <p className="text-sm sm:text-base text-gray-600">Berikut ringkasan performa toko Anda hari ini</p>
      </div>

      {/* KPI Cards - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {kpi.icon}
                </div>
                <Badge variant={kpi.changeType === 'positive' ? 'success' : 'secondary'} className="text-[10px] sm:text-xs">
                  {kpi.change}
                </Badge>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">{kpi.value}</div>
              <div className="text-xs text-gray-600 line-clamp-2">{kpi.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Tugas Hari Ini - Mobile Optimized */}
        <Card className="border-2 border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A]" />
              Tugas Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer active:bg-gray-200"
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  task.status === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {task.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{task.title}</div>
                </div>
                {task.status === 'urgent' && (
                  <Badge variant="destructive" className="text-[10px] sm:text-xs flex-shrink-0">Urgent</Badge>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full mt-2 sm:mt-3 text-sm"
              onClick={() => {/* Navigate to pesanan */}}
            >
              Lihat Semua Tugas
            </Button>
          </CardContent>
        </Card>

        {/* Tren Pesanan 7 Hari - Mobile Optimized */}
        <Card className="border-2 border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A]" />
              Tren Pesanan 7 Hari
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {chartData.map((data, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 sm:w-12 text-xs sm:text-sm font-medium text-gray-600">{data.day}</div>
                  <div className="flex-1">
                    <Progress value={(data.orders / maxOrders) * 100} className="h-5 sm:h-6" />
                  </div>
                  <div className="w-7 sm:w-8 text-xs sm:text-sm font-bold text-gray-900 text-right">{data.orders}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Rata-rata</span>
                <span className="font-bold text-gray-900">
                  {(chartData.reduce((sum, d) => sum + d.orders, 0) / chartData.length).toFixed(1)} pesanan/hari
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <Button
              variant="outline"
              className="h-auto flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 active:scale-95 transition-transform"
              onClick={() => {/* Navigate to add product */}}
            >
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#16A34A]" />
              <span className="text-xs sm:text-sm text-center leading-tight">Tambah Produk</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 active:scale-95 transition-transform"
              onClick={() => {/* Navigate to pesanan */}}
            >
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-xs sm:text-sm text-center leading-tight">Pesanan Baru</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 active:scale-95 transition-transform"
              onClick={() => {/* Navigate to pengiriman */}}
            >
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <span className="text-xs sm:text-sm text-center leading-tight">Buat Resi</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 active:scale-95 transition-transform"
              onClick={() => {/* Navigate to keuangan */}}
            >
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              <span className="text-xs sm:text-sm text-center leading-tight">Ajukan Payout</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
