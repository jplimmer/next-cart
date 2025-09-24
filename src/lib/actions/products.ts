'use server';

import z from 'zod';
import {
  graphqlCreateProduct,
  graphqlUpdateProduct,
} from '../data/graphql/graphql-fetch';
import { MUTATIONS } from '../data/graphql/mutations';
import { getProductById } from '../data/product-data-service';
import { CreateProduct, UpdateProduct } from '../types/product';

const createSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  categoryID: z.number(),
  images: z.array(z.string()),
});

export const createProduct = async (formData: FormData) => {
  try {
    const validatedFields = createSchema.safeParse({
      title: formData.get('title')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      price: Number(formData.get('price')),
      categoryID: Number(formData.get('categoryId')),
      images: formData.getAll('image') ?? [''],
    });

    if (validatedFields.success) {
      const validatedData: CreateProduct = validatedFields.data;

      await graphqlCreateProduct(MUTATIONS.CREATE_PRODUCT, validatedData);
    }
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
