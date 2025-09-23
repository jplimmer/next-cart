'use client';

import { ColumnDef } from '@tanstack/react-table';

export type ProductTableEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
};

export const columns: ColumnDef<ProductTableEntry>[] = [
  {
    accessorKey: 'id',
    header: 'Product ID',
  },
  {
    accessorKey: 'title',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
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
