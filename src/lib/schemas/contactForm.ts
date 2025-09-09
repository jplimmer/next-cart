import z from 'zod';

export const contactFormSchema = z.object({
  email: z.email(),
  message: z
    .string()
    .min(1, { message: 'Message cannot be empty' })
    .max(1000, { message: 'Message cannot be longer than 1000 characters' }),
});
