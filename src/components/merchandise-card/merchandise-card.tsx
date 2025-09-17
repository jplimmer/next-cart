'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { ImageSlider } from '../image-slider';
import TextOutliner from '../text-outliner';

export default function MerchandiseCard({
  product,
  expandDescriptionText = true,
}: {
  product: Product;
  expandDescriptionText?: boolean;
}) {
  return (
    <section className="group bg-lime-900 w-full max-w-sm min-h-[500px] flex flex-col p-3 rounded-lg shadow-md border border-green-800/40">
      <article className="flex flex-col justify-between flex-grow">
        <div className="flex flex-col flex-grow space-y-4">
          <header className="w-full flex justify-center">
            <TextOutliner
              text={product.title}
              className="font-semibold text-xl line-clamp-1"
              textcolour="text-green-300"
              outlinecolour="text-silver-500"
              multiplier={1.5}
              outlineStrength={12}
            />
          </header>

          <ImageSlider
            slug={product?.slug}
            imageurl={
              Array.isArray(product?.images) && product.images.length
                ? product.images
                    .filter((url): url is string => typeof url === 'string')
                    .map((url) => ({
                      id: product?.id,
                      url,
                    }))
                : []
            }
          />

          <div
            className={`overflow-hidden transition-[max-height] duration-800 ease-in-out ${
              expandDescriptionText
                ? 'max-h-[6.5rem] group-hover:max-h-[1000px]'
                : 'max-h-none'
            }`}
          >
            <TextOutliner
              text={product.description}
              className={`text-base transition-all duration-300 line-clamp-4 ${
                expandDescriptionText ? 'group-hover:line-clamp-none' : ''
              }`}
              textcolour="text-white"
              outlinecolour="text-black"
              multiplier={2}
              outlineStrength={9}
            />
          </div>
        </div>
        <section className="flex justify-center">
          <TextOutliner
            text={`$${product.price}`}
            className="font-semibold text-2xl mt-3"
            textcolour="text-green-300"
            outlinecolour="text-black-500"
            multiplier={2.8}
            outlineStrength={12}
          />
        </section>

        <Button
          variant="outline"
          className="bg-green text-[#004F44] w-full text-sm p-5 cursor-pointer mt-4"
        >
          <TextOutliner text="Add to cart" />
        </Button>
      </article>
    </section>
  );
}
