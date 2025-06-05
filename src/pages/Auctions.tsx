import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart, Grid, List, SlidersHorizontal, Timer, Filter, SortAsc } from 'lucide-react';
import { useState } from 'react';
import { LoginDialog } from '@/components/LoginDialog';
import { ProductCard } from '@/components/ProductCard';

interface AuctionItem {
  id: string;
  title: string;
  price: number;
  currentBid: number;
  nextMinimumBid: number;
  description: string;
  imageUrl: string;
  location: string;
  seller: string;
  endsAt: string;
  bids: number;
  auctionEvent: string;
}

// Mock data for auction listings
const AUCTION_ITEMS: AuctionItem[] = [
  {
    id: '1',
    title: 'Caterpillar D6 Dozer',
    price: 85000,
    currentBid: 85000,
    nextMinimumBid: 86000,
    description: 'Low-hour Cat D6 Dozer with ripper. Well maintained and ready to work.',
    imageUrl: 'https://images.unsplash.com/photo-1579633711380-cc4fd8ea2b31?w=400&h=300&fit=crop',
    location: 'Montgomery, AL',
    seller: 'Southern Auction Company',
    endsAt: '2024-06-10T14:00:00Z',
    bids: 12,
    auctionEvent: 'June Heavy Equipment Auction',
  },
  {
    id: '2',
    title: 'Volvo EC300E Excavator',
    price: 110000,
    currentBid: 110000,
    nextMinimumBid: 112000,
    description: 'Excellent condition Volvo excavator with low hours and full maintenance history.',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900b7d2?w=400&h=300&fit=crop',
    location: 'Atlanta, GA',
    seller: 'East Coast Auctions',
    endsAt: '2024-06-11T18:00:00Z',
    bids: 8,
    auctionEvent: 'June Heavy Equipment Auction',
  },
  {
    id: '3',
    title: 'Komatsu WA380 Wheel Loader',
    price: 95000,
    currentBid: 95000,
    nextMinimumBid: 96000,
    description: 'Well-maintained wheel loader with new tires and recent service.',
    imageUrl: 'https://images.unsplash.com/photo-1572893264577-13fea76a1764?w=400&h=300&fit=crop',
    location: 'Jacksonville, FL',
    seller: 'Florida Equipment Auctions',
    endsAt: '2024-06-12T20:00:00Z',
    bids: 15,
    auctionEvent: 'June Heavy Equipment Auction',
  },
];

export default function AuctionsPage() {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const handleWatchlistClick = (item: AuctionItem) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist({
        id: item.id,
        title: item.title,
        price: item.currentBid,
        description: item.description,
        imageUrl: item.imageUrl,
      });
    }
  };

  const getTimeRemaining = (endsAt: string) => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-end gap-4 mb-6">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>

        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {AUCTION_ITEMS.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              type="auction"
            />
          ))}
        </div>
      </div>

      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
} 