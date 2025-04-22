import React from 'react';

export default function CreateSituationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50 to-red-50 p-6 md:p-10">
      {/* Header */}
      {/* <header className="mx-auto mb-6 max-w-4xl">
        <button
          onClick={() => window.history.back()}
          className="group mb-4 flex items-center text-orange-600 transition duration-200 hover:text-orange-800"
        >
          <ArrowLeft
            size={20}
            className="mr-1 transform transition-transform group-hover:-translate-x-1"
          />
          <span className="font-medium">뒤로가기</span>
        </button>
        <h1 className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-center text-2xl font-bold text-transparent md:text-3xl">
          나만의 대화 상황 만들기
        </h1>
        <p className="mt-2 text-center text-xs text-gray-600 md:text-xl">
          AI와 역할극을 위한 상황을 직접 설정하거나 추천받아 보세요!
        </p>
      </header> */}

      {children}
    </div>
  );
}
