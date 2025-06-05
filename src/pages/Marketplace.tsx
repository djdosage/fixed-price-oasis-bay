import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';

// Mock data for marketplace items
const MARKETPLACE_ITEMS = [
  {
    id: '1',
    title: 'Caterpillar 320 Excavator',
    price: 125000,
    description: 'Well-maintained excavator with low hours. Features include air conditioning and GPS.',
    imageUrl: 'https://example.com/cat-320.jpg',
    year: 2019,
    location: 'Dallas, TX',
    seller: 'Premium Equipment Co.',
  },
  {
    id: '2',
    title: 'John Deere 350G Excavator',
    price: 145000,
    description: 'Excellent condition with recent service. Includes multiple buckets.',
    imageUrl: 'https://example.com/jd-350g.jpg',
    year: 2020,
    location: 'Houston, TX',
    seller: 'Texas Heavy Machinery',
  },
];

export default function MarketplacePage() {
  const navigate = useNavigate();

  return (
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
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-xl font-bold">${item.price.toLocaleString()}</p>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
              <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {item.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Seller:</span> {item.seller}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
