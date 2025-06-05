
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
      title: "Vintage Rolex Submariner",
      currentBid: "$8,500",
      timeLeft: "2h 45m",
      bidCount: 23,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Classic Ferrari Model",
      currentBid: "$2,300",
      timeLeft: "1d 3h",
      bidCount: 15,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Antique Painting",
      currentBid: "$1,200",
      timeLeft: "5h 12m",
      bidCount: 8,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Auction Platform
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover rare and valuable items from around the world
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary">
              Start Bidding
            </Button>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    Live Auction
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{auction.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Bid</p>
                      <p className="text-2xl font-bold text-green-600">{auction.currentBid}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Time Left</p>
                      <p className="text-lg font-semibold text-red-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {auction.timeLeft}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{auction.bidCount} bids</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm">
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
