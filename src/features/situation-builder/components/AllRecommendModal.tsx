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

import { TAllList } from "../reducer/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2, WandSparkles } from "lucide-react";

type TAllRecommendDrawer = {
  initialData: TAllList[] | null;
  onRecommendAll: () => void;
  isAllRec: boolean;
  isLoading: boolean;
};

const SelectCard = ({ item }: { item: TAllList }) => {
  return (
    <button className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow-lg transition-colors hover:bg-muted/40 sm:p-10">
      <div className="flex flex-col  space-y-2 text-lg text-muted-foreground">
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
}: TAllRecommendDrawer) => {
  console.log("initialData", initialData);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex justify-between">
          <div>
            <DrawerTitle>전체 추천</DrawerTitle>
            <DrawerDescription>하나를 선택하세요</DrawerDescription>
          </div>

          <Button onClick={onRecommendAll} disabled={isLoading}>
            {isLoading ? (
              // lucide-react spinner
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <WandSparkles className="h-12 w-12" />
            )}
          </Button>
        </DrawerHeader>

        {/* initialData가 추가됨 */}
        <Carousel className="w-4/5 max-w-[1200px] mx-auto">
          <CarouselContent>
            {Array.from({ length: initialData!.length / 4 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6 p-2">
                    {(() => {
                      const elements = [];

                      for (let i = index * 4; i < 4 * (index + 1); i++) {
                        elements.push(
                          <SelectCard item={initialData![i]} key={i} />
                        );
                      }
                      return elements;
                    })()}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <DrawerFooter>
          {/* <button type="button">
            <Button>Submit</Button>
          </button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AllRecommendDrawer;
