'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortableColumnHeader } from '../table/sortable-column-header';
import { DisabledActionsMenu } from './actions-menu';

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
    cell: () => (
      <DisabledActionsMenu tooltip="Actions are not currently enabled for Categories" />
    ),
  },
];
