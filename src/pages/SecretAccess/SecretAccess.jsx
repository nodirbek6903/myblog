import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SecretAccess = () => {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCheck = (e) => {
    e.preventDefault();

    // Bu parolni .env faylda saqlash mumkin
    const correctSecret =  import.meta.env.VITE_SECRET_KEY

    if (secret === correctSecret) {
      localStorage.setItem("secretPassed", "true");
      navigate("/admin/login");
    } else {
      setError("Xato maxfiy kod!");
    //   navigate("/")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Maxfiy kirish
        </h2>
        <form onSubmit={handleCheck} className="space-y-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Maxfiy kodni kiriting"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-yellow-400"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition"
          >
            Davom etish
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecretAccess;
