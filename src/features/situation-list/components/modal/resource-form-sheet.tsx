import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose, // Import SheetClose for cancel button
} from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';

type ResourceFormSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description?: string; // Description is optional
  children: React.ReactNode; // Form fields will be passed as children
  onSubmit: () => void;
  isPending: boolean;
  submitText?: string;
  cancelText?: string;
};

export const ResourceFormSheet = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  isPending,
  submitText = '저장', // Default submit text
  cancelText = '취소', // Default cancel text
}: ResourceFormSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {/* Render form fields passed as children */}
        {children}

        <SheetFooter className="mt-4">
          {/* Cancel Button: Uses SheetClose */}
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="mr-2"
            >
              {cancelText}
            </Button>
          </SheetClose>

          {/* Submit Button */}
          <Button
            type="button" // Ensure it's not submitting a form directly
            onClick={onSubmit}
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600" // You might want to make this configurable too
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {submitText} 중... {/* Dynamic loading text */}
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
