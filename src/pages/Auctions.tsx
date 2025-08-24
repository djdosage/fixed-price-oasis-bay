import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, Grid, List, SlidersHorizontal, Timer, Filter, SortAsc } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LoginDialog } from '@/components/LoginDialog';
import { ProductCard } from '@/components/ProductCard';

// Import heavy equipment images
import catD6DozerImg from '@/assets/cat-d6-dozer.jpg';
import volvoExcavatorImg from '@/assets/volvo-ec300e-excavator.jpg';
import komatsuLoaderImg from '@/assets/komatsu-wa380-loader.jpg';
import cat320DImg from '@/assets/cat-320d-excavator.jpg';
import johnDeereLoaderImg from '@/assets/john-deere-544k-loader.jpg';
import komatsuDozerImg from '@/assets/komatsu-d65px-dozer.jpg';

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
    imageUrl: catD6DozerImg,
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
    imageUrl: volvoExcavatorImg,
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
    imageUrl: komatsuLoaderImg,
    location: 'Jacksonville, FL',
    seller: 'Florida Equipment Auctions',
    endsAt: '2024-06-12T20:00:00Z',
    bids: 15,
    auctionEvent: 'June Heavy Equipment Auction',
  },
];

// Live auction items for the timed auction tab
const LIVE_AUCTION_ITEMS: AuctionItem[] = [
  {
    id: 'live-1',
    title: 'CAT 320D Hydraulic Excavator',
    price: 145000,
    currentBid: 145000,
    nextMinimumBid: 147000,
    description: '2018 CAT 320D with 2,400 hours. Excellent condition, full maintenance records.',
    imageUrl: cat320DImg,
    location: 'Houston, TX',
    seller: 'Texas Heavy Equipment',
    endsAt: '2024-06-08T16:30:00Z',
    bids: 23,
    auctionEvent: 'Live Timed Auction',
  },
  {
    id: 'live-2',
    title: 'John Deere 544K Wheel Loader',
    price: 125000,
    currentBid: 125000,
    nextMinimumBid: 127000,
    description: '2019 John Deere 544K with 1,800 hours. Like new condition.',
    imageUrl: johnDeereLoaderImg,
    location: 'Dallas, TX',
    seller: 'Southwest Auctions',
    endsAt: '2024-06-08T17:15:00Z',
    bids: 18,
    auctionEvent: 'Live Timed Auction',
  },
  {
    id: 'live-3',
    title: 'Komatsu D65PX Dozer',
    price: 95000,
    currentBid: 95000,
    nextMinimumBid: 97000,
    description: '2017 Komatsu D65PX with 3,200 hours. Well maintained with new undercarriage.',
    imageUrl: komatsuDozerImg,
    location: 'Austin, TX',
    seller: 'Central Texas Equipment',
    endsAt: '2024-06-08T18:00:00Z',
    bids: 15,
    auctionEvent: 'Live Timed Auction',
  },
];

export default function AuctionsPage() {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'upcoming');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['upcoming', 'live'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Auctions</h1>
          <p className="text-muted-foreground">Browse upcoming auctions and live timed events</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="upcoming">Upcoming Auctions</TabsTrigger>
            <TabsTrigger value="live">Live Timed Auction</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
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
          </TabsContent>

          <TabsContent value="live" className="mt-6">
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
              {LIVE_AUCTION_ITEMS.map((item) => (
                <ProductCard
                  key={item.id}
                  {...item}
                  type="auction"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
} 