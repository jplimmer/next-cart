interface Route {
  title: string;
  href: string;
  description: string;
}

export const routes: Record<string, Route> = {
  home: {
    title: 'Home',
    href: '/',
    description: '',
  },
  about: {
    title: 'About us',
    href: '/about',
    description: '',
  },
  contact: {
    title: 'Contact',
    href: '/contact',
    description: '',
  },
  products: {
    title: 'Products',
    href: '/products',
    description: '',
  },
  merchandise: {
    title: 'Merchandise',
    href: '/merchandise',
    description: '',
  },
} as const;
