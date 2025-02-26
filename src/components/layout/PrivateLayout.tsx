import { useAuth } from "@/lib/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";

// ! 인증이 필요한 페이지의 최상단 레이아웃
const PrivateLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === false) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
};

export default PrivateLayout;
