'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';
import {
  graphqlCreateProduct,
  graphqlUpdateProduct,
} from '../data/graphql/graphql-fetch';
import { MUTATIONS } from '../data/graphql/mutations';
import {
  ProductFormState,
  createSchema,
  updateSchema,
} from '../schemas/product-form';
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

    revalidatePath('/');

    return { success: true, data: validatedData };
  } catch (error) {
    throw new Error('Error fetching products:' + error);
  }
};

export const updateProduct = async (
  state: ProductFormState,
  formData: FormData
): Promise<ProductFormState> => {
  try {
    const rawFormData = {
      id: formData.get('id')?.toString() ?? '',
      title: formData.get('title')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      price: Number(formData.get('price')),
      categoryID: Number(formData.get('categoryID')),
      images: (formData.getAll('images') as string[]).map((img) => img ?? ''),
    };

    if (rawFormData.id === '') {
      throw new Error('Product ID cant be found');
    }

    const validatedFields = updateSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      const errors = z.flattenError(validatedFields.error).fieldErrors;

      return { success: false, error: errors, data: rawFormData };
    }

    const validatedData = validatedFields.data;

    // Creates an object with the old data, then overwrites the old data with the new data
    const newProductData: UpdateProduct = {
      title: validatedData.title,
      categoryId: validatedData.categoryID,
      price: validatedData.price,
      description: validatedData.description,
      images: validatedData.images,
    };

    await graphqlUpdateProduct(MUTATIONS.UPDATE_PRODUCT, {
      id: validatedData.id,
      changes: newProductData,
    });

    revalidatePath('/');

    return { success: true, data: validatedData };
  } catch (error) {
    throw new Error('Error fetching products: ' + error);
  }
};
