import {
  fetchCategories,
  fetchProductsLight,
} from './services/api-product-service';

// Session state management (module variables stored for module lifecycle)
let apiHealthStatus: boolean | null = null;
let healthCheckPromise: Promise<boolean> | null = null;

/**
 * Checks API health by validating minimum category and product counts.
 * @returns {Promise<boolean>} True if thresholds are met, otherwise false.
 */
const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const categories = await fetchCategories();
    if (categories.length < 2) {
      return false;
    }

    const products = await fetchProductsLight();
    if (products.length < 21) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

/**
 * Gets API health status, performing check only once per session
 * @returns {Promise<boolean>} Cached health status
 */
export const getAPIHealthStatus = async (): Promise<boolean> => {
  // Return cached result if available
  if (apiHealthStatus !== null) {
    return apiHealthStatus;
  }

  // Prevent multiple simultaneous health checks
  if (healthCheckPromise) {
    return healthCheckPromise;
  }

  // Start health check and cache the promise
  healthCheckPromise = checkAPIHealth().then((result) => {
    apiHealthStatus = result;
    healthCheckPromise = null; // Reset after completion
    console.log(
      `API health check completed: ${result ? 'healthy' : 'unhealthy'}`
    );
    return result;
  });

  return healthCheckPromise;
};
