import { ItemSkeleton } from './ItemSkeleton';

export function ItemGridSkeleton() {
  return (
    <div className="flex-1 min-h-0 w-full flex flex-col pt-4">
      <div className="h-full w-full overflow-y-auto">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <ItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
