import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
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
import { Users, Plus, Mail, Shield } from 'lucide-react';
import { mockAdminUsers, AdminUser } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function PenggunaPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff'
  });

  const getRoleBadge = (role: string) => {
    const badges = {
      'Super Admin': { variant: 'default' as const, className: 'bg-purple-600' },
      'Manager': { variant: 'default' as const, className: 'bg-blue-600' },
      'Staff': { variant: 'default' as const, className: 'bg-green-600' }
    };
    return badges[role as keyof typeof badges] || badges['Staff'];
  };

  const handleInviteUser = () => {
    if (!formData.name || !formData.email) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    const newUser: AdminUser = {
      id: `AU${String(users.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    setDialogOpen(false);
    setFormData({ name: '', email: '', role: 'Staff' });
    
    toast.success('Undangan berhasil dikirim!', {
      description: `Email undangan telah dikirim ke ${formData.email}`
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pengguna & Peran</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Kelola admin dan hak akses sistem
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#16a34a] hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Undang Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Undang Pengguna Baru</DialogTitle>
              <DialogDescription>
                Kirim undangan untuk bergabung sebagai admin
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Peran *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleInviteUser} className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Kirim Undangan
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
              <div className="p-3 bg-purple-50 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.role === 'Super Admin').length}
                </p>
                <p className="text-sm text-gray-500">Super Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.role === 'Manager').length}
                </p>
                <p className="text-sm text-gray-500">Manager</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.role === 'Staff').length}
                </p>
                <p className="text-sm text-gray-500">Staff</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Login Terakhir</TableHead>
                <TableHead>Bergabung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const roleBadge = getRoleBadge(user.role);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-gradient-to-br from-[#D4AF37] to-[#16a34a] text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={roleBadge.variant} className={roleBadge.className}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-600">
                        Aktif
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString('id-ID') : '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Users Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {users.map((user) => {
          const roleBadge = getRoleBadge(user.role);
          return (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#16a34a] text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={roleBadge.variant} className={roleBadge.className}>
                          {user.role}
                        </Badge>
                        <Badge variant="default" className="bg-green-600">
                          Aktif
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    {user.lastLogin && (
                      <p>Login terakhir: {new Date(user.lastLogin).toLocaleString('id-ID')}</p>
                    )}
                    <p>Bergabung: {new Date(user.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matrix Izin</CardTitle>
          <CardDescription>Hak akses untuk setiap peran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Modul</th>
                  <th className="text-center py-3 px-2">Super Admin</th>
                  <th className="text-center py-3 px-2">Manager</th>
                  <th className="text-center py-3 px-2">Staff</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { name: 'Dashboard', superAdmin: true, manager: true, staff: true },
                  { name: 'Produk', superAdmin: true, manager: true, staff: false },
                  { name: 'Pesanan', superAdmin: true, manager: true, staff: true },
                  { name: 'Pengiriman', superAdmin: true, manager: true, staff: true },
                  { name: 'Voucher', superAdmin: true, manager: true, staff: false },
                  { name: 'Ulasan', superAdmin: true, manager: true, staff: true },
                  { name: 'Pengguna', superAdmin: true, manager: false, staff: false },
                  { name: 'Keuangan', superAdmin: true, manager: true, staff: false },
                  { name: 'Laporan', superAdmin: true, manager: true, staff: false },
                  { name: 'Pengaturan', superAdmin: true, manager: false, staff: false }
                ].map((module, index) => (
                  <tr key={index}>
                    <td className="py-3 px-2 font-medium">{module.name}</td>
                    <td className="py-3 px-2 text-center">
                      {module.superAdmin && <span className="text-green-600">✓</span>}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {module.manager && <span className="text-green-600">✓</span>}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {module.staff && <span className="text-green-600">✓</span>}
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
