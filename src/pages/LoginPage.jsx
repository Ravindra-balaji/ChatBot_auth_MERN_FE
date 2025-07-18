import { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [welcomeBack, setWelcomeBack] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            ErrorToast("Email & password are required!");
            return;
        }

        setLoading(true);
        try {
            const dataObj = { email, password };
            const result = await axiosInstance.post("/auth/login", dataObj);

            if (result.status === 200) {
                setWelcomeBack(true);
                SuccessToast("Welcome Back!");
                setTimeout(() => {
                    window.open("/", "_self");
                }, 1500);
            } else {
                ErrorToast(result.data.message);
            }
        } catch (err) {
            ErrorToast(`Cannot login: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-6">Welcome!</h1>

                {welcomeBack && (
                    <div className="text-green-600 text-lg font-semibold text-center mb-4">
                        You're now logged in!
                    </div>
                )}

                <div className="mb-4">
                    <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="user-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="user-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="user-password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>

                <button
                    type="button"
                    className="w-full bg-purple-700 text-white py-2 rounded-lg text-lg font-semibold hover:bg-purple-800 transition-colors disabled:opacity-50 flex justify-center items-center"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                />
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        "Login"
                    )}
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?
                    <Link to="/signup" className="text-purple-600 hover:underline ml-1">
                        Signup here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export { LoginPage };
