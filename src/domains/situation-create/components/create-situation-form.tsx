import useRecommendFormInputStore from "../store/use-recommend-form-input-store";
import AllRecommendButton from "./all-recommend-button";
import CreateSituationButton from "./create-situation-button";
import SituationInputField from "./ssituation-input-field";

export default function CreateSituationForm() {
  const { aiRole, goal, place, userRole } = useRecommendFormInputStore(
    (state) => state.formInputState
  );
  const setFormInputState = useRecommendFormInputStore(
    (state) => state.setFormInputState
  );
  return (
    <form>
      <div className="space-y-6">
        <SituationInputField
          name={"place"}
          label={"장소 (Place)"}
          value={place}
          placeholder={"예: 활기찬 시장, 조용한 도서관"}
          handleValueChange={(e) => setFormInputState("place", e.target.value)}
        />
        <SituationInputField
          name={"aiRole"}
          label={"AI 역할 (Assistant)"}
          value={aiRole}
          placeholder={"예: 경험 많은 상인, 지식인 사서"}
          handleValueChange={(e) => setFormInputState("aiRole", e.target.value)}
        />
        <SituationInputField
          name={"userRole"}
          label={"사용자 역할 (User)"}
          value={userRole}
          placeholder={"예: 물건 값을 깎는 손님, 정보 찾는 방문객"}
          handleValueChange={(e) =>
            setFormInputState("userRole", e.target.value)
          }
        />
        <SituationInputField
          name={"goal"}
          label={"대화 목표 (Goal)"}
          value={goal}
          placeholder={"예: 원하는 가격에 물건 구매하기, 특정 주제의 책 찾기"}
          handleValueChange={(e) => setFormInputState("goal", e.target.value)}
        />
      </div>

      {/* --- 나머지 버튼들 (이전과 동일) --- */}
      {/* 전체 추천 버튼 */}
      <div className="mt-10 text-center">
        <AllRecommendButton />
      </div>

      {/* 구분선 */}
      <div className="mt-12 border-t border-gray-200 pt-8"></div>

      {/* 상황 생성 버튼 */}

      <CreateSituationButton
        isFormFilled={!!(place && aiRole && userRole && goal)}
      />
    </form>
  );
}
