import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Info, Mail, LogOut } from "lucide-react";
import {logout} from "../../redux/authSlice"
import {useDispatch} from "react-redux"

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  };

  return (
    <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col">

      {/* Logo */}
      <div className="p-5 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <FileText size={20} /> Bloglar
        </NavLink>

        <NavLink
          to="/admin/portfolio"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <Briefcase size={20} /> Portfolio
        </NavLink>

        <NavLink
          to="/admin/about"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <Info size={20} /> About
        </NavLink>

        <NavLink
          to="/admin/messages"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          <Mail size={20} /> Xabarlar
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center cursor-pointer gap-3 px-4 py-3 border-t border-gray-700 hover:bg-red-600 transition"
      >
        <LogOut size={20} /> Chiqish
      </button>
    </div>
  );
};

export default Sidebar;
