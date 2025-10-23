import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone, User, CheckCircle2, ShieldCheck, Sparkles, Award, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

export function LoginPage({ onLogin, onAdminLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Admin credentials - whitelisted admin emails
  const ADMIN_EMAILS = [
    'admin@nanasu.com',
    'manager@nanasu.com',
    'cs@nanasu.com',
    'editor@nanasu.com'
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (loginForm.email && loginForm.password) {
        // Check if email is admin
        const isAdmin = ADMIN_EMAILS.includes(loginForm.email.toLowerCase());
        
        if (isAdmin) {
          toast.success('Admin login successful! Welcome to Admin Panel', {
            duration: 2000,
            description: 'Redirecting to admin dashboard...'
          });
          if (onAdminLogin) {
            onAdminLogin({
              email: loginForm.email,
              role: 'admin'
            });
          }
        } else {
          toast.success('Login berhasil! Selamat datang di NANASU', {
            duration: 2000,
          });
          onLogin({
            name: loginForm.email.split('@')[0] || 'User',
            email: loginForm.email,
            phone: '081234567890',
            role: 'customer'
          });
        }
      } else {
        toast.error('Mohon lengkapi email dan password');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Password tidak cocok');
      setIsLoading(false);
      return;
    }
    
    if (registerForm.password.length < 6) {
      toast.error('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }
    
    setTimeout(() => {
      if (registerForm.name && registerForm.email && registerForm.phone && registerForm.password) {
        toast.success('Registrasi berhasil! Selamat datang di NANASU', {
          duration: 3000,
        });
        // Auto login after register
        onLogin({
          name: registerForm.name,
          email: registerForm.email,
          phone: registerForm.phone
        });
      } else {
        toast.error('Mohon lengkapi semua field');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Modern Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1718653763578-361e60a5323b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBwbGFudGF0aW9uJTIwZmFybXxlbnwxfHx8fDE3NjA5NjkzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay for better text readability - NANASU Gold Theme */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.88) 0%, rgba(22, 163, 74, 0.85) 50%, rgba(139, 107, 18, 0.80) 100%)',
          }}
        />

        {/* Animated Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.5) 0%, rgba(22, 163, 74, 0.5) 50%, rgba(250, 204, 21, 0.5) 100%)',
            animation: 'pulse-subtle 6s ease-in-out infinite',
          }}
        />

        {/* Animated Orbs - NANASU Brand Colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.7) 0%, transparent 70%)',
              animation: 'float 10s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(22, 163, 74, 0.6) 0%, transparent 70%)',
              animation: 'float 12s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(250, 204, 21, 0.6) 0%, transparent 70%)',
              animation: 'pulse-subtle 8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-end justify-between py-8 px-10 w-full">
          {/* Logo & Header */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 mb-8">
              <div>
                <h1 
                  className="text-2xl tracking-tight text-right"
                  style={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FACC15 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  NANASU
                </h1>
                <p className="text-white/80 text-xs text-right">Nanas Asli Subang</p>
              </div>
              <div 
                className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-white/20 backdrop-blur-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                <img 
                  src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                  alt="NANASU Logo"
                  className="w-10 h-10 object-contain"
                />
                <div 
                  className="absolute -top-1 -right-1"
                  style={{ animation: 'pulse-subtle 2s ease-in-out infinite' }}
                >
                  <Sparkles className="w-4 h-4 text-[#FACC15]" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-md space-y-4">
              <div className="text-right">
                <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
                  Marketplace Nanas<br />Premium Indonesia
                </h2>
                <p className="text-base text-white/80 leading-relaxed">
                  Nikmati nanas segar langsung dari kebun Subang ke rumah Anda. 
                  Kualitas terjamin, harga terbaik.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2.5 pt-2">
                {[
                  { 
                    icon: Sparkles, 
                    text: '100% Nanas Asli Subang',
                    color: 'rgba(22, 163, 74, 0.25)',
                    iconColor: '#16A34A'
                  },
                  { 
                    icon: ShieldCheck, 
                    text: 'Garansi Kesegaran Produk',
                    color: 'rgba(212, 175, 55, 0.25)',
                    iconColor: '#D4AF37'
                  },
                  { 
                    icon: Zap, 
                    text: 'Gratis Ongkir Seluruh Indonesia',
                    color: 'rgba(250, 204, 21, 0.25)',
                    iconColor: '#FACC15'
                  },
                  { 
                    icon: Award, 
                    text: 'Harga Langsung dari Petani',
                    color: 'rgba(212, 175, 55, 0.25)',
                    iconColor: '#D4AF37'
                  }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 backdrop-blur-sm rounded-xl p-2.5 transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      animation: 'fadeIn 0.6s ease-out',
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'backwards',
                    }}
                  >
                    <div 
                      className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: feature.color }}
                    >
                      <feature.icon className="w-4 h-4" style={{ color: feature.iconColor }} strokeWidth={2.5} />
                    </div>
                    <span className="text-white font-medium text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-white/60 text-xs text-right">
            <p>© 2025 NANASU - Platform E-Commerce Nanas Premium</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-[--bg-default] overflow-y-auto min-h-screen">
        <div className="w-full max-w-md my-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6 mt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 relative">
              <div 
                className="absolute -inset-4 md:inset-0 rounded-2xl opacity-10"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #16A34A 50%, #FACC15 100%)',
                }}
              />
              <img 
                src="https://i.ibb.co.com/cSsm0T6w/nanasu-removebg-preview.png" 
                alt="NANASU Logo"
                className="w-16 h-16 md:w-14 md:h-14 object-contain relative z-10"
              />
            </div>
            <h1 
              className="text-2xl mb-1 tracking-tight"
              style={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #D4AF37 0%, #16A34A 50%, #FACC15 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              NANASU
            </h1>
            <p className="text-[--text-secondary] text-sm">Nanas Asli Subang</p>
          </div>

          {/* Form Header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-[--text-primary] mb-2">
              {isLogin ? 'Selamat Datang!' : 'Buat Akun Baru'}
            </h2>
            <p className="text-[--text-secondary] text-sm">
              {isLogin 
                ? 'Masuk untuk melanjutkan belanja nanas premium' 
                : 'Daftar sekarang dan dapatkan penawaran eksklusif'
              }
            </p>
          </div>

          {/* Forms */}
          {isLogin ? (
            // Login Form
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[--text-primary] text-sm">
                  Alamat Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[--text-primary] text-sm">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[--text-tertiary] hover:text-[--text-primary] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-[--border-default] text-[--brand-default] focus:ring-[--brand-default] focus:ring-2 cursor-pointer" 
                  />
                  <span className="text-sm text-[--text-secondary] group-hover:text-[--text-primary] transition-colors">
                    Ingat saya
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[--brand-default] hover:text-[--brand-hover] font-medium hover:underline transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              <div className="pt-2">
                <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative text-sm"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #16A34A 100%)',
                  color: 'white',
                }}
              >
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite',
                  }}
                />
                
                {isLoading ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <span>Masuk Sekarang</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
              </div>

              {/* Admin Demo Credentials */}

            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[--text-primary] text-sm">
                  Nama Lengkap
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-email" className="text-[--text-primary] text-sm">
                  Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-[--text-primary] text-sm">
                  Nomor HP
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08123456789"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="pl-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="reg-password" className="text-[--text-primary] text-sm">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimal 6 karakter"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[--text-tertiary] hover:text-[--text-primary] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-[--text-primary] text-sm">
                  Konfirmasi Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[--text-tertiary] group-focus-within:text-[--brand-default] transition-colors" strokeWidth={2} />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Ulangi password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10 pr-10 h-11 bg-[--input-background] border-[--border-default] focus:border-[--brand-default] focus:ring-2 focus:ring-[--brand-default]/20 transition-all text-[--text-primary] placeholder:text-[--text-tertiary] text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[--text-tertiary] hover:text-[--text-primary] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 mt-0.5 rounded border-[--border-default] text-[--brand-default] focus:ring-[--brand-default] focus:ring-2 cursor-pointer" 
                    required 
                  />
                  <span className="text-sm text-[--text-secondary] group-hover:text-[--text-primary] transition-colors leading-relaxed">
                    Saya setuju dengan{' '}
                    <span className="text-[--brand-default] hover:text-[--brand-hover] hover:underline cursor-pointer">
                      Syarat & Ketentuan
                    </span>
                    {' '}dan{' '}
                    <span className="text-[--brand-default] hover:text-[--brand-hover] hover:underline cursor-pointer">
                      Kebijakan Privasi
                    </span>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative text-sm"
                style={{
                  background: 'linear-gradient(135deg, #16A34A 0%, #D4AF37 100%)',
                  color: 'white',
                }}
              >
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite',
                  }}
                />
                
                {isLoading ? (
                  <div className="flex items-center gap-2 relative z-10">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mendaftar...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>
          )}

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[--text-secondary]">
              {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1.5 text-[--brand-default] hover:text-[--brand-hover] font-semibold hover:underline transition-colors"
              >
                {isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
              </button>
            </p>
          </div>

          {/* Security Badge */}
          <div 
            className="mt-5 p-3 rounded-lg border text-center"
            style={{
              background: 'rgba(212, 175, 55, 0.05)',
              borderColor: 'rgba(212, 175, 55, 0.2)',
            }}
          >
            <div className="flex items-center justify-center gap-2 text-[--brand-default]">
              <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-xs font-medium">
                Data Anda Aman & Terenkripsi
              </span>
            </div>
          </div>

          {/* Footer Links - Mobile Only */}
          <div className="lg:hidden mt-4 text-center space-y-1">
            <div className="text-[10px] text-[--text-tertiary]">
              <span className="text-[--brand-default] hover:text-[--brand-hover] hover:underline cursor-pointer">
                Syarat & Ketentuan
              </span>
              {' • '}
              <span className="text-[--brand-default] hover:text-[--brand-hover] hover:underline cursor-pointer">
                Kebijakan Privasi
              </span>
            </div>
            <p className="text-[10px] text-[--text-tertiary]">
              © 2025 NANASU - Platform E-Commerce Nanas Premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
