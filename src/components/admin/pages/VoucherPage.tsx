import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Tag, Plus, Edit, Trash2, Copy } from 'lucide-react';
import { mockVouchers, Voucher } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function VoucherPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Voucher>>({
    code: '',
    type: 'percent',
    value: 0,
    minPurchase: 0,
    startDate: '',
    endDate: '',
    usageLimit: 100,
    usageCount: 0,
    status: 'draft'
  });

  const getStatusBadge = (status: Voucher['status']) => {
    const badges = {
      'active': { label: 'Aktif', variant: 'default' as const, className: 'bg-green-600' },
      'expired': { label: 'Kadaluarsa', variant: 'secondary' as const },
      'draft': { label: 'Draft', variant: 'secondary' as const }
    };
    return badges[status];
  };

  const getTypeBadge = (type: Voucher['type']) => {
    const types = {
      'percent': { label: 'Persentase', icon: '%' },
      'fixed': { label: 'Nominal', icon: 'Rp' },
      'free-shipping': { label: 'Gratis Ongkir', icon: '🚚' }
    };
    return types[type];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.startDate || !formData.endDate) {
      toast.error('Mohon lengkapi semua field wajib');
      return;
    }

    const newVoucher: Voucher = {
      id: `V${String(vouchers.length + 1).padStart(3, '0')}`,
      code: formData.code!,
      type: formData.type as Voucher['type'],
      value: formData.value || 0,
      minPurchase: formData.minPurchase || 0,
      maxDiscount: formData.maxDiscount,
      startDate: formData.startDate!,
      endDate: formData.endDate!,
      usageLimit: formData.usageLimit || 100,
      usageCount: 0,
      status: 'active'
    };

    setVouchers([newVoucher, ...vouchers]);
    setDialogOpen(false);
    setFormData({
      code: '',
      type: 'percent',
      value: 0,
      minPurchase: 0,
      startDate: '',
      endDate: '',
      usageLimit: 100,
      usageCount: 0,
      status: 'draft'
    });
    
    toast.success('Voucher berhasil dibuat!', {
      description: `Kode: ${newVoucher.code}`
    });
  };

  const handleDelete = (id: string) => {
    setVouchers(vouchers.filter(v => v.id !== id));
    toast.success('Voucher berhasil dihapus');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Kode voucher disalin!');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Voucher</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Kelola kode promo dan voucher diskon
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#16a34a] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Buat Voucher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Buat Voucher Baru</DialogTitle>
              <DialogDescription>
                Buat kode voucher untuk kampanye promo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="code">Kode Voucher *</Label>
                  <Input
                    id="code"
                    placeholder="NANASU10"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="type">Tipe Diskon *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: Voucher['type']) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Potongan Persentase</SelectItem>
                      <SelectItem value="fixed">Potongan Nominal</SelectItem>
                      <SelectItem value="free-shipping">Gratis Ongkir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.type !== 'free-shipping' && (
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="value">
                      Nilai {formData.type === 'percent' ? 'Diskon (%)' : 'Diskon (Rp)'} *
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder={formData.type === 'percent' ? '10' : '50000'}
                      value={formData.value || ''}
                      onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                )}
                {formData.type === 'percent' && (
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="maxDiscount">Maksimal Diskon (Rp)</Label>
                    <Input
                      id="maxDiscount"
                      type="number"
                      placeholder="50000"
                      value={formData.maxDiscount || ''}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: parseInt(e.target.value) })}
                    />
                  </div>
                )}
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="minPurchase">Minimum Pembelian (Rp) *</Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    placeholder="100000"
                    value={formData.minPurchase || ''}
                    onChange={(e) => setFormData({ ...formData, minPurchase: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Tanggal Mulai *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Tanggal Berakhir *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="usageLimit">Kuota Penggunaan *</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    placeholder="100"
                    value={formData.usageLimit || ''}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 100 })}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Buat Voucher
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vouchers.filter(v => v.status === 'active').length}</p>
                <p className="text-sm text-gray-500">Voucher Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {vouchers.reduce((sum, v) => sum + v.usageCount, 0)}
                </p>
                <p className="text-sm text-gray-500">Total Penggunaan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Tag className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vouchers.filter(v => v.status === 'expired').length}</p>
                <p className="text-sm text-gray-500">Kadaluarsa</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vouchers Table - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Daftar Voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Min. Belanja</TableHead>
                <TableHead>Kuota</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vouchers.map((voucher) => {
                const statusBadge = getStatusBadge(voucher.status);
                const typeBadge = getTypeBadge(voucher.type);
                return (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-semibold text-[#D4AF37]">
                          {voucher.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(voucher.code)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{typeBadge.label}</Badge>
                    </TableCell>
                    <TableCell>
                      {voucher.type === 'free-shipping' ? (
                        <span className="text-sm">Gratis Ongkir</span>
                      ) : voucher.type === 'percent' ? (
                        <span className="text-sm">{voucher.value}%</span>
                      ) : (
                        <span className="text-sm">{formatCurrency(voucher.value)}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{formatCurrency(voucher.minPurchase)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className={voucher.usageCount >= voucher.usageLimit ? 'text-red-600' : ''}>
                          {voucher.usageCount}
                        </span>
                        <span className="text-gray-400"> / {voucher.usageLimit}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(voucher.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      {' - '}
                      {new Date(voucher.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant} className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(voucher.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vouchers Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {vouchers.map((voucher) => {
          const statusBadge = getStatusBadge(voucher.status);
          const typeBadge = getTypeBadge(voucher.type);
          return (
            <Card key={voucher.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <code className="font-mono font-semibold text-[#D4AF37]">
                        {voucher.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(voucher.code)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <Badge variant={statusBadge.variant} className={statusBadge.className}>
                      {statusBadge.label}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tipe:</span>
                      <Badge variant="outline">{typeBadge.label}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nilai:</span>
                      <span className="font-medium">
                        {voucher.type === 'free-shipping' ? 'Gratis Ongkir' :
                         voucher.type === 'percent' ? `${voucher.value}%` :
                         formatCurrency(voucher.value)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Min. Belanja:</span>
                      <span className="font-medium">{formatCurrency(voucher.minPurchase)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Kuota:</span>
                      <span className="font-medium">
                        {voucher.usageCount} / {voucher.usageLimit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Periode:</span>
                      <span className="font-medium text-xs">
                        {new Date(voucher.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        {' - '}
                        {new Date(voucher.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(voucher.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                      Hapus
                    </Button>
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
