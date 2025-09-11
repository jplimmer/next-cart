'use client';

import { processContactForm } from '@/lib/actions/contactForm';
import React, { startTransition, useActionState, useRef } from 'react';
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
import { SuccessMessage } from './success-message';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Resets action state to initial state
  const resetState = () => {
    startTransition(() => {
      const resetFormData = new FormData();
      resetFormData.set('_action', 'reset');
      formAction(resetFormData);
    });
  };

  // Enables form submission on "Ctrl+Enter" in Textarea
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

  // Conditionally render success message in place of form
  if (state.success) {
    return <SuccessMessage state={state} reset={resetState} />;
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
