import { Avatar, AvatarImage } from "@/components/ui/avatar";

type MsgBoxProps = {
  text: string;
};

export const ReceiveMsgBox = ({ text }: MsgBoxProps) => {
  return (
    <div className="flex items-start gap-3 group animate-fadeIn">
      <Avatar className="mt-1 border-2 border-orange-200 p-0.5 shadow-md transition-all duration-300 group-hover:scale-105">
        <AvatarImage src={"/lingo-lion-logo.jpeg"} />
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500 ml-1 font-medium">링고</div>
        <div className="relative w-max max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800 shadow-sm border border-orange-200">
          <div className="font-medium leading-relaxed">{text}</div>
          <div className="absolute -left-1.5 top-0 h-3 w-3 bg-gradient-to-br from-orange-50 to-orange-100 border-l border-t border-orange-200 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export const SendMsgBox = ({ text }: MsgBoxProps) => {
  return (
    <div className="flex flex-col items-end gap-1 animate-fadeIn">
      <div className="text-xs text-gray-500 mr-1 font-medium">나</div>
      <div className="relative w-max max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
        <div className="font-medium leading-relaxed">{text}</div>
        <div className="absolute -right-1.5 top-0 h-3 w-3 bg-gradient-to-br from-orange-500 to-orange-600 transform rotate-45"></div>
      </div>
    </div>
  );
};

// 애니메이션을 위한 스타일을 추가하려면 tailwind.config.js에 다음을 추가하세요:
// extend: {
//   keyframes: {
//     fadeIn: {
//       '0%': { opacity: 0, transform: 'translateY(10px)' },
//       '100%': { opacity: 1, transform: 'translateY(0)' }
//     }
//   },
//   animation: {
//     fadeIn: 'fadeIn 0.3s ease-out forwards'
//   }
// }
