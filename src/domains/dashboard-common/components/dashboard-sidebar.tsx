import React, { useEffect } from 'react';
import { useSidebarStore } from '../store/sidebar-store';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close, open]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden"
          onClick={close}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl transition-all duration-300 ease-in-out md:relative ${isOpen ? 'w-64' : 'w-0 md:w-20'} ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
      >
        <div className="flex h-16 items-center justify-between p-4">
          <div className="flex items-center overflow-hidden">
            <div className="mr-2 flex-shrink-0">
              <img
                src="/lingo-lion-logo-noBG.webp"
                alt="Lingo Lion"
                className="h-8 w-8"
              />
            </div>
            {isOpen && (
              <h2 className="truncate text-xl font-bold text-white">
                Lingo Lion
              </h2>
            )}
          </div>

          {/* 모바일에서만 보이는 닫기 버튼 */}
          <button
            className="text-white hover:text-orange-200 md:hidden"
            onClick={close}
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* 데스크톱에서 사이드바 토글 버튼 */}
        <button
          className="absolute -right-3 top-20 z-50 hidden rounded-full bg-orange-500 p-1 text-white shadow-md transition-colors hover:bg-orange-600 md:flex"
          onClick={toggle}
          aria-label={isOpen ? '사이드바 접기' : '사이드바 펼치기'}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          {children}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
