import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.email(),
  subject: z
    .string()
    .min(1, { message: 'Subject cannot be empty' })
    .max(100, { message: 'Subject cannot be longer than 100 characters' }),
  message: z
    .string()
    .min(1, { message: 'Message cannot be empty' })
    .max(1000, { message: 'Message cannot be longer than 1000 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = Partial<
  Record<keyof ContactFormData, string[]>
>;

// export type ContactFormState = Result<string, ContactFormErrors>;
export type ContactFormState =
  | { success: true; data: string }
  | { success: false; error: ContactFormErrors; formData: ContactFormData };
