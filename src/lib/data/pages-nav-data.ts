import { routes } from '@/lib/constants/routes';
import { getCategories } from '@/lib/data/product-data-service';

export type NavProductCategory = {
  id: string;
  name: string;
  href: string;
};

export type NavPageItem = {
  title: string;
  href: string;
  items?: Promise<NavProductCategory[]>;
};

async function getCategoryList(): Promise<NavProductCategory[]> {
  const cats = await getCategories();

  return [
    {
      id: '0',
      name: 'All products',
      href: routes.products.href,
    },
    ...cats.map((cat) => ({
      id: cat.id,
      name: cat.name,
      href: `${routes.products.href}/?category=${cat.name.toLowerCase()}`,
    })),
  ];
}

// Creates array of objects for pages navigation
export function getNavigationData(): NavPageItem[] {
  const categoriesPromise = getCategoryList();

  return [
    {
      title: routes.products.title,
      href: routes.products.href,
      items: categoriesPromise,
    },
    {
      title: routes.about.title,
      href: routes.about.href,
    },
    {
      title: routes.contact.title,
      href: routes.contact.href,
    },
  ];
}
