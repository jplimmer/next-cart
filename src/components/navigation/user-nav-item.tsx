import { routes } from '@/lib/constants/routes';
import { LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

export function UserNavItem() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="[&>svg:last-child]:hidden">
        <UserRound />
        <span className="sr-only">Account</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2">
          <li>
            <NavigationMenuLink asChild>
              <Link href={routes.admin.href} className="whitespace-nowrap">
                {routes.admin.title}
              </Link>
            </NavigationMenuLink>
          </li>
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
  );
}
