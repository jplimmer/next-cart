import ProductForm from '@/components/admin/product-form';
import ToggleForm from '@/components/admin/toggle-form-button';

export default function AdminPage() {
  return (
    <main className="content-grid full-width py-8">
      <ToggleForm>
        <ProductForm />
      </ToggleForm>
    </main>
  );
}
