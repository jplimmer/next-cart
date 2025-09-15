import { capitaliseFirstLetter, splitByQuery } from '@/lib/utils';

interface AutocompleteProps {
  matches: string[];
  query: string;
  highlightedIndex: number;
  onSetHighlightedIndex: (index: number) => void;
  onSelectMatch: (value: string) => void;
}

export function AutocompleteDropdown({
  matches,
  query,
  highlightedIndex,
  onSetHighlightedIndex,
  onSelectMatch,
}: AutocompleteProps) {
  // Returns markup with matching part of result underlined
  const formatMatch = (result: string, query: string) => {
    const parts = splitByQuery(result, query);

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

  if (matches.length === 0) return null;

  return (
    <ul
      className="
        absolute top-full left-0 right-0 w-full 
        bg-white border-1 border-neutral-300 rounded-md
        shadow-lg max-h-60-overflow-y-auto"
    >
      {matches.map((match, index) => (
        <li
          key={index}
          onMouseEnter={() => onSetHighlightedIndex(index)}
          onClick={() => {
            onSelectMatch(match);
          }}
          className={`px-4 rounded-sm border-b border-neutral-100 last:border-b-0 cursor-pointer ${
            index === highlightedIndex ? 'bg-neutral-600 text-white' : ''
          }`}
        >
          {formatMatch(match, query)}
        </li>
      ))}
    </ul>
  );
}
