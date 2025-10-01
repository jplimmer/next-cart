import ProductForm from '@/components/admin/product-form';
import Modal from '@/components/layout/modal';
import { updateProduct } from '@/lib/actions/products';
import { getCategories, getProductById } from '@/lib/data/product-data-service';
import { ProductFormState } from '@/lib/schemas/product-form';
import { notFound } from 'next/navigation';

export default async function UpdateProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const categories = await getCategories();

  const product = await getProductById(id);

  if (product === null) notFound();

  const initialState: ProductFormState = {
    success: false,
    error: {},
    data: {
      id: id,
      title: product.title,
      description: product.description,
      price: product.price,
      categoryID: Number(product.category.id),
      images: product.images,
    },
  };

  return (
    <Modal title={'Update product'} showTitle={false}>
      <ProductForm
        formTitle="Update product"
        categories={categories}
        formActionFunc={updateProduct}
        initialState={initialState}
      />
    </Modal>
  );
}
