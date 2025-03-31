import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TRecommendationCategories } from "@/domains/situation-create/reducer/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useMakeConversation } from "../../api/make-conversation";
import { useQueryClient } from "@tanstack/react-query";
type MakeConvSetupModalProps = {
  children: React.ReactNode;
  situation: TRecommendationCategories & { id: number };
};

const MakeConvSetupModal = ({
  children,
  situation,
}: MakeConvSetupModalProps) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMakeConversation();
  const queryClient = useQueryClient();
  const [difficulty, setDifficulty] = useState<"상" | "중" | "하">("중");
  const [request, setRequest] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  // 모달이 열릴 때 상황 정보를 기반으로 제목 자동 설정
  useEffect(() => {
    if (situation) {
      // 상황에 맞는 이모지 설정
      const place = situation.place.toLowerCase();
      let defaultIcon = "🗣️";

      if (place.includes("헬스장") || place.includes("운동"))
        defaultIcon = "💪";
      else if (place.includes("카페") || place.includes("커피"))
        defaultIcon = "☕";
      else if (place.includes("식당") || place.includes("레스토랑"))
        defaultIcon = "🍽️";
      else if (place.includes("학교") || place.includes("교실"))
        defaultIcon = "🏫";
      else if (place.includes("병원") || place.includes("의사"))
        defaultIcon = "🏥";
      else if (place.includes("공항") || place.includes("비행기"))
        defaultIcon = "✈️";
      else if (place.includes("호텔") || place.includes("숙소"))
        defaultIcon = "🏨";
      else if (place.includes("쇼핑") || place.includes("마트"))
        defaultIcon = "🛒";
      else if (place.includes("면접") || place.includes("사무실"))
        defaultIcon = "💼";
      else if (place.includes("스포츠") || place.includes("경기"))
        defaultIcon = "🏆";

      setIcon(defaultIcon);
    }
  }, [situation]);

  // 대화 생성 버튼 클릭 시 실행될 함수
  const handleCreateConversation = () => {
    if (!title.trim()) {
      toast.error("대화방 제목을 입력해주세요.");
      return;
    }

    mutate(
      {
        situationId: situation.id,
        title: title,
        icon,
        metaData: {
          difficulty,
          request,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllConversations"] });
          toast.success("대화방 생성 완료!!");
          navigate("/app/dashboard/conversations");
        },
        onError: () => {
          toast.error("대화방 만들기에 실패했습니다.");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>대화 설정</DialogTitle>
          <DialogDescription>
            대화의 제목, 난이도와 추가 요청사항을 설정해주세요.
          </DialogDescription>
        </DialogHeader>

        {/* 상황 정보 요약 (접혀있는 상태) */}
        <details className="mb-4 bg-orange-50 p-3 rounded-lg">
          <summary className="font-medium cursor-pointer">
            상황 정보 보기
          </summary>
          <div className="mt-2 pl-2">
            <div className="mb-2">
              <span className="font-semibold text-gray-700">장소:</span>
              <span className="ml-2 text-gray-800">{situation.place}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">사용자 역할:</span>
              <span className="ml-2 text-gray-800">{situation.userRole}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">AI 역할:</span>
              <span className="ml-2 text-gray-800">{situation.aiRole}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">목표:</span>
              <span className="ml-2 text-gray-800">{situation.goal}</span>
            </div>
          </div>
        </details>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right font-medium">
              대화방 제목
            </label>
            <Input
              id="title"
              placeholder="제목"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="icon" className="text-right font-medium">
              이모티콘
            </label>
            <Input
              id="icon"
              placeholder="이모티콘"
              className="col-span-3"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="difficulty" className="text-right font-medium">
              난이도
            </label>
            <Select
              value={difficulty}
              onValueChange={(value) =>
                setDifficulty(value as "상" | "중" | "하")
              }
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
            <label htmlFor="request" className="text-right font-medium">
              요청사항
            </label>
            <Input
              id="request"
              placeholder="부드럽게 말해주세요, 전문 용어를 섞어가며 말해주세요"
              className="col-span-3"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateConversation}
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? "생성 중..." : "대화 생성"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MakeConvSetupModal;
