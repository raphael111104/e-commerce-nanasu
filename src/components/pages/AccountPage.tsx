import { useState } from 'react';
import { 
  User, MapPin, CreditCard, Gift, Star, Settings, LogOut, Edit, ChevronRight,
  Bell, Heart, ShoppingBag, HelpCircle, Shield, Languages, Palette, Users,
  Lock, Smartphone, Mail, Phone, Camera, Eye, EyeOff, Copy, Check, Trash2,
  Plus, X, AlertCircle, Clock, Download, Upload, Share2, Link2, Globe,
  Wallet, Package, FileText, MessageCircle, Volume2, Sun, Moon, Monitor,
  ChevronDown, Search, Filter, Calendar, TrendingUp, Award, Zap, Target,
  Home, Briefcase, MapPinned, QrCode, CreditCard as CardIcon, Banknote
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { toast } from 'sonner@2.0.3';
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';

// ============================================================================
// TYPE DEFINITIONS & INTERFACES
// ============================================================================

interface Address {
  id: number;
  label: 'Rumah' | 'Kantor' | 'Lainnya';
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
  coordinates?: { lat: number; lng: number };
}

interface PaymentMethod {
  id: number;
  type: 'e-wallet' | 'bank' | 'card';
  provider: string;
  identifier: string; // masked
  isDefault: boolean;
  icon: string;
}

interface LoyaltyTransaction {
  id: number;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  date: string;
}

interface Notification {
  id: number;
  category: 'promo' | 'order' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface Voucher {
  id: number;
  code: string;
  title: string;
  discount: string;
  minPurchase: number;
  expiry: string;
  used: boolean;
  terms: string;
}

interface DeviceSession {
  id: string;
  browser: string;
  os: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface ReturnRequest {
  id: number;
  orderId: string;
  productName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: string;
  images: string[];
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AccountPage({ user, onLogout, onNavigate }) {
  // ========================
  // STATE MANAGEMENT
  // ========================
  const [currentView, setCurrentView] = useState<'main' | 'profile' | 'security' | 'addresses' | 'payments' | 'notifications' | 'wishlist' | 'loyalty' | 'orders' | 'help' | 'preferences' | 'referral' | 'privacy' | 'connected'>('main');
  
  // Profile & Security
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Ahmad Subandi',
    email: user?.email || 'ahmad.subandi@email.com',
    phone: user?.phone || '081234567890',
    avatar: null as string | null,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: 'Rumah',
      name: 'Ahmad Subandi',
      phone: '081234567890',
      address: 'Jl. Raya Subang No. 123',
      district: 'Subang Kota',
      city: 'Subang',
      province: 'Jawa Barat',
      postalCode: '41211',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Kantor',
      name: 'Ahmad Subandi',
      phone: '081234567890',
      address: 'Jl. Merdeka No. 456',
      district: 'Kalijati',
      city: 'Subang',
      province: 'Jawa Barat',
      postalCode: '41271',
      isDefault: false,
    },
  ]);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: 'e-wallet', provider: 'GoPay', identifier: '0812****7890', isDefault: true, icon: '💚' },
    { id: 2, type: 'e-wallet', provider: 'OVO', identifier: '0812****7890', isDefault: false, icon: '💜' },
    { id: 3, type: 'bank', provider: 'BCA', identifier: '****1234', isDefault: false, icon: '🏦' },
  ]);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, category: 'promo', title: 'Diskon 25% Nanas Segar!', message: 'Dapatkan diskon spesial untuk semua varian nanas segar', date: '2 jam lalu', read: false },
    { id: 2, category: 'order', title: 'Pesanan Dikirim', message: 'Pesanan #NS2025001 sedang dalam perjalanan', date: '5 jam lalu', read: false },
    { id: 3, category: 'system', title: 'Update Aplikasi', message: 'Versi baru aplikasi NANASU tersedia', date: '1 hari lalu', read: true },
  ]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: { promo: true, order: true, system: true },
    sms: { promo: false, order: true, system: false },
    push: { promo: true, order: true, system: true },
  });

  // Loyalty & Points
  const [loyaltyPoints, setLoyaltyPoints] = useState(2450);
  const [loyaltyLevel, setLoyaltyLevel] = useState<'Bronze' | 'Silver' | 'Gold'>('Bronze');
  const [loyaltyTransactions, setLoyaltyTransactions] = useState<LoyaltyTransaction[]>([
    { id: 1, type: 'earn', points: 150, description: 'Pembelian Nanas Segar Premium', date: '15 Jan 2025' },
    { id: 2, type: 'redeem', points: -500, description: 'Tukar Voucher Diskon 20%', date: '10 Jan 2025' },
    { id: 3, type: 'earn', points: 200, description: 'Bonus Referral', date: '5 Jan 2025' },
  ]);

  // Vouchers
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: 1,
      code: 'NANASU20',
      title: 'Diskon 20% Nanas Segar',
      discount: '20%',
      minPurchase: 100000,
      expiry: '31 Jan 2025',
      used: false,
      terms: 'Berlaku untuk pembelian nanas segar minimal Rp 100.000. Tidak dapat digabungkan dengan promo lain.',
    },
    {
      id: 2,
      code: 'FREEONGKIR',
      title: 'Gratis Ongkir',
      discount: 'Rp 15.000',
      minPurchase: 75000,
      expiry: '28 Feb 2025',
      used: false,
      terms: 'Gratis ongkir hingga Rp 15.000 untuk minimal pembelian Rp 75.000.',
    },
  ]);

  // Device Sessions
  const [deviceSessions, setDeviceSessions] = useState<DeviceSession[]>([
    { id: '1', browser: 'Chrome 120', os: 'Windows 11', location: 'Subang, Jawa Barat', lastActive: 'Aktif sekarang', isCurrent: true },
    { id: '2', browser: 'Safari 17', os: 'iPhone 15', location: 'Jakarta, DKI Jakarta', lastActive: '2 jam lalu', isCurrent: false },
  ]);

  // App Preferences
  const [language, setLanguage] = useState('id');
  const [currency, setCurrency] = useState('IDR');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [reduceAnimations, setReduceAnimations] = useState(false);

  // Referral
  const [referralCode, setReferralCode] = useState('NANASU-AS2025');
  const [referralCount, setReferralCount] = useState(5);

  // Privacy
  const [cookieConsent, setCookieConsent] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  // Connected Accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    facebook: false,
    apple: false,
  });

  // Loading states
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ========================
  // HELPER FUNCTIONS
  // ========================

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(passwordData.new);
  const passwordStrengthLabel = 
    passwordStrength === 0 ? '' :
    passwordStrength <= 25 ? 'Lemah' :
    passwordStrength <= 50 ? 'Sedang' :
    passwordStrength <= 75 ? 'Kuat' : 'Sangat Kuat';

  const passwordStrengthColor =
    passwordStrength <= 25 ? 'bg-red-500' :
    passwordStrength <= 50 ? 'bg-orange-500' :
    passwordStrength <= 75 ? 'bg-yellow-500' : 'bg-green-500';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Kode berhasil disalin!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEditProfileOpen(false);
      toast.success('Profil berhasil diperbarui!');
    }, 1500);
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('Password baru tidak cocok!');
      return;
    }
    if (passwordStrength < 50) {
      toast.error('Password terlalu lemah! Gunakan kombinasi huruf, angka, dan simbol.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setChangePasswordOpen(false);
      setPasswordData({ current: '', new: '', confirm: '' });
      toast.success('Password berhasil diubah!');
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otpValue.length !== 6) {
      toast.error('Masukkan kode OTP 6 digit!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerifyOTPOpen(false);
      setOtpValue('');
      toast.success('Verifikasi berhasil!');
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtpTimer(60);
    toast.success('Kode OTP baru telah dikirim!');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'HAPUS') {
      toast.error('Ketik "HAPUS" untuk konfirmasi!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Akun berhasil dihapus');
      onLogout();
    }, 2000);
  };

  const handleSaveAddress = (address: Address) => {
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === address.id ? address : a));
      toast.success('Alamat berhasil diperbarui!');
    } else {
      setAddresses([...addresses, { ...address, id: Date.now() }]);
      toast.success('Alamat berhasil ditambahkan!');
    }
    setAddressFormOpen(false);
    setEditingAddress(null);
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    toast.success('Alamat utama berhasil diubah!');
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success('Alamat berhasil dihapus!');
  };

  // ========================
  // RENDER MAIN MENU
  // ========================

  if (currentView === 'main') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 page-transition pb-24 md:pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 fade-in">Akun Saya</h1>

        {/* Profile Header */}
        <Card className="mb-6 fade-in hover:shadow-lg transition-shadow">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <Avatar className="w-20 h-20 md:w-24 md:h-24">
                <AvatarImage src={profileData.avatar || undefined} />
                <AvatarFallback className="text-2xl bg-[#FACC15] text-[#1F2937]">
                  {profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="mb-3 md:mb-0">
                    <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                    <p className="text-sm text-gray-600">{profileData.email}</p>
                    <p className="text-sm text-gray-600">{profileData.phone}</p>
                    <Badge variant="secondary" className="mt-2">
                      {loyaltyLevel} Member
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditProfileOpen(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profil
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-[#FACC15]/10 rounded-lg hover:bg-[#FACC15]/20 transition-colors">
                    <div className="text-xl md:text-2xl font-bold text-[#1F2937]">{loyaltyPoints}</div>
                    <div className="text-xs md:text-sm text-gray-600">Poin</div>
                  </div>
                  <div className="text-center p-3 bg-[#16A34A]/10 rounded-lg hover:bg-[#16A34A]/20 transition-colors cursor-pointer" onClick={() => onNavigate('orders')}>
                    <div className="text-xl md:text-2xl font-bold text-[#16A34A]">12</div>
                    <div className="text-xs md:text-sm text-gray-600">Pesanan</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => onNavigate('wishlist')}>
                    <div className="text-xl md:text-2xl font-bold text-blue-600">8</div>
                    <div className="text-xs md:text-sm text-gray-600">Wishlist</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Vouchers */}
          <Card className="hover:shadow-lg transition-shadow slide-in-bottom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="w-5 h-5 text-[#FACC15]" />
                Voucher & Kupon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vouchers.filter(v => !v.used).slice(0, 2).map((voucher) => (
                  <div key={voucher.id} className="p-3 border border-dashed border-[#FACC15] rounded-lg bg-[#FACC15]/5 hover:bg-[#FACC15]/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{voucher.title}</h4>
                      <Badge className="bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15]">
                        {voucher.discount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-600">
                          Min. Rp {voucher.minPurchase.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Berlaku hingga {voucher.expiry}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#16A34A] h-6 p-2 hover:bg-[#16A34A]/10"
                        onClick={() => handleCopy(voucher.code)}
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-[#16A34A] hover:bg-[#16A34A]/10"
                  onClick={() => setCurrentView('loyalty')}
                >
                  Lihat Semua Voucher
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loyalty Progress */}
          <Card className="hover:shadow-lg transition-shadow slide-in-bottom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 text-[#FACC15]" />
                Program Loyalitas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-[#FACC15] mb-1">
                  {loyaltyPoints}
                </div>
                <p className="text-sm text-gray-600">Poin tersedia</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Menuju Silver (5000 poin)</span>
                  <span className="font-medium">{Math.round((loyaltyPoints / 5000) * 100)}%</span>
                </div>
                <Progress 
                  value={Math.min((loyaltyPoints / 5000) * 100, 100)} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500">
                  {5000 - loyaltyPoints} poin lagi untuk naik level!
                </p>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:bg-[#FACC15]/10 hover:border-[#FACC15]"
                onClick={() => setCurrentView('loyalty')}
              >
                Tukar Poin & Lihat Reward
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Menu Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profil & Keamanan */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('security')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-5 h-5 text-blue-600" />
                Profil & Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Kelola informasi pribadi, password, dan keamanan akun</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Edit profil, ubah password, 2FA</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Alamat */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('addresses')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="w-5 h-5 text-red-600" />
                Alamat Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Kelola alamat untuk pengiriman pesanan</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{addresses.length} alamat tersimpan</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Metode Pembayaran */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('payments')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="w-5 h-5 text-green-600" />
                Metode Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Kelola e-wallet, rekening bank, dan kartu</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{paymentMethods.length} metode tersimpan</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Notifikasi */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('notifications')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="w-5 h-5 text-yellow-600" />
                Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Kelola notifikasi dan preferensi komunikasi</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{notifications.filter(n => !n.read).length} notifikasi baru</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Wishlist */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => onNavigate('wishlist')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="w-5 h-5 text-pink-600" />
                Wishlist & Recently Viewed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Produk favorit dan riwayat yang dilihat</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">8 produk di wishlist</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Pesanan */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => onNavigate('orders')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
                Pesanan & Retur
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Kelola pesanan dan pengajuan retur/refund</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">2 pesanan aktif</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Bantuan */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('help')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                Bantuan & FAQ
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Pusat bantuan, FAQ, dan hubungi kami</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Cari bantuan atau kontak support</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Preferensi */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('preferences')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="w-5 h-5 text-gray-600" />
                Preferensi Aplikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Bahasa, tema, aksesibilitas, dan privasi</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Sesuaikan pengalaman aplikasi</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Admin Panel - Only for Admin Role */}
          {user?.role === 'admin' && (
            <Card 
              className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50" 
              onClick={() => onNavigate('admin')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Admin Panel
                  <Badge className="ml-auto bg-purple-600 hover:bg-purple-600">Admin</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3">Kelola produk, pesanan, dan konten platform</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Dashboard, Analytics, Settings</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Referral */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('referral')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5 text-indigo-600" />
                Program Referral
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Ajak teman dan dapatkan reward</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{referralCount} teman bergabung</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Connected Accounts */}
          <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer" onClick={() => setCurrentView('privacy')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="w-5 h-5 text-teal-600" />
                Privasi & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3">Kelola privasi, consent, dan akun terhubung</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Download data, hapus histori</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar dari Akun
          </Button>
        </div>

        {/* ======================== */}
        {/* MODALS & DIALOGS */}
        {/* ======================== */}

        {/* Edit Profile Modal */}
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profil</DialogTitle>
              <DialogDescription>
                Perbarui informasi profil Anda
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarPreview || profileData.avatar || undefined} />
                  <AvatarFallback className="text-2xl bg-[#FACC15] text-[#1F2937]">
                    {profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="w-fit">
                  <Camera className="w-4 h-4 mr-2" />
                  Ganti Foto
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-green-100 text-green-700"
                  >
                    Terverifikasi
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="081234567890"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-xs h-7"
                    onClick={() => setVerifyOTPOpen(true)}
                  >
                    Verifikasi
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => setEditProfileOpen(false)}
                disabled={loading}
              >
                Batal
              </Button>
              <Button 
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-[#16A34A] hover:bg-[#16A34A]/90"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* OTP Verification Modal */}
        <Dialog open={verifyOTPOpen} onOpenChange={setVerifyOTPOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Verifikasi Nomor Telepon</DialogTitle>
              <DialogDescription>
                Masukkan kode OTP yang telah dikirim ke {profileData.phone}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otpValue}
                  onChange={(value) => setOtpValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center text-sm text-gray-600">
                {otpTimer > 0 ? (
                  <p>Kirim ulang kode dalam {otpTimer} detik</p>
                ) : (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleResendOTP}
                    className="text-[#16A34A]"
                  >
                    Kirim Ulang Kode OTP
                  </Button>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setVerifyOTPOpen(false)}
                disabled={loading}
              >
                Batal
              </Button>
              <Button 
                onClick={handleVerifyOTP}
                disabled={loading || otpValue.length !== 6}
                className="bg-[#16A34A] hover:bg-[#16A34A]/90"
              >
                {loading ? 'Memverifikasi...' : 'Verifikasi'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ========================
  // SECURITY VIEW
  // ========================
  if (currentView === 'security') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 page-transition pb-24 md:pb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCurrentView('main')}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
          Kembali
        </Button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil & Keamanan</h1>

        <div className="space-y-4">
          {/* Change Password */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Ubah Password</h3>
                    <p className="text-sm text-gray-600">Terakhir diubah 3 bulan lalu</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setChangePasswordOpen(true)}
                >
                  Ubah
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Autentikasi 2 Faktor (2FA)</h3>
                    <p className="text-sm text-gray-600">
                      {twoFactorEnabled ? 'Aktif' : 'Tidak aktif'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Device Sessions */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Perangkat & Sesi Aktif</CardTitle>
              <CardDescription>Kelola perangkat yang dapat mengakses akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deviceSessions.map((session) => (
                <div key={session.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{session.browser}</h4>
                      <p className="text-xs text-gray-600">{session.os}</p>
                      <p className="text-xs text-gray-500">{session.location}</p>
                      <p className="text-xs text-gray-500">{session.lastActive}</p>
                      {session.isCurrent && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Perangkat ini
                        </Badge>
                      )}
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full text-red-600 hover:bg-red-50">
                Logout Semua Perangkat Lain
              </Button>
            </CardContent>
          </Card>

          {/* Delete Account */}
          <Card className="border-red-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-red-600">Hapus Akun</h3>
                    <p className="text-sm text-gray-600">Hapus akun Anda secara permanen</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => setDeleteAccountOpen(true)}
                >
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Change Password Dialog */}
        <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Ubah Password</DialogTitle>
              <DialogDescription>
                Pastikan password baru Anda kuat dan unik
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    placeholder="Masukkan password saat ini"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                  >
                    {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword.new ? 'text' : 'password'}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    placeholder="Minimal 8 karakter"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                  >
                    {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {passwordData.new && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Kekuatan Password</span>
                      <span className="font-medium">{passwordStrengthLabel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all ${passwordStrengthColor}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    placeholder="Ketik ulang password baru"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  >
                    {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Password harus minimal 8 karakter dan mengandung kombinasi huruf besar, huruf kecil, dan angka.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setChangePasswordOpen(false)}
                disabled={loading}
              >
                Batal
              </Button>
              <Button 
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-[#16A34A] hover:bg-[#16A34A]/90"
              >
                {loading ? 'Mengubah...' : 'Ubah Password'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-600">Hapus Akun</DialogTitle>
              <DialogDescription>
                Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus secara permanen.
              </DialogDescription>
            </DialogHeader>
            
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Konsekuensi penghapusan akun:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Semua data pesanan dan histori akan hilang</li>
                  <li>Poin loyalitas dan voucher tidak dapat dikembalikan</li>
                  <li>Alamat dan metode pembayaran akan dihapus</li>
                  <li>Akun tidak dapat dipulihkan</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="delete-confirm">
                Ketik <strong>HAPUS</strong> untuk konfirmasi
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="HAPUS"
              />
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setDeleteAccountOpen(false);
                  setDeleteConfirmText('');
                }}
                disabled={loading}
              >
                Batal
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={loading || deleteConfirmText !== 'HAPUS'}
              >
                {loading ? 'Menghapus...' : 'Hapus Akun Saya'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Rest of the views will continue...
  // Due to character limits, I'll create the remaining views in a structured way

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 page-transition pb-24 md:pb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setCurrentView('main')}
        className="mb-4"
      >
        <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
        Kembali
      </Button>
      
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-2">View: {currentView}</h2>
        <p className="text-gray-600">Fitur ini sedang dalam pengembangan</p>
      </div>
    </div>
  );
}
