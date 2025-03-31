import {
  TAiRoleRecommendation,
  TRecommendationCategories,
  TGoalRecommendation,
  TPlaceRecommendation,
  TUserRoleRecommendation,
} from "./types";

export type RecommendFormState = {
  formState: {
    place: string;
    userRole: string;
    aiRole: string;
    goal: string;
  };

  recAllList: TRecommendationCategories[] | null;
  recPlaceList: TPlaceRecommendation[] | null;
  recUserRoleList: TUserRoleRecommendation[] | null;
  recAiRoleList: TAiRoleRecommendation[] | null;
  recGoalList: TGoalRecommendation[] | null;
  isInitialAllRec: boolean;
  isAllRecLoading: boolean;
  isSubmitting: boolean;
  currentRecommendLoading: keyof TRecommendationCategories | "all" | null;
};

export type recommendFormAction =
  | {
      type: "SET_FORM_VALUE";
      name: keyof TRecommendationCategories;
      value: string;
    }
  | { type: "SET_REC_PLACE_LIST"; payload: TPlaceRecommendation[] | null }
  | { type: "SET_REC_AIROLE_LIST"; payload: TAiRoleRecommendation[] | null }
  | { type: "SET_REC_USERROLE_LIST"; payload: TUserRoleRecommendation[] | null }
  | { type: "SET_REC_GOAL_LIST"; payload: TGoalRecommendation[] | null }
  | { type: "SET_REC_ALL_LIST"; payload: TRecommendationCategories[] | null }
  | {
      type: "SET_LOADING";
      name: "isAllRecLoading" | "isSubmitting";
      value: boolean;
    }
  | {
      type: "SET_CURRENT_RECOMMEND_LOADING";
      field: keyof TRecommendationCategories | "all" | null;
    };
export const initialState: RecommendFormState = {
  formState: {
    place: "",
    userRole: "",
    aiRole: "",
    goal: "",
  },
  recAllList: null,
  recPlaceList: null,
  recUserRoleList: null,
  recAiRoleList: null,
  recGoalList: null,
  isAllRecLoading: false,
  isInitialAllRec: false,
  isSubmitting: false,
  currentRecommendLoading: null,
};

export function recommendFormReducer(
  state: RecommendFormState,
  action: recommendFormAction
): RecommendFormState {
  switch (action.type) {
    case "SET_FORM_VALUE":
      return {
        ...state,
        formState: {
          ...state.formState,
          [action.name]: action.value,
        },
      };

    case "SET_REC_PLACE_LIST": {
      const newList = state.recPlaceList || [];
      action.payload?.forEach((item) => {
        newList?.push(item);
      });
      return { ...state, recPlaceList: newList };
    }

    case "SET_REC_AIROLE_LIST": {
      const newList = state.recAiRoleList || [];
      action.payload?.forEach((item) => {
        newList?.push(item);
      });
      return { ...state, recAiRoleList: newList };
    }

    case "SET_REC_USERROLE_LIST": {
      const newList = state.recUserRoleList || [];
      action.payload?.forEach((item) => {
        newList?.push(item);
      });
      return { ...state, recUserRoleList: newList };
    }

    case "SET_REC_GOAL_LIST": {
      const newList = state.recGoalList || [];
      action.payload?.forEach((item) => {
        newList?.push(item);
      });
      return { ...state, recGoalList: newList };
    }

    case "SET_REC_ALL_LIST": {
      const newList = state.recAllList || [];
      action.payload?.forEach((item) => {
        newList?.push(item);
      });
      return {
        ...state,
        isInitialAllRec: true,
        recAllList: newList,
      };
    }
    case "SET_LOADING":
      return { ...state, [action.name]: action.value };
    // 리듀서에 추가할 내용
    case "SET_CURRENT_RECOMMEND_LOADING":
      return {
        ...state,
        currentRecommendLoading: action.field,
      };

    default:
      return state;
  }
}
