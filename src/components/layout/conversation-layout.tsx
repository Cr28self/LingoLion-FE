import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '../ui/button';
import {
  ArrowLeft,
  ChevronsLeft,
  Info,
  MoreVertical,
  Settings,
} from 'lucide-react';
import { Badge } from '../ui/badge';

type ConversationLayoutProps = {
  title: string;
  onExitConversation: () => void;
  buttons: React.ReactNode;
  children: React.ReactNode;
};

const ConversationLayout = ({
  title,
  onExitConversation,
  buttons,
  children,
}: ConversationLayoutProps) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden font-sans">
      {/* Added overflow-hidden */}
      <header className="sticky top-0 z-20 flex flex-shrink-0 items-center justify-between bg-gray-50 p-3 shadow-lg">
        <div className="flex min-w-0 items-center space-x-2">
          {/* Added min-w-0 for truncation */}
          <Button
            variant={'link'}
            onClick={onExitConversation}
            className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/20"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex min-w-0 flex-col items-start md:flex-row md:items-center">
            {/* Wrapper for truncation */}
            <h1 className="truncate text-lg font-semibold">{title}</h1>
            {/* Added truncate */}
            <Badge className="md:ml-2" variant="default">
              Lv. Intermediate
            </Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center space-x-1">
          {/* Info Button */}

          {buttons}
        </div>
      </header>

      {children}
    </div>
  );
};

export default ConversationLayout;
