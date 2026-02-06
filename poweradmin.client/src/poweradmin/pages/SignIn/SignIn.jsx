import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppFooter from "../../layout/AppFooter";
import api from "../../api/axios";

const SignIn = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/login", {
                username,
                password,
            });

            // success
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/poweradmin/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md rounded-md px-8 py-10 shadow-xl bg-white">

                    <h2 className="text-center text-2xl font-medium mb-6">
                        Sign In
                    </h2>

                    {error && (
                        <div className="mb-4 text-sm text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full rounded px-4 py-2 border"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded px-4 py-2 border"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-blue-800 text-white rounded"
                        >
                            {loading ? "PLEASE WAIT..." : "LOGIN"}
                        </button>
                    </form>

                </div>
            </div>

            <AppFooter />
        </div>
    );
};

export default SignIn;
