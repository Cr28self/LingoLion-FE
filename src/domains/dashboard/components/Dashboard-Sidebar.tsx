import React from "react";

const DashboardSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-b from-orange-500 to-orange-600 w-64 px-4 py-6 flex flex-col shadow-xl">
      <div className="flex items-center mb-8 px-4">
        <div className="mr-2">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h2 className="text-white text-2xl font-bold">Lingo Lion</h2>
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardSidebar;
