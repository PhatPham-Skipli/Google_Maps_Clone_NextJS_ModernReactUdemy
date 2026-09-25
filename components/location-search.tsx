'use client';

import { SubmitEvent, useState } from 'react';
import { Place } from '@/lib/types/place';
import { cn } from '@/lib/utils';
import { Navigation, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { search } from '@/lib/api/search';
import { SearchInput, PlaceList } from './location-search/index';

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
  selectedPlace?: Place | null;
  className?: string;
  isMobileCollapsible?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Mock places data for initial UI preview
const initialPlaces: Place[] = [
  {
    id: 1,
    name: 'Nhà của Phu',
    latitude: 10.060434181283387,
    longitude: 105.75116102366084,
  },
  {
    id: 2,
    name: 'Nhà của Bảo',
    latitude: 10.7921094,
    longitude: 106.5875752,
  },
  {
    id: 3,
    name: 'Nhà của Yuki',
    latitude: 10.901772395409338,
    longitude: 106.63119545038978,
  },
  {
    id: 4,
    name: 'Nhà của Trọng',
    latitude: 21.0368,
    longitude: 105.8346,
  },
];

export default function LocationSearch({
  onPlaceClick,
  selectedPlace,
  className,
  isMobileCollapsible = false,
  isCollapsed = false,
  onToggleCollapse,
}: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [internalSelectedPlaceId, setInternalSelectedPlaceId] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  // Derive active place ID: use controlled prop when provided, fallback to internal state
  const currentSelectedPlaceId =
    selectedPlace !== undefined
      ? (selectedPlace?.id ?? null)
      : internalSelectedPlaceId;

  // Handle selecting a place
  const handlePlaceSelect = (place: Place) => {
    setInternalSelectedPlaceId(place.id);
    onPlaceClick(place);
  };

  // Clear query input
  const handleClearQuery = () => {
    setQuery('');
  };

  // Submit search query to Nominatim API
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await search(query.trim());
      setPlaces(results);
      // Auto expand list on mobile if search returns results
      if (isMobileCollapsible && isCollapsed && onToggleCollapse) {
        onToggleCollapse();
      }
    } catch (error) {
      console.error('Failed to search locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border bg-card/95 backdrop-blur-md p-4 text-card-foreground shadow-sm transition-all',
        className,
      )}
    >
      {/* Header title */}
      <div className="flex items-center justify-between border-b pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Navigation className="size-4" />
          </div>
          <h2 className="font-semibold text-base tracking-tight">
            Tìm kiếm địa điểm
          </h2>
        </div>

        {/* Optional collapse button for mobile drawer/overlay */}
        {isMobileCollapsible && onToggleCollapse && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground"
            aria-label={isCollapsed ? 'Mở rộng danh sách' : 'Thu gọn danh sách'}
          >
            {isCollapsed ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronUp className="size-4" />
            )}
          </Button>
        )}
      </div>

      {/* Search input form */}
      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onClear={handleClearQuery}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Place results list (hidden if collapsed on mobile) */}
      {!isCollapsed && (
        <PlaceList
          places={places}
          selectedPlaceId={currentSelectedPlaceId}
          onPlaceSelect={handlePlaceSelect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
