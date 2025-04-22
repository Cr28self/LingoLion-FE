import { CheckCircle2, Loader2 } from 'lucide-react';

type CreateSituationButtonProps = {
  isFormFilled: boolean;
  isCreating: boolean;
};
export default function CreateSituationButton({
  isFormFilled,
  isCreating,
}: CreateSituationButtonProps) {
  return (
    <button
      type="submit"
      disabled={!isFormFilled || isCreating}
      className={`flex w-full transform items-center justify-center rounded-lg px-6 py-4 text-lg font-extrabold shadow-lg transition duration-300 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
        isFormFilled && !isCreating
          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
          : 'cursor-not-allowed bg-gray-300 text-gray-500 opacity-70'
      }`}
    >
      {isCreating ? (
        <>
          <Loader2 size={20} className="mr-3 animate-spin" />
          생성 중...
        </>
      ) : (
        <>
          <CheckCircle2 size={22} className="mr-2" />
          설정 완료! 대화 시작 준비
        </>
      )}
    </button>
  );
}
