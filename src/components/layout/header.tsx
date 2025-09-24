import { routes } from '@/lib/constants/routes';
import Link from 'next/link';
import { PagesNavMenu, UtilitiesNavMenu } from '../navigation';
import { Logo } from './logo';

export function Header() {
  return (
    <header className={`full-width my-2`}>
      <div className="grid grid-cols-3 items-center justify-items-center">
        <PagesNavMenu className="justify-self-start" />
        <Link href={routes.home.href} className="flex items-center gap-2">
          <span className="font-bold">NextCart</span>
          <Logo size={32} />
        </Link>
        <UtilitiesNavMenu className="justify-self-end" />
      </div>
    </header>
  );
}
