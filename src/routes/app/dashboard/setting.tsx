import DashboardLayout from '@/components/layout/dashboard-layout';

import SettingContents from '@/domains/dashboard-setting/components/SettingContents';

const DashboardSettingRoute = () => {
  return (
    <DashboardLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            설정 <span className="text-orange-500">Settings</span>
          </h1>
          <p className="mt-1 text-gray-500">계정 및 앱 설정을 관리하세요.</p>
        </div>
      </header>

      {/* Settings Content */}
      <SettingContents />
    </DashboardLayout>
  );
};

export default DashboardSettingRoute;
