'use client';

import { Result } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Suspense, use, useEffect, useMemo, useRef, useState } from 'react';
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
  const [query, setQuery] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use Result of allResultsPromise once
  const allResults: Result<string[]> = useMemo(() => {
    if (!allResultsPromise)
      return { success: false, error: 'No Promise received for allResults' };
    return use(allResultsPromise);
  }, [allResultsPromise]);

  // Display list of results matching the query string
  useEffect(() => {
    if (!allResults.success || !allResults.data) return;

    if (!query.trim()) {
      setMatches([]);
      return;
    }

    const newMatches = allResults.data.filter((res) =>
      res.toLowerCase().includes(query.toLowerCase())
    );

    // Display new list with no items highlighted
    setShowList(newMatches.length > 0);
    setMatches(newMatches);
    setHighlightedIndex(-1);
  }, [allResults, query]);

  // Closes dropdown on outside click
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

  // Sets and submits query when match selected from list
  const selectMatch = (value: string) => {
    setQuery(value);
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
      className="flex flex-col items-center text-neutral-800"
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
          type="text"
          id="search-input"
          name="search"
          defaultValue={query}
          onChange={useDebouncedCallback((e) => setQuery(e.target.value), wait)}
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
      {allResultsPromise && (
        <Suspense fallback={null}>
          <AutocompleteDropdown
            matches={matches}
            query={query}
            highlightedIndex={highlightedIndex}
            onSetHighlightedIndex={setHighlightedIndex}
            onSelectMatch={selectMatch}
          />
        </Suspense>
      )}
    </div>
  );
}
