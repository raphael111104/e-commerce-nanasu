import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { FileDown, TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { mockAnalyticsData } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function LaporanPage() {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('sales');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleExport = () => {
    toast.success('Laporan berhasil diexport!', {
      description: 'File CSV akan diunduh dalam beberapa detik'
    });
  };

  // Get data based on date range
  const chartData = mockAnalyticsData.slice(-parseInt(dateRange));

  // Calculate summary stats
  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const totalCustomers = chartData.reduce((sum, d) => sum + d.customers, 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Laporan</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Analisis dan laporan bisnis
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Laporan</CardTitle>
          <CardDescription>Pilih periode dan jenis laporan yang ingin diunduh</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Laporan Penjualan</SelectItem>
                  <SelectItem value="products">Produk Terlaris</SelectItem>
                  <SelectItem value="categories">Kategori Terlaris</SelectItem>
                  <SelectItem value="shipping">SLA Pengiriman</SelectItem>
                  <SelectItem value="conversion">Conversion Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Periode</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Hari Terakhir</SelectItem>
                  <SelectItem value="30">30 Hari Terakhir</SelectItem>
                  <SelectItem value="60">60 Hari Terakhir</SelectItem>
                  <SelectItem value="90">90 Hari Terakhir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="invisible">Action</Label>
              <Button onClick={handleExport} className="w-full">
                <FileDown className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(totalRevenue)}</p>
                <p className="text-xs text-gray-500">Total Pendapatan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold">{totalOrders}</p>
                <p className="text-xs text-gray-500">Total Pesanan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold">{formatCurrency(avgOrderValue)}</p>
                <p className="text-xs text-gray-500">Avg. Order Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-lg md:text-xl font-bold">{totalCustomers}</p>
                <p className="text-xs text-gray-500">Total Pelanggan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Pendapatan</CardTitle>
          <CardDescription>Grafik pendapatan {dateRange} hari terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <RechartsTooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(date) => new Date(date).toLocaleDateString('id-ID')}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  dot={{ fill: '#16a34a', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Pesanan</CardTitle>
          <CardDescription>Grafik jumlah pesanan {dateRange} hari terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <RechartsTooltip 
                  labelFormatter={(date) => new Date(date).toLocaleDateString('id-ID')}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#D4AF37" 
                  strokeWidth={2}
                  dot={{ fill: '#D4AF37', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Laporan Cepat</CardTitle>
          <CardDescription>Download laporan yang sering digunakan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Penjualan Hari Ini', description: 'Ringkasan penjualan harian' },
              { name: 'Produk Terlaris Bulan Ini', description: 'Top 10 produk best seller' },
              { name: 'Kategori Terlaris', description: 'Performa kategori produk' },
              { name: 'Laporan SLA Pengiriman', description: 'On-time vs keterlambatan' },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleExport}>
                  <FileDown className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
