import { useState } from 'react';
import { Plus, Eye, Edit, Archive, Copy, MoreVertical, Image as ImageIcon, Package } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { DataTable, Column } from '../DataTable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Switch } from '../../ui/switch';
import { mockProducts, Product } from '../../../lib/admin/mockData';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    stock: 'all'
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      'active': { label: 'Active', className: 'bg-gradient-to-r from-emerald-100 to-green-100 text-green-800 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700' },
      'draft': { label: 'Draft', className: 'bg-gradient-to-r from-slate-100 to-gray-100 text-gray-800 dark:from-slate-900/30 dark:to-gray-900/30 dark:text-gray-300 border-gray-300 dark:border-gray-700' },
      'archived': { label: 'Archived', className: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 border-red-300 dark:border-red-700' }
    };
    const { label, className } = config[status] || config.draft;
    return <Badge className={className}>{label}</Badge>;
  };

  const columns: Column<Product>[] = [
    {
      key: 'image',
      label: 'Image',
      width: 'w-20',
      render: (product) => (
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      )
    },
    {
      key: 'name',
      label: 'Product',
      sortable: true,
      render: (product) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
        </div>
      )
    },
    {
      key: 'sku',
      label: 'SKU',
      sortable: true,
      width: 'w-32',
      render: (product) => (
        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{product.sku}</span>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      align: 'right',
      width: 'w-32',
      render: (product) => (
        <span className="font-medium text-gray-900 dark:text-white">
          Rp {product.price.toLocaleString('id-ID')}
        </span>
      )
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      align: 'center',
      width: 'w-24',
      render: (product) => (
        <span className={`font-medium ${
          product.stock < 20 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
        }`}>
          {product.stock}
        </span>
      )
    },
    {
      key: 'sales',
      label: 'Sales',
      sortable: true,
      align: 'right',
      width: 'w-24',
      render: (product) => (
        <span className="text-gray-700 dark:text-gray-300">{product.sales}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: 'w-28',
      render: (product) => getStatusBadge(product.status)
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      sortable: true,
      width: 'w-32',
      render: (product) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">{product.lastUpdated}</span>
      )
    }
  ];

  // Apply filters
  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.status !== 'all' && product.status !== filters.status) return false;
    if (filters.stock === 'low' && product.stock >= 50) return false;
    if (filters.stock === 'out' && product.stock > 0) return false;
    return true;
  });

  const handleBulkPublish = () => {
    toast.success('Products published successfully');
  };

  const handleBulkArchive = () => {
    toast.success('Products archived successfully');
  };

  const handleExport = () => {
    toast.success('Exporting products to CSV...');
  };

  const handleImport = () => {
    toast.info('Import products from CSV');
  };

  const filterSlot = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="category-filter">Category</Label>
        <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
          <SelectTrigger id="category-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Nanas Segar">Nanas Segar</SelectItem>
            <SelectItem value="Olahan">Olahan</SelectItem>
            <SelectItem value="Bundling">Bundling</SelectItem>
            <SelectItem value="Pre-Order">Pre-Order</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="status-filter">Status</Label>
        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger id="status-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="stock-filter">Stock</Label>
        <Select value={filters.stock} onValueChange={(value) => setFilters({ ...filters, stock: value })}>
          <SelectTrigger id="stock-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock</SelectItem>
            <SelectItem value="low">Low Stock (&lt; 50)</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const bulkActions = (
    <>
      <Button size="sm" variant="outline" onClick={handleBulkPublish}>
        Publish
      </Button>
      <Button size="sm" variant="outline" onClick={handleBulkArchive}>
        Archive
      </Button>
    </>
  );

  const rowActions = (product: Product) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          setSelectedProduct(product);
          setShowProductForm(true);
        }}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.success(`Duplicated ${product.name}`)}>
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.success(`Archived ${product.name}`)}>
          <Archive className="w-4 h-4 mr-2" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-xl backdrop-blur-sm bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#4B5DFF] to-[#13C2B3] hover:opacity-90 text-white shadow-lg transition-all duration-300"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredProducts}
        columns={columns}
        searchable
        searchPlaceholder="Search by name or SKU..."
        filterable
        filterSlot={filterSlot}
        exportable
        onExport={handleExport}
        importable
        onImport={handleImport}
        selectable
        bulkActions={bulkActions}
        pagination
        pageSize={25}
        onRowClick={(product) => {
          setSelectedProduct(product);
          setShowProductForm(true);
        }}
        rowActions={rowActions}
        emptyState={
          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-12">
            <Package className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium mb-1">No products found</p>
            <p className="text-sm">Try adjusting your filters or add a new product</p>
          </div>
        }
      />

      {/* Product Form Dialog */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              Fill in the product details below
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="product-name">Product Name *</Label>
                <Input
                  id="product-name"
                  placeholder="e.g. Nanas Madu Premium Grade A"
                  defaultValue={selectedProduct?.name}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select defaultValue={selectedProduct?.category}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nanas Segar">Nanas Segar</SelectItem>
                      <SelectItem value="Olahan">Olahan</SelectItem>
                      <SelectItem value="Bundling">Bundling</SelectItem>
                      <SelectItem value="Pre-Order">Pre-Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g. premium, organic, sweet"
                    defaultValue={selectedProduct?.tags.join(', ')}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <Label>Visibility</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Make this product visible on storefront
                  </p>
                </div>
                <Switch defaultChecked={selectedProduct?.status === 'active'} />
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Base Price (Rp) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="35000"
                    defaultValue={selectedProduct?.price}
                  />
                </div>
                <div>
                  <Label htmlFor="compare-price">Compare at Price (Rp)</Label>
                  <Input
                    id="compare-price"
                    type="number"
                    placeholder="45000"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Original price before discount
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    placeholder="NS-NM-001"
                    defaultValue={selectedProduct?.sku}
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="150"
                    defaultValue={selectedProduct?.stock}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <Label>Track Stock</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor inventory levels for this product
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4 mt-4">
              <div>
                <Label>Product Images</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Drop images here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Recommended: 1000x1000px, max 5MB
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Choose Files
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  placeholder="nanas-madu-premium-grade-a"
                />
              </div>
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  placeholder="Nanas Madu Premium Grade A | NANASU"
                />
              </div>
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Fresh premium pineapple from Subang..."
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" step="0.1" placeholder="1.0" />
                </div>
                <div>
                  <Label htmlFor="length">Length (cm)</Label>
                  <Input id="length" type="number" placeholder="15" />
                </div>
                <div>
                  <Label htmlFor="width">Width (cm)</Label>
                  <Input id="width" type="number" placeholder="15" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setShowProductForm(false)}>
              Cancel
            </Button>
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button
              className="bg-gradient-to-r from-[#4B5DFF] to-[#13C2B3] hover:opacity-90 text-white shadow-lg transition-all duration-300"
              onClick={() => {
                toast.success(selectedProduct ? 'Product updated!' : 'Product created!');
                setShowProductForm(false);
              }}
            >
              {selectedProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
