import { graphqlFetch } from '@/lib/api/graphql-products';
import { Category, Product, ProductLight } from '@/lib/types/product';
import { QueryFilters, Result } from '../types/types';
import { buildProductsQueryByFilters } from './helpers';
import { QUERIES } from './queries';

// Server-side data fetching functions
export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Lightweight fetch to get the amount of products. Only fetches IDs
export async function fetchProductsLight(): Promise<ProductLight[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS_LIGHT);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products (light):', error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCT_BY_ID, { id });
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

export async function fetchProductByTitle(
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

export async function fetchProductsByFilters(
  queryFilters: QueryFilters
): Promise<ProductLight[]> {
  const data = await graphqlFetch(buildProductsQueryByFilters(queryFilters));
  const joinedDatas = Object.values(data).flat() as ProductLight[];
  return joinedDatas;
}

export async function fetchProductsPaginated(
  limit: number = 20,
  offset: number = 0
): Promise<Product[]> {
  const data = await graphqlFetch(QUERIES.GET_PRODUCTS_PAGINATED, {
    limit,
    offset,
  });
  return data.products || [];
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_CATEGORIES);
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
