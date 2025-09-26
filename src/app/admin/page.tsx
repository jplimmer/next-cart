import {
  productColumns,
  ProductTableEntry,
} from '@/components/admin/product-columns';
import DataTable from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { routes } from '@/lib/constants/routes';
import { getProducts } from '@/lib/data/product-data-service';
import Link from 'next/link';

const getProductTableEntries = async (): Promise<ProductTableEntry[]> => {
  const allProducts = await getProducts();

  if (allProducts.length === 0) {
    return [];
  }

  const ptes: ProductTableEntry[] = allProducts.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category.name,
    price: p.price,
  }));
  return ptes;
};

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

export default async function AdminPage() {
  const products = await getProductTableEntries();

  return (
    <main className="full-width p-8 space-y-8">
      <div className="flex flex-col">
        <h1 className="text-4xl">Manage catalog</h1>
        <Tabs defaultValue="products" className="mt-8">
          <TabsList className="w-full flex">
            <TabsTrigger value="products" className="flex-1">
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex-1">
              Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="flex flex-col p-4 space-y-3">
            <DataTable
              columns={productColumns}
              data={products}
              filterColumn="title"
              filterPlaceholder="Filter by product name..."
              addNewButton={
                <Button asChild className="self-end bg-green-900">
                  <Link href={routes.createProduct.href}>Add new product</Link>
                </Button>
              }
            />
          </TabsContent>
          <TabsContent
            value="categories"
            className="flex flex-col p-4 space-y-3"
          >
            <Button asChild className="self-end bg-green-900">
              <Link href={routes.createCategory.href}>Add new category</Link>
            </Button>
            <p>Categories table to go here</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
