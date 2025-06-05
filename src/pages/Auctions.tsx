import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart, Grid, List, SlidersHorizontal, Timer, Filter, SortAsc } from 'lucide-react';
import { useState } from 'react';
import { LoginDialog } from '@/components/LoginDialog';

interface AuctionItem {
  id: string;
  title: string;
  currentBid: number;
  nextMinimumBid: number;
  description: string;
  imageUrl: string;
  year: number;
  location: string;
  seller: string;
  endsAt: string;
  bids: number;
}

// Mock data for auction listings
const AUCTION_ITEMS: AuctionItem[] = [
  {
    id: '1',
    title: 'Caterpillar D6 Dozer',
    currentBid: 85000,
    nextMinimumBid: 86000,
    description: 'Low-hour Cat D6 Dozer with ripper. Well maintained and ready to work.',
    imageUrl: 'https://example.com/cat-d6.jpg',
    year: 2018,
    location: 'Montgomery, AL',
    seller: 'Southern Auction Company',
    endsAt: '2024-06-10T14:00:00Z',
    bids: 12,
  },
  {
    id: '2',
    title: 'Volvo EC300E Excavator',
    currentBid: 110000,
    nextMinimumBid: 112000,
    description: 'Excellent condition Volvo excavator with low hours and full maintenance history.',
    imageUrl: 'https://example.com/volvo-ec300e.jpg',
    year: 2020,
    location: 'Atlanta, GA',
    seller: 'East Coast Auctions',
    endsAt: '2024-06-11T18:00:00Z',
    bids: 8,
  },
  {
    id: '3',
    title: 'Komatsu WA380 Wheel Loader',
    currentBid: 95000,
    nextMinimumBid: 96000,
    description: 'Well-maintained wheel loader with new tires and recent service.',
    imageUrl: 'https://example.com/komatsu-wa380.jpg',
    year: 2019,
    location: 'Jacksonville, FL',
    seller: 'Florida Equipment Auctions',
    endsAt: '2024-06-12T20:00:00Z',
    bids: 15,
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
            <Card key={item.id} className={`flex flex-col ${viewMode === 'list' ? 'flex-row' : ''}`}>
              <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={`w-full object-cover rounded-md mb-4 ${
                      viewMode === 'list' ? 'h-32' : 'h-48'
                    }`}
                  />
                </CardContent>
              </div>
              <div className={viewMode === 'list' ? 'w-2/3 p-4' : ''}>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xl font-bold">${item.currentBid.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Next bid: ${item.nextMinimumBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {getTimeRemaining(item.endsAt)}
                      </p>
                      <p className="text-sm text-gray-600">{item.bids} bids</p>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{item.description}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {item.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Seller:</span> {item.seller}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Year:</span> {item.year}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate(`/product/${item.id}`)}>
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="default">
                      Place Bid
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWatchlistClick(item)}
                      className={isInWatchlist(item.id) ? 'text-red-500' : 'text-gray-500'}
                    >
                      <Heart className={`h-5 w-5 ${isInWatchlist(item.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
} 