import {
  TAiRoleList,
  TAllList,
  TGoalList,
  TPlaceList,
  TUserRoleList,
} from "../reducer/types";

export type RecommendFormState = {
  formState: {
    place: string;
    userRole: string;
    aiRole: string;
    goal: string;
  };

  recAllList: TAllList[] | null;
  recPlaceList: TPlaceList[] | null;
  recUserRoleList: TUserRoleList[] | null;
  recAiRoleList: TAiRoleList[] | null;
  recGoalList: TGoalList[] | null;
  isInitialAllRec: boolean;
  isAllRecLoading: boolean;
  isSubmitting: boolean;
  currentRecommendLoading: keyof TAllList | "all" | null;
};
