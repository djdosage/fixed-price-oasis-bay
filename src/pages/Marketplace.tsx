
import Header from "@/components/Header";
import MarketplaceFilters from "@/components/MarketplaceFilters";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      title: "MacBook Pro 16-inch M3",
      price: 2499,
      originalPrice: 2799,
      image: "/placeholder.svg",
      seller: "TechStore Pro",
      rating: 4.8,
      reviews: 124,
      condition: "New",
      shipping: "Free",
      acceptsOffers: true
    },
    {
      id: 2,
      title: "Vintage Leather Jacket",
      price: 320,
      image: "/placeholder.svg",
      seller: "VintageFinds",
      rating: 4.9,
      reviews: 89,
      condition: "Excellent",
      shipping: "$15",
      acceptsOffers: true
    },
    {
      id: 3,
      title: "Professional Camera Lens",
      price: 1200,
      originalPrice: 1400,
      image: "/placeholder.svg",
      seller: "PhotoPro",
      rating: 4.7,
      reviews: 56,
      condition: "Like New",
      shipping: "Free",
      acceptsOffers: false
    },
    {
      id: 4,
      title: "Designer Watch Collection",
      price: 850,
      image: "/placeholder.svg",
      seller: "LuxuryTime",
      rating: 4.9,
      reviews: 203,
      condition: "New",
      shipping: "Free",
      acceptsOffers: true
    },
    {
      id: 5,
      title: "Artisan Coffee Set",
      price: 95,
      originalPrice: 120,
      image: "/placeholder.svg",
      seller: "CraftCoffee",
      rating: 4.6,
      reviews: 78,
      condition: "New",
      shipping: "$8",
      acceptsOffers: true
    },
    {
      id: 6,
      title: "Gaming Desktop PC",
      price: 1899,
      image: "/placeholder.svg",
      seller: "GameRig Pro",
      rating: 4.8,
      reviews: 167,
      condition: "New",
      shipping: "Free",
      acceptsOffers: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      
      {/* Marketplace Hero */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fixed-Price Marketplace
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Buy instantly or make an offer on premium items with transparent pricing
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">✓ Buy Now Available</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">✓ Make Offer Options</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm font-medium">✓ Instant Purchase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <MarketplaceFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-gray-600">
                  {products.length} items found
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
