'use server';

import { graphqlCreateProduct } from '../data/graphql/graphql-fetch';
import { MUTATIONS } from '../data/graphql/mutations';
import { CreateProduct } from '../types/product';

export const createProduct = async (product: CreateProduct) => {
  try {
    const data = await graphqlCreateProduct(MUTATIONS.CREATE_PRODUCT, product);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
