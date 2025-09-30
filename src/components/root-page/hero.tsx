import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import HeroImgText from './hero-img-text';

export default function Hero() {
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
        <section className="flex flex-wrap gap-2 w-1/3">
          <section className="bg-purple-200/50 p-9 flex-1/3 relative">
            <HeroImgText text="Popular Laptop" />
            <Image
              src={'/hero/laptop.png'}
              alt="A Popular Laptop made by ROG(Rebublic of Gaming)"
              width={150}
              height={150}
              className="size-full"
            />
          </section>
          <section className="bg-purple-200/50 p-9 flex-1/3 relative">
            <HeroImgText text="New T-Shirt" />
            <Image
              src={'/hero/tshirt.png'}
              alt="A New Blue T-Shirt"
              width={150}
              height={150}
              className="size-full"
            />
          </section>
          <section className="bg-purple-200/50 p-9 flex-1/3 relative">
            <HeroImgText text="Featured Couch" />
            <Image
              src={'/hero/couch.png'}
              alt="A Featured Couch, made in gray cotton"
              width={150}
              height={150}
              className="size-full"
            />
          </section>
        </section>
      </div>
    </section>
  );
}
