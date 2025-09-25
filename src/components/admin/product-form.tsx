'use client';
import { ProductFormState } from '@/lib/schemas/product-form';
import { Category } from '@/lib/types/product';
import Form from 'next/form';
import { useActionState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// title: string;
// description: string;
// price: number;
// images: string[];
// categoryId:

const blankFormState: ProductFormState = {
  success: false,
  error: {},
  data: {
    title: '',
    description: '',
    price: 0,
    categoryID: 0,
    images: [''],
  },
};

export default function ProductForm({
  categories,
  formActionFunc,
  initialState,
}: {
  categories: Category[];
  formActionFunc: (
    state: ProductFormState,
    formData: FormData
  ) => Promise<ProductFormState>;
  initialState?: ProductFormState;
}) {
  const [state, formAction, pending] = useActionState(
    formActionFunc,
    initialState ?? blankFormState
  );

  return (
    <Form action={formAction}>
      <Label className="p-4">
        Title:
        <Input name="title" />
      </Label>
      {state.success === false && state.error.title && (
        <Alert variant={'destructive'}>
          {state.error.title.map((error, index) => (
            <AlertDescription key={index}>{error}</AlertDescription>
          ))}
        </Alert>
      )}
      <Label className="p-4">
        Description:
        <Input name="description" />
      </Label>
      {state.success === false && state.error.description && (
        <Alert variant={'destructive'}>
          {state.error.description.map((error, index) => (
            <AlertDescription key={index}>{error}</AlertDescription>
          ))}
        </Alert>
      )}
      <Label className="p-4">
        Price:
        <Input name="price" type="number" />
      </Label>
      {state.success === false && state.error.price && (
        <Alert variant={'destructive'}>
          {state.error.price.map((error, index) => (
            <AlertDescription key={index}>{error}</AlertDescription>
          ))}
        </Alert>
      )}
      <Label className="p-4">
        Category:
        <select name="categoryID">
          {categories.map((cat: Category, index: number) => (
            <option value={cat.id} key={index}>
              {cat.name}
            </option>
          ))}
        </select>
      </Label>
      {state.success === false && state.error.categoryID && (
        <Alert variant={'destructive'}>
          {state.error.categoryID.map((error, index) => (
            <AlertDescription key={index}>{error}</AlertDescription>
          ))}
        </Alert>
      )}
      <Label className="p-4">
        Image URL:
        <Input name="images" />
      </Label>
      {state.success === false && state.error.images && (
        <Alert variant={'destructive'}>
          {state.error.images.map((error, index) => (
            <AlertDescription key={index}>{error}</AlertDescription>
          ))}
        </Alert>
      )}
      <Button type="submit" disabled={pending}>
        Create Product
      </Button>
      {pending ? 'Loading...' : state.success === true && 'Product created'}
    </Form>
  );
}
