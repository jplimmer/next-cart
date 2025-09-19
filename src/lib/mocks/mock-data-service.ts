import { Category, Product, ProductLight } from '../types/product';
import { QueryFilters, Result } from '../types/types';

const loadMockData = async (
  useExperimentalData: boolean
): Promise<Product[]> => {
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

export const getMockProducts = async (
  useExperimentalData = false
): Promise<Product[]> => {
  return await loadMockData(useExperimentalData);
};

export const getMockProductById = async (
  id: string,
  useExperimentalData = false
): Promise<Product | null> => {
  const data = await loadMockData(useExperimentalData);
  return data.find((p) => p.id === id) || null;
};

export const getMockProductByTitle = async (
  title: string,
  useExperimentalData = false
): Promise<Result<Product>> => {
  const data = await loadMockData(useExperimentalData);
  const product = data.find((p) => p.title === title);

  if (!product) {
    return { success: false, error: `No product found matching '${title}'` };
  }
  return { success: true, data: product };
};

export const getMockCategories = async (
  useExperimentalData = false
): Promise<Category[]> => {
  const data = await loadMockData(useExperimentalData);

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

export const getMockProductsPaginated = async (
  limit = 20,
  offset = 0,
  useExperimentalData = false
): Promise<Product[]> => {
  const data = await loadMockData(useExperimentalData);

  return data.slice(offset, offset + limit);
};

export const getMockProductsByFilters = async (
  queryFilters: QueryFilters,
  useExperimentalData = false
): Promise<ProductLight[]> => {
  const data = await loadMockData(useExperimentalData);

  const { categoryIDs = [], ...filters } = queryFilters;

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

export const getMockProductsLight = async (
  useExperimentalData = false
): Promise<ProductLight[]> => {
  const data = await loadMockData(useExperimentalData);

  return data.map((p) => ({ id: p.id, title: p.title }));
};
