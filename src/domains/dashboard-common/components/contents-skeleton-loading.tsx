import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const SkeletonCard = ({ className }: { className?: string }) => {
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

export const SkeletonCardSitu = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <SkeletonCard className="h-[300px]" />
      <SkeletonCard className="h-[300px]" />
      <SkeletonCard className="h-[300px]" />
      <SkeletonCard className="h-[300px]" />
      <SkeletonCard className="h-[300px]" />
      <SkeletonCard className="h-[300px]" />
    </div>
  );
};

export const SkeletonCardConv = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
    </div>
  );
};

export const SkeletonUserProfile = () => {
  return (
    <div className={'flex items-baseline space-x-3 space-y-3 px-3'}>
      <div className="shrink-0">
        <Skeleton className="h-10 w-10 rounded-full bg-[#e68a4f]" />
      </div>

      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full bg-[#e68a4f]" />
        <Skeleton className="h-4 w-3/4 bg-[#e68a4f]" />
      </div>
    </div>
  );
};
