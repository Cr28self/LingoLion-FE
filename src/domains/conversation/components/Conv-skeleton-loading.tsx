import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center space-x-4">
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
    <div className="flex-1 overflow-y-auto space-y-6 p-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
