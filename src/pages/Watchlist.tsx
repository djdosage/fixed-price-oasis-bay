import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your watchlist</h1>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your watchlist is empty</h1>
        <Button onClick={() => navigate('/')}>Browse Equipment</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
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
              <Button variant="outline" onClick={() => navigate(`/product/${item.id}`)}>
                View Details
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWatchlist(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Heart className="h-5 w-5 fill-current" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 