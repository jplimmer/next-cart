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
  admin: {
    title: 'Manage catalog',
    href: '/admin',
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
  createProduct: {
    title: 'Create product',
    href: '/admin/create-product',
    description: '',
  },
  createCategory: {
    title: 'Create category',
    href: '/admin/create-category',
    description: '',
  },
  merchandise: {
    title: 'Merchandise',
    href: '/merchandise',
    description: '',
  },
} as const;
