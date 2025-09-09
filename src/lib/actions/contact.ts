'use server';

import { contactFormSchema } from '../schemas/contactForm';
import { Result } from '../types/types';

export async function submitQuery(data: unknown): Promise<Result<void>> {
  try {
    const parsedData = contactFormSchema.parse(data);
    console.log('Contact form submitted:', parsedData);

    return { success: true, data: undefined };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Validation or submission failed:', error.message);
    }
    return { success: false, error: 'Invalid input' };
  }
}
