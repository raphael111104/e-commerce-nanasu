import { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { LazyImage } from './performance/LazyImage';

export function FlashSale({ onProductClick }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 45
  });

  const flashSaleProducts = [
    {
      id: 'flash-1',
      name: 'Nanas Madu Premium 1kg',
      price: 25000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1618373145247-35f153803e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0JTIweWVsbG93fGVufDF8fHx8MTc1OTgwMDk4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: 29,
      stock: 15,
      sold: 23
    },
    {
      id: 'flash-2',
      name: 'Jus Nanas 500ml Bundle 3pcs',
      price: 35000,
      originalPrice: 45000,
      image: 'https://images.unsplash.com/photo-1705246535138-953e01125cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBqdWljZSUyMGdsYXNzJTIwZnJlc2glMjBkcmlua3xlbnwxfHx8fDE3NTk4MDA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: 22,
      stock: 8,
      sold: 17
    },
    {
      id: 'flash-3',
      name: 'Keripik Nanas Original 200gr',
      price: 15000,
      originalPrice: 22000,
      image: 'https://images.unsplash.com/photo-1616662707741-9f32deea4863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMHBpbmVhcHBsZSUyMGNoaXBzJTIwc25hY2t8ZW58MXx8fHwxNzU5ODAwOTkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: 32,
      stock: 12,
      sold: 31
    },
    {
      id: 'flash-4',
      name: 'Paket Bundling Keluarga 3kg',
      price: 70000,
      originalPrice: 95000,
      image: 'https://images.unsplash.com/photo-1685551637722-3cb8af1d8d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBidW5kbGUlMjBiYXNrZXQlMjBvcmdhbmljfGVufDF8fHx8MTc1OTgwMDk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: 26,
      stock: 5,
      sold: 12
    },
    {
      id: 'flash-5',
      name: 'Smoothie Nanas Tropical 400ml',
      price: 16000,
      originalPrice: 22000,
      image: 'https://images.unsplash.com/photo-1564956213070-84f5a0cb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lYXBwbGUlMjBzbW9vdGhpZSUyMGhlYWx0aHklMjBkcmlua3xlbnwxfHx8fDE3NTk4MDEwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: 27,
      stock: 18,
      sold: 45
    },
    {
      id: 'flash-6',
      name: 'Nanas Mini Sweet 6pcs',
      price: 28000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1735052963684-f9e1f4f3ba38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pJTIwcGluZWFwcGxlJTIwYmFieSUyMGZydWl0fGVufDF8fHx8MTc1OTgwMTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      discount: 20,
      stock: 10,
      sold: 22
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer when it reaches 0
          hours = 2;
          minutes = 30;
          seconds = 45;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 slide-in-bottom">
      {/* Flash Sale Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-400 rounded-t-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">⚡</div>
            <div>
              <h2 className="font-bold text-xl">Flash Sale</h2>
              <p className="text-sm opacity-90">Hemat hingga 32%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <div className="flex gap-1 text-sm font-mono">
              <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-2 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Slider */}
      <div className="glass-card border border-gray-200 rounded-b-xl p-4 shadow-lg">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {flashSaleProducts.map((product) => (
            <Card
              key={product.id}
              className="flex-shrink-0 w-48 cursor-pointer glass-card hover:shadow-xl transition-all duration-300 hover:scale-105 hover-glow group"
              onClick={() => onProductClick(product)}
            >
              <CardContent className="p-3">
                <div className="relative mb-3 overflow-hidden rounded-lg">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    ratio="3:2"
                    priority="high"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white animate-pulse z-10">
                    -{product.discount}%
                  </Badge>
                </div>
                
                <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-bold text-red-500">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Terjual {product.sold}</span>
                    <span>Stok {product.stock}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-red-500 h-1 rounded-full"
                      style={{
                        width: `${(product.sold / (product.sold + product.stock)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-3">
          <Button variant="outline" size="sm">
            Lihat Semua Flash Sale
          </Button>
        </div>
      </div>
    </div>
  );
}