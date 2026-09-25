'use client';

import { Place } from '@/lib/types/place';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaceCardProps {
  place: Place;
  isSelected?: boolean;
  onSelect: (place: Place) => void;
  className?: string;
}

export function PlaceCard({
  place,
  isSelected = false,
  onSelect,
  className,
}: PlaceCardProps) {
  return (
    <Card
      size="sm"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(place)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(place);
        }
      }}
      className={cn(
        'cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
        isSelected && 'border-primary bg-accent/60 shadow-xs',
        className,
      )}
    >
      <CardHeader className="p-3 pb-1.5">
        <div className="flex items-start gap-2">
          <MapPin
            className={cn(
              'size-4 mt-0.5 shrink-0 transition-colors',
              isSelected ? 'text-primary' : 'text-muted-foreground',
            )}
          />
          <CardTitle className="text-sm font-medium leading-tight">
            {place.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex flex-wrap gap-1.5 pl-6">
          <Badge
            variant="secondary"
            className="font-mono text-[10px] px-1.5 py-0 h-4"
          >
            Lat: {place.latitude.toFixed(4)}
          </Badge>
          <Badge
            variant="secondary"
            className="font-mono text-[10px] px-1.5 py-0 h-4"
          >
            Lng: {place.longitude.toFixed(4)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
