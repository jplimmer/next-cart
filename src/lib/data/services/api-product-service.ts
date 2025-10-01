import { graphqlFetch } from '@/lib/data/graphql/graphql-fetch';
import { Category, type Product, ProductLight } from '@/lib/types/product';
import { QueryFilters } from '../../types/types';
import { QUERIES } from '../graphql/queries';
import {
  buildProductsQueryByFilters,
  buildProductsQueryByIds,
} from '../helpers';

// Server-side data fetching functions
export async function fetchProducts(): Promise<Product[]> {
  const result = await graphqlFetch<{ products: Product[] }>(
    QUERIES.GET_PRODUCTS
  );
  if (result.success === false) {
    return [];
  }

  return result.data.products;
}

// Lightweight fetch to get the amount of products. Only fetches IDs
export async function fetchProductsLight(): Promise<ProductLight[]> {
  const result = await graphqlFetch<{ products: Product[] }>(
    QUERIES.GET_PRODUCTS_LIGHT
  );
  if (result.success === false) {
    return [];
  }

  return result.data.products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const result = await graphqlFetch<Product | null>(QUERIES.GET_PRODUCT_BY_ID, {
    id,
  });
  if (result.success === false) {
    return null;
  }
  return result.data;
}

export async function fetchProductByTitle(
  title: string
): Promise<Product | null> {
  const result = await graphqlFetch<{ products: Product[] | null }>(
    QUERIES.GET_PRODUCT_BY_TITLE,
    {
      title,
    }
  );
  if (result.success === false || result.data.products === null) {
    return null;
  }
  console.log(result.data.products[0]);

  return result.data.products[0];
}

export async function fetchProductsByIds(
  productIds: string[]
): Promise<Product[]> {
  const result = await graphqlFetch<{ products: Product[] }>(
    buildProductsQueryByIds(productIds)
  );
  if (result.success === false) {
    return [];
  }
  return result.data.products;
}

export async function fetchProductsByFilters(
  queryFilters: QueryFilters
): Promise<ProductLight[]> {
  const result = await graphqlFetch<{ products: ProductLight[] }>(
    buildProductsQueryByFilters(queryFilters)
  );
  if (result.success === false) {
    return [];
  }
  return result.data.products;
}

export async function fetchProductsPaginated(
  limit: number = 20,
  offset: number = 0
): Promise<Product[]> {
  const result = await graphqlFetch<{ products: Product[] }>(
    QUERIES.GET_PRODUCTS_PAGINATED,
    {
      limit,
      offset,
    }
  );
  if (result.success === false) {
    return [];
  }
  return result.data.products;
}

export async function fetchCategories(): Promise<Category[]> {
  const result = await graphqlFetch<{ categories: Category[] }>(
    QUERIES.GET_CATEGORIES
  );
  if (result.success === false) {
    return [];
  }

  return result.data.categories;
}
