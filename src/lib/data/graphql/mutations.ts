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
};
