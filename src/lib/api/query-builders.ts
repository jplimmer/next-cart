import { QueryFilters } from '../types/types';

// These query builders are used when we need to mimic the behavior that "where:" usually enables
// Since we cant pass arrays into their graphQL filters, we have to generate an alias for each categoryID
// If we dont have any categories, we only need one alias

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
