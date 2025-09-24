import { routes } from '@/lib/constants/routes';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs';
import { LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

const linkStyle =
  "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&amp;_svg:not([class*='text-'])]:text-muted-foreground gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&amp;_svg:not([class*='size-'])]:size-4";

export function UserNavItem() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="[&>svg:last-child]:hidden">
        <UserRound />
        <span className="sr-only">Account</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <SignedOut>
          <SignInButton>
            <span
              className={`flex flex-row items-center whitespace-nowrap ${linkStyle}`}
            >
              Sign in
            </span>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <ul>
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
              <SignOutButton>
                <NavigationMenuLink asChild>
                  <span
                    className={`flex flex-row items-center whitespace-nowrap ${linkStyle}`}
                  >
                    Log out
                    <LogOut />
                  </span>
                </NavigationMenuLink>
              </SignOutButton>
            </li>
          </ul>
        </SignedIn>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
