import { useState } from "react";
import { useGetSituations } from "../api/get-situations";
import { TAllList } from "@/domains/situation-builder/reducer/types";

export function useSituationGrid() {
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

  return {
    situations,
    isDeleteDialogOpen,
    isEditModalOpen,
    situationToDelete,
    situationToEdit,
    cursor,
    pageInfo,
    setIsDeleteDialogOpen,
    setIsEditModalOpen,
    handleDeleteClick,
    handleEditClick,
    getIconForSituation,
    handleNextPage,
    handlePreviousPage,
  };
}
