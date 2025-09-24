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
  title: z
    .string()
    .min(
      3,
      'Your title is too short. Make sure it is at least 3 characters long'
    ),
  description: z
    .string()
    .min(
      10,
      'Your description is too short. Make sure it is at least 10 characters long'
    ),
  price: z.coerce
    .number()
    .positive(
      'Your price is a negative number. Make sure its a postive number'
    ),
  categoryID: z.coerce.number(),
  images: z.array(
    z
      .string()
      .startsWith(
        'https://',
        'Your image URL isnt safe, make sure it starts with "https://"'
      )
  ),
});

export const createProduct = async (formData: FormData) => {
  try {
    const validatedFields = createSchema.safeParse({
      title: formData.get('title')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      price: formData.get('price'),
      categoryID: formData.get('categoryId'),
      images: formData.getAll('image') ?? [''],
    });

    if (validatedFields.success) {
      const validatedData: CreateProduct = validatedFields.data;

      await graphqlCreateProduct(MUTATIONS.CREATE_PRODUCT, validatedData);
    } else {
      console.error(validatedFields.error);
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
