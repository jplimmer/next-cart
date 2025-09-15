'use client';
import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, useState } from 'react';
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

  const [inputValue, setInputValue] = useState<string>('');
  // We create category state here to be able to easily reset it when we press the button here
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Add query to search params
  const handleInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('query', value);
    } else {
      // If there is nothing in the searchbox, delete the param
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterReset = () => {
    router.push(pathname);
    setInputValue('');
    setSelectedCategory('');
  };

  return (
    <section>
      <label htmlFor="search-input">Search</label>
      <Input
        value={inputValue}
        id="search-input"
        placeholder="Toaster..."
        onChange={handleInputOnChange}
        className="w-72"
      />
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div>
        <Button>Apply Filters</Button>
        <Button type="reset" onClick={handleFilterReset}>
          Clear Filters
        </Button>
      </div>
    </section>
  );
}
