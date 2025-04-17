import { Wand2 } from 'lucide-react';
import {
  TSituationFieldCollections,
  TSituationAiRoleField,
  TSituationGoalField,
  TSituationPlaceField,
  TSituationFieldKey,
  TSituationUserRoleField,
} from '@/types/situation.ts';
import { Button } from '@/components/ui/button';

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
  [K in TSituationFieldKey]: BaseSituationInputFieldProps & {
    name: K; // The 'name' prop is the specific key K
    // The 'recommendations' prop type is looked up in RecommendationTypeMap using K
    recommendations: TSituationFieldCollections[K];
  };
};

// Create the final union type by getting all possible values from the map
export type SituationInputFieldProps =
  SituationInputFieldPropsMap[TSituationFieldKey];

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
      | TSituationPlaceField
      | TSituationAiRoleField
      | TSituationUserRoleField
      | TSituationGoalField
  ): string => {
    // Check the 'name' prop passed to the component instance
    // and use type guards ('in' operator) to narrow the type of 'rec'
    if (name === 'place' && 'place' in rec) {
      return rec.place; // TS knows rec is TPlaceRecommendation here
    }
    if (name === 'aiRole' && 'aiRole' in rec) {
      return rec.aiRole; // TS knows rec is TAiRoleRecommendation here
    }
    if (name === 'userRole' && 'userRole' in rec) {
      return rec.userRole; // TS knows rec is TUserRoleRecommendation here
    }
    if (name === 'goal' && 'goal' in rec) {
      return rec.goal; // TS knows rec is TGoalRecommendation here
    }
    // Fallback or error handling if needed, though theoretically unreachable
    // if props are passed correctly.
    console.warn(
      'Could not determine suggestion value for:',
      rec,
      'with name:',
      name
    );
    return '';
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-base font-semibold text-gray-800"
      >
        {label}
      </label>
      <div className="group relative">
        {/* Input Field */}
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 pr-14 text-gray-700 placeholder-gray-400 shadow-sm transition duration-200 ease-in-out focus:border-transparent focus:bg-white focus:ring-2 focus:ring-orange-400"
        />
        {/* Individual Recommend Button */}
        <Button
          type="button"
          onClick={onIndividualRecommend}
          title={`${label} AI 추천 받기`}
          disabled={isPending}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform border-none bg-transparent p-2 text-orange-500 opacity-70 transition duration-200 hover:bg-orange-100 hover:text-orange-700 group-hover:opacity-100"
        >
          <Wand2 size={20} />
        </Button>
      </div>

      {/* 태그 영역 (미리 공간 확보) */}
      <div className="mt-2 min-h-[44px] w-full overflow-hidden">
        {' '}
        {/* 최소 높이 지정 */}
        {recommendations.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-thin scrollbar-track-orange-100 scrollbar-thumb-orange-300">
            {/* 가로 스크롤 컨테이너 */}

            {recommendations.map((recommendation, index) => {
              const recommendationText = getRecommendationText(recommendation);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onValueChange(recommendationText)}
                  // 개선된 태그 스타일
                  className="whitespace-nowrap rounded-full border border-orange-200 bg-white px-3.5 py-1.5 text-sm font-medium text-orange-700 shadow-sm transition duration-200 ease-in-out hover:border-orange-300 hover:bg-orange-50 hover:shadow-md"
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
