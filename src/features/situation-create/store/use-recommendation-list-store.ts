import { create } from 'zustand';
import {
  TSituationAiRoleField,
  TSituation,
  TSituationGoalField,
  TSituationPlaceField,
  TSituationUserRoleField,
  TSituationFieldKey,
  TSituationFieldCollections,
} from '@/entities/situation/types.ts';
import { devtools } from 'zustand/middleware';

// 4. Mapped Type을 사용하여 각 키(K)를 해당 액션 객체 타입으로 변환하는 객체 생성
//    - Key K 가 주어지면, { type: K; payload: RecommendationTypeMap[K][] } 형태의 객체를 만듭니다.
type ActionObjectMap = {
  [K in TSituationFieldKey]: {
    // RecommendationKey의 각 키 K에 대해 반복
    type: K; // 'type' 속성은 키 K 자신
    payload: TSituationFieldCollections[K]; // 'payload' 속성은 RecommendationTypeMap에서 K에 해당하는 타입의 배열
  };
};
type TSetRecListParams = ActionObjectMap[TSituationFieldKey];

type RecommendationListState = {
  allRecCategoryList: TSituation[];
  recPlaceList: TSituationPlaceField[];
  recUserRoleList: TSituationUserRoleField[];
  recAiRoleList: TSituationAiRoleField[];
  recGoalList: TSituationGoalField[];
  // isInitialAllRec: boolean;
  // isAllRecLoading: boolean;
  // currentRecommendLoading: keyof TRecommendationCategories | "all" | null;
  // 액션 객체를 받는 단일 함수
  setRecList: (action: TSetRecListParams) => void;
  setAllRecList: (list: TSituation[]) => void;
  // setLoading: (key: keyof TRecommendationCategories | "all" | null) => void;

  // resetRecList: () => void;
};

const intialState = {
  allRecCategoryList: [],
  recPlaceList: [],
  recUserRoleList: [],
  recAiRoleList: [],
  recGoalList: [],
};

const useRecommendationListStore = create<RecommendationListState>()(
  devtools(
    (set) => ({
      ...intialState,

      setAllRecList: (list) => {
        set((state) => ({
          allRecCategoryList: [...state.allRecCategoryList, ...list],
        }));
      },
      // 액션 객체를 처리하는 함수 구현
      setRecList: ({ type, payload }) => {
        set((state) => {
          switch (type) {
            case 'place':
              // action.type이 'place'로 좁혀졌으므로, action.payload는 TPlaceRecommendation[] 임이 보장됨
              return {
                recPlaceList: [...(state.recPlaceList ?? []), ...payload],
              };
            case 'userRole':
              // action.payload는 TUserRoleRecommendation[]
              return {
                recUserRoleList: [...(state.recUserRoleList ?? []), ...payload],
              };
            case 'aiRole':
              // action.payload는 TAiRoleRecommendation[]
              return {
                recAiRoleList: [...(state.recAiRoleList ?? []), ...payload],
              };
            case 'goal':
              // action.payload는 TGoalRecommendation[]
              return {
                recGoalList: [...(state.recGoalList ?? []), ...payload],
              };
            default:
              // 모든 케이스를 처리했는지 확인 (선택적)
              // const _exhaustiveCheck: never = action;
              return state; // 변경 없음
          }
        });
      },
    }),
    { name: 'Recommendation-List' }
  )
);

export default useRecommendationListStore;
