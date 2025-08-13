import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AuctionsPage from "./pages/Auctions";
import LiveAuction from "./pages/LiveAuction";
import Watchlist from "./pages/Watchlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WatchlistProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/marketplace/product/:id" element={<ProductDetail />} />
                <Route path="/auctions" element={<AuctionsPage />} />
                <Route path="/live-auction" element={<LiveAuction />} />
                <Route path="/auctions/product/:id" element={<ProductDetail />} />
                <Route path="/live-auction/product/:id" element={<ProductDetail />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WatchlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
