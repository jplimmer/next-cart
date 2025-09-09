import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($offset: Int, $limit: Int) {
    products(offset: $offset, limit: $limit) {
      id
      title
      price
      description
      category {
        id
        name
        image
      }
      images
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      price
      description
      category {
        id
        name
        image
      }
      images
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image
    }
  }
`;
