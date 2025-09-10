import { z } from 'zod';
import { Result } from '../types/types';

export const contactFormSchema = z.object({
  email: z.email(),
  subject: z
    .string()
    .min(1, { message: 'Message cannot be empty' })
    .max(100, { message: 'Message cannot be longer than 100 characters' }),
  message: z
    .string()
    .min(1, { message: 'Message cannot be empty' })
    .max(1000, { message: 'Message cannot be longer than 1000 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = Partial<
  Record<keyof ContactFormData, string[]>
>;

export type ContactFormState = Result<string, ContactFormErrors>;
