import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoginDialog } from './LoginDialog';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, User, LogOut, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export function Navbar() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold">
              Equipment Market
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/marketplace">Marketplace</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/auctions">Auctions</Link>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search equipment..."
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/watchlist">Watchlist</Link>
            </Button>
            <Button>Sign In</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4 mt-3">
          <Button variant="ghost" asChild className="flex-1">
            <Link to="/marketplace">Marketplace</Link>
          </Button>
          <Button variant="ghost" asChild className="flex-1">
            <Link to="/auctions">Auctions</Link>
          </Button>
        </div>
      </div>

      <LoginDialog isOpen={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </nav>
  );
} 