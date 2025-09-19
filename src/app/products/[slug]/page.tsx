import QuantitySelector from '@/components/quantity-selector';
import Hero from '@/components/root-page/hero';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/lib/api/product-data-service';
import { isNumeric } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined | number }>;
}) {
  let { slug } = await params;
  let { id, index } = await searchParams;

  slug = slug && slug.trim();
  id = (id && String(id).trim()) || '0';
  index = index && String(index).trim();

  if (id && !isNumeric(String(id))) return notFound();

  const product = await getProductById(id);
  if (product?.slug !== slug) return notFound();

  if (!product) return notFound();

  index = index && isNumeric(String(index)) ? parseInt(String(index)) : 0;
  index = index < 0 ? 0 : index >= product.images.length ? 0 : index;

  return (
    <section>
      <Hero />
      <div className="m-16">
        <section className="flex justify-center items-start gap-16">
          <section className="">
            <Image
              className="mt-8 rounded-lg shadow-lg"
              src={product.images[index]}
              alt={product.title}
              width={300}
              height={370}
            />
          </section>
          <section className="w-128">
            <h1 className="mb-2 text-2xl font-bold">{product.title}</h1>
            <p className="my-2 text-lg font-semibold">${product.price}</p>
            <p className="text-justify">{product.description}</p>

            <section className="flex items-baseline justify-between w-full">
              <QuantitySelector className="my-3" />
              <span className="font-semibold text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                {product.category.name}
              </span>
            </section>
            <Button className="my-2 w-full">Add to Cart</Button>
          </section>
        </section>
      </div>
    </section>
  );
}
