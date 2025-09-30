import { routes } from '@/lib/constants/routes';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { PagesNavMenu, UtilitiesNavMenu } from '../navigation';
import { SidebarTrigger } from '../ui/sidebar';
import { Logo } from './logo';

export function Header() {
  return (
    <header className={`full-width my-2`}>
      {/* Mobile menu */}
      <div className="md:hidden w-full flex justify-between">
        {/* <HamburgerNavMenu /> */}
        <SidebarTrigger icon={<Menu />} />
        <Link href={routes.home.href} className="flex items-center gap-2">
          <span className="font-bold">NextCart</span>
          <Logo size={32} />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:grid grid-cols-3 items-center justify-items-center">
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
