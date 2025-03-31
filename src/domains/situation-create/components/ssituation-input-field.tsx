import { Wand2 } from "lucide-react";

type SituationInputField = {
  name: string;
  label: string;
  value: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
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
