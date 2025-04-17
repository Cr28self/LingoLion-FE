import { useRecommendSituations } from '../api/recommend-situations';
import useRecommendationListStore from '../store/use-recommendation-list-store';
import { toast } from 'sonner';
import { TSituationFieldKey } from '@/entities/situation/types.ts';
import useRecommendFormInputStore from '../store/use-recommend-form-input-store';
import { useMakeSituation } from '../api/make-situation';
import { useQueryClient } from '@tanstack/react-query';
import useCreateSituationRouteStore from '../store/use-create-situation-route-store';
import { useNavigate } from 'react-router-dom';

export default function useRecommendationActions() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // ! 추천 mutate
  const { mutate: mutateRecommend, isPending } = useRecommendSituations();

  //   ! Submit mutate
  const { mutate: mutateMake, isPending: isSubmittingPending } =
    useMakeSituation();

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
      {
        type: 'all',
        metaData: useCreateSituationRouteStore.getState().metaData,
      },
      {
        onSuccess: onSuccessCallback,
        onError: onErrorCallback,
      }
    );
  };

  // ! 개별 추천 핸들러 함수
  const handleIndividualRecommend = (targetType: TSituationFieldKey) => {
    const { formInputState } = useRecommendFormInputStore.getState();

    mutateRecommend(
      {
        type: targetType,
        metaData: useCreateSituationRouteStore.getState().metaData,
        ...formInputState,
      },
      {
        onSuccess: (result) => {
          setRecList({ type: targetType, payload: result.data });
        },
        onError: (err) => {
          // 오류 발생 시에도 로딩 상태 초기화
          console.error(err.message);
          toast.error('전체 추천 중 에러 발생');
        },
      }
    );
  };

  //   ! Form제출
  const handleCreateSituationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      formInputState: { aiRole, goal, place, userRole },
    } = useRecommendFormInputStore.getState();

    mutateMake(
      { aiRole, goal, place, userRole },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['getSituationsInfinite'],
          });

          navigate(
            useCreateSituationRouteStore.getState().completeRedirectLink!
          );

          toast.success('상황 생성 완료!!');
        },
        onError: (error) => {
          console.error('Failed to create situation:', error);

          toast.error('상황 생성에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );

    return;
  };

  return {
    handleAllRecommend,
    handleIndividualRecommend,
    handleCreateSituationSubmit,
    isPending,
    isSubmittingPending,
  };
}
