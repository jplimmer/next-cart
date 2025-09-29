import FeaturedProducts from '@/components/root-page/featured-products';
import Hero from '@/components/root-page/hero';
import { NewProducts } from '@/components/root-page/new-products';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="content-grid full-width space-y-8">
      <Hero />
      <FeaturedProducts />
      <Separator />
      <NewProducts />
    </main>
  );
}
