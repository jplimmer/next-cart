import ProductCard from '@/components/product-card';
import ProductFilters from '@/components/products/product-filters';
import ProductPagination from '@/components/products/product-pagination';
import {
  getCategories,
  getProduct,
  getProductsByCategoryIDs,
} from '@/lib/api/products-data-server';
import { Product } from '@/lib/types/product';

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
  const categoryIds = categories
    .filter((c) => categoriesSearchParams.includes(c.name))
    .map((c) => Number(c.id));

  const lightProductsFromCategoryIDs =
    await getProductsByCategoryIDs(categoryIds);
  // pagination boundaries
  const start = (pageNumber - 1) * 20;
  const end = pageNumber * 20;

  const products = (
    await Promise.all(
      lightProductsFromCategoryIDs
        .slice(start, end)
        .map((p) => getProduct(p.id))
    )
  ).filter((p): p is Product => p !== null);

  const filteredTotalProductsTotalPages = Math.ceil(
    lightProductsFromCategoryIDs.length / 20
  );

  return (
    <main>
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
