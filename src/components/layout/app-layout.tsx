import { Outlet } from "react-router-dom";

// ! Landing 페이지 레이아웃
const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
