import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Store, CreditCard, Truck, Settings as SettingsIcon } from 'lucide-react';
import { mockSettings, StoreSetting } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function PengaturanPage() {
  const [settings, setSettings] = useState<StoreSetting[]>(mockSettings);

  const getSetting = (key: string) => {
    return settings.find(s => s.key === key);
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(settings.map(s => 
      s.key === key ? { ...s, value } : s
    ));
  };

  const handleSave = () => {
    toast.success('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Kelola konfigurasi toko dan sistem
        </p>
      </div>

      <Tabs defaultValue="brand" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="brand">
            <Store className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Brand</span>
          </TabsTrigger>
          <TabsTrigger value="store">
            <SettingsIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Toko</span>
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Pembayaran</span>
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Pengiriman</span>
          </TabsTrigger>
        </TabsList>

        {/* Brand Settings */}
        <TabsContent value="brand" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identitas Brand</CardTitle>
              <CardDescription>Informasi dasar tentang toko Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store_name">Nama Toko</Label>
                <Input
                  id="store_name"
                  value={getSetting('store_name')?.value || ''}
                  onChange={(e) => updateSetting('store_name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={getSetting('tagline')?.value || ''}
                  onChange={(e) => updateSetting('tagline', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store_email">Email Toko</Label>
                  <Input
                    id="store_email"
                    type="email"
                    value={getSetting('store_email')?.value || ''}
                    onChange={(e) => updateSetting('store_email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store_phone">Telepon</Label>
                  <Input
                    id="store_phone"
                    value={getSetting('store_phone')?.value || ''}
                    onChange={(e) => updateSetting('store_phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo & Favicon</CardTitle>
              <CardDescription>Upload logo dan favicon toko</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo Header</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png"
                      alt="Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png"
                      alt="Favicon"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <Button variant="outline">Upload Favicon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Toko</CardTitle>
              <CardDescription>Pengaturan operasional toko</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup_address">Alamat Pickup</Label>
                <Textarea
                  id="pickup_address"
                  rows={3}
                  value={getSetting('pickup_address')?.value || ''}
                  onChange={(e) => updateSetting('pickup_address', e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Alamat ini akan digunakan untuk pickup kurir
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operating_hours">Jam Operasional</Label>
                  <Input
                    id="operating_hours"
                    value={getSetting('operating_hours')?.value || ''}
                    onChange={(e) => updateSetting('operating_hours', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse_location">Lokasi Gudang</Label>
                  <Input
                    id="warehouse_location"
                    value={getSetting('warehouse_location')?.value || ''}
                    onChange={(e) => updateSetting('warehouse_location', e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Pembayaran</CardTitle>
              <CardDescription>Konfigurasi metode pembayaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-500">Aktifkan pembayaran COD</p>
                </div>
                <Switch
                  checked={getSetting('cod_enabled')?.value || false}
                  onCheckedChange={(checked) => updateSetting('cod_enabled', checked)}
                />
              </div>
              {getSetting('cod_enabled')?.value && (
                <div className="space-y-2">
                  <Label htmlFor="min_cod_amount">Minimum Pembelian COD (Rp)</Label>
                  <Input
                    id="min_cod_amount"
                    type="number"
                    value={getSetting('min_cod_amount')?.value || 0}
                    onChange={(e) => updateSetting('min_cod_amount', parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="payment_gateway">Payment Gateway</Label>
                <Select
                  value={getSetting('payment_gateway')?.value || 'Midtrans'}
                  onValueChange={(value) => updateSetting('payment_gateway', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Midtrans">Midtrans</SelectItem>
                    <SelectItem value="Xendit">Xendit</SelectItem>
                    <SelectItem value="Manual">Manual Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Akun Pembayaran</CardTitle>
              <CardDescription>Konfigurasi akun untuk menerima pembayaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Midtrans</p>
                      <p className="text-sm text-gray-500">Payment Gateway</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-600">Aktif</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Konfigurasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Pengiriman</CardTitle>
              <CardDescription>Konfigurasi kurir dan SLA pengiriman</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="free_shipping_threshold">Gratis Ongkir Minimal (Rp)</Label>
                <Input
                  id="free_shipping_threshold"
                  type="number"
                  value={getSetting('free_shipping_threshold')?.value || 0}
                  onChange={(e) => updateSetting('free_shipping_threshold', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-gray-500">
                  Minimum pembelian untuk mendapat gratis ongkir
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default_courier">Kurir Default</Label>
                <Select
                  value={getSetting('default_courier')?.value || 'JNE'}
                  onValueChange={(value) => updateSetting('default_courier', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JNE">JNE</SelectItem>
                    <SelectItem value="SiCepat">SiCepat</SelectItem>
                    <SelectItem value="Ninja">Ninja Express</SelectItem>
                    <SelectItem value="JNT">J&T Express</SelectItem>
                    <SelectItem value="AnterAja">AnterAja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sla_target_days">Target SLA Pengiriman (Hari)</Label>
                <Input
                  id="sla_target_days"
                  type="number"
                  value={getSetting('sla_target_days')?.value || 3}
                  onChange={(e) => updateSetting('sla_target_days', parseInt(e.target.value) || 3)}
                />
              </div>
              <div className="pt-4">
                <Button onClick={handleSave}>Simpan Perubahan</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kurir Aktif</CardTitle>
              <CardDescription>Pilih kurir yang tersedia untuk pelanggan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {['JNE', 'SiCepat', 'Ninja Express', 'J&T Express', 'AnterAja'].map((courier) => (
                <div key={courier} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{courier}</p>
                      <p className="text-xs text-gray-500">Estimasi 2-3 hari</p>
                    </div>
                  </div>
                  <Switch defaultChecked={['JNE', 'SiCepat', 'Ninja Express'].includes(courier)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
