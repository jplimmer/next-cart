'use server';

import { redirect } from 'next/navigation';
import { routes } from '../constants/routes';
import { getSlugFromTitle } from '../data/helpers';

export const navigateToSearchedItem = async (formData: FormData) => {
  const searchTerm = formData.get('search') as string;
  if (!searchTerm) return;

  const slug = getSlugFromTitle(searchTerm);

  redirect(`${routes.products.href}/${slug}`);
};
