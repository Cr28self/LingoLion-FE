import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteConversation } from "../../api/delete-conversation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteConversationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  conversationId: number | null;
}

const DeleteConversationDialog: React.FC<DeleteConversationDialogProps> = ({
  isOpen,
  onOpenChange,
  conversationId,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteConversation();

  const handleConfirmDelete = async () => {
    if (conversationId) {
      mutate(conversationId, {
        onSuccess: () => {
          toast.success("대화가 성공적으로 삭제되었습니다.");
          onOpenChange(false);
          // 삭제 후 대화 목록 데이터 갱신
          queryClient.invalidateQueries({ queryKey: ["getAllConversations"] });
        },
        onError: (error) => {
          console.error("삭제 오류:", error);
          toast.error("대화 삭제 중 오류가 발생했습니다.");
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>대화 삭제</DialogTitle>
          <DialogDescription>
            이 대화를 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConversationDialog;
