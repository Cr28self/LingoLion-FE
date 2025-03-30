import { TAllList } from "../reducer/types";

type RecommendFormState = {
  isInitialAllRec: boolean;
  isAllRecLoading: boolean;
  currentRecommendLoading: keyof TAllList | "all" | null;
};
