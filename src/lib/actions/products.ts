'use server';

import { graphqlUpdateProduct } from '../data/graphql/graphql-fetch';
import { MUTATIONS } from '../data/graphql/mutations';
import { getProductById } from '../data/product-data-service';
import { UpdateProduct } from '../types/product';

export const createProduct = async (formData: FormData) => {
  try {
    const rawFormData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      categoryId: formData.get('categoryId'),
      images: formData.getAll('image'),
    };
    console.log(rawFormData);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const updateProduct = async (
  productID: string,
  changes: UpdateProduct
) => {
  try {
    const currentProduct = await getProductById(productID);

    if (!currentProduct) {
      throw new Error('Product cant be updated because its null');
    }

    // Destructure currentProduct data, excluding 'id' and 'category' since those cant be passed to the mutation
    const { id, category, ...rest } = currentProduct;

    // Creates an object with the old data, then overwrites the old data with the new data
    const newProductData: UpdateProduct = {
      ...rest, // Old data
      ...changes, // New data
    };

    const data = await graphqlUpdateProduct(MUTATIONS.UPDATE_PRODUCT, {
      id,
      changes: newProductData,
    });

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
