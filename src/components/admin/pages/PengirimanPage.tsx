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
import { Truck, Search, Plus, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { mockShipments, Shipment } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function PengirimanPage() {
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderId: '',
    courier: 'JNE' as Shipment['courier'],
    weight: '',
    destination: ''
  });

  const getStatusBadge = (status: Shipment['status']) => {
    const badges = {
      'pending': { label: 'Menunggu', variant: 'secondary' as const },
      'picked-up': { label: 'Diambil Kurir', variant: 'default' as const },
      'in-transit': { label: 'Dalam Pengiriman', variant: 'default' as const },
      'delivered': { label: 'Terkirim', variant: 'default' as const, className: 'bg-green-600' },
      'cancelled': { label: 'Dibatalkan', variant: 'destructive' as const }
    };
    return badges[status];
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateResi = () => {
    if (!formData.orderId || !formData.weight || !formData.destination) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    const trackingNumber = `NNS-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${formData.courier.substring(0, 3).toUpperCase()}`;
    const etaDays = Math.floor(Math.random() * 3) + 2;
    const eta = new Date(Date.now() + etaDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newShipment: Shipment = {
      id: `SHP${String(shipments.length + 1).padStart(3, '0')}`,
      orderId: formData.orderId,
      trackingNumber,
      courier: formData.courier,
      status: 'pending',
      origin: 'Jakarta',
      destination: formData.destination,
      weight: parseFloat(formData.weight),
      eta,
      customer: 'Customer ' + formData.orderId
    };

    setShipments([newShipment, ...shipments]);
    setCreateDialogOpen(false);
    setFormData({ orderId: '', courier: 'JNE', weight: '', destination: '' });
    
    toast.success('Resi berhasil dibuat!', {
      description: `Nomor Resi: ${trackingNumber}`
    });
  };

  const handleMarkDelivered = (id: string) => {
    setShipments(shipments.map(s => 
      s.id === id ? { ...s, status: 'delivered' as const, deliveryDate: new Date().toISOString().split('T')[0] } : s
    ));
    toast.success('Pengiriman ditandai sebagai terkirim');
  };

  const handleCancelShipment = (id: string) => {
    setShipments(shipments.map(s => 
      s.id === id ? { ...s, status: 'cancelled' as const } : s
    ));
    toast.success('Pengiriman dibatalkan');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pengiriman</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Kelola pengiriman dan tracking pesanan
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#16a34a] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Buat Resi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Resi Pengiriman</DialogTitle>
              <DialogDescription>
                Buat nomor resi baru untuk pesanan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="NA-2025-XXX"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courier">Kurir</Label>
                <Select
                  value={formData.courier}
                  onValueChange={(value: Shipment['courier']) => setFormData({ ...formData, courier: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JNE">JNE</SelectItem>
                    <SelectItem value="SiCepat">SiCepat</SelectItem>
                    <SelectItem value="Ninja">Ninja</SelectItem>
                    <SelectItem value="JNT">JNT</SelectItem>
                    <SelectItem value="AnterAja">AnterAja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Berat (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Tujuan</Label>
                <Input
                  id="destination"
                  placeholder="Bandung"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateResi} className="w-full">
                Generate Resi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari order ID, nomor resi, atau customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Daftar Pengiriman</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Nomor Resi</TableHead>
                <TableHead>Kurir</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tujuan</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    <Truck className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Tidak ada pengiriman ditemukan</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredShipments.map((shipment) => {
                  const statusBadge = getStatusBadge(shipment.status);
                  return (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.orderId}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {shipment.trackingNumber}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{shipment.courier}</Badge>
                      </TableCell>
                      <TableCell>{shipment.customer}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(shipment.eta).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant} className={statusBadge.className}>
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          {shipment.status === 'in-transit' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkDelivered(shipment.id)}
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </Button>
                          )}
                          {shipment.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelShipment(shipment.id)}
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Shipments Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredShipments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Truck className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>Tidak ada pengiriman ditemukan</p>
            </CardContent>
          </Card>
        ) : (
          filteredShipments.map((shipment) => {
            const statusBadge = getStatusBadge(shipment.status);
            return (
              <Card key={shipment.id}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{shipment.orderId}</p>
                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {shipment.trackingNumber}
                        </code>
                      </div>
                      <Badge variant={statusBadge.variant} className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kurir:</span>
                        <Badge variant="outline">{shipment.courier}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Customer:</span>
                        <span className="font-medium">{shipment.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tujuan:</span>
                        <span className="font-medium">{shipment.destination}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">ETA:</span>
                        <span className="font-medium">
                          {new Date(shipment.eta).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Lacak
                      </Button>
                      {shipment.status === 'in-transit' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleMarkDelivered(shipment.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          Terkirim
                        </Button>
                      )}
                      {shipment.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCancelShipment(shipment.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2 text-red-600" />
                          Batal
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
