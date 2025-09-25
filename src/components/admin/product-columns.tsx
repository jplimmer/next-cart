'use client';

import { getSlugFromTitle } from '@/lib/data/helpers';
import { ColumnDef } from '@tanstack/react-table';
import { ExpandableCell } from '../table/expandable-cell';
import { SortableColumnHeader } from '../table/sortable-column-header';
import { HoverPrefetchLink } from '../ui/hover-prefetch-link';
import { ActionsMenu } from './actions-menu';
import { deleteProduct } from '@/lib/actions/products';
import { toast } from 'react-hot-toast';

export type ProductTableEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
};

export const productColumns: ColumnDef<ProductTableEntry>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <SortableColumnHeader column={column} header="ID" className="!pl-1" />
    ),
    meta: { align: 'end' },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <SortableColumnHeader column={column} header="Name" />
    ),
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
    header: ({ column }) => (
      <SortableColumnHeader column={column} header="Category" />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <SortableColumnHeader column={column} header="Price" className="!pl-1" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return formatted;
    },
    meta: { align: 'end' },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;

      const handleUpdate = () => {
        console.log('Update function call here. Product id:', product.id);
      };

      const handleDelete = async () => {
        const result = await deleteProduct(product.id);
        if (result) toast.success('Product deleted successfully.');
        else toast.error('Could not delete product.');
      };

      return <ActionsMenu updateFn={handleUpdate} deleteFn={handleDelete} />;
    },
  },
];
