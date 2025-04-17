import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import {
  TSituationAiRoleField,
  TSituationFieldKey,
  TSituationGoalField,
  TSituationPlaceField,
  TSituationUserRoleField,
} from '@/types/situation.ts';

type TRecommendationScope = 'all' | TSituationFieldKey;

type TRecommendSituationsPayload = {
  type: TRecommendationScope;
  metaData?: string;
} & Partial<TSituationPlaceField> &
  Partial<TSituationAiRoleField> &
  Partial<TSituationUserRoleField> &
  Partial<TSituationGoalField>;

const recommendSituation = async (
  apiClient: AxiosInstance,
  data: TRecommendSituationsPayload
) => {
  const response = await apiClient.post('/situations/recommend', data);
  return response.data;
};

export const useRecommendSituations = () => {
  const authApiClient = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (data: TRecommendSituationsPayload) =>
      recommendSituation(authApiClient, data),
  });
};
