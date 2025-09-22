export const QUERIES = {
  GET_PRODUCTS: `
    query {
      products {
        id
        title
        price
        description
        images
        category {
          id
          name
          image
        }
      }
    }
  `,

  GET_PRODUCTS_PAGINATED: `
    query GetPaginatedProducts($limit: Int, $offset: Int) {
      products(limit: $limit, offset: $offset) {
        id
        title
        price
        description
        images
        category {
          id
          name
          image
        }
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
  `,

  GET_PRODUCT_BY_TITLE: `
    query GetProducts($title: String) {
      products(title: $title) {
        id
        title
        price
        description
        images
        category {
          id
          name
          image
        }
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
