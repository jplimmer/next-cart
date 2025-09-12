import { routes } from '@/lib/constants/routes';
import Link from 'next/link';
import { Logo } from './logo';
import { PagesNav } from './pages-nav';
import { UtilitiesNav } from './utilities-nav';

export function Header() {
  return (
    <header className="grid grid-cols-3 items-center justify-items-center my-2">
      <PagesNav className="justify-self-start" />
      <Link href={routes.home.href} className="flex items-center gap-2">
        <span className="font-bold">NextCart</span>
        <Logo size={32} />
      </Link>
      <UtilitiesNav className="justify-self-end" />
    </header>
  );
}
