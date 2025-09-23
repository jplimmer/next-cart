export const productQueryString = `
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
`;

export const QUERIES = {
  GET_PRODUCTS: `
    query {
      products {
        ${productQueryString}
      }
    }
  `,

  GET_PRODUCTS_PAGINATED: `
    query GetPaginatedProducts($limit: Int, $offset: Int) {
      products(limit: $limit, offset: $offset) {
        ${productQueryString}
      }
    }
  `,

  GET_PRODUCTS_LIGHT: `
    query {
      products {
        id
        title
      }
    }
  `,

  GET_PRODUCT_BY_ID: `
    query GetProduct($id: ID!) {
      product(id: $id) {
        ${productQueryString}
      }
    }
  `,

  GET_PRODUCT_BY_TITLE: `
    query GetProducts($title: String) {
      products(title: $title) {
        ${productQueryString}
      }
    }
  `,

  GET_CATEGORIES: `
    query {
      categories {
        id
        name
        image
      }
    }
  `,
};
