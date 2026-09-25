'use client';

import { SubmitEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  query,
  onQueryChange,
  onClear,
  onSubmit,
  isLoading = false,
  placeholder = 'Nhập tên địa điểm...',
  className,
}: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className={cn('w-full', className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="pl-9 pr-8 h-9 text-sm"
            disabled={isLoading}
          />
          {query && !isLoading && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={onClear}
              aria-label="Xóa nội dung tìm kiếm"
            >
              <X className="size-3.5" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          size="default"
          className="h-9 px-3.5 shrink-0"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Tìm'}
        </Button>
      </div>
    </form>
  );
}
