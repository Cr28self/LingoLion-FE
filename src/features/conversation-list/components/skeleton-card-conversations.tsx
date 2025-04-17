import { SkeletonCard } from '@/components/ui/skeleton-card.tsx';

export const SkeletonCardConversations = () => {
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
