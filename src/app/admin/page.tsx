import ProductForm from '@/components/admin/product-form';
import ProductTable from '@/components/admin/products-table';
import ToggleForm from '@/components/admin/toggle-form-button';
import { getCategories } from '@/lib/data/product-data-service';

export default async function AdminPage() {
  const categories = await getCategories();
  return (
    <main className="content-grid full-width py-8">
      <ToggleForm>
        <ProductForm categories={categories} />
      </ToggleForm>
      <ProductTable />
    </main>
  );
}
