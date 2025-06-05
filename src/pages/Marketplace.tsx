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
      title: "2019 Ford F-150 XLT Pickup Truck",
      price: 28500,
      originalPrice: 32000,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=300&fit=crop",
      seller: "Fleet Solutions",
      rating: 4.8,
      reviews: 45,
      condition: "Good",
      shipping: "Pickup Only",
      acceptsOffers: true
    },
    {
      id: 2,
      title: "Caterpillar 320D Excavator",
      price: 95000,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
      seller: "Heavy Equipment Co",
      rating: 4.9,
      reviews: 23,
      condition: "Excellent",
      shipping: "Freight",
      acceptsOffers: true
    },
    {
      id: 3,
      title: "John Deere 6120M Tractor",
      price: 78000,
      originalPrice: 85000,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      seller: "Farm Equipment Plus",
      rating: 4.7,
      reviews: 18,
      condition: "Very Good",
      shipping: "Freight",
      acceptsOffers: false
    },
    {
      id: 4,
      title: "Professional Tool Set - Complete Workshop",
      price: 2400,
      image: "https://images.unsplash.com/photo-1609205807107-e5b46a5b7c47?w=400&h=300&fit=crop",
      seller: "Industrial Tools Direct",
      rating: 4.9,
      reviews: 67,
      condition: "New",
      shipping: "$45",
      acceptsOffers: true
    },
    {
      id: 5,
      title: "2018 Chevrolet Silverado 2500HD",
      price: 34500,
      originalPrice: 38000,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      seller: "Commercial Vehicles Ltd",
      rating: 4.6,
      reviews: 34,
      condition: "Good",
      shipping: "Pickup Only",
      acceptsOffers: true
    },
    {
      id: 6,
      title: "Bobcat S650 Skid Steer Loader",
      price: 42000,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      seller: "Construction Equipment Pro",
      rating: 4.8,
      reviews: 29,
      condition: "Very Good",
      shipping: "Freight",
      acceptsOffers: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Marketplace Hero */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-roboto">
              Fixed-Price Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-roboto">
              Buy vehicles, equipment, and machinery instantly or make an offer
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-orange-700 font-roboto">✓ Buy Now Available</span>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-orange-700 font-roboto">✓ Make Offer Options</span>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-orange-700 font-roboto">✓ Inspection Available</span>
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
            <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-gray-300 text-gray-700 hover:bg-gray-50 font-roboto"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-gray-600 font-roboto">
                  {products.length} items found
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
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
