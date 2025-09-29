import { routes } from '@/lib/constants/routes';
import { getProductsPaginated } from '@/lib/data/product-data-service';

import Link from 'next/link';
import { Suspense } from 'react';
import { CardGrid, CardGridLayout } from '../products/card-grid';

export default function FeaturedProducts() {
  const numProducts = 4;

  return (
    <section className="content-grid full-width bg-gray-50 space-y-8 py-8">
      <header className={CardGridLayout}>
        <div className="col-span-full flex justify-between items-baseline text-green-800">
          <h2 className="flex-1 text-3xl text-center md:text-left">
            Featured Products
          </h2>
          <Link href={routes.products.href} className="text-xl hidden md:block">
            view all
          </Link>
        </div>
      </header>
      <Suspense fallback={''}>
        <CardGrid productsPromise={getProductsPaginated(numProducts, 0)} />
      </Suspense>
    </section>
  );
}
