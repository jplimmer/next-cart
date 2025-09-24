import CategoryForm from '@/components/admin/category-form';
import Modal from '@/components/layout/modal';

export default function CreateProductModal() {
  return (
    <Modal title={'Create new category'} showTitle={false}>
      <CategoryForm />
    </Modal>
  );
}
