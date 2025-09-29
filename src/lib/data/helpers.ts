import { productQueryString, QUERIES } from '../data/graphql/queries';
import { QueryFilters } from '../types/types';

export function getSlugFromTitle(title: string): string {
  return encodeURIComponent(title.toLowerCase())
    .replace(/-/g, '_')
    .replace(/%20/g, '-');
}

export function getTitleFromSlug(slug: string): string {
  const title = slug.replace(/-/g, '%20').replace(/_/g, '-');
  return decodeURIComponent(title);
}

// These query builders are used when we need to mimic the behavior that "where:" usually enables
// Since we cant pass arrays into their graphQL filters, we have to generate an alias for each categoryID
// If we dont have any categories, we only need one alias

export function buildProductsQueryByIds(productIds: string[]) {
  if (productIds.length === 0) {
    throw new Error('productIds must contain at least one id');
  }

  return `query {
    ${productIds
      .map(
        (id) => `product_${id}: product(id: "${id}") {${productQueryString}}`
      )
      .join('\n')}}
  `;
}

export function buildProductsQueryByFilters(queryFilters: QueryFilters) {
  const { categoryIDs = [], ...filters } = queryFilters;

  const filterString = buildFilterString(filters);

  if (!(categoryIDs.length > 0) && !filterString) {
    // console.log('No filters provided, returning all products (light)');
    return QUERIES.GET_PRODUCTS_LIGHT;
  }

  const query =
    categoryIDs.length > 0
      ? `
      query {
      ${categoryIDs
        .map(
          (id, i) =>
            `  Category_${i}: products(categoryId: ${id}, ${filterString}) {
                  id
                  title
                }`
        )
        .join('\n')}
      }`
      : `
      query { 
        Filtered_Products: products(${filterString}) {
          id
          title
        }
      }`;
  return query;
}

const buildFilterString = (options: QueryFilters) => {
  return (
    Object.entries(options)
      // Filter out undefined options
      .filter(([, value]) => Boolean(value))
      // Format as "key: value"
      .map(([key, value]) => `${key}: "${value}"`)
      // Join into a single string
      .join(', ')
  );
};
