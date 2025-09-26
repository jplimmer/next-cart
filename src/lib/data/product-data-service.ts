import { ProductService } from '../types/product';
import { getAPIHealthStatus } from './api-health-check';
import * as apiProductService from './services/api-product-service';
import * as mockProductService from './services/mock-product-service';

// Check env variables for using mock/experimental data
const useMockData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_MOCK_DATA ?? 'false') === 'true';

const useExperimentalData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_EXPERIMENTAL_DATA ?? 'false') === 'true';

/**
 * Determines which data source to be used based on environment and API health
 * @returns {Promise<ProductService>} The appropriate data service
 */
const getDataSource = async (): Promise<ProductService> => {
  // Use mock/experimental data if env vars are set
  if (useMockData || useExperimentalData) {
    console.log(
      `Using ${useExperimentalData ? 'experimental' : 'mock'} data (env override)`
    );
  }

  // Check API health and return appropriate service
  const useApi = await getAPIHealthStatus();

  if (useApi) {
    return apiProductService;
  } else {
    console.log('Using mock data (API unhealthy');
    return mockProductService;
  }
};

const dataSource = await getDataSource();

// Export functions for UI usage
export const getProducts = dataSource.fetchProducts;
export const getProductsLight = dataSource.fetchProductsLight;
export const getProductById = dataSource.fetchProductById;
export const getProductByTitle = dataSource.fetchProductByTitle;
export const getProductsByIds = dataSource.fetchProductsByIds;
export const getProductsByFilters = dataSource.fetchProductsByFilters;
export const getProductsPaginated = dataSource.fetchProductsPaginated;
export const getCategories = dataSource.fetchCategories;
