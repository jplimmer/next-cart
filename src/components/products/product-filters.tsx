'use client';
import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CategorySelect from './category-select';

export default function ProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Get query and category param to use as default values
  const params = new URLSearchParams(searchParams.toString());
  const queryParam = params.get('query');
  const categoryParam = params.get('category');

  // Add query to search params
  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('query', value);
    } else {
      // If there is nothing in the searchbox, delete the param
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section>
      <label htmlFor="search-input">Search</label>
      <Input
        defaultValue={queryParam || ''}
        id="search-input"
        placeholder="Toaster..."
        onChange={handleInputOnChange}
        className="w-72"
      />
      <CategorySelect categories={categories} defaultCategory={categoryParam} />
      <div>
        <Button>Apply Filters</Button>
        <Button type="reset" onClick={() => router.push(pathname)}>
          Clear Filters
        </Button>
      </div>
    </section>
  );
}
