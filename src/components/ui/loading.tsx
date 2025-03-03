export default function Loading() {
  return (
    <div className="flex flex-col items-center space-y-4 p-8 justify-center h-screen w-full">
      <img
        src="/lingo-lion-logo-noBG.webp"
        alt="Lingo Lion Logo"
        className="w-28 h-28"
      />
      {/* 스피너 */}
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-orange-400" />

      <span>로딩중...</span>

      {/* 애니메이션 키프레임 정의 */}
      <style>{`
          @keyframes width {
            0% { width: 0; }
            100% { width: 100%; }
          }
        `}</style>
    </div>
  );
}
