import { Button } from '@/components/ui/button.tsx';
import { useSidebarStore } from '@/store/sidebar-store.ts';

type LogoutButtonProps = {
  onLogout: () => void;
  isLoggingOut: boolean;
};

const SidebarLogoutButton = ({ onLogout, isLoggingOut }: LogoutButtonProps) => {
  const { isOpen } = useSidebarStore();
  return (
    <Button
      className={`${
        isOpen ? 'mt-4 w-full' : 'mx-auto mt-3 h-10 w-10 p-0'
      } rounded-lg bg-primary/80 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-muted-foreground hover:shadow`}
      onClick={onLogout}
      disabled={isLoggingOut}
      title={isOpen ? '' : '로그아웃'}
    >
      {isOpen ? (
        isLoggingOut ? (
          '로그아웃 중...'
        ) : (
          '로그아웃'
        )
      ) : (
        <svg
          className="mx-auto h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      )}
    </Button>
  );
};

export default SidebarLogoutButton;
