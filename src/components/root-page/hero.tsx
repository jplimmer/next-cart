import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import HeroImgText from './hero-img-text';

export default function Hero() {
  return (
    <section className="bg-gradient-to-tr from-green-950 to-green-800 flex place-items-center place-content-center p-16 justify-around">
      <article>
        <h1 className="text-6xl mb-4">NextCart</h1>
        <p className="mb-8">An e-commerce page made in Next.js</p>
        <Link href={'/products'}>
          <Button variant={'secondary'}>Shop Now &rarr;</Button>
        </Link>
      </article>
      <section className="flex flex-wrap gap-2 w-1/3">
        <Link href={'/'} className="bg-purple-200/50 p-9 flex-1/3 relative">
          <HeroImgText text="Popular Laptop" />
          <Image
            src={'/hero/laptop.png'}
            alt="A Popular Laptop made by ROG(Rebublic of Gaming)"
            width={150}
            height={150}
            className="size-full"
          />
        </Link>
        <Link href={'/'} className="bg-purple-200/50 p-9 flex-1/3 relative">
          <HeroImgText text="New T-Shirt" />
          <Image
            src={'/hero/tshirt.png'}
            alt="A New Blue T-Shirt"
            width={150}
            height={150}
            className="size-full"
          />
        </Link>
        <Link href={'/'} className="bg-purple-200/50 p-9 flex-1/3 relative">
          <HeroImgText text="Featured Couch" />
          <Image
            src={'/hero/couch.png'}
            alt="A Featured Couch, made in gray cotton"
            width={150}
            height={150}
            className="size-full"
          />
        </Link>
      </section>
    </section>
  );
}
