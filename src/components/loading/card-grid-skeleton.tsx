import { CardGridLayout } from '../products/card-grid';
import { LoadingSpinner } from './loading-spinner';
import { ProductCardSkeleton } from './product-card-skeleton';

export function CardGridSkeleton({ cards }: { cards: number }) {
  const list = Array.from({ length: cards }, (_, i) => i + 1);

  return (
    <ul className={CardGridLayout}>
      {list.map((i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export function PaginatedCardGridSkeleton({ cards }: { cards: number }) {
  return (
    <div className="space-y-4">
      <LoadingSpinner text="Fetching products..." className="mx-auto py-2" />
      <CardGridSkeleton cards={cards} />
    </div>
  );
}
