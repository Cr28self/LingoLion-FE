import { useAuth } from "@/lib/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/loading";

// ! 인증이 필요없는 페이지의 최상단 레이아웃
const PublicLayout = () => {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return <Loading />; // ✅ refreshToken이 완료될 때까지 UI 변경 X
  }

  if (isAuthenticated) return <Navigate to="/app/dashboard" replace />;
  return <Outlet />;
};

export default PublicLayout;
