import CategoriesTab from '@/components/admin/categories-tab';
import ProductsTab from '@/components/admin/products-tab';
import { LoadingSpinner } from '@/components/loading/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';

export default function AdminPage() {
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
            <Suspense fallback={<LoadingSpinner className="mt-12" />}>
              <ProductsTab />
            </Suspense>
          </TabsContent>
          <TabsContent
            value="categories"
            className="flex flex-col p-4 space-y-3"
          >
            <Suspense fallback={<LoadingSpinner className="mt-12" />}>
              <CategoriesTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
