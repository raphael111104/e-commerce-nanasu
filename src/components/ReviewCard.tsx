import { useState } from 'react';
import { Star, ThumbsUp, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string | null;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  images?: string[] | null;
  variant?: string;
}

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
}

export function ReviewCard({ review, onHelpful, onReport }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);

  const handleHelpful = () => {
    if (!isHelpful) {
      setHelpfulCount(prev => prev + 1);
      setIsHelpful(true);
      onHelpful?.(review.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Card className="glass-card hover:shadow-lg transition-all duration-300 hover-glow">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          {/* Avatar */}
          <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
            {review.userAvatar ? (
              <AvatarImage src={review.userAvatar} alt={review.userName} />
            ) : (
              <AvatarFallback className="bg-[#FACC15]/20 text-[#1F2937]">
                {review.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-900 truncate">
                    {review.userName}
                  </span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      ✓ Pembeli
                    </Badge>
                  )}
                </div>
                
                {/* Rating & Date */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs md:text-sm text-gray-500">
                    {formatDate(review.date)}
                  </span>
                </div>

                {/* Variant */}
                {review.variant && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {review.variant}
                  </Badge>
                )}
              </div>

              {/* More Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 flex-shrink-0"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onReport?.(review.id)}>
                    Laporkan ulasan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Comment */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
              {review.comment}
            </p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                {review.images.map((image, index) => (
                  <button
                    key={index}
                    className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                    onClick={() => {
                      // TODO: Open image lightbox
                      console.log('Open image:', image);
                    }}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHelpful}
                disabled={isHelpful}
                className={`h-8 text-xs md:text-sm ${
                  isHelpful 
                    ? 'text-[#16A34A] bg-[#16A34A]/10' 
                    : 'text-gray-600 hover:text-[#16A34A] hover:bg-[#16A34A]/10'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 ${
                  isHelpful ? 'fill-current' : ''
                }`} />
                {isHelpful ? 'Terbantu' : 'Membantu'}
                {helpfulCount > 0 && ` (${helpfulCount})`}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Review Summary Component
 * Shows aggregate rating stats
 */

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function ReviewSummary({ 
  averageRating, 
  totalReviews, 
  ratingDistribution 
}: ReviewSummaryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-4xl md:text-5xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  dari {totalReviews.toLocaleString('id-ID')} ulasan
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
