'use client';

import { submitContactForm } from '@/lib/actions/contactForm';
import { contactFormSchema, ContactFormState } from '@/lib/schemas/contactForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const initialState: ContactFormState = {
  success: false,
  error: {},
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
    },
  });

  return (
    <Form {...form}>
      <h1 className="font-bold text-center pb-8">Get in touch!</h1>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field}></Input>
              </FormControl>
              {!state.success && <FormMessage>{state.error.email}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Let us know what your query is about..."
                  {...field}
                ></Input>
              </FormControl>
              {!state.success && (
                <FormMessage>{state.error.subject}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="...then hit submit and we'll get back to you as soon as we can!"
                  className="min-h-24"
                  {...field}
                ></Textarea>
              </FormControl>
              {!state.success && (
                <FormMessage>{state.error.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <div className="flex gap-12 items-center">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting' : state.success ? 'Submitted!' : 'Submit'}
          </Button>
          {state.success && <p className="text-green-500">{state.data}</p>}
        </div>
      </form>
    </Form>
  );
}
