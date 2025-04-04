import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateConversation } from "../../api/update-conversation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Conversation = {
  id: number;
  title: string;
  icon: string;
  createdAt: Date;
};

type EditConversationModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: Conversation | null;
};

const EditConversationModal: React.FC<EditConversationModalProps> = ({
  isOpen,
  onOpenChange,
  conversation,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateConversation();
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (isOpen && conversation) {
      setTitle(conversation.title || "");
      setIcon(conversation.icon || "");
    }
  }, [isOpen, conversation]);

  const handleSubmit = () => {
    if (!conversation) return;
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    mutate(
      { id: conversation.id, data: { title, icon } },
      {
        onSuccess: () => {
          toast.success("대화가 성공적으로 업데이트되었습니다.");
          onOpenChange(false);
          // 대화 목록 데이터 갱신
          queryClient.invalidateQueries({ queryKey: ["getAllConversations"] });
        },
        onError: (error) => {
          console.error("업데이트 오류:", error);
          toast.error("대화 업데이트 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>대화 편집</SheetTitle>
          <SheetDescription>
            대화의 제목과 아이콘을 수정한 후 저장 버튼을 클릭하세요.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right font-medium">
              제목
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="icon" className="text-right font-medium">
              아이콘
            </label>
            <Input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="col-span-3"
              placeholder="이모지 입력 (예: 💬, 🗣️, 📝)"
            />
          </div>
        </div>

        <SheetFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="mr-2"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? "저장 중..." : "저장"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditConversationModal;
