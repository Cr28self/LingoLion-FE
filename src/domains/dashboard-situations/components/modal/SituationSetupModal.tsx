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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SituationSetupModalProps = {
  onNextLink: string;
};

const SituationSetupModal = ({ onNextLink }: SituationSetupModalProps) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  // 엔터 키를 눌렀을 때 실행될 함수
  const handleSubmit = () => {
    navigate(onNextLink, { state: { metaData: input } });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>시나리오 생성</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>추천 정보 입력</DialogTitle>
          <DialogDescription>
            상황 생성을 위해서 ai에게 도움이 될만한 추천 정보를 입력해주세요
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="달리기"
              className="col-span-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            제출
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SituationSetupModal;
