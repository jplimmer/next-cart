export function buildCompleteProductsQueryByIDs(productIDs: number[]) {
  return `
    query {
      ${productIDs
        .map(
          (id, i) => `
        Product_${i}: product(id: ${id}) {
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
        `
        )
        .join('\n')}
    }
  `;
}

export function buildProductsQueryByCategoryIDs(categoryIDs: number[]) {
  const query = `
    query {
      ${categoryIDs
        .map(
          (id, i) => `Category_${i}: products(categoryId: ${id}) {
            id
            title
        }`
        )
        .join('\n')}
    }
  `;
  return query;
}
