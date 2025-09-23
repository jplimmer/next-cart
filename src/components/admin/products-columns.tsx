'use client';

import { getSlugFromTitle } from '@/lib/data/helpers';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { HoverPrefetchLink } from '../ui/hover-prefetch-link';

export type ProductTableEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
};

interface ExpandableCellProps {
  value: string;
  render?: (value: string) => React.ReactNode;
}

const ExpandableCell = ({ value, render }: ExpandableCellProps) => {
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

export const columns: ColumnDef<ProductTableEntry>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-right pr-1">ID</div>,
    cell: ({ row }) => {
      return <div className="text-right pr-1">{row.getValue('id')}</div>;
    },
  },
  {
    accessorKey: 'title',
    header: 'Name',
    cell: ({ row }) => (
      <ExpandableCell
        value={row.getValue('title') ?? ''}
        render={(value) => (
          <HoverPrefetchLink href={`products/${getSlugFromTitle(value)}`}>
            {value}
          </HoverPrefetchLink>
        )}
      />
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <ExpandableCell value={row.getValue<string>('description') ?? ''} />
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return <div className="text-right">{formatted}</div>;
    },
  },
];
