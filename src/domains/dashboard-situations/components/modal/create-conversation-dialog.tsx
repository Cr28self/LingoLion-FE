import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, // Import DialogClose for cancel button
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TSituation } from '@/types/situation.ts';
import { Loader2 } from 'lucide-react';

// Define the full type expected for a situation
type SituationWithMeta = TSituation & { id: number; createdAt: Date };

type CreateConversationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
  situation: SituationWithMeta | null; // Situation being used

  // Form state and setters from the hook
  title: string;
  setTitle: (value: string) => void;
  icon: string;
  setIcon: (value: string) => void;
  difficulty: '상' | '중' | '하';
  setDifficulty: (value: '상' | '중' | '하') => void;
  request: string;
  setRequest: (value: string) => void;
};

export const CreateConversationDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  isPending,
  situation,
  title,
  setTitle,
  icon,
  setIcon,
  difficulty,
  setDifficulty,
  request,
  setRequest,
}: CreateConversationDialogProps) => {
  // Prevent rendering if situation is not yet available (optional guard)
  if (!situation) return null;

  return (
    // Use the base Dialog component
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 대화 설정</DialogTitle>
          <DialogDescription>
            선택한 상황을 기반으로 새 대화의 설정을 입력하세요.
          </DialogDescription>
        </DialogHeader>

        {/* Situation Summary */}
        <details className="mb-4 rounded-lg bg-orange-50 p-3">
          <summary className="cursor-pointer text-sm font-medium">
            선택된 상황 정보 보기 ({situation.place})
          </summary>
          <div className="mt-2 space-y-1 pl-2 text-xs">
            <div>
              <span className="font-semibold text-gray-700">장소:</span>
              <span className="ml-2 text-gray-800">{situation.place}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">사용자 역할:</span>
              <span className="ml-2 text-gray-800">{situation.userRole}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">AI 역할:</span>
              <span className="ml-2 text-gray-800">{situation.aiRole}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">목표:</span>
              <span className="ml-2 text-gray-800">
                {situation.goal || '-'}
              </span>
            </div>
          </div>
        </details>

        {/* Form Fields */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="create-title"
              className="text-right text-sm font-medium"
            >
              대화방 제목 *
            </label>
            <Input
              id="create-title"
              placeholder="예: 카페에서 주문하기 연습"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="create-icon"
              className="text-right text-sm font-medium"
            >
              아이콘
            </label>
            <Input
              id="create-icon"
              placeholder="💬 또는 이모지"
              className="col-span-3"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="create-difficulty"
              className="text-right text-sm font-medium"
            >
              난이도
            </label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty} // Directly pass the setter
              disabled={isPending}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="난이도 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="상">상</SelectItem>
                <SelectItem value="중">중</SelectItem>
                <SelectItem value="하">하</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="create-request"
              className="text-right text-sm font-medium"
            >
              요청사항
            </label>
            <Input
              id="create-request"
              placeholder="예: 실제처럼 자연스럽게 응답해주세요"
              className="col-span-3"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              disabled={isPending}
            />
          </div>
        </div>

        {/* Footer with Buttons */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isPending}>
              취소
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={onSubmit} // Call the handler from the hook
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                생성 중...
              </>
            ) : (
              '대화 생성'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
