import React, { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import MakeConvSetupModal from "@/domains/dashboard/components/modal/MakeConvSetupModal";
import { useGetSituations } from "../api/get-situations";
import { TAllList } from "@/domains/situation-builder/reducer/types";
import DeleteConfirmDialog from "./modal/DeleteConfirmDialog";
import EditSituationModal from "./modal/EditSituationModal";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Pencil, Trash2, ArrowRight, Clock } from "lucide-react";

type SituationGridProps = {
  onMakeSuccessLink: string;
};

const SituationGrid = ({ onMakeSuccessLink }: SituationGridProps) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data } = useGetSituations({ cursor });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [situationToDelete, setSituationToDelete] = useState<number | null>(
    null
  );
  const [situationToEdit, setSituationToEdit] = useState<TAllList | null>(null);

  const situations = data?.data || [];
  const pageInfo = data?.pageInfo;

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage) {
      setCursor(pageInfo.endCursor);
    }
  };

  const handlePreviousPage = () => {
    setCursor(null); // 첫 페이지로 돌아가기
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (situationId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSituationToDelete(situationId);
    setIsDeleteDialogOpen(true);
  };

  // 편집 버튼 클릭 핸들러
  const handleEditClick = (situation: TAllList, e: React.MouseEvent) => {
    e.stopPropagation();
    setSituationToEdit(situation);
    setIsEditModalOpen(true);
  };

  // 아이콘 선택 함수
  const getIconForSituation = (situation: TAllList) => {
    const place = situation.place.toLowerCase();

    if (place.includes("헬스장") || place.includes("운동")) return "💪";
    if (place.includes("카페") || place.includes("커피")) return "☕";
    if (place.includes("식당") || place.includes("레스토랑")) return "🍽️";
    if (place.includes("학교") || place.includes("교실")) return "🏫";
    if (place.includes("병원") || place.includes("의사")) return "🏥";
    if (place.includes("공항") || place.includes("비행기")) return "✈️";
    if (place.includes("호텔") || place.includes("숙소")) return "🏨";
    if (place.includes("쇼핑") || place.includes("마트")) return "🛒";
    if (place.includes("면접") || place.includes("사무실")) return "💼";
    if (place.includes("스포츠") || place.includes("경기")) return "🏆";

    // 기본 아이콘
    return "🗣️";
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ko,
      });
    } catch (e) {
      return "날짜 정보 없음";
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">상황 목록</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="상황 검색..."
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          />
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            <option>모든 카테고리</option>
            <option>여행</option>
            <option>식당</option>
            <option>쇼핑</option>
            <option>의료</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {situations.map((situation) => (
          <div key={situation.id} className="relative group h-full">
            <MakeConvSetupModal situation={situation}>
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
            </MakeConvSetupModal>

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
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePreviousPage();
                }}
                className={!cursor ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive={!cursor}>
                1
              </PaginationLink>
            </PaginationItem>
            {cursor && (
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextPage();
                }}
                className={
                  !pageInfo?.hasNextPage ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
        situation={situationToEdit}
      />
    </div>
  );
};

export default SituationGrid;
