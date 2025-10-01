import { QueryFilters } from './types';

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
}
export interface ProductsLightResponse {
  products: ProductLight[];
}

export interface ProductResponse {
  product: Product;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface ProductLight {
  id: string;
  title: string;
}

export interface ProductService {
  fetchProducts: () => Promise<Product[]>;
  fetchProductsLight: () => Promise<ProductLight[]>;
  fetchProductById: (id: string) => Promise<Product | null>;
  fetchProductByTitle: (title: string) => Promise<Product | null>;
  fetchProductsByIds: (productIds: string[]) => Promise<Product[]>;
  fetchProductsByFilters: (
    queryFilters: QueryFilters
  ) => Promise<ProductLight[]>;
  fetchProductsPaginated: (limit: number, offset: number) => Promise<Product[]>;
  fetchCategories: () => Promise<Category[]>;
}

export interface CreateProduct extends Omit<Product, 'id' | 'category'> {
  categoryID: number;
}

export type UpdateProduct = Partial<Omit<Product, 'id' | 'category'>> & {
  categoryId?: number;
};
