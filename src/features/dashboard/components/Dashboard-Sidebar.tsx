import React from "react";

const DashboardSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-orange-400 w-64 px-4 py-6 flex flex-col">
      <h2 className="text-white text-2xl font-bold px-4 mb-8">Dashboard</h2>
      {children}
    </div>
  );
};

export default DashboardSidebar;
