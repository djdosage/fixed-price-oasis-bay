
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Truck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  rating: number;
  reviews: number;
  condition: string;
  shipping: string;
  acceptsOffers: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="flex">
            <div className="w-48 h-32 relative">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500">
                  -{discount}%
                </Badge>
              )}
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/marketplace/product/${product.id}`}>
                  <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {product.condition}
                </Badge>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="h-4 w-4 mr-1" />
                    {product.shipping}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {product.acceptsOffers && (
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Make Offer
                    </Button>
                  )}
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            -{discount}%
          </Badge>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/marketplace/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{product.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {product.condition}
          </Badge>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-green-600">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Truck className="h-4 w-4 mr-1" />
            {product.shipping}
          </div>
        </div>

        <div className="space-y-2">
          {product.acceptsOffers && (
            <Button variant="outline" className="w-full" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Make Offer
            </Button>
          )}
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="sm">
            Buy Now
          </Button>
        </div>

        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-gray-600">Sold by {product.seller}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
