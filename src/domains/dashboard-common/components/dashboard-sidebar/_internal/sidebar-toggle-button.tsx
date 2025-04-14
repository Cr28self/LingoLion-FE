import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/domains/dashboard-common/store/sidebar-store';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

const useToggle = () => useSidebarStore((state) => state.toggle);
const useIsOpen = () => useSidebarStore((state) => state.isOpen); // isOpen 상태도 필요하면 가져옵니다.

export const DesktopToggleButton = () => {
  const toggle = useToggle();
  const isOpen = useIsOpen();

  return (
    <Button
      variant={'link'}
      className="absolute -right-3 top-20 z-50 hidden rounded-full bg-orange-500 p-1 text-white shadow-md transition-colors hover:bg-orange-600 md:flex"
      onClick={toggle}
      aria-label={isOpen ? '사이드바 접기' : '사이드바 펼치기'}
    >
      {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </Button>
  );
};

export const MobileToggleButton = () => {
  const toggle = useToggle();

  return (
    <Button
      className="fixed left-4 top-4 z-50 rounded-lg bg-background p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white md:hidden"
      onClick={toggle}
      aria-label="메뉴 열기"
    >
      <Menu size={24} className="text-primary" />
    </Button>
  );
};
