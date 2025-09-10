'use client';

import { submitContactForm } from '@/lib/actions/contactForm';
import { contactFormSchema, ContactFormState } from '@/lib/schemas/contactForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';
import React, { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const initialState: ContactFormState = {
  success: false,
  error: {},
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      subject: '',
      message: '',
    },
  });

  const resetForm = async () => {
    form.reset();
    startTransition(() => {
      formAction({ reset: true });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (formRef.current) {
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true,
        });
        formRef.current.dispatchEvent(submitEvent);
      }
    }
  };

  if (state.success) {
    return (
      <div className="flex flex-col p-4 space-y-8">
        <h2 className="text-center font-bold text-xl">Message received!</h2>
        <div className="order-first self-center rounded-full p-4 bg-green-50">
          <MailCheck className=" text-green-700" size={64} />
        </div>
        <p>
          Your message ID is{' '}
          <strong className="text-green-700">{state.data}</strong>, please keep
          this for reference.
        </p>
        <div className="self-end mt-4">
          <Button type="button" onClick={resetForm}>
            Send a new message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <h1 className="font-bold text-center text-xl pb-8">Get in touch!</h1>
      <form action={formAction} ref={formRef} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@domain.com"
                  disabled={isPending}
                  {...field}
                ></Input>
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
                  disabled={isPending}
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
                  disabled={isPending}
                  onKeyDown={handleKeyDown}
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
            {isPending ? 'Submitting' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
