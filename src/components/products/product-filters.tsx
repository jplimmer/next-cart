'use client';

import { searchParamKeys } from '@/lib/constants/searchParams';
import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, useRef } from 'react';
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
  const queryParam = params.get(searchParamKeys.query);
  const categoriesParam = params.getAll(searchParamKeys.categories);
  // This value is used as a key={value} to CategorySelect component,
  // it´s lifetime is as long as the CategorySelect component itself
  // and vill preserve its value between sessions,
  // we increment its value in "Clear Filters" button to tell CategorySelect to reset
  // its internal state.
  const refForCategorySelect = useRef<number>(0);

  // Add query to search params
  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    const params = new URLSearchParams(searchParams.toString());

    // If you search something, you should be put on the first page of the search
    params.delete(searchParamKeys.pageNumber);

    if (value) {
      params.set(searchParamKeys.query, value);
    } else {
      // If there is nothing in the searchbox, delete the param
      params.delete(searchParamKeys.query);
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
      <CategorySelect
        key={refForCategorySelect.current}
        categories={categories}
        categoriesParam={categoriesParam}
      />
      <div>
        <Button
          type="reset"
          onClick={() => {
            refForCategorySelect.current += 1;
            router.push(pathname);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </section>
  );
}
