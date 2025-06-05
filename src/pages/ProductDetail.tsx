
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Star, Truck, Shield, MessageCircle, Share } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();

  // Mock product data - in real app this would come from API
  const product = {
    id: Number(id),
    title: "MacBook Pro 16-inch M3",
    price: 2499,
    originalPrice: 2799,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    seller: "TechStore Pro",
    rating: 4.8,
    reviews: 124,
    condition: "New",
    shipping: "Free",
    acceptsOffers: true,
    description: "Latest MacBook Pro with M3 chip, featuring incredible performance and battery life. Perfect for professionals and creators.",
    specifications: {
      "Processor": "Apple M3 Chip",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "16.2-inch Liquid Retina XDR",
      "Graphics": "M3 GPU"
    }
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg bg-white shadow-sm"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-lg px-3 py-1">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.slice(1).map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${product.title} ${index + 2}`}
                  className="w-full h-24 object-cover rounded-lg bg-white shadow-sm cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                  <span className="text-gray-500 ml-1">({product.reviews} reviews)</span>
                </div>
                <Badge variant="outline">{product.condition}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-green-600">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Truck className="h-4 w-4 mr-2" />
                <span>{product.shipping} shipping</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6">
                  Buy It Now
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              
              {product.acceptsOffers && (
                <Button variant="outline" className="w-full py-6 text-lg">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Make an Offer
                </Button>
              )}
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Buyer Protection</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Money back guarantee</li>
                  <li>• Secure payment processing</li>
                  <li>• Fast and reliable shipping</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.seller}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {product.rating} seller rating
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
