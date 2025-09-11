'use server';

import { z } from 'zod';
import {
  ContactFormData,
  contactFormSchema,
  ContactFormState,
} from '../schemas/contactForm';

const extractFormField = (formData: FormData, fieldName: string): string => {
  const value = formData.get(fieldName);
  return typeof value === 'string' ? value : '';
};

const sanitiseFormData = (formData: FormData): ContactFormData => {
  return {
    email: extractFormField(formData, 'email').trim(),
    subject: extractFormField(formData, 'subject').trim(),
    message: extractFormField(formData, 'message').trim(),
  };
};

export async function processContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Reset state if requested
  if (formData.get('_action') === 'reset') {
    return {
      success: false,
      error: {},
      formData: { email: '', subject: '', message: '' },
    };
  }

  // Initial sanitisation for returning to client in case of validation error
  // NOTE: sanitisation not currently implemented (only trim)
  const sanitisedData = sanitiseFormData(formData);

  // Validate user inputs
  const parseResult = contactFormSchema.safeParse(sanitisedData);

  // Return validation errors and sanitised inputs
  if (!parseResult.success) {
    const errors = z.flattenError(parseResult.error).fieldErrors;
    console.error('Validation failed:', errors);
    return { success: false, error: errors, formData: sanitisedData };
  }

  // Generate random message id
  const uuid = crypto.randomUUID();
  const shortId = uuid.split('-')[0].toUpperCase();
  const msgId = `MSG-${shortId}`;

  // Simulated processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log('Contact form processed:', msgId);
  return { success: true, data: msgId };
}
