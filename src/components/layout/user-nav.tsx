import { Search, ShoppingCart, UserRound } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';

export function UserNav() {
  return (
    <div>
      <NavigationMenu>
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
              Account Options go here
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
    </div>
  );
}
