import { getCartCount } from '@/lib/actions/cart';
import { navigateToSearchedItem } from '@/lib/actions/search';
import { getProductsLight } from '@/lib/data/product-data-service';
import { Result } from '@/lib/types/types';
import { ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';
import { SearchBar } from '../search/search-bar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../ui/navigation-menu';
import { BasketNavItem } from './basket-nav-item';
import { UserNavItem } from './user-nav-item';

export async function UtilitiesNavMenu({ className }: { className?: string }) {
  const allProductsPromise = async (): Promise<Result<string[]>> => {
    try {
      const products = await getProductsLight();
      return { success: true, data: products.map((p) => p.title) };
    } catch (error) {
      const errorMsg = typeof error === 'string' ? error : '';
      return { success: false, error: errorMsg };
    }
  };

  return (
    <NavigationMenu className={className} aria-label="Account and utilities">
      <NavigationMenuList>
        <NavigationMenuItem>
          <SearchBar
            searchAction={navigateToSearchedItem}
            allResultsPromise={allProductsPromise()}
            placeholder="Ctrl+K to search..."
          />
        </NavigationMenuItem>
        <UserNavItem />
        <Suspense fallback={<ShoppingCart />}>
          <BasketNavItem cartCountPromise={getCartCount()} />
        </Suspense>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
