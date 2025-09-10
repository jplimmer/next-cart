import { ContactForm } from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <main className="grid place-items-center py-8">
      <div className="w-[50%] border-1 rounded-xl shadow-md p-8">
        <ContactForm />
      </div>
    </main>
  );
}
