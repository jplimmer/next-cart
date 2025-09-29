import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { routes } from '@/lib/constants/routes';
import { getCategories } from '@/lib/data/product-data-service';
import Link from 'next/link';

export async function PagesNavMenu({ className }: { className?: string }) {
  const categories = [
    {
      id: '-1' /* In production "mode", first item does not render for unknown reason, this is a dummy that will be hidden ...*/,
      name: 'dummy',
      image: '',
    },
    {
      id: '0',
      name: 'All products',
      image: '',
    },
    ...(await getCategories()),
  ];

  return (
    <NavigationMenu className={className} aria-label="Main navigation">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{routes.products.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`${routes.products.href}?category=${cat.name.toLowerCase()}`}
                      className={`whitespace-nowrap ${cat.id === '-1' ? 'hidden' : null}`}
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}
