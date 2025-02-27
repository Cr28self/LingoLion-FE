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
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SituationSetupModal = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {/* <Link to="/app/situation/new">시나리오 생성</Link> */}
          시나리오 생성
        </Button>
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              navigate("/app/situation/new", { state: { setupData: input } });
            }}
          >
            제출
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SituationSetupModal;
