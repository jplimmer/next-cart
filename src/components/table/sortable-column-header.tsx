import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

export const SortableColumnHeader = <T,>({
  column,
  header,
  className,
}: {
  column: Column<T>;
  header: string | React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className={`gap-0 p-0 has-[svg]:px-0 ${className}`}
    >
      {header}
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </Button>
  );
};
