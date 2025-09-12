import { routes } from '@/lib/constants/routes';
import { ContactFormState } from '@/lib/schemas/contactForm';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface SuccessMessageProps {
  state: ContactFormState;
  reset: () => void;
}

export default function SuccessMessage({ state, reset }: SuccessMessageProps) {
  if (!state.success) return null;

  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <h2 className="text-center font-bold text-xl">Message received!</h2>
      <div className="order-first self-center rounded-full p-4 bg-green-50">
        <MailCheck className=" text-green-700" size={64} />
      </div>
      <p>
        Your message ID is{' '}
        <strong className="text-green-700">{state.data}</strong>, please keep
        this for reference.
      </p>
      <div className="flex justify-center mt-4 gap-2">
        <Button asChild>
          <Link href={routes.home.href}>Home</Link>
        </Button>
        <Button type="button" onClick={reset}>
          New message
        </Button>
      </div>
    </div>
  );
}
