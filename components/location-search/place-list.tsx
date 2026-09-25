'use client';

import { Place } from '@/lib/types/place';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';
import { PlaceCard } from './place-card';
import { cn } from '@/lib/utils';

interface PlaceListProps {
  places: Place[];
  selectedPlaceId?: number | null;
  onPlaceSelect: (place: Place) => void;
  isLoading?: boolean;
  className?: string;
}

export function PlaceList({
  places,
  selectedPlaceId,
  onPlaceSelect,
  isLoading = false,
  className,
}: PlaceListProps) {
  return (
    <div className={cn('flex flex-1 flex-col min-h-0 gap-3', className)}>
      {/* Results count & status */}
      <div className="flex items-center justify-between px-1 text-xs text-muted-foreground shrink-0">
        <span>Danh sách kết quả</span>
        <Badge variant="outline" className="font-normal text-[11px]">
          {isLoading ? 'Đang tìm...' : `${places.length} địa điểm`}
        </Badge>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="flex flex-col gap-2 p-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/60 p-3 space-y-2 bg-muted/20"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full shrink-0" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
              <div className="flex gap-2 pl-6">
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : places.length === 0 ? (
        /* Empty State */
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground">
            <MapPin className="size-6" />
          </div>
          <p className="text-sm font-medium">Không tìm thấy địa điểm</p>
          <p className="mt-1 text-xs text-muted-foreground max-w-50">
            Vui lòng thử tìm kiếm với từ khóa khác
          </p>
        </div>
      ) : (
        /* Results List */
        <ScrollArea className="flex-1 -mx-2 px-2 min-h-0">
          <div className="flex flex-col gap-2 pb-2">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                isSelected={selectedPlaceId === place.id}
                onSelect={onPlaceSelect}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
