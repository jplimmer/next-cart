'use client';

import ProductImageCarousel from '@/components/products/product-image-carousel';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/lib/hooks/use-cart';
import { Product } from '@/lib/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isPending, optimisticCount } = useCart();

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-md">
          <ProductImageCarousel images={product.images} title={product.title} />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <CardTitle className="line-clamp-2 text-lg mb-2">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>

        <Button className="w-full" onClick={addToCart} disabled={isPending}>
          {isPending ? 'Adding...' : 'Add to Cart'}
          {optimisticCount && (
            <span className="ml-2 text-xs bg-white/20 px-1 rounded">
              {optimisticCount}
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
