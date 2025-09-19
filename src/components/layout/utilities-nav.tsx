import { getCartCount } from '@/lib/actions/cart';
import { getSlugFromTitle } from '@/lib/api/helpers';
import { getProductsLight } from '@/lib/api/product-data-service';
import { routes } from '@/lib/constants/routes';
import { Result } from '@/lib/types/types';
import { LogOut, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SearchBar } from '../search/search-bar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

export async function UtilitiesNav({ className }: { className?: string }) {
  const allProductsPromise = async (): Promise<Result<string[]>> => {
    try {
      const products = await getProductsLight();
      return { success: true, data: products.map((p) => p.title) };
    } catch (error) {
      const errorMsg = typeof error === 'string' ? error : '';
      return { success: false, error: errorMsg };
    }
  };

  const navigateToSearchedItem = async (formData: FormData) => {
    'use server';
    const searchTerm = formData.get('search') as string;
    if (!searchTerm) return;

    const slug = getSlugFromTitle(searchTerm);

    redirect(`${routes.products.href}/${slug}`);
  };

  const cartCount = await getCartCount();

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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="[&>svg:last-child]:hidden">
            <UserRound />
            <span className="sr-only">Account</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="whitespace-nowrap">
                    Account settings
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">Messages</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="#"
                    className="flex-row items-center gap-2 whitespace-nowrap"
                  >
                    Log out
                    <LogOut />
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="[&>svg:last-child]:hidden relative">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
            <span className="sr-only">Basket ({cartCount} items)</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                {cartCount === 0
                  ? 'Your basket is empty'
                  : `${cartCount} item${cartCount === 1 ? '' : 's'} in basket`}
              </p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
