import { Wand2 } from "lucide-react";
import {
  RecommendationTypeMap,
  TAiRoleRecommendation,
  TGoalRecommendation,
  TPlaceRecommendation,
  TRecommendationCategoriesKey,
  TUserRoleRecommendation,
} from "../reducer/types";
import { Button } from "@/components/ui/button";

// Base props common to all variants (can be kept separate or inline)
type BaseSituationInputFieldProps = {
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  onIndividualRecommend: () => void;
  placeholder: string;
  isPending: boolean;
};

// Generate a map where keys are 'name' values and values are the corresponding full prop types
type SituationInputFieldPropsMap = {
  // For each key K in 'place' | 'aiRole' | 'userRole' | 'goal'
  [K in TRecommendationCategoriesKey]: BaseSituationInputFieldProps & {
    name: K; // The 'name' prop is the specific key K
    // The 'recommendations' prop type is looked up in RecommendationTypeMap using K
    recommendations: RecommendationTypeMap[K];
  };
};

// Create the final union type by getting all possible values from the map
export type SituationInputFieldProps =
  SituationInputFieldPropsMap[TRecommendationCategoriesKey];

export default function SituationInputField({
  name,
  label,
  placeholder,
  value,
  onValueChange,
  onIndividualRecommend,
  recommendations,
  isPending,
}: SituationInputFieldProps) {
  const getRecommendationText = (
    rec:
      | TPlaceRecommendation
      | TAiRoleRecommendation
      | TUserRoleRecommendation
      | TGoalRecommendation
  ): string => {
    // Check the 'name' prop passed to the component instance
    // and use type guards ('in' operator) to narrow the type of 'rec'
    if (name === "place" && "place" in rec) {
      return rec.place; // TS knows rec is TPlaceRecommendation here
    }
    if (name === "aiRole" && "aiRole" in rec) {
      return rec.aiRole; // TS knows rec is TAiRoleRecommendation here
    }
    if (name === "userRole" && "userRole" in rec) {
      return rec.userRole; // TS knows rec is TUserRoleRecommendation here
    }
    if (name === "goal" && "goal" in rec) {
      return rec.goal; // TS knows rec is TGoalRecommendation here
    }
    // Fallback or error handling if needed, though theoretically unreachable
    // if props are passed correctly.
    console.warn(
      "Could not determine suggestion value for:",
      rec,
      "with name:",
      name
    );
    return "";
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-base font-semibold text-gray-800 mb-2"
      >
        {label}
      </label>
      <div className="relative group">
        {/* Input Field */}
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition duration-200 ease-in-out shadow-sm pr-14 text-gray-700 placeholder-gray-400"
        />
        {/* Individual Recommend Button */}
        <Button
          type="button"
          onClick={onIndividualRecommend}
          title={`${label} AI 추천 받기`}
          disabled={isPending}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-orange-500 hover:text-orange-700 bg-transparent hover:bg-orange-100  transition duration-200 opacity-70 group-hover:opacity-100 border-none"
        >
          <Wand2 size={20} />
        </Button>
      </div>

      {/* 태그 영역 (미리 공간 확보) */}
      <div className="mt-2 min-h-[44px] w-full overflow-hidden">
        {" "}
        {/* 최소 높이 지정 */}
        {recommendations.length > 0 && (
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100">
            {/* 가로 스크롤 컨테이너 */}

            {recommendations.map((recommendation, index) => {
              const recommendationText = getRecommendationText(recommendation);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onValueChange(recommendationText)}
                  // 개선된 태그 스타일
                  className="px-3.5 py-1.5 border border-orange-200 rounded-full text-sm font-medium text-orange-700 bg-white hover:bg-orange-50 hover:border-orange-300 hover:shadow-md transition duration-200 ease-in-out whitespace-nowrap shadow-sm"
                >
                  {recommendationText}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
