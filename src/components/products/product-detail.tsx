import { Product } from '@/lib/types/product';
import { notFound } from 'next/navigation';
import QuantitySelector from '../quantity-selector';
import { Button } from '../ui/button';
import ProductImageCarousel from './product-image-carousel';

export default async function ProductDetail({
  productPromise,
}: {
  productPromise: Promise<Product | null>;
}) {
  const product = await productPromise;

  console.log(product);
  if (!product) notFound();

  return (
    <article className="@container w-full flex flex-col @lg:flex-row justify-center items-center gap-16 p-4">
      <section className="flex-1">
        <h1
          id={`product-${product.id}-header`}
          className="mb-2 text-2xl font-bold"
        >
          {product.title}
        </h1>
        <p className="my-2 text-lg font-semibold">${product.price}</p>
        <p id={`product-${product.id}-description`}>{product.description}</p>

        <section className="flex items-baseline justify-between w-full">
          <QuantitySelector className="my-3" />
          <span className="font-semibold text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        </section>
        <Button className="my-2 w-full">Add to Cart</Button>
      </section>
      <div className="flex-1 aspect-square w-full relative overflow-hidden rounded-md order-first">
        <ProductImageCarousel images={product.images} title={product.title} />
      </div>
    </article>
  );
}
