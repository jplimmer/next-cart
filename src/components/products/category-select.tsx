import { searchParamKeys } from '@/lib/constants/searchParams';
import { Category } from '@/lib/types/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

  // Add/remove category from search params array based on checked bool
  const handleCheck = (category: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    // Since you checked a new category, you go back to the first page
    params.delete(searchParamKeys.pageNumber);

    let next: string[];

    if (checked) {
      // "new Set" removes duplicates, according to mr. GPT.
      next = Array.from(new Set([...categoriesParam, category]));
    } else {
      next = categoriesParam.filter((c) => c !== category);
    }

    // Clear old categories
    params.delete(searchParamKeys.categories);

    // Append all selected categories
    next.forEach((c) => params.append(searchParamKeys.categories, c));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section id="category-filter">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {categoriesParam && categoriesParam.length > 0
              ? categoriesParam.join(', ')
              : 'Choose Categories ↓'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories?.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.id}
              checked={
                categoriesParam
                  ? categoriesParam.includes(category.name)
                  : false
              }
              onCheckedChange={(checked) => handleCheck(category.name, checked)}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
