import { Category, Product } from '../types/product';
import { Result } from '../types/types';
import { mockData } from './mock-data';

export const getMockProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockData;
};

export const getMockProductById = async (
  id: string
): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockData.find((p) => p.id === id) || null;
};

export const getMockProductByTitle = async (
  title: string
): Promise<Result<Product>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const product = mockData.find((p) => p.title === title);

  if (!product) {
    return { success: false, error: `No product found matching '${title}'` };
  }
  return { success: true, data: product };
};

export const getMockCategories = async (): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const categories: Category[] = [];
  const seen = new Set<string>();

  for (const p of mockData) {
    if (!seen.has(p.category.id)) {
      seen.add(p.category.id);
      categories.push(p.category);
    }
  }

  return categories;
};
