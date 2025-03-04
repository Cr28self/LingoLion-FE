import React from "react";

const SituationBuilderLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
          w-full p-4 mb-4 text-orange-800 font-bold text-2xl 
          text-center bg-white/80 border-b border-orange-300 shadow-sm
        "
      >
        상황 생성
      </header>
      {children}
    </div>
  );
};

export default SituationBuilderLayout;
