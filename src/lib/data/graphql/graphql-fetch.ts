import { UpdateProduct } from '@/lib/types/product';

const GRAPHQL_ENDPOINT = 'https://api.escuelajs.co/graphql';

// Type definitions for GraphQL variables
interface ProductVariables {
  id?: string;
  title?: string;
  categoryId?: number;
  changes?: UpdateProduct;
}

interface PaginationVariables {
  limit?: number;
  offset?: number;
}

type GraphQLVariables =
  | ProductVariables
  | PaginationVariables
  | Record<string, never>;

type GraphQLReturn<T> =
  | { success: true; data: T }
  | { success: false; error: unknown };

export async function graphqlFetch<T>(
  query: string,
  variables?: GraphQLVariables,
  endpoint: string = ''
): Promise<GraphQLReturn<T>> {
  try {
    const response = await fetch(`${GRAPHQL_ENDPOINT + endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    // Handle GraphQL errors such as syntax errors or validation errors
    if (result.errors) {
      return { success: false, error: result.errors };
    }

    return { success: true, data: result.data as T };
  } catch (error) {
    // Handle network errors or other unexpected errors such as CORS issues or server downtime
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}
