import { getCategories, getProductsLight } from './product-data-service';

/**
 * Checks API health by validating minimum category and product counts.
 * @returns {Promise<boolean>} True if thresholds are met, otherwise false.
 */
export const apiHealthCheck = async (): Promise<boolean> => {
  const categories = await getCategories();
  if (categories.length < 2) {
    return false;
  }

  const products = await getProductsLight();
  if (products.length < 21) {
    return false;
  }

  return true;
};
