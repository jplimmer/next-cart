import { QueryFilters, Result } from './types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
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
  fetchProductByTitle: (title: string) => Promise<Result<Product>>;
  fetchProductsByFilters: (
    queryFilters: QueryFilters
  ) => Promise<ProductLight[]>;
  fetchProductsPaginated: (limit: number, offset: number) => Promise<Product[]>;
  fetchCategories: () => Promise<Category[]>;
}
