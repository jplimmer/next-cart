import { getProductById } from '@/lib/data/product-data-service';
import { Product, ProductLight } from '@/lib/types/product';
import { CardGrid } from './card-grid';
import ProductPagination from './product-pagination';

interface PaginatedCardGridProps {
  productsPromise: Promise<ProductLight[]>;
  maxPerPage: number;
  currentPage: number;
}

export async function PaginatedCardGrid({
  productsPromise,
  maxPerPage,
  currentPage,
}: PaginatedCardGridProps) {
  const allFilteredProducts = await productsPromise;

  // Pagination boundaries
  const startIndex = (currentPage - 1) * maxPerPage;
  const endIndex = currentPage * maxPerPage;
  const totalPages = Math.ceil(allFilteredProducts.length / maxPerPage);

  const pageProducts = async (): Promise<Product[]> => {
    const products = (
      await Promise.all(
        allFilteredProducts
          .slice(startIndex, endIndex)
          .map((p) => getProductById(p.id))
      )
    ).filter((p): p is Product => p !== null);

    return products;
  };

  return (
    <section className="space-y-4">
      {totalPages > 1 && <ProductPagination totalPages={totalPages} />}
      <CardGrid productsPromise={pageProducts()}></CardGrid>
    </section>
  );
}
