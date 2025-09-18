import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { loginAdmin } from "../../redux/authSlice"; // ✅ authSlice dan import

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {  token, loading, error } = useSelector((state) => state.auth);

  // Agar login muvaffaqiyatli bo‘lsa → dashboardga o‘tkazamiz
  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ username, password }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Panel
        </h2>

        {/* Error message */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Username</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Username kiriting"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 text-gray-600">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500 transition"
              placeholder="Parol kiriting"
              required
            />
            {/* Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Kirish..." : "Kirish"}
        </button>
      </form>
    </div>
  );
};

export default Login;
