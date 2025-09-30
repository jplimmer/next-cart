import FeaturedProducts from '@/components/root-page/featured-products';
import Hero from '@/components/root-page/hero';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className="content-grid full-width">
      <Hero />
      <Suspense fallback={<div>Loading featured products...</div>}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}
