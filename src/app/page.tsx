import FeaturedProducts from '@/components/root-page/featured-products';
import Hero from '@/components/root-page/hero';
import { LoadingSpinner } from '@/components/loading/loading-spinner';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className="content-grid full-width">
      <Hero />
      <FeaturedProducts />
    </main>
  );
}
