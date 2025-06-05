import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WatchlistItem {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isInWatchlist: (id: string) => boolean;
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: string) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (id: string) => {
    return watchlist.some(item => item.id === id);
  };

  const addToWatchlist = (item: WatchlistItem) => {
    if (!isInWatchlist(item.id)) {
      setWatchlist(prev => [...prev, item]);
    }
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist }}>
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