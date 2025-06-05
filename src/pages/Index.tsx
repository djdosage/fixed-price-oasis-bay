
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredAuctions = [
    {
      id: 1,
      title: "2020 Ford Transit Van Fleet",
      currentBid: "$18,500",
      timeLeft: "2h 45m",
      bidCount: 23,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Construction Equipment Lot",
      currentBid: "$45,300",
      timeLeft: "1d 3h",
      bidCount: 15,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Professional Tool Collection",
      currentBid: "$3,200",
      timeLeft: "5h 12m",
      bidCount: 8,
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 font-roboto">
            Commercial Asset Auctions
          </h1>
          <p className="text-xl mb-8 text-gray-600 font-roboto">
            Vehicles, equipment, and machinery from trusted sellers worldwide
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-roboto font-medium">
              Start Bidding
            </Button>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 font-roboto font-medium">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 font-roboto">Featured Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="relative">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white font-roboto">
                    Live Auction
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 font-roboto">{auction.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 font-roboto">Current Bid</p>
                      <p className="text-2xl font-bold text-green-600 font-roboto">{auction.currentBid}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-roboto">Time Left</p>
                      <p className="text-lg font-semibold text-red-600 flex items-center font-roboto">
                        <Clock className="h-4 w-4 mr-1" />
                        {auction.timeLeft}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-roboto">{auction.bidCount} bids</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-500">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-500">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-roboto">
                        Place Bid
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
