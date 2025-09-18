import Sidebar from "../components/UI/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
