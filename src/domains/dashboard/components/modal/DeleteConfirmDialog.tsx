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
import { useDeleteSituation } from "../../api/delete-situations";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  situationId: number | null;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onOpenChange,
  situationId,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteSituation();

  const handleConfirmDelete = async () => {
    if (situationId) {
      mutate(situationId, {
        onSuccess: () => {
          toast.success("상황이 성공적으로 삭제되었습니다.");
          onOpenChange(false);
          // 삭제 후 상황 목록 데이터 갱신
          queryClient.invalidateQueries({ queryKey: ["getSituations"] });
        },
        onError: (error) => {
          console.error("삭제 오류:", error);
          toast.error("상황 삭제 중 오류가 발생했습니다.");
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>상황 삭제</DialogTitle>
          <DialogDescription>
            이 상황을 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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

export default DeleteConfirmDialog;
