import { Result } from '@/lib/types/types';
import { capitaliseFirstLetter, splitByQuery } from '@/lib/utils';
import { use, useEffect, useMemo } from 'react';

interface AutocompleteProps {
  allResultsPromise: Promise<Result<string[]>>;
  query: string;
  onSetMatches: (matches: string[]) => void;
  highlightedIndex: number;
  onSetHighlightedIndex: (index: number) => void;
  onSelectMatch: (value: string) => void;
}

export function AutocompleteDropdown({
  allResultsPromise,
  query,
  onSetMatches,
  highlightedIndex,
  onSetHighlightedIndex,
  onSelectMatch,
}: AutocompleteProps) {
  const allResults = use(allResultsPromise);

  const matches = useMemo(() => {
    return allResults.success && query.trim()
      ? allResults.data.filter((res) =>
          res.toLowerCase().includes(query.toLowerCase())
        )
      : [];
  }, [query, allResults]);

  useEffect(() => {
    onSetMatches(matches);
  }, [matches, onSetMatches]);

  if (!allResults.success || !query.trim() || matches.length === 0) return null;

  // Returns markup with matching part of result underlined
  const formatMatch = (match: string, query: string) => {
    const parts = splitByQuery(match, query);

    return (
      <span>
        {capitaliseFirstLetter(parts.before)}
        <b className="underline font-normal">
          {parts.before ? parts.query : capitaliseFirstLetter(parts.query)}
        </b>
        {parts.after}
      </span>
    );
  };

  return (
    <ul
      className="
        absolute z-50 top-full left-0 right-0 w-full 
        bg-white border-1 border-neutral-300 rounded-md
        shadow-lg max-h-60 overflow-y-auto"
    >
      {matches.map((match, index) => (
        <li
          key={index}
          onMouseEnter={() => onSetHighlightedIndex(index)}
          onClick={() => {
            onSelectMatch(match);
          }}
          className={`px-4 rounded-sm border-b border-neutral-100 last:border-b-0 cursor-pointer text-sm ${
            index === highlightedIndex ? 'bg-neutral-600 text-white' : ''
          }`}
        >
          {formatMatch(match, query)}
        </li>
      ))}
    </ul>
  );
}
