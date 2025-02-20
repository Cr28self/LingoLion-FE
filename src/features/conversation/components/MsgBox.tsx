import { Avatar, AvatarImage } from "@/components/ui/avatar";

type MsgBoxProps = {
  text: string;
};
export const ReceiveMsgBox = ({ text }: MsgBoxProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={"./lingo-lion-logo.jpeg"} />
      </Avatar>
      <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted mb-2">
        {text}
      </div>
    </div>
  );
};

export const SendMsgBox = ({ text }: MsgBoxProps) => {
  return (
    <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground mb-2">
      {text}
    </div>
  );
};
