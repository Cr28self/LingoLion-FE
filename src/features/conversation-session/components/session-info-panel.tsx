import { Badge } from '@/components/ui/badge.tsx';
import { cn } from '@/lib/utils.ts';
import {
  ClipboardList,
  Info,
  MapPin,
  Settings,
  Target,
  User,
  X,
} from 'lucide-react';
import { useConversationUIStore } from '../store/use-conversation-ui-store';
import { TSituation } from '@/entities/situation/types.ts';

// --- NEW: Session Info Panel Component ---
type SessionInfoPanelProps = {
  situationInfo: TSituation;
  level?: string;
  requests?: string;
};

export const SessionInfoPanel = ({
  situationInfo,
  level = 'none',
  requests = 'No specific requests',
}: SessionInfoPanelProps) => {
  // const { data: conversationInfo } = useGetConversationInfo(
  //   conversationId as string
  // );
  const isInfoPanelOpen = useConversationUIStore(
    (state) => state.isInfoPanelOpen
  );

  const toggleInfoPanel = useConversationUIStore(
    (state) => state.toggleInfoPanel
  );

  if (!situationInfo) return null;

  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 z-30 flex w-full max-w-sm transform flex-col border-l border-gray-200 bg-gradient-to-b from-white via-orange-50 to-red-50 shadow-2xl transition-transform duration-300 ease-in-out',
        isInfoPanelOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Panel Header */}
      <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <Info size={20} className="mr-2 text-orange-500" /> Session Info
        </h2>
        <button
          onClick={toggleInfoPanel}
          className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200"
          aria-label="Close session info"
        >
          <X size={20} />
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {/* Scenario Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-gray-700">
            Scenario
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <MapPin
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-red-500"
              />
              <div>
                <span className="font-medium text-gray-600">Place:</span>{' '}
                {situationInfo.place}
              </div>
            </div>
            <div className="flex items-start">
              <User
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-orange-600"
              />
              <div>
                <span className="font-medium text-gray-600">AI Role:</span>{' '}
                {situationInfo.aiRole}
              </div>
            </div>
            <div className="flex items-start">
              <User
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-blue-600"
              />
              <div>
                <span className="font-medium text-gray-600">Your Role:</span>{' '}
                {situationInfo.userRole}
              </div>
            </div>
            <div className="flex items-start">
              <Target
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-green-600"
              />
              <div>
                <span className="font-medium text-gray-600">Goal:</span>{' '}
                {situationInfo.goal}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Settings Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-base font-semibold text-gray-700">
            Chat Settings
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Settings
                size={16}
                className="mr-2 flex-shrink-0 text-gray-500"
              />
              <span className="mr-2 font-medium text-gray-600">난이도:</span>
              <Badge variant={'outline'}>{level}</Badge>
            </div>
            <div className="flex items-start">
              <ClipboardList
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-purple-600"
              />
              <div>
                <span className="font-medium text-gray-600">요청 사항:</span>{' '}
                {requests}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
