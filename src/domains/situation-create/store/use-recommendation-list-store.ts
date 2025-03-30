import {
  TAiRoleList,
  TAllList,
  TGoalList,
  TPlaceList,
  TUserRoleList,
} from "../reducer/types";

type RecommendationListState = {
  recAllList: TAllList[] | null;
  recPlaceList: TPlaceList[] | null;
  recUserRoleList: TUserRoleList[] | null;
  recAiRoleList: TAiRoleList[] | null;
  recGoalList: TGoalList[] | null;
  isInitialAllRec: boolean;
  isAllRecLoading: boolean;
  currentRecommendLoading: keyof TAllList | "all" | null;
  setRecList: <K extends keyof TAllList>(key: K, list: string[]) => void;
  setAllRecList: (list: TAllList[]) => void;
  setLoading: (key: keyof TAllList | "all" | null) => void;
};
