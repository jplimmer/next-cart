import { routes } from '@/lib/constants/routes';
import Link from 'next/link';
import { Logo } from './logo';
import { PagesNav } from './pages-nav';
import { UtilitiesNav } from './utilities-nav';

export function Header() {
  return (
    <>
      <div className="absolute inset-0 full-width bg-gradient-to-tr from-green-950 to-green-800 h-[52]"></div>
      <header className={`full-width sticky top-0 z-[1000] py-2 bg-black/50`}>
        {/* <div className="absolute inset-0 full-width bg-gradient-to-tr from-green-950/20 to-green-800/20 h-[52]"></div> */}
        <div className="grid grid-cols-3 items-center justify-items-center">
          <PagesNav className="justify-self-start" />
          <Link href={routes.home.href} className="flex items-center gap-2">
            <span className="relative font-bold text-white flex items-center">
              NextCart
              <Logo
                size={32}
                colour="white"
                cartColour="white"
                className="ml-2"
              />
            </span>
          </Link>
          <UtilitiesNav className="justify-self-end" />
        </div>
      </header>
    </>
  );
}
