import React, { useEffect } from "react";
import { useSidebarStore } from "../store/sidebar-store";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type DashboardSidebarProps = {
  children: React.ReactNode;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ children }) => {
  const { isOpen, toggle, close, open } = useSidebarStore();

  // 화면 크기가 md 이하일 때 사이드바 자동으로 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      } else {
        // 데스크톱에서는 기본적으로 열려있도록 설정
        open();
      }
    };

    // 초기 로드 시 체크
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close, open]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={close}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-40
          bg-gradient-to-b from-orange-500 to-orange-600 
          flex flex-col shadow-xl h-full
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 md:w-20"}
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4 h-16">
          <div className="flex items-center overflow-hidden">
            <div className="flex-shrink-0 mr-2">
              <img
                src="/lingo-lion-logo-noBG.webp"
                alt="Lingo Lion"
                className="w-8 h-8"
              />
            </div>
            {isOpen && (
              <h2 className="text-white text-xl font-bold truncate">
                Lingo Lion
              </h2>
            )}
          </div>

          {/* 모바일에서만 보이는 닫기 버튼 */}
          <button
            className="md:hidden text-white hover:text-orange-200"
            onClick={close}
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* 데스크톱에서 사이드바 토글 버튼 */}
        <button
          className="hidden md:flex absolute -right-3 top-20 bg-orange-500 text-white rounded-full p-1 shadow-md hover:bg-orange-600 transition-colors z-50"
          onClick={toggle}
          aria-label={isOpen ? "사이드바 접기" : "사이드바 펼치기"}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex-1 flex flex-col overflow-y-auto py-4 px-3">
          {children}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
