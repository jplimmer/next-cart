'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<{
    search?: string;
    category?: string;
  }> = (data: { search?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (data.search) {
      params.set('query', data.search);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('search')} />
        <Button type="submit">Apply Filters</Button>
      </form>
      <Button onClick={() => router.push(pathname)}>Clear Filters</Button>
    </section>
  );
}
