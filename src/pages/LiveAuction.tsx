import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Grid, List, Search, Gavel, Timer, MapPin, Eye } from 'lucide-react';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';

// Import equipment images
import constructionLotImg from '@/assets/construction-equipment-lot.jpg';
import komatsuLoaderImg from '@/assets/komatsu-wa380-loader.jpg';
import skidSteerImg from '@/assets/skid-steer-loader.jpg';
import catExcavatorImg from '@/assets/cat-320d-excavator.jpg';
import telehandlerImg from '@/assets/telehandler-forklift.jpg';
import soilCompactorImg from '@/assets/soil-compactor.jpg';
import cat320DImg from '@/assets/cat-320d-excavator.jpg';
import komatsuDozerImg from '@/assets/komatsu-d65px-dozer.jpg';
import volvoExcavatorImg from '@/assets/volvo-ec300e-excavator.jpg';
import johnDeereLoaderImg from '@/assets/john-deere-544k-loader.jpg';
import mobileCraneImg from '@/assets/mobile-crane.jpg';
import catD6DozerImg from '@/assets/cat-d6-dozer.jpg';

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

const TIMED_AUCTION_ITEMS: LiveAuctionItem[] = [
  {
    id: '1',
    lotNumber: 4,
    title: '2019 Caterpillar 320 Excavator',
    currentBid: 85000,
    nextMinimumBid: 86000,
    imageUrl: constructionLotImg,
    location: 'Montgomery, AL, USA',
    usage: '3,250 hours',
    description: 'Well-maintained Cat 320 excavator with hydraulic thumb, A/C, backup camera, and GPS system. Recent service completed.',
    closingTime: '2024-08-15T14:25:00Z',
    bidCount: 12,
    status: 'closing-soon',
  },
  {
    id: '2',
    lotNumber: 5,
    title: '2020 Volvo L60H Wheel Loader',
    currentBid: 125000,
    nextMinimumBid: 127000,
    imageUrl: komatsuLoaderImg,
    location: 'Denver, CO, USA',
    usage: '2,180 hours',
    description: 'Volvo L60H wheel loader with quick coupler, ride control, and premium cab package. Excellent condition.',
    closingTime: '2024-08-15T14:30:00Z',
    bidCount: 18,
    status: 'live',
  },
  {
    id: '3',
    lotNumber: 9,
    title: '2018 John Deere 350G Dozer',
    currentBid: 95000,
    nextMinimumBid: 0,
    imageUrl: skidSteerImg,
    location: 'Atlanta, GA, USA',
    usage: '4,100 hours',
    description: 'John Deere 350G dozer with 6-way blade, ripper, and undercarriage in good condition. Ready to work.',
    closingTime: '2024-08-15T14:20:00Z',
    bidCount: 0,
    status: 'sold',
  },
  {
    id: '4',
    lotNumber: 10,
    title: '2021 Komatsu PC210LC Excavator',
    currentBid: 135000,
    nextMinimumBid: 137000,
    imageUrl: catExcavatorImg,
    location: 'Houston, TX, USA',
    usage: '1,850 hours',
    description: 'Low-hour Komatsu excavator with hydraulic thumb, premium cab, and full maintenance records.',
    closingTime: '2024-08-15T14:35:00Z',
    bidCount: 23,
    status: 'live',
  },
  {
    id: '5',
    lotNumber: 12,
    title: '2017 Bobcat S770 Skid Steer',
    currentBid: 42000,
    nextMinimumBid: 43000,
    imageUrl: telehandlerImg,
    location: 'Phoenix, AZ, USA',
    usage: '2,950 hours',
    description: 'Bobcat S770 skid steer with high-flow hydraulics, enclosed cab, and multiple attachment compatibility.',
    closingTime: '2024-08-15T14:40:00Z',
    bidCount: 15,
    status: 'live',
  },
  {
    id: '6',
    lotNumber: 15,
    title: '2019 Case 586H Forklift',
    currentBid: 35000,
    nextMinimumBid: 36000,
    imageUrl: soilCompactorImg,
    location: 'Jacksonville, FL, USA',
    usage: '3,200 hours',
    description: 'Case rough terrain forklift with 4WD, side shift, and fork positioner. Well maintained.',
    closingTime: '2024-08-15T14:45:00Z',
    bidCount: 8,
    status: 'live',
  },
  {
    id: '7',
    lotNumber: 18,
    title: '2020 Caterpillar 938M Wheel Loader',
    currentBid: 165000,
    nextMinimumBid: 167000,
    imageUrl: cat320DImg,
    location: 'Salt Lake City, UT, USA',
    usage: '1,650 hours',
    description: 'Cat 938M wheel loader with high-lift arms, ride control, and premium operator station.',
    closingTime: '2024-08-15T14:50:00Z',
    bidCount: 31,
    status: 'live',
  },
  {
    id: '8',
    lotNumber: 22,
    title: '2018 Takeuchi TB290 Mini Excavator',
    currentBid: 28000,
    nextMinimumBid: 29000,
    imageUrl: komatsuDozerImg,
    location: 'Portland, OR, USA',
    usage: '2,800 hours',
    description: 'Compact Takeuchi mini excavator with rubber tracks, auxiliary hydraulics, and canopy top.',
    closingTime: '2024-08-15T14:55:00Z',
    bidCount: 12,
    status: 'live',
  },
  {
    id: '9',
    lotNumber: 25,
    title: '2019 JLG 600S Aerial Lift',
    currentBid: 48000,
    nextMinimumBid: 49000,
    imageUrl: volvoExcavatorImg,
    location: 'Nashville, TN, USA',
    usage: '1,450 hours',
    description: 'JLG telescopic boom lift with 60ft reach, 4WD, and oscillating axle. Recent inspection completed.',
    closingTime: '2024-08-15T15:00:00Z',
    bidCount: 9,
    status: 'live',
  },
  {
    id: '10',
    lotNumber: 28,
    title: '2017 Liebherr L556 Wheel Loader',
    currentBid: 145000,
    nextMinimumBid: 147000,
    imageUrl: johnDeereLoaderImg,
    location: 'Chicago, IL, USA',
    usage: '3,850 hours',
    description: 'Liebherr wheel loader with bucket and fork attachments, joystick controls, and air conditioning.',
    closingTime: '2024-08-15T15:05:00Z',
    bidCount: 22,
    status: 'live',
  },
  {
    id: '11',
    lotNumber: 30,
    title: '2020 Kobelco SK210LC Excavator',
    currentBid: 118000,
    nextMinimumBid: 120000,
    imageUrl: mobileCraneImg,
    location: 'Las Vegas, NV, USA',
    usage: '2,100 hours',
    description: 'Kobelco excavator with long reach arm, hydraulic thumb, and premium operator cab package.',
    closingTime: '2024-08-15T15:10:00Z',
    bidCount: 17,
    status: 'live',
  },
  {
    id: '12',
    lotNumber: 35,
    title: '2018 Hamm HD140 Compactor',
    currentBid: 78000,
    nextMinimumBid: 79000,
    imageUrl: catD6DozerImg,
    location: 'Miami, FL, USA',
    usage: '2,650 hours',
    description: 'Hamm double drum vibratory compactor with oscillation, water spray system, and ROPS cabin.',
    closingTime: '2024-08-15T15:15:00Z',
    bidCount: 14,
    status: 'live',
  },
];

export default function TimedAuctionPage() {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState(TIMED_AUCTION_ITEMS);
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
          <h1 className="text-3xl font-bold">Timed Auction</h1>
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
                      <p className="text-xl font-bold">${item.currentBid.toLocaleString()}</p>
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
                  <p className="text-lg font-bold">${item.currentBid.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Sold Aug 13, 2024</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}