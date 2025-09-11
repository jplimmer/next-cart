import { routes } from '@/lib/constants/routes';
import Link from 'next/link';
import { Logo } from './logo';
import { PagesNav } from './pages-nav';
import { UtilitiesNav } from './utilities-nav';

export function Header() {
  return (
    <header className="flex justify-between my-2">
      <PagesNav />
      <Link href={routes.home.href} className="flex items-center gap-2">
        <span className="font-bold">NextCart</span>
        <Logo size={32} />
      </Link>
      <UtilitiesNav />
    </header>
  );
}
