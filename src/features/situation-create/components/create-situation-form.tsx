import useRecommendFormInputStore from '../store/use-recommend-form-input-store';
import useRecommendationListStore from '../store/use-recommendation-list-store';
import CreateSituationButton from './button/create-situation-button.tsx';
import SituationInputField from './situation-input-field';
import useRecommendationActions from '../hooks/use-recommendation-actions';
import { Bot, MapPin, Target, User, Wand2 } from 'lucide-react';

export default function CreateSituationForm() {
  // ! 렌더링에 사용되는 Input 요소
  const { aiRole, goal, place, userRole } = useRecommendFormInputStore(
    (state) => state.formInputState
  );

  // ! Input 요소 변경
  const setFormInputState = useRecommendFormInputStore(
    (state) => state.setFormInputState
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

  const {
    handleIndividualRecommend,
    isPending,
    isSubmittingPending,
    handleCreateSituationSubmit,
  } = useRecommendationActions();

  // ! 개별 추천 핸들러 함수

  return (
    <form onSubmit={handleCreateSituationSubmit}>
      <div className="space-y-6">
        <SituationInputField
          icon={MapPin}
          name={'place'}
          label={'📍 장소 (Place)'}
          value={place}
          placeholder={'예: 활기찬 시장, 조용한 도서관'}
          onValueChange={(value) => setFormInputState('place', value)}
          onIndividualRecommend={() => handleIndividualRecommend('place')}
          recommendations={recPlaceList}
          isPending={isPending}
        />
        <SituationInputField
          name={'aiRole'}
          icon={Bot}
          label={'🤖 AI 역할 (AI Role)'}
          value={aiRole}
          placeholder={'예: 경험 많은 상인, 지식인 사서'}
          onValueChange={(value) => setFormInputState('aiRole', value)}
          onIndividualRecommend={() => handleIndividualRecommend('aiRole')}
          recommendations={recAiRoleList}
          isPending={isPending}
        />
        <SituationInputField
          name={'userRole'}
          icon={User}
          label={'👤 내 역할 (Your Role)'}
          value={userRole}
          placeholder={'예: 물건 값을 깎는 손님, 정보 찾는 방문객'}
          onValueChange={(value) => setFormInputState('userRole', value)}
          onIndividualRecommend={() => handleIndividualRecommend('userRole')}
          recommendations={recUserRoleList}
          isPending={isPending}
        />
        <SituationInputField
          name={'goal'}
          icon={Target}
          label={'🎯 대화 목표 (Goal)'}
          value={goal}
          placeholder={'예: 원하는 가격에 물건 구매하기, 특정 주제의 책 찾기'}
          onValueChange={(value) => setFormInputState('goal', value)}
          onIndividualRecommend={() => handleIndividualRecommend('goal')}
          recommendations={recGoalList}
          isPending={isPending}
        />
      </div>

      <p className="mt-6 flex items-center justify-center text-center text-xs text-muted-foreground">
        <Wand2 className="mr-1 h-3 w-3" /> 버튼으로 추천받거나, 텍스트 클릭하여
        직접 수정하세요.
      </p>

      {/* 구분선 */}
      <div className="mt-6 border-t border-gray-200 pt-8"></div>

      {/* 상황 생성 버튼 */}

      <div className="text-center">
        <CreateSituationButton
          isFormFilled={!!(place && aiRole && userRole && goal)}
          isCreating={isSubmittingPending}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          모든 항목이 채워져야 대화를 시작할 수 있습니다.
        </p>
      </div>
    </form>
  );
}
