'use client';

import { searchParamKeys } from '@/lib/constants/searchParams';
import { Category } from '@/lib/types/product';
import { filterByParam } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function CategorySelect({
  categories,
  categoriesParam,
}: {
  categories: Category[];
  categoriesParam: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryFilters = filterByParam<Category, 'name'>(
    categories,
    categoriesParam,
    'name'
  );
  // Add categories as filters based on user selection(s)
  const handleApplyFilters = (selectedCategories: Category[]) => {
    const params = new URLSearchParams(searchParams.toString());
    // Since you checked a new category, you go back to the first page
    params.delete(searchParamKeys.pageNumber);
    // Clear old categories
    params.delete(searchParamKeys.categories);
    // Append all selected categories
    selectedCategories.forEach((cat) =>
      params.append(searchParamKeys?.categories, cat?.name)
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Category[]>(categoryFilters);

  const toggleCategory = (cat: Category) => {
    setSelected((prev) =>
      prev.some((c) => c.id === cat.id)
        ? prev.filter((c) => c.id !== cat.id)
        : [...prev, cat]
    );
  };

  return (
    <section id="category-filter">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {filterByParam<Category, 'name'>(
              categories,
              categoriesParam,
              'name'
            )
              ?.map((cat) => cat?.name)
              ?.join(', ') || 'Choose Categories ↓'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-0">
          <div className="flex flex-col">
            <div className="overflow-y-auto max-h-80 px-2 py-2">
              {categories?.map((category) => (
                <DropdownMenuCheckboxItem
                  className="cursor-pointer"
                  key={category.id}
                  checked={selected.some((c) => c.id === category.id)}
                  onCheckedChange={() => toggleCategory(category)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </div>

            <div className="border-t px-2 py-2 bg-white shadow-md">
              <Button
                onClick={() => {
                  setOpen(false);
                  handleApplyFilters(selected);
                }}
                className="w-full cursor-pointer"
              >
                ✅ Apply Filters
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
