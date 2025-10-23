import { useState } from 'react';
import { Wallet, TrendingUp, Calendar, Download, Plus } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { toast } from 'sonner@2.0.3';

export function MitraKeuanganTab() {
  const [showPayoutDialog, setShowPayoutDialog] = useState(false);
  const [payoutForm, setPayoutForm] = useState({
    amount: '',
    bank: '',
    accountNumber: '',
    accountName: ''
  });

  const summary = {
    currentBalance: 14250000,
    scheduledPayout: 3500000,
    totalPayoutThisMonth: 25000000
  };

  const transactions = [
    { id: 1, date: '2025-01-20', type: 'Penjualan', reference: 'ORD-1023', amount: 245000, status: 'sukses' },
    { id: 2, date: '2025-01-20', type: 'Penjualan', reference: 'ORD-1022', amount: 180000, status: 'sukses' },
    { id: 3, date: '2025-01-19', type: 'Payout', reference: 'PYT-0012', amount: -3500000, status: 'diproses' },
    { id: 4, date: '2025-01-19', type: 'Penjualan', reference: 'ORD-1021', amount: 350000, status: 'sukses' },
    { id: 5, date: '2025-01-18', type: 'Penjualan', reference: 'ORD-1020', amount: 125000, status: 'sukses' }
  ];

  const handlePayoutRequest = () => {
    if (!payoutForm.amount || !payoutForm.bank || !payoutForm.accountNumber || !payoutForm.accountName) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    const amount = parseInt(payoutForm.amount);
    if (amount < 100000) {
      toast.error('Minimal pencairan Rp 100.000');
      return;
    }

    if (amount > summary.currentBalance) {
      toast.error('Saldo tidak mencukupi');
      return;
    }

    toast.success('Payout berhasil diajukan. Proses 1-2 hari kerja.');
    setShowPayoutDialog(false);
    setPayoutForm({ amount: '', bank: '', accountNumber: '', accountName: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Keuangan</h2>
          <p className="text-gray-600">Kelola keuangan dan payout</p>
        </div>

        <Dialog open={showPayoutDialog} onOpenChange={setShowPayoutDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajukan Payout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajukan Payout</DialogTitle>
              <DialogDescription>
                Cairkan pendapatan Anda ke rekening bank yang terdaftar
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-900 mb-1">Saldo Tersedia</div>
                <div className="text-2xl font-bold text-blue-900">
                  Rp {summary.currentBalance.toLocaleString('id-ID')}
                </div>
              </div>

              <div>
                <Label htmlFor="amount">
                  Nominal Pencairan <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="500000"
                  value={payoutForm.amount}
                  onChange={(e) => setPayoutForm({...payoutForm, amount: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Minimal Rp 100.000</p>
              </div>

              <div>
                <Label htmlFor="bank">
                  Bank <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={payoutForm.bank}
                  onValueChange={(value) => setPayoutForm({...payoutForm, bank: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="Mandiri">Mandiri</SelectItem>
                    <SelectItem value="BNI">BNI</SelectItem>
                    <SelectItem value="BRI">BRI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountNumber">
                  Nomor Rekening <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="1234567890"
                  value={payoutForm.accountNumber}
                  onChange={(e) => setPayoutForm({...payoutForm, accountNumber: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="accountName">
                  Nama Pemilik Rekening <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="accountName"
                  placeholder="Nama sesuai rekening"
                  value={payoutForm.accountName}
                  onChange={(e) => setPayoutForm({...payoutForm, accountName: e.target.value})}
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  <strong>Info:</strong> Proses payout membutuhkan waktu 1-2 hari kerja. Pastikan data rekening sudah benar.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowPayoutDialog(false)}>
                  Batal
                </Button>
                <Button onClick={handlePayoutRequest} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                  Ajukan Payout
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-2 border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              Rp {summary.currentBalance.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-gray-600">Saldo Saat Ini</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              Rp {summary.scheduledPayout.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-gray-600">Payout Terjadwal</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              Rp {summary.totalPayoutThisMonth.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-gray-600">Total Payout Bulan Ini</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="border-2 border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Riwayat Transaksi</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Tipe</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Referensi</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Jumlah</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">{trx.type}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono text-gray-600">{trx.reference}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${trx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trx.amount > 0 ? '+' : ''}Rp {Math.abs(trx.amount).toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={
                        trx.status === 'sukses' ? 'bg-green-100 text-green-700' :
                        trx.status === 'diproses' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }>
                        {trx.status === 'sukses' ? 'Sukses' : trx.status === 'diproses' ? 'Diproses' : 'Pending'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
