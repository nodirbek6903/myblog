import { useNavigate } from "react-router-dom";
import {logout} from "../../redux/authSlice"
import {useDispatch} from "react-redux"

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Chiqish
        </button>
      </header>

      <main className="p-6">
        <p className="text-gray-700 text-lg">
          Salom, <span className="font-semibold">Admin</span>!
        </p>
        <p className="text-gray-500 mt-2">
          Bu yerda siz blog postlarini, portfolio va boshqa ma'lumotlarni
          boshqarishingiz mumkin.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
