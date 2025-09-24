import {
  productColumns,
  ProductTableEntry,
} from '@/components/admin/product-columns';
import ProductForm from '@/components/admin/product-form';
import ToggleForm from '@/components/admin/toggle-form-button';
import DataTable from '@/components/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProducts } from '@/lib/data/product-data-service';

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
          <TabsContent value="products" className="p-4">
            <ToggleForm>
              <ProductForm />
            </ToggleForm>
            <DataTable columns={productColumns} data={products} />
          </TabsContent>
          <TabsContent value="categories" className="p-4">
            <p>Categories table to go here</p>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
