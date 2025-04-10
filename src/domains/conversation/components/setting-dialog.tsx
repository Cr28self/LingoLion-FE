import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type SettingDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const SettingDialog = ({ isOpen, onOpenChange }: SettingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>대화방 설정</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          대화방의 설정을 변경할 수 있습니다.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              목소리
            </Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="목소리 및 발음 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">여자 (영국식)</SelectItem>
                  <SelectItem value="banana">여자 (미국식)</SelectItem>
                  <SelectItem value="blueberry">남자 (영국식)</SelectItem>
                  <SelectItem value="grapes">남자 (미국식)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audio" className="text-right">
              오디오
            </Label>
            <Switch id="audio" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
