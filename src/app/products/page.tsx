import { PaginatedCardGridSkeleton } from '@/components/loading/card-grid-skeleton';
import { PaginatedCardGrid } from '@/components/products/paginated-card-grid';
import ProductFilters from '@/components/products/product-filters';
import { Separator } from '@/components/ui/separator';
import {
  getCategories,
  getProductsByFilters,
} from '@/lib/data/product-data-service';
import { ProductLight } from '@/lib/types/product';
import { QueryFilters } from '@/lib/types/types';
import { Suspense } from 'react';

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const MAX_PRODUCTS_PER_PAGE = 20;

  // Potential optimization: Use these as default values. Pass them to <ProductFilters/> and use them in their respective components
  const {
    query = '',
    categories: categoriesSearchParams = [], // Renaming for clarity
    pageNumber = 1,
  }: {
    query?: string;
    categories?: string[];
    pageNumber?: number;
  } = await searchParams;

  const getFilteredProducts = async (): Promise<ProductLight[]> => {
    const categories = await getCategories();

    // Based on category name, create an array of selected categoryIDs
    const categoryIDs = categories
      .filter((c) => categoriesSearchParams.includes(c.name))
      .map((c) => Number(c.id));

    const queryFilters: QueryFilters = { title: query, categoryIDs };

    const lightProductsFromCategoryIDs =
      await getProductsByFilters(queryFilters);

    return lightProductsFromCategoryIDs;
  };

  const tempCat = getCategories();

  return (
    <main className="full-width bg-gray-50 p-12 space-y-8">
      <h1 className="text-4xl text-center">Products</h1>
      <ProductFilters categoriesPromise={tempCat} />
      <Separator />
      <Suspense
        fallback={<PaginatedCardGridSkeleton cards={MAX_PRODUCTS_PER_PAGE} />}
      >
        <PaginatedCardGrid
          productsPromise={getFilteredProducts()}
          maxPerPage={MAX_PRODUCTS_PER_PAGE}
          currentPage={pageNumber}
        />
      </Suspense>
    </main>
  );
}
