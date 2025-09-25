import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ExpandableCellProps {
  value: string;
  render?: (value: string) => React.ReactNode;
}

export const ExpandableCell = ({ value, render }: ExpandableCellProps) => {
  const [expanded, setExpanded] = useState(false);
  const content = render ? render(value) : value;

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className={cn(
        'cursor-default max-w-[40ch]',
        expanded ? 'whitespace-normal break-words' : 'truncate'
      )}
      title={expanded ? undefined : value}
    >
      {content}
    </div>
  );
};
