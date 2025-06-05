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
    title: "2019 Ford F-150 XLT Pickup Truck",
    price: 28500,
    originalPrice: 32000,
    images: [
      "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0cce8743985?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
    ],
    seller: "Fleet Solutions",
    rating: 4.8,
    reviews: 45,
    condition: "Good",
    shipping: "Pickup Only",
    acceptsOffers: true,
    description: "Well-maintained fleet vehicle with regular service history. This F-150 XLT features 4WD capability, crew cab configuration, and has been primarily used for light commercial duties. Recent maintenance includes new tires and brake service.",
    specifications: {
      "Year": "2019",
      "Make": "Ford",
      "Model": "F-150 XLT",
      "Mileage": "78,500 miles",
      "Engine": "3.5L V6 EcoBoost",
      "Transmission": "10-Speed Automatic",
      "Drive Type": "4WD"
    }
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg bg-white shadow-sm border border-gray-200"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1 font-roboto">
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
                  className="w-full h-24 object-cover rounded-lg bg-white shadow-sm cursor-pointer hover:opacity-80 border border-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900 font-roboto">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium text-gray-900 font-roboto">{product.rating}</span>
                  <span className="text-gray-500 ml-1 font-roboto">({product.reviews} reviews)</span>
                </div>
                <Badge variant="outline" className="border-gray-300 text-gray-700 font-roboto">{product.condition}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-green-600 font-roboto">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through font-roboto">
                  ${product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Truck className="h-4 w-4 mr-2" />
                <span className="font-roboto">{product.shipping}</span>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div className="space-y-4">
              <div className="flex gap-3">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 font-roboto">
                  Buy It Now
                </Button>
                <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              
              {product.acceptsOffers && (
                <Button variant="outline" className="w-full py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-50 font-roboto">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Make an Offer
                </Button>
              )}
            </div>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900 font-roboto">Buyer Protection</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 font-roboto">
                  <li>• Inspection period available</li>
                  <li>• Secure payment processing</li>
                  <li>• Title and documentation support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 text-gray-900 font-roboto">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 font-roboto">{product.seller}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-roboto">{product.rating} seller rating</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-roboto">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 font-roboto">Description</h3>
              <p className="text-gray-700 leading-relaxed font-roboto">
                {product.description}
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 font-roboto">Vehicle Details</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 font-roboto">{key}:</span>
                    <span className="font-medium text-gray-900 font-roboto">{value}</span>
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
