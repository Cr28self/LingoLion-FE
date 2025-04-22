import { Loader2, Sparkles } from 'lucide-react';

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
      className="inline-flex items-center rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {allRecCategoryListLength === 0 ? (
        isPending ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            로딩중
          </>
        ) : (
          <>
            <Sparkles size={20} className="mr-2" />
            전체 추천받기
          </>
        )
      ) : (
        '전체 추천 목록'
      )}
    </button>
  );
}
