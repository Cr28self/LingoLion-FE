import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { TAllList } from "@/domains/situation-create/reducer/types";
import { useUpdateSituation } from "../../api/update-situation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type TSituation = TAllList & { id: number; createdAt: Date };

interface EditSituationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  situation: TSituation;
}

const EditSituationModal: React.FC<EditSituationModalProps> = ({
  isOpen,
  onOpenChange,
  situation,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateSituation();

  const [formData, setFormData] = useState<Partial<TAllList>>({});

  // 모달이 열릴 때마다 상황 데이터로 폼 초기화
  React.useEffect(() => {
    if (isOpen && situation) {
      setFormData({
        place: situation.place,
        userRole: situation.userRole,
        aiRole: situation.aiRole,
        goal: situation.goal,
      });
    }
  }, [isOpen, situation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!situation) return;

    mutate(
      { id: situation.id, data: formData },
      {
        onSuccess: () => {
          toast.success("상황이 성공적으로 업데이트되었습니다.");
          onOpenChange(false);
          // 상황 목록 데이터 갱신
          queryClient.invalidateQueries({
            queryKey: ["getSituationsInfinite"],
          });
        },
        onError: (error) => {
          console.error("업데이트 오류:", error);
          toast.error("상황 업데이트 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>상황 편집</SheetTitle>
          <SheetDescription>
            상황의 세부 정보를 수정한 후 저장 버튼을 클릭하세요.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <label htmlFor="place" className="text-sm font-medium">
              장소
            </label>
            <Input
              id="place"
              name="place"
              value={formData.place || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="userRole" className="text-sm font-medium">
              사용자 역할
            </label>
            <Input
              id="userRole"
              name="userRole"
              value={formData.userRole || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="aiRole" className="text-sm font-medium">
              AI 역할
            </label>
            <Input
              id="aiRole"
              name="aiRole"
              value={formData.aiRole || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="goal" className="text-sm font-medium">
              목표
            </label>
            <Textarea
              id="goal"
              name="goal"
              value={formData.goal || ""}
              onChange={handleChange}
              className="w-full"
              rows={4}
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

export default EditSituationModal;
