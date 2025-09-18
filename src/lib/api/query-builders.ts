import { QueryFilters } from '../types/types';

// These query builders are used when we need to mimic the behavior that "where:" usually enables
// Since we cant pass arrays into their graphQL filters, we have to generate an alias for each filter that

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

export function buildProductsQueryByFilters(filters: QueryFilters) {
  const { categoryIDs = [], title = '' } = filters;

  const areThereFilters = title || categoryIDs.length > 0;

  const query = `
    query {
      ${
        categoryIDs.length > 0
          ? categoryIDs
              .map(
                (id, i) =>
                  `Category_${i}: products(categoryId: ${id}, ${title ? `title: "${title}"` : ''}) {
        id
        title
      }`
              )
              .join('\n')
          : `Filtered_Products: products${areThereFilters ? `(${title ? `title: "${title}"` : ''})` : ''}  {
        id
        title
      }`
      }
    }`;

  return query;
}
