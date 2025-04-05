import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CreateSituationLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col rounded-lg border border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg">
      {/* 헤더 */}
      <header className="relative mb-4 w-full border-b border-orange-300 bg-white/80 p-4 text-center text-2xl font-bold text-orange-800 shadow-sm">
        {/* 뒤로가기 버튼 (헤더 왼쪽) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 flex -translate-y-1/2 transform items-center gap-2 rounded-lg px-3 py-1 text-xl text-orange-700 transition-all hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
