import { routes } from '@/lib/constants/routes';
import { getSlugFromTitle } from '@/lib/data/helpers';
import { Product } from '@/lib/types/product';
import Link from 'next/link';
import { ProductCard } from './product-card';

export const CardGridLayout =
  'grid grid-cols-[repeat(auto-fit,16rem)] gap-6 justify-center';

export async function CardGrid({
  productsPromise,
}: {
  productsPromise: Promise<Product[]>;
}) {
  const products = await productsPromise;

  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground italic">
        No products found
      </p>
    );
  }

  return (
    <ul className={CardGridLayout}>
      {products.map((p, i) => {
        const slug = getSlugFromTitle(p.title);

        return (
          <li key={i} className="contents">
            <Link
              href={`${routes.products.href}/${slug}`}
              scroll={false}
              className="contents"
            >
              <ProductCard product={p} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
