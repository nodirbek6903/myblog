import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Sahifa topilmadi</h2>
      <p className="text-gray-600 mt-2">
        Kechirasiz, siz izlayotgan sahifa mavjud emas yoki o‘chirilgan bo‘lishi mumkin.
      </p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        <FaArrowLeft /> Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
