import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Product } from '@/lib/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productImage = product.images.filter((image: string) =>
    image.startsWith('http')
  );

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-md">
          {productImage && productImage[0] ? (
            <Image
              src={productImage[0]}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-1">
        <CardTitle className="line-clamp-2 text-lg mb-2">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 mb-3">
          {product.description}
        </CardDescription>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
