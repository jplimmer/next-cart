import CategoriesTab from '@/components/admin/categories-tab';
import ProductsTab from '@/components/admin/products-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';

export default async function AdminPage() {
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
            <Suspense
              fallback={
                <div className="flex w-full justify-center items-center mt-12 gap-4">
                  Loading...
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-300 border-t-transparent"></div>
                </div>
              }
            >
              <ProductsTab />
            </Suspense>
          </TabsContent>
          <TabsContent
            value="categories"
            className="flex flex-col p-4 space-y-3"
          >
            <Suspense
              fallback={
                <div className="flex w-full justify-center items-center mt-12">
                  Loading...
                </div>
              }
            >
              <CategoriesTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
