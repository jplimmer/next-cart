import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { MultiLineSkeleton } from './multi-line-skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="grid grid-rows-subgrid row-span-5 gap-3 w-[16rem] p-4">
      {/* Title skeleton */}
      <MultiLineSkeleton lines={2} lineHeight={18} lineSpacing={10} />
      {/* Image carousel skeleton */}
      <Skeleton className="aspect-square w-full rounded-md order-first" />
      {/* Description skeleton */}
      <MultiLineSkeleton lines={3} lineHeight={14} lineSpacing={6} />
      {/* Category/price skeleton */}
      <div className="flex justify-between mt-1">
        <Skeleton className="h-[28] w-[56] rounded-full" />
        <Skeleton className="h-[28] w-[35] rounded-full" />
      </div>
      {/* AddToCart button skeleton */}
      <Skeleton className="h-[36] w-full" />
    </Card>
  );
}
