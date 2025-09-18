import LoadingDots from '@/components/loading-dots';
import Hero from '@/components/root-page/hero';
import { getProducts } from '@/lib/api/products-data-server';
import { fallbackDataManager } from '@/lib/mocks/fallback-data/fallback-data-manager';
import { Product } from '@/lib/types/product';
import { lazyMinLoadTime } from '@/lib/utils';
import { Suspense } from 'react';

export default async function MerchandisePage() {
  const { data: products, usedFallback } = await fallbackDataManager<Product>({
    result: await getProducts(),
    useCleanDataset: false,
    fallbackIfLessThanNrItems: 20,
  });

  if (products.length === 0)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <Hero />
        <div className="mt-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-green-900">
            No Products Available
          </h1>
        </div>
      </main>
    );

  return (
    <main className="content-grid full-width">
      <div className="full-width items-center justify-items-center py-8 bg-green-950 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 row-start-2 w-full">
          {products.map((product, index) => {
            const delay = usedFallback
              ? // simulate variable network load times for fallback data
                [200, 400, 1400, 800, 1900, 1200, 1600, 700, 400, 900][
                  Math.floor(Math.random() * 10)
                ]
              : 0;

            const LazyCard = lazyMinLoadTime(
              () =>
                import('@/components/merchandise-card/merchandise-card-loader'),
              delay
            );

            return (
              <Suspense key={index} fallback={<LoadingDots />}>
                <LazyCard
                  id={product.id}
                  expandDescriptionText={false}
                  fallback={usedFallback ? product : null}
                />
              </Suspense>
            );
          })}
        </div>
      </div>
    </main>
  );
}
