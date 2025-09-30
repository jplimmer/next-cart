import { routes } from '@/lib/constants/routes';
import { getNavigationData } from '@/lib/data/pages-nav-data';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { DesktopNav, UtilitiesNavMenu } from '../navigation';
import { SidebarTrigger } from '../ui/sidebar';
import { Logo } from './logo';

export function Header() {
  return (
    <header className={`full-width py-2`}>
      <div className="grid grid-cols-2 items-center justify-between md:grid-cols-3 md:justify-items-center">
        {/* Trigger for mobile pages menu (sidebar) */}
        <div className="flex items-end md:hidden">
          <SidebarTrigger icon={<Menu className="size-[24]" />} />
        </div>
        {/* Desktop pages menu */}
        <DesktopNav
          pages={getNavigationData()}
          className="hidden md:grid justify-self-start"
        />
        {/* Desktop logo */}
        <Link
          href={routes.home.href}
          className="hidden md:flex items-center gap-2"
        >
          <span className="font-bold">NextCart</span>
          <Logo size={32} />
        </Link>
        {/* Utilities nav */}
        <UtilitiesNavMenu className="justify-self-end" />
      </div>
    </header>
  );
}
