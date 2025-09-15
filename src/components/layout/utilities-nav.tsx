import { routes } from '@/lib/constants/routes';
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

export function UtilitiesNav({ className }: { className?: string }) {
  const navigateToSearchedItem = async (formData: FormData) => {
    'use server';
    const searchTerm = formData.get('search') as string;
    if (!searchTerm) return;

    redirect(`${routes.products.href}?query=${searchTerm.toLowerCase()}`);
  };

  return (
    <NavigationMenu className={className} aria-label="Account and utilities">
      <NavigationMenuList>
        <NavigationMenuItem>
          <SearchBar
            searchAction={navigateToSearchedItem}
            placeholder="Search..."
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
          <NavigationMenuTrigger className="[&>svg:last-child]:hidden">
            <ShoppingCart />
            <span className="sr-only">Basket</span>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
