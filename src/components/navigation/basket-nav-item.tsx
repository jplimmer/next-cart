'use client';

import { ShoppingCart } from 'lucide-react';
import { use } from 'react';
import {
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

export function BasketNavItem({
  cartCountPromise,
}: {
  cartCountPromise: Promise<number>;
}) {
  const cartCount = use(cartCountPromise);

  return (
    <>
      <NavigationMenuTrigger className="[&>svg:last-child]:hidden relative">
        <ShoppingCart className="cursor-pointer" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
        <span className="sr-only">Basket ({cartCount} items)</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            {cartCount === 0
              ? 'Your basket is empty'
              : `${cartCount} item${cartCount === 1 ? '' : 's'} in basket`}
          </p>
        </div>
      </NavigationMenuContent>
    </>
  );
}
