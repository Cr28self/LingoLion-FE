import DashboardLayout from "@/components/layout/dashboard-layout";

import SettingContents from "@/domains/dashboard/components/SettingContents";
import { useState } from "react";

const DashboardSettingRoute = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            설정 <span className="text-orange-500">Settings</span>
          </h1>
          <p className="text-gray-500 mt-1">계정 및 앱 설정을 관리하세요.</p>
        </div>
      </header>

      {/* Settings Content */}
      <SettingContents activeTab={activeTab} setActiveTab={setActiveTab} />
    </DashboardLayout>
  );
};

export default DashboardSettingRoute;
