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
        <div className="min-h-[100vh] p-4 flex items-center justify-center bg-gray-100">
            <div className="p-6 flex flex-col items-start gap-4 bg-emerald-200 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-emerald-900 w-full">Login to Your Account</h1>
                {welcomeBack && (
                    <div className="text-green-800 text-xl font-semibold w-full text-center">
                       Welcome Back!
                    </div>
                )}

                <div className="flex flex-col w-full">
                    <label className="text-gray-700 mb-1" htmlFor="user-email">
                        Email:
                    </label>
                    <input
                        id="user-email"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 text-indigo-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-gray-700 mb-1" htmlFor="user-password">
                        Password:
                    </label>
                    <input
                        id="user-password"
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md py-2 px-3 text-indigo-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div className="flex flex-col gap-3 items-center self-stretch mt-4">
                    <button
                        type="button"
                        className="w-full py-2 rounded-lg text-xl bg-green-700 text-white cursor-pointer flex items-center justify-center disabled:opacity-50"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex gap-2 items-center">
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

                    <p className="text-center text-gray-800">
                        <span>Don't have an account? </span>
                        <Link to="/signup" className="text-blue-600 underline">
                            Signup here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { LoginPage };
