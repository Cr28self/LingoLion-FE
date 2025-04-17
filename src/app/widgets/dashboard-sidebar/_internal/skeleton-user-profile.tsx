import { Skeleton } from '@/components/ui/skeleton.tsx';

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
