'use client';
import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';

export default function ProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm();

  const category = watch('category');

  const onSubmit: SubmitHandler<{
    search?: string;
    category?: string;
  }> = (data) => {
    const params = new URLSearchParams(searchParams.toString());
    if (data.search) {
      params.set('query', data.search);
    } else {
      params.delete('query');
    }
    if (data.category) {
      params.set('category', data.category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col place-items-start place-content-center w-2/3 m-auto"
      >
        <div>
          <label htmlFor="search-input">Search</label>
          <Input
            id="search-input"
            placeholder="Toaster..."
            {...register('search')}
            className="w-72"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{category || 'Categories ↓'}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onSelect={() => {
                  setValue('category', category.name);
                  handleSubmit(onSubmit)();
                }}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="submit">Apply Filters</Button>
        <Button
          type="reset"
          onClick={() => {
            router.push(pathname);
            setValue('category', '');
          }}
        >
          Clear Filters
        </Button>
      </form>
    </section>
  );
}
