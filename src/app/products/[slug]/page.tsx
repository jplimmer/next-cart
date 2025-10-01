import ProductDetail from '@/components/products/product-detail';
import { getTitleFromSlug } from '@/lib/data/helpers';
import { getProductByTitle } from '@/lib/data/product-data-service';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getTitleFromSlug(slug);

  const productResult = await getProductByTitle(title);

  if (productResult === null) notFound();

  return (
    <main className="@container full-width place-items-center py-8">
      <ProductDetail product={productResult} />
    </main>
  );
}
