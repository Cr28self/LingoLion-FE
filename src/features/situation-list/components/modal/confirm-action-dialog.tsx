import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog.tsx';
import { Loader2 } from 'lucide-react';
import { ButtonProps } from '@/components/ui/button.tsx'; // Import ButtonProps type

type ConfirmActionDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isPending: boolean;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: ButtonProps['variant']; // Allow customizing confirm button variant
};

export const ConfirmActionDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  isPending,
  cancelText = '취소', // Default cancel text
  confirmText = '확인', // Default confirm text
  confirmVariant = 'destructive', // Default to destructive for delete actions
}: ConfirmActionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          {/* Cancel Button: Uses DialogClose */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isPending} // Disable during pending state
            >
              {cancelText}
            </Button>
          </DialogClose>

          {/* Confirm Button */}
          <Button
            type="button"
            variant={confirmVariant} // Use the provided variant
            onClick={onConfirm}
            disabled={isPending} // Disable during pending state
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                처리중... {/* Generic loading text */}
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
