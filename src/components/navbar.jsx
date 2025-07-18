import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const Navbar = () => {
  const { user = {} } = useAppContext();
  const navigate = useNavigate();

  const { isAuthenticated } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      SuccessToast("Logout successful!");
      window.location.reload();
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  const handleOpenProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div className="p-6 flex items-center justify-between bg-cyan-500">
      <div className="flex items-center gap-2">
        {/* Logo Placeholder */}
        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center font-bold text-cyan-600">
          🧠
        </div>
        <div className="font-bold text-lg text-white">Multi-Persona ChatBot</div>
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className="py-1 px-3 border border-blue-600 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-600 hover:text-white transition-all font-medium"
        >
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="py-1 px-3 text-blue-700 font-medium hover:text-white hover:bg-blue-500 rounded-md transition-all"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="py-1 px-3 text-blue-700 font-medium hover:text-white hover:bg-blue-500 rounded-md transition-all"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="py-1 px-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-700 transition-all"
            >
              Logout
            </button>
            <div
              onClick={handleOpenProfilePage}
              className="h-10 w-10 rounded-full bg-indigo-900 text-amber-100 text-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              title="Profile"
            >
              {user?.email?.substr(0, 1)?.toUpperCase()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Navbar };
