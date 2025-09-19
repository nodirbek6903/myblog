// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const secretPassed = localStorage.getItem("secretPassed");

  useEffect(() => {
    // Simulyatsiya: tekshiruv biroz vaqt oladi (masalan API chaqirish)
    setTimeout(() => {
      setChecking(false);
    }, 300); // 0.3 soniya
  }, []);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Yuklanmoqda...</p>
      </div>
    );
  }

  // Agar secret yoki token yo'q bo'lsa, secret sahifasiga yuboramiz
  if (!secretPassed) {
    return <Navigate to="/secret" state={{ from: location }} replace />;
  }

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Ichki sahifani render qiladi
};

export default ProtectedRoute;
