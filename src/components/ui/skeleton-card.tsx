import { cn } from '@/lib/utils.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`flex w-full flex-col space-y-3`, className)}>
      <Skeleton className="h-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};