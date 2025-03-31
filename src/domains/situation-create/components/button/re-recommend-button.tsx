import { cn } from "@/lib/utils.ts";
import { Loader2, Sparkles } from "lucide-react";

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
        "inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
        isPending && "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70",
        !isPending && "hover:shadow-lg hover:from-orange-500 hover:to-red-500"
      )}
    >
      {isPending ? (
        <>
          <Loader2 size={20} className="animate-spin mr-2" />
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
