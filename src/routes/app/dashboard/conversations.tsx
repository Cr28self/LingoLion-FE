import DashboardLayout from "@/components/layout/dashboard-layout";
import { SkeletonCardConv } from "@/domains/dashboard-common/components/contents-skeleton-loading";
import ConversationGrid from "@/domains/dashboard-conversations/components/conversation-grid";

import { Suspense } from "react";

const DashboardConversationsRoute = () => {
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
          <h2 className="text-xl font-semibold text-gray-800">회화 목록</h2>
        </div>

        <Suspense fallback={<SkeletonCardConv />}>
          <ConversationGrid />
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default DashboardConversationsRoute;
