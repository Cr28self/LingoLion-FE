import { useState } from "react";
import { useGetUsersMy } from "../api/get-users-my";

const settingTabs = [
  { id: "profile", label: "프로필" },
  { id: "account", label: "계정" },
  { id: "notifications", label: "알림" },
  { id: "privacy", label: "개인정보" },
];

const SettingContents = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { data: userData } = useGetUsersMy();
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {settingTabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab.id
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-2xl font-bold">
              {userData.name.slice(0, 2)}
            </div>
            <div className="ml-6">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
                프로필 사진 변경
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={userData.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={userData.email}
                disabled
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
              변경사항 저장
            </button>
          </div>
        </div>
      )}

      {activeTab === "account" && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">계정 설정</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                비밀번호 변경
              </h4>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                placeholder="현재 비밀번호"
              />
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                placeholder="새 비밀번호"
              />
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="새 비밀번호 확인"
              />
            </div>
            <div className="pt-2">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                비밀번호 변경
              </button>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              계정 삭제
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
              되돌릴 수 없습니다.
            </p>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
              계정 삭제
            </button>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">알림 설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  이메일 알림
                </h4>
                <p className="text-xs text-gray-500">
                  학습 알림 및 업데이트를 이메일로 받기
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  학습 리마인더
                </h4>
                <p className="text-xs text-gray-500">
                  정기적인 학습 리마인더 받기
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  마케팅 알림
                </h4>
                <p className="text-xs text-gray-500">
                  새로운 기능 및 프로모션 정보 받기
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">개인정보 설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  데이터 공유
                </h4>
                <p className="text-xs text-gray-500">
                  학습 데이터를 서비스 개선에 활용
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700">쿠키 설정</h4>
                <p className="text-xs text-gray-500">
                  필수적이지 않은 쿠키 허용
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
          <div className="pt-4">
            <button className="text-sm text-orange-500 hover:text-orange-600">
              개인정보 처리방침 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingContents;
