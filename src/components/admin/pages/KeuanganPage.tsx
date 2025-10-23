import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { DollarSign, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { mockTransactions, Transaction } from '../../../lib/admin/mockData';

export function KeuanganPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'sale':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'refund':
      case 'fee':
      case 'payout':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };

  const getTypeBadge = (type: Transaction['type']) => {
    const badges = {
      'sale': { label: 'Penjualan', variant: 'default' as const, className: 'bg-green-600' },
      'refund': { label: 'Refund', variant: 'secondary' as const },
      'payout': { label: 'Payout', variant: 'default' as const, className: 'bg-blue-600' },
      'fee': { label: 'Biaya', variant: 'secondary' as const }
    };
    return badges[type];
  };

  const totalBalance = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const salesThisMonth = mockTransactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + t.amount, 0);
  const refundsThisMonth = Math.abs(mockTransactions
    .filter(t => t.type === 'refund')
    .reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Keuangan</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Kelola transaksi dan payout
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
                <p className="text-sm text-gray-500">Saldo Tersedia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(salesThisMonth)}</p>
                <p className="text-sm text-gray-500">Penjualan Bulan Ini</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(refundsThisMonth)}</p>
                <p className="text-sm text-gray-500">Refund Bulan Ini</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout Card */}
      <Card className="bg-gradient-to-r from-[#D4AF37] to-[#16a34a] text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">Payout Terjadwal</h3>
              <p className="text-sm opacity-90">
                Payout berikutnya dijadwalkan pada tanggal 25 Januari 2025
              </p>
              <p className="text-2xl font-bold mt-2">{formatCurrency(5000000)}</p>
            </div>
            <Button variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Proses Payout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Riwayat Transaksi</CardTitle>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Referensi</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((transaction) => {
                const typeBadge = getTypeBadge(transaction.type);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="text-sm">
                      {new Date(transaction.date).toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <Badge variant={typeBadge.variant} className={typeBadge.className}>
                          {typeBadge.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {transaction.reference}
                      </code>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-600">
                        Selesai
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transactions Cards - Mobile */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Riwayat Transaksi</h3>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
        {mockTransactions.map((transaction) => {
          const typeBadge = getTypeBadge(transaction.type);
          return (
            <Card key={transaction.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type)}
                      <Badge variant={typeBadge.variant} className={typeBadge.className}>
                        {typeBadge.label}
                      </Badge>
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      Selesai
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                      {transaction.reference}
                    </code>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleString('id-ID')}
                    </span>
                    <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
