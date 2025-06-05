import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWatchlist } from '@/contexts/WatchlistContext';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
  auctionEvent?: string;
  type: 'auction' | 'marketplace';
  nextMinimumBid?: number;
}

export function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
  location,
  auctionEvent,
  type,
  nextMinimumBid,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(id);

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(id);
    } else {
      addToWatchlist({
        id,
        title,
        price,
        description,
        imageUrl,
      });
    }
  };

  const handleViewDetails = () => {
    const basePath = type === 'auction' ? 'auctions' : 'marketplace';
    navigate(`/${basePath}/product/${id}`);
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              isWatchlisted ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleWatchlistClick}
          >
            <Heart className={`h-5 w-5 ${isWatchlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-2">
          <p className="text-xl font-bold">${price.toLocaleString()}</p>
          {nextMinimumBid && (
            <p className="text-sm text-gray-600">
              Next minimum bid: ${nextMinimumBid.toLocaleString()}
            </p>
          )}
          <p className="text-gray-600 line-clamp-2">{description}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {location}
          </p>
          {auctionEvent && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Event:</span> {auctionEvent}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
        <Button
          variant="default"
          className="flex-1"
          onClick={handleViewDetails}
        >
          {type === 'auction' ? 'Place Bid' : 'Buy Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
