import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateSituationLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex h-screen flex-col 
        bg-gradient-to-br from-orange-50 to-orange-100 
        border border-orange-300 
        rounded-lg shadow-lg
      "
    >
      {/* 헤더 */}
      <header
        className="
          relative w-full p-4 mb-4 
          text-orange-800 font-bold text-2xl 
          text-center bg-white/80 border-b border-orange-300 shadow-sm
        "
      >
        {/* 뒤로가기 버튼 (헤더 왼쪽) */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute left-4 top-1/2 transform -translate-y-1/2 
            flex items-center gap-2 px-3 py-1 
            text-orange-700 hover:text-orange-900 
            text-xl
            transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300
          "
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden md:inline">뒤로가기</span>
        </button>
        상황 생성
      </header>

      {children}
    </div>
  );
};

export default CreateSituationLayout;
