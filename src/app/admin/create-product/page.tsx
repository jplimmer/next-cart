import ProductForm from '@/components/admin/product-form';
import { createProduct } from '@/lib/actions/products';
import { getCategories } from '@/lib/data/product-data-service';

export default async function CreateProductPage() {
  const categories = await getCategories();
  return (
    <main className="full-width place-items-center py-8">
      <ProductForm
        formTitle="Create category"
        categories={categories}
        formActionFunc={createProduct}
      />
    </main>
  );
}
