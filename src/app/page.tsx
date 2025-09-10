import { ProductCard } from '@/components/product-card';
import Hero from '@/components/root-page/hero';
import { getProducts } from '@/lib/api/products-data-server';

async function FeaturedProducts() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <FeaturedProducts />
        </div>
      </section>
    </main>
  );
}
