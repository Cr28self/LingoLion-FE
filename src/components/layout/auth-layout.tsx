import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
