import Modal from '@/components/layout/modal';
import { ProductDetailSkeleton } from '@/components/loading/product-detail-skeleton';
import ProductDetail from '@/components/products/product-detail';
import { getTitleFromSlug } from '@/lib/data/helpers';
import { getProductByTitle } from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
import { Suspense } from 'react';

export default async function ProductModal({
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
    <Modal title={slug} showTitle={false}>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail productPromise={getProductPromise(slug)} />
      </Suspense>
    </Modal>
  );
}
