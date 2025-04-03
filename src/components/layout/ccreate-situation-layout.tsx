import { ArrowLeft } from "lucide-react";
import React from "react";

export default function CreateSituationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8 px-4">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-orange-600 hover:text-orange-800 transition duration-200 mb-4 group"
        >
          <ArrowLeft
            size={20}
            className="mr-1 transform group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">뒤로가기</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
          나만의 대화 상황 만들기
        </h1>
        <p className="text-center text-gray-600 mt-2 text-xs  md:text-xl">
          AI와 역할극을 위한 상황을 직접 설정하거나 추천받아 보세요!
        </p>
      </header>

      {children}
    </div>
  );
}
