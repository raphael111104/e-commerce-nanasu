/**
 * SortDropdown Component
 * 
 * Sorting options for product catalog:
 * - Newest (default)
 * - Best Selling
 * - Price (Low to High)
 * - Price (High to Low)
 * - Rating (Highest)
 * 
 * Events:
 * - sort_change: when user changes sort option
 */

import { useState } from 'react';
import { Check, ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export type SortOption = 'newest' | 'bestselling' | 'price_asc' | 'price_desc' | 'rating_desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultCount?: number;
}

const SORT_OPTIONS: { value: SortOption; label: string; description: string }[] = [
  {
    value: 'newest',
    label: 'Terbaru',
    description: 'Produk terbaru ditampilkan duluan',
  },
  {
    value: 'bestselling',
    label: 'Terlaris',
    description: 'Berdasarkan jumlah penjualan',
  },
  {
    value: 'price_asc',
    label: 'Harga Terendah',
    description: 'Harga dari rendah ke tinggi',
  },
  {
    value: 'price_desc',
    label: 'Harga Tertinggi',
    description: 'Harga dari tinggi ke rendah',
  },
  {
    value: 'rating_desc',
    label: 'Rating Tertinggi',
    description: 'Rating dan ulasan terbaik',
  },
];

export function SortDropdown({ value, onChange, resultCount }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentSort = SORT_OPTIONS.find(opt => opt.value === value) || SORT_OPTIONS[0];

  const handleSelect = (newValue: SortOption) => {
    if (newValue !== value) {
      onChange(newValue);
      console.log('[EVENT] sort_change', { from: value, to: newValue });
    }
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {resultCount !== undefined && (
        <span className="text-sm text-gray-600">
          {resultCount} produk
        </span>
      )}
      
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="min-w-[160px] justify-between"
            aria-label="Urutkan produk"
          >
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              <span>{currentSort.label}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Urutkan Berdasarkan</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`flex items-start gap-3 cursor-pointer ${
                value === option.value ? 'bg-[#FACC15]/10' : ''
              }`}
            >
              <div className="flex items-center justify-center w-4 h-4 mt-0.5">
                {value === option.value && (
                  <Check className="w-4 h-4 text-[#16A34A]" />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm ${value === option.value ? 'font-medium text-[#1F2937]' : 'text-gray-700'}`}>
                  {option.label}
                </div>
                <div className="text-xs text-gray-500">
                  {option.description}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/**
 * Compact version for mobile
 */
export function SortDropdownCompact({ value, onChange }: Omit<SortDropdownProps, 'resultCount'>) {
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = SORT_OPTIONS.find(opt => opt.value === value) || SORT_OPTIONS[0];

  const handleSelect = (newValue: SortOption) => {
    if (newValue !== value) {
      onChange(newValue);
      console.log('[EVENT] sort_change', { from: value, to: newValue });
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="justify-between"
          aria-label="Urutkan produk"
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          {currentSort.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Urutkan</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`flex items-center justify-between cursor-pointer ${
              value === option.value ? 'bg-[#FACC15]/10' : ''
            }`}
          >
            <span className={value === option.value ? 'font-medium' : ''}>
              {option.label}
            </span>
            {value === option.value && (
              <Check className="w-4 h-4 text-[#16A34A]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
