import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { LoginDialog } from '@/components/LoginDialog';

export function ProductDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // In a real app, you would fetch the product details from your API
  // For now, we'll use mock data
  const product = {
    id: id || '',
    title: 'Caterpillar 320 Excavator',
    price: 125000,
    year: 2019,
    hours: 3500,
    location: 'Dallas, TX',
    description: 'Well-maintained Caterpillar 320 Excavator with low hours. Features include air conditioning, backup camera, and GPS system. Recently serviced with new tracks and hydraulic system inspection.',
    specifications: [
      { label: 'Make', value: 'Caterpillar' },
      { label: 'Model', value: '320' },
      { label: 'Year', value: '2019' },
      { label: 'Hours', value: '3,500' },
      { label: 'Serial Number', value: 'CAT0320X123456789' },
    ],
    imageUrl: 'https://example.com/cat-320.jpg',
  };

  const handleWatchlistClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (isInWatchlist(product.id)) {
      removeFromWatchlist(product.id);
    } else {
      addToWatchlist(product);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWatchlistClick}
                className={isInWatchlist(product.id) ? 'text-red-500' : 'text-gray-500'}
              >
                <Heart className={`h-6 w-6 ${isInWatchlist(product.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="text-3xl font-bold">${product.price.toLocaleString()}</div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Year</p>
                <p className="font-semibold">{product.year}</p>
              </div>
              <div>
                <p className="text-gray-600">Hours</p>
                <p className="font-semibold">{product.hours.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Location</p>
                <p className="font-semibold">{product.location}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {product.specifications.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-gray-600">{spec.label}</p>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">Contact Seller</Button>
              <Button variant="outline" className="flex-1">Make Offer</Button>
            </div>
          </div>
        </div>
      </div>

      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
} 