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

import { useDeleteConvAtModal } from "../../../dashboard-common/hooks/use-delete-at-modal";

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
  const { isPending, handleConfirmDeleteConv } = useDeleteConvAtModal(
    onOpenChange,
    conversationId
  );

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
            onClick={handleConfirmDeleteConv}
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
