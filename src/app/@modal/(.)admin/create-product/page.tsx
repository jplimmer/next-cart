import ProductForm from '@/components/admin/product-form';
import Modal from '@/components/layout/modal';

export default function CreateProductModal() {
  return (
    <Modal title={'Create new product'} showTitle={false}>
      <ProductForm />
    </Modal>
  );
}
