import { Skeleton } from '../ui/skeleton';

interface MultiLineSkeletonProps {
  lines: number;
  lineHeight: number;
  lineSpacing: number;
}

export function MultiLineSkeleton({
  lines,
  lineHeight = 16,
  lineSpacing = 8,
}: MultiLineSkeletonProps) {
  const list = Array.from({ length: lines - 1 }, (_, i) => i + 1);
  const lineStyle = {
    height: `${lineHeight}px`,
    marginTop: `${lineSpacing / 2}px`,
    marginBottom: `${lineSpacing / 2}px`,
  };

  return (
    <div className="grid">
      {list.map((i) => (
        <Skeleton key={i} className="w-full" style={lineStyle} />
      ))}
      <Skeleton className="w-1/3" style={lineStyle} />
    </div>
  );
}
