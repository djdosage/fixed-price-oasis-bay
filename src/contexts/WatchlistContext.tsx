import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface WatchlistItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (itemId: string) => void;
  isInWatchlist: (itemId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const { user } = useAuth();

  // Load watchlist from localStorage when user logs in
  useEffect(() => {
    if (user) {
      const savedWatchlist = localStorage.getItem(`watchlist-${user.id}`);
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } else {
      setWatchlist([]); // Clear watchlist when user logs out
    }
  }, [user]);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`watchlist-${user.id}`, JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const addToWatchlist = (item: WatchlistItem) => {
    if (!user) return; // Only allow adding items when logged in
    setWatchlist(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWatchlist = (itemId: string) => {
    if (!user) return;
    setWatchlist(prev => prev.filter(item => item.id !== itemId));
  };

  const isInWatchlist = (itemId: string) => {
    return watchlist.some(item => item.id === itemId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
} 