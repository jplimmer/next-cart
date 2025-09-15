import LoadingDots from '@/components/loading-dots';
import Hero from '@/components/root-page/hero';
import { getProducts } from '@/lib/api/products-data-server';
import { Product } from '@/lib/types/product';
import { lazyMinLoadTime } from '@/lib/utils';
import { Suspense } from 'react';

export default async function MerchandisePage() {
  const products = (await getProducts()) as Product[];

  return (
    <main className="content-grid full-width">
      <Hero />
      <div className="full-width items-center justify-items-center bg-green-950 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 row-start-2 w-full">
          {products.map((product, index) => {
            const LazyMerchandiseCard = lazyMinLoadTime(
              /* for illustration purposes */
              () => import('@/components/merchandise-card'),
              [200, 400, 1400, 800, 1900, 1200, 1600, 700, 400, 700][
                Math.floor(Math.random() * (10 - 1))
              ]
            );
            return (
              <Suspense key={index} fallback={<LoadingDots />}>
                <LazyMerchandiseCard id={product.id} />
              </Suspense>
            );
          })}
        </div>
      </div>
    </main>
  );
}
