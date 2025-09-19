import { dataSetClean } from '@/lib/api/fallback-data/dataset-clean';
import { dataSetDirty } from '@/lib/api/fallback-data/dataset-dirty';
import { graphqlFetch } from '@/lib/api/graphql-products';
import { Category, Product, ProductLight } from '@/lib/types/product';
import {
  getMockCategories,
  getMockProductById,
  getMockProductByTitle,
  getMockProducts,
} from '../mocks/mock-data-service';
import { QueryFilters, Result } from '../types/types';
import { buildProductsQueryByFilters } from './helpers';
import { QUERIES } from './queries';

// Use env variables to point to mock/experimental data
const useMockData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_MOCK_DATA ?? 'false') === 'true';

const useExperimentalData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_EXPERIMENTAL_DATA ?? 'false') === 'true';

// Server-side data fetching functions
export async function getProducts(): Promise<Product[]> {
  if (useMockData || useExperimentalData) {
    console.log(
      `Using ${useExperimentalData ? 'experimental' : 'mock'} data for products`
    );
    return await getMockProducts(useExperimentalData);
  }

  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (useMockData || useExperimentalData) {
    console.log(
      `Using ${useExperimentalData ? 'experimental' : 'mock'} data for product ${id}`
    );
    return await getMockProductById(id, useExperimentalData);
  }

  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCT_BY_ID, { id });
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    // Fallback to clean dataset first, then dirty
    const fallbackProduct =
      dataSetClean.find((p) => p.id === id) ||
      dataSetDirty.find((p) => p.id === id);
    return fallbackProduct || null;
  }
}

export async function getProductByTitle(
  title: string
): Promise<Result<Product>> {
  if (useMockData || useExperimentalData) {
    console.log(
      `Using ${useExperimentalData ? 'experimental' : 'mock'} data for product ${title}`
    );
    return await getMockProductByTitle(title, useExperimentalData);
  }

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
  if (useMockData || useExperimentalData) {
    console.log(
      `Using ${useExperimentalData ? 'experimental' : 'mock'} data for categories`
    );

    return await getMockCategories(useExperimentalData);
  }

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
  offset: number = 0
): Promise<Product[]> {
  const data = await graphqlFetch(QUERIES.GET_PRODUCTS_PAGINATED, {
    limit,
    offset,
  });
  return data.products || [];
}

export async function getProductsByFilters(
  queryFilters: QueryFilters
): Promise<ProductLight[]> {
  const data = await graphqlFetch(buildProductsQueryByFilters(queryFilters));
  const joinedDatas = Object.values(data).flat() as ProductLight[];
  return joinedDatas;
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
