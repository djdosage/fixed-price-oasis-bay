import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { EventCard } from "@/components/EventCard";
import { FeaturedEquipment } from "@/components/FeaturedEquipment";

// Import equipment images
import telehandlerImg from '@/assets/telehandler-forklift.jpg';
import constructionLotImg from '@/assets/construction-equipment-lot.jpg';
import skidSteerImg from '@/assets/skid-steer-loader.jpg';
import heavyEquipmentAuctionImg from '@/assets/heavy-equipment-auction.jpg';
import catExcavatorImg from '@/assets/cat-320d-excavator.jpg';
import mobileCraneImg from '@/assets/mobile-crane.jpg';

const Index = () => {
  const featuredAuctions = [
    {
      id: '1',
      title: '2020 Ford Transit Van Fleet',
      price: 18500,
      currentBid: 18500,
      nextMinimumBid: 19000,
      description: 'Fleet of well-maintained Ford Transit vans, perfect for delivery or service businesses.',
      imageUrl: telehandlerImg,
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
      imageUrl: constructionLotImg,
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
      imageUrl: skidSteerImg,
      location: 'Phoenix, AZ',
      seller: 'Pro Tools Direct',
      auctionEvent: 'June Tools & Equipment Auction',
      endsAt: '2024-06-12T20:00:00Z',
      bids: 8,
    },
  ];

  const upcomingEvents = [
    {
      id: 'event-1',
      eventName: 'Dallas Heavy Equipment Auction',
      country: 'United States',
      eventPhoto: heavyEquipmentAuctionImg,
      startDate: '2024-08-15T09:00:00Z',
      endDate: '2024-08-17T17:00:00Z',
      closingDate: '2024-08-17T15:30:00Z',
      isOpenForBidding: true,
      isRegistered: true,
      itemCount: 245,
    },
    {
      id: 'event-2',
      eventName: 'Toronto Industrial Equipment Sale',
      country: 'Canada',
      eventPhoto: catExcavatorImg,
      startDate: '2024-08-20T08:00:00Z',
      endDate: '2024-08-22T16:00:00Z',
      closingDate: '2024-08-22T14:00:00Z',
      isOpenForBidding: true,
      isRegistered: false,
      itemCount: 180,
    },
    {
      id: 'event-3',
      eventName: 'Melbourne Mining Equipment Auction',
      country: 'Australia',
      eventPhoto: mobileCraneImg,
      startDate: '2024-08-25T10:00:00Z',
      endDate: '2024-08-27T18:00:00Z',
      closingDate: '2024-08-27T16:45:00Z',
      isOpenForBidding: false,
      isRegistered: true,
      itemCount: 320,
    },
  ];

  const handleViewItems = (eventId: string) => {
    console.log('View items for event:', eventId);
    // Navigate to event items page
  };

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

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Upcoming Auction Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onViewItems={handleViewItems}
              />
            ))}
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
