import ProductForm from '@/components/admin/product-form';
import Modal from '@/components/layout/modal';
import { getCategories } from '@/lib/data/product-data-service';

export default async function CreateProductModal() {
  const categories = await getCategories();

  return (
    <Modal title={'Create new product'} showTitle={false}>
      <ProductForm categories={categories} />
    </Modal>
  );
}
