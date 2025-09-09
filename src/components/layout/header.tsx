import { ASSET_PATHS } from '@/lib/constants/assets';
import { routes } from '@/lib/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import { PagesNav } from './pages-nav';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <div className="flex justify-between mt-4">
      <PagesNav />
      <Link href={routes.home.href} className="flex items-center gap-2">
        <span className="font-bold">NextCart</span>
        <Image src={ASSET_PATHS.LOGO} alt="" width={32} height={32} />
      </Link>
      <UserNav />
    </div>
  );
}
