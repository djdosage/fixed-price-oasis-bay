
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-gray-900 font-roboto">
              RB<span className="text-orange-500">Auction</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-orange-500 font-roboto ${
                  !isMarketplace ? 'text-orange-500' : 'text-gray-700'
                }`}
              >
                Auctions
              </Link>
              <Link 
                to="/marketplace" 
                className={`text-sm font-medium transition-colors hover:text-orange-500 font-roboto ${
                  isMarketplace ? 'text-orange-500' : 'text-gray-700'
                }`}
              >
                Marketplace
              </Link>
            </nav>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search items..." 
                className="pl-10 bg-gray-50 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-500">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-500">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-orange-500">
              <User className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-roboto">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
