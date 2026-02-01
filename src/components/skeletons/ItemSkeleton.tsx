import { Skeleton } from '@/components/ui/skeleton';

export function ItemSkeleton() {
  return (
    <div className="flex flex-col rounded-md overflow-hidden shadow-md">
      <Skeleton className="w-full h-24 rounded-none" />
      <div className="flex flex-col gap-1.5 p-2 bg-z-background-secondary">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
