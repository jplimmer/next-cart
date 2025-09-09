'use server';

import { z } from 'zod';
import { contactFormSchema, ContactFormState } from '../schemas/contactForm';

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parseResult = contactFormSchema.safeParse({
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parseResult.success) {
    const errors = z.flattenError(parseResult.error).fieldErrors;
    console.error('Validation failed:', errors);
    return { success: false, error: errors };
  }

  // Generate message id & return?

  // Simulated processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('Contact form submitted:', parseResult.data);
  return { success: true, data: 'Request submitted!' };
}
