import { createProduct } from '@/lib/actions/products';
import { getCategories } from '@/lib/data/product-data-service';
import { Category } from '@/lib/types/product';
import Form from 'next/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// title: string;
// description: string;
// price: number;
// images: string[];
// categoryId:

export default async function ProductForm() {
  const categories = await getCategories();

  return (
    <Form action={createProduct}>
      <Label>
        Title:
        <Input required name="title" />
      </Label>
      <Label>
        Description:
        <Input required name="description" />
      </Label>
      <Label>
        Price:
        <Input required name="price" type="number" />
      </Label>
      <Label>
        Category:
        <select name="categoryId" required>
          {categories.map((cat: Category, index: number) => (
            <option value={cat.id} key={index}>
              {cat.name}
            </option>
          ))}
        </select>
      </Label>
      <Label>
        Image URL:
        <Input required name="image" />
      </Label>
      <Button type="submit">Create Product</Button>
    </Form>
  );
}
