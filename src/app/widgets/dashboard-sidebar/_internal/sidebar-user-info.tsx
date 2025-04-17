import { useSidebarStore } from '@/store/sidebar-store.ts';
import { TGetUsersMyResponse } from '@/entities/user/types.ts';

type SidebarUserInfoProps = {
  userData: TGetUsersMyResponse;
};

const SidebarUserInfo = ({ userData }: SidebarUserInfoProps) => {
  const { isOpen } = useSidebarStore();

  const shortenName = userData?.name.slice(0, 2);
  return (
    <>
      {isOpen ? (
        <div className="flex items-center px-3">
          <div className="shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shadow-lg backdrop-blur-sm">
              <span className="font-bold text-primary">{shortenName}</span>
            </div>
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">
              {userData?.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {userData?.email}
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shadow-lg backdrop-blur-sm">
          <span className="font-bold text-primary">{shortenName}</span>
        </div>
      )}
    </>
  );
};

export default SidebarUserInfo;
