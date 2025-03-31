import { Loader2, Sparkles } from "lucide-react";
import useRecommendationListStore from "../store/use-recommendation-list-store";
import useRecommendFormStore from "../store/use-recommend-form-store";

// ! 1. 최초( 전체추천 안받은 상태 ) 전체 추천 버튼 클릭시, 바로 전체 fetch 기능

// ! 2. 전체 추천 받으면 바로 모달 open 됨

// ! 3. 이때부터 전체 추천 버튼 클릭하면은 모달 on/off 용도로만 사용

// ! 4. 재추천은 모달이 open된 상태에서만 가능

export default function AllRecommendButton() {
  const data = useRecommendationListStore((state) => state.allRecCategoryList);

  const setIsModalOpen = useRecommendFormStore((state) => state.setIsModalOpen);

  const isLoading = false;
  const handleAllRecommendButtonClick = () => {
    if (data.length == 0) {
      // 전체 데이터 fetching 후 모달 off->on
      setIsModalOpen(true);
    } else {
      // 모달 on/off
      setIsModalOpen(true);
    }
  };
  return (
    <button
      type="button"
      onClick={handleAllRecommendButtonClick}
      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
    >
      {data.length === 0 ? (
        isLoading ? (
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
