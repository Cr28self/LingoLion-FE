import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { TRecommendationCategories } from "../reducer/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2, WandSparkles } from "lucide-react";
import { DrawerTriggerButton } from "./CustomButton";

type TAllRecommendDrawer = {
  initialData: TRecommendationCategories[] | null;
  onRecommendAll: () => void;
  isAllRec: boolean;
  isLoading: boolean;
  onFormStateChange: (
    name: keyof TRecommendationCategories,
    value: string
  ) => void;
};

const SelectCard = ({
  item,
  onSelect,
}: {
  item: TRecommendationCategories;
  onSelect: (item: TRecommendationCategories) => void;
}) => {
  return (
    <button
      className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow-lg transition-colors hover:bg-muted/40 sm:p-10"
      onClick={() => onSelect(item)} // 클릭 시 선택된 데이터 전달
    >
      <div className="flex flex-col space-y-2 text-lg text-muted-foreground">
        <p className="font-semibold text-center">
          장소 : <span className="text-card-foreground">{item.place}</span>
        </p>
        <p className="font-semibold text-center">
          AI 역할 : <span className="text-card-foreground">{item.aiRole}</span>
        </p>
        <p className="font-semibold text-center">
          사용자 역할 :{" "}
          <span className="text-card-foreground">{item.userRole}</span>
        </p>
        <p className="font-semibold text-center">
          목표 : <span className="text-card-foreground">{item.goal}</span>
        </p>
      </div>
    </button>
  );
};

const AllRecommendDrawer = ({
  onRecommendAll,
  initialData,
  isLoading,
  onFormStateChange,
}: TAllRecommendDrawer) => {
  const handleFormStateChange = (item: TRecommendationCategories) => {
    onFormStateChange("place", item.place);
    onFormStateChange("aiRole", item.aiRole);
    onFormStateChange("userRole", item.userRole);
    onFormStateChange("goal", item.goal);
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DrawerTriggerButton title="open" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex justify-between">
          <div>
            <DrawerTitle>전체 추천</DrawerTitle>
            <DrawerDescription>하나를 선택하세요</DrawerDescription>
          </div>

          <Button onClick={onRecommendAll} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <WandSparkles className="h-12 w-12" />
            )}
          </Button>
        </DrawerHeader>

        <Carousel className="w-4/5 max-w-[1200px] mx-auto">
          <CarouselContent>
            {Array.from({ length: Math.ceil(initialData!.length / 4) }).map(
              (_, index) => (
                <DrawerClose asChild key={index}>
                  <CarouselItem>
                    <div className="p-1">
                      <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6 p-2">
                        {(() => {
                          const elements = [];
                          for (let i = index * 4; i < 4 * (index + 1); i++) {
                            if (i < initialData!.length) {
                              elements.push(
                                <SelectCard
                                  item={initialData![i]}
                                  key={i}
                                  onSelect={handleFormStateChange} // 선택 핸들러 전달
                                />
                              );
                            }
                          }
                          return elements;
                        })()}
                      </div>
                    </div>
                  </CarouselItem>
                </DrawerClose>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AllRecommendDrawer;
