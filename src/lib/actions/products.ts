'use server';

import z from 'zod';
import {
  graphqlCreateProduct,
  graphqlUpdateProduct,
} from '../data/graphql/graphql-fetch';
import { MUTATIONS } from '../data/graphql/mutations';
import { getProductById } from '../data/product-data-service';
import { ProductFormState, createSchema } from '../schemas/product-form';
import { CreateProduct, UpdateProduct } from '../types/product';

export const createProduct = async (
  state: ProductFormState,
  formData: FormData
): Promise<ProductFormState> => {
  try {
    const rawFormData = {
      title: formData.get('title')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      price: Number(formData.get('price')),
      categoryID: Number(formData.get('categoryID')),
      images: (formData.getAll('images') as string[]).map((img) => img ?? ''),
    };
    const validatedFields = createSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      const errors = z.flattenError(validatedFields.error).fieldErrors;

      return { success: false, error: errors, data: rawFormData };
    }

    const validatedData: CreateProduct = validatedFields.data;

    await graphqlCreateProduct(MUTATIONS.CREATE_PRODUCT, validatedData);

    return { success: true, data: validatedData };
  } catch (error) {
    throw new Error('Error fetching products:' + error);
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
    throw new Error('Error fetching products: ' + error);
  }
};
