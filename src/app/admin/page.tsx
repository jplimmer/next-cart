import ProductForm from '@/components/admin/product-form';
import ProductsTable from '@/components/admin/products-table';
import ToggleForm from '@/components/admin/toggle-form-button';
import {
  getProductsByIds,
  getProductsLight,
} from '@/lib/data/product-data-service';

export default async function AdminPage() {
  const allProducts = await getProductsLight();

  if (!(allProducts.length > 0)) {
    return <p className="italic">No products found</p>;
  }

  const MAX_PER_PAGE = 20;
  const firstPageProducts = allProducts.slice(0, MAX_PER_PAGE);
  const productsResult = await getProductsByIds(
    firstPageProducts.map((p) => p.id)
  );

  if (!productsResult.success) {
    return <p className="italic">No products found</p>;
  }

  return (
    <main className="content-grid full-width py-8">
      <ToggleForm>
        <ProductForm />
      </ToggleForm>
      <ProductsTable />
    </main>
  );
}
