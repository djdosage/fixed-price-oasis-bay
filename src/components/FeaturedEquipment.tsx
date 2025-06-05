import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

// Mock data for featured equipment
const FEATURED_EQUIPMENT = [
  {
    id: '1',
    title: '2022 Komatsu PC360LC-11 Excavator',
    price: 285000,
    description: 'Low hours, excellent condition, full maintenance history',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900b7d2?w=400&h=300&fit=crop',
    location: 'Houston, TX',
    seller: 'Equipment Direct',
    type: 'marketplace' as const,
  },
  {
    id: '2',
    title: '2021 CAT D6 XE Dozer',
    price: 425000,
    description: 'Electric drive system, GPS ready, like new condition',
    imageUrl: 'https://images.unsplash.com/photo-1579633711380-cc4fd8ea2b31?w=400&h=300&fit=crop',
    location: 'Phoenix, AZ',
    seller: 'CAT Certified Dealer',
    type: 'marketplace' as const,
  },
  {
    id: '3',
    title: '2023 Volvo A45G Articulated Hauler',
    price: 565000,
    description: 'Only 500 hours, full warranty, ready to work',
    imageUrl: 'https://images.unsplash.com/photo-1572893264577-13fea76a1764?w=400&h=300&fit=crop',
    location: 'Atlanta, GA',
    seller: 'Volvo Construction',
    type: 'marketplace' as const,
  },
  {
    id: '4',
    title: '2022 Liebherr LTM 1100-5.2 Crane',
    price: 985000,
    description: 'All-terrain mobile crane, perfect condition',
    imageUrl: 'https://images.unsplash.com/photo-1570452165860-ec0d8e0c5c5e?w=400&h=300&fit=crop',
    location: 'Miami, FL',
    seller: 'Crane Specialists',
    type: 'marketplace' as const,
  },
];

export function FeaturedEquipment() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= FEATURED_EQUIPMENT.length - itemsToShow + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? FEATURED_EQUIPMENT.length - itemsToShow : prev - 1
    );
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Equipment</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {FEATURED_EQUIPMENT.map((item) => (
              <div key={item.id} className="flex-none w-[calc(33.333%-1rem)]">
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 