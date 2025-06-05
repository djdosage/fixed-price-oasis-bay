import { useWatchlist } from '@/contexts/WatchlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your watchlist is empty</h2>
          <p className="text-gray-600 mb-6">Start adding items to your watchlist to keep track of them.</p>
          <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-xl font-bold">${item.price.toLocaleString()}</p>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/marketplace/product/${item.id}`)}
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWatchlist(item.id)}
                className="text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 