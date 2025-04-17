import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  ChevronsRight,
  Info,
  MoreVertical,
  Settings,
  ChevronsLeft,
} from 'lucide-react';
import { SettingDialog } from './setting-dialog';
import { useConversationUIStore } from '../store/use-conversation-ui-store';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useLiveMessagesStore } from '../store/use-live-messages-store';

type ConversationMainHeaderProps = {
  convId: string;
  title: string;
  backUrl: string;
  level?: string;
};

const ConversationMainHeader = ({
  convId,
  title,
  backUrl,
  level = 'none',
}: ConversationMainHeaderProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleExitConversation = () => {
    navigate(backUrl);
    useLiveMessagesStore.getState().resetLiveMessages();

    queryClient.invalidateQueries({
      queryKey: ['getAllMessage', convId],
    });
  };

  const isMenuOpen = useConversationUIStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useConversationUIStore((state) => state.setIsMenuOpen);
  const isSettingDialogOpen = useConversationUIStore(
    (state) => state.isSettingDialogOpen
  );

  const setIsSettingDialogOpen = useConversationUIStore(
    (state) => state.setIsSettingDialogOpen
  );

  const isFeedbackPanelOpen = useConversationUIStore(
    (state) => state.isFeedbackPanelOpen
  );

  const toggleFeedbackPanel = useConversationUIStore(
    (state) => state.toggleFeedbackPanel
  );
  const toggleInfoPanel = useConversationUIStore(
    (state) => state.toggleInfoPanel
  );

  const handleOpenSettingDialog = () => {
    setIsMenuOpen(false); // 메뉴 먼저 닫고
    setTimeout(() => {
      setIsSettingDialogOpen(true); // 잠깐 기다렸다가 다이얼로그 열기
    }, 50);
  };

  return (
    <header className="sticky top-0 z-20 flex flex-shrink-0 items-center justify-between bg-gray-50 p-3 shadow-lg">
      <div className="flex min-w-0 items-center space-x-2">
        {/* Added min-w-0 for truncation */}
        <Button
          variant={'link'}
          onClick={handleExitConversation}
          className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/20"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex min-w-0 flex-col items-start md:flex-row md:items-center">
          {/* Wrapper for truncation */}
          <h1 className="truncate text-lg font-semibold">{title}</h1>
          {/* Added truncate */}
          <Badge className="md:ml-2" variant="default">
            Lv. {level}
          </Badge>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center space-x-1">
        {/* Info Button */}

        <Button
          variant="link"
          onClick={toggleInfoPanel}
          className="rounded-full p-1.5 transition-colors hover:bg-white/20"
          aria-label="Show session info"
        >
          <Info size={20} />
        </Button>

        <DropdownMenu
          open={isMenuOpen}
          onOpenChange={(isOpen) => {
            setIsMenuOpen(isOpen);
          }}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full p-1.5 transition-colors hover:bg-white/20"
            >
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>메뉴</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleOpenSettingDialog}>
              <Settings size={16} className="mr-1" /> 채팅방 설정
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Feedback Toggle Button */}
        <Button
          variant="ghost"
          onClick={toggleFeedbackPanel}
          className="hidden rounded-full p-1.5 transition-colors hover:bg-white/20 md:block"
          aria-label={
            isFeedbackPanelOpen ? 'Hide Feedback Panel' : 'Show Feedback Panel'
          }
        >
          {isFeedbackPanelOpen ? (
            <ChevronsRight size={20} />
          ) : (
            <ChevronsLeft size={20} />
          )}
        </Button>
        {
          // Settings Dialog
          isSettingDialogOpen && (
            <SettingDialog
              isOpen={isSettingDialogOpen}
              onOpenChange={setIsSettingDialogOpen}
            />
          )
        }
      </div>
    </header>
  );
};

export default ConversationMainHeader;
