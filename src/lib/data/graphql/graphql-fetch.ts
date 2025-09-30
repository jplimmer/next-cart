import { UpdateProduct } from '@/lib/types/product';

const GRAPHQL_ENDPOINT = 'https://api.escuelajs.co/graphql';

// Type definitions for GraphQL variables
interface ProductVariables {
  id?: string;
  title?: string;
  categoryId?: number;
}

interface PaginationVariables {
  limit?: number;
  offset?: number;
}

type GraphQLVariables =
  | ProductVariables
  | PaginationVariables
  | Record<string, never>;

interface UpdateProductVariables {
  id: string;
  changes: UpdateProduct;
}

export async function graphqlFetch(
  query: string,
  variables?: GraphQLVariables,
  endpoint: string = ''
) {
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
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    // Handle network errors or other unexpected errors such as CORS issues or server downtime
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}

export async function graphqlUpdateProduct(
  query: string,
  variables: UpdateProductVariables
) {
  try {
    const response = await fetch(
      `${GRAPHQL_ENDPOINT}/product/${variables.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    const result = await response.json();

    // Handle GraphQL errors such as syntax errors or validation errors
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    // Handle network errors or other unexpected errors such as CORS issues or server downtime
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}

export async function graphqlDeleteProduct(
  query: string,
  variables: GraphQLVariables
): Promise<boolean> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
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
      throw new Error(result.errors[0].message);
    }
    const { deleteProduct } = result.data;
    return deleteProduct;
  } catch (error) {
    // Handle network errors or other unexpected errors such as CORS issues or server downtime
    console.error('GraphQL fetch error:', error);
    throw error;
  }
}
