import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function CategorySelect({
  categories,
  defaultCategory,
}: {
  categories: Category[];
  defaultCategory: string | null;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Add category to search params
  const handleSelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section id="category-filter">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {defaultCategory || 'Choose Category ↓'}
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
