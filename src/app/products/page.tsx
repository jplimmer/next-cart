import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/api/products-data-server';
import { Product } from '@/lib/types/product';

export default async function Products() {
  const products = await getProducts();
  return (
    <main>
      <h1 className="text-4xl text-center my-16">Products</h1>
      <section className="flex flex-wrap gap-6 w-5/6 m-auto mb-32 justify-center">
        {products?.map((product: Product) => (
          <section className="w-1/4" key={product.id}>
            <ProductCard product={product} key={product.id} />
          </section>
        ))}
      </section>
    </main>
  );
}
