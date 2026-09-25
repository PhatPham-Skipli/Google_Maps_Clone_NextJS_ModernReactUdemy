'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LocationSearch from '@/components/location-search';
import { Place } from '@/lib/types/place';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, List, X } from 'lucide-react';

// Disable SSR for Map component since Leaflet requires browser globals (window, document)
const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted/20">
      <p className="text-sm text-muted-foreground">Đang tải bản đồ...</p>
    </div>
  ),
});

export default function Home() {
  const [place, setPlace] = useState<Place | null>(null);
  const [isMobileListCollapsed, setIsMobileListCollapsed] = useState(false);

  // Handle place selection: on mobile, collapse list to show map and marker
  const handlePlaceSelect = (selectedPlace: Place) => {
    setPlace(selectedPlace);
    setIsMobileListCollapsed(true);
  };

  return (
    <div className="relative flex h-dvh w-dvw overflow-hidden bg-background">
      {/* Desktop Sidebar (visible on md+) */}
      <aside className="hidden md:flex md:w-96 lg:w-105 h-full flex-col p-3 shrink-0 border-r border-border bg-card/60 backdrop-blur-md z-10">
        <LocationSearch
          onPlaceClick={setPlace}
          selectedPlace={place}
          className="h-full"
        />
      </aside>

      {/* Main Map View */}
      <main className="relative flex-1 h-full w-full">
        <Map place={place} />

        {/* Mobile Top Floating Search Overlay (visible on < md) */}
        <div className="md:hidden absolute top-3 inset-x-3 z-1000 max-h-[75vh] flex flex-col pointer-events-none">
          <div className="pointer-events-auto shadow-lg rounded-2xl">
            <LocationSearch
              onPlaceClick={handlePlaceSelect}
              selectedPlace={place}
              isMobileCollapsible
              isCollapsed={isMobileListCollapsed}
              onToggleCollapse={() => setIsMobileListCollapsed((prev) => !prev)}
              className={isMobileListCollapsed ? '' : 'max-h-[75vh]'}
            />
          </div>
        </div>

        {/* Mobile Floating Bottom Card for Active Place */}
        {place && (
          <div className="md:hidden absolute bottom-4 inset-x-4 z-1000 flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-between gap-3 w-full max-w-md rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md p-3 shadow-lg">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold truncate text-foreground">
                    {place.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Badge
                      variant="secondary"
                      className="font-mono text-[9px] px-1 py-0 h-3.5"
                    >
                      {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {isMobileListCollapsed && (
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() => setIsMobileListCollapsed(false)}
                    className="gap-1 h-7 text-xs"
                  >
                    <List className="size-3" />
                    <span>Danh sách</span>
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setPlace(null)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Bỏ chọn địa điểm"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
