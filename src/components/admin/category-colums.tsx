'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortableColumnHeader } from '../table/sortable-column-header';
import { ActionsMenu } from './actions-menu';

export type CategoryTableEntry = {
  id: string;
  name: string;
  numProducts: number;
};

export const categoryColumns: ColumnDef<CategoryTableEntry>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <SortableColumnHeader column={column} header="ID" className="!pl-1" />
    ),
    meta: { align: 'end' },
  },
  {
    accessorKey: 'name',
    header: 'Category Name',
  },
  {
    accessorKey: 'numProducts',
    header: ({ column }) => (
      <SortableColumnHeader
        column={column}
        header="# Products"
        className="!pl-1"
      />
    ),
    meta: { align: 'end' },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;

      const handleUpdate = () => {
        console.log('Update function call here. Category id:', category.id);
      };

      const handleDelete = () => {
        console.log('Update function call here. Category id:', category.id);
      };

      return <ActionsMenu updateFn={handleUpdate} deleteFn={handleDelete} />;
    },
  },
];
