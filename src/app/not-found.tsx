import { ASSET_PATHS } from '@/lib/constants/assets';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="full-width bg-amber-50">
      <h1 className="sr-only">Page not found</h1>
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <p className="text-3xl font-bold">Did you get lost?</p>
        <p className="text-xl">
          We couldn&apos;t find the page you&apos;re looking for!
        </p>
        <Image
          src={ASSET_PATHS.NOTFOUND}
          alt={''}
          width={700}
          height={200}
          className="rounded-2xl mt-4"
        />
      </div>
    </main>
  );
}
