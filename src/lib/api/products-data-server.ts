import { graphqlFetch, QUERIES } from '@/lib/api/graphql-products';
import { Category, Product } from '@/lib/types/product';

// Server-side data fetching functions
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS);
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const data = await graphqlFetch(QUERIES.GET_PRODUCT_BY_ID, { id });
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
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
  offset: number = 0,
  categoryIds?: number[],
  title?: string
): Promise<Product[]> {
  if (typeof categoryIds === 'object' && categoryIds.length > 0) {
    // Create an array of promises for each category id
    const dataArr = await Promise.all(
      categoryIds.map(async (id: number) => {
        const data = await graphqlFetch(QUERIES.GET_PRODUCTS_PAGINATED, {
          limit,
          offset,
          categoryId: id,
          title,
        });
        return data.products || [];
      })
    );

    // Flatten the results into a single array
    const joinedData = dataArr.flat();

    return joinedData;
  } else {
    // This still needs to be here if we dont want a specified category
    const data = await graphqlFetch(QUERIES.GET_PRODUCTS_PAGINATED, {
      limit,
      offset,
      title,
    });
    return data.products || [];
  }
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
