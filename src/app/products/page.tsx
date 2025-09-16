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
    category = '',
    pageNumber = 1,
  }: {
    query?: string;
    category?: string;
    pageNumber?: number;
  } = await searchParams;

  const products = await getProductsPaginated(
    20,
    (Math.max(pageNumber, 1) - 1) * 20
  );
  const categories = await getCategories();

  // TODO: Look into ways to optimize this. Ideally we dont want to fetch ALL products
  const totalPages = Math.ceil((await getProductsAmount()).length / 20);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) &&
      (category === '' ||
        product.category.name.toLowerCase() === category.toLowerCase())
  );

  return (
    <main>
      <h1 className="text-4xl text-center my-16">Products</h1>
      <ProductFilters categories={categories} />
      <ProductPagination totalPages={totalPages} />
      <section className="flex flex-wrap gap-6 w-5/6 m-auto mb-32 justify-center">
        {filteredProducts.map((product: Product) => (
          <section className="w-1/4" key={product.id}>
            <ProductCard product={product} key={product.id} />
          </section>
        ))}
      </section>
    </main>
  );
}
