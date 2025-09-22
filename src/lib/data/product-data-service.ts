import { ProductService } from '../types/product';
import * as apiProductService from './services/api-product-service';
import * as mockProductService from './services/mock-product-service';

// Determine whether to fallback to mock data based on API response (logic to be implemented)
const useFallBack = false;

// Check env variables for using mock/experimental data
const useMockData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_MOCK_DATA ?? 'false') === 'true';

const useExperimentalData =
  process.env.NODE_ENV === 'development' &&
  (process.env.USE_EXPERIMENTAL_DATA ?? 'false') === 'true';

// Select data source functions
const useApi = !useFallBack && !useMockData && !useExperimentalData;

const dataSource: ProductService = useApi
  ? apiProductService
  : mockProductService;
if (!useApi) {
  console.log(`Using ${useExperimentalData ? 'experimental' : 'mock'} data`);
}

// Export functions for UI usage
export const getProducts = dataSource.fetchProducts;
export const getProductsLight = dataSource.fetchProductsLight;
export const getProductById = dataSource.fetchProductById;
export const getProductByTitle = dataSource.fetchProductByTitle;
export const getProductsByIds = dataSource.fetchProductsByIds;
export const getProductsByFilters = dataSource.fetchProductsByFilters;
export const getProductsPaginated = dataSource.fetchProductsPaginated;
export const getCategories = dataSource.fetchCategories;
