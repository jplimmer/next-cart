'use client';

import { useCart } from '@/lib/hooks/use-cart';
import { Button } from '../ui/button';

export function AddToCartButton({ className }: { className?: string }) {
  const { addToCart, isPending, optimisticCount } = useCart();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart();
  };

  return (
    <Button className={className} onClick={handleClick} disabled={isPending}>
      {isPending ? 'Adding...' : 'Add to cart'}
      {optimisticCount && (
        <span className="ml-2 text-xs bg-white/20 px-1 rounded">
          {optimisticCount}
        </span>
      )}
    </Button>
  );
}
