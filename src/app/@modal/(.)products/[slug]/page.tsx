import Modal from '@/components/layout/modal';
import ProductCard from '@/components/product-card';
import { getTitleFromSlug } from '@/lib/api/helpers';
import { getProductByTitle } from '@/lib/api/product-data-service';
import { notFound } from 'next/navigation';

export default async function ProductModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const title = getTitleFromSlug(slug);
  const productResult = await getProductByTitle(title);

  if (!productResult.success) return notFound();
  const product = productResult.data;

  return (
    <Modal title={product.title} description={product.description}>
      <ProductCard product={product}></ProductCard>
    </Modal>
  );
}
