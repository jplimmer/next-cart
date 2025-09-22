import { getProductById } from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
import MerchandiseCard from './merchandise-card';

export default async function MerchandiseCardLoader({
  id,
  expandDescriptionText = true,
  fallback,
}: {
  id: string;
  expandDescriptionText?: boolean;
  fallback?: Product | null;
}) {
  const product = fallback ?? (await getProductById(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <MerchandiseCard
      product={product}
      expandDescriptionText={expandDescriptionText}
    />
  );
}
