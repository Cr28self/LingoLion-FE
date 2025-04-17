import { cn } from '@/lib/utils.ts';
import { Loader2, Sparkles } from 'lucide-react';

type ReRecommendButtonProps = {
  onReRecommend: () => void;
  isPending: boolean;
};

export default function ReRecommendButton({
  onReRecommend,
  isPending,
}: ReRecommendButtonProps) {
  return (
    <button
      type="button"
      onClick={onReRecommend}
      disabled={isPending}
      className={cn(
        'inline-flex transform items-center rounded-lg bg-gradient-to-r from-orange-400 to-red-400 px-8 py-3 font-bold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2',
        isPending && 'cursor-not-allowed bg-gray-300 text-gray-500 opacity-70',
        !isPending && 'hover:from-orange-500 hover:to-red-500 hover:shadow-lg'
      )}
    >
      {isPending ? (
        <>
          <Loader2 size={20} className="mr-2 animate-spin" />
          로딩중
        </>
      ) : (
        <>
          <Sparkles size={20} className="mr-2" />
          "재추천"
        </>
      )}
    </button>
  );
}
