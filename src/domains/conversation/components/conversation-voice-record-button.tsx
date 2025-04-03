import { Button } from "@/components/ui/button.tsx";


type ConversationVoiceRecordButtonProps = {

  onRecord:()=>void;
  onActive:boolean;
};

export default function ConversationVoiceRecordButton({
    onRecord,
    onActive
}:ConversationVoiceRecordButtonProps) {


  return (
    <>
      <Button
        className={`rounded-full p-3 ml-2 transition-all duration-300 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md`}
        onClick={onRecord}
      >
        {onActive ? "중지" : "말"}
      </Button>

    </>
  );
}
