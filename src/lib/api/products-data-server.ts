import { graphqlFetch } from '@/lib/api/graphql-products';
import { Category, Product } from '@/lib/types/product';
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

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCT_BY_ID, { id });
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductByTitle(
  title: string
): Promise<Result<Product>> {
  try {
    const productResult = await graphqlFetch(QUERIES.GET_PRODUCT_BY_TITLE, {
      title,
    });
    return { success: true, data: productResult.products[0] };
  } catch (error) {
    console.error(`Failed to get product data for ${title}`, error);
    return { success: false, error: String(error) };
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
