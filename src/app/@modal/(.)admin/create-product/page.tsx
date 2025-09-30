import ProductForm from '@/components/admin/product-form';
import Modal from '@/components/layout/modal';
import { createProduct } from '@/lib/actions/products';
import { getCategories } from '@/lib/data/product-data-service';

export default async function CreateProductModal() {
  const categories = await getCategories();

  return (
    <Modal title={'Create new product'} showTitle={false}>
      <ProductForm
        formTitle="Create new product"
        categories={categories}
        formActionFunc={createProduct}
      />
    </Modal>
  );
}
