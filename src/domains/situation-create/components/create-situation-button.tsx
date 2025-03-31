import { CheckCircle2, Loader2 } from "lucide-react";
import React, { useState } from "react";

type CreateSituationButtonProps = {
  isFormFilled: boolean;
  onClick: () => void;
};
export default function CreateSituationButton({
  isFormFilled,
  onClick,
}: CreateSituationButtonProps) {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isFormFilled || isCreating}
      className={`w-full flex justify-center items-center py-4 px-6 text-lg font-extrabold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
      ${
        isFormFilled && !isCreating
          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
      }`}
    >
      {isCreating ? (
        <>
          <Loader2 size={20} className="animate-spin mr-3" />
          생성 중...
        </>
      ) : (
        <>
          <CheckCircle2 size={22} className="mr-2" />이 상황으로 시작하기
        </>
      )}
    </button>
  );
}
