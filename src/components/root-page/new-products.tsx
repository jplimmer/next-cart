import { getProductsPaginated } from '@/lib/data/product-data-service';
import { Suspense } from 'react';
import { CardGridSkeleton } from '../loading/card-grid-skeleton';
import { CardGrid, CardGridLayout } from '../products/card-grid';

export function NewProducts() {
  const numProducts = 4;
  const offset = 4;

  return (
    <section className="content-grid full-width bg-gray-50 space-y-8 py-16">
      <header className={CardGridLayout}>
        <h2 className=" col-span-full text-green-800 text-3xl text-center md:text-left">
          New arrivals
        </h2>
      </header>
      <Suspense fallback={<CardGridSkeleton cards={numProducts} />}>
        <CardGrid productsPromise={getProductsPaginated(numProducts, offset)} />
      </Suspense>
    </section>
  );
}
