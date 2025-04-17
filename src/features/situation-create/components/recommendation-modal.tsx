import useRecommendationListStore from '../store/use-recommendation-list-store';
import useRecommendFormStore from '../store/use-recommend-form-store';
import { Sparkles } from 'lucide-react';
import useRecommendationActions from '../hooks/use-recommendation-actions';
import useRecommendFormInputStore from '../store/use-recommend-form-input-store';
import { TSituation } from '../../../types/situation.ts';
import ReRecommendButton from './button/re-recommend-button.tsx';
import { toast } from 'sonner';

export default function RecommendationModal() {
  // 최종적으로 모달에서만 사용됨 ㅇㅇ
  const allRecCategoryList = useRecommendationListStore(
    (state) => state.allRecCategoryList
  );

  // ! 전체 리스트 저장
  const setAllRecList = useRecommendationListStore(
    (state) => state.setAllRecList
  );

  // ! Input 요소 변경
  const setFormInputState = useRecommendFormInputStore(
    (state) => state.setFormInputState
  );

  const isModalOpen = useRecommendFormStore((state) => state.isModalOpen);
  const setIsModalOpen = useRecommendFormStore((state) => state.setIsModalOpen);

  const { handleAllRecommend, isPending } = useRecommendationActions();

  const handleRecommendClick = (rec: TSituation) => {
    setFormInputState('aiRole', rec.aiRole);
    setFormInputState('goal', rec.goal);
    setFormInputState('userRole', rec.userRole);
    setFormInputState('place', rec.place);

    setIsModalOpen(false);
  };

  const handleReRecommend = () => {
    handleAllRecommend({
      onSuccessCallback: (result) => {
        setAllRecList(result.data);
        toast.success('전체 추천이 완료되었습니다.');
      },
      onErrorCallback: () => {
        toast.error('전체 추천 중 에러 발생');
      },
    });
  };

  if (!isModalOpen) return null;
  // ... Modal JSX ... (이전 코드와 동일)
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm transition-opacity duration-300">
        <div className="animate-fade-in-scale w-full max-w-4xl scale-95 transform rounded-xl bg-white p-6 opacity-0 shadow-2xl transition-all duration-300 sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-bold text-gray-800">
              <Sparkles size={24} className="mr-2 text-orange-500" />
              AI 추천 상황
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-3xl text-gray-400 transition hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="flex justify-between">
            <p className="mb-6 text-gray-600">
              마음에 드는 상황 설정을 선택하여 빠르게 시작해보세요.
            </p>
            <ReRecommendButton
              onReRecommend={handleReRecommend}
              isPending={isPending}
            />
          </div>

          <div className="grid max-h-[60vh] grid-cols-1 gap-5 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 md:grid-cols-2">
            {allRecCategoryList.map((rec, index) => {
              return (
                <div
                  key={index}
                  className="transform cursor-pointer rounded-lg border border-gray-200 bg-white p-5 transition duration-300 ease-in-out hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg"
                  onClick={() => handleRecommendClick(rec)}
                >
                  <p className="mb-2">
                    <span className="font-semibold text-orange-600">장소:</span>{' '}
                    {rec.place}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold text-orange-600">
                      AI 역할:
                    </span>{' '}
                    {rec.aiRole}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold text-orange-600">
                      사용자 역할:
                    </span>{' '}
                    {rec.userRole}
                  </p>
                  <p>
                    <span className="font-semibold text-orange-600">목표:</span>{' '}
                    {rec.goal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
