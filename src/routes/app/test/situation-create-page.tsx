import React, { useState } from "react";
// lucide-react 아이콘 사용
import { CheckCircle2, Loader2 } from "lucide-react";
import useRecommendFormInputStore from "@/domains/situation-create/store/use-recommend-form-input-store";
import SituationInputField from "@/domains/situation-create/components/ssituation-input-field";
import CreateSituationLayout from "@/components/layout/ccreate-situation-layout";
import AllRecommendButton from "@/domains/situation-create/components/all-recommend-button";
import RecommendationModal from "@/domains/situation-create/components/recommendation-modal";

// ! SituationCreatePage에서 전체 추천 --> 결과가 RecommendationModal에 들어감
// ! 전체 추천 렌더링 결과물, 재추천 mutate함수, isOpen, 항목 선택시 formInputState 수정되는 함수

// --- 상황 생성 페이지 컴포넌트 (태그 스타일 및 레이아웃 개선) ---
const SituationCreatePage = () => {
  const { aiRole, goal, place, userRole } = useRecommendFormInputStore(
    (state) => state.formInputState
  );
  const setFormInputState = useRecommendFormInputStore(
    (state) => state.setFormInputState
  );

  const [isCreating, setIsCreating] = useState(false);

  const isFormFilled = place && aiRole && userRole && goal;

  return (
    <CreateSituationLayout>
      {/* 메인 컨텐츠 카드 */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <form>
          <div className="space-y-6">
            <SituationInputField
              name={"place"}
              label={"장소 (Place)"}
              value={place}
              placeholder={"예: 활기찬 시장, 조용한 도서관"}
              handleValueChange={(e) =>
                setFormInputState("place", e.target.value)
              }
            />
            <SituationInputField
              name={"aiRole"}
              label={"AI 역할 (Assistant)"}
              value={aiRole}
              placeholder={"예: 경험 많은 상인, 지식인 사서"}
              handleValueChange={(e) =>
                setFormInputState("aiRole", e.target.value)
              }
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
              placeholder={
                "예: 원하는 가격에 물건 구매하기, 특정 주제의 책 찾기"
              }
              handleValueChange={(e) =>
                setFormInputState("goal", e.target.value)
              }
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
          <button
            type="button"
            onClick={() => {}}
            disabled={!isFormFilled || isCreating}
            className={`w-full flex justify-center items-center py-4 px-6 text-lg font-extrabold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              ${
                isFormFilled && !isCreating
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
              }`}
          >
            {isCreating ? (
              <>
                <Loader2 size={20} className="animate-spin mr-3" />
                생성 중...
              </>
            ) : (
              <>
                <CheckCircle2 size={22} className="mr-2" />이 상황으로 시작하기
              </>
            )}
          </button>
        </form>
      </div>

      {/* 추천 모달 */}

      <RecommendationModal onSelect={() => {}} />

      {/* 스크롤바 스타일 (선택적, tailwind-scrollbar 플러그인 필요) */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #fdba74 #fed7aa;
        } /* thumb track */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #fed7aa;
          border-radius: 3px;
        } /* orange-100 */
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #fdba74;
          border-radius: 3px;
        } /* orange-300 */
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #fb923c;
        } /* orange-400 */
      `}</style>
    </CreateSituationLayout>
  );
};

export default SituationCreatePage;
