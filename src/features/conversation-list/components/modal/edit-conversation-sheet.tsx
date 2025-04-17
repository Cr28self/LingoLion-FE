import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';

type EditConversationSheet = {
  isOpen: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onOpenChange: (isOpen: boolean) => void;
  onUpdateConfirm: () => void;
  isPending: boolean;
  submitText?: string;
  cancelText?: string;
};

export const EditConversationSheet = ({
  isOpen,
  onOpenChange,
  onUpdateConfirm,
  isPending,
  title = '편집', // 기본값
  description,
  children, // children 받기
  submitText = '저장',
  cancelText = '취소',
}: EditConversationSheet) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="mr-2"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onUpdateConfirm}
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {submitText}중...
              </>
            ) : (
              submitText
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
