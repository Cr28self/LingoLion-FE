import React, { useState } from "react";
// lucide-react 아이콘 사용
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Loader2,
  Wand2,
} from "lucide-react";
import useRecommendFormInputStore from "@/domains/situation-create/store/use-recommend-form-input-store";
import SituationInputField from "@/domains/situation-create/components/ssituation-input-field";

// --- Mock Data & Modal Component (이전과 동일) ---
// ... (sampleRecommendations, individualSuggestionData, RecommendationModal 코드는 변경 없음) ...
const sampleRecommendations = [
  {
    place: "공원",
    aiRole: "트레이너",
    userRole: "달리기하는 사람",
    goal: "달리기 기술 향상 및 운동 루틴 조언",
  },
  {
    place: "체육관",
    aiRole: "운동 전문가",
    userRole: "운동 참가자",
    goal: "근력 훈련과 지구력 향상에 대한 이야기",
  },
  {
    place: "대회 현장",
    aiRole: "대회 코치",
    userRole: "참가 선수",
    goal: "대회 준비와 전략에 대한 조언",
  },
  {
    place: "온라인 포럼",
    aiRole: "커뮤니티 멤버",
    userRole: "달리기 애호가",
    goal: "달리기 경험 공유 및 팁 제공",
  },
];

const individualSuggestionData = {
  place: [
    "공원 달리기 트랙",
    "조용한 해변 산책로",
    "운동 시설의 피트니스 센터",
    "산책하기 좋은 산길",
    "번화한 도심 거리",
    "조용한 시골길",
  ],
  aiRole: [
    "친절한 트레이너",
    "경험 많은 선배 러너",
    "데이터 분석가",
    "재활 전문가",
    "동기부여 코치",
  ],
  userRole: [
    "초보 러너",
    "마라톤 준비생",
    "부상에서 회복 중인 사람",
    "기록 단축 목표 선수",
    "즐겁게 달리는 사람",
  ],
  goal: [
    "5km 완주하기",
    "하프 마라톤 준비",
    "달리기 자세 교정",
    "부상 없이 달리기",
    "스트레스 해소",
    "새로운 달리기 코스 찾기",
  ],
};

const RecommendationModal = ({
  isOpen,
  onClose,
  recommendations,
  onSelect,
}) => {
  if (!isOpen) return null;
  // ... Modal JSX ... (이전 코드와 동일)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-4xl w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Sparkles size={24} className="text-orange-500 mr-2" />
            AI 추천 상황
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl transition"
          >
            ×
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          마음에 드는 상황 설정을 선택하여 빠르게 시작해보세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-5 bg-white hover:border-orange-400 hover:shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={() => onSelect(rec)}
            >
              <p className="mb-2">
                <span className="font-semibold text-orange-600">장소:</span>{" "}
                {rec.place}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-orange-600">AI 역할:</span>{" "}
                {rec.aiRole}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-orange-600">
                  사용자 역할:
                </span>{" "}
                {rec.userRole}
              </p>
              <p>
                <span className="font-semibold text-orange-600">목표:</span>{" "}
                {rec.goal}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// --- 상황 생성 페이지 컴포넌트 (태그 스타일 및 레이아웃 개선) ---
const SituationCreatePage = () => {
  const { aiRole, goal, place, userRole } = useRecommendFormInputStore(
    (state) => state.formInputState
  );
  const setFormInputState = useRecommendFormInputStore(
    (state) => state.setFormInputState
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [suggestions, setSuggestions] = useState({
    place: [],
    aiRole: [],
    userRole: [],
    goal: [],
  });

  const handleIndividualRecommend = (fieldId) => {
    console.log(`"${fieldId}" 항목 AI 추천 요청`);
    const fetchedSuggestions = individualSuggestionData[fieldId] || [];
    setSuggestions((prev) => ({
      ...prev,
      [fieldId]: fetchedSuggestions,
    }));
  };

  const handleOpenModal = () => {
    console.log("전체 추천 목록 요청");
    setIsModalOpen(true);
  };

  const handleSelectRecommendation = (rec) => {
    setPlace(rec.place);
    setAiRole(rec.aiRole);
    setUserRole(rec.userRole);
    setGoal(rec.goal);
    setSuggestions({ place: [], aiRole: [], userRole: [], goal: [] });
    setIsModalOpen(false);
  };

  const handleCreateSituation = async () => {
    // ... (이전과 동일)
    if (!isFormFilled || isCreating) return;
    setIsCreating(true);
    console.log("상황 생성 시작:", { place, aiRole, userRole, goal });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("상황 생성 완료!");
    alert("상황이 성공적으로 생성되었습니다!");
    setIsCreating(false);
  };

  const isFormFilled = place && aiRole && userRole && goal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-orange-600 hover:text-orange-800 transition duration-200 mb-4 group"
        >
          <ArrowLeft
            size={20}
            className="mr-1 transform group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">뒤로가기</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
          나만의 대화 상황 만들기
        </h1>
        <p className="text-center text-gray-600 mt-2 text-xs  md:text-xl">
          AI와 역할극을 위한 상황을 직접 설정하거나 추천받아 보세요!
        </p>
      </div>

      {/* 메인 컨텐츠 카드 */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <form>
          <div className="space-y-6">
            {" "}
            {/* 각 필드 그룹 간 간격 조정 */}
            {/* 각 입력 필드 그룹 */}
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
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-orange-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Sparkles size={20} className="mr-2" />
              AI로 전체 상황 추천받기
            </button>
          </div>

          {/* 구분선 */}
          <div className="mt-12 border-t border-gray-200 pt-8"></div>

          {/* 상황 생성 버튼 */}
          <button
            type="button"
            onClick={handleCreateSituation}
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
      <RecommendationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recommendations={sampleRecommendations}
        onSelect={handleSelectRecommendation}
      />
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
    </div>
  );
};

export default SituationCreatePage;
