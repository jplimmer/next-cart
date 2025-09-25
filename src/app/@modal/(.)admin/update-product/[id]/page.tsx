import ProductForm from '@/components/admin/product-form';
import Modal from '@/components/layout/modal';
import { updateProduct } from '@/lib/actions/products';
import { getCategories, getProductById } from '@/lib/data/product-data-service';
import { ProductFormState } from '@/lib/schemas/product-form';

export default async function UpdateProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const categories = await getCategories();

  const product = await getProductById(id);

  if (!product) {
    throw new Error('Product not found in page');
  }

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
    <Modal title={'Create new product'} showTitle={false}>
      <ProductForm
        categories={categories}
        formActionFunc={updateProduct}
        initialState={initialState}
      />
    </Modal>
  );
}
