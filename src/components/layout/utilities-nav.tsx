import { LogOut, Search, ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

export function UtilitiesNav() {
  return (
    <NavigationMenu aria-label="Account and utilities">
      <NavigationMenuList>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Search />
          <span className="sr-only">Search</span>
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
          <NavigationMenuContent>
            Basket component goes here
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
