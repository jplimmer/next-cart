import { ProductCard } from '@/components/products/product-card';
import ProductFilters from '@/components/products/product-filters';
import ProductPagination from '@/components/products/product-pagination';
import {
  getCategories,
  getProductById,
  getProductsByFilters,
} from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
import { QueryFilters } from '@/lib/types/types';

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
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

  const products = (
    await Promise.all(
      lightProductsFromCategoryIDs
        .slice(startIndex, endIndex)
        .map((p) => getProductById(p.id))
    )
  ).filter((p): p is Product => p !== null);

  const filteredTotalProductsTotalPages = Math.ceil(
    lightProductsFromCategoryIDs.length / 20
  );

  return (
    <main className="full-width">
      <h1 className="text-4xl text-center my-16">Products</h1>
      <ProductFilters categories={categories} />
      {filteredTotalProductsTotalPages > 1 && (
        <ProductPagination totalPages={filteredTotalProductsTotalPages} />
      )}
      <section className="flex flex-wrap gap-6 w-5/6 m-auto mb-32 justify-center">
        {products.map((product: Product, index) => (
          <section className="w-1/4" key={index}>
            <ProductCard product={product} key={product.id} />
          </section>
        ))}
      </section>
    </main>
  );
}
