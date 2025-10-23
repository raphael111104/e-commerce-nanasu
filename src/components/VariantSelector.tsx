import { Check } from 'lucide-react';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

/**
 * Variant Selector Component
 * 
 * Features:
 * - Multiple display modes (grid, list, chips)
 * - Stock validation
 * - Price display
 * - Disabled states
 * - Tooltips for unavailable variants
 * 
 * Props:
 * - variants: Variant[] - Array of variant options
 * - selectedId: string - Currently selected variant ID
 * - onChange: (variantId: string) => void
 * - mode?: 'grid' | 'list' | 'chips' - Display mode
 */

export interface Variant {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  disabled?: boolean;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedId: string;
  onChange: (variantId: string) => void;
  mode?: 'grid' | 'list' | 'chips';
  showPrice?: boolean;
  showStock?: boolean;
}

export function VariantSelector({
  variants,
  selectedId,
  onChange,
  mode = 'list',
  showPrice = true,
  showStock = false
}: VariantSelectorProps) {
  
  if (mode === 'chips') {
    return (
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          const isDisabled = variant.disabled || variant.stock === 0;

          return (
            <TooltipProvider key={variant.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => !isDisabled && onChange(variant.id)}
                    disabled={isDisabled}
                    className={`
                      px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all
                      ${isSelected 
                        ? 'border-[#FACC15] bg-[#FACC15]/10 text-[#1F2937]' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }
                      ${isDisabled 
                        ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                        : 'cursor-pointer'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {variant.name}
                      {isSelected && <Check className="w-4 h-4" />}
                      {showStock && variant.stock > 0 && variant.stock < 10 && (
                        <Badge variant="outline" className="text-xs">
                          {variant.stock} left
                        </Badge>
                      )}
                    </div>
                  </button>
                </TooltipTrigger>
                {isDisabled && (
                  <TooltipContent>
                    <p>Stok habis</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    );
  }

  if (mode === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedId;
          const isDisabled = variant.disabled || variant.stock === 0;

          return (
            <button
              key={variant.id}
              onClick={() => !isDisabled && onChange(variant.id)}
              disabled={isDisabled}
              className={`
                p-4 border-2 rounded-xl text-left transition-all relative
                ${isSelected 
                  ? 'border-[#FACC15] bg-[#FACC15]/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
                ${isDisabled 
                  ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                  : 'cursor-pointer hover:shadow-md'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-[#FACC15] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#1F2937]" />
                </div>
              )}
              
              {variant.image && (
                <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={variant.image} 
                    alt={variant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <h4 className="font-medium text-sm mb-1">{variant.name}</h4>
              
              {variant.description && (
                <p className="text-xs text-gray-500 mb-2">{variant.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                {showPrice && (
                  <span className="font-medium text-sm">
                    Rp {variant.price.toLocaleString('id-ID')}
                  </span>
                )}
                {showStock && variant.stock > 0 && variant.stock < 10 && (
                  <Badge variant="outline" className="text-xs">
                    {variant.stock} tersisa
                  </Badge>
                )}
              </div>

              {isDisabled && (
                <Badge variant="secondary" className="text-xs mt-2">
                  Stok habis
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Default: List mode
  return (
    <RadioGroup value={selectedId} onValueChange={onChange} className="space-y-2">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedId;
        const isDisabled = variant.disabled || variant.stock === 0;

        return (
          <div
            key={variant.id}
            className={`
              relative border-2 rounded-lg p-4 transition-all cursor-pointer
              ${isSelected 
                ? 'border-[#FACC15] bg-[#FACC15]/5' 
                : 'border-gray-200 hover:border-gray-300'
              }
              ${isDisabled 
                ? 'opacity-50 cursor-not-allowed bg-gray-50' 
                : 'hover:shadow-sm'
              }
            `}
            onClick={() => !isDisabled && onChange(variant.id)}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem 
                value={variant.id} 
                id={variant.id}
                disabled={isDisabled}
                className="flex-shrink-0"
              />
              
              <Label 
                htmlFor={variant.id} 
                className="flex-1 cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm md:text-base mb-0.5">
                    {variant.name}
                  </div>
                  {variant.description && (
                    <p className="text-xs md:text-sm text-gray-500">
                      {variant.description}
                    </p>
                  )}
                  {isDisabled && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Stok habis
                    </Badge>
                  )}
                  {showStock && !isDisabled && variant.stock > 0 && variant.stock < 10 && (
                    <p className="text-xs text-orange-600 mt-1">
                      Tersisa {variant.stock} item
                    </p>
                  )}
                </div>
                
                {showPrice && (
                  <div className="font-medium text-sm md:text-base flex-shrink-0">
                    Rp {variant.price.toLocaleString('id-ID')}
                  </div>
                )}
              </Label>
            </div>
          </div>
        );
      })}
    </RadioGroup>
  );
}

/**
 * Quantity Selector Component
 * 
 * Features:
 * - Min/Max validation
 * - Stock checking
 * - Custom step
 * - Input field option
 * - Helper text
 * 
 * Props:
 * - value: number - Current quantity
 * - onChange: (quantity: number) => void
 * - min?: number - Minimum quantity (default: 1)
 * - max?: number - Maximum quantity (from stock)
 * - step?: number - Increment step (default: 1)
 * - showInput?: boolean - Show direct input field
 */

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showInput?: boolean;
  showStock?: boolean;
  helperText?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  showInput = false,
  showStock = true,
  helperText
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          className={`
            w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 flex items-center justify-center
            transition-all font-medium text-lg
            ${value <= min 
              ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'border-gray-300 hover:border-[#FACC15] hover:bg-[#FACC15]/5 text-gray-700 active:scale-95'
            }
          `}
          aria-label="Decrease quantity"
        >
          −
        </button>

        {showInput ? (
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-16 md:w-20 h-9 md:h-10 text-center border-2 border-gray-300 rounded-lg font-medium focus:outline-none focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20"
          />
        ) : (
          <div className="w-12 md:w-16 text-center font-medium text-base md:text-lg">
            {value}
          </div>
        )}

        <button
          onClick={handleIncrement}
          disabled={value >= max}
          className={`
            w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 flex items-center justify-center
            transition-all font-medium text-lg
            ${value >= max 
              ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
              : 'border-gray-300 hover:border-[#FACC15] hover:bg-[#FACC15]/5 text-gray-700 active:scale-95'
            }
          `}
          aria-label="Increase quantity"
        >
          +
        </button>

        {showStock && max < 999 && (
          <span className="text-sm text-gray-500 ml-2">
            Stok: <span className="font-medium">{max}</span>
          </span>
        )}
      </div>

      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}

      {value >= max && max < 999 && (
        <p className="text-xs text-orange-600">
          Maksimal pembelian {max} item
        </p>
      )}
    </div>
  );
}
