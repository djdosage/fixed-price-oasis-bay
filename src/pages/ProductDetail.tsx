import { useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share } from "lucide-react";
import { useWatchlist } from '@/contexts/WatchlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/LoginDialog';
import { useState } from "react";

// Import equipment image
import catD6DozerImg from '@/assets/cat-d6-dozer.jpg';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const isAuction = location.pathname.includes('/auctions/');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  // Mock product data - in real app this would come from API
  const product = {
    id: id || '',
    title: "2019 Caterpillar 320 Excavator",
    price: 125000,
    currentBid: 125000,
    nextMinimumBid: 126000,
    description: "Well-maintained Caterpillar 320 Excavator with low hours. Features include air conditioning, backup camera, and GPS system. Recently serviced with new tracks and hydraulic system inspection.",
    imageUrl: catD6DozerImg,
    location: "Dallas, TX",
    seller: "Heavy Equipment Solutions",
    auctionEvent: isAuction ? "June Heavy Equipment Auction" : undefined,
    endsAt: isAuction ? "2024-06-15T18:00:00Z" : undefined,
    bids: isAuction ? 12 : undefined,
    specifications: [
      { label: 'Make', value: 'Caterpillar' },
      { label: 'Model', value: '320' },
      { label: 'Year', value: '2019' },
      { label: 'Hours', value: '3,500' },
      { label: 'Serial Number', value: 'CAT0320X123456789' },
    ],
  };

  const handleWatchlistClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (isInWatchlist(product.id)) {
      removeFromWatchlist(product.id);
    } else {
      addToWatchlist({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
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
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              {isAuction && product.auctionEvent && (
                <Badge variant="secondary" className="text-sm">
                  {product.auctionEvent}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWatchlistClick}
              className={isInWatchlist(product.id) ? 'text-red-500' : 'text-gray-500'}
            >
              <Heart className={`h-6 w-6 ${isInWatchlist(product.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div>
            {isAuction ? (
              <>
                <p className="text-sm text-gray-600">Current Bid</p>
                <p className="text-3xl font-bold text-green-600">
                  ${product.currentBid?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Next minimum bid: ${product.nextMinimumBid?.toLocaleString()}
                </p>
                {product.endsAt && (
                  <p className="text-sm text-red-600 mt-2">
                    Time remaining: {getTimeRemaining(product.endsAt)}
                  </p>
                )}
              </>
            ) : (
              <p className="text-3xl font-bold">${product.price.toLocaleString()}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-semibold">{product.location}</p>
            </div>
            <div>
              <p className="text-gray-600">Seller</p>
              <p className="font-semibold">{product.seller}</p>
            </div>
            {isAuction && product.bids && (
              <div>
                <p className="text-gray-600">Total Bids</p>
                <p className="font-semibold">{product.bids}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {isAuction ? (
              <Button className="flex-1" size="lg">
                Place Bid
              </Button>
            ) : (
              <>
                <Button className="flex-1" size="lg">
                  Buy Now
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  Make Offer
                </Button>
              </>
            )}
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {product.specifications.map((spec) => (
                <div key={spec.label}>
                  <p className="text-gray-600">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Seller
            </Button>
            <Button variant="outline" className="flex-1">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </div>
  );
};

export default ProductDetail;
