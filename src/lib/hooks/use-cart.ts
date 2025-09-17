'use client';

import { addToCartAction } from '@/lib/actions/cart';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function useCart() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticCount, setOptimisticCount] = useState<number | null>(null);

  const addToCart = async () => {
    startTransition(async () => {
      try {
        // Optimistic update - read current count from client-side cookie for instant feedback
        const currentCount = getClientCartCount();
        setOptimisticCount(currentCount + 1);

        // Server action - actually add to cart and update server-side cookie
        const newCount = await addToCartAction();

        // Update client-side cookie for immediate consistency
        document.cookie = `cart-count=${newCount}; path=/; max-age=${60 * 60 * 24 * 30}`;

        // Reset optimistic state and refresh server components
        setOptimisticCount(null);
        router.refresh();
      } catch (error) {
        console.error('Failed to add to cart:', error);
        setOptimisticCount(null);
      }
    });
  };

  return {
    addToCart,
    isPending,
    optimisticCount,
  };
}

// Helper function to read cart count from client-side cookie
function getClientCartCount(): number {
  if (typeof document === 'undefined') return 0;

  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith('cart-count='))
    ?.split('=')[1];

  return parseInt(value || '0', 10);
}
