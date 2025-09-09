import { ASSET_PATHS } from '@/lib/constants/assets';
import Image from 'next/image';
import { PagesNav } from './pages-nav';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <div className="flex justify-between mt-4">
      <PagesNav />
      <div className="flex items-center gap-2">
        <span className="font-bold">NextCart</span>
        <Image src={ASSET_PATHS.LOGO} alt="" width={32} height={32} />
      </div>
      <UserNav />
    </div>
  );
}
