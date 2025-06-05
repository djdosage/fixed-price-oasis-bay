import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Equipment Marketplace</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the best deals on construction equipment or participate in live auctions
        </p>
      </div>

      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Marketplace Preview */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Featured Equipment</h2>
          <p className="text-gray-600 mb-4">
            Browse our selection of high-quality construction equipment from trusted sellers.
          </p>
          <Button variant="link" onClick={() => navigate('/marketplace')}>
            View All Equipment →
          </Button>
        </div>

        {/* Auctions Preview */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Live Auctions</h2>
          <p className="text-gray-600 mb-4">
            Bid on equipment in real-time and get the best deals on quality machinery.
          </p>
          <Button variant="link" onClick={() => navigate('/auctions')}>
            View All Auctions →
          </Button>
        </div>
      </div>
    </div>
  );
} 