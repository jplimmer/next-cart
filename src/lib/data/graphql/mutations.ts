export const MUTATIONS = {
  CREATE_PRODUCT: `
    mutation CreateProduct(
      $title: String!,
      $price: Float!,
      $description: String!,
      $categoryID: Float!,
      $images: [String!]!
    ) {
      addProduct(
        data: {
          title: $title,
          price: $price,
          description: $description,
          categoryId: $categoryID,
          images: $images
        }
      ) {
        id
        title
        price
      }
    }
  `,
  UPDATE_PRODUCT: `
    mutation UpdateProduct(
      $id: ID!,
      $changes: UpdateProductDto!
    ) {
      updateProduct(
        id: $id
        changes: $changes
      ) {
        id
      }
    }
  `,
  DELETE_PRODUCT: `
  mutation DeleteProduct(
    $id: ID!
  ) {
    deleteProduct(id: $id)
  }
`,
};
