import { create } from "zustand";
import {
  TAiRoleRecommendation,
  TRecommendationCategories,
  TGoalRecommendation,
  TPlaceRecommendation,
  TUserRoleRecommendation,
  TSetRecListParams,
} from "../types/recommendation-types.ts";
import { devtools } from "zustand/middleware";

type RecommendationListState = {
  allRecCategoryList: TRecommendationCategories[];
  recPlaceList: TPlaceRecommendation[];
  recUserRoleList: TUserRoleRecommendation[];
  recAiRoleList: TAiRoleRecommendation[];
  recGoalList: TGoalRecommendation[];
  // isInitialAllRec: boolean;
  // isAllRecLoading: boolean;
  // currentRecommendLoading: keyof TRecommendationCategories | "all" | null;
  // 액션 객체를 받는 단일 함수
  setRecList: (action: TSetRecListParams) => void;
  setAllRecList: (list: TRecommendationCategories[]) => void;
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
            case "place":
              // action.type이 'place'로 좁혀졌으므로, action.payload는 TPlaceRecommendation[] 임이 보장됨
              return {
                recPlaceList: [...(state.recPlaceList ?? []), ...payload],
              };
            case "userRole":
              // action.payload는 TUserRoleRecommendation[]
              return {
                recUserRoleList: [...(state.recUserRoleList ?? []), ...payload],
              };
            case "aiRole":
              // action.payload는 TAiRoleRecommendation[]
              return {
                recAiRoleList: [...(state.recAiRoleList ?? []), ...payload],
              };
            case "goal":
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
    { name: "Recommendation-List" }
  )
);

export default useRecommendationListStore;
