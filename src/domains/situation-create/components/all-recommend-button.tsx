import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

// ! 1. 최초( 전체추천 안받은 상태 ) 전체 추천 버튼 클릭시, 바로 전체 fetch 기능

// ! 2. 전체 추천 받으면 바로 모달 open 됨

// ! 3. 이때부터 전체 추천 버튼 클릭하면은 모달 on/off 용도로만 사용

// ! 4. 재추천은 모달이 open된 상태에서만 가능

type AllRecommendButtonProps = {
  allRecCategoryListLength: number;
  onNotYetAllRecommended: () => void;
  onAlreadyAllRecommended: () => void;
  isPending: boolean;
};

export default function AllRecommendButton({
  allRecCategoryListLength,
  onNotYetAllRecommended,
  onAlreadyAllRecommended,
  isPending,
}: AllRecommendButtonProps) {
  const handleClick = () => {
    if (allRecCategoryListLength === 0) {
      onNotYetAllRecommended();
    } else {
      onAlreadyAllRecommended();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2",
        isPending && "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70",
        !isPending && "hover:shadow-lg hover:from-orange-500 hover:to-red-500"
      )}
    >
      {allRecCategoryListLength === 0 ? (
        isPending ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            로딩중
          </>
        ) : (
          <>
            <Sparkles size={20} className="mr-2" />
            "AI로 전체 상황 추천받기"
          </>
        )
      ) : (
        "전체 추천 목록"
      )}
    </button>
  );
}
