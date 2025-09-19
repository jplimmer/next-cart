import ProductCard from '@/components/product-card';
import { routes } from '@/lib/constants/routes';
import { getSlugFromTitle } from '@/lib/data/helpers';
import { fetchProducts } from '@/lib/data/services/api-product-service';
import { fallbackDataManager } from '@/lib/mocks/fallback-data/fallback-data-manager';
import { Product } from '@/lib/types/product';
import Link from 'next/link';

export default async function FeaturedProducts() {
  const { data: products } = await fallbackDataManager<Product>({
    result: await fetchProducts(),
    useCleanDataset: true, // Use clean dataset for valid images
    fallbackIfLessThanNrItems: 20,
  });

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <section className="full-width py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 20).map((product) => {
            const slug = getSlugFromTitle(product.title);

            return (
              <li key={product.id}>
                <Link href={`${routes.products.href}/${slug}`} scroll={false}>
                  <ProductCard product={product} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
