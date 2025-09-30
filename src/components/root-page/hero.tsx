import { Button } from '@/components/ui/button';
import { getSlugFromTitle } from '@/lib/data/helpers';
import { getProductsPaginated } from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
import { IsImageUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import HeroImgText from './hero-img-text';

export default async function Hero() {
  const productsFromApi = await getProductsPaginated(30, 0);

  const results = await Promise.all(
    productsFromApi.map(async (p) => {
      const url = p?.images[0] ?? '';
      const isValid = await IsImageUrl(url, false);
      return isValid ? p : null;
    })
  );

  const filterForImage = results.filter(Boolean);
  const rndProducts =
    filterForImage.length > 3
      ? Array.from(
          { length: 3 },
          () =>
            filterForImage.splice(
              Math.floor(Math.random() * filterForImage.length),
              1
            )[0]
        )
      : filterForImage;

  const drawProduct = (product: Product, style: React.CSSProperties) => {
    let txt =
      product.title?.split(' ')?.filter(Boolean)?.slice(-2)?.join(' ') ||
      product.title;
    txt = txt?.toLowerCase().startsWith('and ') ? product.title : txt;
    return (
      <Link
        key={product.id}
        href={`/products/${getSlugFromTitle(product.title)}`}
        className="bg-purple-200/50 p-3 flex-1/3 relative"
        style={style}
      >
        <HeroImgText
          text={txt}
          className={txt?.length > 35 ? 'truncate w-[10.625rem]' : ''}
        />
        {product?.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.description}
            width={150}
            height={150}
            className="size-full"
          />
        ) : (
          <div className="flex items-center justify-center bg-green-900/60 text-sm size-full">
            No image ☹️
          </div>
        )}
      </Link>
    );
  };

  return (
    <section className="full-width bg-gradient-to-tr from-green-950 to-green-800 text-white">
      <div className="flex items-center justify-around py-16">
        <div>
          <h1 className="text-6xl mb-4">NextCart</h1>
          <p className="mb-8">An e-commerce page made in Next.js</p>
          <Button asChild variant={'secondary'}>
            <Link href={'/products'}>Shop Now &rarr;</Link>
          </Button>
        </div>
        <section
          className="grid grid-rows-2 grid-cols-4 gap-2"
          style={{
            gridTemplateAreas: `
              "a c c"
              "b c c"
            `,
          }}
        >
          {rndProducts.map(
            (product, idx) =>
              product &&
              drawProduct(product, { gridArea: String.fromCharCode(97 + idx) })
          )}
        </section>
      </div>
    </section>
  );
}
