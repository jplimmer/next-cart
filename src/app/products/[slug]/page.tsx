import { LoadingSpinner } from '@/components/loading/loading-spinner';
import ProductDetail from '@/components/products/product-detail';
import { getTitleFromSlug } from '@/lib/data/helpers';
import { getProductByTitle } from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const getProductPromise = async (slug: string): Promise<Product | null> => {
    const title = getTitleFromSlug(slug);

    return getProductByTitle(title);
  };

  return (
    <main className="@container full-width place-items-center py-8">
      <Suspense fallback={<LoadingSpinner className="text-2xl" />}>
        <ProductDetail productPromise={getProductPromise(slug)} />
      </Suspense>
    </main>
  );
}
