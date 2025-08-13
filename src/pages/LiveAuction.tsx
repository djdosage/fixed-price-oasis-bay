import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Grid, List, Search, Gavel, Timer, MapPin, Eye } from 'lucide-react';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';

interface LiveAuctionItem {
  id: string;
  lotNumber: number;
  title: string;
  currentBid: number;
  nextMinimumBid: number;
  imageUrl: string;
  location: string;
  usage: string;
  description: string;
  closingTime: string;
  bidCount: number;
  status: 'upcoming' | 'live' | 'closing-soon' | 'sold' | 'passed';
  highBidder?: string;
}

const LIVE_AUCTION_ITEMS: LiveAuctionItem[] = [
  {
    id: '1',
    lotNumber: 4,
    title: '2010 Volkswagen Jetta Automobile',
    currentBid: 2000,
    nextMinimumBid: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    location: 'Chilliwack, BC, CAN',
    usage: '194,529 km',
    description: '5 cyl 2.5 L Gasoline Engine • Automatic Transmission • Air Conditioner • Power Windows • Power Locks',
    closingTime: '2024-08-15T14:25:00Z',
    bidCount: 12,
    status: 'closing-soon',
  },
  {
    id: '2',
    lotNumber: 5,
    title: '2009 Pontiac Vibe Automobile',
    currentBid: 1300,
    nextMinimumBid: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1549399524-70d2d4fa4bc4?w=400&h=300&fit=crop',
    location: 'Chilliwack, BC, CAN',
    usage: '363,739 km',
    description: '4 cyl 2.4 L Gasoline Engine • Automatic Transmission • Air Conditioner • Power Windows • Power Locks',
    closingTime: '2024-08-15T14:30:00Z',
    bidCount: 8,
    status: 'live',
  },
  {
    id: '3',
    lotNumber: 9,
    title: '2004 Honda Accord Automobile',
    currentBid: 2200,
    nextMinimumBid: 0,
    imageUrl: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&fit=crop',
    location: 'Chilliwack, BC, CAN',
    usage: '237,264 km',
    description: 'V6 3.0 L Gasoline Engine • 2004 US EPA Label • Automatic Transmission • Air Conditioner • Power Windows',
    closingTime: '2024-08-15T14:20:00Z',
    bidCount: 0,
    status: 'sold',
  },
  {
    id: '4',
    lotNumber: 10,
    title: '1934 Ford Tudor Classic Car',
    currentBid: 8500,
    nextMinimumBid: 9000,
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    location: 'Chilliwack, BC, CAN',
    usage: 'Classic Vehicle',
    description: 'Vintage 1934 Ford Tudor • Restored Condition • Original Features',
    closingTime: '2024-08-15T14:35:00Z',
    bidCount: 23,
    status: 'live',
  },
];

export default function LiveAuctionPage() {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState(LIVE_AUCTION_ITEMS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('lot');
  const [selectedBidItem, setSelectedBidItem] = useState<string | null>(null);

  // Real-time countdown updates
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prevItems => 
        prevItems.map(item => {
          const now = new Date();
          const closing = new Date(item.closingTime);
          const timeLeft = closing.getTime() - now.getTime();
          
          if (timeLeft <= 0 && item.status !== 'sold') {
            return { ...item, status: 'sold' as const };
          } else if (timeLeft <= 300000 && item.status === 'live') { // 5 minutes
            return { ...item, status: 'closing-soon' as const };
          }
          
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeRemaining = (closingTime: string) => {
    const now = new Date();
    const closing = new Date(closingTime);
    const diff = closing.getTime() - now.getTime();

    if (diff <= 0) return 'Closed';

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  const getStatusColor = (status: LiveAuctionItem['status']) => {
    switch (status) {
      case 'closing-soon': return 'bg-destructive text-destructive-foreground';
      case 'live': return 'bg-green-500 text-white';
      case 'sold': return 'bg-gray-500 text-white';
      case 'passed': return 'bg-gray-400 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleWatchlistClick = (item: LiveAuctionItem) => {
    if (!isAuthenticated) return;

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

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lotNumber.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Auction</h1>
          <p className="text-muted-foreground">Showing 1-60 of {filteredItems.length} results</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by lot number or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lot">Lot Number</SelectItem>
            <SelectItem value="price">Current Bid</SelectItem>
            <SelectItem value="closing">Closing Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Items Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-2 left-2 ${getStatusColor(item.status)}`}>
                Lot {item.lotNumber}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => handleWatchlistClick(item)}
              >
                <Heart className={`h-4 w-4 ${isInWatchlist(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              {item.status === 'sold' && (
                <Badge className="absolute bottom-2 left-2 bg-green-600 text-white">
                  SOLD
                </Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3" />
                {item.location}
              </div>
              
              <div className="text-sm text-muted-foreground mb-3">
                Usage: {item.usage}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </p>
              
              {item.status !== 'sold' ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">High bid</p>
                      <p className="text-xl font-bold">CA${item.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Timer className="h-3 w-3" />
                        {getTimeRemaining(item.closingTime)}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.bidCount} bids</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      variant={item.status === 'closing-soon' ? 'destructive' : 'default'}
                      disabled={item.status === 'upcoming'}
                    >
                      <Gavel className="h-4 w-4 mr-2" />
                      {item.status === 'closing-soon' ? 'Bid Now!' : 'Bid now'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-lg font-bold">CA${item.currentBid.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Sold Aug 13, 2025</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}