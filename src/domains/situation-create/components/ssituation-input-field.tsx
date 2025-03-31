import { Wand2 } from "lucide-react";

type SituationInputField = {
  name: string;
  label: string;
  value: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const individualSuggestionData = {
  place: [
    "공원 달리기 트랙",
    "조용한 해변 산책로",
    "운동 시설의 피트니스 센터",
    "산책하기 좋은 산길",
    "번화한 도심 거리",
    "조용한 시골길",
  ],
  aiRole: [
    "친절한 트레이너",
    "경험 많은 선배 러너",
    "데이터 분석가",
    "재활 전문가",
    "동기부여 코치",
  ],
  userRole: [
    "초보 러너",
    "마라톤 준비생",
    "부상에서 회복 중인 사람",
    "기록 단축 목표 선수",
    "즐겁게 달리는 사람",
  ],
  goal: [
    "5km 완주하기",
    "하프 마라톤 준비",
    "달리기 자세 교정",
    "부상 없이 달리기",
    "스트레스 해소",
    "새로운 달리기 코스 찾기",
  ],
};

export default function SituationInputField({
  name,
  label,
  placeholder,
  value,
  handleValueChange,
}: SituationInputField) {
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
          name={name}
          value={value}
          onChange={handleValueChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white transition duration-200 ease-in-out shadow-sm pr-14 text-gray-700 placeholder-gray-400"
        />
        {/* Individual Recommend Button */}
        <button
          type="button"
          onClick={() => {}}
          title={`${label} AI 추천 받기`}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-orange-500 hover:text-orange-700 bg-transparent hover:bg-orange-100 rounded-full transition duration-200 opacity-70 group-hover:opacity-100"
        >
          <Wand2 size={20} />
        </button>
      </div>

      {/* 태그 영역 (미리 공간 확보) */}
      <div className="mt-2 min-h-[44px] w-full overflow-hidden">
        {" "}
        {/* 최소 높이 지정 */}
      </div>
    </div>
  );
}

// {suggestions[field.id].length > 0 && (
//   <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-100">
//     {/* 가로 스크롤 컨테이너 */}
//     {suggestions[field.id].map((suggestion, index) => (
//       <button
//         key={index}
//         type="button"
//         onClick={() => field.setter(suggestion)}
//         // 개선된 태그 스타일
//         className="px-3.5 py-1.5 border border-orange-200 rounded-full text-sm font-medium text-orange-700 bg-white hover:bg-orange-50 hover:border-orange-300 hover:shadow-md transition duration-200 ease-in-out whitespace-nowrap shadow-sm"
//       >
//         {suggestion}
//       </button>
//     ))}
//   </div>
// )}
