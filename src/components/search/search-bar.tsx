'use client';

import { Result } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { AutocompleteDropdown } from './autocomplete-dropdown';

interface SearchInputProps {
  searchAction: (formData: FormData) => void;
  placeholder?: string;
  allResultsPromise?: Promise<Result<string[]>>;
  wait?: number;
}

export function SearchBar({
  searchAction,
  placeholder,
  allResultsPromise,
  wait = 600,
}: SearchInputProps) {
  // Separate states for query (updates search input value) and debouncedQuery (used to find matches)
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  const [matches, setMatches] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  // Focuses on search input with Ctrl+K keyboard shorcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Closes dropdown on click outside SearchBar component
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowList(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Resets search input if not navigating to a product page
  useEffect(() => {
    if (!pathname.startsWith('/products/')) {
      setQuery('');
      setDebouncedQuery('');
    }
  }, [pathname]);

  // Updates showList and reset highlightedIndex when matches change
  useEffect(() => {
    if (matches.length === 0) {
      setShowList(false);
    }
    setHighlightedIndex(-1);
  }, [matches]);

  // Handles KeyDown events for navigating results list and submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showList || matches.length === 0) return;

    if (e.key === 'Escape') {
      setShowList(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, matches.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        selectMatch(matches[highlightedIndex]);
      } else {
        submitQuery(query);
      }
    }
  };

  // Updates debouncedQuery for use by AutocompleteDropdown
  const debouncedUpdate = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setShowList(value.trim().length > 0);
  }, wait);

  // Handles input change and show list when user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedUpdate(e.target.value);
  };

  // Sets and submits query when match selected from list
  const selectMatch = (value: string) => {
    setQuery(value);
    debouncedUpdate.cancel();
    setDebouncedQuery(value);
    submitQuery(value);
  };

  // Closes list and submit query
  const submitQuery = (value: string) => {
    setShowList(false);

    const formData = new FormData();
    formData.append('search', value);

    searchAction(formData);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center text-neutral-800"
    >
      <form
        action={searchAction}
        className={cn(
          'flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30 border-input',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
        )}
      >
        <Label htmlFor="search-input" className="sr-only">
          Search
        </Label>
        <input
          ref={searchInputRef}
          type="text"
          id="search-input"
          name="search"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required
          autoComplete="off"
          className="focus-visible:outline-none placeholder:text-neutral-600"
        ></input>
        <Button type="submit" variant="ghost">
          <Search />
        </Button>
      </form>
      {allResultsPromise && showList && (
        <Suspense fallback={null}>
          <AutocompleteDropdown
            allResultsPromise={allResultsPromise}
            query={debouncedQuery}
            onSetMatches={setMatches}
            highlightedIndex={highlightedIndex}
            onSetHighlightedIndex={setHighlightedIndex}
            onSelectMatch={selectMatch}
          />
        </Suspense>
      )}
    </div>
  );
}
