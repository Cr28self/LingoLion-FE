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
      className="inline-flex items-center rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? (
        <>
          <Loader2 size={20} className="mr-2 animate-spin" />
          로딩중
        </>
      ) : (
        <>
          <Sparkles size={20} className="mr-2" />
          재추천
        </>
      )}
    </button>
  );
}
