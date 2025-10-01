import { Button } from '@/components/ui/button';
import { getSlugFromTitle } from '@/lib/data/helpers';
import { getProductsPaginated } from '@/lib/data/product-data-service';
import { Product } from '@/lib/types/product';
import {
  capitaliseFirstLetter,
  hardTruncateText,
  IsImageUrl,
} from '@/lib/utils';
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

  const drawProduct = (
    product: Product,
    style: React.CSSProperties,
    txtLimit: number
  ) => {
    let txt =
      product.title?.split(' ')?.filter(Boolean)?.slice(-2)?.join(' ') ||
      product.title;
    txt = txt?.toLowerCase().startsWith('and ') ? product.title : txt;

    return (
      <Link
        key={product.id}
        href={`/products/${getSlugFromTitle(product.title)}`}
        className="bg-purple-200/50 p-1 flex-1/3 relative"
        style={style}
      >
        <HeroImgText
          text={capitaliseFirstLetter(hardTruncateText(txt, txtLimit))}
        />
        {product?.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.description}
            width={150}
            height={150}
            className="size-full object-cover"
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
      <div className="flex flex-col md:flex-row items-center justify-around p-16">
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h1 className="text-6xl mb-4">NextCart</h1>
          <p className="mb-8">An e-commerce page made in Next.js</p>
          <Button asChild variant={'secondary'} className="mb-12">
            <Link href={'/products'}>Shop Now &rarr;</Link>
          </Button>
        </div>
        <section
          className="grid grid-rows-2 grid-cols-5 gap-2 md:w-1/2 w-full"
          style={{
            gridTemplateAreas: `
              "a a c c c"
              "b b c c c"
            `,
          }}
        >
          {rndProducts.map(
            (product, idx) =>
              product &&
              drawProduct(
                product,
                { gridArea: String.fromCharCode(97 + idx) },
                idx <= 1 ? 35 : 50
              )
          )}
        </section>
      </div>
    </section>
  );
}
