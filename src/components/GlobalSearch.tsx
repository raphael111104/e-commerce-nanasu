import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Package, Tag, User as UserIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

/**
 * GlobalSearch Component
 * 
 * Features:
 * - Auto-suggest (products, categories, sellers)
 * - Recent searches with clear functionality
 * - Quick clear button
 * - Empty state
 * - Keyboard navigation (up/down/enter/esc)
 * 
 * Props:
 * - onSearch: (query: string) => void
 * - onProductClick: (product) => void
 * - isMobile: boolean
 * 
 * State:
 * - searchQuery: current search input
 * - recentSearches: array of recent search strings
 * - suggestions: auto-suggest results
 * - isOpen: dropdown visibility
 * - highlightedIndex: keyboard navigation index
 * 
 * Events:
 * - search_initiated: when user submits search
 * - search_suggestion_clicked: when user clicks a suggestion
 * - recent_search_cleared: when user clears recent searches
 */

interface SearchSuggestion {
  type: 'product' | 'category' | 'seller' | 'keyword';
  id: string;
  name: string;
  image?: string;
  price?: number;
  category?: string;
}

export function GlobalSearch({ 
  onSearch, 
  onProductClick,
  isMobile = false 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'nanas madu',
    'nanas queen',
    'jus nanas',
    'selai nanas'
  ]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock suggestions - replace with real API call
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Simulate API call for suggestions
      const mockSuggestions: SearchSuggestion[] = [
        {
          type: 'product',
          id: '1',
          name: 'Nanas Madu Premium',
          image: null,
          price: 45000,
          category: 'Nanas Segar'
        },
        {
          type: 'product',
          id: '2',
          name: 'Nanas Queen Sweet',
          image: null,
          price: 38000,
          category: 'Nanas Segar'
        },
        {
          type: 'category',
          id: 'cat1',
          name: 'Nanas Segar',
        },
        {
          type: 'category',
          id: 'cat2',
          name: 'Produk Olahan',
        },
        {
          type: 'seller',
          id: 'seller1',
          name: 'Petani Pak Budi - Subang',
        },
      ].filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSuggestions(mockSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const newRecent = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
        return newRecent;
      });
      
      onSearch(searchQuery);
      setIsOpen(false);
      inputRef.current?.blur();
      
      // Event tag for analytics
      console.log('[EVENT] search_initiated', { query: searchQuery });
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      onProductClick({ id: suggestion.id, name: suggestion.name });
      console.log('[EVENT] search_suggestion_clicked', { type: 'product', id: suggestion.id });
    } else if (suggestion.type === 'category') {
      onSearch(suggestion.name);
      console.log('[EVENT] search_suggestion_clicked', { type: 'category', name: suggestion.name });
    } else if (suggestion.type === 'seller') {
      onSearch(suggestion.name);
      console.log('[EVENT] search_suggestion_clicked', { type: 'seller', name: suggestion.name });
    }
    
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleRecentClick = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    setIsOpen(false);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    console.log('[EVENT] recent_search_cleared');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsOpen(false);
    setSuggestions([]);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalItems = suggestions.length + recentSearches.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < totalItems - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          if (highlightedIndex < suggestions.length) {
            handleSuggestionClick(suggestions[highlightedIndex]);
          } else {
            const recentIndex = highlightedIndex - suggestions.length;
            handleRecentClick(recentSearches[recentIndex]);
          }
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Package className="w-4 h-4 text-gray-400" />;
      case 'category':
        return <Tag className="w-4 h-4 text-gray-400" />;
      case 'seller':
        return <UserIcon className="w-4 h-4 text-gray-400" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors z-10 ${
          isFocused ? 'text-[#FACC15]' : 'text-gray-400'
        }`} />
        
        <Input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (searchQuery.trim() || recentSearches.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Cari nanas segar, olahan, atau resep..."
          className={`pl-10 pr-10 ${isMobile ? 'h-10' : 'h-10'} bg-gray-50 border-gray-200 transition-all ${
            isFocused 
              ? 'border-[#FACC15] ring-2 ring-[#FACC15]/20 bg-white' 
              : 'hover:bg-white'
          }`}
          aria-label="Pencarian global"
          aria-expanded={isOpen}
          aria-controls="search-dropdown"
          aria-activedescendant={highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined}
        />

        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-full z-10"
            aria-label="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </form>

      {/* Dropdown */}
      {isOpen && (
        <div 
          id="search-dropdown"
          className={`absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 ${
            isMobile ? 'max-h-[60vh]' : 'max-h-96'
          }`}
          role="listbox"
        >
          <ScrollArea className="h-full">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1.5 text-xs font-medium text-gray-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Saran Pencarian
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.id}`}
                    id={`suggestion-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                      highlightedIndex === index
                        ? 'bg-[#FACC15]/10'
                        : 'hover:bg-gray-50'
                    }`}
                    role="option"
                    aria-selected={highlightedIndex === index}
                  >
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {suggestion.name}
                      </div>
                      {suggestion.category && (
                        <div className="text-xs text-gray-500">
                          {suggestion.category}
                        </div>
                      )}
                      {suggestion.price && (
                        <div className="text-xs font-medium text-[#16A34A]">
                          Rp {suggestion.price.toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {suggestion.type === 'product' ? 'Produk' : 
                       suggestion.type === 'category' ? 'Kategori' : 'Penjual'}
                    </Badge>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!searchQuery && recentSearches.length > 0 && (
              <>
                {suggestions.length > 0 && <Separator />}
                <div className="p-2">
                  <div className="px-2 py-1.5 flex items-center justify-between">
                    <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Pencarian Terakhir
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecent}
                      className="h-6 text-xs text-gray-500 hover:text-gray-700"
                    >
                      Hapus Semua
                    </Button>
                  </div>
                  {recentSearches.map((query, index) => (
                    <button
                      key={`recent-${index}`}
                      id={`suggestion-${suggestions.length + index}`}
                      onClick={() => handleRecentClick(query)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        highlightedIndex === suggestions.length + index
                          ? 'bg-[#FACC15]/10'
                          : 'hover:bg-gray-50'
                      }`}
                      role="option"
                      aria-selected={highlightedIndex === suggestions.length + index}
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="flex-1 text-left text-sm text-gray-700">
                        {query}
                      </span>
                      <X 
                        className="w-3 h-3 text-gray-400 hover:text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecentSearches(prev => prev.filter(s => s !== query));
                        }}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Empty State */}
            {searchQuery && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Tidak ada hasil
                </h3>
                <p className="text-sm text-gray-600">
                  Coba kata kunci lain atau periksa ejaan
                </p>
              </div>
            )}

            {/* No recent searches */}
            {!searchQuery && recentSearches.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🍍</div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Cari Produk NANASU
                </h3>
                <p className="text-sm text-gray-600">
                  Temukan nanas segar, olahan, dan resep favorit
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
