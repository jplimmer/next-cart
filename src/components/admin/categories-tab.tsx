import { routes } from '@/lib/constants/routes';
import { getProducts } from '@/lib/data/product-data-service';
import Link from 'next/link';
import DataTable from '../table/data-table';
import { Button } from '../ui/button';
import { categoryColumns, CategoryTableEntry } from './category-colums';

export default async function CategoriesTab() {
  const getCategoryTableEntries = async (): Promise<CategoryTableEntry[]> => {
    const allProducts = await getProducts();

    if (allProducts.length === 0) {
      return [];
    }

    const categoryMap = new Map<string, CategoryTableEntry>();

    for (const p of allProducts) {
      const { id, name } = p.category;
      const existing = categoryMap.get(id);

      if (existing) {
        existing.numProducts += 1;
      } else {
        categoryMap.set(id, { id, name, numProducts: 1 });
      }
    }

    return Array.from(categoryMap.values());
  };
  const categories = await getCategoryTableEntries();

  return (
    <div className="w-2/3">
      <DataTable
        columns={categoryColumns}
        data={categories}
        filterColumn="name"
        filterPlaceholder="Filter by category name..."
        addNewButton={
          <Button asChild className="self-end bg-green-900">
            <Link href={routes.createCategory.href}>Add new category</Link>
          </Button>
        }
      />
    </div>
  );
}
