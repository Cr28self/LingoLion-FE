import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

type DeleteConversationDialogProps = {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onDeleteConfirm: () => void; // 비동기 함수 타입
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isPending: boolean;
};

const DeleteConversationDialog = ({
  isOpen,
  onOpenChange,
  cancelText,
  title,
  description,
  confirmText,
  onDeleteConfirm,
  isPending,
}: DeleteConversationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          {/* 취소 버튼: DialogClose 사용 */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline" // 또는 "secondary"
              disabled={isPending} // 작업 중일 때 비활성화
            >
              {cancelText}
            </Button>
          </DialogClose>

          {/* 확인(삭제) 버튼: 직접 클릭 핸들러 연결 */}
          <Button
            type="button"
            variant="destructive" // 삭제 작업이므로 destructive variant 사용 추천
            onClick={onDeleteConfirm}
            disabled={isPending} // 작업 중일 때 비활성화
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {confirmText}중...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConversationDialog;
