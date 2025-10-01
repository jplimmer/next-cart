import { graphqlFetch } from '@/lib/data/graphql/graphql-fetch';
import {
  CategoriesResponse,
  Category,
  Product,
  ProductLight,
  ProductResponse,
  ProductsLightResponse,
  ProductsResponse,
} from '@/lib/types/product';
import { QueryFilters } from '../../types/types';
import { QUERIES } from '../graphql/queries';
import {
  buildProductsQueryByFilters,
  buildProductsQueryByIds,
} from '../helpers';

// Server-side data fetching functions
export async function fetchProducts(): Promise<Product[]> {
  const result = await graphqlFetch<ProductsResponse>(QUERIES.GET_PRODUCTS);
  if (result.success === false) {
    return [];
  }

  return result.data.products;
}

// Lightweight fetch to get the amount of products. Only fetches IDs
export async function fetchProductsLight(): Promise<ProductLight[]> {
  const result = await graphqlFetch<ProductsResponse>(
    QUERIES.GET_PRODUCTS_LIGHT
  );
  if (result.success === false) {
    return [];
  }

  return result.data.products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const result = await graphqlFetch<ProductResponse | null>(
    QUERIES.GET_PRODUCT_BY_ID,
    {
      id,
    }
  );
  if (result.success === false || result.data == null) {
    return null;
  }
  return result.data.product;
}

export async function fetchProductByTitle(
  title: string
): Promise<Product | null> {
  const result = await graphqlFetch<ProductsResponse | null>(
    QUERIES.GET_PRODUCT_BY_TITLE,
    {
      title,
    }
  );
  if (result.success === false || result.data === null) {
    return null;
  }
  return result.data.products[0];
}

export async function fetchProductsByIds(
  productIds: string[]
): Promise<Product[]> {
  const result = await graphqlFetch<ProductsResponse>(
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
  const result = await graphqlFetch<ProductsLightResponse>(
    buildProductsQueryByFilters(queryFilters)
  );
  if (result.success === false) {
    return [];
  }

  const flattened = Object.values(result.data).flat();

  return flattened;
}

export async function fetchProductsPaginated(
  limit: number = 20,
  offset: number = 0
): Promise<Product[]> {
  const result = await graphqlFetch<ProductsResponse>(
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
  const result = await graphqlFetch<CategoriesResponse>(QUERIES.GET_CATEGORIES);
  if (result.success === false) {
    return [];
  }

  return result.data.categories;
}
