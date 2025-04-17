// src/components/FeedbackPanel/FeedbackDetailItem.tsx

import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Adjust path if needed
import { FeedbackItem, FeedbackSeverity } from '../../types/feedback';

// Helper function co-located as it's specific to this component's styling
const getSeverityStyles = (severity: FeedbackSeverity) => {
  switch (severity) {
    case 'error':
      return {
        Icon: AlertCircle,
        containerClasses: 'border-red-300 bg-red-50',
        iconColor: 'text-red-500',
      };
    case 'warning':
      return {
        Icon: AlertCircle,
        containerClasses: 'border-yellow-300 bg-yellow-50',
        iconColor: 'text-yellow-600',
      };
    case 'info':
    default:
      return {
        Icon: CheckCircle2,
        containerClasses: 'border-blue-300 bg-blue-50',
        iconColor: 'text-blue-600',
      };
  }
};

interface FeedbackDetailItemProps {
  item: FeedbackItem;
}

export const FeedbackDetailItem: React.FC<FeedbackDetailItemProps> = ({
  item,
}) => {
  const { Icon, containerClasses, iconColor } = getSeverityStyles(
    item.severity
  );

  return (
    <div
      className={cn('mb-3 rounded-lg border p-3 shadow-sm', containerClasses)}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <Icon size={18} className={iconColor} aria-hidden="true" />
        <span className={cn('text-sm font-semibold capitalize', iconColor)}>
          {item.type} ({item.severity})
        </span>
      </div>
      <p className="mb-2 text-sm text-gray-700">{item.text}</p>
      {item.suggestion && (
        <div className="rounded-md border border-green-200 bg-green-100 p-2 text-sm text-green-800">
          <p>
            <span className="font-medium">Suggestion:</span> {item.suggestion}
          </p>
        </div>
      )}
    </div>
  );
};
