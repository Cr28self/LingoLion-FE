import { TRecommendationCategories } from "../reducer/types";

type RecommendFormState = {
  hasRequestedAllRecommendations: boolean;
  isAllRecLoading: boolean;
  currentRecommendLoading: keyof TRecommendationCategories | "all" | null;
};
