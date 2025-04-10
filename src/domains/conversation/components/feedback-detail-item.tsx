import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const FeedbackDetailItem = ({ item }) => {
  let icon;
  let colorClasses;
  let iconColor;
  switch (item.severity) {
    case 'error':
      icon = AlertCircle;
      colorClasses = 'border-red-300 bg-red-50';
      iconColor = 'text-red-500';
      break;
    case 'warning':
      icon = AlertCircle;
      colorClasses = 'border-yellow-300 bg-yellow-50';
      iconColor = 'text-yellow-600';
      break;
    default:
      icon = CheckCircle2;
      colorClasses = 'border-blue-300 bg-blue-50';
      iconColor = 'text-blue-600';
  }
  const IconComponent = icon;
  return (
    <div className={`rounded-lg border p-3 ${colorClasses} mb-3 shadow-sm`}>
      <div className="mb-1.5 flex items-center gap-2">
        {' '}
        <IconComponent size={18} className={iconColor} />{' '}
        <span className={`text-sm font-semibold capitalize ${iconColor}`}>
          {item.type} ({item.severity})
        </span>{' '}
      </div>
      <p className="mb-2 text-sm text-gray-700">{item.text}</p>
      {item.suggestion && (
        <div className="rounded-md border border-green-200 bg-green-100 p-2 text-sm text-green-800">
          {' '}
          <p>
            <span className="font-medium">Suggestion:</span> {item.suggestion}
          </p>{' '}
        </div>
      )}
    </div>
  );
};
