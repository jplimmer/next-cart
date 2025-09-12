import FeaturedProducts from '@/components/root-page/featured-products';
import Hero from '@/components/root-page/hero';

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
    </main>
  );
}
