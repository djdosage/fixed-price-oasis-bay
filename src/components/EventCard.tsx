import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Clock, Users } from 'lucide-react';

interface EventCardProps {
  id: string;
  eventName: string;
  country: string;
  eventPhoto: string;
  startDate: string;
  endDate: string;
  closingDate: string; // When items start closing
  isOpenForBidding: boolean;
  isRegistered: boolean;
  itemCount?: number;
  onViewItems: (eventId: string) => void;
}

export function EventCard({
  id,
  eventName,
  country,
  eventPhoto,
  startDate,
  endDate,
  closingDate,
  isOpenForBidding,
  isRegistered,
  itemCount = 0,
  onViewItems,
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const closing = new Date(closingDate).getTime();
      const difference = closing - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [closingDate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative">
        <img
          src={eventPhoto}
          alt={eventName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={isOpenForBidding ? "default" : "secondary"}>
            {isOpenForBidding ? "Open for Bidding" : "Closed"}
          </Badge>
          <Badge variant={isRegistered ? "default" : "outline"}>
            {isRegistered ? "Registered" : "Not Registered"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold line-clamp-2">{eventName}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{country}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
          
          {itemCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{itemCount} items</span>
            </div>
          )}
        </div>

        {timeLeft && isOpenForBidding && (
          <div className="bg-accent/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Items start closing in:</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-background rounded p-2">
                <div className="text-lg font-bold">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">Days</div>
              </div>
              <div className="bg-background rounded p-2">
                <div className="text-lg font-bold">{timeLeft.hours}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="bg-background rounded p-2">
                <div className="text-lg font-bold">{timeLeft.minutes}</div>
                <div className="text-xs text-muted-foreground">Min</div>
              </div>
              <div className="bg-background rounded p-2">
                <div className="text-lg font-bold">{timeLeft.seconds}</div>
                <div className="text-xs text-muted-foreground">Sec</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onViewItems(id)}
          disabled={!isOpenForBidding}
        >
          View Items in Event
        </Button>
      </CardFooter>
    </Card>
  );
}