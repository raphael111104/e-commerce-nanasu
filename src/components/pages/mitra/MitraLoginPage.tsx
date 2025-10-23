import { useState } from 'react';
import { ArrowLeft, Mail, Key, Lock, Store, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';
import { toast } from 'sonner@2.0.3';

interface MitraLoginPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  onLoginSuccess: () => void;
}

export function MitraLoginPage({ onNavigate, onBack, onLoginSuccess }: MitraLoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    mitraCode: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!formData.email || !formData.mitraCode || !formData.password) {
      setError('Semua field harus diisi');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);

    // Simulasi login (dalam produksi, ini akan memanggil API)
    setTimeout(() => {
      // Demo credentials
      if (formData.email === 'mitra@nanasu.com' && 
          formData.mitraCode === 'MTR001' && 
          formData.password === 'mitra123') {
        toast.success('Login berhasil! Selamat datang di Dashboard Mitra');
        onLoginSuccess();
        onNavigate('mitra-dashboard');
      } else {
        setError('Email, kode mitra, atau password salah');
        toast.error('Login gagal. Periksa kembali kredensial Anda');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16A34A]/5 via-white to-[#D4AF37]/5 flex items-center justify-center p-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardHeader className="space-y-3 text-center pb-6">
          {/* Logo/Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#16A34A] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-lg">
            <Store className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <CardTitle className="text-2xl md:text-3xl">Login Mitra</CardTitle>
            <CardDescription className="text-base mt-2">
              Masuk ke Dashboard Mitra NANASU
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#16A34A]" />
                Email Mitra
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="mitra@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-11"
                disabled={isLoading}
              />
            </div>

            {/* Kode Mitra Field */}
            <div className="space-y-2">
              <Label htmlFor="mitraCode" className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#D4AF37]" />
                Kode Unik Mitra
              </Label>
              <Input
                id="mitraCode"
                type="text"
                placeholder="MTR001"
                value={formData.mitraCode}
                onChange={(e) => handleChange('mitraCode', e.target.value.toUpperCase())}
                className="h-11 font-mono"
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-600" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="h-11"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-[#16A34A] to-[#16A34A]/90 hover:from-[#16A34A]/90 hover:to-[#16A34A]/80 text-white shadow-md"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk Dashboard'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Belum menjadi mitra?
            </p>
            <Button
              variant="outline"
              onClick={() => onNavigate('mitra-onboarding')}
              className="w-full border-2 border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A] hover:text-white"
              disabled={isLoading}
            >
              Daftar Mitra Sekarang
            </Button>
          </div>

          {/* Demo Credentials */}

        </CardContent>
      </Card>
    </div>
  );
}
