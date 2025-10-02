import { Skeleton } from '../ui/skeleton';
import { MultiLineSkeleton } from './multi-line-skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <MultiLineSkeleton lines={2} lineHeight={18} lineSpacing={10} />
      {/* Image */}
      <Skeleton className="aspect-square w-full rounded-md order-first" />
      {/* Description */}
      <MultiLineSkeleton lines={6} lineHeight={16} lineSpacing={8} />
      <div className="flex justify-between items-start">
        {/* Quantity-selector */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-[14] w-[58]" />
          <Skeleton className="h-[40] w-[118]" />
        </div>
        {/* Category */}
        <Skeleton className="h-[28] w-[56] rounded-full" />
      </div>
      {/* AddToCart button */}
      <Skeleton className="h-[36] w-full" />
    </div>
  );
}
