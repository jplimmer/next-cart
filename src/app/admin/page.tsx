import DataTable from '@/components/admin/data-table';
import {
  productColumns,
  ProductTableEntry,
} from '@/components/admin/product-columns';
import ProductForm from '@/components/admin/product-form';
import ToggleForm from '@/components/admin/toggle-form-button';
import { getProducts } from '@/lib/data/product-data-service';

const getProductTableEntries = async (): Promise<ProductTableEntry[]> => {
  // const allProducts = await getProductsLight();
  const allProducts = await getProducts();

  if (allProducts.length === 0) {
    return [];
  }

  // const MAX_PER_PAGE = 20;
  // const firstPageProducts = allProducts.slice(0, MAX_PER_PAGE);
  // const productsResult = await getProductsByIds(
  //   firstPageProducts.map((p) => p.id)
  // );

  const ptes: ProductTableEntry[] = allProducts.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category.name,
    price: p.price,
  }));
  return ptes;
};

export default async function AdminPage() {
  const products = await getProductTableEntries();

  return (
    <main className="content-grid full-width p-8 space-y-8">
      <ToggleForm>
        <ProductForm />
      </ToggleForm>
      <DataTable columns={productColumns} data={products} />
    </main>
  );
}
