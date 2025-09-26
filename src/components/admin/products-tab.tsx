import { routes } from '@/lib/constants/routes';
import { getProducts } from '@/lib/data/product-data-service';
import Link from 'next/link';
import DataTable from '../table/data-table';
import { Button } from '../ui/button';
import { productColumns, ProductTableEntry } from './product-columns';

export default async function ProductsTab() {
  const getProductTableEntries = async (): Promise<ProductTableEntry[]> => {
    const allProducts = await getProducts();

    if (allProducts.length === 0) {
      return [];
    }

    const ptes: ProductTableEntry[] = allProducts.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category.name,
      price: p.price,
    }));
    return ptes;
  };

  const products = await getProductTableEntries();

  return (
    <DataTable
      columns={productColumns}
      data={products}
      filterColumn="title"
      filterPlaceholder="Filter by product name..."
      addNewButton={
        <Button asChild className="self-end bg-green-900">
          <Link href={routes.createProduct.href}>Add new product</Link>
        </Button>
      }
    />
  );
}
