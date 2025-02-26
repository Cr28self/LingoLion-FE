import { useAuth } from "@/lib/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";

// ! 인증이 필요없는 페이지의 최상단 레이아웃
const PublicLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

export default PublicLayout;
