import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`flex flex-col space-y-3 w-full`, className)}>
      <Skeleton className="rounded-xl h-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export const SkeletonCardSitu = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
      <SkeletonCard className="h-[200px]" />
    </div>
  );
};
