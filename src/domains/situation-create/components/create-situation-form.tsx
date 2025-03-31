import { toast } from "sonner";
import { useRecommendSituations } from "../api/recommend-situations";
import useRecommendFormInputStore from "../store/use-recommend-form-input-store";
import useRecommendationListStore from "../store/use-recommendation-list-store";
import AllRecommendButton from "./all-recommend-button";
import CreateSituationButton from "./create-situation-button";
import SituationInputField from "./ssituation-input-field";
import useRecommendFormStore from "../store/use-recommend-form-store";
import useRecommendationActions from "../hooks/use-recommendation-actions";

export default function CreateSituationForm() {
  // ! 모달 on/off
  const setIsModalOpen = useRecommendFormStore((state) => state.setIsModalOpen);

  // ! 렌더링에 사용되는 Input 요소
  const { aiRole, goal, place, userRole } = useRecommendFormInputStore(
    (state) => state.formInputState
  );

  // ! Input 요소 변경
  const setFormInputState = useRecommendFormInputStore(
    (state) => state.setFormInputState
  );

  // ! 단순히 길이만 받아올건데 이렇게 정의하는게 맞나???
  const allRecCategoryList = useRecommendationListStore(
    (state) => state.allRecCategoryList
  );

  const recAiRoleList = useRecommendationListStore(
    (state) => state.recAiRoleList
  );
  const recGoalList = useRecommendationListStore((state) => state.recGoalList);
  const recPlaceList = useRecommendationListStore(
    (state) => state.recPlaceList
  );
  const recUserRoleList = useRecommendationListStore(
    (state) => state.recUserRoleList
  );

  // ! 전체 리스트 저장
  const setAllRecList = useRecommendationListStore(
    (state) => state.setAllRecList
  );

  const { handleAllRecommend, handleIndividualRecommend, isPending } =
    useRecommendationActions();

  // ! 개별 추천 핸들러 함수

  const handleSubmit = () => {
    return;
  };

  return (
    <form>
      <div className="space-y-6">
        <SituationInputField
          name={"place"}
          label={"장소 (Place)"}
          value={place}
          placeholder={"예: 활기찬 시장, 조용한 도서관"}
          onValueChange={(value) => setFormInputState("place", value)}
          onIndividualRecommend={() => handleIndividualRecommend("place")}
          recommendations={recPlaceList}
          isPending={isPending}
        />
        <SituationInputField
          name={"aiRole"}
          label={"AI 역할 (Assistant)"}
          value={aiRole}
          placeholder={"예: 경험 많은 상인, 지식인 사서"}
          onValueChange={(value) => setFormInputState("aiRole", value)}
          onIndividualRecommend={() => handleIndividualRecommend("aiRole")}
          recommendations={recAiRoleList}
          isPending={isPending}
        />
        <SituationInputField
          name={"userRole"}
          label={"사용자 역할 (User)"}
          value={userRole}
          placeholder={"예: 물건 값을 깎는 손님, 정보 찾는 방문객"}
          onValueChange={(value) => setFormInputState("userRole", value)}
          onIndividualRecommend={() => handleIndividualRecommend("userRole")}
          recommendations={recUserRoleList}
          isPending={isPending}
        />
        <SituationInputField
          name={"goal"}
          label={"대화 목표 (Goal)"}
          value={goal}
          placeholder={"예: 원하는 가격에 물건 구매하기, 특정 주제의 책 찾기"}
          onValueChange={(value) => setFormInputState("goal", value)}
          onIndividualRecommend={() => handleIndividualRecommend("goal")}
          recommendations={recGoalList}
          isPending={isPending}
        />
      </div>

      {/* 전체 추천 버튼 */}
      <div className="mt-10 text-center">
        <AllRecommendButton
          isPending={isPending}
          allRecCategoryListLength={allRecCategoryList.length}
          onNotYetAllRecommended={() =>
            handleAllRecommend({
              onSuccessCallback: (result) => {
                setAllRecList(result.data);
                const { allRecCategoryList } =
                  useRecommendationListStore.getState();
                if (allRecCategoryList.length < 5) {
                  // 모달 최초로 open
                  setIsModalOpen(true);
                }

                toast.success("전체 추천이 완료되었습니다.");
              },

              onErrorCallback: () => {
                toast.error("전체 추천 중 에러 발생");
              },
            })
          }
          onAlreadyAllRecommended={() => setIsModalOpen(true)}
        />
      </div>

      {/* 구분선 */}
      <div className="mt-12 border-t border-gray-200 pt-8"></div>

      {/* 상황 생성 버튼 */}

      <CreateSituationButton
        isFormFilled={!!(place && aiRole && userRole && goal)}
        onSubmit={handleSubmit}
      />
    </form>
  );
}
