import z from 'zod';

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

export const createSchema = z.object({
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
