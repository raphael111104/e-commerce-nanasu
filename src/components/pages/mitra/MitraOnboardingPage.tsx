import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner@2.0.3';

export function MitraOnboardingPage({ onNavigate, onBack }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Profil Bisnis
    storeName: '',
    businessType: '',
    phoneNumber: '',
    email: '',
    pickupAddress: '',
    
    // Step 2: Dokumen
    ktpFile: null,
    npwpFile: null,
    logoFile: null,
    
    // Step 3: Konfirmasi
    agreeTerms: false
  });

  const steps = [
    { number: 1, title: 'Profil Bisnis', icon: <Building2 className="w-5 h-5" /> },
    { number: 2, title: 'Dokumen', icon: <FileText className="w-5 h-5" /> },
    { number: 3, title: 'Konfirmasi', icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (file) {
      toast.success(`File ${file.name} berhasil diunggah`);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.storeName && formData.businessType && formData.phoneNumber && 
             formData.email && formData.pickupAddress;
    }
    if (currentStep === 2) {
      return formData.ktpFile;
    }
    if (currentStep === 3) {
      return formData.agreeTerms;
    }
    return false;
  };

  const handleNext = () => {
    if (canProceed()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Submit
        toast.success('Pendaftaran berhasil! Mengarahkan ke dashboard...');
        setTimeout(() => {
          onNavigate('mitra-dashboard');
        }, 1500);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3 h-12 sm:h-14">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-base sm:text-lg truncate">Daftar sebagai Mitra</h1>
              <p className="text-xs text-gray-500">Langkah {currentStep} dari 3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${idx < steps.length - 1 ? 'flex-1' : ''}`}>
                  {/* Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep > step.number 
                      ? 'bg-[#16A34A] text-white' 
                      : currentStep === step.number
                        ? 'bg-[#16A34A] text-white ring-4 ring-[#16A34A]/20'
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  
                  {/* Label (Desktop) */}
                  <div className="hidden md:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-[#16A34A]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Labels */}
          <div className="md:hidden text-center mt-3">
            <div className="text-sm font-medium text-gray-900">{steps[currentStep - 1].title}</div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {steps[currentStep - 1].icon}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Isi data ringkas di bawah ini. Kamu bisa menyelesaikannya kurang dari 5 menit.'}
              {currentStep === 2 && 'Upload dokumen pendukung untuk verifikasi akun mitra Anda.'}
              {currentStep === 3 && 'Tinjau data Anda dan setujui syarat & ketentuan untuk menyelesaikan pendaftaran.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Profil Bisnis */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="storeName">
                      Nama Toko <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="storeName"
                      placeholder="Toko Nanas Subang Jaya"
                      value={formData.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessType">
                      Jenis Usaha <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleInputChange('businessType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis usaha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petani">Petani</SelectItem>
                        <SelectItem value="umkm">UMKM</SelectItem>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="pengolah">Pengolah Produk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">
                      Nomor HP <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="08123456789"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Untuk notifikasi pesanan</p>
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pickupAddress">
                    Alamat Pickup <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="pickupAddress"
                    rows={3}
                    placeholder="Jl. Raya Subang No. 123, Kec. Subang, Kab. Subang, Jawa Barat 41211"
                    value={formData.pickupAddress}
                    onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Alamat ini akan digunakan untuk pickup pesanan</p>
                </div>
              </div>
            )}

            {/* Step 2: Dokumen */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="ktpFile">
                    KTP Pemilik <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2">
                    <label
                      htmlFor="ktpFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#16A34A] hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.ktpFile ? formData.ktpFile.name : 'Klik untuk upload KTP'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG maksimal 5MB</p>
                      </div>
                      <input
                        id="ktpFile"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('ktpFile', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="npwpFile">
                    NPWP (Opsional)
                  </Label>
                  <div className="mt-2">
                    <label
                      htmlFor="npwpFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#16A34A] hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.npwpFile ? formData.npwpFile.name : 'Klik untuk upload NPWP'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG maksimal 5MB</p>
                      </div>
                      <input
                        id="npwpFile"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('npwpFile', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="logoFile">
                    Logo Toko (Opsional)
                  </Label>
                  <div className="mt-2">
                    <label
                      htmlFor="logoFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#16A34A] hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.logoFile ? formData.logoFile.name : 'Klik untuk upload logo'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG maksimal 2MB</p>
                      </div>
                      <input
                        id="logoFile"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('logoFile', e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Konfirmasi */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Data</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Nama Toko</div>
                      <div className="font-medium text-gray-900">{formData.storeName || '-'}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Jenis Usaha</div>
                      <div className="font-medium text-gray-900 capitalize">{formData.businessType || '-'}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Nomor HP</div>
                      <div className="font-medium text-gray-900">{formData.phoneNumber || '-'}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Email</div>
                      <div className="font-medium text-gray-900">{formData.email || '-'}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Alamat Pickup</div>
                    <div className="font-medium text-gray-900">{formData.pickupAddress || '-'}</div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">Dokumen Terupload</div>
                    <div className="flex flex-wrap gap-2">
                      {formData.ktpFile && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Check className="w-3 h-3 mr-1" />
                          KTP
                        </Badge>
                      )}
                      {formData.npwpFile && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Check className="w-3 h-3 mr-1" />
                          NPWP
                        </Badge>
                      )}
                      {formData.logoFile && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Check className="w-3 h-3 mr-1" />
                          Logo
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="agreeTerms" className="cursor-pointer text-sm leading-relaxed">
                        Saya menyetujui <button className="text-[#16A34A] font-medium hover:underline">Syarat & Ketentuan</button> serta <button className="text-[#16A34A] font-medium hover:underline">Kebijakan Privasi</button> NANASU sebagai mitra penjual
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white"
          >
            {currentStep === 3 ? 'Selesai' : 'Lanjut'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Butuh bantuan? <button className="text-[#16A34A] font-medium hover:underline" onClick={() => onNavigate('contact')}>Hubungi kami</button>
          </p>
        </div>
      </div>
    </div>
  );
}
