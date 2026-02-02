import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="min-h-screen flex items-center justify-center
    bg-[#f3f4f6] dark:bg-gray-900
    bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]
    dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]
    [background-size:20px_20px]
    transition-colors">



            {/* Card */}
            <div className="w-full max-w-md rounded-md px-8 py-10 shadow-xl
                bg-white dark:bg-slate-800
                text-gray-800 dark:text-gray-100">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/images/logo.png"
                        alt="Alembic"
                        className="h-14 object-contain"
                    />
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-medium mb-6
                    text-blue-800 dark:text-white">
                    Sign In
                </h2>

                {/* Username */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full rounded px-4 py-2 text-sm 
                            bg-blue-50 dark:bg-slate-700
                            border border-gray-200 dark:border-slate-600
                            text-gray-800 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-400
                            focus:outline-none focus:ring-2
                            focus:ring-blue-800 dark:focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded px-4 py-2 text-sm 
                            bg-blue-50 dark:bg-slate-700
                            border border-gray-200 dark:border-slate-600
                            text-gray-800 dark:text-gray-100
                            placeholder-gray-400 dark:placeholder-gray-400
                            focus:outline-none focus:ring-2
                            focus:ring-blue-800 dark:focus:ring-blue-500"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mb-6">
                    <button className="px-6 py-2 text-sm font-semibold rounded
                        bg-blue-800 hover:bg-blue-500
                        dark:bg-blue-800 dark:hover:bg-blue-600
                        text-white transition">
                        SUBMIT
                    </button>

                    <div className="flex items-center gap-2 text-sm">
                        <input
                            id="remember"
                            type="checkbox"
                            className="accent-blue-500"
                        />

                        <label
                            htmlFor="remember"
                            className="cursor-pointer select-none text-gray-600 dark:text-gray-300"
                        >
                            Remember
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-blue-800 dark:text-blue-300 hover:underline ml-2"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                </div>

                
            </div>
        </div>
    );
};

export default SignIn;
