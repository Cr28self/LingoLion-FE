import { SkeletonCard } from '@/components/ui/skeleton-card.tsx';

export const SkeletonCardSituations = () => {
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
