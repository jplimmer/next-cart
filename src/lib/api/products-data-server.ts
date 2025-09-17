import { graphqlFetch, QUERIES } from '@/lib/api/graphql-products';
import { Category, Product, SlugResponse } from '@/lib/types/product';
import { Result } from '../types/types';

// Server-side data fetching functions
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCT_BY_ID, { id });
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_CATEGORIES);
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getProductsPaginated(
  limit: number = 20,
  offset: number = 0,
  categoryId?: number,
  title?: string
): Promise<Product[]> {
  const data = await graphqlFetch(QUERIES.GET_PRODUCTS_PAGINATED, {
    limit,
    offset,
    categoryId,
    title,
  });
  return data.products || [];
}

// Lightweight fetch to get the amount of products. Only fetches IDs
export async function getProductsAmount(): Promise<Product[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS_AMOUNT);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching product amount:', error);
    return [];
  }
}

export async function getSlugFromTitle(
  title: string
): Promise<Result<SlugResponse>> {
  try {
    const data = await graphqlFetch(QUERIES.GET_SLUG_FROM_TITLE, { title });
    return { success: true, data: data.products[0] };
  } catch (error) {
    const errorMsg = `Error fetching slug for title '${title}': ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }
}
