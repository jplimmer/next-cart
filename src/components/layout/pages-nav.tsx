import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { getCategories } from '@/lib/api/products-data-server';
import { routes } from '@/lib/constants/routes';
import Link from 'next/link';

export async function PagesNav({ className }: { className?: string }) {
  const categories = await getCategories();

  return (
    <NavigationMenu className={className} aria-label="Main navigation">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{routes.products.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="max-h-60 overflow-y-auto">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href={routes.products.href}
                    className="whitespace-nowrap"
                  >
                    All products
                  </Link>
                </NavigationMenuLink>
              </li>
              {categories.map((cat) => (
                <li key={cat.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`${routes.products.href}?category=${cat.name.toLowerCase()}`}
                      className="whitespace-nowrap"
                    >
                      {cat.name}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={routes.about.href}>{routes.about.title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={routes.contact.href}>{routes.contact.title}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href={routes.merchandise.href}>
              {routes.merchandise.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
