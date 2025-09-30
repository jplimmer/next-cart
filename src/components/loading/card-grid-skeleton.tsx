import { CardGridLayout } from '../products/card-grid';
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
