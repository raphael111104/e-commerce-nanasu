import { useState } from 'react';
import { Plus, Upload, Download, Search, MoreVertical, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Badge } from '../../../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../ui/dropdown-menu';
import { LazyImage } from '../../../performance/LazyImage';
import { toast } from 'sonner@2.0.3';

export function MitraProdukTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=200',
      name: 'Nanas Madu Subang Premium',
      sku: 'NNS-001',
      price: 45000,
      stock: 125,
      status: 'active'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=200',
      name: 'Nanas Madu Grade A',
      sku: 'NNS-002',
      price: 35000,
      stock: 89,
      status: 'active'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200',
      name: 'Dodol Nanas Subang 250gr',
      sku: 'NNS-OLH-001',
      price: 25000,
      stock: 0,
      status: 'inactive'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    mainImage: null
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.error('Mohon lengkapi semua field wajib');
      return;
    }

    const product = {
      id: products.length + 1,
      image: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=200',
      name: newProduct.name,
      sku: `NNS-${String(products.length + 1).padStart(3, '0')}`,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
      status: 'active'
    };

    setProducts([...products, product]);
    setShowAddDialog(false);
    setNewProduct({ name: '', description: '', category: '', price: '', stock: '', mainImage: null });
    toast.success('Produk berhasil ditambahkan');
  };

  const handleToggleStatus = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
    toast.success('Status produk diperbarui');
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Produk</h2>
          <p className="text-sm sm:text-base text-gray-600">Kelola katalog produk Anda</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Impor CSV</span>
            <span className="sm:hidden">Impor</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Ekspor</span>
            <span className="sm:hidden">Ekspor</span>
          </Button>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white text-xs sm:text-sm">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
                <DialogDescription>
                  Isi form di bawah untuk menambahkan produk baru ke katalog Anda
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="productName">
                    Nama Produk <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="productName"
                    placeholder="Nanas Madu Subang Premium"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Deskripsi Singkat</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="Nanas madu segar dari kebun Subang..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="segar">Nanas Segar</SelectItem>
                        <SelectItem value="olahan">Produk Olahan</SelectItem>
                        <SelectItem value="bundling">Paket Bundling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">
                      Harga <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="45000"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stock">
                    Stok <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="100"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Foto Utama</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="mainImage"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#16A34A] hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {newProduct.mainImage ? newProduct.mainImage.name : 'Klik untuk upload'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG maksimal 5MB</p>
                      </div>
                      <input
                        id="mainImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setNewProduct({...newProduct, mainImage: e.target.files?.[0] || null})}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleAddProduct} className="bg-gradient-to-r from-[#16A34A] to-[#D4AF37] hover:from-[#16A34A]/90 hover:to-[#D4AF37]/90 text-white">
                    Simpan Produk
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search - Mobile Optimized */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari produk atau SKU..."
            className="pl-8 sm:pl-10 text-sm h-9 sm:h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && !searchQuery && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Belum ada produk</h3>
            <p className="text-sm text-gray-600 mb-4">Tambahkan produk pertamamu sekarang</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Products Table/Cards - Responsive */}
      {filteredProducts.length > 0 && (
        <>
          {/* Desktop Table View */}
          <Card className="border-2 border-gray-200 hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Produk
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 flex-shrink-0">
                          <LazyImage
                            src={product.image}
                            alt={product.name}
                            ratio="1:1"
                            priority="normal"
                            className=""
                          />
                        </div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{product.sku}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${product.stock === 0 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={product.status === 'active' ? 'success' : 'secondary'}>
                        {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(product.id)}
                          title={product.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          {product.status === 'active' ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-2 border-gray-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      ratio="1:1"
                      priority="normal"
                      className=""
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">{product.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2">{product.sku}</p>
                    
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          Rp {product.price.toLocaleString('id-ID')}
                        </p>
                        <p className={`text-xs ${product.stock === 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          Stok: {product.stock}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={product.status === 'active' ? 'success' : 'secondary'} className="text-xs">
                          {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => handleToggleStatus(product.id)}
                          title={product.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                        >
                          {product.status === 'active' ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
      )}
    </div>
  );
}
