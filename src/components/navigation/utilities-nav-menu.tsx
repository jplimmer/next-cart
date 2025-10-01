import { getCartCount } from '@/lib/actions/cart';
import { getProducts } from '@/lib/data/product-data-service';
import { ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { BasketNavItem } from './basket-nav-item';
import { SearchNavItem } from './search-nav-item';
import { UserNavItem } from './user-nav-item';

export function UtilitiesNavMenu({ className }: { className?: string }) {
  return (
    <NavigationMenu className={className} aria-label="Account and utilities">
      <NavigationMenuList>
        <NavigationMenuItem>
          <SearchNavItem productsPromise={getProducts()} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <UserNavItem />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Suspense
            fallback={
              <NavigationMenuTrigger className="min-w-[2.5] [&>svg:last-child]:hidden relative">
                <ShoppingCart />
              </NavigationMenuTrigger>
            }
          >
            <BasketNavItem cartCountPromise={getCartCount()} />
          </Suspense>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
