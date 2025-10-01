import { LoadingSpinner } from '@/components/loading/loading-spinner';

export default function Loading() {
  return (
    <main className="full-width place-items-center py-8 text-2xl">
      <LoadingSpinner text="Loading..." />
    </main>
  );
}
