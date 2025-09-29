import { Product } from '@/lib/types/product';
import { Card, CardDescription } from '../ui/card';
import { AddToCartButton } from './add-to-cart-button';
import ProductImageCarousel from './product-image-carousel';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="grid grid-rows-subgrid row-span-5 gap-3 hover:shadow-xl transition-shadow duration-300 p-4">
      <h3 className="line-clamp-2 text-lg font-semibold">{product.title}</h3>
      <div className="aspect-square relative overflow-hidden rounded-md order-first">
        <ProductImageCarousel images={product.images} title={product.title} />
      </div>
      <CardDescription className="line-clamp-3">
        {product.description}
      </CardDescription>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1">
          {product.category.name}
        </span>
        <span className="text-xl font-bold">${product.price}</span>
      </div>
      <AddToCartButton className="w-full" />
    </Card>
  );
}
