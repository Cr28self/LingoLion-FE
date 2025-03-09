import React from "react";

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
const SituationGrid = () => {
  const { data } = useGetSituations();
  console.log(data);
  const situations = [
    {
      id: 1,
      title: "공항 체크인",
      level: "초급",
      category: "여행",
    },
    {
      id: 2,
      title: "레스토랑 주문",
      level: "초급",
      category: "식당",
    },
    {
      id: 3,
      title: "호텔 체크인",
      level: "초급",
      category: "여행",
    },
    {
      id: 4,
      title: "길 찾기",
      level: "중급",
      category: "여행",
    },
    {
      id: 5,
      title: "쇼핑하기",
      level: "중급",
      category: "쇼핑",
    },
    {
      id: 6,
      title: "병원 방문",
      level: "고급",
      category: "의료",
    },
  ];
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
        {situations.map((situation) => (
          <>
            <MakeConvSetupModal>
              <button
                key={situation.id}
                className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-orange-100"
              >
                <h3 className="font-medium text-lg text-gray-800">
                  {situation.title}
                </h3>
                <div className="flex mt-2 space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">
                    {situation.level}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    {situation.category}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
                    시작하기
                  </button>
                </div>
              </button>
            </MakeConvSetupModal>
          </>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default SituationGrid;
