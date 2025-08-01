import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

// Mock data for marketplace items
const MARKETPLACE_ITEMS = [
  {
    id: '1',
    title: 'Caterpillar 320 Excavator',
    price: 125000,
    description: 'Well-maintained excavator with low hours. Features include air conditioning and GPS.',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900b7d2?w=400&h=300&fit=crop',
    location: 'Dallas, TX',
    seller: 'Premium Equipment Co.',
  },
  {
    id: '2',
    title: 'John Deere 350G Excavator',
    price: 145000,
    description: 'Excellent condition with recent service. Includes multiple buckets.',
    imageUrl: 'https://images.unsplash.com/photo-1579633711380-cc4fd8ea2b31?w=400&h=300&fit=crop',
    location: 'Houston, TX',
    seller: 'Texas Heavy Machinery',
  },
];

export default function MarketplacePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541976590-713941681591?w=1200&h=400&fit=crop"
          alt="Construction site"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            Premium Equipment, Ready to Work
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="flex justify-end gap-4 mb-6">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKETPLACE_ITEMS.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              type="marketplace"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
