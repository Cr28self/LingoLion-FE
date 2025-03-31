import { useRecommendSituations } from "../api/recommend-situations";
import useRecommendationListStore from "../store/use-recommendation-list-store";
import { toast } from "sonner";
import { TRecommendationCategoriesKey } from "../reducer/types";
import useRecommendFormInputStore from "../store/use-recommend-form-input-store";

export default function useRecommendationActions() {
  const metaData = "달리기";

  // ! 추천 mutate
  const { mutate: mutateRecommend, isPending } = useRecommendSituations();
  console.log("펜딩", isPending);

  // ! 개별 리스트 변경하는 함수
  const setRecList = useRecommendationListStore((state) => state.setRecList);

  // ! 전체 추천 핸들러 함수
  const handleAllRecommend = ({
    onSuccessCallback,
    onErrorCallback,
  }: {
    onSuccessCallback: (result: any) => void;
    onErrorCallback: () => void;
  }) => {
    mutateRecommend(
      { type: "all", metaData },
      {
        onSuccess: onSuccessCallback,
        onError: onErrorCallback,
      }
    );
  };

  // ! 개별 추천 핸들러 함수
  const handleIndividualRecommend = (
    targetType: TRecommendationCategoriesKey
  ) => {
    const { formInputState } = useRecommendFormInputStore.getState();

    mutateRecommend(
      {
        type: targetType,
        metaData,
        ...formInputState,
      },
      {
        onSuccess: (result) => {
          setRecList({ type: targetType, payload: result.data });
        },
        onError: (err) => {
          // 오류 발생 시에도 로딩 상태 초기화
          toast.error("전체 추천 중 에러 발생");
        },
      }
    );
  };

  const handleSubmit = () => {
    return;
  };

  return {
    handleAllRecommend,
    handleIndividualRecommend,
    handleSubmit,
    isPending,
  };
}
