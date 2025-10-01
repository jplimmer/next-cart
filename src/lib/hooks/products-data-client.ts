import { graphqlFetch } from '@/lib/data/graphql/graphql-fetch';
import { Category, Product } from '@/lib/types/product';
import { useEffect, useState } from 'react';
import { QUERIES } from '../data/graphql/queries';

export function useProducts(offset = 0, limit = 20) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const result = await graphqlFetch<{ products: Product[] }>(
          QUERIES.GET_PRODUCTS
        );
        setProducts(result.success === true ? result.data.products : []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [offset, limit]);

  return {
    products,
    loading,
    error,
  };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const result = await graphqlFetch<Product>(QUERIES.GET_PRODUCT_BY_ID, {
          id,
        });
        setProduct(result.success === true ? result.data : null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        const result = await graphqlFetch<{ categories: Category[] }>(
          QUERIES.GET_CATEGORIES
        );
        setCategories(result.success === true ? result.data.categories : []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}

// Hook to fetch paginated products
export function useProductsPaginated(offset = 0, limit = 20) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const result = await graphqlFetch<{ products: Product[] }>(
          QUERIES.GET_PRODUCTS_PAGINATED,
          {
            limit,
            offset,
          }
        );
        setProducts(result.success === true ? result.data.products : []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [offset, limit]);

  return {
    products,
    loading,
    error,
  };
}
