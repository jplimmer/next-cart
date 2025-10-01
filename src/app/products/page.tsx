import { CardGridSkeleton } from '@/components/loading/card-grid-skeleton';
import { CardGrid } from '@/components/products/card-grid';
import ProductFilters from '@/components/products/product-filters';
import ProductPagination from '@/components/products/product-pagination';
import { Separator } from '@/components/ui/separator';
import {
  getCategories,
  getProductById,
  getProductsByFilters,
} from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
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

  const categories = await getCategories();

  // Based on category name, create an array of selected categoryIDs
  const categoryIDs = categories
    .filter((c) => categoriesSearchParams.includes(c.name))
    .map((c) => Number(c.id));

  const queryFilters: QueryFilters = { title: query, categoryIDs };

  const lightProductsFromCategoryIDs = await getProductsByFilters(queryFilters);

  // pagination boundaries
  const startIndex = (pageNumber - 1) * 20;
  const endIndex = pageNumber * 20;
  const filteredTotalProductsTotalPages = Math.ceil(
    lightProductsFromCategoryIDs.length / 20
  );

  const getFilteredProducts = async (): Promise<Product[]> => {
    const products = (
      await Promise.all(
        lightProductsFromCategoryIDs
          .slice(startIndex, endIndex)
          .map((p) => getProductById(p.id))
      )
    ).filter((p): p is Product => p !== null);

    return products;
  };

  return (
    <main className="full-width bg-gray-50 p-12 space-y-8">
      <h1 className="text-4xl text-center">Products</h1>
      <ProductFilters />
      <Separator />
      <section className="space-y-4">
        {filteredTotalProductsTotalPages > 1 && (
          <ProductPagination totalPages={filteredTotalProductsTotalPages} />
        )}
        <Suspense fallback={<CardGridSkeleton cards={MAX_PRODUCTS_PER_PAGE} />}>
          <CardGrid productsPromise={getFilteredProducts()}></CardGrid>
        </Suspense>
      </section>
    </main>
  );
}
