import Link from 'next/link';
import { Suspense } from 'react';
import { NavPageItem, NavProductCategory } from '../../lib/data/pages-nav-data';
import { LoadingSpinner } from '../loading/loading-spinner';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

interface DesktopNavProps {
  pages: NavPageItem[];
  className?: string;
}

export function DesktopNav({ pages, className }: DesktopNavProps) {
  return (
    <NavigationMenu className={className} aria-label="Main navigation">
      <NavigationMenuList>
        {pages.map((page) => (
          <NavigationMenuItem key={page.title}>
            {page.items ? (
              <>
                <NavigationMenuTrigger>{page.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Suspense fallback={<LoadingSpinner />}>
                    <CategoriesList categoriesPromise={page.items} />
                  </Suspense>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={page.href}>{page.title}</Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

async function CategoriesList({
  categoriesPromise,
}: {
  categoriesPromise: Promise<NavProductCategory[]>;
}) {
  // const categories = use(categoriesPromise);
  const categories = await categoriesPromise;

  return (
    <ul className="max-h-60 overflow-y-auto">
      {categories.map((cat) => (
        <li key={cat.id}>
          <NavigationMenuLink asChild>
            <Link href={cat.href}>{cat.name}</Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}
