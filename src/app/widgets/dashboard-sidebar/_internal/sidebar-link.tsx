import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarStore } from '@/store/sidebar-store.ts';

const SidebarLink = ({
  to,
  icon,
  children,
}: {
  to: string;
  icon: ReactNode;
  children: ReactNode;
}) => {
  const location = useLocation();
  const { isOpen } = useSidebarStore();

  return (
    <Link
      to={to}
      className={`group flex items-center rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-muted hover:text-foreground ${
        location.pathname === to ? 'bg-primary/10 text-primary' : ''
      }`}
    >
      <span className={`${isOpen ? 'mr-3' : 'mx-auto'}`}>{icon}</span>
      {isOpen && (
        <span className="truncate font-medium transition-transform duration-200 group-hover:translate-x-1">
          {children}
        </span>
      )}
    </Link>
  );
};

export default SidebarLink;
