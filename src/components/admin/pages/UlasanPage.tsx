import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Star, Check, X, EyeOff } from 'lucide-react';
import { mockReviews, Review } from '../../../lib/admin/mockData';
import { toast } from 'sonner@2.0.3';

export function UlasanPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: Review['status']) => {
    const badges = {
      'pending': { label: 'Menunggu', variant: 'secondary' as const, className: 'bg-yellow-600' },
      'published': { label: 'Dipublikasi', variant: 'default' as const, className: 'bg-green-600' },
      'hidden': { label: 'Disembunyikan', variant: 'secondary' as const }
    };
    return badges[status];
  };

  const filteredReviews = statusFilter === 'all' 
    ? reviews 
    : reviews.filter(r => r.status === statusFilter);

  const handleApprove = (id: string) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'published' as const } : r
    ));
    toast.success('Ulasan disetujui');
  };

  const handleReject = (id: string) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'hidden' as const } : r
    ));
    toast.success('Ulasan ditolak');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const publishedCount = reviews.filter(r => r.status === 'published').length;
  const hiddenCount = reviews.filter(r => r.status === 'hidden').length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ulasan</h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Moderasi dan kelola ulasan pelanggan
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-gray-500">Menunggu Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{publishedCount}</p>
                <p className="text-sm text-gray-500">Dipublikasi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <EyeOff className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{hiddenCount}</p>
                <p className="text-sm text-gray-500">Disembunyikan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="published">Dipublikasi</SelectItem>
                  <SelectItem value="hidden">Disembunyikan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              Filter Rating
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Daftar Ulasan ({filteredReviews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produk</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Ulasan</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => {
                const statusBadge = getStatusBadge(review.status);
                return (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{review.productName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {review.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{review.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-700 line-clamp-2">{review.content}</p>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant} className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {review.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(review.id)}
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(review.id)}
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}
                        {review.status === 'published' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReject(review.id)}
                          >
                            <EyeOff className="w-4 h-4 text-gray-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reviews Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredReviews.map((review) => {
          const statusBadge = getStatusBadge(review.status);
          return (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{review.productName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {review.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{review.customer}</span>
                      </div>
                    </div>
                    <Badge variant={statusBadge.variant} className={statusBadge.className}>
                      {statusBadge.label}
                    </Badge>
                  </div>
                  <div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-gray-700">{review.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('id-ID')}
                  </p>
                  {review.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleApprove(review.id)}
                      >
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Setujui
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleReject(review.id)}
                      >
                        <X className="w-4 h-4 mr-2 text-red-600" />
                        Tolak
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
