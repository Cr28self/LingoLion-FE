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
import MakeConvSetupModal from "@/domains/dashboard/components/MakeConvSetupModal";
import { useGetSituations } from "../api/get-situations";
import { TAllList } from "@/domains/situation-builder/reducer/types";

type MappedSituation = {
  id: number;
  title: string;
  level: string;
  category: string;
};
type SituationGridProps = {
  onMakeSuccessLink: string;
};

const SituationGrid = ({ onMakeSuccessLink }: SituationGridProps) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data } = useGetSituations({ cursor });

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

  // 상황 데이터 매핑 함수
  const mapSituationData = (situation: TAllList): MappedSituation => {
    return {
      id: situation.id,
      title: situation.place,
      level: situation.goal ? "중급" : "초급", // 예시로 goal 유무에 따라 레벨 설정
      category: situation.aiRole?.split(":")[0] || "기타", // aiRole에서 첫 부분을 카테고리로 사용
    };
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {situations.map((situation) => {
          const mappedSituation = mapSituationData(situation);
          return (
            <MakeConvSetupModal key={situation.id} situation={situation}>
              <button className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-orange-100 w-full text-left">
                <h3 className="font-medium text-lg text-gray-800">
                  {mappedSituation.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {situation.goal}
                </p>
                <div className="flex mt-2 space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">
                    {mappedSituation.level}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    {mappedSituation.category}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
                    시작하기
                  </span>
                </div>
              </button>
            </MakeConvSetupModal>
          );
        })}
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
    </div>
  );
};

export default SituationGrid;
