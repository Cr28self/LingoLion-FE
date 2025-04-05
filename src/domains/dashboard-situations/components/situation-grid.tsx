import MakeConversationSetupModal from '@/domains/dashboard-conversations/components/modal/make-conversation-setup-modal.tsx';
import DeleteConfirmDialog from './modal/delete-confirm-dialog.tsx';
import EditSituationModal from './modal/edit-situation-modal.tsx';
import { Pencil, Trash2, ArrowRight, Clock } from 'lucide-react';
import { useSituationGrid } from '../hooks/use-situation-grid';
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import { Button } from '@/components/ui/button';
import { Suspense, useState } from 'react';
import { SkeletonCardSitu } from '../../dashboard-common/components/contents-skeleton-loading.tsx';
import { getDaysAgo } from '@/lib/utils.ts';
import { TSituationMode } from '@/types/situation.ts';

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

  // situations = [ page1, page2, page3, ... ] 형태
  // 각 page는 TSituationsResponse 타입
  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div
      className="relative h-[600px] overflow-y-auto rounded-md border"
      ref={rootRef}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {situations.map((situation, situationIndex) => {
          const isLastItem = situationIndex === situations.length - 1;

          return (
            <div
              key={situation.id}
              className={'group relative h-full'}
              ref={isLastItem ? targetRef : null}
            >
              <MakeConversationSetupModal situation={situation}>
                <div className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-orange-100 bg-white/90 p-5 text-left shadow-sm transition-all duration-300 hover:shadow-lg">
                  {/* 배경 효과 - 호버 시 나타남 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  {/* 콘텐츠 */}
                  <div className="relative z-10 flex flex-1 flex-col">
                    <div className="mb-3 flex items-start">
                      <div className="mr-4 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                        {getIconForSituation(situation)}
                      </div>
                      <div className="flex-1">
                        <h3 className="line-clamp-1 text-lg font-medium text-gray-800 transition-colors duration-300 group-hover:text-orange-700">
                          {situation.place}
                        </h3>
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3" />
                          {getDaysAgo(situation.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* 구분선 */}
                    <div className="my-3 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <div className="flex-1">
                      <div className="mb-2 transition-transform duration-300 group-hover:translate-x-1">
                        <span className="text-sm font-medium text-gray-600">
                          역할:
                        </span>
                        <span className="ml-1 text-sm text-gray-800">
                          {situation.userRole}
                        </span>
                      </div>
                      <div className="mb-3 transition-transform duration-300 group-hover:translate-x-1">
                        <span className="text-sm font-medium text-gray-600">
                          AI:
                        </span>
                        <span className="ml-1 text-sm text-gray-800">
                          {situation.aiRole}
                        </span>
                      </div>
                      <div className="origin-left transform transition-transform duration-300 group-hover:scale-[1.02]">
                        <p className="line-clamp-2 rounded-md bg-orange-50 p-2 text-sm italic text-gray-700 shadow-sm transition-colors duration-300 group-hover:bg-orange-100/70">
                          {situation.goal || '목표가 설정되지 않았습니다.'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <span className="flex translate-x-2 transform items-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm text-white opacity-90 shadow-sm transition-colors hover:from-orange-600 hover:to-orange-700 group-hover:translate-x-0 group-hover:opacity-100 group-hover:shadow-md">
                        대화 생성
                        <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </MakeConversationSetupModal>

              {/* 액션 버튼 그룹 - 호버 시 표시 */}
              <div className="absolute right-3 top-3 z-20 flex translate-y-1 transform space-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {/* 편집 버튼 */}
                <button
                  className="rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-blue-50"
                  onClick={(e) => handleEditClick(situation, e)}
                  aria-label="편집"
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </button>

                {/* 삭제 버튼 */}
                <button
                  className="rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-red-50"
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
  const [state, setState] = useState<TSituationMode>('all');

  return (
    <div className="rounded-xl border border-white/50 bg-white/70 p-6 shadow-sm backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-lg bg-gray-100/80 p-1">
          <div className="flex items-center space-x-1">
            <Button
              variant={state === 'all' ? 'default' : 'ghost'}
              onClick={() => setState('all')}
              className={`relative px-6 py-2 transition-all duration-200 ${
                state === 'all'
                  ? 'bg-white text-orange-600 shadow-sm hover:bg-white/90'
                  : 'text-gray-600 hover:bg-white/50'
              } `}
            >
              <span className="font-medium">전체 상황 목록</span>
              {state === 'all' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-200 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-orange-400"></span>
                </span>
              )}
            </Button>
            <Button
              variant={state === 'my' ? 'default' : 'ghost'}
              onClick={() => setState('my')}
              className={`relative px-6 py-2 transition-all duration-200 ${
                state === 'my'
                  ? 'bg-white text-orange-600 shadow-sm hover:bg-white/90'
                  : 'text-gray-600 hover:bg-white/50'
              } `}
            >
              <span className="font-medium">내 상황 목록</span>
              {state === 'my' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-200 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-orange-400"></span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Suspense fallback={<SkeletonCardSitu />}>
        {state === 'all' && <SituationGridContents mode="all" />}
        {state === 'my' && <SituationGridContents mode="my" />}
      </Suspense>
    </div>
  );
};

export default SituationGrid;
