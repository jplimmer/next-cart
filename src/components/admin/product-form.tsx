'use client';
import { ProductFormState } from '@/lib/schemas/product-form';
import { Category } from '@/lib/types/product';
import { AlertCircleIcon } from 'lucide-react';
import Form from 'next/form';
import { useActionState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import SuccessMessage from './success-message';

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
  formTitle,
  categories,
  formActionFunc,
  initialState,
}: {
  formTitle: string;
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
    <>
      <h1>{formTitle}</h1>
      <Form action={formAction}>
        {'id' in state.data && (
          <Label htmlFor="id" className="sr-only">
            Id
            <Input readOnly hidden name="id" id="id" value={state.data.id} />
          </Label>
        )}
        <Label className="p-4 grid gap-2">
          Title:
          <Input name="title" defaultValue={state.data.title} />
        </Label>
        {state.success === false && state.error.title && (
          <Alert variant={'destructive'}>
            <AlertCircleIcon />
            {state.error.title.map((error, index) => (
              <AlertDescription key={index}>{error}</AlertDescription>
            ))}
          </Alert>
        )}
        <Label className="p-4 grid gap-2">
          Description:
          <Input name="description" defaultValue={state.data.description} />
        </Label>
        {state.success === false && state.error.description && (
          <Alert variant={'destructive'}>
            <AlertCircleIcon />
            {state.error.description.map((error, index) => (
              <AlertDescription key={index}>{error}</AlertDescription>
            ))}
          </Alert>
        )}
        <Label className="p-4 grid gap-2">
          Price:
          <Input name="price" type="number" defaultValue={state.data.price} />
        </Label>
        {state.success === false && state.error.price && (
          <Alert variant={'destructive'}>
            <AlertCircleIcon />
            {state.error.price.map((error, index) => (
              <AlertDescription key={index}>{error}</AlertDescription>
            ))}
          </Alert>
        )}
        <Label className="p-4 grid gap-2">
          Category:
          <select
            name="categoryID"
            defaultValue={state.data.categoryID}
            className="p-2 border-2 border-gray-200 rounded-[10px]"
          >
            {categories.map((cat: Category, index: number) => (
              <option
                value={cat.id}
                key={index}
                className="bg-gray-100 active:bg-gray-100"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </Label>
        {state.success === false && state.error.categoryID && (
          <Alert variant={'destructive'}>
            <AlertCircleIcon />
            {state.error.categoryID.map((error, index) => (
              <AlertDescription key={index}>{error}</AlertDescription>
            ))}
          </Alert>
        )}
        <Label className="p-4 grid gap-2">
          Image URL:
          <Input name="images" defaultValue={state.data.images} />
        </Label>
        {state.success === false && state.error.images && (
          <Alert variant={'destructive'}>
            <AlertCircleIcon />
            {state.error.images.map((error, index) => (
              <AlertDescription key={index}>{error}</AlertDescription>
            ))}
          </Alert>
        )}
        <Button type="submit" disabled={pending}>
          {initialState === undefined ? 'Create Product' : 'Update Product'}
        </Button>
        {pending ? 'Loading...' : state.success === true && <SuccessMessage />}
      </Form>
    </>
  );
}
