import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { FeaturedEquipment } from "@/components/FeaturedEquipment";

const Index = () => {
  const featuredAuctions = [
    {
      id: '1',
      title: '2020 Ford Transit Van Fleet',
      price: 18500,
      currentBid: 18500,
      nextMinimumBid: 19000,
      description: 'Fleet of well-maintained Ford Transit vans, perfect for delivery or service businesses.',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
      location: 'Chicago, IL',
      seller: 'Fleet Solutions Inc.',
      auctionEvent: 'June Commercial Vehicle Auction',
      endsAt: '2024-06-10T14:00:00Z',
      bids: 23,
    },
    {
      id: '2',
      title: 'Construction Equipment Lot',
      price: 45300,
      currentBid: 45300,
      nextMinimumBid: 46000,
      description: 'Complete construction equipment package including tools, machinery, and safety gear.',
      imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
      location: 'Denver, CO',
      seller: 'Mountain Construction Co.',
      auctionEvent: 'June Equipment Auction',
      endsAt: '2024-06-11T18:00:00Z',
      bids: 15,
    },
    {
      id: '3',
      title: 'Professional Tool Collection',
      price: 3200,
      currentBid: 3200,
      nextMinimumBid: 3300,
      description: 'Comprehensive set of professional-grade tools, perfect for contractors or workshops.',
      imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
      location: 'Phoenix, AZ',
      seller: 'Pro Tools Direct',
      auctionEvent: 'June Tools & Equipment Auction',
      endsAt: '2024-06-12T20:00:00Z',
      bids: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            The easiest way to buy and sell commercial and transportation equipment
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Vehicles, equipment, and machinery from trusted sellers worldwide
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Start Bidding
            </Button>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAuctions.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                type="auction"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <FeaturedEquipment />
    </div>
  );
};

export default Index;
