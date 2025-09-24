'use server';

import z from 'zod';
import {
  graphqlCreateProduct,
  graphqlUpdateProduct,
} from '../data/graphql/graphql-fetch';
import { MUTATIONS } from '../data/graphql/mutations';
import { getProductById } from '../data/product-data-service';
import { CreateProduct, UpdateProduct } from '../types/product';

export type CreateProductFormData = z.infer<typeof createSchema>;

export type CreateProductFormErrors = Partial<
  Record<keyof CreateProductFormData, string[]>
>;

export type CreateProductFormState =
  | { success: true; data: CreateProductFormData }
  | {
      success: false;
      error: CreateProductFormErrors;
      data: CreateProductFormData;
    };

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

export const createProduct = async (
  state: CreateProductFormState,
  formData: FormData
): Promise<CreateProductFormState> => {
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
