import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`flex items-center space-x-4`, className)}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export const SkeletonChatConv = () => {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
