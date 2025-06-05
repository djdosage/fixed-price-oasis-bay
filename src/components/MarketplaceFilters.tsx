
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

const MarketplaceFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Sports", "Books", 
    "Art & Collectibles", "Jewelry", "Automotive"
  ];

  const conditions = ["New", "Like New", "Excellent", "Good", "Fair"];

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 w-full"
              onClick={() => setActiveFilters([])}
            >
              Clear All
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              step={50}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Purchase Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="buy-now" />
            <Label htmlFor="buy-now" className="text-sm">Buy It Now</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="make-offer" />
            <Label htmlFor="make-offer" className="text-sm">Accepts Offers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="free-shipping" />
            <Label htmlFor="free-shipping" className="text-sm">Free Shipping</Label>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label htmlFor={category} className="text-sm">{category}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Condition */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Condition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox id={condition} />
              <Label htmlFor={condition} className="text-sm">{condition}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Seller Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Seller Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                {"★".repeat(rating)}{"☆".repeat(5-rating)} & up
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplaceFilters;
