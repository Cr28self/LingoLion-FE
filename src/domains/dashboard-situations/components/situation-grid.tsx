import MakeConversationSetupModal from "@/domains/dashboard-conversations/components/modal/make-conversation-setup-modal.tsx";
import DeleteConfirmDialog from "./modal/DeleteConfirmDialog";
import EditSituationModal from "./modal/EditSituationModal";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Pencil, Trash2, ArrowRight, Clock } from "lucide-react";
import { useSituationGrid } from "../hooks/use-situation-grid";
import { TSituationMode } from "@/types/api";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { Button } from "@/components/ui/button";
import { Suspense, useState } from "react";
import { SkeletonCardSitu } from "../../dashboard-common/components/contents-skeleton-loading.tsx";

type SituationGridProps = {
  mode: TSituationMode;
};

const SituationGridContents = ({ mode }: SituationGridProps) => {
  const {
    getIconForSituation,
    handleDeleteClick,
    handleEditClick,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    setIsDeleteDialogOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    isEditModalOpen,
    situationToDelete,
    situationToEdit,
    situations,
  } = useSituationGrid(mode);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string | Date) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ko,
      });
    } catch (error) {
      console.error(error);
      return "날짜 정보 없음";
    }
  };

  // situations = [ page1, page2, page3, ... ] 형태
  // 각 page는 TSituationsResponse 타입
  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div
      className="relative h-[600px] overflow-y-auto border rounded-md"
      ref={rootRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {situations.map((situation, situationIndex) => {
          const isLastItem = situationIndex === situations.length - 1;

          return (
            <div
              key={situation.id}
              className={"relative group h-full"}
              ref={isLastItem ? targetRef : null}
            >
              <MakeConversationSetupModal situation={situation}>
                <div className="relative bg-white/90 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-100 w-full text-left h-full flex flex-col cursor-pointer overflow-hidden">
                  {/* 배경 효과 - 호버 시 나타남 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* 콘텐츠 */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start mb-3">
                      <div className="text-3xl mr-4 bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {getIconForSituation(situation)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-gray-800 group-hover:text-orange-700 transition-colors duration-300 line-clamp-1">
                          {situation.place}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(situation.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent my-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="flex-1">
                      <div className="mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-sm text-gray-600 font-medium">
                          역할:
                        </span>
                        <span className="text-sm text-gray-800 ml-1">
                          {situation.userRole}
                        </span>
                      </div>
                      <div className="mb-3 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-sm text-gray-600 font-medium">
                          AI:
                        </span>
                        <span className="text-sm text-gray-800 ml-1">
                          {situation.aiRole}
                        </span>
                      </div>
                      <div className="transform group-hover:scale-[1.02] transition-transform duration-300 origin-left">
                        <p className="text-sm text-gray-700 bg-orange-50 p-2 rounded-md line-clamp-2 italic shadow-sm group-hover:bg-orange-100/70 transition-colors duration-300">
                          {situation.goal || "목표가 설정되지 않았습니다."}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md text-sm hover:from-orange-600 hover:to-orange-700 transition-colors shadow-sm flex items-center gap-2 group-hover:shadow-md transform group-hover:translate-x-0 translate-x-2 opacity-90 group-hover:opacity-100">
                        대화 생성
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </MakeConversationSetupModal>

              {/* 액션 버튼 그룹 - 호버 시 표시 */}
              <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-20">
                {/* 편집 버튼 */}
                <button
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors"
                  onClick={(e) => handleEditClick(situation, e)}
                  aria-label="편집"
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </button>

                {/* 삭제 버튼 */}
                <button
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                  onClick={(e) => handleDeleteClick(situation.id, e)}
                  aria-label="삭제"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 삭제 확인 다이얼로그 컴포넌트 */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        situationId={situationToDelete}
      />

      {/* 편집 모달 컴포넌트 */}
      <EditSituationModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        situation={situationToEdit!}
      />
    </div>
  );
};

const SituationGrid = () => {
  const [state, setState] = useState<"all" | "my">("all");

  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <div className="p-1 bg-gray-100/80 rounded-lg">
          <div className="flex items-center space-x-1">
            <Button
              variant={state === "all" ? "default" : "ghost"}
              onClick={() => setState("all")}
              className={`
              relative px-6 py-2 transition-all duration-200
              ${
                state === "all"
                  ? "bg-white text-orange-600 shadow-sm hover:bg-white/90"
                  : "hover:bg-white/50 text-gray-600"
              }
            `}
            >
              <span className="font-medium">전체 상황 목록</span>
              {state === "all" && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-400"></span>
                </span>
              )}
            </Button>
            <Button
              variant={state === "my" ? "default" : "ghost"}
              onClick={() => setState("my")}
              className={`
              relative px-6 py-2 transition-all duration-200
              ${
                state === "my"
                  ? "bg-white text-orange-600 shadow-sm hover:bg-white/90"
                  : "hover:bg-white/50 text-gray-600"
              }
            `}
            >
              <span className="font-medium">내 상황 목록</span>
              {state === "my" && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-400"></span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Suspense fallback={<SkeletonCardSitu />}>
        {state === "all" && <SituationGridContents mode="all" />}
        {state === "my" && <SituationGridContents mode="my" />}
      </Suspense>
    </div>
  );
};

export default SituationGrid;
