'use server';

import { z } from 'zod';
import { contactFormSchema, ContactFormState } from '../schemas/contactForm';

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData | { reset: true }
): Promise<ContactFormState> {
  // Return reset form if requested
  if (typeof formData === 'object' && 'reset' in formData) {
    return { success: false, error: {} };
  }

  // Safely parse user inputs
  const parseResult = contactFormSchema.safeParse({
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  // Return validation errors
  if (!parseResult.success) {
    const errors = z.flattenError(parseResult.error).fieldErrors;
    console.error('Validation failed:', errors);
    return { success: false, error: errors };
  }

  // Generate message id & return?

  // Simulated processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('Contact form submitted:', parseResult.data);
  return { success: true, data: '#number' };
}
