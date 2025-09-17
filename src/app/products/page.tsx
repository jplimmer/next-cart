import ProductCard from '@/components/product-card';
import ProductFilters from '@/components/products/product-filters';
import ProductPagination from '@/components/products/product-pagination';
import {
  getCategories,
  getProductsAmount,
  getProductsPaginated,
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
  const categoryIds: number[] = categories
    .filter((c) => categoriesSearchParams.includes(String(c.name)))
    .map((c) => Number(c.id));

  // A bunch of math to keep up with the fact that when you select
  // multiple categories, the offset and limit on each query needs
  // to be reduced
  const products = await getProductsPaginated(
    Math.ceil(20 / Math.max(categoryIds.length, 1)),
    (Math.max(pageNumber, 1) - 1) *
      Math.ceil(20 / Math.max(categoryIds.length, 1)),
    categoryIds,
    query
  );

  // TODO: Look into ways to optimize this. Ideally we dont want to fetch ALL products
  const totalProductsAmount = await getProductsAmount();

  const filteredTotalProductsAmounts = totalProductsAmount.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) &&
      (categoriesSearchParams.length === 0 ||
        Array.from(categoriesSearchParams).some(
          // A bit ugly ^, but if there is only one category, it returns a string for some reason
          (c: string) => c.toLowerCase() == product.category.name.toLowerCase()
        ))
  );

  const filteredTotalProductsTotalPages = Math.ceil(
    filteredTotalProductsAmounts.length / 20
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
