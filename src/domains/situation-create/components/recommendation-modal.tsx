import useRecommendationListStore from "../store/use-recommendation-list-store";
import useRecommendFormStore from "../store/use-recommend-form-store";
import { Sparkles } from "lucide-react";

export default function RecommendationModal() {
  // 최종적으로 모달에서만 사용됨 ㅇㅇ
  const allRecCategoryList = useRecommendationListStore(
    (state) => state.allRecCategoryList
  );

  const isModalOpen = useRecommendFormStore((state) => state.isModalOpen);
  const setIsModalOpen = useRecommendFormStore((state) => state.setIsModalOpen);

  if (!isModalOpen) return null;
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
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-3xl transition"
          >
            ×
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          마음에 드는 상황 설정을 선택하여 빠르게 시작해보세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {[].map((rec, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-5 bg-white hover:border-orange-400 hover:shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1"
              onClick={() => {}}
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
    </div>
  );
}
