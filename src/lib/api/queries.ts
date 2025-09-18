export const QUERIES = {
  GET_PRODUCTS: `
    query {
      products {
        id
        title
        slug
        price
        description
        images
        category {
          id
          name
          slug
          image
        }
      }
    }
  `,

  GET_PRODUCTS_PAGINATED: `
    query GetPaginatedProducts($limit: Int, $offset: Int, $categoryId: Float, $title: String) {
      products(limit: $limit, offset: $offset, categoryId: $categoryId, title: $title) {
        id
        title
        slug
        price
        description
        images
        category {
          id
          name
          slug
          image
        }
      }
    }
  `,

  GET_PRODUCTS_AMOUNT: `
    query {
      products {
        title
        category {
          name
        }
      }
    }
  `,

  GET_PRODUCT_BY_ID: `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        slug
        price
        description
        category {
          id
          name
          slug
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
        slug
        image
      }
    }
  `,

  GET_SLUG_FROM_TITLE: `
    query GetProduct($title: String) {
      products(title: $title) {
        title
        slug
      }
    }
  `,
};
