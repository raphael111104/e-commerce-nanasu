import { useState } from 'react';
import { Badge } from './ui/badge';

export function FilterChips({ onFilterChange }) {
  const [activeFilters, setActiveFilters] = useState(['semua']);

  const filters = [
    { id: 'semua', label: 'Semua' },
    { id: 'terlaris', label: 'Terlaris' },
    { id: 'terbaru', label: 'Terbaru' },
    { id: 'diskon', label: 'Diskon' },
    { id: 'muda', label: 'Kematangan Muda' },
    { id: 'matang', label: 'Kematangan Matang' },
    { id: 'harga-rendah', label: 'Harga Terendah' },
    { id: 'rating-tinggi', label: 'Rating Tinggi' }
  ];

  const handleFilterClick = (filterId) => {
    let newFilters;
    
    if (filterId === 'semua') {
      newFilters = ['semua'];
    } else {
      if (activeFilters.includes('semua')) {
        newFilters = [filterId];
      } else {
        if (activeFilters.includes(filterId)) {
          newFilters = activeFilters.filter(f => f !== filterId);
          if (newFilters.length === 0) {
            newFilters = ['semua'];
          }
        } else {
          newFilters = [...activeFilters, filterId];
        }
      }
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-6 fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Filter</h3>
        {activeFilters.length > 1 || !activeFilters.includes('semua') ? (
          <button
            onClick={() => {
              setActiveFilters(['semua']);
              onFilterChange(['semua']);
            }}
            className="text-sm text-[#16A34A] hover:text-[#16A34A]/80"
          >
            Reset Filter
          </button>
        ) : null}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className="flex-shrink-0"
            >
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`px-3 py-1 transition-colors ${
                  isActive
                    ? filter.id === 'semua'
                      ? 'bg-[#16A34A] hover:bg-[#16A34A]/90'
                      : filter.id === 'diskon'
                      ? 'bg-red-500 hover:bg-red-600'
                      : filter.id === 'terlaris'
                      ? 'bg-[#FACC15] text-[#1F2937] hover:bg-[#FACC15]/90'
                      : 'bg-[#1F2937] hover:bg-[#1F2937]/90'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}