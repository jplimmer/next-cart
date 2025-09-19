import { searchParamKeys } from '@/lib/constants/searchParams';
import { Category } from '@/lib/types/product';
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

  // Add categories as filters based on user selection(s)
  const handleCheck = (selectedCategories: Category[]) => {
    const params = new URLSearchParams(searchParams.toString());
    // Since you checked a new category, you go back to the first page
    params.delete(searchParamKeys.pageNumber);
    // Clear old categories
    params.delete(searchParamKeys.categories);
    const uniqueNames: string[] = [];
    // Append all selected categories
    selectedCategories.forEach((cat) => {
      // Safe guard
      if (!uniqueNames.includes(cat?.name)) {
        uniqueNames.push(cat?.name);
        params.append(searchParamKeys?.categories, cat?.name);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const exists = (): Category[] =>
    categories?.filter((cat) => categoriesParam?.includes(cat?.name));

  const [selected, setSelected] = useState<Category[]>(exists() || []);
  const [open, setOpen] = useState(false);

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
            {exists()
              ?.map((cat) => cat?.name)
              ?.join(', ') || 'Choose Categories ↓'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-0">
          <div className="flex flex-col max-h-96">
            <div className="flex-1 px-2 py-2">
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
                  handleCheck(selected);
                }}
                className="w-full cursor-pointer"
              >
                ✅ Apply Filters
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        type="reset"
        className="block"
        onClick={() => {
          setSelected([]); // Clear local state
          handleCheck([]); // Clear URL params
          router.push(pathname);
        }}
      >
        Clear Filters
      </Button>
    </section>
  );
}
