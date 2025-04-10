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
import { useState } from 'react';

const mockSessionContext = {
  title: 'Coffee Shop Order Practice',
  difficulty: 'Intermediate', // or maybe numerical 1-5
  requests:
    'Speak naturally, like a real barista. Be friendly but professional.',
  place: 'A busy downtown coffee shop',
  aiRole: 'Experienced Barista named Ringo',
  userRole: 'Customer trying to order a specific drink',
  goal: 'Successfully order a customized latte and ask about loyalty programs.',
};

// --- NEW: Session Info Panel Component ---
export const SessionInfoPanel = ({ isOpen, onClose }) => {
  const [sessionContext, setSessionContext] = useState(mockSessionContext); // Hold sessionContext data

  if (!sessionContext) return null;

  return (
    <div
      className={cn(
        'fixed inset-y-0 right-0 z-30 flex w-full max-w-sm transform flex-col border-l border-gray-200 bg-gradient-to-b from-white via-orange-50 to-red-50 shadow-2xl transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Panel Header */}
      <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <Info size={20} className="mr-2 text-orange-500" /> Session Info
        </h2>
        <button
          onClick={onClose}
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
                {sessionContext.place}
              </div>
            </div>
            <div className="flex items-start">
              <User
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-orange-600"
              />
              <div>
                <span className="font-medium text-gray-600">AI Role:</span>{' '}
                {sessionContext.aiRole}
              </div>
            </div>
            <div className="flex items-start">
              <User
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-blue-600"
              />
              <div>
                <span className="font-medium text-gray-600">Your Role:</span>{' '}
                {sessionContext.userRole}
              </div>
            </div>
            <div className="flex items-start">
              <Target
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-green-600"
              />
              <div>
                <span className="font-medium text-gray-600">Goal:</span>{' '}
                {sessionContext.goal}
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
              <span className="mr-2 font-medium text-gray-600">
                Difficulty:
              </span>
              <Badge variant={'outline'}>Intermediate</Badge>
            </div>
            <div className="flex items-start">
              <ClipboardList
                size={16}
                className="mr-2 mt-0.5 flex-shrink-0 text-purple-600"
              />
              <div>
                <span className="font-medium text-gray-600">AI Requests:</span>{' '}
                {sessionContext.requests}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
