import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { WatchlistProvider } from '@/contexts/WatchlistContext';
import HomePage from '@/pages/Home';
import MarketplacePage from '@/pages/Marketplace';
import AuctionsPage from '@/pages/Auctions';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/auctions" element={<AuctionsPage />} />
                <Route path="/watchlist" element={<div>Watchlist Page</div>} />
                <Route path="/product/:id" element={<div>Product Details Page</div>} />
              </Routes>
            </div>
            <Toaster />
            <Sonner />
          </Router>
        </TooltipProvider>
      </WatchlistProvider>
    </AuthProvider>
  );
}

export default App;
