import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function CategorySelect({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read in category param, and if it exists, set the dropdown's starting value to that category
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Add category to search params
  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section id="category-filter">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedCategory || 'Choose Category ↓'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories?.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onSelect={() => handleSelect(category.name)}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
