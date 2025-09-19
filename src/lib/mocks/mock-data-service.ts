import { Category, Product, ProductLight } from '../types/product';
import { QueryFilters, Result } from '../types/types';

const useExperimentalData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_EXPERIMENTAL_DATA ?? 'false') === 'true';

const loadMockData = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (useExperimentalData) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Experimental data only available in development');
    }
    const { experimentalData } = await import('./experimental-data');
    return experimentalData;
  }

  const { mockData } = await import('./mock-data');
  return mockData;
};

export const fetchProducts = async (): Promise<Product[]> => {
  return await loadMockData();
};

export const fetchProductsLight = async (): Promise<ProductLight[]> => {
  const data = await loadMockData();

  return data.map((p) => ({ id: p.id, title: p.title }));
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const data = await loadMockData();
  return data.find((p) => p.id === id) || null;
};

export const fetchProductByTitle = async (
  title: string
): Promise<Result<Product>> => {
  const data = await loadMockData();
  const product = data.find((p) => p.title === title);

  if (!product) {
    return { success: false, error: `No product found matching '${title}'` };
  }
  return { success: true, data: product };
};

export const fetchProductsByFilters = async (
  queryFilters: QueryFilters
): Promise<ProductLight[]> => {
  const { categoryIDs = [], ...filters } = queryFilters;

  if (!(categoryIDs.length > 0) || !filters.title) {
    return fetchProductsLight();
  }

  const data = await loadMockData();
  let filtered: Product[] = [];

  // Filter by categories (logical 'OR')
  if (categoryIDs.length > 0) {
    const categorySet = new Set(categoryIDs.map(String));
    const matches = data.filter((p) => categorySet.has(p.category.id));
    filtered.push(...matches);
  }

  // Filter by title
  if (filters.title) {
    filtered = filtered.filter((p) => p.title === filters.title);
  }

  // Other filters can be added manually here (e.g. price min/max)

  return filtered.map((p) => ({ id: p.id, title: p.title }));
};

export const fetchProductsPaginated = async (
  limit = 20,
  offset = 0
): Promise<Product[]> => {
  const data = await loadMockData();

  return data.slice(offset, offset + limit);
};

export const fetchCategories = async (): Promise<Category[]> => {
  const data = await loadMockData();

  const categories: Category[] = [];
  const seen = new Set<string>();

  for (const p of data) {
    if (!seen.has(p.category.id)) {
      seen.add(p.category.id);
      categories.push(p.category);
    }
  }

  return categories;
};
