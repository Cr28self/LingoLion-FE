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
import { TAllList } from "@/domains/situation-builder/reducer/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMakeConversation } from "../api/make-conversation";
import { toast } from "sonner";

type MakeConvSetupModalProps = {
  children: React.ReactNode;
  situation: TAllList & { id: number };
};

const MakeConvSetupModal = ({
  children,
  situation,
}: MakeConvSetupModalProps) => {
  const navigate = useNavigate();
  const { mutate } = useMakeConversation();
  const [step, setStep] = useState(1); // 1: 상황 정보, 2: 난이도 및 요청사항
  const [difficulty, setDifficulty] = useState<"상" | "중" | "하">("중");
  const [request, setRequest] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  // 대화 생성 버튼 클릭 시 실행될 함수
  const handleCreateConversation = () => {
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
        {step === 1 && situation && (
          <>
            <DialogHeader>
              <DialogTitle>상황 정보</DialogTitle>
              <DialogDescription>
                선택하신 상황에 대한 정보입니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="mb-3">
                  <span className="font-semibold text-gray-700">장소:</span>
                  <span className="ml-2 text-gray-800">{situation.place}</span>
                </div>
                <div className="mb-3">
                  <span className="font-semibold text-gray-700">
                    사용자 역할:
                  </span>
                  <span className="ml-2 text-gray-800">
                    {situation.userRole}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="font-semibold text-gray-700">AI 역할:</span>
                  <span className="ml-2 text-gray-800">{situation.aiRole}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">목표:</span>
                  <span className="ml-2 text-gray-800">{situation.goal}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => setStep(2)}>
                다음
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>대화 설정</DialogTitle>
              <DialogDescription>
                대화의 난이도와 추가 요청사항을 설정해주세요.
              </DialogDescription>
            </DialogHeader>
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
                  placeholder="제목"
                  className="col-span-3"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="difficulty" className="text-right font-medium">
                  난이도
                </label>
                <Select value={difficulty} onValueChange={setDifficulty}>
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
                variant="outline"
                onClick={() => setStep(1)}
                className="mr-2"
              >
                이전
              </Button>
              <Button type="button" onClick={handleCreateConversation}>
                대화 생성
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MakeConvSetupModal;
