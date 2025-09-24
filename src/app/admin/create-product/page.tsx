import ProductForm from '@/components/admin/product-form';
import { getCategories } from '@/lib/data/product-data-service';

export default async function CreateProductPage() {
  const categories = await getCategories();
  return (
    <main className="full-width place-items-center py-8">
      <ProductForm categories={categories} />
    </main>
  );
}
