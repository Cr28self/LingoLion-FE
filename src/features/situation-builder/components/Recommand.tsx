import { Separator } from "@/components/ui/separator";

export const RecommandTag = ({ msg }: { msg: string }) => {
  return (
    <button>
      <span className="text-xm font-bold">{msg}</span>
      <Separator className="my-1" />
    </button>
  );
};
