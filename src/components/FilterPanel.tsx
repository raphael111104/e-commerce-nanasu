/**
 * FilterPanel Component
 * 
 * Features:
 * - Filter chips that persist when navigating back from detail
 * - Price range slider
 * - Category filter
 * - Rating filter
 * - Promo/badge filter
 * - Clear all filters
 * - Syncs with URL query params
 * 
 * Events:
 * - filter_apply: when user applies filters
 * - filter_clear: when user clears filters
 * - filter_change: when any filter value changes
 */

import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from './ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Separator } from './ui/separator';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  isMobile?: boolean;
}

export interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  badges?: string[];
  inStock?: boolean;
}

const CATEGORIES = [
  { id: 'nanas-segar', name: 'Nanas Segar', count: 45 },
  { id: 'olahan', name: 'Produk Olahan', count: 23 },
  { id: 'paket', name: 'Paket Bundling', count: 12 },
  { id: 'preorder', name: 'Pre-Order', count: 8 },
];

const BADGES = [
  { id: 'asli-subang', name: 'Asli Subang', color: 'bg-[#FACC15]' },
  { id: 'discount', name: 'Diskon', color: 'bg-red-500' },
  { id: 'bestseller', name: 'Terlaris', color: 'bg-[#16A34A]' },
  { id: 'new', name: 'Produk Baru', color: 'bg-blue-500' },
];

const PRICE_RANGE = {
  min: 0,
  max: 500000,
  step: 5000,
};

export function FilterPanel({ onFilterChange, initialFilters = {}, isMobile = false }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice || PRICE_RANGE.min,
    initialFilters.maxPrice || PRICE_RANGE.max,
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // Collapsible states
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [badgeOpen, setBadgeOpen] = useState(true);

  useEffect(() => {
    // Sync with initial filters
    setFilters(initialFilters);
    setPriceRange([
      initialFilters.minPrice || PRICE_RANGE.min,
      initialFilters.maxPrice || PRICE_RANGE.max,
    ]);
  }, [initialFilters]);

  const handleCategoryChange = (categoryId: string) => {
    const newFilters = {
      ...filters,
      category: filters.category === categoryId ? undefined : categoryId,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('[EVENT] filter_change', { type: 'category', value: categoryId });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handlePriceCommit = (values: number[]) => {
    const newFilters = {
      ...filters,
      minPrice: values[0] > PRICE_RANGE.min ? values[0] : undefined,
      maxPrice: values[1] < PRICE_RANGE.max ? values[1] : undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('[EVENT] filter_change', { type: 'price', min: values[0], max: values[1] });
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = {
      ...filters,
      rating: filters.rating === rating ? undefined : rating,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('[EVENT] filter_change', { type: 'rating', value: rating });
  };

  const handleBadgeToggle = (badgeId: string) => {
    const currentBadges = filters.badges || [];
    const newBadges = currentBadges.includes(badgeId)
      ? currentBadges.filter(b => b !== badgeId)
      : [...currentBadges, badgeId];
    
    const newFilters = {
      ...filters,
      badges: newBadges.length > 0 ? newBadges : undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('[EVENT] filter_change', { type: 'badge', value: badgeId });
  };

  const handleStockToggle = () => {
    const newFilters = {
      ...filters,
      inStock: !filters.inStock,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    console.log('[EVENT] filter_change', { type: 'stock', value: !filters.inStock });
  };

  const handleClearAll = () => {
    const clearedFilters: FilterState = {};
    setFilters(clearedFilters);
    setPriceRange([PRICE_RANGE.min, PRICE_RANGE.max]);
    onFilterChange(clearedFilters);
    console.log('[EVENT] filter_clear');
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsOpen(false);
    console.log('[EVENT] filter_apply', filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.rating) count++;
    if (filters.badges && filters.badges.length > 0) count += filters.badges.length;
    if (filters.inStock) count++;
    return count;
  };

  const activeCount = getActiveFilterCount();

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <h3 className="font-semibold text-[#1F2937]">Kategori</h3>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3 space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                filters.category === cat.id
                  ? 'bg-[#FACC15]/10 border border-[#FACC15]'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <span className={filters.category === cat.id ? 'font-medium text-[#1F2937]' : 'text-gray-700'}>
                {cat.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {cat.count}
              </Badge>
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range Filter */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <h3 className="font-semibold text-[#1F2937]">Harga</h3>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-4 space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={PRICE_RANGE.step}
            className="w-full"
            aria-label="Filter harga"
          />
          <div className="flex items-center justify-between text-sm">
            <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200">
              Rp {priceRange[0].toLocaleString('id-ID')}
            </div>
            <span className="text-gray-400">—</span>
            <div className="px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200">
              Rp {priceRange[1].toLocaleString('id-ID')}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Rating Filter */}
      <Collapsible open={ratingOpen} onOpenChange={setRatingOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <h3 className="font-semibold text-[#1F2937]">Rating</h3>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${ratingOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3 space-y-2">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                filters.rating === rating
                  ? 'bg-[#FACC15]/10 border border-[#FACC15]'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'fill-[#FACC15] text-[#FACC15]' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">& keatas</span>
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Badge/Promo Filter */}
      <Collapsible open={badgeOpen} onOpenChange={setBadgeOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
              <h3 className="font-semibold text-[#1F2937]">Label</h3>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${badgeOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3 space-y-2">
          {BADGES.map((badge) => (
            <div key={badge.id} className="flex items-center space-x-2">
              <Checkbox
                id={`badge-${badge.id}`}
                checked={filters.badges?.includes(badge.id) || false}
                onCheckedChange={() => handleBadgeToggle(badge.id)}
              />
              <Label
                htmlFor={`badge-${badge.id}`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className={`w-3 h-3 rounded-full ${badge.color}`} />
                <span>{badge.name}</span>
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStock || false}
          onCheckedChange={handleStockToggle}
        />
        <Label htmlFor="in-stock" className="cursor-pointer">
          Hanya tampilkan produk tersedia
        </Label>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
              {activeCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15]">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <SheetTitle>Filter Produk</SheetTitle>
                {activeCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-[#16A34A] hover:text-[#15803D]"
                  >
                    Hapus Semua
                  </Button>
                )}
              </div>
              <SheetDescription>
                Temukan produk sesuai preferensi Anda
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto max-h-[calc(85vh-140px)]">
              <FilterContent />
            </div>
            <SheetFooter className="mt-6">
              <Button
                onClick={handleApply}
                className="w-full bg-[#FACC15] hover:bg-[#FACC15]/90 text-[#1F2937]"
              >
                Terapkan Filter {activeCount > 0 && `(${activeCount})`}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop version
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-[#1F2937] flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filter
        </h2>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-[#16A34A] hover:text-[#15803D] hover:bg-[#16A34A]/10"
          >
            Hapus Semua
          </Button>
        )}
      </div>
      <FilterContent />
    </div>
  );
}

/**
 * FilterChips Component
 * Display active filters as removable chips
 */
interface FilterChipsProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState, value?: string) => void;
  onClearAll: () => void;
}

export function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
  const chips: { key: keyof FilterState; label: string; value?: string }[] = [];

  if (filters.category) {
    const cat = CATEGORIES.find(c => c.id === filters.category);
    if (cat) chips.push({ key: 'category', label: cat.name });
  }

  if (filters.minPrice || filters.maxPrice) {
    const label = `Rp ${(filters.minPrice || 0).toLocaleString('id-ID')} - Rp ${(filters.maxPrice || PRICE_RANGE.max).toLocaleString('id-ID')}`;
    chips.push({ key: 'minPrice', label });
  }

  if (filters.rating) {
    chips.push({ key: 'rating', label: `Rating ${filters.rating}+ ⭐` });
  }

  if (filters.badges && filters.badges.length > 0) {
    filters.badges.forEach(badgeId => {
      const badge = BADGES.find(b => b.id === badgeId);
      if (badge) {
        chips.push({ key: 'badges', label: badge.name, value: badgeId });
      }
    });
  }

  if (filters.inStock) {
    chips.push({ key: 'inStock', label: 'Tersedia' });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-600">Filter aktif:</span>
      {chips.map((chip, index) => (
        <Badge
          key={`${chip.key}-${chip.value || index}`}
          variant="secondary"
          className="pl-3 pr-1 py-1 flex items-center gap-1"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.key, chip.value)}
            className="hover:bg-gray-300 rounded-full p-0.5 transition-colors"
            aria-label={`Hapus filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 text-xs text-[#16A34A] hover:text-[#15803D]"
      >
        Hapus Semua
      </Button>
    </div>
  );
}
