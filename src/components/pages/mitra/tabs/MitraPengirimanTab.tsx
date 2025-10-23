import { useState } from 'react';
import { Truck, Plus, Package } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { toast } from 'sonner@2.0.3';

export function MitraPengirimanTab() {
  const [shipments, setShipments] = useState([
    { id: 1, orderId: 'ORD-1021', courier: 'Ninja', resi: 'NNS-4821-NJX', eta: '2025-01-23', status: 'dalam_perjalanan' },
    { id: 2, orderId: 'ORD-1020', courier: 'SiCepat', resi: 'NNS-4820-SCP', eta: '2025-01-22', status: 'terkirim' }
  ]);

  const [showResiDialog, setShowResiDialog] = useState(false);
  const [resiForm, setResiForm] = useState({
    orderId: '',
    courier: '',
    weight: ''
  });
  const [generatedResi, setGeneratedResi] = useState(null);

  const generateResi = () => {
    if (!resiForm.courier || !resiForm.weight) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    const courierCodes = { Ninja: 'NJX', SiCepat: 'SCP', JNE: 'JNE' };
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const resiNumber = `NNS-${randomNum}-${courierCodes[resiForm.courier]}`;
    
    const today = new Date();
    const etaDays = Math.floor(2 + Math.random() * 4); // 2-5 days
    const etaDate = new Date(today);
    etaDate.setDate(today.getDate() + etaDays);

    const newShipment = {
      id: shipments.length + 1,
      orderId: resiForm.orderId || `ORD-10${20 + shipments.length}`,
      courier: resiForm.courier,
      resi: resiNumber,
      eta: etaDate.toISOString().split('T')[0],
      status: 'menunggu_pickup'
    };

    setGeneratedResi(newShipment);
  };

  const saveResi = () => {
    if (generatedResi) {
      setShipments([generatedResi, ...shipments]);
      toast.success('Resi berhasil dibuat');
      setShowResiDialog(false);
      setResiForm({ orderId: '', courier: '', weight: '' });
      setGeneratedResi(null);
    }
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      menunggu_pickup: { label: 'Menunggu Pickup', color: 'bg-yellow-100 text-yellow-700' },
      dalam_perjalanan: { label: 'Dalam Perjalanan', color: 'bg-blue-100 text-blue-700' },
      terkirim: { label: 'Terkirim', color: 'bg-green-100 text-green-700' }
    };
    return configs[status] || configs.menunggu_pickup;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pengiriman</h2>
          <p className="text-gray-600">Kelola pengiriman dan buat resi</p>
        </div>

        <Dialog open={showResiDialog} onOpenChange={setShowResiDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Buat Resi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Resi Pengiriman</DialogTitle>
              <DialogDescription>
                Masukkan detail pesanan untuk membuat nomor resi pengiriman
              </DialogDescription>
            </DialogHeader>

            {!generatedResi ? (
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="orderId">Order ID (Opsional)</Label>
                  <Input
                    id="orderId"
                    placeholder="ORD-1023"
                    value={resiForm.orderId}
                    onChange={(e) => setResiForm({...resiForm, orderId: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="courier">
                    Pilih Kurir <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={resiForm.courier}
                    onValueChange={(value) => setResiForm({...resiForm, courier: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kurir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ninja">Ninja Express</SelectItem>
                      <SelectItem value="SiCepat">SiCepat</SelectItem>
                      <SelectItem value="JNE">JNE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="weight">
                    Berat (gram) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="1000"
                    value={resiForm.weight}
                    onChange={(e) => setResiForm({...resiForm, weight: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">Berat paket dalam gram</p>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowResiDialog(false)}>
                    Batal
                  </Button>
                  <Button onClick={generateResi} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                    Generate Resi
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <Package className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-900 mb-1">Resi Berhasil Dibuat</h3>
                  <p className="text-sm text-green-700 mb-4">Nomor resi telah digenerate</p>
                  
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Nomor Resi</div>
                    <div className="text-2xl font-bold text-gray-900 font-mono">{generatedResi.resi}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-left">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-500 mb-1">Kurir</div>
                      <div className="font-medium text-gray-900">{generatedResi.courier}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-500 mb-1">Estimasi Tiba</div>
                      <div className="font-medium text-gray-900">
                        {new Date(generatedResi.eta).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => {
                    setGeneratedResi(null);
                    setResiForm({ orderId: '', courier: '', weight: '' });
                  }}>
                    Buat Lagi
                  </Button>
                  <Button onClick={saveResi} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                    Simpan Resi
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-2 border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Kurir</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">No. Resi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">ETA</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {shipments.map((shipment) => {
                const statusConfig = getStatusConfig(shipment.status);
                return (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{shipment.orderId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{shipment.courier}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-900">{shipment.resi}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {new Date(shipment.eta).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          Lacak
                        </Button>
                        {shipment.status !== 'terkirim' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setShipments(shipments.map(s => 
                                s.id === shipment.id ? {...s, status: 'terkirim'} : s
                              ));
                              toast.success('Status diperbarui: Terkirim');
                            }}
                          >
                            Tandai Terkirim
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
