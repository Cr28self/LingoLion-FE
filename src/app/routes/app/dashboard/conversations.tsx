import DashboardLayout from "@/components/layout/dashboard-layout";
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
import { useGetAllConversations } from "@/domains/dashboard/api/get-all-conversations";
import { formatDate } from "@/lib/utils";

const DashboardConversationsRoute = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const { data } = useGetAllConversations({ cursor });

  const conversations = data?.data || [];
  const pageInfo = data?.pageInfo;

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage) {
      setCursor(pageInfo.endCursor);
    }
  };

  const handlePreviousPage = () => {
    setCursor(null); // 첫 페이지로 돌아가기
  };

  return (
    <DashboardLayout>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            회화 목록 <span className="text-orange-500">Conversations</span>
          </h1>
          <p className="text-gray-500 mt-1">
            모든 회화 기록을 확인하고 관리하세요.
          </p>
        </div>
      </header>

      {/* Conversations Content */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            최근 회화 기록
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="회화 검색..."
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            />
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option>모든 날짜</option>
              <option>최근 7일</option>
              <option>최근 30일</option>
            </select>
          </div>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-orange-100 flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">
                    {conversation.icon || "💬"}
                  </span>
                  <div>
                    <h3 className="font-medium text-lg text-gray-800">
                      {conversation.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(conversation.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">
                    회화
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                    {conversation.id}번
                  </span>
                </div>
                <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
                  계속하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
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
                    !pageInfo?.hasNextPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardConversationsRoute;
