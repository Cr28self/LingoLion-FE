import { useState } from "react";
// lucide-react 아이콘 라이브러리 사용 (설치 필요)
import {
  Home,
  MessagesSquare,
  FileText,
  Settings,
  LogOut,
  PlusCircle,
  ArrowRight,
  Clock,
  UserCircle,
  GraduationCap,
  Store,
  Trophy,
  Users,
  Sparkles, // 탭 활성 표시
  Target, // 목표 아이콘
} from "lucide-react";

// --- Mock Data (Lucide 아이콘 사용) ---
const mockSituations = [
  {
    id: 1,
    icon: Store, // BuildingStorefrontIcon -> Store
    title: "맥도날드 매장",
    timeAgo: "약 7시간 전",
    userRole: "고객",
    aiRole: "주문 도우미",
    goal: "메뉴 주문하기",
    iconBgColor: "bg-red-100",
    iconTextColor: "text-red-600",
  },
  {
    id: 2,
    icon: Trophy, // TrophyIcon -> Trophy
    title: "첼시의 축구 경기장",
    timeAgo: "약 7시간 전",
    userRole: "첼시 팬",
    aiRole: "축구 전문가",
    goal: "최근 경기 분석 및 선수들 퍼포먼스 논의",
    iconBgColor: "bg-blue-100",
    iconTextColor: "text-blue-600",
  },
  {
    id: 3,
    icon: UserCircle, // 커피 아이콘 대체 -> UserCircle (임시) 또는 다른 아이콘
    title: "카페",
    timeAgo: "2일 전",
    userRole: "고객",
    aiRole: "바리스타",
    goal: "최신 메뉴 추천받기",
    iconBgColor: "bg-yellow-100",
    iconTextColor: "text-yellow-700",
  },
  {
    id: 4,
    icon: Users, // 친구 아이콘 대체 -> Users
    title: "친구집",
    timeAgo: "2일 전",
    userRole: "나",
    aiRole: "친구",
    goal: "친구와 친해지기, 사소한 대화",
    iconBgColor: "bg-green-100",
    iconTextColor: "text-green-600",
  },
  {
    id: 5,
    icon: GraduationCap, // AcademicCapIcon -> GraduationCap
    title: "도서관",
    timeAgo: "5일 전",
    userRole: "학생",
    aiRole: "멘토",
    goal: "자소서 작성에 필요한 참고 자료 찾기",
    iconBgColor: "bg-indigo-100",
    iconTextColor: "text-indigo-600",
  },
  {
    id: 6,
    icon: UserCircle, // 커피 아이콘 대체 -> UserCircle (임시)
    title: "카페",
    timeAgo: "17일 전",
    userRole: "친구",
    aiRole: "바리스타",
    goal: "커피 추천과 주문하기",
    iconBgColor: "bg-purple-100",
    iconTextColor: "text-purple-600",
  },
];

// --- Sidebar Component (색상 및 스타일 조정) ---
const Sidebar = ({ activeItem, setActiveItem }) => {
  const navItems = [
    { name: "Overview", icon: Home },
    { name: "회화 목록", icon: MessagesSquare },
    { name: "상황 목록", icon: FileText },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-gray-300 flex flex-col fixed top-0 left-0 shadow-2xl">
      {/* Logo */}
      <div className="p-6 flex items-center justify-center space-x-2 border-b border-slate-700/50">
        {/* 로고 이미지 또는 텍스트 */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201589.png"
          alt="Lingo Lion Logo"
          className="w-8 h-8"
        />
        <span className="text-xl font-bold text-white">Lingo Lion</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={`w-full flex items-center px-4 py-3 rounded-md transition duration-200 ease-in-out relative group ${
              activeItem === item.name
                ? "bg-orange-500/10 text-orange-400 font-medium" // 활성 상태
                : "hover:bg-slate-700/50 hover:text-white" // 호버 상태
            }`}
          >
            {/* 활성 상태 표시 바 */}
            {activeItem === item.name && (
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-6 w-1 bg-orange-400 rounded-r-full"></span>
            )}
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center mb-4">
          <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center mr-3 ring-1 ring-slate-600">
            <span className="text-orange-700 font-bold text-sm">오</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-white">오상현</p>
            <p className="text-xs text-gray-400">oth3262@naver.com</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-md transition duration-200 text-sm hover:text-white">
          <LogOut className="w-4 h-4 mr-2" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

// --- Dashboard Content Component (UI 개선) ---
const DashboardContent = ({ situations }) => {
  const [activeTab, setActiveTab] = useState("전체 상황 목록");

  return (
    <div className="ml-64 p-8 md:p-10 min-h-screen bg-gradient-to-br from-orange-50/50 via-red-50/50 to-yellow-50/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
            상황 목록{" "}
            <span className="font-light text-gray-500">Situations</span>
          </h1>
          <p className="text-base text-gray-600">
            다양한 상황별 회화 연습을 시작하세요.
          </p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105">
          <PlusCircle className="w-5 h-5 mr-2" />
          상황 생성
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex space-x-1 bg-gray-100 rounded-lg p-1 max-w-md">
        {["전체 상황 목록", "내 상황 목록"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center justify-center space-x-1 ${
              activeTab === tab
                ? "bg-white text-orange-600 shadow-sm" // 활성 탭
                : "text-gray-500 hover:text-gray-700" // 비활성 탭
            }`}
          >
            {activeTab === tab && (
              <Sparkles size={16} className="text-orange-400" />
            )}
            <span>{tab}</span>
          </button>
        ))}
      </div>

      {/* Situation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {situations.map((situation) => (
          <div
            key={situation.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
          >
            {/* Card Header - Icon & Title */}
            <div className="p-5 flex items-center space-x-4 border-b border-gray-100">
              <div
                className={`w-12 h-12 rounded-full ${situation.iconBgColor} flex items-center justify-center flex-shrink-0`}
              >
                <situation.icon
                  className={`w-6 h-6 ${situation.iconTextColor}`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {situation.title}
                </h3>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <Clock size={12} className="mr-1" />
                  {situation.timeAgo}
                </p>
              </div>
            </div>

            {/* Card Body - Roles & Goal */}
            <div className="p-5 space-y-3 text-sm flex-grow">
              <div className="flex items-start">
                <span className="font-medium text-gray-500 w-14 inline-block flex-shrink-0">
                  역할:
                </span>
                <span className="text-gray-700">{situation.userRole}</span>
              </div>
              <div className="flex items-start">
                <span className="font-medium text-gray-500 w-14 inline-block flex-shrink-0">
                  AI:
                </span>
                <span className="text-gray-700">{situation.aiRole}</span>
              </div>
              <div className="flex items-start pt-2 border-t border-gray-100 mt-3">
                <Target
                  size={16}
                  className="mr-2 mt-0.5 text-orange-500 flex-shrink-0 w-14 text-left pl-[1px]"
                />{" "}
                {/* 아이콘으로 목표 구분 */}
                <span className="text-gray-700">{situation.goal}</span>
              </div>
            </div>

            {/* Card Footer - Action Button */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-[2px] mt-auto rounded-b-xl">
              <button className="w-full bg-white text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 px-5 py-3 text-sm font-bold hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 hover:text-orange-700 transition duration-300 group rounded-b-[11px] flex items-center justify-center">
                대화 시작
                <ArrowRight
                  size={16}
                  className="ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---
const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState("상황 목록");

  return (
    <div className="flex bg-gray-50">
      {" "}
      {/* 전체 앱 배경 약간 조정 */}
      <Sidebar activeItem={activeNavItem} setActiveItem={setActiveNavItem} />
      <main className="flex-1">
        {" "}
        {/* 메인 컨텐츠 영역 */}
        <DashboardContent situations={mockSituations} />
      </main>
      {/* 오른쪽 하단 꾸미기 요소 (선택적) */}
      {/* <div className="fixed bottom-6 right-6 w-16 h-16 opacity-80 z-10"> */}
      {/* 새로운 아이콘 또는 이미지 */}
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
