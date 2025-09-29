'use client';

import { processContactForm } from '@/lib/actions/contact-form';
import React, { startTransition, useActionState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import SuccessMessage from './success-message';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(processContactForm, {
    success: false,
    error: {},
    formData: { email: '', subject: '', message: '' },
  });
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
    <div>
      <h1 className="font-bold text-center text-xl pb-8">Get in touch!</h1>
      <form action={formAction} ref={formRef} className="space-y-8">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="example@domain.com"
            defaultValue={state.formData.email}
            disabled={isPending}
          />
          {!state.success && (
            <p className="text-destructive text-sm">{state.error.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            type="text"
            name="subject"
            placeholder="Let us know what your query is about..."
            defaultValue={state.formData.subject}
            disabled={isPending}
          />
          {!state.success && (
            <p className="text-destructive text-sm">{state.error.subject}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="...then hit submit and we'll get back to you as soon as we can!"
            defaultValue={state.formData.message}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            className="min-h-24"
          />
          {!state.success && (
            <p className="text-destructive text-sm">{state.error.message}</p>
          )}
        </div>

        <div className="flex gap-12 items-center">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
