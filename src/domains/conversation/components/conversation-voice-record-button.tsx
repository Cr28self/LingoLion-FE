import { Button } from '@/components/ui/button.tsx';

type ConversationVoiceRecordButtonProps = {
  onRecord: () => void;
  onActive: boolean;
};

export default function ConversationVoiceRecordButton({
  onRecord,
  onActive,
}: ConversationVoiceRecordButtonProps) {
  return (
    <>
      <Button
        className={`ml-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 p-3 text-white shadow-md transition-all duration-300 hover:from-orange-600 hover:to-orange-700`}
        onClick={onRecord}
      >
        {onActive ? '중지' : '말'}
      </Button>
    </>
  );
}
