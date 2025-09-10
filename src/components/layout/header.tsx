import { routes } from '@/lib/constants/routes';
import Link from 'next/link';
import { Logo } from './logo';
import { PagesNav } from './pages-nav';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <header className="flex justify-between mt-4">
      <PagesNav />
      <Link href={routes.home.href} className="flex items-center gap-2">
        <span className="font-bold">NextCart</span>
        <Logo size={32} />
      </Link>
      <UserNav />
    </header>
  );
}
